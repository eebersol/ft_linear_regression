const fs = require('fs');


const learningRate = 0.0001;

function calc_average (price, km, multiplicateur)
{
	return (km - price) * multiplicateur
}

function average ()
{
	let average_tmp_0 = 0;
	let average_tmp_1 = 0;

	for (let i = 0; i < this.csv.length-1; i++)
	{
		average_tmp_0 += calc_average(this.csv[i].price, this.csv[i].mileage, 1);
		average_tmp_1 += calc_average(this.csv[i].price, this.csv[i].mileage, this.csv[i].mileage);
	}
	average_tmp_0 = learningRate * ((1/this.csv.length) * (average_tmp_0));
	average_tmp_1 = learningRate * ((1/this.csv.length) * (average_tmp_1));
	
	console.log(average_tmp_0, average_tmp_1)
	//console.log("\nTheta_0 : " + learningRate * (1/average_tmp_0) + '\n' + "Theta_1 : " + learningRate * (1/average_tmp_1))
}

function parse_csv ()
{
	this.csv = this.csv.split("\n");

	let tab = [];
	for (let i = 1; i < this.csv.length; i++)
	{
		let line = this.csv[i].split(",");
		tab.push({'price':line[1],'mileage':line[0]});
	}
	this.csv = tab;
}

function read_csv ()
{
	fs.readFile('data.csv', 'utf8', function(err, contents) {
		this.csv = contents;
		parse_csv();
		average();
	});
}

read_csv()