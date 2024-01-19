DELETE FROM Roles;

INSERT INTO Roles VALUES
(1, "ROLE_ADMIN"),
(2, "ROLE_USER"),
(3, "ROLE_ORGANIZER");

DELETE FROM Users;

INSERT INTO Users VALUES
(1, "Anna", "Kowalska", "Some events organization", "organizer@wp.pl", "{bcrypt}$2a$12$R4ORuaFhf6rfwJXEj6nFpOFo7xC/6KncEWvgJqzmOySa4Jbuptm7C", "ORGANIZER"),
(2, "Witold", "Nowak", NULL, "user@wp.pl", "{bcrypt}$2a$12$R4ORuaFhf6rfwJXEj6nFpOFo7xC/6KncEWvgJqzmOySa4Jbuptm7C", "USER"),
(3, "Jan", "Mol", NULL, "admin@wp.pl", "{bcrypt}$2a$12$R4ORuaFhf6rfwJXEj6nFpOFo7xC/6KncEWvgJqzmOySa4Jbuptm7C", "ADMIN");


DELETE FROM User_roles;

INSERT INTO User_roles VALUES
(1, 2),
(1, 3),
(2, 2),
(3, 1);

DELETE FROM Offers;

INSERT INTO Offers VALUES
(1, "Get Break - support", "We are looking for rock band who is willing to give a performance before Get Break band.", "Rzeszow", "Klub Piwnica", "2024-02-15", "concert", "rock", 1),
(2, "Folk music festival", "We are looking for folk bands who is willing to participate in folk music festival.", "Katowice", NULL, "2024-07-15", "festival", "folk", 1),
(3, "Guitar player needed", "We are looking for a guitar player to out metal band for only one performance (our teammate has a broken arm)", "Krakow", "Klub studio", "2024-03-10", "concert", "metal", 1),
(4, "Juwenalia Krakowskie 2024 - support", "We are looking for student bands who want to participate in Juwenalia Krakowskie this year. You will be able to give a support concert before our stars. ", "Krakow", NULL, "2024-05-19", "concert", NULL, 1);

DELETE FROM Events;

INSERT INTO Events VALUES
(1, "Decybel charity concert", "Help for sick young boy.","Get Break, 4 kilo obywatela", "Jaroslaw", "Klub Decybel", "2024-01-20", "charity concert", "rock", 20.00, 100, "AVAILABLE"),
(2, "Klamot festival", "Festival with good music and beautiful vintage cars","Get Break, Lydka Grubasa", "Jaroslaw", "Stadion miejski", "2024-07-30", "festival", NULL, 0.00, 200, "AVAILABLE"),
(3, "Gibbs Safe Tour", NULL,"Gibbs, Oliver Olson", "Krakow", "Klub studio", "2023-12-08", "concert", "rap", 130.00, 0, "NOT_AVAILABLE"),
(4, "Opener festival", "Biggest festival in Poland!", NULL, "Gdansk", "Pole festiwalowe 65", "2024-07-15", "fesival", NULL, 250.00, 500, "AVAILABLE"),
(5, "PolandRock 2024", NULL, NULL, "Czaplinek", "Pole festiwalowe 500", "2024-07-31", "fesival", NULL, 250.00, 500, "AVAILABLE"),
(6, "Kortez - charity concert", NULL, "Kortez", "Krakow", "Centrum Kongresowe ICE", "2024-11-10", "charity concert", NULL , 150.00, 500, "AVAILABLE");



