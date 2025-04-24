/*
  # Add registration products table

  1. New Tables
    - registration_products
      - id (uuid, primary key)
      - registration_id (uuid, references registrations)
      - product_id (uuid)
      - quantity (integer)
      - size (text, nullable)
      - created_at (timestamptz)
      - updated_at (timestamptz)

  2. Security
    - Enable RLS on registration_products table
    - Add policies for authenticated users
*/

CREATE TABLE IF NOT EXISTS registration_products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_id uuid REFERENCES registrations(id) ON DELETE CASCADE,
  product_id uuid NOT NULL,
  quantity integer NOT NULL DEFAULT 1,
  size text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE registration_products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own registration products" ON registration_products
  FOR SELECT TO authenticated
  USING (registration_id IN (
    SELECT id FROM registrations WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can create own registration products" ON registration_products
  FOR INSERT TO authenticated
  WITH CHECK (registration_id IN (
    SELECT id FROM registrations WHERE user_id = auth.uid()
  ));