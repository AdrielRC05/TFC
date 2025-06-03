# Documentación del Backend – Campeonato Gallego de Montaña

El backend está desarrollado en **Java + Spring Boot** y ofrece una API REST para el frontend Angular.

## Controladores principales

- [SubidasController](subidas.controller.md)
- [EdicionesController](ediciones.controller.md)
- [PilotosController](pilotos.controller.md)
- [RutaController](ruta.controller.md)
- [PuntoController](punto.controller.md)

## Tecnologías usadas

- Java 17+
- Spring Boot (MVC, Data, Security)
- JPA + Hibernate
- PostgreSQL o MySQL (según tu caso)
- Lombok (opcional, para reducir código boilerplate)

---

## Flujo general de datos

1. El frontend llama al backend vía HTTP
2. El servicio procesa la solicitud y devuelve datos
3. Los datos se muestran dinámicamente en Angular

Ejemplo:
```ts
this.servicio.obtenerSubidas().subscribe((data: any[]) => {
  this.subidas = data;
});