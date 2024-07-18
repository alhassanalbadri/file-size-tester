const axios = require('axios');
const fs = require('fs');
const path = require('path');

const testFiles = [
	'utf8_sample_file.txt',
	'utf16_sample_file.txt',
	'null_char_file.txt',
	'partially_filled_buffer_file.txt',
	'non_power_of_2_file.txt',
	'mixed_content_file.txt'
];

testFiles.forEach(file => {
	const fileUrl = `http://localhost:4000/${file}`;
	axios.get(fileUrl, { responseType: 'arraybuffer' })
		.then(response => {
			// Method 1: Using Content-Length header (if available)
			const contentLength = response.headers['content-length'];
			console.log(`Content-Length of ${file}:`, contentLength);

			// Method 2: Save and use fs.stats
			const localFile = path.join(__dirname, `downloaded_${file}`);
			fs.writeFileSync(localFile, response.data);
			const stats = fs.statSync(localFile);
			console.log(`File Size of ${file} using fs.stats:`, stats.size);
			fs.unlink(localFile, err => {
				if (err) {
					console.error(`Error deleting the downloaded file ${localFile}:`, err);
				}
			});

			// Method 3: Using Buffer.byteLength
			const byteLength = Buffer.byteLength(response.data);
			console.log(`Byte Length of ${file} using Buffer.byteLength:`, byteLength);

			// Method 4: Using response.data.length
			console.log(`Length of ${file} using response.data.length:`, response.data.length);

			// Method 5: Using response.data.byteLength
			console.log(`Byte Length of ${file} using response.data.byteLength:`, response.data.byteLength);

			console.log('\n');
		})
		.catch(error => {
			console.error(`Error downloading the file ${file}:`, error);
		});
});
