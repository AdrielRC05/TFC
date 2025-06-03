# API REST - Endpoints

---

## Ediciones

### GET `/api/ediciones`
Devuelve una lista con todas las ediciones del campeonato.

### GET `/api/ediciones/{id}`
Devuelve una edición concreta según su ID.

### GET `/api/ediciones/top3`
Devuelve las 3 ediciones más recientes.

### GET `/api/ediciones/{id}/pruebas`
Devuelve las pruebas (subidas) asociadas a una edición concreta.

### POST `/api/ediciones`
Crea una nueva edición del campeonato.

### PUT `/api/ediciones/{id}`
Actualiza una edición existente según su ID.

### DELETE `/api/ediciones/{id}`
Elimina una edición por su ID.

---

## Noticias

### GET `/api/noticias`
Devuelve todas las noticias.

### GET `/api/noticias/año/{año}`
Devuelve las noticias publicadas en un año concreto.

### GET `/api/noticias/search?q=palabra_clave`
Busca noticias que contengan una palabra clave.

### POST `/api/noticias`
Crea una nueva noticia.

### POST `/api/noticias/id`
Crea múltiples noticias en una sola petición (batch insert).

---

## Participantes

### GET `/api/participantes`
Devuelve todos los participantes registrados.

### GET `/api/participantes/{id}`
Devuelve un participante específico por ID.

### POST `/api/participantes`
Crea un nuevo participante.

### PUT `/api/participantes/{id}`
Actualiza un participante existente.

### DELETE `/api/participantes/{id}`
Elimina un participante por su ID.

---

## Puntos de Ruta

### GET `/api/puntos`
Devuelve todos los puntos de ruta.

### GET `/api/puntos/{id}`
Devuelve un punto de ruta por su ID.

### GET `/api/puntos/ruta/{rutaId}`
Devuelve los puntos de una ruta específica.

### POST `/api/puntos/guardar/{rutaId}`
Guarda múltiples puntos asociados a una ruta.

### POST `/api/puntos`
Guarda un punto individual.

### PUT `/api/puntos/{id}`
Actualiza un punto de ruta por su ID.

### DELETE `/api/puntos/{id}`
Elimina un punto de ruta por su ID.

---

## Rutas

### GET `/api/rutas`
Devuelve todas las rutas.

### GET `/api/rutas/{id}`
Devuelve una ruta específica por ID.

### POST `/api/rutas`
Crea una nueva ruta.

### DELETE `/api/rutas/{id}`
Elimina una ruta por su ID.

### GET `/api/rutas/{id}/ruta`
Devuelve los puntos de la ruta asociados a una subida específica.

---

## Subidas

### GET `/api/subidas`
Devuelve todas las subidas, incluyendo rutas y sus puntos.

### GET `/api/subidas/{id}`
Devuelve una subida específica por ID, con rutas y puntos.

### GET `/api/subidas/edicion/{id}/subidas`
Devuelve todas las subidas asociadas a una edición.

### GET `/api/subidas/nombre/{nombre}?nombre=XXX`
Busca subidas por nombre.

### GET `/api/subidas/top3`
Devuelve las 3 subidas con mejores resultados o más recientes (según implementación).

### POST `/api/subidas`
Crea una nueva subida.

### PUT `/api/subidas/{id}`
Actualiza una subida existente.

### DELETE `/api/subidas/{id}`
Elimina una subida por su ID.

