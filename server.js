var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');

var server_port = process.env.PORT || 5000;

// var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
//
// var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

app = express();

app.use("/", serveStatic ( path.join (__dirname, '/dist') ) )

app.get('*', function (req, res) {
  res.sendFile(__dirname + '/dist/index.html')
})
// app.use(serveStatic(__dirname + "/dist"));
// app.use('/dist', express.static('dist'));

console.log('dir name = ', __dirname)

// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, './dist/index.html'))
// });

// app.listen(server_port, server_ip_address, function () {
//   console.log('Listening on ' + server_ip_address + ', port ' + server_port)
// });
app.listen(server_port, function () {
  console.log('port: ' + server_port)
});
