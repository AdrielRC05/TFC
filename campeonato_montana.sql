-- Información general del campeonato
CREATE TABLE info_campeonato (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    historial TEXT,
    reglamento TEXT
);

-- Ediciones del campeonato
CREATE TABLE edicion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    año INT NOT NULL UNIQUE,
    lugar VARCHAR(255)
);

-- Subidas (pruebas) de cada edición
CREATE TABLE subida (
    id INT AUTO_INCREMENT PRIMARY KEY,
    edicion_id INT NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    fecha_inicio DATE,
    fecha_fin DATE,
    ganador_id INT,  -- Participante que gana esta subida
    FOREIGN KEY (edicion_id) REFERENCES edicion(id),
    FOREIGN KEY (ganador_id) REFERENCES participante(id)
);

-- Participantes
CREATE TABLE participante (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    edad INT CHECK (edad >= 0),
    titulos INT DEFAULT 0,
    coche VARCHAR(255)
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
CREATE TABLE puntos_ruta (
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
CREATE TABLE noticias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    edicion_id INT NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    contenido TEXT,
    autor VARCHAR(255),
    FOREIGN KEY (edicion_id) REFERENCES edicion(id)
);

-- Patrocinadores
CREATE TABLE patrocinadores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    logo_url VARCHAR(255),
    descripcion TEXT
);
