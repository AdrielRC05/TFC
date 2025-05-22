-- Insertar la ruta principal de la Subida a Chantada
INSERT INTO ruta (subida_id, nombre, descripcion, distancia)
VALUES (
  273,  -- Reemplaza con el ID real de esta subida
  'Subida a Chantada 2023 - Tramo Cronometrado',
  'Recorrido oficial de la 38ª Subida a Chantada con salida en Ponte Asma y llegada en Chantada',
  4.1  -- 8.2 km de distancia según el enlace
);

-- Obtenemos el ID de la ruta recién insertada
SET @ruta_id = LAST_INSERT_ID();
-- Insertamos los puntos clave del recorrido con coordenadas reales
INSERT INTO punto_ruta (ruta_id, latitud, longitud, descripcion)
VALUES
-- Salida
(@ruta_id, 42.600278, -7.785833, 'Salida - Ponte Asma'),
-- Curva destacada 1 (Airavella)
(@ruta_id, 42.603889, -7.781944, 'Curva de Airavella (izquierda)'),
-- Zona de frenada importante
(@ruta_id, 42.606111, -7.778333, 'Frenada para curva derecha cerrada'),
-- Entrada a Chantada
(@ruta_id, 42.608333, -7.775000, 'Entrada a Chantada - Inicio zona urbana'),
-- Curva emblemática final
(@ruta_id, 42.608611, -7.771667, 'Curva final frente a la tribuna'),
-- Llegada
(@ruta_id, 42.608889, -7.768889, 'Llegada - Plaza de Chantada');