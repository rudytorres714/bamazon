var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Put your Your password in here
    password: "",
    database: "bamazonDB"
});

var list = "SELECT * FROM bamazonDB.products";
start();

function availableItems() {
        console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
        console.log("            List of items to buy");
    console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");

    connection.query("SELECT * FROM products", function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " | " + res[i].name + " | " + res[i].price + " | " + res[i].stock_quantity);
        }
        console.log("-----------------------------------");
    });
}

function start() {
    var userAnswer;
    availableItems();
connection.query(list, function (err, res) {
    if(err) throw err;
    inquirer
        .prompt([
            {
                type: "input",
                message: "What Item ID would you like to buy ?",
                name: "choice"
            },

            {
                type: "input",
                message: "How much would you like to buy? ",
                name: "quantity"

            }
            ]).then(function(answer) {
            for (var i = 0; i < res.length; i++) {
                if(res[i].input === answer.input) {
                    userAnswer = res[i];

                    if(res[i].stock_quantity < answer.quantity) {
                        console.log("We don't have enough Inventory please select another Item or lower the quantity amount")
                        start();
                    }   else if (res[i].stock_quantity >= answer.quantity){
                        cost(answer.quantity, userAnswer.price);
                        buy(res[i].stock_quantity, answer.quantity, answer.id)

                    }
                }
            }

        })
    })
}


function buy(avail, theyWant, ids) {
    inquirer
        .prompt([
            {
                name: "choice",
                type: "list",
                message: "Are you sure you want to buy this, cause there is NO refunds?",
                choices: ["yes", "no"]
            }
        ]).then(function(answer) {
                    if (answer.choice === "yes") {
                        updateDataBase(avail, theyWant, ids);

                    }   else {
                        start();
                    }

                })
        }

var quantityUpdate;
        function updateDataBase(avail, theyWant, ids) {
            quantityUpdate = avail - theyWant;
            connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: quantityUpdate}, {id: ids} ],
                function (err) {
                if(err) throw err;
                console.log("Thanks for your purchase.")

                });
            connection.end();

        }

        function cost(howMany, howMuch) {
            var total = howMany * howMuch;
            console.log("each one cost $ " + howMuch);
            console.log(" And you want " + howMany);
            console.log("So your total cost is $ " + total)

        }
