CREATE DATABASE RoboCar;
USE RoboCar;

CREATE TABLE Map(
  id INT NOT NULL PRIMARY KEY,
  name INT NOT NULL,
  width INT NOT NULL,
  height INT NOT NULL
);

CREATE TABLE Point(
  id INT NOT NULL PRIMARY KEY,
  x INT NOT NULL,
  y INT NOT NULL,
  temperature INT DEFAULT NULL,
  humidity INT DEFAULT NULL,
  lightIntensity INT DEFAULT NULL,
  isTilted BOOLEAN DEFAULT NULL,
  mapId INT NOT NULL,
  FOREIGN KEY (mapId) REFERENCES Map(id)
);