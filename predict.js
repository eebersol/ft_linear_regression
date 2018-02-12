const fs 		= require("fs");
const readline 	= require("readline");
const os 		 = require("os");

function estimatePrice (theta0, theta1, mileage)
{
	return theta0 + (theta1 * mileage)
}

function predict_price (mileage)
{
	if (Number.isInteger(mileage))
	{
		fs.readFile("result.txt", 'utf8', function(err, contents) 
		{
			let result
			if (err)
				result = estimatePrice(0, 0, 0).toFixed(2);
			else
			{
				let theta0 = parseFloat(contents.split("\n")[0]);
				let theta1 = parseFloat(contents.split("\n")[1]);
				result = estimatePrice(theta0, theta1, mileage).toFixed(2);
			}
				console.log("La voiture coûte : " + Number(result).toFixed(2) + " €.");
				process.exit();
		});
	}
	else
	{
		console.log("Wrong format argument.")
		start_predict()
	}
}

function start_predict ()
{
	this.rl = readline.createInterface(process.stdin, process.stdout);
	this.rl.question("Enter mileage : ", (answer) => {predict_price(Number(answer))});
}


start_predict();
