CREATE TABLE "chefs" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "avatar_url" text NOT NULL,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "recipes" (
  "id" SERIAL PRIMARY KEY,
  "chef_id" integer NOT NULL,
  "image" text NOT NULL,
  "title" text NOT NULL,
  "ingredients" text[] NOT NULL,
  "preparations" text[] NOT NULL,
  "information" text,
  "created_at" timestamp DEFAULT (now())
);

ALTER TABLE "recipes" ADD FOREIGN KEY ("chef_id") REFERENCES "chefs" ("id");