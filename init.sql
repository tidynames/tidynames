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

ALTER SEQUENCE name_id_seq RESTART;
DELETE FROM full_name;
DELETE FROM name;

INSERT INTO name(value, type) VALUES('john', 'F');
INSERT INTO name(value, type) VALUES('jane', 'F');
INSERT INTO name(value, type) VALUES('dave', 'F');
INSERT INTO name(value, type) VALUES('lane', 'F');
INSERT INTO name(value, type) VALUES('david', 'F');
INSERT INTO name(value, type) VALUES('jayne', 'F');
INSERT INTO name(value, type) VALUES('smith', 'L');
INSERT INTO name(value, type) VALUES('south', 'L');
INSERT INTO name(value, type) VALUES('southern', 'L');
INSERT INTO name(value, type) VALUES('moth', 'L');
INSERT INTO name(value, type) VALUES('sooth', 'L');
INSERT INTO name(value, type) VALUES('moose', 'L');

-- John Smith
INSERT INTO full_name(person_id, name_id, ordering) VALUES(1, 1, 1);
INSERT INTO full_name(person_id, name_id, ordering) VALUES(1, 7, 2);

-- Smith John
INSERT INTO full_name(person_id, name_id, ordering) VALUES(8, 1, 2);
INSERT INTO full_name(person_id, name_id, ordering) VALUES(8, 7, 1);

INSERT INTO full_name(person_id, name_id, ordering) VALUES(2, 1, 1);
INSERT INTO full_name(person_id, name_id, ordering) VALUES(2, 8, 2);

INSERT INTO full_name(person_id, name_id, ordering) VALUES(3, 1, 1);
INSERT INTO full_name(person_id, name_id, ordering) VALUES(3, 10, 2);

INSERT INTO full_name(person_id, name_id, ordering) VALUES(4, 2, 1);
INSERT INTO full_name(person_id, name_id, ordering) VALUES(4, 9, 2);

INSERT INTO full_name(person_id, name_id, ordering) VALUES(5, 2, 1);
INSERT INTO full_name(person_id, name_id, ordering) VALUES(5, 10, 2);

INSERT INTO full_name(person_id, name_id, ordering) VALUES(6, 2, 1);
INSERT INTO full_name(person_id, name_id, ordering) VALUES(6, 11, 1);

INSERT INTO full_name(person_id, name_id, ordering) VALUES(7, 3, 1);
INSERT INTO full_name(person_id, name_id, ordering) VALUES(7, 12, 2);

