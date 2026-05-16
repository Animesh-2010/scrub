const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, BorderStyle, WidthType, ShadingType, LevelFormat, PageBreak
} = require('docx');
const fs = require('fs');

// ── Palette ──────────────────────────────────────────────────────
const NAVY   = "1A2D5A";
const BLUE   = "2155A3";
const LBLUE  = "D8E6F8";
const TEAL   = "0F6B5A";
const LTEAL  = "D4EFEA";
const TEAL2  = "1B8A9A";
const GREEN  = "166534";
const LGREEN = "DCFCE7";
const AMBER  = "B45309";
const LAMBER = "FEF3C7";
const RED    = "991B1B";
const LRED   = "FEE2E2";
const PURPLE = "5B21B6";
const LPURP  = "EDE9FE";
const PINK   = "BE185D";
const LPINK  = "FCE7F3";
const GRAY   = "F4F4F5";
const DGRAY  = "52525B";
const WHITE  = "FFFFFF";

// ── Helpers ──────────────────────────────────────────────────────
const sp  = (b=0,a=100) => ({spacing:{before:b,after:a}});
const r   = (t,o={}) => new TextRun({text:String(t),font:"Calibri",size:22,...o});
const rb  = (t,o={}) => r(t,{bold:true,...o});
const ri  = (t,o={}) => r(t,{italics:true,...o});
const p   = (ch,o={}) => new Paragraph({children:Array.isArray(ch)?ch:[ch],...sp(0,80),...o});
const e   = (b=0,a=160) => new Paragraph({children:[r("")],spacing:{before:b,after:a}});
const br  = () => new Paragraph({children:[new PageBreak()],spacing:{before:0,after:0}});

// Section banner
const sH = (title, fill=NAVY, tc=WHITE) => new Paragraph({
  ...sp(280,80),
  shading:{fill,type:ShadingType.CLEAR},
  children:[r("  "),new TextRun({text:title,font:"Calibri",size:26,bold:true,color:tc}),r("  ")]
});

// Sub-section heading
const sub = (t, col=NAVY) => new Paragraph({
  ...sp(200,60),
  border:{bottom:{style:BorderStyle.SINGLE,size:4,color:col,space:2}},
  children:[new TextRun({text:t,font:"Calibri",size:24,bold:true,color:col})]
});
const sub2 = (t, col=TEAL2) => new Paragraph({
  ...sp(160,50),
  children:[new TextRun({text:t,font:"Calibri",size:22,bold:true,color:col})]
});

// Note callout
const note  = (t,fill=LBLUE,tc=NAVY) => new Paragraph({...sp(50,50),shading:{fill,type:ShadingType.CLEAR},
  children:[r("  "),rb("→  ",{color:BLUE}),r(t,{color:tc})]});
const warn  = (t) => new Paragraph({...sp(50,50),shading:{fill:LAMBER,type:ShadingType.CLEAR},
  children:[r("  "),rb("⚠  ",{color:AMBER}),rb(t,{color:AMBER})]});
const ok    = (t) => new Paragraph({...sp(50,50),shading:{fill:LGREEN,type:ShadingType.CLEAR},
  children:[r("  "),rb("✓  ",{color:GREEN}),r(t,{color:GREEN})]});

// Bullet
const bul = (ch,ref="bul") => new Paragraph({numbering:{reference:ref,level:0},...sp(30,30),
  children:Array.isArray(ch)?ch:[r(ch)]});
const nbul = (ch) => bul(ch,"num");

// ── Table builder ─────────────────────────────────────────────────
function cell(txt,w,fill,col,bold=false,center=false,sz=20){
  return new TableCell({
    borders:{top:{style:BorderStyle.SINGLE,size:1,color:"C5CDD8"},bottom:{style:BorderStyle.SINGLE,size:1,color:"C5CDD8"},left:{style:BorderStyle.SINGLE,size:1,color:"C5CDD8"},right:{style:BorderStyle.SINGLE,size:1,color:"C5CDD8"}},
    width:{size:w,type:WidthType.DXA},shading:{fill,type:ShadingType.CLEAR},
    margins:{top:80,bottom:80,left:110,right:110},
    children:[new Paragraph({spacing:{before:0,after:0},alignment:center?AlignmentType.CENTER:AlignmentType.LEFT,
      children:[new TextRun({text:String(txt),font:"Calibri",size:sz,bold,color:col})]})]
  });
}
function tbl(headers,rows,widths,hfill=NAVY){
  const total=widths.reduce((a,b)=>a+b,0);
  return new Table({
    width:{size:total,type:WidthType.DXA},columnWidths:widths,
    rows:[
      new TableRow({children:headers.map((h,i)=>cell(h,widths[i],hfill,WHITE,true,true,21))}),
      ...rows.map((row,ri)=>new TableRow({children:row.map((c,ci)=>{
        const fill=ri%2===0?WHITE:GRAY;
        const col=typeof c==='object'?c.col:"1A1A2E";
        const bold=typeof c==='object'?c.bold:false;
        const val=typeof c==='object'?c.val:c;
        const cf=typeof c==='object'?c.fill:fill;
        return cell(val,widths[ci],cf,col,bold);
      })}))
    ]
  });
}

// Role banner card (coloured left-bar style)
function roleBanner(name, role, dept, fill, lc){
  return new Paragraph({
    ...sp(180,60),
    shading:{fill,type:ShadingType.CLEAR},
    border:{left:{style:BorderStyle.SINGLE,size:14,color:lc},top:{style:BorderStyle.SINGLE,size:2,color:lc},bottom:{style:BorderStyle.SINGLE,size:2,color:lc},right:{style:BorderStyle.SINGLE,size:2,color:lc}},
    children:[
      r("  "),
      new TextRun({text:name,font:"Calibri",size:23,bold:true,color:lc}),
      new TextRun({text:"  ·  ",font:"Calibri",size:22,color:DGRAY}),
      new TextRun({text:role,font:"Calibri",size:22,bold:true,color:"1A1A2E"}),
      new TextRun({text:"  —  ",font:"Calibri",size:21,color:DGRAY}),
      new TextRun({text:dept,font:"Calibri",size:20,italics:true,color:DGRAY}),
    ]
  });
}

// Task row for individual week plan
function taskRow(task, owner, due, priority, pri_col=NAVY){
  const priorityFill = pri_col===RED ? LRED : pri_col===AMBER ? LAMBER : pri_col===GREEN ? LGREEN : pri_col===TEAL ? LTEAL : WHITE;
  const priorityColor = pri_col || DGRAY;
  return new TableRow({children:[
    cell(task,   3800, WHITE,     "1A1A2E"),
    cell(owner,  1600, GRAY,      NAVY, true),
    cell(due,    900,  WHITE,     DGRAY),
    cell(priority,900, priorityFill, priorityColor, true, true),
  ]});
}

// ═══════════════════════════════════════════════════════
// DOCUMENT
// ═══════════════════════════════════════════════════════
const doc = new Document({
  numbering:{config:[
    {reference:"bul",levels:[{level:0,format:LevelFormat.BULLET,text:"•",alignment:AlignmentType.LEFT,
      style:{paragraph:{indent:{left:600,hanging:300}}}}]},
    {reference:"num",levels:[{level:0,format:LevelFormat.DECIMAL,text:"%1.",alignment:AlignmentType.LEFT,
      style:{paragraph:{indent:{left:600,hanging:300}}}}]},
    {reference:"sub",levels:[{level:0,format:LevelFormat.BULLET,text:"◦",alignment:AlignmentType.LEFT,
      style:{paragraph:{indent:{left:900,hanging:300}}}}]},
  ]},
  styles:{default:{document:{run:{font:"Calibri",size:22}}}},
  sections:[{
    properties:{page:{size:{width:11906,height:16838},margin:{top:1080,right:1000,bottom:1080,left:1260}}},
    children:[

// ══ COVER ════════════════════════════════════════════════════════
new Paragraph({alignment:AlignmentType.CENTER,...sp(0,0),
  border:{bottom:{style:BorderStyle.DOUBLE,size:8,color:NAVY,space:4}},
  children:[new TextRun({text:"SCRUB — TEAM ORGANISATION & 1-MONTH EXECUTION PLAN",font:"Calibri",size:32,bold:true,color:NAVY})]}),
new Paragraph({alignment:AlignmentType.CENTER,...sp(30,0),children:[
  new TextRun({text:"Organisational Structure · Roles · Week-by-Week Task Plan · Meeting Cadence · KPIs",font:"Calibri",size:21,italics:true,color:TEAL2})]}),
new Paragraph({alignment:AlignmentType.CENTER,...sp(8,0),children:[
  new TextRun({text:"AASK Technologies  ·  RV College of Engineering, Bengaluru  ·  May – June 2026",font:"Calibri",size:19,color:DGRAY})]}),
new Paragraph({alignment:AlignmentType.CENTER,...sp(8,60),children:[
  new TextRun({text:"Team: 11 Members  ·  Project Lead: Krishna Purwar",font:"Calibri",size:19,bold:true,color:NAVY})]}),

new Paragraph({...sp(20,200),alignment:AlignmentType.CENTER,shading:{fill:LBLUE,type:ShadingType.CLEAR},
  children:[
    rb("FINAL DELIVERABLE:  ",{color:NAVY}),
    r("Industry-grade SCRUB prototype ready for investor demonstration + 3,500+ community (Instagram, LinkedIn, Reddit)  —  in 30 days.",{color:NAVY})
  ]}),

// ══ SECTION 1 — TEAM ROSTER ══════════════════════════════════════
sH("1.  TEAM ROSTER & ROLE ASSIGNMENTS"),
e(0,40),

tbl(
  ["#","Name","Roll No.","Dept","Team Role","Reporting To"],
  [
    ["00",{val:"Krishna Purwar",bold:true,col:NAVY,fill:LBLUE},{val:"Project Lead",col:NAVY,fill:LBLUE},{val:"ME — RVCE",col:DGRAY,fill:LBLUE},{val:"FOUNDER / PROJECT LEAD",bold:true,col:TEAL2,fill:LBLUE},{val:"Faculty Mentors",col:DGRAY,fill:LBLUE}],
    ["01","Hariharan",     "1RV24ME043", "ME","Mechanical Lead",         "Krishna"],
    ["02","Skanda S.B.",   "1RV24ME104", "ME","Mechanical — Fabrication","Hariharan"],
    ["03","Siddiq",        "1RV24ME103", "ME","Mechanical — CAD & FEA",  "Hariharan"],
    ["04","Ashutosh",      "1RV24EC039", "ECE","Electronics Lead",        "Krishna"],
    ["05","Varshaa Pradeep","1RV24EE058","ECE","Hardware — Sensors & PCB","Ashutosh"],
    ["06","Lakshya Utradhi","1RV24EE025","ECE","Hardware — Power & BMS",  "Ashutosh"],
    ["07","Adya Dalmia",   "1RV24CS020", "CSE","Software Lead",           "Krishna"],
    ["08","Suraj Gupta",   "1RV24CS291", "CSE","Software — AI/ML",        "Adya"],
    ["09","Dishita",       "1RV24CS079", "CSE","Software — Navigation",   "Adya"],
    ["10","Syed Farhan",   "1RV25CS184", "CSE","Software — Dashboard/IoT","Adya"],
    ["11","Prasanna Roy",  "1RV25CS120", "MARKET","Growth & Media Lead",  "Krishna"],
  ],
  [300,1700,1300,800,2000,1426], NAVY
),
e(0,60),
warn("Every team member must sign the NDA + IP Assignment Agreement before starting. No exceptions. IP filing 2 (weed-puller) must be submitted BEFORE any public demo of the mechanism."),

// ══ SECTION 2 — ORG STRUCTURE ════════════════════════════════════
br(),
sH("2.  ORGANISATIONAL STRUCTURE"),
e(0,40),

p([r("The team operates in a "),rb("flat-hierarchy with domain leads"),r(". Each domain lead owns their track end-to-end and reports daily to Krishna. Cross-domain collaboration is mandatory — mechanical needs electronics for motor specs, electronics needs software for firmware, software needs mechanical for integration specs.")]),
e(0,60),

// Org chart as styled text blocks
new Paragraph({...sp(0,0),alignment:AlignmentType.CENTER,
  children:[new TextRun({text:"ORGANISATIONAL CHART",font:"Calibri",size:20,bold:true,color:DGRAY,charSpacing:200})]}),
e(0,30),

// Top — Project Lead
new Paragraph({...sp(0,0),alignment:AlignmentType.CENTER,shading:{fill:NAVY,type:ShadingType.CLEAR},
  children:[new TextRun({text:"  KRISHNA PURWAR  —  PROJECT LEAD & FOUNDER  ",font:"Calibri",size:22,bold:true,color:WHITE})]}),

// Connector row
new Paragraph({...sp(0,0),alignment:AlignmentType.CENTER,
  children:[new TextRun({text:"│",font:"Calibri",size:20,color:DGRAY})]}),
new Paragraph({...sp(0,0),alignment:AlignmentType.CENTER,
  children:[new TextRun({text:"├──────────────────┬──────────────────┬──────────────────┤",font:"Calibri",size:16,color:DGRAY})]}),
e(0,20),

// Four domain leads row
new Table({
  width:{size:9026,type:WidthType.DXA},columnWidths:[2200,2200,2200,2426],
  rows:[new TableRow({children:[
    new TableCell({borders:{top:{style:BorderStyle.SINGLE,size:3,color:TEAL},bottom:{style:BorderStyle.SINGLE,size:3,color:TEAL},left:{style:BorderStyle.SINGLE,size:3,color:TEAL},right:{style:BorderStyle.SINGLE,size:3,color:TEAL}},
      width:{size:2200,type:WidthType.DXA},shading:{fill:LTEAL,type:ShadingType.CLEAR},margins:{top:100,bottom:100,left:120,right:120},
      children:[
        new Paragraph({spacing:{before:0,after:40},alignment:AlignmentType.CENTER,children:[new TextRun({text:"🔧 MECHANICAL",font:"Calibri",size:20,bold:true,color:TEAL})]}),
        new Paragraph({spacing:{before:0,after:20},alignment:AlignmentType.CENTER,children:[new TextRun({text:"Lead: Hariharan",font:"Calibri",size:19,bold:true,color:NAVY})]}),
        new Paragraph({spacing:{before:0,after:0},alignment:AlignmentType.CENTER,children:[new TextRun({text:"Skanda · Siddiq",font:"Calibri",size:18,color:DGRAY})]}),
      ]
    }),
    new TableCell({borders:{top:{style:BorderStyle.SINGLE,size:3,color:AMBER},bottom:{style:BorderStyle.SINGLE,size:3,color:AMBER},left:{style:BorderStyle.SINGLE,size:3,color:AMBER},right:{style:BorderStyle.SINGLE,size:3,color:AMBER}},
      width:{size:2200,type:WidthType.DXA},shading:{fill:LAMBER,type:ShadingType.CLEAR},margins:{top:100,bottom:100,left:120,right:120},
      children:[
        new Paragraph({spacing:{before:0,after:40},alignment:AlignmentType.CENTER,children:[new TextRun({text:"⚡ ELECTRONICS",font:"Calibri",size:20,bold:true,color:AMBER})]}),
        new Paragraph({spacing:{before:0,after:20},alignment:AlignmentType.CENTER,children:[new TextRun({text:"Lead: Ashutosh",font:"Calibri",size:19,bold:true,color:NAVY})]}),
        new Paragraph({spacing:{before:0,after:0},alignment:AlignmentType.CENTER,children:[new TextRun({text:"Varshaa · Lakshya",font:"Calibri",size:18,color:DGRAY})]}),
      ]
    }),
    new TableCell({borders:{top:{style:BorderStyle.SINGLE,size:3,color:PURPLE},bottom:{style:BorderStyle.SINGLE,size:3,color:PURPLE},left:{style:BorderStyle.SINGLE,size:3,color:PURPLE},right:{style:BorderStyle.SINGLE,size:3,color:PURPLE}},
      width:{size:2200,type:WidthType.DXA},shading:{fill:LPURP,type:ShadingType.CLEAR},margins:{top:100,bottom:100,left:120,right:120},
      children:[
        new Paragraph({spacing:{before:0,after:40},alignment:AlignmentType.CENTER,children:[new TextRun({text:"💻 SOFTWARE",font:"Calibri",size:20,bold:true,color:PURPLE})]}),
        new Paragraph({spacing:{before:0,after:20},alignment:AlignmentType.CENTER,children:[new TextRun({text:"Lead: Adya",font:"Calibri",size:19,bold:true,color:NAVY})]}),
        new Paragraph({spacing:{before:0,after:0},alignment:AlignmentType.CENTER,children:[new TextRun({text:"Suraj · Dishita · Farhan",font:"Calibri",size:18,color:DGRAY})]}),
      ]
    }),
    new TableCell({borders:{top:{style:BorderStyle.SINGLE,size:3,color:PINK},bottom:{style:BorderStyle.SINGLE,size:3,color:PINK},left:{style:BorderStyle.SINGLE,size:3,color:PINK},right:{style:BorderStyle.SINGLE,size:3,color:PINK}},
      width:{size:2426,type:WidthType.DXA},shading:{fill:LPINK,type:ShadingType.CLEAR},margins:{top:100,bottom:100,left:120,right:120},
      children:[
        new Paragraph({spacing:{before:0,after:40},alignment:AlignmentType.CENTER,children:[new TextRun({text:"📣 GROWTH",font:"Calibri",size:20,bold:true,color:PINK})]}),
        new Paragraph({spacing:{before:0,after:20},alignment:AlignmentType.CENTER,children:[new TextRun({text:"Lead: Prasanna",font:"Calibri",size:19,bold:true,color:NAVY})]}),
        new Paragraph({spacing:{before:0,after:0},alignment:AlignmentType.CENTER,children:[new TextRun({text:"(+ future recruit)",font:"Calibri",size:18,color:DGRAY})]}),
      ]
    }),
  ]})]
}),
e(0,60),
note("Cross-domain integration pair: Ashutosh (Electronics Lead) has a standing sync with Adya (Software Lead) every Tuesday and Thursday at 9 PM to align on PCB pin-outs, firmware interfaces, and sensor data formats."),

// ══ SECTION 3 — INDIVIDUAL ROLE SPECS ════════════════════════════
br(),
sH("3.  INDIVIDUAL ROLE SPECIFICATIONS"),
e(0,40),

// ── MECHANICAL ──────────────────────────────────────────────────
sub("3.1  Mechanical Engineering Team", TEAL),
e(0,20),

roleBanner("Hariharan","Mechanical Lead","ME — 1RV24ME043",LTEAL,TEAL),
p([rb("Primary ownership: "),r("All fabrication, vendor coordination, and mechanical integration. Hariharan is accountable for the physical robot being field-ready by end of Week 4.")]),
bul([rb("Week 1: "),r("Print and assemble mesh tensioner components (IN PROGRESS). Finalise material order for side panels (fibreglass). Order EVA foam for drive roller grip layer.")]),
bul([rb("Week 2: "),r("Fabricate and fit triangular side containment panels. Install mesh liner sheet. Test drive roller grip wrap — re-check tensioner post-installation.")]),
bul([rb("Week 3: "),r("Finalize propeller replacement — add screw-mount slots to CAD, print propeller guard/shroud (PETG/ASA). Assemble and test on water.")]),
bul([rb("Week 4: "),r("Full mechanical integration test with electronics installed. Waterproofing pass. Pre-demo inspection checklist signed off.")]),
bul([rb("Documentation: "),r("Maintain design log after every fabrication decision. All vendor orders in writing (WhatsApp with drawing attached — never verbal).")]),
e(0,30),

roleBanner("Skanda Seetharaman B.","Mechanical — Fabrication","ME — 1RV24ME104",LTEAL,TEAL),
bul([rb("Week 1: "),r("3D print tensioner saddle clamp body (lower half + upper clamp), lateral rod end-brackets ×2. Assemble tensioner on chassis.")]),
bul([rb("Week 2: "),r("Cut and fit fibreglass triangular side containment panels (both sides). Install liner sheet between mesh runs. Run lateral slip test — with and without anti-slip disks.")]),
bul([rb("Week 3: "),r("Physical assembly of propeller guard shroud. Fabricate cable management clips and wire routing brackets for electronics enclosure.")]),
bul([rb("Week 4: "),r("Prototype 2 full assembly alongside Hariharan. Pool/water body integration test. Photograph every stage for content library.")]),
e(0,30),

roleBanner("Siddiq","Mechanical — CAD & FEA","ME — 1RV24ME103",LTEAL,TEAL),
bul([rb("Week 1: "),r("Complete as-built SolidWorks model of current prototype v0.6 — hull, conveyor assembly, all mounted components. Upload to shared drive.")]),
bul([rb("Week 2: "),r("Run FEA (SolidWorks Simulation): static structural at 75 kg load + buoyancy loads. Document safety factors. Begin CAD of conveyor upgrades.")]),
bul([rb("Week 3: "),r("Complete detailed CAD of propeller guard/shroud (snap-fit, PETG). CAD of electronics enclosure (IP54 gasketed lid). Submit to Skanda for printing.")]),
bul([rb("Week 4: "),r("Generate full manufacturing drawings with tolerances for IP filing support. Begin v2.0 concept sketches — weed-puller mechanism (3 concepts for IP Filing 2 brief).")]),
e(0,60),

// ── ELECTRONICS ──────────────────────────────────────────────────
sub("3.2  Electronics & Electrical Team", AMBER),
e(0,20),

roleBanner("Ashutosh","Electronics Lead","ECE — 1RV24EC039",LAMBER,AMBER),
p([rb("Primary ownership: "),r("All PCB design, electronics integration, power system, and embedded firmware. Ashutosh is accountable for zero electronics failure during Week 4 water test.")]),
bul([rb("Week 1: "),r("KiCad PCB v2 schematic — motor control, sensor integration, power rails (48V→12V→5V→3.3V). Submit Gerbers to Lion Circuits by Day 5.")]),
bul([rb("Week 2: "),r("PCB v2 arrives — assemble, solder, bench test ALL circuits on lab power supply before integration. Write STM32 motor PWM firmware (20 kHz).")]),
bul([rb("Week 3: "),r("Integrate PCB v2 into robot chassis. Run sensor validation against lab standards (pH, turbidity, TDS). Verify BMS protection thresholds.")]),
bul([rb("Week 4: "),r("PCB v2 waterproofing — conformal coat (MG Chemicals 422B). IP65 enclosure fitting. 1-hour stress test in waterproof enclosure before pool test.")]),
bul([rb("Cross-domain sync: "),r("Tuesday + Thursday 9 PM with Adya — align on UART protocol, STM32↔RPi5 message format, sensor pin assignments.")]),
e(0,30),

roleBanner("Varshaa Pradeep","Hardware — Sensors & PCB","ECE — 1RV24EE058",LAMBER,AMBER),
bul([rb("Week 1: "),r("Bench calibration of all sensors: pH (2-point buffer calibration), turbidity (NTU standard), TDS, temperature. Document calibration coefficients.")]),
bul([rb("Week 2: "),r("PCB assembly support — SMD soldering, sensor breakout connections. Log all readings in shared test sheet. Cross-validate pH + turbidity vs. lab standard.")]),
bul([rb("Week 3: "),r("Wire harness fabrication — marine-grade tinned copper, colour-coded, labelled. Install GPS (NEO-M8N) with clear sky-view on mast. Verify NMEA data stream.")]),
bul([rb("Week 4: "),r("Full sensor suite live test in water body — log all parameters at 1 Hz for 30 minutes. Export CSV. Share with Farhan for dashboard display.")]),
e(0,30),

roleBanner("Lakshya Utradhi","Hardware — Power & BMS","ECE — 1RV24EE025",LAMBER,AMBER),
bul([rb("Week 1: "),r("Assemble 16S LiFePO₄ battery pack — cell matching, series connection, insulation tape. Connect Daly BMS. Verify OVP/UVP thresholds with lab meter.")]),
bul([rb("Week 2: "),r("Install and test DC-DC converters: 48V→12V (Meanwell SD-25D-12), 48V→5V (PD trigger). Verify all rail voltages under load. Document current draw per rail.")]),
bul([rb("Week 3: "),r("Install MPPT charge controller (Victron 75/15). Test solar panel → battery charging cycle. Verify boost operation (19.5V panel → 51.2V bus). Log charging data.")]),
bul([rb("Week 4: "),r("Fuse sizing and installation (ANL 15A main, blade fuses per branch). Full power system load test: all subsystems on simultaneously for 60 minutes. Record temperature of BMS and converters.")]),
e(0,60),

// ── SOFTWARE ─────────────────────────────────────────────────────
sub("3.3  Software Team", PURPLE),
e(0,20),

roleBanner("Adya Dalmia","Software Lead","CSE — 1RV24CS020",LPURP,PURPLE),
p([rb("Primary ownership: "),r("Entire software stack — ML model, navigation, dashboard, IoT. Adya reviews all code before merge. No code goes to the robot without lead sign-off.")]),
bul([rb("Week 1: "),r("Set up GitHub (private repo) — branch strategy: main/dev/feature. RPi5 Ubuntu 22.04 setup. Define UART protocol spec for RPi5↔STM32. Code review framework.")]),
bul([rb("Week 2: "),r("YOLOv8 model retraining on SCRUB lake dataset. Achieve ≥90% mAP on test set. Version tag model weights. Write inference + NMS pipeline.")]),
bul([rb("Week 3: "),r("Integrate navigation + ML + IoT into single unified process on RPi5. End-to-end test: GPS waypoint → debris detect → conveyor trigger → return. Record demo video.")]),
bul([rb("Week 4: "),r("Software freeze. v1.0 tag on GitHub. Write README + API docs. Prepare demo mode (one-click launch, pre-loaded Kengeri waypoints). Code handoff package.")]),
e(0,30),

roleBanner("Suraj Gupta","Software — AI/ML","CSE — 1RV24CS291",LPURP,PURPLE),
bul([rb("Week 1: "),r("Collect and organise SCRUB lake dataset — label floating plastic, thermocol, organic matter, clear water (use Roboflow). Target: 500+ annotated frames.")]),
bul([rb("Week 2: "),r("Train YOLOv8n on dataset. Evaluate: mAP, precision, recall, confusion matrix. Iterate augmentation (brightness, contrast, hue — lake-specific). Export TFLite weights.")]),
bul([rb("Week 3: "),r("Deploy TFLite model on RPi5. Benchmark: frames per second, CPU/RAM usage. Optimise if <10 FPS. Write detection → navigation trigger callback.")]),
bul([rb("Week 4: "),r("Test model on live video at pool/water body. Log false positives (reeds, reflections). Document and tag v1.0 model. Write model card for IP Filing 3 support.")]),
e(0,30),

roleBanner("Dishita","Software — Navigation","CSE — 1RV24CS079",LPURP,PURPLE),
bul([rb("Week 1: "),r("Implement GPS boustrophedon (lawn-mower) path planner in Python. Simulate on Kengeri Lake polygon (GeoJSON). Unit test with mock GPS feed.")]),
bul([rb("Week 2: "),r("Integrate obstacle avoidance: HC-SR04 → STM32 UART → RPi5 halt command. Bench test: robot halts within 20 cm of obstacle in 3/3 trials.")]),
bul([rb("Week 3: "),r("Dead-reckoning fallback: IMU (MPU6050) + wheel encoder odometry for GPS dropout. Kalman filter fusion. Test 30s GPS-off → re-acquire scenario.")]),
bul([rb("Week 4: "),r("Full autonomous run test: launch → grid path → debris collect → return to dock. Record GPS track overlay. Export clean demo video for Growth team.")]),
e(0,30),

roleBanner("Syed Farhan Hashmi","Software — Dashboard & IoT","CSE — 1RV25CS184",LPURP,PURPLE),
bul([rb("Week 1: "),r("Dashboard v2 backend: FastAPI + MQTT broker. Define all data topics: GPS, pH, turbidity, DO, TDS, speed, bin-fill, video stream endpoint.")]),
bul([rb("Week 2: "),r("Frontend: live GPS map (Leaflet.js), real-time sensor charts (Chart.js), live video embed, threshold alert popups. Deploy on public URL (Render/Railway).")]),
bul([rb("Week 3: "),r("Offline buffer: SQLite local storage on RPi5, retry queue for 4G drops. Test: cut internet for 10 min → data queued → reconnect → all data uploaded.")]),
bul([rb("Week 4: "),r("Dashboard demo mode: show Kengeri Lake test data replay. Record 60-second screen capture for investor pitch. Write 1-page dashboard user guide.")]),
e(0,60),

// ── GROWTH ───────────────────────────────────────────────────────
sub("3.4  Growth & Media", PINK),
e(0,20),

roleBanner("Prasanna Roy","Growth & Media Lead","MARKET — 1RV25CS120",LPINK,PINK),
p([rb("PRIMARY KPI: "),r("3,500+ total community by Day 30  (Instagram 2,000 + LinkedIn 900 + Reddit 400 + Email 200).  "),rb("This is non-negotiable."),r(" Every piece of engineering output must be turned into content within 48 hours.")]),
bul([rb("Week 1: "),r("Set up all platforms (@aask.tech / @scrub.robot). Content calendar (Notion). Edit 3 reels from existing Kengeri footage. Post intro reel Day 1. Write founder story post for LinkedIn.")]),
bul([rb("Week 2: "),r("Email United Way Bengaluru, KSPCB, Infosys Foundation. 'Build in public' posts: fabrication updates, sensor data, PCB photos. Post 5× per week. Start Reddit presence (r/robotics, r/IndiaStartups, r/bangalore).")]),
bul([rb("Week 3: "),r("Field trial reel (SCRUB on water) — this is the biggest content piece. Post same day as trial. 'IP filed' announcement post. YouTube: 3-minute build documentary. Reach 1,500 IG followers by end of Week 3.")]),
bul([rb("Week 4: "),r("Demo Day announcement campaign (3 posts build-up). Investor reel (90-sec cinematic). YourStory / Inc42 story submission. Final community count screenshot as KPI proof. Thank-you post after Demo Day.")]),
bul([rb("Reddit strategy: "),r("Post 1x/week to r/robotics, r/IndiaStartups, r/bangalore, r/MachineLearning with genuine value-add (lake data, build photos, technical questions). No spam — engagement only.")]),
e(0,60),

// ══ SECTION 4 — MEETING STRUCTURE ════════════════════════════════
br(),
sH("4.  MEETING STRUCTURE & OPERATING RHYTHM"),
e(0,40),

tbl(
  ["Meeting","Type","Who","Time","Duration","Output"],
  [
    ["Daily Standup",      "Online (daily)","All 11 members","9:00 PM IST","15 min","Each person: Done yesterday / Doing today / Any blocker. Blockers resolved same day."],
    ["Cross-Domain Sync",  "Online (Tue+Thu)","Ashutosh + Adya","9:30 PM IST","20 min","Firmware/software interface alignment: pin assignments, UART spec, timing."],
    ["Weekly Review",      "Offline (Saturday)","All 11 members","10:00 AM IST","90 min","Demo of week's work (live, not slides). Milestone check. Next week sprint planning."],
    ["1:1 Lead Check-in",  "Online (Wed)","Krishna + each lead","Rolling, 15 min each","15 min ea.","Blockers, resource needs, cross-team dependencies. Leads only."],
    ["Content Review",     "Online (Friday)","Prasanna + Krishna","8:00 PM IST","20 min","Review all content before posting. Approve or revise. Next week's calendar confirmed."],
    ["Demo Day Prep",      "Offline (Day 28)","All 11","Full day","8 hours","Full system integration run. Investor reel shoot. Final QA checklist."],
  ],
  [1400,1200,1700,1100,900,2226], NAVY
),
e(0,60),

note("Daily standup is 15 minutes MAXIMUM. Format: 1 sentence each. If a blocker needs more than 30 seconds to explain, it goes offline to a domain-specific call — do not hold the full team."),
warn("Saturday offline meetings are MANDATORY. No exceptions except documented medical/family emergency. Whoever misses must submit a written update before 9 AM Saturday and catch up via recording."),

// ══ SECTION 5 — WEEK BY WEEK TASK PLAN ═══════════════════════════
br(),
sH("5.  WEEK-BY-WEEK TASK BREAKDOWN"),
e(0,40),

p([r("Each week has a "),rb("single gate milestone"),r(". The team does not move to the next week until the gate is cleared. If behind, Saturday is used for catch-up — not the next week's tasks.")]),
e(0,60),

// ── WEEK 1 ──────────────────────────────────────────────────────
sub("WEEK 1  (Days 1–7)  — Foundation: Set Up & First Outputs", TEAL2),
note("Gate: PCB Gerbers sent to Lion Circuits · Tensioner assembled & installed · YOLOv8 dataset labelled (500 frames) · All 4 social handles live & 3 reels published"),
e(0,30),

new Table({
  width:{size:9026,type:WidthType.DXA},columnWidths:[3800,1600,900,900],
  rows:[
    new TableRow({children:[
      cell("Task",3800,NAVY,WHITE,true,false,21),
      cell("Owner",1600,NAVY,WHITE,true,true,21),
      cell("Due",900,NAVY,WHITE,true,true,21),
      cell("Priority",900,NAVY,WHITE,true,true,21),
    ]}),
    taskRow("Print tensioner saddle clamp body + lateral rod end-brackets (×2)","Skanda","Day 2","P1 🔴"),
    taskRow("Assemble and install mesh tensioner on chassis — verify no mesh slack","Hariharan + Skanda","Day 3","P1 🔴"),
    taskRow("Complete as-built SolidWorks model of v0.6 — all subassemblies","Siddiq","Day 5","P1 🔴"),
    taskRow("Run lateral slip test (without disks) — measure and record drift distance","Hariharan","Day 5","P2 🟡"),
    taskRow("Design PCB v2 in KiCad — motor ctrl, sensor stack, all power rails","Ashutosh","Day 5","P1 🔴"),
    taskRow("Submit Gerbers to Lion Circuits (specify 4-layer, 1oz copper)","Ashutosh","Day 5","P1 🔴"),
    taskRow("Bench calibrate pH, turbidity, TDS sensors vs. lab standard — document coefficients","Varshaa","Day 4","P1 🔴"),
    taskRow("Assemble 16S LiFePO₄ pack — cell matching, BMS wiring, verify OVP/UVP","Lakshya","Day 5","P1 🔴"),
    taskRow("Set up GitHub repo (private): branch strategy, README, issue templates","Adya","Day 1","P1 🔴"),
    taskRow("RPi5 dev environment: Ubuntu 22.04, Python 3.11, PyTorch, OpenCV","Adya","Day 2","P1 🔴"),
    taskRow("Define UART protocol spec (STM32↔RPi5): message format, baud rate, CRC","Adya + Ashutosh","Day 3","P1 🔴"),
    taskRow("Collect + label SCRUB lake dataset: 500+ frames (Roboflow) — 4 classes","Suraj","Day 6","P1 🔴"),
    taskRow("Implement GPS boustrophedon path planner — simulate on Kengeri polygon","Dishita","Day 6","P2 🟡"),
    taskRow("FastAPI + MQTT backend scaffold — define all data topics and endpoints","Farhan","Day 5","P2 🟡"),
    taskRow("Set up @aask.tech + @scrub.robot on IG, LinkedIn, YouTube, X, Reddit","Prasanna","Day 1","P1 🔴"),
    taskRow("Edit + post 3 reels from existing Kengeri footage (30-45s each)","Prasanna","Day 4","P1 🔴"),
    taskRow("Write + publish LinkedIn founder story post (300 words)","Prasanna","Day 3","P2 🟡"),
    taskRow("Create content calendar for 30 days in Notion — all posts planned","Prasanna","Day 5","P2 🟡"),
  ]
}),
e(0,40),
ok("Week 1 Gate cleared when: Tensioner installed + PCB Gerbers sent + 500 labelled frames done + 3 reels live"),

e(0,60),

// ── WEEK 2 ──────────────────────────────────────────────────────
sub("WEEK 2  (Days 8–14)  — Build: Fabricate, Train, Develop", AMBER),
note("Gate: PCB v2 received & bench-tested · Anti-slip disks installed & drift test passed · YOLOv8 model ≥90% mAP · Dashboard live on public URL · 300 IG followers"),
e(0,30),

new Table({
  width:{size:9026,type:WidthType.DXA},columnWidths:[3800,1600,900,900],
  rows:[
    new TableRow({children:[
      cell("Task",3800,NAVY,WHITE,true,false,21),cell("Owner",1600,NAVY,WHITE,true,true,21),
      cell("Due",900,NAVY,WHITE,true,true,21),cell("Priority",900,NAVY,WHITE,true,true,21),
    ]}),
    taskRow("Install anti-slip disks — run lateral slip test WITH disks, record results","Hariharan + Skanda","Day 9","P1 🔴"),
    taskRow("Cut + fit fibreglass triangular side containment panels (both sides)","Skanda","Day 11","P1 🔴"),
    taskRow("Cut + install mesh liner sheet between upper/lower mesh runs","Skanda","Day 12","P2 🟡"),
    taskRow("FEA analysis of current hull (static load + buoyancy) — document safety factors","Siddiq","Day 12","P2 🟡"),
    taskRow("PCB v2 arrives from Lion Circuits — full bench test (all circuits, all rails)","Ashutosh + Varshaa","Day 10","P1 🔴"),
    taskRow("STM32 firmware: motor PWM (20 kHz), sensor ADC polling, UART TX to RPi5","Ashutosh","Day 13","P1 🔴"),
    taskRow("Install + test 48V→12V and 48V→5V converters — verify rails under load","Lakshya","Day 10","P2 🟡"),
    taskRow("Wire harness v2: marine-grade tinned copper, colour-coded, all labelled","Varshaa","Day 13","P2 🟡"),
    taskRow("Train YOLOv8n on labelled dataset — iterate until ≥90% mAP","Suraj","Day 12","P1 🔴"),
    taskRow("Export model: confusion matrix screenshot + mAP chart + TFLite weights","Suraj","Day 13","P1 🔴"),
    taskRow("Obstacle avoidance: HC-SR04 → STM32 UART halt — bench test 3/3 pass","Dishita","Day 12","P2 🟡"),
    taskRow("Dashboard frontend: Leaflet GPS map, Chart.js sensor panels, video embed","Farhan","Day 13","P1 🔴"),
    taskRow("Deploy dashboard on public URL (Render/Railway) — share link with team","Farhan","Day 14","P1 🔴"),
    taskRow("'Build in public' posts ×5: fabrication, PCB, sensor data, wiring progress","Prasanna","Daily","P1 🔴"),
    taskRow("First Reddit post: r/robotics — 'We are building an autonomous lake-cleaning robot in Bengaluru'","Prasanna","Day 9","P1 🔴"),
    taskRow("Email United Way Bengaluru + KSPCB + Infosys Foundation (use templates)","Prasanna","Day 10","P2 🟡"),
  ]
}),
e(0,40),
ok("Week 2 Gate cleared when: PCB bench-tested + model ≥90% + dashboard URL live + 300 IG followers"),

e(0,60),

// ── WEEK 3 ──────────────────────────────────────────────────────
sub("WEEK 3  (Days 15–21)  — Integrate: Full System on Water", PURPLE),
note("Gate: SCRUB runs autonomously on open water for 20+ min · IP Filing 2 draft submitted to attorney · Dashboard showing live data · 1,500 IG followers · Field trial reel posted"),
e(0,30),

new Table({
  width:{size:9026,type:WidthType.DXA},columnWidths:[3800,1600,900,900],
  rows:[
    new TableRow({children:[
      cell("Task",3800,NAVY,WHITE,true,false,21),cell("Owner",1600,NAVY,WHITE,true,true,21),
      cell("Due",900,NAVY,WHITE,true,true,21),cell("Priority",900,NAVY,WHITE,true,true,21),
    ]}),
    taskRow("Wrap drive roller with EVA foam grip layer — re-check tensioner position","Hariharan","Day 15","P1 🔴"),
    taskRow("Propeller replacement: add screw-mount slots to CAD, print + install","Skanda","Day 17","P1 🔴"),
    taskRow("3D print propeller guard/shroud (PETG) — install on both motor shafts","Skanda","Day 19","P1 🔴"),
    taskRow("3 concept sketches for weed-puller mechanism — annotated pros/cons","Siddiq","Day 18","P1 🔴"),
    taskRow("Begin IP Filing 2 technical drawings (best weed-puller concept) for attorney","Siddiq + Krishna","Day 20","P1 🔴"),
    taskRow("PCB v2 conformal coating (MG Chemicals 422B) + IP65 enclosure fitting","Ashutosh","Day 16","P1 🔴"),
    taskRow("Full electronics integration into chassis — all connectors mated, tested","Ashutosh + Varshaa","Day 18","P1 🔴"),
    taskRow("GPS (NEO-M8N) installed on mast — verify NMEA stream on RPi5","Varshaa","Day 16","P2 🟡"),
    taskRow("Install MPPT controller — test solar → battery charging cycle","Lakshya","Day 17","P2 🟡"),
    taskRow("FULL SYSTEM INTEGRATION: RPi5 + STM32 + sensors + motors — dry run","All leads","Day 18","P1 🔴"),
    taskRow("YOLOv8 deployed on RPi5 — benchmark: ≥10 FPS, CPU <80%","Suraj","Day 16","P1 🔴"),
    taskRow("End-to-end nav test: GPS waypoint → obstacle avoid → detect → collect → return","Dishita + Adya","Day 20","P1 🔴"),
    taskRow("Offline buffer: SQLite local queue + retry on reconnect — test 10-min drop","Farhan","Day 18","P2 🟡"),
    taskRow("FIELD TRIAL: Open water run — 20+ min autonomous. Record ALL data. Video shoot.","All team","Day 21","P1 🔴"),
    taskRow("Post field trial reel same day — tag BBMP, UWBe, Dr. Shanta","Prasanna","Day 21","P1 🔴"),
    taskRow("IP Filing 2 announcement post (LinkedIn + IG) — 'Second patent in development'","Prasanna","Day 20","P2 🟡"),
    taskRow("YouTube: 3-min build documentary (Week 1–3 compilation) — upload","Prasanna","Day 21","P2 🟡"),
  ]
}),
e(0,40),
ok("Week 3 Gate cleared when: 20-min autonomous water run completed + reel posted + IP Filing 2 draft with attorney + 1,500 IG followers"),

e(0,60),

// ── WEEK 4 ──────────────────────────────────────────────────────
sub("WEEK 4  (Days 22–30)  — Polish & Launch: Demo-Ready", PINK),
note("Gate: Industry-grade prototype passes 45-min unattended run · Software v1.0 released · All 3 IP filings active or submitted · 3,500 total community · Investor reel live"),
e(0,30),

new Table({
  width:{size:9026,type:WidthType.DXA},columnWidths:[3800,1600,900,900],
  rows:[
    new TableRow({children:[
      cell("Task",3800,NAVY,WHITE,true,false,21),cell("Owner",1600,NAVY,WHITE,true,true,21),
      cell("Due",900,NAVY,WHITE,true,true,21),cell("Priority",900,NAVY,WHITE,true,true,21),
    ]}),
    taskRow("Manufacturing BOM finalized — unit cost at 10 and 50 units verified","Siddiq + Hariharan","Day 24","P1 🔴"),
    taskRow("Prototype 2 full assembly + 45-min unattended open water run (no human touch)","All mech + elec","Day 26","P1 🔴"),
    taskRow("Write 3-page field trial report (2 runs: data, waste collected, anomalies)","Hariharan + Adya","Day 27","P1 🔴"),
    taskRow("PCB v2.1 iteration notes — document all rework wires for v3 corrections","Ashutosh","Day 24","P2 🟡"),
    taskRow("Prepare IP Filing 3 brief: PCB architecture technical drawings","Ashutosh + Krishna","Day 26","P2 🟡"),
    taskRow("GitHub: software v1.0 tag — README, API docs, install script (<30 min)","Adya","Day 24","P1 🔴"),
    taskRow("Demo mode: one-click launch, pre-loaded Kengeri waypoints, test with non-technical user","Adya + Farhan","Day 26","P1 🔴"),
    taskRow("Dashboard: Kengeri data replay mode for investor demo","Farhan","Day 25","P2 🟡"),
    taskRow("Fleet algorithm prototype: simulate 2 robots covering Kengeri polygon","Dishita","Day 27","P3 🟢"),
    taskRow("90-second investor reel (cinematic): problem → SCRUB → data → team → ask","Prasanna","Day 27","P1 🔴"),
    taskRow("Investor pitch deck finalized + reviewed by Dr. Shanta","Prasanna + Krishna","Day 26","P1 🔴"),
    taskRow("Submit to Karnataka Elevate + DST Ignition Grant applications","Prasanna","Day 28","P1 🔴"),
    taskRow("Tweet @anandmahindra with investor reel on Day 28","Prasanna","Day 28","P1 🔴"),
    taskRow("Demo Day event (RVCE) — invitations, logistics, live-stream setup","Prasanna","Day 30","P1 🔴"),
    taskRow("Post-Demo Day: follow-up emails to all attendees with pitch deck link","Prasanna + Krishna","Day 30","P1 🔴"),
    taskRow("DPIIT Startup India registration completed","Krishna + Prasanna","Day 24","P1 🔴"),
    taskRow("Full project report (50 pages) submitted to Dr. Shanta for certification","All leads","Day 30","P1 🔴"),
  ]
}),
e(0,40),
ok("Week 4 Gate = ALL of these true on Day 30: 45-min autonomous run ✓  |  Software v1.0 ✓  |  3,500 community ✓  |  Investor reel ✓  |  Demo Day held ✓"),

// ══ SECTION 6 — KPI TRACKER ══════════════════════════════════════
br(),
sH("6.  30-DAY KPI MASTER TRACKER"),
e(0,40),

tbl(
  ["KPI","Day 7","Day 14","Day 21","Day 30","Owner"],
  [
    ["Autonomous run duration (open water)","—","—","20 min","45 min","Adya / Hariharan"],
    ["Debris detection mAP","—","≥90%","≥90%","≥92%","Suraj"],
    ["PCB version (fabricated + tested)","v2 Gerbers sent","v2 bench-tested","v2 integrated","v2.1 notes done","Ashutosh"],
    ["IP filings active","1 (existing)","1","2 (draft with atty)","2 submitted + 3 brief","Krishna"],
    ["Instagram followers","100","300","1,500","2,000","Prasanna"],
    ["LinkedIn followers","50","150","500","900","Prasanna"],
    ["YouTube subscribers","0","50","200","400","Prasanna"],
    ["Reddit post engagements","0","50","200","500","Prasanna"],
    ["Email subscribers","0","50","150","300","Prasanna"],
    ["Total community","150","550","2,350","4,100","Prasanna"],
    ["Reels / videos published","3","8","14","22","Prasanna"],
    ["NGO / Govt meetings confirmed","0","1","2","4","Prasanna"],
    ["Grant applications submitted","0","0","0","2","Prasanna"],
    ["Investor outreach sent","0","0","2","10","Prasanna"],
    ["Field trial runs completed","0","0","1","3","Hariharan"],
    ["Sensor suite validated vs. lab","—","Yes","Yes","Yes","Varshaa"],
    ["Dashboard public URL live","—","Yes","Yes","Yes","Farhan"],
  ],
  [2400,1000,1000,1000,1000,1626], NAVY
),

// ══ SECTION 7 — RULES ════════════════════════════════════════════
br(),
sH("7.  TEAM RULES — NON-NEGOTIABLE"),
e(0,40),

tbl(
  ["Rule","Detail"],
  [
    ["Daily commitment","Minimum 4 hours/day active work, 6 days/week. This is a full-time engagement. If you cannot commit, say so on Day 1 — not Day 10."],
    ["No silent disappearances","If unavailable for >2 consecutive days, inform your domain lead in advance. Silent disappearance = removed from project + no certificate."],
    ["Daily standup is not optional","9 PM every day, 15 minutes. 1 sentence: done / doing / blocker. No exceptions without prior notice to Krishna."],
    ["Friday demos — working output only","No slides, no 'almost done'. Show working code, a printed part, a tested sensor — or explain exactly what broke and what you learned."],
    ["No verbal vendor instructions","All orders to 3D Printzkart, Lion Circuits, and suppliers go in writing (WhatsApp with drawing/spec attached). No verbal orders."],
    ["IP discipline","Nothing about the weed-puller mechanism appears publicly until IP Filing 2 is formally submitted. When in doubt — ask Krishna before posting."],
    ["Code quality","No undocumented function merged. Every PR has a 2-line description of what it does and how to test it. Adya reviews all merges."],
    ["Content approval","Prasanna submits all content to Krishna 24 hours before posting. No self-approval. Growth lead is the engine — not the decision-maker on messaging."],
    ["Certificate criteria","Project completion certificate issued only on delivery of ALL committed Week 4 milestones. Partial delivery = no certificate. No exceptions."],
  ],
  [2200,6826], NAVY
),
e(0,100),

// Footer
new Paragraph({
  alignment:AlignmentType.CENTER,...sp(100,0),
  border:{top:{style:BorderStyle.SINGLE,size:2,color:"AAAAAA",space:4}},
  children:[r("SCRUB Team Org & Execution Plan  ·  AASK Technologies  ·  RVCE Bengaluru  ·  May 2026",{size:18,color:DGRAY})]
}),
p([r("Krishna Purwar — Project Lead  ·  kpurwar1234@gmail.com  ·  +91 7007633541",{size:18,color:DGRAY})],{alignment:AlignmentType.CENTER}),

    ]
  }]
});

Packer.toBuffer(doc).then(buf=>{
  fs.writeFileSync('SCRUB_Team_Org_Plan.docx',buf);
  console.log('done');
}).catch(e=>{console.error(e);process.exit(1);});
