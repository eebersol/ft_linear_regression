const fs = require("fs");

function hypothesis (theta, x)
{
	return theta.theta0 + (theta.theta1 * x)
}

function train (tabValue)
{
	let total 		= {'x':0,'y':0};
	let tmp_theta 	= {'theta0':0,'theta1':0};

	for (let i = 0; i < tabValue.length; i++)
	{	
		let hypt 	= hypothesis(this.trueTheta, tabValue[i].x) - tabValue[i].y;
		total.x 	+=  hypt;
		total.y 	+= 	hypt * tabValue[i].x
	}		
	tmp_theta.theta0 = this.learningRate * (total.x / tabValue.length)
	tmp_theta.theta1 = this.learningRate * (total.y / tabValue.length)
	return tmp_theta;
}

function get_total(tabValue)
{
	let i = 2;
	while (1)
	{	
		let tmp_theta = train(tabValue);

		if (Math.abs(tmp_theta.theta0) < this.precision && Math.abs(tmp_theta.theta1) < this.precision)
			break;
		this.trueTheta.theta0 -= tmp_theta.theta0;
		this.trueTheta.theta1 -= tmp_theta.theta1;
	}
}

function parse_csv (contents)
{
	let tabValue;

	tabValue = [];
	contents = contents.split("\n");

	for (let i = 1; i < contents.length - 1; i++) {

		let line = contents[i].split(",");
		tabValue.push({
			'x':Number(line[0])/this.normalisation,
			'y':Number(line[1])/this.normalisation
		});
	}
	return tabValue;
}

function read_csv (precision)
{
	this.trueTheta 		= {'theta0':1,'theta1':0};
	this.precision 		= 0.00001;
	this.learningRate 	= 0.0001;
	this.normalisation 	= 1000.0;
	this.tabValue 		= [];

	if (!process.argv[2])
		console.log("train.js need data set.")
	else
	{
		fs.readFile(process.argv[2], 'utf8', function(err, contents) {
			if (err)
				console.log("Error : " + err);
			else {
				if (fs.existsSync('result.txt'))
					console.log("The program is already trained.")
				else {
					get_total(parse_csv(contents));

					let data = this.trueTheta.theta0 * this.normalisation + '\n' + this.trueTheta.theta1 + '\n';
					fs.appendFile('result.txt', data, function (err) {
						if (err) 
							console.log(err);
					});
				}
			}
		});
	}
}

read_csv();
