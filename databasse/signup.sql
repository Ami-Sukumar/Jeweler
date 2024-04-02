-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    new_password VARCHAR(100), -- New column to store updated password
    is_deleted BOOLEAN DEFAULT FALSE -- Flag to mark profile as deleted (optional)
);

DO $$
BEGIN
    INSERT INTO users (username, email, password)
    VALUES ('ami', 'ami.sukumar@code.berlin', 'amisukumar');
EXCEPTION WHEN unique_violation THEN
    RAISE EXCEPTION 'Username or email already exists';
END $$;


-- Select user information based on username or email using prepared statements
SELECT * FROM users
WHERE username = 'example_user' OR email = 'user@example.com';