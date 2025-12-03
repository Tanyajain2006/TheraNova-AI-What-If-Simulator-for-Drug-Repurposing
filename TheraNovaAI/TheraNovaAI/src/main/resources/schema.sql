-- Create database (if not already created)
CREATE DATABASE IF NOT EXISTS theranova_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE theranova_db;

-- Table to store saved analyses
CREATE TABLE IF NOT EXISTS saved_analysis (
    id VARCHAR(100) NOT NULL,          -- Unique Analysis ID from ML Service
    json_data LONGTEXT NOT NULL,       -- Full JSON response stored as text
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- When saved
    PRIMARY KEY (id)
);
