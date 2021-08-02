
-- CREATE DATABASE db_task
--   WITH 
--   OWNER = root
--   ENCODING = 'UTF8'
--   LC_COLLATE = 'en_US.utf8'
--   LC_CTYPE = 'en_US.utf8'
--   TABLESPACE = pg_default
--   CONNECTION LIMIT = -1;

-- Creation of task table
CREATE TABLE IF NOT EXISTS todo (
  id SERIAL NOT NULL ,
  title varchar(450) NOT NULL,
  status varchar(450) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Creation of subtask table
CREATE TABLE IF NOT EXISTS subtask (
  id SERIAL NOT NULL,
  title varchar(450) NOT NULL,
  status varchar(450) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY (id),
  todo_id INT NOT NULL,
      FOREIGN KEY(todo_id) 
	  REFERENCES todo(id)
);
