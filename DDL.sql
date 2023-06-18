DROP TABLE IF EXISTS keys.person;
CREATE TABLE IF NOT EXISTS keys.person  (
		id VARCHAR(9) PRIMARY KEY,
		name TEXT NOT NULL,
		password TEXT NOT NULL,
		phone_number TEXT NOT NULL
);

DROP TABLE IF EXISTS keys."class";
CREATE TABLE IF NOT EXISTS keys."class"  (
	class_number SMALLINT PRIMARY KEY,
	has_projector Boolean NOT NULL DEFAULT FALSE,
	has_computers Boolean NOT NULL DEFAULT FALSE
);

DROP TABLE IF EXISTS keys.schedule;
CREATE TABLE IF NOT EXISTS keys.schedule  (
	id SERIAL PRIMARY KEY,
	person_id VARCHAR(9) REFERENCES person(id),
	class_number SMALLINT REFERENCES "class"(class_number),
	start_date TIMESTAMP NOT NULL,
	end_date TIMESTAMP NOT NULL
);