const fs = require('fs')
const path = 'D:\\AI\\new-api-source-clean\\web\\default\\src\\features\\home\\index.tsx'
let c = fs.readFileSync(path, 'utf8')

// Fix Why TokenMaster heading
c = c.replace(
  /className="mb-12 text-3xl font-semibold text-\[#261814\]">\{t\('Why TokenMaster\?'\)}<\/h2>/,
  'className="mb-12 text-center text-3xl font-semibold text-[#261814]">{t(\'Why TokenMaster?\')}</h2>'
)

// Fix FAQ heading
c = c.replace(
  /className="mb-12 text-3xl font-semibold text-\[#261814\]">\{t\('FAQ'\)}<\/h2>/,
  'className="mb-12 text-center text-3xl font-semibold text-[#261814]">{t(\'FAQ\')}</h2>'
)

fs.writeFileSync(path, c, 'utf8')
console.log('Done - centered Why TokenMaster? and FAQ headings')

// Verify
const v = fs.readFileSync(path, 'utf8')
const w = v.indexOf('Why TokenMaster')
console.log('Why TokenMaster:', v.substring(w-5, w+50))
const f = v.indexOf('t(\'FAQ\')')
console.log('FAQ:', v.substring(f-5, f+30))
