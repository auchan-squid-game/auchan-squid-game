const app = require('express')();
const path = require('path');
const serveStatic = require('serve-static');

app.use('/', serveStatic(path.join(__dirname, 'dist/')));
app.get(/.*/, (_, res) => res.sendFile(path.join(__dirname, 'dist/index.html')));
app.listen(process.env.PORT || 8080);
