drop database if exists FuelTracker;
create database FuelTracker;
use FuelTracker;

create table Refuels (
    id int primary key not null unique auto_increment,
    milage int not null,
    amount int not null,
    pricePerLitre int not null,
    totalCost int not null,
    location varchar(100),
    date date not null
);

create table Users (
    id int primary key not null unique auto_increment,
    username varchar(100) not null,
    email varchar(100) not null,
    hash varchar(100) not null,
    salt varchar(100) not null
);