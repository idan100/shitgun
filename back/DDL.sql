DROP TABLE IF EXISTS keys.person;
CREATE TABLE IF NOT EXISTS keys.person  (
		username TEXT PRIMARY KEY,
		password TEXT NOT NULL,
		phone_number TEXT NOT NULL
);

DROP TABLE IF EXISTS keys."class";
CREATE TABLE IF NOT EXISTS keys."class"  (
	class_number VARCHAR(3) PRIMARY KEY,
	has_projector Boolean NOT NULL DEFAULT FALSE,
	has_computers Boolean NOT NULL DEFAULT FALSE
);

DROP TABLE IF EXISTS keys.schedule;
CREATE TABLE IF NOT EXISTS keys.schedule  (
	id SERIAL PRIMARY KEY,
	username TEXT REFERENCES keys.person(username),
	class_number VARCHAR(3) REFERENCES keys."class"(class_number),
	start_date TIMESTAMP NOT NULL,
	end_date TIMESTAMP NOT NULL
);