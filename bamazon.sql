DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE  products (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NULL UNIQUE,
  department VARCHAR(50) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT(4) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (name, department, price, stock_quantity)
VALUES ("Back Pack", "school", 29.99, 250);

INSERT INTO products (name, department, price, stock_quantity)
VALUES ("Alarm Clock", "electronics", 10.99,  160);

INSERT INTO products (name, department, price, stock_quantity)
VALUES ("Women Dress Shoes", "womens", 79.99, 461);

INSERT INTO products (name, department, price, stock_quantity)
VALUES ("Mens Dress Shirt", "mens", 19.99, 293);

INSERT INTO products (name, department, price, stock_quantity)
VALUES ("Women Dress Pants", "womens", 89.99, 348);

INSERT INTO products (name, department, price, stock_quantity)
VALUES ("Mens Jeans", "mens", 69.99, 891);

INSERT INTO products (name, department, price, stock_quantity)
VALUES ("Mens T-Shirt",  "mens", 19.99, 978);

INSERT INTO products (name, department, price, stock_quantity)
VALUES ("Mens Sweater", "mens", 69.99, 187);

INSERT INTO products (name, department, price, stock_quantity)
VALUES ("iPhone X", "electronics", 1099.99, 100);

INSERT INTO products (name, department, price, stock_quantity)
VALUES ("Macbook Pro 15", "electronics", 2699.99, 1000);