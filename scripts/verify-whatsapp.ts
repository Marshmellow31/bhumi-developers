import {
  WHATSAPP_PHONE_NUMBER,
  GENERAL_WHATSAPP_MESSAGE,
  getWhatsAppMessage,
  getWhatsAppUrl,
} from "../lib/whatsapp";

const testCases = [
  // General website pages
  {
    path: "/",
    expectedMessage: GENERAL_WHATSAPP_MESSAGE,
    category: "General (Home)",
  },
  {
    path: "/about",
    expectedMessage: GENERAL_WHATSAPP_MESSAGE,
    category: "General (About Us)",
  },
  {
    path: "/contact",
    expectedMessage: GENERAL_WHATSAPP_MESSAGE,
    category: "General (Contact)",
  },
  {
    path: "/projects",
    expectedMessage: GENERAL_WHATSAPP_MESSAGE,
    category: "General (Projects Listing)",
  },
  {
    path: "/downloads",
    expectedMessage: GENERAL_WHATSAPP_MESSAGE,
    category: "General (Downloads)",
  },
  {
    path: "/hotels",
    expectedMessage: GENERAL_WHATSAPP_MESSAGE,
    category: "General (Hotels Listing)",
  },
  // Individual project pages from requirement specification
  {
    path: "/projects/central-square",
    expectedMessage: "Hi, I’m interested in Central Square. Please share more details.",
    category: "Project: Central Square",
  },
  {
    path: "/projects/solitaire-pallazzo",
    expectedMessage: "Hi, I’m interested in Solitaire Palazzo. Please share more details.",
    category: "Project: Solitaire Palazzo",
  },
  {
    path: "/projects/city-center",
    expectedMessage: "Hi, I’m interested in City Center. Please share more details.",
    category: "Project: City Center",
  },
  {
    path: "/projects/fern-series",
    expectedMessage: "Hi, I’m interested in The Fern Series by Marriott. Please share more details.",
    category: "Project: The Fern Series by Marriott",
  },
  {
    path: "/projects/pritam-residency",
    expectedMessage: "Hi, I’m interested in Pritam Residency. Please share more details.",
    category: "Project: Pritam Residency",
  },
  {
    path: "/projects/bkc2",
    expectedMessage: "Hi, I’m interested in BKC 2. Please share more details.",
    category: "Project: BKC 2",
  },
  {
    path: "/projects/the-resort",
    expectedMessage: "Hi, I’m interested in The Resort. Please share more details.",
    category: "Project: The Resort",
  },
  {
    path: "/projects/gacl-colony",
    expectedMessage: "Hi, I’m interested in GACL Colony. Please share more details.",
    category: "Project: GACL Colony (slug route)",
  },
  {
    path: "/gacl-colony",
    expectedMessage: "Hi, I’m interested in GACL Colony. Please share more details.",
    category: "Project: GACL Colony (dedicated route)",
  },
  {
    path: "/projects/eminence",
    expectedMessage: "Hi, I’m interested in Eminence. Please share more details.",
    category: "Project: Eminence",
  },
];

console.log(`\n========================================`);
console.log(`WhatsApp Floating Button Verification`);
console.log(`Official Number: +91 99980 16244 (API: ${WHATSAPP_PHONE_NUMBER})`);
console.log(`========================================\n`);

let passed = 0;
let failed = 0;

for (const tc of testCases) {
  const actualMsg = getWhatsAppMessage(tc.path);
  const actualUrl = getWhatsAppUrl(tc.path);
  const expectedUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(tc.expectedMessage)}`;

  const msgMatches = actualMsg === tc.expectedMessage;
  const urlMatches = actualUrl === expectedUrl;

  if (msgMatches && urlMatches) {
    console.log(`✅ [PASS] ${tc.category} (${tc.path})`);
    console.log(`   Message: "${actualMsg}"`);
    console.log(`   URL: ${actualUrl}\n`);
    passed++;
  } else {
    console.error(`❌ [FAIL] ${tc.category} (${tc.path})`);
    console.error(`   Expected Msg: "${tc.expectedMessage}"`);
    console.error(`   Actual Msg:   "${actualMsg}"`);
    console.error(`   Expected URL: "${expectedUrl}"`);
    console.error(`   Actual URL:   "${actualUrl}"\n`);
    failed++;
  }
}

console.log(`----------------------------------------`);
console.log(`Results: ${passed} passed, ${failed} failed out of ${testCases.length} tests.`);
console.log(`----------------------------------------\n`);

if (failed > 0) {
  process.exit(1);
}
