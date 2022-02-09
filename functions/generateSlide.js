import Marpit from '@marp-team/marpit'

const marpit = new Marpit()
const theme = `
/* @theme example */

section {
  background-color: #369;
  color: #fff;
  font-size: 30px;
  padding: 40px;
}

h1,
h2 {
  text-align: center;
  margin: 0;
}

h1 {
  color: #8cf;
}
`
marpit.themeSet.default = marpit.themeSet.add(theme)


exports.handler = async event => {
  const markdown = event.body['markdown']
  const { html, css } = marpit.render(markdown)
  const htmlFile = `
  <!DOCTYPE html>
  <html><body>
    <style>${css}</style>
    ${html}
  </body></html>
  `

  return {
    statusCode: 200,
    body: htmlFile
  }
}
