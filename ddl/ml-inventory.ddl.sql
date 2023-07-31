CREATE DATABASE IF NOT EXISTS ml_practice;
USE ml_practice;

-- Main tables
DROP TABLE IF EXISTS item;
DROP TABLE IF EXISTS inventory;
DROP TABLE IF EXISTS customer;

-- Create tables

-- Customer
CREATE TABLE customer (
  customer_id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(45) NOT NULL,
  last_name VARCHAR(45) NOT NULL,
  email VARCHAR(45) UNIQUE NOT NULL,
  password varchar(255) NOT NULL,
  added_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (customer_id)
);

-- Inventory
CREATE TABLE inventory (
  inventory_id INT NOT NULL AUTO_INCREMENT,
  owner_id INT NOT NULL,
  inventory_name VARCHAR(45) NOT NULL,
  added_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (inventory_id),
  FOREIGN KEY (owner_id) REFERENCES customer(customer_id)
);

-- Item
CREATE TABLE item (
	item_id INT NOT NULL AUTO_INCREMENT,
	inventory_id INT NOT NULL,
	name VARCHAR(45) NOT NULL,
	description VARCHAR(255) NOT NULL,
	price DECIMAL(19, 4) NOT NULL,
	quantity INT NOT NULL,
	added_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (item_id),
	FOREIGN KEY (inventory_id) REFERENCES inventory(inventory_id)
);



