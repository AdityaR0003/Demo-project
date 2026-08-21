USE vibrant_saas;

-- Insert demo test user (password: DemoPass123! - hashed using bcrypt with 10 rounds)
INSERT INTO users (full_name, email, password_hash) 
VALUES (
    'Demo User',
    'demo@example.com',
    '$2a$10$wN31XbJg3sPjD6a9/P64euS2kYp5y6VzX0F9h9Y8v2k7m3X4Y5Z6W'
) ON DUPLICATE KEY UPDATE email=email;
