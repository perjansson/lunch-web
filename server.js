import express from 'express'
import path from 'path'
import fs from 'fs'

const app = express()

const __dirname = path.resolve()

app.use(express.static(path.join(__dirname, 'dist')))

app.get('*', (req, res) => {
  const indexHtmlPath = path.join(__dirname, 'dist/index.html')
  let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8')

  const randomColor =
    backgroundColorArray[
      Math.floor(Math.random() * backgroundColorArray.length)
    ]
  const randomColorWithAlpha = withAlpha(randomColor, 0.8)
  const manifest = generateManifest(randomColor)

  const linkTag = `<link rel="manifest" href="data:application/json;base64,${manifest}">`
  indexHtml = indexHtml.replace('</head>', `${linkTag}\n</head>`)

  const styleTag = `<style>:root { --currentBackgroundColor: ${randomColor}; --currentBackgroundColorAlpha: ${randomColorWithAlpha} }</style>`
  indexHtml = indexHtml.replace('</head>', `${styleTag}\n</head>`)

  res.send(indexHtml)
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Starting lunch-web on port: ${port}`)
})

function generateManifest(themeColor) {
  const manifestPath = 'manifest.json'
  const manifestContent = fs.readFileSync(manifestPath, 'utf8')
  const manifestData = JSON.parse(manifestContent)
  manifestData.theme_color = themeColor
  const encodedContent = Buffer.from(JSON.stringify(manifestData)).toString(
    'base64'
  )
  return encodedContent
}

const backgroundColorArray = [
  '#e6fe46',
  '#ada6a0',
  '#c2e2ac',
  '#e3b7b4',
  '#34509c',
  '#e4eaed',
  '#a0b5b5',
]

function withAlpha(color, alpha) {
  const colorWithoutAlpha = color.replace('#', '')
  const validAlpha = Math.max(0, Math.min(1, alpha))
  const alphaHex = Math.round(validAlpha * 255)
    .toString(16)
    .padStart(2, '0')
  return `#${colorWithoutAlpha}${alphaHex}`
}
