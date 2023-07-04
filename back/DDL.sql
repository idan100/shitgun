DROP TABLE IF EXISTS keys.users;
CREATE TABLE IF NOT EXISTS keys.users  (
		username TEXT PRIMARY KEY,
		password TEXT NOT NULL,
		phone_number TEXT NOT NULL
);

DROP TABLE IF EXISTS keys."classes";
CREATE TABLE IF NOT EXISTS keys."classes"  (
	class_number VARCHAR(3) PRIMARY KEY,
	has_projector Boolean NOT NULL DEFAULT FALSE,
	has_computers Boolean NOT NULL DEFAULT FALSE
);

DROP TABLE IF EXISTS keys.schedules;
CREATE TABLE IF NOT EXISTS keys.schedules  (
	id SERIAL PRIMARY KEY,
	username TEXT REFERENCES keys.users(username),
	class_number VARCHAR(3) REFERENCES keys."classes"(class_number),
	start_date TIMESTAMP NOT NULL,
	end_date TIMESTAMP NOT NULL
);