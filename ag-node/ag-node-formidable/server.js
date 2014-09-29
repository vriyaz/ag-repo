var http = require('http');
var url  = require('url');

function start(route, handle) {
  function onRequest(request, response) {
    console.log("//// request received ...");
    var postData = "";
    var pathname = url.parse(request.url).pathname;
    console.log('pathname:' + pathname);

    route(handle, pathname, response, request);

/*
 * explicit handling of postData

    request.setEncoding('utf8');

    request.addListener('data', function(postDataChunk) {
      postData += postDataChunk;
      console.log('received POST data chunk: "' + postDataChunk + '"');
    });

    request.addListener('end', function() {
      route(handle, pathname, response, postData);
    });
*/
  }

  http.createServer(onRequest).listen(8888);
  console.log("server started ...");
}

exports.start = start;
