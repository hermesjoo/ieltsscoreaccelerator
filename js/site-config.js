/* site-config.js — single source of truth for site-wide settings.
   Edit THIS file to change contact info, socials, feature flags.
   Loaded on every page before other scripts. */
window.SITE = {
  name: "IELTS Score Accelerator",
  apiBase: "http://127.0.0.1:8878",   // test phase; switch to VPS/domain later
  contact: {
    email: "support@ieltsacc.org",
    email2: "admin@ieltsacc.org",
    phone: "+123456789",               // placeholder — replace with real number
    phoneNote: "",                     // e.g. "(WhatsApp)" or country code note
    instagram: "https://instagram.com/ieltsscoreaccelerator",
    linkedin: "https://linkedin.com/company/ieltsscoreaccelerator",
    facebook: "https://facebook.com/ieltsscoreaccelerator",
    youtube: "https://youtube.com/@ieltsscoreaccelerator",
  },
  features: {
    packages: true,     // A1-B2 packages page
    chat: false,        // phase H
    writingAI: false,   // phase F
    crypto: false,      // phase G
  },
  levels: ["A1", "A2", "B1", "B2"],
};
