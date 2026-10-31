-- PNG Power Issue Reporting & Resolution System
-- MySQL Schema

CREATE DATABASE IF NOT EXISTS png_power;
USE png_power;

-- Regions
CREATE TABLE IF NOT EXISTS regions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  code VARCHAR(20),
  parent_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (parent_id) REFERENCES regions(id)
);

-- Teams
CREATE TABLE IF NOT EXISTS teams (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  region_id INT,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (region_id) REFERENCES regions(id)
);

-- Users (staff)
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  role ENUM('operations','field','admin','staff','regional_coordinator','regional_manager','hq_admin','system_admin') NOT NULL,
  department VARCHAR(100),
  team_id INT,
  phone VARCHAR(30),
  status ENUM('Active','Inactive') DEFAULT 'Active',
  password_hash VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES teams(id)
);

-- Issue categories
CREATE TABLE IF NOT EXISTS issue_categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE
);

-- Reports
CREATE TABLE IF NOT EXISTS reports (
  id INT AUTO_INCREMENT PRIMARY KEY,
  case_number VARCHAR(30) UNIQUE NOT NULL,
  source ENUM('web','staff','call_centre') DEFAULT 'web',
  issue_category_id INT,
  issue_type VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  province VARCHAR(100),
  location TEXT NOT NULL,
  reporter_name VARCHAR(100),
  reporter_phone VARCHAR(30),
  reporter_email VARCHAR(150),
  contact_preference VARCHAR(50),
  meter_number VARCHAR(50),
  safety_risk BOOLEAN DEFAULT FALSE,
  urgency ENUM('Low','Medium','High','Critical') DEFAULT 'Medium',
  status ENUM('Recorded','Under review','Assigned','Work in progress','Pending','Resolved','Closed') DEFAULT 'Recorded',
  received_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  reported_at TIMESTAMP NULL,
  region_id INT,
  assigned_team_id INT,
  assigned_user_id INT,
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (issue_category_id) REFERENCES issue_categories(id),
  FOREIGN KEY (region_id) REFERENCES regions(id),
  FOREIGN KEY (assigned_team_id) REFERENCES teams(id),
  FOREIGN KEY (assigned_user_id) REFERENCES users(id),
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Incidents
CREATE TABLE IF NOT EXISTS incidents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  incident_number VARCHAR(30) UNIQUE NOT NULL,
  category VARCHAR(100),
  issue_category_id INT,
  status ENUM('Open','Under review','Assigned','In progress','Pending','Resolved','Closed') DEFAULT 'Open',
  priority ENUM('Low','Medium','High','Critical') DEFAULT 'Medium',
  province VARCHAR(100),
  location TEXT,
  region_id INT,
  impact_summary TEXT,
  accountable_team_id INT,
  accountable_user_id INT,
  opened_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  resolved_at TIMESTAMP NULL,
  resolution_summary TEXT,
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (issue_category_id) REFERENCES issue_categories(id),
  FOREIGN KEY (region_id) REFERENCES regions(id),
  FOREIGN KEY (accountable_team_id) REFERENCES teams(id),
  FOREIGN KEY (accountable_user_id) REFERENCES users(id),
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Report-Incident Links (at most one active per report)
CREATE TABLE IF NOT EXISTS report_incident_links (
  id INT AUTO_INCREMENT PRIMARY KEY,
  report_id INT NOT NULL,
  incident_id INT NOT NULL,
  linked_by INT NOT NULL,
  linked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  unlinked_by INT,
  unlinked_at TIMESTAMP NULL,
  unlink_reason TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (report_id) REFERENCES reports(id),
  FOREIGN KEY (incident_id) REFERENCES incidents(id),
  FOREIGN KEY (linked_by) REFERENCES users(id),
  FOREIGN KEY (unlinked_by) REFERENCES users(id)
);

-- Work Orders
CREATE TABLE IF NOT EXISTS work_orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  work_order_number VARCHAR(30) UNIQUE NOT NULL,
  incident_id INT,
  task_type VARCHAR(100),
  status ENUM('Draft','Assigned','Accepted','In progress','Blocked','Work completed','Cancelled') DEFAULT 'Draft',
  assigned_team_id INT,
  assigned_user_id INT,
  next_action TEXT,
  review_date TIMESTAMP NULL,
  due_date TIMESTAMP NULL,
  findings TEXT,
  completion_details TEXT,
  completed_at TIMESTAMP NULL,
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (incident_id) REFERENCES incidents(id),
  FOREIGN KEY (assigned_team_id) REFERENCES teams(id),
  FOREIGN KEY (assigned_user_id) REFERENCES users(id),
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Events (append-only audit log)
CREATE TABLE IF NOT EXISTS events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  entity_type ENUM('report','incident','work_order','user') NOT NULL,
  entity_id INT NOT NULL,
  event_type VARCHAR(100) NOT NULL,
  actor_id INT,
  server_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  recorded_local_time TIMESTAMP,
  reason TEXT,
  metadata JSON,
  FOREIGN KEY (actor_id) REFERENCES users(id)
);

-- Attachments
CREATE TABLE IF NOT EXISTS attachments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  entity_type ENUM('report','incident','work_order') NOT NULL,
  entity_id INT NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  file_type VARCHAR(100),
  file_size INT,
  file_path VARCHAR(500) NOT NULL,
  checksum VARCHAR(64),
  scan_state ENUM('pending','clean','infected','error') DEFAULT 'pending',
  uploaded_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (uploaded_by) REFERENCES users(id)
);

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  recipient_type ENUM('reporter','user') NOT NULL,
  report_id INT,
  incident_id INT,
  user_id INT,
  channel ENUM('email','sms','in_app') NOT NULL,
  template VARCHAR(100),
  delivery_state ENUM('pending','sent','delivered','failed') DEFAULT 'pending',
  attempts INT DEFAULT 0,
  last_attempt_at TIMESTAMP NULL,
  sent_at TIMESTAMP NULL,
  error_message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (report_id) REFERENCES reports(id),
  FOREIGN KEY (incident_id) REFERENCES incidents(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Idempotency records
CREATE TABLE IF NOT EXISTS idempotency_records (
  id INT AUTO_INCREMENT PRIMARY KEY,
  idempotency_key VARCHAR(100) UNIQUE NOT NULL,
  client_event_uuid VARCHAR(100),
  actor_id INT,
  response_result JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (actor_id) REFERENCES users(id)
);

-- Seed data
INSERT INTO issue_categories (name, description) VALUES
  ('Power outage (Area blackout)', 'Total blackout affecting a neighborhood or suburb'),
  ('Single household outage', 'Power outage affecting a single household'),
  ('Fallen power line / wire on ground', 'Downed power line or wire on the ground'),
  ('Transformer explosion / smoke / spark', 'Transformer fault with explosion, smoke, or sparking'),
  ('Damaged or leaning power pole', 'Damaged or leaning power pole'),
  ('Streetlight failure', 'Streetlight not working'),
  ('Easipay meter error code', 'Easipay meter displaying error code'),
  ('Low voltage / voltage surge', 'Low voltage or voltage surge'),
  ('Other electrical hazard', 'Other electrical safety hazard');

INSERT INTO regions (name, code) VALUES
  ('National Capital District', 'NCD'),
  ('Central Province', 'CP'),
  ('Morobe', 'MOR'),
  ('Eastern Highlands', 'EH'),
  ('Western Highlands', 'WH'),
  ('East New Britain', 'ENB'),
  ('Madang', 'MAD'),
  ('New Ireland', 'NI'),
  ('West New Britain', 'WNB'),
  ('Milne Bay', 'MB');

INSERT INTO teams (name, region_id, active) VALUES
  ('NCD Dispatch', 1, TRUE),
  ('Lae Field Team', 3, TRUE),
  ('Mt Hagen Center', 5, TRUE),
  ('Kokopo Regional', 6, TRUE);

-- Default admin user (password: admin123 - change in production)
INSERT INTO users (name, email, role, department, status) VALUES
  ('John Kila', 'ops.lead@pngpower.com.pg', 'operations', 'Operations & Dispatch', 'Active'),
  ('Maria Wari', 'crew.delta@pngpower.com.pg', 'field', 'Field Operations', 'Active'),
  ('David Raka', 'admin.hq@pngpower.com.pg', 'admin', 'IT & Admin', 'Active'),
  ('Sarah Momo', 'dispatch.ncd@pngpower.com.pg', 'operations', 'NCD Dispatch', 'Active'),
  ('Peter Kila', 'tech.lae@pngpower.com.pg', 'field', 'Lae Field Team', 'Active');
