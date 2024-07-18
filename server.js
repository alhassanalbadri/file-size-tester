const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
	const filePath = path.join(__dirname, 'test_files', req.url);
	fs.readFile(filePath, (err, data) => {
		if (err) {
			res.writeHead(500, { 'Content-Type': 'text/plain' });
			res.end('Internal Server Error');
			return;
		}
		res.writeHead(200, {
			'Content-Type': 'application/octet-stream',
			'Content-Length': data.length,
		});
		res.end(data);
	});
});

server.listen(4000, () => {
	console.log('Server is listening on port 4000');
});
