const fs = require("fs")

function find_best_value()
{
	let tmp = this.global.result[0].lost;
	let j = 0;
	for (let i = 1; i < this.global.result.length; i++)
	{
		if (tmp > this.global.result[i].lost)
		{
			tmp = this.global.result[i].lost;
			j = i;
		}
	}
	console.log("La perte la plus faible est "+ this.global.result[j].lost + "Pour une precision de : " + this.precision)
}
function test_car_price ()
{
	var lost = 0;
	for (let i = 0; i < this.tabValue.length; i++)
	{
		this.tabValue[i].diff = apply_affine(this.tabValue[i].x, this.tabValue[i].y, this.a, this.b * this.precision);
		lost += Number(this.tabValue[i].diff);
	}
	this.global.result.push({'lost':lost,'precision':this.precision})
	//console.log("For "+ this.precision.toFixed(6) +" precision lost price are : " + lost.toFixed(0))
	this.precision += parseFloat(0.001);
	read_csv(this.precision)
}

function increase_precision ()
{

}
function apply_affine (mileage, truePrice, a , b)
{
	this.yPrime = parseFloat(a) + (parseFloat(mileage * b));
	if (this.yPrime > truePrice)
		return (this.yPrime - truePrice)
	else
		return (truePrice - this.yPrime)

}

function find_a_b ()
{
	this.a  = ((this.total.y * this.total.x2) - (this.total.x * this.total.xy)) 
				/ ((this.length * this.total.x2) - (this.total.x * this.total.x));
	this.b = ((this.length * this.total.xy) - (this.total.x * this.total.y)) / ((this.length * this.total.x2) - (this.total.x * this.total.x));
}

function get_total()
{
	for (let i = 0; i < this.tabValue.length; i++)
	{
		this.total.x 	+= this.tabValue[i].x;
		this.total.y 	+= this.tabValue[i].y;
		this.total.x2 	+= this.tabValue[i].x * this.tabValue[i].x;
		this.total.y2 	+= this.tabValue[i].y * this.tabValue[i].y;
		this.total.xy 	+= this.tabValue[i].x * this.tabValue[i].y;

		this.tabValue[i].xy = this.tabValue[i].x * this.tabValue[i].y
		this.tabValue[i].x2 = this.tabValue[i].x;
		this.tabValue[i].y2 = this.tabValue[i].y;
	}
}

function parse_csv (contents)
{
	contents = contents.split("\n");

	for (let i = 1; i < contents.length - 1; i++) {
		let line = contents[i].split(",");
		this.tabValue.push({'x':Number(line[0]),'y':Number(line[1])});
	}
	this.length = this.tabValue.length
}

function read_csv (precision)
{
	if (!this.global || !this.global.result)
	{
		this.global = {
		'result':[]
		};
	}
	this.total = {
		'x' : 0,
		'y' : 0,
		'xy': 0,
		'x2': 0,
		'y2': 0,
	}
	if (!precision)
		this.precision = parseFloat(0.0000001);
	else if (parseFloat(this.precision) >= parseFloat(3) == true)
	{
		find_best_value();
		console.log("The best formul are : y = " + this.a + " " + this.b + "x")
		//draw(this.tabValue, 'mileage', 'price')
		process.exit();
	}
	else
	{
		this.precision = precision
	}

	if (!this.tabValue || this.tabValue.length == 0)
	{
		fs.readFile('data.csv', 'utf8', function(err, contents) {
			this.tabValue 		= [];
			parse_csv(contents);
			get_total();
			find_a_b();
			test_car_price();
		});
	}
	else
	{
		test_car_price();
	}
}

read_csv();