// Run with: node scripts/verify-whatsapp-enquiry.cjs
/* eslint-disable @typescript-eslint/no-require-imports -- This CommonJS runner transpiles the existing TypeScript verification scripts without an extra dependency. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => {
  const source = fs.readFileSync(filename, 'utf8');
  module._compile(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText, filename);
};
const { getWhatsAppEnquiryUrl, validateWhatsAppEnquiry } = require('../lib/whatsapp-enquiry.ts');
const { WHATSAPP_PHONE_NUMBER, getWhatsAppUrl } = require('../lib/whatsapp.ts');
const { projects } = require('../data/projects.ts');
const base = { name: '  Test & Visitor  ', phone: '+91 98765 43210', project: 'general' };
for (const phone of ['9876543210', '+91 98765 43210', '919876543210', '09876543210', '(98765) 43210']) {
  assert.deepEqual(validateWhatsAppEnquiry({ ...base, phone }), {});
  assert.match(new URL(getWhatsAppEnquiryUrl({ ...base, phone })).searchParams.get('text'), /Mobile: \+91 9876543210/);
}
for (const phone of ['', '12345', '1234567890', '98765432101', '+1 9876543210', '987abc43210', '++919876543210']) {
  assert.ok(validateWhatsAppEnquiry({ ...base, phone }).phone);
  assert.throws(() => getWhatsAppEnquiryUrl({ ...base, phone }));
}
for (const name of ['', '   ', 'a'.repeat(81)]) assert.ok(validateWhatsAppEnquiry({ ...base, name }).name);
for (const project of projects) {
  const url = new URL(getWhatsAppEnquiryUrl({ ...base, project: project.slug }));
  assert.equal(url.origin, 'https://wa.me');
  assert.equal(url.pathname, `/${WHATSAPP_PHONE_NUMBER}`);
  assert.ok(url.searchParams.get('text').includes(`Interested in: ${project.name}`));
}
const message = new URL(getWhatsAppEnquiryUrl({ ...base, name: 'Asha & નીતા 😊\nTest' })).searchParams.get('text');
assert.ok(message.includes('Name: Asha & નીતા 😊 Test'));
assert.ok(new URL(getWhatsAppEnquiryUrl({ ...base, project: 'unknown' })).searchParams.get('text').includes('General property enquiry'));
assert.ok(new URL(getWhatsAppEnquiryUrl({ ...base, project: 'commercial' })).searchParams.get('text').includes('Commercial / Retail Spaces'));
assert.equal(new URL(getWhatsAppUrl('/projects/central-square')).pathname, `/${WHATSAPP_PHONE_NUMBER}`);
console.log('PASS: valid/invalid mobile formats, name boundaries, all project messages, Unicode encoding, general/commercial fallback, shared WhatsApp number.');
require('./verify-whatsapp.ts');
