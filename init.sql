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
