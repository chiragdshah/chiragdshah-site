const SUBSTACK_FEED = "https://cshah.substack.com/feed";
// Question Everything full-episodes playlist (excludes Shorts, which live in a
// separate playlist). Filtering by playlist is more reliable than detecting
// /shorts/ URLs from the channel-wide feed, since the channel feed can be
// dominated by shorts and push full episodes out of the recent-items window.
const YOUTUBE_PLAYLIST_ID = "PL5htsjagv9d-U-Ih1gMvIGlGlH84Ktbpg";
const YOUTUBE_FEED = `https://www.youtube.com/feeds/videos.xml?playlist_id=${YOUTUBE_PLAYLIST_ID}`;

const DISPATCH_DESCRIPTION =
  "The week's signal in the noise — what's worth knowing from what I've read, seen, heard, built, and written.";
const PODCAST_DESCRIPTION_FALLBACK =
  "First-principles conversations on identity, scale, and what it means to build something bigger than a company.";

type Item = {
  channel: "ESSAY" | "DISPATCH" | "PODCAST";
  source: string;
  title: string;
  description: string;
  date: string;
  href: string;
};

function decodeText(s: string): string {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&hellip;/g, "…")
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/\s+/g, " ")
    .trim();
}

function extract(block: string, tag: string): string {
  const re = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`);
  const m = block.match(re);
  return m ? decodeText(m[1]) : "";
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}

function trimDescription(s: string, max = 220): string {
  if (s.length <= max) return s;
  const cut = s.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut).replace(/[,;:.\-—]+$/, "") + "…";
}

async function fetchText(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: { "User-Agent": "ChiragDShah.com/1.0 (+https://chiragdshah.com)" },
  });
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  return res.text();
}

async function fetchSubstack(): Promise<{ essay: Item | null; dispatch: Item | null }> {
  const xml = await fetchText(SUBSTACK_FEED);
  const blocks = [...xml.matchAll(/<item\b[\s\S]*?<\/item>/g)].map((m) => m[0]);

  let essay: Item | null = null;
  let dispatch: Item | null = null;

  for (const block of blocks) {
    const title = extract(block, "title");
    const link = extract(block, "link");
    const description = extract(block, "description");
    const pubDate = extract(block, "pubDate");
    const date = formatDate(pubDate);
    if (!title || !link) continue;

    const isDispatch = /^\s*Signal Check\b/i.test(title);

    if (isDispatch && !dispatch) {
      dispatch = {
        channel: "DISPATCH",
        source: "Signal Check",
        title,
        description: DISPATCH_DESCRIPTION,
        date,
        href: link,
      };
    } else if (!isDispatch && !essay) {
      essay = {
        channel: "ESSAY",
        source: "The Pattern Seeker",
        title,
        description: trimDescription(description) || "Notes from inside the machine.",
        date,
        href: link,
      };
    }

    if (essay && dispatch) break;
  }

  return { essay, dispatch };
}

async function fetchYouTube(): Promise<Item | null> {
  const xml = await fetchText(YOUTUBE_FEED);
  const entries = [...xml.matchAll(/<entry\b[\s\S]*?<\/entry>/g)].map((m) => m[0]);
  if (!entries.length) return null;

  const latest = entries
    .map((entry) => ({
      entry,
      publishedMs: new Date(extract(entry, "published")).getTime(),
    }))
    .filter((e) => !Number.isNaN(e.publishedMs))
    .sort((a, b) => b.publishedMs - a.publishedMs)[0]?.entry;
  if (!latest) return null;

  const title = extract(latest, "title");
  const videoId = extract(latest, "yt:videoId");
  const published = extract(latest, "published");
  const mediaDesc = extract(latest, "media:description");
  if (!title || !videoId) return null;

  return {
    channel: "PODCAST",
    source: "Question Everything\n(Except This Podcast!)",
    title,
    description: trimDescription(mediaDesc) || PODCAST_DESCRIPTION_FALLBACK,
    date: formatDate(published),
    href: `https://www.youtube.com/watch?v=${videoId}`,
  };
}

export default async (): Promise<Response> => {
  try {
    const [substack, podcast] = await Promise.all([fetchSubstack(), fetchYouTube()]);
    const items: Item[] = [];
    if (substack.essay) items.push(substack.essay);
    if (substack.dispatch) items.push(substack.dispatch);
    if (podcast) items.push(podcast);

    return new Response(JSON.stringify({ items }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300",
        "Netlify-CDN-Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ items: [], error: err instanceof Error ? err.message : String(err) }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=60",
        },
      },
    );
  }
};

