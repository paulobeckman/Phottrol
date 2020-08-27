CREATE TABLE "events" (
  "id" SERIAL PRIMARY KEY,
  "client_name" text NOT NULL,
  "address" text,
  "date_event" timestamp NOT NULL,
  "cost" text NOT NULL,
  "category" text NOT NULL,
  "shift" text,
  "employees_id" int UNIQUE,
  "equipment_id" int UNIQUE
);

CREATE TABLE "employees" (
  "id" SERIAL PRIMARY KEY,
  "office" text NOT NULL,
  "name" text NOT NULL,
  "birth" timestamp,
  "salary" text,
  "events_id" int
);

CREATE TABLE "equipment" (
  "id" SERIAL PRIMARY KEY,
  "type" text,
  "name" text,
  "cost" text,
  "depreciation" text,
  "acquisition_date" timestamp,
  "replacement_date" timestamp,
  "events_id" int
);

CREATE TABLE "events_employees" (
  "events_id" int,
  "employees_id" int
);

CREATE TABLE "events_equipment" (
  "events_id" int,
  "equipment_id" int
);

ALTER TABLE "events_employees" ADD FOREIGN KEY ("events_id") REFERENCES "events" ("employees_id");

ALTER TABLE "events_employees" ADD FOREIGN KEY ("employees_id") REFERENCES "employees" ("id");

ALTER TABLE "events_equipment" ADD FOREIGN KEY ("events_id") REFERENCES "events" ("equipment_id");

ALTER TABLE "events_equipment" ADD FOREIGN KEY ("equipment_id") REFERENCES "equipment" ("id");
