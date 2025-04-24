/*
  # Initial Schema Setup

  1. New Tables
    - users
      - id (uuid, primary key)
      - email (text, unique)
      - full_name (text)
      - birth_date (date)
      - cpf (text)
      - created_at (timestamptz)
      - updated_at (timestamptz)
    
    - registrations
      - id (uuid, primary key)
      - user_id (uuid, references users)
      - event_id (uuid)
      - status (text)
      - created_at (timestamptz)
      - updated_at (timestamptz)

    - registration_details
      - id (uuid, primary key)
      - registration_id (uuid, references registrations)
      - parent_name (text)
      - parent_email (text)
      - parent_phone (text)
      - camper_name (text)
      - camper_birth_date (date)
      - camper_gender (text)
      - created_at (timestamptz)
      - updated_at (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  birth_date date NOT NULL,
  cpf text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create registrations table
CREATE TABLE IF NOT EXISTS registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  event_id uuid NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create registration_details table
CREATE TABLE IF NOT EXISTS registration_details (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_id uuid REFERENCES registrations(id) ON DELETE CASCADE,
  parent_name text NOT NULL,
  parent_email text NOT NULL,
  parent_phone text NOT NULL,
  camper_name text NOT NULL,
  camper_birth_date date NOT NULL,
  camper_gender text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE registration_details ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own data" ON users
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can read own registrations" ON registrations
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own registrations" ON registrations
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can read own registration details" ON registration_details
  FOR SELECT TO authenticated
  USING (registration_id IN (
    SELECT id FROM registrations WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can create own registration details" ON registration_details
  FOR INSERT TO authenticated
  WITH CHECK (registration_id IN (
    SELECT id FROM registrations WHERE user_id = auth.uid()
  ));