# Documentación del Frontend

El frontend está desarrollado en **Angular 16+** y se comunica con un backend Spring Boot mediante una API REST.

## Componentes clave

A continuación, se detalla la funcionalidad técnica de cada componente importante:

- [SubidasComponent](subidas.component.md)
- [EdicionesComponent](ediciones.component.md)
- [PilotosComponent](pilotos.component.md)
- [NoticiasComponent](noticias.component.md)
- [SubidaComponent](subida.component.md)

## Tecnologías usadas

- [Angular](https://angular.io) 
- [Leaflet](https://leafletjs.com)  – Mapas interactivos
- [OpenRouteService](https://openrouteservice.org)  – Rutas dinámicas
- [Bootstrap + Font Awesome] – Estilos y UI

## Características técnicas

- Filtros por nombre y fecha
- Lazy loading de mapas Leaflet
- Comunicación con backend vía servicios HTTP
- Reutilización de componentes (ej. `SubidaComponent`)