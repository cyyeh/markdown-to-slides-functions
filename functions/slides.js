import Marpit from '@marp-team/marpit'

const marpit = new Marpit()
const theme = `
/* @theme example */
body {
  margin: 0;
  width: 100%;
}

section {
  width: 100%;
  max-height: 500px;
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
  const markdown = JSON.parse(event.body)['markdown']
  console.log(markdown)
  const { html, css } = marpit.render(markdown)
  const htmlFile = `
  <!DOCTYPE html>
  <html>
  <head>
    <style>${css}</style>
  </head>
  <body>
    ${html}
  </body>
  </html>
  `

  return {
    statusCode: 200,
    body: htmlFile
  }
}
