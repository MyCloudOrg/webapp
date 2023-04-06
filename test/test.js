const http = require('http');
const assert = require('assert');
const app = require('../src/server.js');



describe('WebApp test', function() {
  const port = 8080;
  let server
	before(function() {
		server = app.listen(port);
	});

	after(function(done) {
		server.close();
		setTimeout(() => {
		  process.exit(0);
		}, 1000); // wait for 1 second to allow other asynchronous code to finish
	  });

	describe('/', function() {
		it('should be Status running', function(done) {
			http.get('http://127.0.0.1:'+port+'/healthz', function(response) {
				assert.equal(response.statusCode, 200);
				done();
			});
		});
	});
});