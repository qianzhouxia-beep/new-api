const fs = require('fs')
const c = fs.readFileSync('D:\\AI\\new-api-source-clean\\web\\default\\src\\features\\home\\index.tsx', 'utf8')

// Check what headings have text-center
const positions = [7276, 13180]
for (const p of positions) {
  const start = c.lastIndexOf('<h2', p)
  const end = c.indexOf('</h2>', p)
  console.log('At ' + p + ':', c.substring(start, end + 5))
}
