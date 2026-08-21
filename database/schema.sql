-- Create Database if not exists
CREATE DATABASE IF NOT EXISTS vibrant_saas CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE vibrant_saas;

-- Drop table if exists for clean installation
DROP TABLE IF EXISTS users;

-- Users Table Definition
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(191) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_users_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
