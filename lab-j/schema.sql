DROP TABLE IF EXISTS cars;

CREATE TABLE cars (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    subject TEXT NOT NULL,
    content TEXT,
    car_model TEXT
);

INSERT INTO cars (subject, content, car_model) VALUES ('Toyota', 'Very reliable car', 'Corolla');
INSERT INTO cars (subject, content, car_model) VALUES ('Honda', 'Great performance', 'Civic');
