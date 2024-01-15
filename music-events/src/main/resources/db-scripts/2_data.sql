DELETE FROM Roles;

INSERT INTO Roles VALUES
(1, "ROLE_ADMIN"),
(2, "ROLE_USER"),
(3, "ROLE_ORGANIZER");

DELETE FROM Users;

INSERT INTO Users VALUES
(1, "Anna", "Kowalska", "Some events organization", "ok@ok.pl", "{bcrypt}$2a$12$R4ORuaFhf6rfwJXEj6nFpOFo7xC/6KncEWvgJqzmOySa4Jbuptm7C", "ORGANIZER"),
(2, "Witold", "Nowak", NULL, "test@ok.pl", "{bcrypt}$2a$12$WpD7hCQuvl8qQ26Mrd37QONabngt2NVAVNjV8cW4OzITcBntpsGZm", "USER");

DELETE FROM User_roles;

INSERT INTO User_roles VALUES
(1, 2),
(1, 3),
(2, 2);

