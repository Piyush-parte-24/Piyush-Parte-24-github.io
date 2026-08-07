/* =========================================================================
   PREHISTORIC ARCHIVE — CONTENT DATA
   -------------------------------------------------------------------------
   ★ THIS IS THE MAIN FILE YOU EDIT TO ADD OR CHANGE NOTES ★
   You do NOT need to understand JavaScript. Just copy a block, change the
   words between the quotes, and save.

   TO ADD A NEW NOTE:
     1. Copy one { ... } block inside archiveEntries (including the comma).
     2. Change the values between the "quotes".
     3. Set "file" to your note's filename inside the notes/ folder.
     4. Save. It appears on the Archive (and Home if featured:true).

   FIELD GUIDE:
     number      -> shown as "EXPEDITION 04"
     title       -> the note title
     category    -> classification label; filter buttons build from these
     description -> one or two short sentences
     status      -> "Documented" | "In Progress" | "Unexplored"
     date        -> any short label, e.g. "2026" or "FIELD SEASON I"
     file        -> filename in the notes/ folder, e.g. "world-history.html"
                    (leave "" for a locked / not-yet-written note)
     icon        -> one emoji (optional)
     image       -> optional image path, e.g. "assets/images/mynote.jpg"
                    (leave "" for none)
     featured    -> true to also show it on the Home page
   ========================================================================= */

/* ---------- SITE-WIDE TEXT (edit your name / taglines here) ---------- */
const SITE = {
  name:        "Pɪʏᴜꜱʜ Pᴀʀᴛᴇ",
  subtitle:    "THE PREHISTORIC ARCHIVE",
  tagline:     "NOTES • IDEAS • DISCOVERIES",
  cta:         "ENTER THE EXPEDITION",
  footerNote:  "The Prehistoric Archive · Field Records",
  aboutRole:   "Student • Observer • Learner • Explorer",
  aboutText: [
    "This archive is a record of an ongoing expedition — not through jungle and stone, but through history, philosophy and ideas.",
    "I keep notes the way a field researcher keeps a journal: carefully, curiously, and with the belief that anything worth understanding is worth preserving. Some entries are histories of the world and of India. Others reach toward older, quieter questions about the self and reality.",
    "Knowledge, to me, is discovered like fossils — patiently, layer by layer. What you find here are the specimens I have recovered so far. The dig is far from finished."
  ]
};

/* ---------- MAIN ARCHIVE (your documented notes) ---------- */
const archiveEntries = [
  {
    number: "01",
    title: "Modern Indian History",
    category: "Human History",
    description: "European advent to Independence — battles, governance, the freedom struggle, reform movements and the leaders who shaped a nation.",
    status: "Documented",
    date: "FIELD SEASON I",
    file: "modern-indian-history.html",
    icon: "🇮🇳",
    image: "",
    featured: true
  },
  {
    number: "02",
    title: "World History",
    category: "Global History",
    description: "From the Renaissance to the fall of the Soviet Union — revolutions, world wars, the Cold War and the making of the modern world.",
    status: "Documented",
    date: "FIELD SEASON I",
    file: "world-history.html",
    icon: "🌍",
    image: "",
    featured: true
  },
  {
    number: "03",
    title: "Advaita Vedanta",
    category: "Philosophy",
    description: "The oceanic journey from wave to ocean — a study of non-dual consciousness and the nature of the Self.",
    status: "Documented",
    date: "FIELD SEASON I",
    file: "advaita-vedanta.html",
    icon: "🌊",
    image: "",
    featured: true
  },
  {
    number: "04",
    title: "Socialism",
    category: "Philosophy",
    description: "From Utopian Dreams to Scientific Revolutions ",
    status: "Documented",
    date: "FIELD SEASON I",
    file: "Socialism 2.0.html",
    icon: "🌹",
    image: "",
    featured: true
  },
  {
    number: "05",
    title: "Marxism",
    category: "Philosophy",
    description: "The philosophers have only interpreted the world, in various ways; the point is to change it",
    status: "Documented",
    date: "FIELD SEASON I",
    file: "Marxism 2.0.html",
    icon: "☭",
    image: "",
    featured: true
  },
  {
    number: "06",
    title: "Conservatism",
    category: "Philosophy",
    description: "‎A state without the means of some change is without the means of its conservation",
    status: "Documented",
    date: "FIELD SEASON I",
    file: "Conservatism 2.0.html",
    icon: "🛡️",
    image: "",
    featured: true
  },
  {
    number: "07",
    title: "LIBERALISM",
    category: "Philosophy",
    description: "The Philosophy of Freedom — Where the Individual Becomes Sovereign",
    status: "Documented",
    date: "FIELD SEASON I",
    file: "Liberalism 3.0.html",
    icon: "🗽",
    image: "",
    featured: true
  },
  {
    number: "08",
    title: "GANDHISM",
    category: "Philosophy",
    description: "Truth · Non-Violence · Self-Rule · Universal Uplift",
    status: "Documented",
    date: "FIELD SEASON I",
    file: "Gandhism 3.0.html",
    icon: "𓀗",
    image: "",
    featured: true
  }, 
  {
    number: "09",
    title: "Chronicles of the British Rule",
    category: "Political Science",
    description: "Governors-General & Viceroys of British India — The Raj's Twilight",
    status: "Documented",
    date: "FIELD SEASON I",
    file: "Governors-General & Viceroys of British India.html",
    icon: "♕",
    image: "",
    featured: true
  },
  {
    number: "10",
    title: "The Royal Ledger of Bhārat",
    category: "Political Science",
    description: "Presidents & Prime Ministers of India — From the Raj's Twilight to the Republic's Dawn",
    status: "Documented",
    date: "FIELD SEASON I",
    file: "Presidents & Prime Ministers of India.html",
    icon: "🏛️",
    image: "",
    featured: true
  },
  {
    number: "11",
    title: "POLITICAL ‎ SCIENCE",
    category: "Political Science",
    description: "Political Science - Definition, nature & scope",
    status: "Documented",
    date: "FIELD SEASON I",
    file: "Political Science - defination, nature & scope.html",
    icon: "📜",
    image: "",
    featured: true
  },
  
  {
    number: "12",
    title: "CITIZENSHIP RIGHTS",
    category: "Political Science",
    description: "Rights • Duties • DPSP • Human Rights • Union of Trinity",
    status: "Documented",
    date: "FIELD SEASON I",
    file: "Citizenship Rights - Rights & Duties, DPSP, Human Rights, Liberty, Equality, Justices.html",
    icon: "🛂",
    image: "",
    featured: true
  }
   

  /* ── ADD NEW NOTES BELOW. Copy this block, keep the comma before it: ──
  ,{
    number: "13",
    title: "Your New Note",
    category: "Category Name",
    description: "Short description of the note.",
    status: "Documented",
    date: "2026",
    file: "your-new-note.html",
    icon: "🦴",
    image: "",
    featured: false
  }
  */
];

/* ---------- DISCOVERIES (future / in-progress projects) ---------- */
const discoveryEntries = [
  {
    number: "S-01",
    title: "Unnamed Specimen",
    category: "Survey",
    description: "Ground has been marked. Excavation of this site has not yet begun — a future project waiting to be uncovered.",
    status: "Unexplored",
    date: "PENDING",
    file: "",
    icon: "🦴",
    image: ""
  },
  {
    number: "S-02",
    title: "Field Experiment",
    category: "Experiment",
    description: "An idea currently taking shape beneath the surface. Notes and results will be catalogued here as the work develops.",
    status: "In Progress",
    date: "ACTIVE DIG",
    file: "",
    icon: "🧭",
    image: ""
  }
];
