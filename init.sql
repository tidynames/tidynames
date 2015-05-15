-- creating tables
CREATE TABLE name (
  id serial PRIMARY KEY,
  value varchar(64) NOT NULL,
  type char(1) NOT NULL
);

CREATE TABLE full_name (
  id serial PRIMARY KEY,
  person_id integer NOT NULL,
  name_id integer REFERENCES name(id) NOT NULL,
  ordering integer NOT NULL
);

-- adding indexes
CREATE INDEX value_idx ON name (value);
CREATE INDEX person_idx ON full_name (person_id);
CREATE INDEX name_id_idx ON full_name (name_id);
