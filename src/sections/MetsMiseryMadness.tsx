import { useEffect, useRef } from 'react';

export function MetsMiseryMadness() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>Mets Misery Madness — The Gauntlet</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  :root{
    --navy:#0A1428; --blue:#002D72; --orange:#FF5910; --orange2:#ff7a3d;
    --paper:#F7F4EE; --dim:#6b7c9a; --line:rgba(255,255,255,.10);
    --H:#FF5910; --F:#5b8cff; --C:#28c8a0; --D:#b478ff;
  }
  *{box-sizing:border-box;-webkit-tap-highlight-color:transparent;}
  html,body{margin:0;height:100%;overflow:hidden;background:var(--navy);
    font-family:"Inter",system-ui,sans-serif;color:var(--paper);}
  #app{position:fixed;inset:0;overflow:hidden;}

  /* ---------- stage / camera ---------- */
  #viewport{position:absolute;inset:0;overflow:hidden;touch-action:none;}
  #board{position:relative;transform-origin:0 0;width:fit-content;will-change:transform;}
  .vignette{position:absolute;inset:0;pointer-events:none;z-index:5;
    background:radial-gradient(120% 90% at 50% 45%,transparent 40%,rgba(4,9,20,.72) 100%);}

  /* ---------- bracket board ---------- */
  #regions{display:grid;grid-template-columns:520px 520px;gap:26px;padding:30px;}
  .region{background:linear-gradient(180deg,#0e1c38,#0b1730);border:1px solid var(--line);
    border-radius:14px;padding:10px 8px 12px;}
  .rname{font-family:"Oswald";font-weight:700;text-transform:uppercase;letter-spacing:.2em;
    font-size:15px;color:#cfe0ff;text-align:center;padding:4px 0 8px;}
  .rname b{color:var(--orange);}
  .cols{display:flex;gap:6px;align-items:stretch;}
  .col{flex:1;display:flex;flex-direction:column;justify-content:space-around;gap:6px;}
  .col.champcol{flex:.7;justify-content:center;}
  .match{display:flex;flex-direction:column;gap:4px;border-radius:8px;padding:3px;
    position:relative;transition:box-shadow .4s;}
  .match.active{box-shadow:0 0 0 2px var(--orange),0 0 22px rgba(255,89,16,.5);}
  .cell{display:flex;align-items:center;gap:5px;background:rgba(255,255,255,.04);
    border:1px solid transparent;border-radius:6px;padding:5px 6px;min-height:30px;
    font-size:10.5px;line-height:1.12;transition:transform .25s,background .25s,opacity .4s,border-color .25s;}
  .cell .sd{flex:0 0 auto;width:16px;height:16px;border-radius:4px;display:grid;place-items:center;
    font-family:"Oswald";font-size:9px;color:#9fb4d8;background:rgba(255,255,255,.07);}
  .cell .nm{flex:1;}
  .cell.empty{opacity:.32;font-style:italic;color:var(--dim);}
  .cell.empty .sd{visibility:hidden;}
  .cell.live{cursor:pointer;}
  .cell.live:active{transform:scale(.97);}
  .match.active .cell.live{background:rgba(0,45,114,.55);border-color:rgba(159,180,216,.4);}
  .match.active .cell.live:hover{background:rgba(255,89,16,.2);border-color:var(--orange);}
  .cell.chosen{background:rgba(255,89,16,.22)!important;border-color:var(--orange)!important;}
  .cell.chosen .nm{font-weight:700;color:#fff;}
  .cell.chosen .sd{background:var(--orange);color:#15110d;}
  .cell.eliminated{opacity:.28;}
  .cell.eliminated .nm{text-decoration:line-through;text-decoration-color:rgba(255,255,255,.35);}
  .cell.filled .nm{color:#fff;font-weight:600;}
  .champcell{min-height:38px;font-size:11.5px;background:rgba(255,89,16,.08);
    border:1px dashed rgba(255,89,16,.35);}
  .champcell.filled{background:rgba(255,89,16,.16);border:1px solid var(--orange);}

  /* finals */
  #finals{margin:4px 30px 36px;background:linear-gradient(180deg,#0e1c38,#0a1326);
    border:1px solid var(--line);border-radius:16px;padding:14px 16px 18px;}
  #finals .ftitle{font-family:"Oswald";text-transform:uppercase;letter-spacing:.22em;
    font-size:13px;color:var(--orange);text-align:center;margin-bottom:12px;}
  .fcols{display:flex;align-items:center;justify-content:center;gap:14px;}
  .fcol{display:flex;flex-direction:column;gap:14px;}
  .fcol.champcol{justify-content:center;}
  .fcell{width:150px;min-height:34px;}
  .trophyslot{width:170px;min-height:46px;font-size:13px;
    background:rgba(255,89,16,.1);border:1px dashed rgba(255,89,16,.4);}
  .trophyslot.filled{background:rgba(255,89,16,.2);border:1px solid var(--orange);}

  /* ---------- HUD ---------- */
  #hud{position:absolute;top:0;left:0;right:0;z-index:20;display:flex;align-items:flex-start;
    justify-content:space-between;padding:12px 14px;pointer-events:none;gap:8px;}
  .hud-left,.hud-right{display:flex;gap:8px;flex-wrap:wrap;}
  .pill{background:rgba(10,20,40,.82);backdrop-filter:blur(8px);border:1px solid var(--line);
    border-radius:10px;padding:7px 12px;pointer-events:auto;white-space:nowrap;}
  #loc{font-family:"Oswald";text-transform:uppercase;letter-spacing:.12em;font-size:12px;}
  #loc .rd{color:var(--orange);}
  .pill.score{display:flex;align-items:center;gap:7px;}
  .pill.score .slbl{font-family:"Oswald";font-size:9px;letter-spacing:.14em;color:var(--dim);}
  .pill.score b{font-family:"Oswald";font-size:14px;color:var(--orange);}
  .iconbtn{width:36px;height:36px;display:grid;place-items:center;font-size:15px;cursor:pointer;padding:0;}
  #progwrap{position:absolute;top:92px;left:14px;right:14px;z-index:20;height:4px;
    background:rgba(255,255,255,.08);border-radius:3px;overflow:hidden;pointer-events:none;}
  #prog{height:100%;width:0;background:var(--orange);transition:width .5s;}
  #count{position:absolute;top:100px;right:14px;z-index:20;font-family:"Oswald";font-size:11px;
    letter-spacing:.1em;color:var(--dim);}

  /* floating point popup */
  #pop{position:absolute;left:50%;top:42%;transform:translate(-50%,0);z-index:25;
    font-family:"Oswald";font-weight:700;text-align:center;pointer-events:none;opacity:0;}
  #pop.go{animation:popUp 1.1s ease-out;}
  #pop .pts{font-size:30px;}
  #pop .tag{display:block;font-size:12px;letter-spacing:.14em;margin-top:2px;}
  @keyframes popUp{0%{opacity:0;transform:translate(-50%,10px) scale(.8);}
    20%{opacity:1;transform:translate(-50%,-6px) scale(1.05);}
    100%{opacity:0;transform:translate(-50%,-44px) scale(1);}}

  /* ---------- prompt ---------- */
  #prompt{position:absolute;bottom:0;left:0;right:0;z-index:20;text-align:center;
    padding:0 0 22px;pointer-events:none;opacity:0;transform:translateY(14px);
    transition:opacity .4s,transform .4s;}
  #prompt.show{opacity:1;transform:none;}
  #prompt .q{font-family:"Oswald";text-transform:uppercase;letter-spacing:.16em;font-size:15px;}
  #prompt .q b{color:var(--orange);}
  #prompt .sub{font-size:11px;color:var(--dim);margin-top:3px;}

  /* ---------- chips ---------- */
  .chip{display:inline-flex;align-items:center;gap:5px;font-family:"Oswald";font-size:11px;
    letter-spacing:.08em;text-transform:uppercase;padding:3px 9px;border-radius:20px;border:1px solid;}
  .chip.H{background:rgba(255,89,16,.16);border-color:var(--H);color:#ffb999;}
  .chip.F{background:rgba(91,140,255,.16);border-color:var(--F);color:#bcd0ff;}
  .chip.C{background:rgba(40,200,160,.14);border-color:var(--C);color:#9af0d8;}
  .chip.D{background:rgba(180,120,255,.16);border-color:var(--D);color:#dcc8ff;}

  /* ---------- reveal ---------- */
  .reveal{position:absolute;inset:0;z-index:30;display:flex;align-items:flex-end;
    justify-content:center;padding:0 16px 30px;background:rgba(4,9,20,.55);
    opacity:0;pointer-events:none;transition:opacity .3s;}
  .reveal.show{opacity:1;pointer-events:auto;}
  .revcard{width:100%;max-width:440px;background:linear-gradient(180deg,#10203f,#0b1832);
    border:1px solid var(--line);border-radius:16px;padding:18px 18px 14px;text-align:center;
    transform:translateY(20px);transition:transform .35s cubic-bezier(.2,.9,.3,1);
    box-shadow:0 24px 60px rgba(0,0,0,.5);}
  .reveal.show .revcard{transform:none;}
  .revhead{font-family:"Oswald";letter-spacing:.14em;text-transform:uppercase;font-size:13px;margin-bottom:6px;}
  .revhead.yes{color:#5ee08a;} .revhead.no{color:var(--orange);}
  .revname{font-family:"Oswald";font-weight:700;text-transform:uppercase;line-height:1;
    font-size:clamp(20px,5.5vw,26px);margin-bottom:8px;}
  .revmeta{display:flex;align-items:center;justify-content:center;gap:10px;margin-bottom:10px;}
  .rseed{color:var(--dim);font-size:11px;}
  .revstory{font-size:13px;line-height:1.5;color:#d6e0f0;}
  .revpts{margin-top:11px;font-size:12.5px;color:#c7d4ea;}
  .revpts b{color:var(--orange);font-size:15px;}
  .revpts .muted{color:var(--dim);}
  .upsetTag{font-family:"Oswald";letter-spacing:.1em;color:#15110d;background:var(--orange);
    padding:1px 7px;border-radius:5px;font-size:10px;}
  .revnext{margin-top:14px;font-family:"Oswald";font-weight:600;text-transform:uppercase;
    letter-spacing:.14em;font-size:13px;color:#15110d;background:var(--orange);border:none;
    border-radius:10px;padding:11px 22px;cursor:pointer;width:100%;}
  .revhint{margin-top:10px;font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--dim);}

  /* ---------- overlays ---------- */
  .overlay{position:absolute;inset:0;z-index:40;display:flex;flex-direction:column;
    align-items:center;justify-content:center;text-align:center;padding:26px;overflow-y:auto;
    background:radial-gradient(120% 90% at 50% 20%,#15264a,var(--navy));}
  .overlay.hidden{display:none;}
  .eyebrow{font-family:"Oswald";letter-spacing:.3em;text-transform:uppercase;font-size:12px;
    color:var(--orange);margin:0 0 10px;}
  h1{font-family:"Oswald";font-weight:700;text-transform:uppercase;line-height:.9;
    font-size:clamp(40px,12vw,84px);margin:0;}
  h1 .o{color:var(--orange);}
  .blurb{color:var(--dim);max-width:440px;font-size:14px;margin:18px 0 6px;}
  .rules{display:flex;flex-direction:column;gap:7px;max-width:380px;margin:14px 0 4px;
    text-align:left;font-size:13px;color:#c7d4ea;}
  .rules div{display:flex;gap:9px;}
  .rules .n{color:var(--orange);font-family:"Oswald";}
  .btn{margin-top:24px;font-family:"Oswald";font-weight:700;text-transform:uppercase;
    letter-spacing:.16em;font-size:16px;color:#15110d;background:var(--orange);
    border:none;border-radius:12px;padding:16px 34px;cursor:pointer;
    box-shadow:0 12px 34px rgba(255,89,16,.32);transition:transform .15s,box-shadow .15s;}
  .btn:hover{transform:translateY(-2px);box-shadow:0 16px 40px rgba(255,89,16,.42);}
  .btn:active{transform:translateY(0);}

  /* champion overlay */
  .crown{font-family:"Oswald";letter-spacing:.28em;text-transform:uppercase;font-size:13px;color:var(--orange);}
  .champname{font-family:"Oswald";font-weight:700;text-transform:uppercase;line-height:.95;
    font-size:clamp(30px,8vw,56px);margin:8px 0 4px;
    background:linear-gradient(180deg,#fff,#ffd9c4);-webkit-background-clip:text;background-clip:text;color:transparent;}
  .champseed{color:var(--dim);font-size:13px;margin-bottom:16px;}
  .scorebar{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-bottom:14px;}
  .stat{background:rgba(0,45,114,.4);border:1px solid var(--line);border-radius:12px;padding:10px 16px;min-width:96px;}
  .stat .v{font-family:"Oswald";font-size:22px;color:var(--orange);}
  .stat .l{font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--dim);margin-top:2px;}
  .arche{background:linear-gradient(180deg,rgba(255,89,16,.16),rgba(255,89,16,.05));
    border:1px solid rgba(255,89,16,.4);border-radius:16px;padding:18px;max-width:440px;margin-bottom:14px;}
  .arche .ae{font-size:40px;}
  .arche .at{font-family:"Oswald";font-weight:700;text-transform:uppercase;letter-spacing:.06em;
    font-size:20px;margin:4px 0 6px;}
  .arche .ad{font-size:13px;line-height:1.5;color:#d6e0f0;}
  .bars{display:flex;flex-direction:column;gap:6px;margin-top:14px;}
  .barrow{display:flex;align-items:center;gap:8px;font-size:11px;}
  .barrow .bl{width:120px;text-align:left;color:#c7d4ea;}
  .bartrack{flex:1;height:8px;background:rgba(255,255,255,.08);border-radius:5px;overflow:hidden;}
  .bartrack > span{display:block;height:100%;border-radius:5px;}
  .verdict{background:rgba(0,45,114,.4);border:1px solid var(--line);border-radius:14px;
    padding:14px 16px;max-width:440px;font-size:13px;line-height:1.5;margin-bottom:14px;}
  .verdict .agree{font-family:"Oswald";letter-spacing:.1em;font-size:14px;}
  .verdict .agree.yes{color:#5ee08a;} .verdict .agree.no{color:var(--orange);}
  .regrid{display:grid;grid-template-columns:1fr 1fr;gap:6px 14px;margin-top:10px;font-size:11.5px;text-align:left;}
  .regrid .r{color:var(--dim);} .regrid .v{color:#fff;}
  .regrid .v.ok{color:#5ee08a;}
</style>
</head>
<body>
<div id="app">
  <div id="viewport">
    <div id="board">
      <div id="regions"></div>
      <div id="finals"></div>
    </div>
    <div class="vignette"></div>
  </div>

  <!-- HUD -->
  <div id="hud">
    <div class="hud-left">
      <div class="pill"><span id="loc">Mets Misery Madness</span></div>
      <div class="pill score"><span class="slbl">Misery&nbsp;Pts</span> <b id="scoreVal">0</b></div>
    </div>
    <div class="hud-right">
      <div class="pill iconbtn" id="muteBtn" title="Sound">🔊</div>
      <div class="pill iconbtn" id="restartBtn" title="Restart">↻</div>
    </div>
  </div>
  <div id="progwrap"><div id="prog"></div></div>
  <div id="count"></div>
  <div id="pop"></div>

  <!-- prompt -->
  <div id="prompt">
    <div class="q" id="promptQ">Which was <b>worse</b>?</div>
    <div class="sub">Tap the more miserable moment</div>
  </div>

  <!-- reveal card -->
  <div class="reveal" id="reveal">
    <div class="revcard">
      <div class="revhead" id="revHead"></div>
      <div class="revname" id="revName"></div>
      <div class="revmeta"><span class="chip" id="revChip"></span><span class="rseed" id="revSeed"></span></div>
      <div class="revstory" id="revStory"></div>
      <div class="revpts" id="revPts"></div>
      <button class="revnext" id="revNext">Next ›</button>
      <div class="revhint">tap anywhere to continue</div>
    </div>
  </div>

  <!-- intro -->
  <div class="overlay" id="intro">
    <p class="eyebrow">A 64-calamity tribunal of suffering</p>
    <h1>Misery<br><span class="o">Madness</span></h1>
    <p class="blurb">The whole field of Mets misery is laid out below. The camera flies you matchup to matchup — you decide which one hurt more, and learn what your taste in suffering says about you.</p>
    <div class="rules">
      <div><span class="n">1</span><span>Tap whichever moment is <b>more miserable</b>. It advances.</span></div>
      <div><span class="n">2</span><span>Match the consensus to bank <b>misery points</b>. Go contrarian for hot takes.</span></div>
      <div><span class="n">3</span><span>Every pick reveals the <b>real story</b>. 63 verdicts to a champion.</span></div>
    </div>
    <button class="btn" id="startBtn">Begin the suffering</button>
  </div>

  <!-- champion / results -->
  <div class="overlay hidden" id="result">
    <p class="crown">★ Your Most Miserable Moment ★</p>
    <div class="champname" id="rChamp">—</div>
    <div class="champseed" id="rSeed"></div>

    <div class="scorebar">
      <div class="stat"><div class="v" id="rScore">0</div><div class="l">Misery Pts</div></div>
      <div class="stat"><div class="v" id="rGrade">—</div><div class="l" id="rRate">Consensus</div></div>
      <div class="stat"><div class="v" id="rHot">0</div><div class="l">Hot Takes</div></div>
    </div>

    <div class="arche" id="rArche"></div>

    <div class="verdict">
      <div class="agree" id="rAgree"></div>
      <div style="margin-top:6px;color:#c7d4ea" id="rAgreeText"></div>
      <div class="regrid" id="rRegions"></div>
    </div>

    <button class="btn" id="againBtn">Suffer again</button>
  </div>
</div>

<script>
/* ============ DATA ============
   entry = [seed, name, misery(0-100), category, story]
   category: H heartbreak · F front-office folly · C cursed luck · D off-field disgrace */
const REGIONS = [
  {name:"East", champ:"Beltrán caught looking", e:[
    [1,"Beltrán caught looking",96,"H","Game 7 of the 2006 NLCS, bases loaded in the 9th — Beltrán froze on a Wainwright curveball for a called strike three to end the pennant."],
    [16,"Cutting Justin Turner",55,"F","The Mets released a scrappy infielder in 2013; he remade his swing and became a Dodgers October hero and champion."],
    [8,"Mitchell decapitates cat",47,"D","A persistent (and hotly disputed) bit of '80s clubhouse lore claimed the young slugger beheaded a cat to scare a teammate."],
    [9,"K-Rod beats father-in-law",61,"D","The closer fought his girlfriend's father in the Citi Field family lounge in 2010, tore a thumb ligament, and ended his own season."],
    [5,"Duaner Sanchez cab crash",67,"C","The key 2006 setup man separated his shoulder in a late-night cab accident, wrecking the bullpen and forcing a panic trade."],
    [12,"Anna Benson Mrs. Claus fit",38,"D","Pitcher Kris Benson's wife turned the team kids' holiday party into tabloid fodder with a notoriously revealing outfit."],
    [4,"Jason Bay",74,"F","A $66M free-agent splash in 2010 that delivered concussions and almost no power — a defining signing bust."],
    [13,"Nimmo undercooks chicken",28,"C","Brandon Nimmo gave himself food poisoning with undercooked chicken and missed time — harmless but very on-brand."],
    [6,"Shea closes after elimination",66,"H","The grand farewell ceremony for Shea Stadium ran right after the 2008 team was eliminated on the season's final day."],
    [11,"Batting out of order vs Reds",40,"F","A lineup-card mix-up had the Mets literally batting out of turn — a small, pure dose of buffoonery."],
    [3,"Mr. Met flips off fan",60,"D","In 2017 the beloved mascot raised a four-fingered middle finger at fans on camera and went instantly viral."],
    [14,"Kaz Matsui ailment",33,"C","The infielder's tenure was dogged by an unfortunate, much-mocked recurring medical issue that kept making headlines."],
    [7,'Piazza "Not Gay" presser',63,"D","In 2002 the star catcher was pushed into an awkward public press conference to deny tabloid rumors about his personal life."],
    [10,"Harvey UTI from not peeing",55,"C","Matt Harvey held it too long, developed a bladder issue that briefly hospitalized him, and missed a start — truly self-inflicted."],
    [2,"Dildo in Plawecki's locker",30,"D","A live broadcast caught an adult novelty sitting in catcher Kevin Plawecki's locker — clubhouse prank, national audience."],
    [15,"Scott Kazmir trade",80,"F","The Mets shipped a homegrown ace lefty for Victor Zambrano in 2004 — routinely ranked among the worst trades in team history."],
  ]},
  {name:"West", champ:"Bobby Bonilla contract", e:[
    [1,"Duda errant WS G5 throw",89,"H","Game 5 of the 2015 World Series: Lucas Duda airmailed a throw home, the tying run scored, and the Royals clinched that inning."],
    [16,"Trade Byrd on his shirt night",42,"F","The Mets traded Marlon Byrd on the very night of his fan-giveaway promotion."],
    [8,"'86 brawl w/ Houston PD",50,"D","Members of the rowdy 1986 champs got into an altercation and were arrested by Houston police — a badge of dishonor."],
    [9,"Noah refuses MRI / tears lat",68,"C","Syndergaard skipped a recommended MRI in 2017, took the mound, and tore his lat — a self-inflicted blow to a promising season."],
    [5,"Gordon/Gillaspie off Familia",81,"H","Closer Jeurys Familia gave up the gutting late homers (Gordon in the '15 Series, Gillaspie in the '16 Wild Card) that ended Mets Octobers."],
    [12,"Saberhagen bleach soaker",46,"D","Bret Saberhagen sprayed bleach at reporters in the 1993 clubhouse — a gross low point of a miserable season."],
    [4,"David Wright spinal stenosis",83,"C","Spinal stenosis slowly stole the prime and career of the Captain, the most beloved homegrown Met of his era."],
    [13,"Brodie manages from couch",57,"F","During a 2020 game, GM Brodie Van Wagenen was caught relaying lineup meddling he tried to pin on ownership — from home."],
    [6,"Ike Davis Valley Fever",53,"C","A promising young first baseman's career was derailed in part by Valley Fever, a bizarre fungal illness."],
    [11,"Bobby/Rickey card game",79,"D","Legend holds Bobby Bonilla and Rickey Henderson were playing cards in the clubhouse as the 1999 NLCS elimination unfolded."],
    [3,"Luis Castillo pop-up",84,"H","Castillo dropped a routine pop-up against the Yankees in 2009, letting two runs score for a walk-off loss."],
    [14,"Beltrán secret knee surgery",59,"F","Carlos Beltrán had knee surgery in 2010 without team authorization, infuriating an already-dysfunctional front office."],
    [7,"Generation K",80,"C","The hyped young trio of Isringhausen, Pulsipher and Wilson — 'Generation K' — flamed out almost entirely to injuries."],
    [10,"Bernazard fights minor leaguer",49,"D","Exec Tony Bernazard reportedly took off his shirt and challenged minor leaguers to fight in 2009."],
    [2,"Bobby Bonilla contract",92,"F","A deferred deal pays the long-retired Bonilla about $1.19M every July 1 through 2035 — a national punchline now called 'Bobby Bonilla Day.'"],
    [15,"Agbayani steals ball from fan",32,"D","Benny Agbayani lost track of the outs and handed a live ball to a fan, then scrambled to get it back as runners advanced."],
  ]},
  {name:"South", champ:"Bernie Madoff", e:[
    [1,"Bernie Madoff",95,"F","The Wilpons' deep entanglement in Bernie Madoff's Ponzi scheme nearly bankrupted the franchise and gutted payroll for years."],
    [16,"Blevins breaks arm off curb",36,"C","Reliever Jerry Blevins broke his arm, came back, then broke it again in a freak fall — a doubly cursed 2015."],
    [8,"Keith/Darryl picture-day fight",52,"D","Keith Hernandez and Darryl Strawberry came to blows during team picture day in 1989."],
    [9,"Shea congratulates BOS WS",41,"F","A tone-deaf scoreboard moment effectively congratulated Boston on a World Series — salt in very old wounds."],
    [5,"Wilmer crying / no-trade",64,"H","Believing he'd been traded mid-game in 2015, Wilmer Flores cried on the field; the deal fell through and he later won it with a walk-off — but the tears endure."],
    [12,"Milledge high-fives fans",35,"D","Rookie Lastings Milledge high-fived fans down the line after a homer, breaking etiquette and earning a 'Know Your Place, Rook' sign."],
    [4,"Doc misses '86 parade",88,"D","Dwight Gooden missed the 1986 championship parade amid cocaine use — a haunting symbol of squandered dynasty greatness."],
    [13,"Noah hand/foot/mouth",34,"C","Noah Syndergaard contracted hand, foot and mouth disease in 2019 — a strange, very un-ace ailment."],
    [6,"V. Coleman firecracker",76,"D","Vince Coleman threw a powerful firecracker toward a crowd in a stadium lot in 1993, injuring bystanders including a child."],
    [11,"Steve Cohen non-sale",58,"F","Steve Cohen's first agreement to buy the team collapsed in 2020, briefly extending the Wilpon era before he finally closed the deal."],
    [3,"Kenny Rogers walk",90,"H","Kenny Rogers walked in the pennant-winning run with the bases loaded in Game 6 of the 1999 NLCS against Atlanta."],
    [14,"Wright tosses Noah's lunch",22,"D","A clubhouse prank where David Wright tossed Syndergaard's food — trivial, but it made the misery bracket."],
    [7,"J. Wilpon fires pregnant emp.",72,"F","Ownership faced a lawsuit alleging an executive was pushed out for being pregnant and unmarried."],
    [10,"Mickey/Vargas vs Healey",44,"D","Manager Mickey Callaway and pitcher Jason Vargas confronted beat reporter Tim Healey in a 2019 clubhouse blowup."],
    [2,"Cespedes vs wild boar",70,"C","Yoenis Céspedes blamed a 2019 ankle injury on a run-in with a wild boar on his ranch, capping a huge contract that produced little."],
    [15,"Mejía's 3 PED bans",58,"D","Closer Jenrry Mejía became the first player ever permanently banned by MLB after failing three PED tests."],
  ]},
  {name:"Midwest", champ:"2007 Collapse", e:[
    [1,"2007 Collapse",98,"H","The Mets blew a seven-game division lead with 17 to play and missed the playoffs on the final day — then nearly repeated it in 2008."],
    [16,"Parnell blows save / needs TJ",43,"C","Reliever Bobby Parnell's run of misfortune included blown saves and Tommy John surgery during a bleak stretch."],
    [8,"Coleman golf swing hurts Doc",62,"C","Vince Coleman swung a golf club in the clubhouse and injured ace Dwight Gooden — an own goal of the highest order."],
    [9,"Harvey hungover & heartbroken",54,"D","Matt Harvey no-showed a 2017 game amid personal turmoil and partying, earning a suspension."],
    [5,"Ojeda gardening accident",60,"C","Bobby Ojeda nearly severed a fingertip in a hedge-clipper accident in 1988, altering his season."],
    [12,'Minaya/Rubin "has lobby"',51,"F","At a 2009 presser, GM Omar Minaya bizarrely accused beat writer Adam Rubin of having lobbied the team for a job."],
    [4,"Letting Tom Seaver go twice",86,"F","The Mets lost 'The Franchise' in the 1977 Midnight Massacre — then lost him AGAIN in 1984 by leaving him unprotected."],
    [13,"'02 players sneak weed into Shea",39,"D","Reports of players sneaking marijuana into Shea symbolized a directionless, dysfunctional 2002 clubhouse."],
    [6,"Lists '69 players as dead",45,"F","A team tribute mistakenly listed living members of the 1969 Miracle Mets as deceased."],
    [11,"Beltrán hired & fired pre-opener",78,"F","Carlos Beltrán was hired as manager, then fired before managing a single game over the Astros sign-stealing scandal."],
    [3,"Flying Ryan Church concussed",73,"F","The Mets put a concussed Ryan Church on a flight in 2008, worsening his symptoms — emblematic of dreadful player care."],
    [14,"Hiring an agent as a GM",64,"F","The Mets hired a sitting player agent as general manager, a conflict-of-interest hire that drew leaguewide eyebrows."],
    [7,"Bobby V mustache disguise",48,"D","Ejected manager Bobby Valentine snuck back into the 1999 dugout wearing a fake mustache and shades."],
    [10,"Cone bullpen scandal",58,"D","An ugly 1989 bullpen incident and lawsuit involving David Cone made unwanted headlines."],
    [2,"Firing Willie at 3am in CA",82,"F","Willie Randolph was fired by press release around 3 a.m. East-coast time after a West-coast win in 2008 — a famously classless dismissal."],
    [15,"Citi Field's original design",56,"F","The 2009 ballpark opened honoring the Brooklyn Dodgers more than the Mets, with sightline gripes — an identity misfire later fixed."],
  ]},
];
const AUTHORITY = {name:"The Consensus", champ:"2007 Collapse"};
const CATS = {
  H:{label:"Heartbreak", emoji:"💔", color:"#FF5910"},
  F:{label:"Front-Office Folly", emoji:"🤡", color:"#5b8cff"},
  C:{label:"Cursed Luck", emoji:"🤕", color:"#28c8a0"},
  D:{label:"Off-Field Disgrace", emoji:"😬", color:"#b478ff"},
};
const ARCHETYPES = {
  H:["💔","The Heartbreak Masochist","You pushed the on-field gut-punches the deepest. Blown pennants and frozen at-bats are your truest pain — the closer to October, the worse it cuts."],
  F:["🤡","The Front-Office Fatalist","For you the suffering is the suits. Bad contracts, doomed trades, and ownership folly cut deeper than any walk-off loss ever could."],
  C:["🤕","The Cursed-Luck Connoisseur","Freak injuries and absurd misfortune are your brand. Wild boars, gardening shears, Valley Fever, late-night cabs — only the Mets, only you."],
  D:["😬","The Disgrace Aficionado","Off-field embarrassment is your poison. The scandals, the cringe, the clown show — that, to you, is the real misery."],
};
const ROUND_NAMES=["First Round","Second Round","Sweet 16","Elite Eight"];
const PROMPTS=["Which was <b>worse</b>?","Which one <b>hurt more</b>?","Which is <b>more miserable</b>?","Which <b>stings</b> harder?","Bigger <b>disaster</b>?"];

/* ============ STATE / BUILD ============ */
const $=id=>document.getElementById(id);
const board=$("board"), viewport=$("viewport"), regionsEl=$("regions"), finalsEl=$("finals");
let state={};
let queue=[], qi=0, active=null, locked=false;
let score=0, consensusMatches=0, totalPicks=0, hotTakes=0, upsetCount=0, bestUpset={gap:0}, catScore={H:0,F:0,C:0,D:0};

function blankSlot(){ return {seed:null,name:null,mis:0,cat:null,story:null,el:null}; }
function copyInto(dest,w){ dest.seed=w.seed; dest.name=w.name; dest.mis=w.mis; dest.cat=w.cat; dest.story=w.story; }
function makeCell(slot, cls){
  const c=document.createElement("div");
  c.className="cell "+(cls||"");
  c.innerHTML='<span class="sd"></span><span class="nm"></span>';
  paintCell(c, slot);
  return c;
}
function paintCell(c, slot){
  const sd=c.querySelector(".sd"), nm=c.querySelector(".nm");
  if(slot && slot.name){ c.classList.remove("empty"); sd.textContent=slot.seed||""; nm.textContent=slot.name; }
  else { c.classList.add("empty"); nm.textContent="—"; }
}

function buildBoard(){
  regionsEl.innerHTML=""; finalsEl.innerHTML="";
  state={regions:[], finals:{r0:[blankSlot(),blankSlot(),blankSlot(),blankSlot()], r1:[blankSlot(),blankSlot()], champ:null, champEl:null}};

  REGIONS.forEach((R, ri)=>{
    const rounds=[[],[],[],[]];
    R.e.forEach(([seed,name,mis,cat,story],i)=> rounds[0][i]={seed,name,mis,cat,story,el:null});
    for(let rd=1;rd<4;rd++){ const n=[16,8,4,2][rd]; for(let i=0;i<n;i++) rounds[rd][i]=blankSlot(); }

    const panel=document.createElement("div"); panel.className="region";
    panel.innerHTML='<div class="rname">'+R.name+' <b>Region</b></div>';
    const cols=document.createElement("div"); cols.className="cols";

    for(let rd=0;rd<4;rd++){
      const col=document.createElement("div"); col.className="col";
      const nMatch=[8,4,2,1][rd];
      for(let m=0;m<nMatch;m++){
        const match=document.createElement("div"); match.className="match";
        match.dataset.ref="r"+ri+"-"+rd+"-"+m;
        [0,1].forEach(k=>{
          const slot=rounds[rd][m*2+k];
          const cell=makeCell(slot, rd===0?"":"empty");
          slot.el=cell; match.appendChild(cell);
        });
        col.appendChild(match);
      }
      cols.appendChild(col);
    }
    const cc=document.createElement("div"); cc.className="col champcol";
    const champCell=document.createElement("div"); champCell.className="cell champcell empty";
    champCell.innerHTML='<span class="sd"></span><span class="nm">Region champ</span>';
    cc.appendChild(champCell); cols.appendChild(cc);

    panel.appendChild(cols); regionsEl.appendChild(panel);
    state.regions.push({rounds, champCell, name:R.name});
  });

  /* finals */
  finalsEl.innerHTML='<div class="ftitle">Final Four · Championship</div>';
  const fcols=document.createElement("div"); fcols.className="fcols";
  const c1=document.createElement("div"); c1.className="fcol";
  for(let i=0;i<4;i++){ state.finals.r0[i].el=makeCell(state.finals.r0[i],"empty fcell"); }
  const mA=document.createElement("div"); mA.className="match"; mA.dataset.ref="F-0-0";
  mA.appendChild(state.finals.r0[0].el); mA.appendChild(state.finals.r0[1].el);
  const mB=document.createElement("div"); mB.className="match"; mB.dataset.ref="F-0-1";
  mB.appendChild(state.finals.r0[2].el); mB.appendChild(state.finals.r0[3].el);
  c1.appendChild(mA); c1.appendChild(mB);

  const c2=document.createElement("div"); c2.className="fcol";
  for(let i=0;i<2;i++){ state.finals.r1[i].el=makeCell(state.finals.r1[i],"empty fcell"); }
  const mC=document.createElement("div"); mC.className="match"; mC.dataset.ref="F-1-0";
  mC.appendChild(state.finals.r1[0].el); mC.appendChild(state.finals.r1[1].el);
  c2.appendChild(mC);

  const c3=document.createElement("div"); c3.className="fcol champcol";
  const trophy=document.createElement("div"); trophy.className="cell trophyslot empty";
  trophy.innerHTML='<span class="sd"></span><span class="nm">Champion</span>';
  state.finals.champEl=trophy; c3.appendChild(trophy);

  fcols.appendChild(c1); fcols.appendChild(c2); fcols.appendChild(c3);
  finalsEl.appendChild(fcols);
}

/* ============ QUEUE ============ */
function buildQueue(){
  queue=[];
  for(let r=0;r<4;r++) for(let rd=0;rd<4;rd++){ const n=[8,4,2,1][rd]; for(let m=0;m<n;m++) queue.push({scope:"region",r,rd,m}); }
  queue.push({scope:"finals",rd:0,m:0});
  queue.push({scope:"finals",rd:0,m:1});
  queue.push({scope:"finals",rd:1,m:0});
}
function matchEl(desc){
  const ref = desc.scope==="region" ? "r"+desc.r+"-"+desc.rd+"-"+desc.m : "F-"+desc.rd+"-"+desc.m;
  return board.querySelector('.match[data-ref="'+ref+'"]');
}
function getSlots(desc){
  if(desc.scope==="region"){
    const rr=state.regions[desc.r].rounds;
    return {a:rr[desc.rd][desc.m*2], b:rr[desc.rd][desc.m*2+1]};
  } else {
    if(desc.rd===0) return {a:state.finals.r0[desc.m*2], b:state.finals.r0[desc.m*2+1]};
    return {a:state.finals.r1[0], b:state.finals.r1[1]};
  }
}
function writeWinner(desc, win){
  if(desc.scope==="region"){
    if(desc.rd<3){
      const dest=state.regions[desc.r].rounds[desc.rd+1][desc.m];
      copyInto(dest,win); dest.el.classList.remove("empty"); paintCell(dest.el,dest); dest.el.classList.add("filled");
    } else {
      const cc=state.regions[desc.r].champCell;
      cc.classList.remove("empty"); cc.classList.add("filled");
      cc.querySelector(".sd").textContent=win.seed; cc.querySelector(".nm").textContent=win.name;
      const fs=state.finals.r0[desc.r]; copyInto(fs,win);
      fs.el.classList.remove("empty"); paintCell(fs.el,fs); fs.el.classList.add("filled");
    }
  } else {
    if(desc.rd===0){
      const dest=state.finals.r1[desc.m]; copyInto(dest,win);
      dest.el.classList.remove("empty"); paintCell(dest.el,dest); dest.el.classList.add("filled");
    } else {
      state.finals.champ={seed:win.seed,name:win.name,mis:win.mis,cat:win.cat,story:win.story};
      const t=state.finals.champEl; t.classList.remove("empty"); t.classList.add("filled");
      t.querySelector(".sd").textContent=win.seed; t.querySelector(".nm").textContent=win.name;
    }
  }
}
function weightFor(desc){ if(desc.scope==="finals") return desc.rd===0?5:6; return desc.rd+1; }

/* ============ CAMERA ============ */
function boardCenter(el){
  let x=0,y=0,n=el;
  while(n && n!==board){ x+=n.offsetLeft; y+=n.offsetTop; n=n.offsetParent; }
  return {cx:x+el.offsetWidth/2, cy:y+el.offsetHeight/2, w:el.offsetWidth, h:el.offsetHeight};
}
let cam={z:1,cx:0,cy:0,fit:true};
function applyCam(z,cx,cy,animate){
  const vw=viewport.clientWidth, vh=viewport.clientHeight;
  const tx=vw/2 - cx*z, ty=vh/2 - cy*z;
  board.style.transition = animate ? "transform 1.15s cubic-bezier(.62,.03,.2,1)" : "none";
  board.style.transform="translate("+tx+"px,"+ty+"px) scale("+z+")";
  cam={z,cx,cy,fit:false};
}
function focusMatch(el,animate=true){
  const {cx,cy,w,h}=boardCenter(el);
  const vw=viewport.clientWidth, vh=viewport.clientHeight;
  let z=Math.min((vw*0.86)/w,(vh*0.5)/h);
  z=Math.max(1.25,Math.min(z,3.0));
  applyCam(z,cx,cy,animate);
}
function fitBoard(animate=true){
  const bw=board.scrollWidth, bh=board.scrollHeight;
  const vw=viewport.clientWidth, vh=viewport.clientHeight;
  const z=Math.min(vw/bw,vh/bh)*0.9;
  applyCam(z,bw/2,bh/2,animate); cam.fit=true;
}

/* ============ GAME LOOP ============ */
function startGame(){
  buildBoard(); buildQueue(); qi=0; active=null; locked=false;
  score=0; consensusMatches=0; totalPicks=0; hotTakes=0; upsetCount=0; bestUpset={gap:0}; catScore={H:0,F:0,C:0,D:0};
  updateScore(); setProg();
  $("result").classList.add("hidden");
  $("reveal").classList.remove("show");
  fitBoard(false);
  setTimeout(()=>{ requestAnimationFrame(()=>nextMatch()); }, 1500);
}
function updateScore(){ $("scoreVal").textContent=score.toLocaleString(); }
function setProg(){
  $("prog").style.width=(qi/queue.length*100)+"%";
  $("count").textContent=Math.min(qi+1,queue.length)+" / "+queue.length;
}
function setLoc(desc){
  let region = desc.scope==="region" ? REGIONS[desc.r].name : "Finals";
  let round = desc.scope==="region" ? ROUND_NAMES[desc.rd] : (desc.rd===0?"Final Four":"Championship");
  $("loc").innerHTML = region+' · <span class="rd">'+round+'</span>';
}
function nextMatch(){
  if(qi>=queue.length) return finish();
  const desc=queue[qi];
  const slots=getSlots(desc);
  const el=matchEl(desc);
  active={desc, slots, el};
  setLoc(desc); setProg();
  document.querySelectorAll(".match.active").forEach(m=>m.classList.remove("active"));
  el.classList.add("active");
  hidePrompt();
  focusMatch(el);
  setTimeout(armChoices, 1180);
}
function armChoices(){
  if(!active) return;
  const {slots}=active;
  [["a",slots.a],["b",slots.b]].forEach(([k,slot])=>{
    slot.el.classList.add("live");
    slot.el.onclick=()=>choose(k);
  });
  $("promptQ").innerHTML=PROMPTS[qi%PROMPTS.length];
  showPrompt();
  locked=false;
}
function choose(k){
  if(locked||!active) return; locked=true;
  const {slots,desc}=active;
  const win = k==="a"?slots.a:slots.b;
  const lose= k==="a"?slots.b:slots.a;
  slots.a.el.classList.remove("live"); slots.b.el.classList.remove("live");
  slots.a.el.onclick=null; slots.b.el.onclick=null;
  win.el.classList.add("chosen"); lose.el.classList.add("eliminated");
  hidePrompt();

  const consensus = (slots.a.mis>=slots.b.mis)?slots.a:slots.b;
  const matched = (win===consensus);
  const w=weightFor(desc);
  const close=Math.abs(slots.a.mis-slots.b.mis)<=10;
  const pts = matched ? (w*100 + (close?50:0)) : 0;
  const upset = win.seed>lose.seed;
  score+=pts; totalPicks++; if(matched) consensusMatches++; else hotTakes++;
  if(upset){ upsetCount++; const gap=win.seed-lose.seed; if(gap>bestUpset.gap) bestUpset={name:win.name,over:lose.name,gap}; }
  catScore[win.cat]=(catScore[win.cat]||0)+w;
  updateScore(); floatPop(pts, matched, upset);
  beep(desc.scope==="finals"&&desc.rd===1);
  writeWinner(desc, win);
  qi++; setProg();
  setTimeout(()=>showReveal(win, matched, pts, upset), 640);
}
function finish(){
  active=null; hidePrompt();
  document.querySelectorAll(".match.active").forEach(m=>m.classList.remove("active"));
  setTimeout(()=>fitBoard(true), 200);
  setTimeout(showResult, 1700);
}

/* ============ floating popup ============ */
function floatPop(pts, matched, upset){
  const p=$("pop");
  let tag = matched ? "CONSENSUS" : "HOT TAKE";
  if(upset) tag += " · UPSET";
  const col = matched ? "#5ee08a" : "#FF5910";
  p.innerHTML='<span class="pts" style="color:'+col+'">'+(pts>0?"+"+pts:"+0")+'</span><span class="tag" style="color:'+col+'">'+tag+'</span>';
  p.classList.remove("go"); void p.offsetWidth; p.classList.add("go");
}

/* ============ reveal ============ */
let revealTimer=null, revealOpen=false;
function showReveal(win, matched, pts, upset){
  revealOpen=true;
  const head=$("revHead");
  head.textContent = matched ? "✓ Matches the consensus" : "✗ Hot take";
  head.className = "revhead "+(matched?"yes":"no");
  $("revName").textContent=win.name;
  const chip=$("revChip"); chip.textContent=CATS[win.cat].emoji+" "+CATS[win.cat].label; chip.className="chip "+win.cat;
  $("revSeed").textContent="#"+win.seed+" seed";
  $("revStory").textContent=win.story||"";
  $("revPts").innerHTML = (matched?"<b>+"+pts+"</b> misery points":'<span class="muted">no points — you went against the grain</span>') + (upset?' · <span class="upsetTag">UPSET</span>':"");
  $("reveal").classList.add("show");
}
function continueReveal(){
  if(!revealOpen) return; revealOpen=false; clearTimeout(revealTimer);
  $("reveal").classList.remove("show");
  if(active&&active.el) active.el.classList.remove("active");
  setTimeout(nextMatch, 120);
}

/* ============ RESULT ============ */
function showResult(){
  const champ=state.finals.champ;
  $("rChamp").textContent=champ.name;
  $("rSeed").textContent="#"+champ.seed+" seed · crowned most miserable";

  $("rScore").textContent=score.toLocaleString();
  $("rHot").textContent=hotTakes;
  const rate = totalPicks? consensusMatches/totalPicks : 0;
  let grade = rate>=.85?"A+":rate>=.70?"A":rate>=.55?"B":"C";
  let gname = rate>=.85?"Tortured Lifer":rate>=.70?"Seasoned Sufferer":rate>=.55?"Casual Masochist":"Contrarian Soul";
  $("rGrade").textContent=grade;
  $("rRate").textContent=gname;

  // archetype
  let top="H",best=-1;
  ["H","F","C","D"].forEach(c=>{ if(catScore[c]>best){best=catScore[c];top=c;} });
  const A=ARCHETYPES[top];
  const maxCat=Math.max(catScore.H,catScore.F,catScore.C,catScore.D,1);
  const bars=["H","F","C","D"].map(c=>{
    const pct=Math.round(catScore[c]/maxCat*100);
    return '<div class="barrow"><span class="bl">'+CATS[c].emoji+" "+CATS[c].label+'</span>'+
      '<span class="bartrack"><span style="width:'+pct+'%;background:'+CATS[c].color+'"></span></span></div>';
  }).join("");
  $("rArche").innerHTML='<div class="ae">'+A[0]+'</div><div class="at">'+A[1]+'</div>'+
    '<div class="ad">'+A[2]+'</div><div class="bars">'+bars+'</div>';

  // consensus agreement
  const agree = champ.name===AUTHORITY.champ;
  const ag=$("rAgree");
  ag.textContent = agree ? "✓ You match "+AUTHORITY.name : "✗ You broke from "+AUTHORITY.name;
  ag.className="agree "+(agree?"yes":"no");
  let txt = agree ? AUTHORITY.name+" crowned the same champion. Misery recognizes misery."
                  : "The consensus champion was <b>"+AUTHORITY.champ+"</b>. Reasonable people can suffer differently.";
  if(bestUpset.gap>0) txt += " Your spiciest upset: <b>"+bestUpset.name+"</b> over "+bestUpset.over+" (#"+(bestUpset.gap)+" seed gap).";
  $("rAgreeText").innerHTML=txt;

  const grid=$("rRegions"); grid.innerHTML="";
  state.finals.r0.forEach((fs,i)=>{
    const mine=fs.name||"—", same=mine===REGIONS[i].champ;
    grid.insertAdjacentHTML("beforeend",
      '<div class="r">'+REGIONS[i].name+' — you</div><div class="v '+(same?'ok':'')+'">'+mine+'</div>');
  });
  $("result").classList.remove("hidden");
}

/* ============ prompt helpers ============ */
function showPrompt(){ $("prompt").classList.add("show"); }
function hidePrompt(){ $("prompt").classList.remove("show"); }

/* ============ audio ============ */
let actx=null, muted=false;
function audioInit(){ try{ actx=actx||new (window.AudioContext||window.webkitAudioContext)(); }catch(e){} }
function beep(big){
  if(muted||!actx) return;
  try{
    const o=actx.createOscillator(), g=actx.createGain();
    o.type="sine"; o.frequency.value=big?90:150;
    g.gain.value=0.0001; o.connect(g); g.connect(actx.destination);
    const t=actx.currentTime;
    g.gain.exponentialRampToValueAtTime(big?0.22:0.13, t+0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t+(big?0.7:0.28));
    o.frequency.exponentialRampToValueAtTime(big?55:90, t+(big?0.7:0.28));
    o.start(t); o.stop(t+(big?0.72:0.3));
  }catch(e){}
}

/* ============ events ============ */
$("startBtn").onclick=()=>{ audioInit(); $("intro").classList.add("hidden"); startGame(); };
$("againBtn").onclick=()=>{ $("result").classList.add("hidden"); startGame(); };
$("restartBtn").onclick=()=>{ if(confirm("Restart from the beginning?")){ $("result").classList.add("hidden"); startGame(); } };
$("muteBtn").onclick=()=>{ muted=!muted; $("muteBtn").textContent=muted?"🔇":"🔊"; };
$("reveal").onclick=continueReveal;
$("revNext").onclick=(e)=>{ e.stopPropagation(); continueReveal(); };
let rTimer; window.addEventListener("resize",()=>{ clearTimeout(rTimer); rTimer=setTimeout(()=>{
  if(cam.fit) fitBoard(false);
  else if(active&&active.el) focusMatch(active.el,false);
},150); });

/* build once behind the intro */
buildBoard(); fitBoard(false);
</script>
</body>
</html>`;

    const iframe = document.createElement('iframe');
    iframe.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;border:none;';
    iframe.srcdoc = html;
    containerRef.current.appendChild(iframe);

    return () => {
      if (containerRef.current && iframe.parentNode) {
        containerRef.current.removeChild(iframe);
      }
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 bg-[#0A1428]" />;
}
