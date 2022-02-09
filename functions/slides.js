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
  const headers = {
    /* Required for CORS support to work */
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    "Access-Control-Allow-Methods": 'GET, POST, OPTION',
  }

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: 'Successful preflight call.'
    }
  } else if (event.httpMethod === 'POST') {
    const markdown = JSON.parse(event.body)['markdown']
    const { html, css } = marpit.render(markdown)
    const htmlString = `
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
      headers,
      body: htmlString
    }
  }
}
