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
  height: 100vh;
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
    <body>
      <style>${css}</style>
      ${html}
    </body>
    `
  
    return {
      statusCode: 200,
      headers,
      body: htmlString
    }
  }
}
