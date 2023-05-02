
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "favorites" (
    "user_id" INTEGER NOT NULL,
    "ticker" VARCHAR(10) NOT NULL
)