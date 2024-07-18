const fs = require('fs');
const path = require('path');

// Directory to store the test files
const testDir = path.join(__dirname, 'test_files');
if (!fs.existsSync(testDir)) {
	fs.mkdirSync(testDir);
}

// Scenario 1: Simple UTF-8 file with special characters
const utf8Content = 'This is a UTF-8 encoded file with special characters: ğ, ı, ş, ü, ö, ç.';
fs.writeFileSync(path.join(testDir, 'utf8_sample_file.txt'), utf8Content, 'utf8');

// Scenario 2: UTF-16 encoded file
const utf16Content = Buffer.from('This is a UTF-16 encoded file with special characters: ğ, ı, ş, ü, ö, ç.', 'utf16le');
fs.writeFileSync(path.join(testDir, 'utf16_sample_file.txt'), utf16Content);

// Scenario 3: File with null characters
const nullCharContent = 'A' + '\0'.repeat(1024 * 1024 - 1); // 1 MB file with a single 'A' followed by null characters
fs.writeFileSync(path.join(testDir, 'null_char_file.txt'), nullCharContent, 'utf8');

// Scenario 4: File with partially filled buffer
const smallContent = 'This is a small file.';
const largeBuffer = Buffer.alloc(1024 * 1024); // 1 MB buffer
largeBuffer.write(smallContent);
fs.writeFileSync(path.join(testDir, 'partially_filled_buffer_file.txt'), largeBuffer);

// Scenario 5: File with non-power of 2 buffer size
const nonPowerOf2Content = 'This is a 3 KB file.' + ' '.repeat(3072 - 'This is a 3 KB file.'.length);
fs.writeFileSync(path.join(testDir, 'non_power_of_2_file.txt'), nonPowerOf2Content, 'utf8');

// Scenario 6: File with mixed content types
const mixedContent = 'This is a mixed content file.\n';
const specialChars = 'Special characters: ğ, ı, ş, ü, ö, ç.\n';
const nullChars = '\0'.repeat(512);
const mixedBuffer = Buffer.from(mixedContent + specialChars + nullChars, 'utf8');
fs.writeFileSync(path.join(testDir, 'mixed_content_file.txt'), mixedBuffer);

console.log('Test files created.');
