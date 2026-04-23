import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";

type NavItem = {
  id: string;
  label: string;
  cta?: boolean;
};

const NAV_ITEMS: readonly NavItem[] = [
  { id: "projects", label: "Active Projects" },
  { id: "currently", label: "Across Channels" },
  { id: "signal-check", label: "Signal Check" },
  { id: "connect", label: "Let's Connect", cta: true },
] as const;

export function SiteHeader() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  const [activeId, setActiveId] = useState<string>("projects");

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > window.innerHeight * 0.7);
  });

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.getElementById(item.id),
    ).filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length === 0) return;
        const top = visibleEntries.reduce((prev, curr) =>
          curr.boundingClientRect.top < prev.boundingClientRect.top ? curr : prev,
        );
        setActiveId(top.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          initial={{ y: -64, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -64, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed inset-x-0 top-0 z-30 hidden border-b border-brown/10 bg-cream-50/85 backdrop-blur-md md:block"
        >
          <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-6 px-6">
            <a
              href="#hero"
              onClick={handleClick("hero")}
              className="group flex flex-col leading-none transition"
            >
              <span className="font-hero text-2xl text-brown transition group-hover:text-brown-accent">
                Chirag D. Shah
              </span>
              <span className="-mt-0.5 font-hand text-base text-brown-accent/80">
                Applied Polymath
              </span>
            </a>

            <nav aria-label="Sections" className="flex items-center gap-6">
              {NAV_ITEMS.map((item) => {
                const isActive = activeId === item.id;
                const underline = isActive && (
                  <motion.span
                    layoutId="site-header-underline"
                    className="absolute -bottom-1 left-0 right-0 h-[1.5px] rounded-full bg-brown-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                );

                if (item.cta) {
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={handleClick(item.id)}
                      className="relative ml-2 rounded-md bg-brown-accent px-4 py-1.5 font-hero text-sm text-cream-50 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                      {item.label}
                      {underline}
                    </a>
                  );
                }

                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={handleClick(item.id)}
                    className={`relative font-hero text-sm transition ${
                      isActive
                        ? "text-brown"
                        : "text-brown/60 hover:text-brown"
                    }`}
                  >
                    {item.label}
                    {underline}
                  </a>
                );
              })}
            </nav>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
