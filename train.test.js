const fs = require("fs")

class Linear_regression 
{
    constructor(precision) 
    {
        this.total = {'x' : 0,'y' : 0,'xy': 0,'x2': 0,'y2': 0};

        if (!this.global || !this.global.result)
            this.global = {'result':[]};
        if (!precision)
            this.precision = parseFloat(0.0000001);
        else if (parseFloat(this.precision) >= parseFloat(3) == true)
            find_best_value();
        else
            this.precision = precision
        if (!this.tabValue || this.tabValue.length == 0)
            this.tabValue = [];
        this.read_csv(function (err, res) {
                this.parse_csv(res);
                this.get_total();
                this.find_a_b();
                this.test_car_price();
        });
    }


    read_csv (cb)
    {
        if (!this.tabValue || this.tabValue.length == 0)
        {
            fs.readFile('data.csv', 'utf8', function(err, contents) {
                    return cb(null, contents)
            });
        }
        else
        {
            test_car_price();
        }
    }

    parse_csv (contents)
    {
        contents = contents.split("\n");

        for (let i = 1; i < contents.length - 1; i++) {
            let line = contents[i].split(",");
            this.tabValue.push({'x':Number(line[0]),'y':Number(line[1])});
        }
        this.length = this.tabValue.length
    }

    get_total ()
    {
        for (let i = 0; i < this.tabValue.length; i++)
        {
            this.total.x    += this.tabValue[i].x;
            this.total.y    += this.tabValue[i].y;
            this.total.x2   += this.tabValue[i].x * this.tabValue[i].x;
            this.total.y2   += this.tabValue[i].y * this.tabValue[i].y;
            this.total.xy   += this.tabValue[i].x * this.tabValue[i].y;

            this.tabValue[i].xy = this.tabValue[i].x * this.tabValue[i].y
            this.tabValue[i].x2 = this.tabValue[i].x;
            this.tabValue[i].y2 = this.tabValue[i].y;
        }
    }

    find_a_b ()
    {
        this.a = ((this.total.y * this.total.x2) - (this.total.x * this.total.xy))
                / ((this.length * this.total.x2) - (this.total.x * this.total.x));
        this.b = ((this.length * this.total.xy) - (this.total.x * this.total.y))
                / ((this.length * this.total.x2) - (this.total.x * this.total.x));
    }

    apply_affine (mileage, truePrice, a , b)
    {
        this.yPrime = parseFloat(a) + (parseFloat(mileage * b));
        if (this.yPrime > truePrice)
            return (this.yPrime - truePrice)
        else
            return (truePrice - this.yPrime)
    }

    test_car_price ()
    {
        var lost = 0;
        for (let i = 0; i < this.tabValue.length; i++)
        {
            this.tabValue[i].diff = apply_affine(this.tabValue[i].x, this.tabValue[i].y, this.a, this.b * this.precision);
            lost += Number(this.tabValue[i].diff);
        }
        this.global.result.push({'lost':lost,'precision':this.precision})
        this.precision += parseFloat(0.001);
       new Linear_regression(this.precision);
    }

    find_best_value ()
    {
        let tmp = this.global.result[0].lost;
        for (let i = 1; i < this.global.result.length; i++)
        {
            if (tmp > this.global.result[i].lost)
                tmp = this.global.result[i].lost;
        }
        console.log("La perte la plus faible est "+ tmp.toFixed(2) + "Pour une precision de : " + this.precision)
        console.log("The best formul are : y = " + this.a + " " + this.b + "x")
        process.exit();
    }
}

new Linear_regression();