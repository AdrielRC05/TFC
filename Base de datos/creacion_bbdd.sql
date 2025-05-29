drop database if exists campeonato_montana;
create database campeonato_montana;
use campeonato_montana;

-- Información general del campeonato
CREATE TABLE info_campeonato (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    historial TEXT,
    reglamento TEXT
);

-- Participantes
CREATE TABLE participante (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    edad INT CHECK (edad >= 0),
    titulos INT DEFAULT 0,
    coche VARCHAR(255)
);

-- Ediciones del campeonato
CREATE TABLE edicion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    año INT NOT NULL UNIQUE,
    lugar VARCHAR(255),
    ganador_turismos INT,
    ganador_barquetas INT,
    CONSTRAINT fk_edicion_ganadorT FOREIGN KEY (ganador_turismos) REFERENCES participante(id) ON DELETE SET NULL,
    CONSTRAINT fk_edicion_ganadorB FOREIGN KEY (ganador_barquetas) REFERENCES participante(id) ON DELETE SET NULL
);

-- Subidas (pruebas) de cada edición
CREATE TABLE subida (
    id INT AUTO_INCREMENT PRIMARY KEY,
    edicion_id INT NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    fecha_inicio DATE,
    fecha_fin DATE,
    ganador_id INT,
    FOREIGN KEY (edicion_id) REFERENCES edicion(id),
    FOREIGN KEY (ganador_id) REFERENCES participante(id)
);

-- Participación en subidas
CREATE TABLE participantes_subida (
    id INT AUTO_INCREMENT PRIMARY KEY,
    subida_id INT NOT NULL,
    participante_id INT NOT NULL,
    resultado VARCHAR(255),
    tiempo DECIMAL(5, 2),
    FOREIGN KEY (subida_id) REFERENCES subida(id),
    FOREIGN KEY (participante_id) REFERENCES participante(id)
);

-- Rutas de cada subida
CREATE TABLE ruta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    subida_id INT NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    distancia DECIMAL(10, 2),
    FOREIGN KEY (subida_id) REFERENCES subida(id)
);

-- Puntos de cada ruta (para OpenStreetMap)
CREATE TABLE punto_ruta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ruta_id INT NOT NULL,
    latitud DECIMAL(9, 6),
    longitud DECIMAL(9, 6),
    descripcion TEXT,
    FOREIGN KEY (ruta_id) REFERENCES ruta(id)
);

-- Clasificación general por edición
CREATE TABLE clasificacion_general (
    id INT AUTO_INCREMENT PRIMARY KEY,
    edicion_id INT NOT NULL,
    participante_id INT NOT NULL,
    puesto INT,
    tiempo DECIMAL(5, 2),
    FOREIGN KEY (edicion_id) REFERENCES edicion(id),
    FOREIGN KEY (participante_id) REFERENCES participante(id)
);

-- Noticias por edición
CREATE TABLE noticia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    enlace VARCHAR(512) NOT NULL,
    año integer not null
);

-- Patrocinadores
CREATE TABLE patrocinador (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    logo_url VARCHAR(255),
    descripcion TEXT
);

use campeonato_montana;