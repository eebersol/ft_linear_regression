const fs = require('fs');
 
function read_csv ()
{
	fs.readFile('data', 'utf8', function(err, contents) {
		console.log(contents);
	});
}

read_csv()