CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS providers CASCADE;
DROP TABLE IF EXISTS job_postings CASCADE;
DROP TABLE IF EXISTS symptomes CASCADE;
DROP TABLE IF EXISTS symptomes_look_up CASCADE;
DROP TABLE IF EXISTS job_proposals CASCADE;
​
​
CREATE TABLE customers(
    id SERIAL PRIMARY KEY NOT NULL,
    prefix VARCHAR(10),
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    userName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);
​
CREATE TABLE providers(
    id uuid PRIMARY KEY DEFAULT UUID_GENERATE_V4(),
    prefix VARCHAR(10) DEFAULT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    userName VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    degree VARCHAR(255) DEFAULT NULL,
    aboutMe TEXT DEFAULT NULL,
    therapy VARCHAR(255) DEFAULT NULL,
    age VARCHAR(255) DEFAULT NULL,
    ethnicity VARCHAR(255) DEFAULT NULL,
    location VARCHAR(255) DEFAULT NULL,
    profile_photo_url VARCHAR(255) DEFAULT NULL
);
​
CREATE TABLE job_postings(
    id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(255) DEFAULT NULL,
    customer_id INTEGER REFERENCES customers(id) ON DELETE CASCADE,
    appointmentFor VARCHAR(255),
    description TEXT,
    therapy VARCHAR(255),
    insurance VARCHAR(255),
    sexuality VARCHAR(255),
    age VARCHAR(255),
    language VARCHAR(255),
    ethnicity VARCHAR(255),
    faith VARCHAR(255),
    country VARCHAR(255),
    typeOfPayment VARCHAR(255),
    maxPrice INTEGER,
    minPrice INTEGER,
    appointmentFrequency VARCHAR(255),
    timeRequirement VARCHAR(255),
    availabilityFrom VARCHAR(255),
    availabilityTo VARCHAR(255),
    postCreationTimeZone VARCHAR(255),
    is_accepted VARCHAR(255) DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
​
CREATE TABLE symptomes(
    id SERIAL PRIMARY KEY NOT NULL,  
    name VARCHAR(255)
);
​
CREATE TABLE symptomes_look_up(
    id SERIAL PRIMARY KEY NOT NULL,
    job_posting_id INTEGER REFERENCES job_postings(id) ON DELETE CASCADE,
    symptome_id INTEGER REFERENCES symptomes(id) ON DELETE CASCADE
);

CREATE TABLE job_proposals(
    id SERIAL PRIMARY KEY NOT NULL,
    provider_id uuid REFERENCES providers(id) ON DELETE CASCADE,
    job_posting_id INTEGER REFERENCES job_postings(id) ON DELETE CASCADE,
    description VARCHAR(255) DEFAULT NULL,
    price  INTEGER DEFAULT NULL,
    availability_days VARCHAR(255) DEFAULT NULL,
    availabilityFrom VARCHAR(255) DEFAULT NULL,
    availabilityTo VARCHAR(255) DEFAULT NULL,
    is_accepted VARCHAR(255) DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
​