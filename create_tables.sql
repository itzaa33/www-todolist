
-- CREATE DATABASE db_task
--   WITH 
--   OWNER = root
--   ENCODING = 'UTF8'
--   LC_COLLATE = 'en_US.utf8'
--   LC_CTYPE = 'en_US.utf8'
--   TABLESPACE = pg_default
--   CONNECTION LIMIT = -1;

-- Creation of task table
CREATE TABLE IF NOT EXISTS task (
  id SERIAL NOT NULL ,
  title varchar(450),
  status_task boolean NOT NULL,
  PRIMARY KEY (id)
);

-- Creation of subtask table
CREATE TABLE IF NOT EXISTS subtask (
  id SERIAL NOT NULL,
  title varchar(450),
  status_subtask boolean NOT NULL,
  PRIMARY KEY (id),
  id_task INT NOT NULL,
      FOREIGN KEY(id_task) 
	  REFERENCES task(id)
);
