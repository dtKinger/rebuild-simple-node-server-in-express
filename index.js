// const http = require('node:http')
// const url = require('node:url')
// const fs = require('node:fs')

const express = require('express')
const app = express();
const port = 1234;

// Middleware to load every file in the public folder. E.g. My CSS file
app.use(express.static(__dirname + '/public'));

// MY ROUTES
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/pages' + '/index.html')
});

app.get('/about/', (req, res) => {
  res.sendFile(__dirname + '/pages' + '/about.html')
});

app.get('/contact-me/', (req, res) => {
  res.sendFile(__dirname + '/pages' + '/contact-me.html')
});

// After all the routes, handle potential 404's
app.use((req, res) => {
    res.status(404).sendFile(__dirname + '/pages' + '/404.html')
  }
)

app.use((err, req, res, next) => {
  if (err){
    console.log(err);
    res.status(500).send(`Something went wrong`)
  }
  next(err);
})

app.listen(port, () => {
  console.log(`Listening on port: ${port}`)
})


// http.createServer((req, res) => {
//   let reqUrl = url.parse(req.url).pathname
//   if (reqUrl.includes('favicon')) { // temp hack
//     return;
//   } else if (reqUrl === '/' || reqUrl === '') {
//     reqUrl = '/index';
//     getHtmlFile(reqUrl)
//   } else if (req.url == '/style.css') {
//       res.setHeader('Content-type', 'text/css');
//       res.write(fs.readFileSync('style.css'));
//       res.end();
//   } else {
//     getHtmlFile(reqUrl)
//   }

//   function getHtmlFile(reqUrl){
//     fs.readFile(`./${reqUrl}.html`, (err, data) => {
//       if (err) {
//         res.writeHead(404);
//         notFound = fs.readFile('./404.html', (err, notFound) => {
//           console.error(err);
//           res.end(notFound);
//         })
//       } else {
//         res.writeHead(200, { 'Content-Type': 'text/html' });
//         res.end(data);
//       }
//     })
//   }
// }).listen(8080)

