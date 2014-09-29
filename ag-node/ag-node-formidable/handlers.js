var // exec = require('child_process').exec,
    querystring = require('querystring'),
    fs = require('fs'),
    util = require('util'),
    formidable = require('formidable');

function start(response) {
  console.log('request handler start was called ...');

  //exec('ls -lah', function(error, stdout, stderr) {
  //  response.writeHead(200, {"Content-Type":"text/plain"});
  //  response.write(stdout);
  //  response.end();
  //});

  var body = '<html>' 
             + '<head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/></head>' 
             + '<body>'
             + '<h3>Simple Text Input</h3>'
             + '<form action="/input" method="post">'
             + '<textarea name="text" rows="5" cols="60"></textarea>'
             + '<br>'
             + '<input type="submit" value="submit" />'
             + '<br>'
             + '</form>'
             + '<h3>Simple File Upload</h3>'
             + '<form action="/upload" enctype="multipart/form-data" method="post">'
             + '<input type="file" name="upload">'
             + '<br>'
             + '<input type="submit" value="submit" />'
             + '</form>'
             + '</body>'
             + '</html>';

  response.writeHead(200, {"Content-type" : "text/html"});
  response.write(body);
  response.end();
}

function input(response, request) {
  console.log('request handler input was called ...');

  var form = new formidable.IncomingForm();
  console.log('about to parse ...');
  form.parse(request, function(error, fields, files) {
    console.log('parsing done ...');
 
    response.writeHead(200, {"Content-Type":"text/html"});
    response.write(util.inspect(fields));
    response.end();
  });
}

function upload(response, request) {
  console.log('request handler upload was called ...');

  var form = new formidable.IncomingForm();
  console.log('about to parse ...');
  form.parse(request, function(error, fields, files) {
    console.log('parsing done ...');
 
    fs.rename(files.upload.path, '/tmp/test.png', function(error) {
      if (error) {
        fs.unlink('/tmp/test.png');
        fs.rename(files.upload.path, '/tmp/test.png');
      }
    });  

    response.writeHead(200, {"Content-Type":"text/html"});
    response.write('received image: <br/>');
    response.write('<img src="/show" />');
    response.end();
  });
}

function show(response) {
  console.log('request handler show was called...');

  response.writeHead(200, {"Content-Type":"image/png"});
  fs.createReadStream("/tmp/test.png").pipe(response);
}

exports.start = start;
exports.input = input;
exports.upload = upload;
exports.show = show;

