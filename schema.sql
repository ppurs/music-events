DROP TABLE IF EXISTS Roles;

CREATE TABLE Roles (
	role_id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,  

	PRIMARY KEY (role_id)
);

DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
	user_id INT NOT NULL AUTO_INCREMENT,
	firstname VARCHAR(255) NOT NULL,
	lastname VARCHAR(255) NOT NULL,
	organization_name VARCHAR(255),
	email VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	type VARCHAR(10),

	PRIMARY KEY (user_id)
);

DROP TABLE IF EXISTS User_roles;

CREATE TABLE User_roles (
	user_id INT,
	role_id INT,

	PRIMARY KEY (user_id, role_id),
	FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (role_id) REFERENCES Roles(role_id) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS Offers;

CREATE TABLE Offers (
	offer_id INT NOT NULL AUTO_INCREMENT,	
	title VARCHAR(255) NOT NULL,	
	description TEXT NOT NULL,	
	city VARCHAR(255) NOT NULL,	
	location VARCHAR(255),
	date DATETIME NOT NULL,			
	type VARCHAR(50) NOT NULL,	
	genre VARCHAR(255),	
	organizer_id INT NOT NULL,

	PRIMARY KEY (offer_id),
	FOREIGN KEY (organizer_id) REFERENCES Users(user_id) ON DELETE RESTRICT ON UPDATE CASCADE
);

DROP TABLE IF EXISTS Events;

CREATE TABLE Events (
	event_id INT NOT NULL AUTO_INCREMENT, 	
	title VARCHAR(255) NOT NULL,	
	description TEXT,	
	performers TEXT,	
	city VARCHAR(255) NOT NULL,	
	location VARCHAR(255) NOT NULL,	
	date DATETIME NOT NULL,
	type VARCHAR(50) NOT NULL,	
	genre VARCHAR(255),
	price DECIMAL(10,2) NOT NULL,	
	no_available_tickets INT NOT NULL,
    tickets_status ENUM('AVAILABLE', 'NOT_AVAILABLE') NOT NULL,

	PRIMARY KEY (event_id)
);

DROP TABLE IF EXISTS Music_profiles;

CREATE TABLE Music_profiles (
    profile_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(20) NOT NULL,
    band_name VARCHAR(255),
    genre VARCHAR(255),
    instrument VARCHAR(255),

    PRIMARY KEY (profile_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS Applications;

CREATE TABLE Applications (
    application_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    offer_id INT NOT NULL,
    type VARCHAR(50) NOT NULL,
    band_name VARCHAR(255),
    genre VARCHAR(255),
    instrument VARCHAR(255),
    submit_date DATETIME NOT NULL,
    status ENUM('SUBMITTED', 'ACCEPTED', 'REJECTED') NOT NULL,

    PRIMARY KEY (application_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (offer_id) REFERENCES Offers(offer_id) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS Orders;

CREATE TABLE Orders (
    order_id INT NOT NULL AUTO_INCREMENT,
    status ENUM('CREATED', 'PAID', 'CANCELLED') NOT NULL,
    creation_date DATETIME NOT NULL,
    user_id INT NOT NULL,

    PRIMARY KEY (order_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE RESTRICT ON UPDATE CASCADE
);

DROP TABLE IF EXISTS Tickets;

CREATE TABLE Tickets (
    ticket_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    order_id INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY (ticket_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (event_id) REFERENCES Events(event_id) ON DELETE RESTRICT ON UPDATE CASCADE
);