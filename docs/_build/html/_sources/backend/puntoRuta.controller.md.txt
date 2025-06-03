
---

# ✅ Archivo: `docs/source/backend/punto-ruta.controller.md`

```markdown
# PuntoRutaController

## Descripción

Controlador REST que gestiona los puntos de ruta usados en mapas Leaflet.

### Ruta base:
```java
@RestController
@RequestMapping("/api/puntos")
public class PuntoRutaController {
    @Autowired
    private PuntoRutaService service;

    // Devuelve todos los puntos de ruta
    @GetMapping
    public List<PuntoRuta> findAll() {
        return service.obtenerPuntosDeRuta();
    }

    // Devuelve un punto por ID
    @GetMapping("/{id}")
    public PuntoRuta findById(@PathVariable Long id) {
        return service.obtenerPuntoDeRutaPorId(id);
    }

    // Devuelve puntos por ID de ruta
    @GetMapping("/ruta/{rutaId}")
    public ResponseEntity<List<PuntoRuta>> getPuntosPorRuta(@PathVariable Long rutaId) {
        List<PuntoRuta> puntos = service.obtenerPuntosDeRutaPorRutaId(rutaId);
        
        if (puntos.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(puntos);
    }

    // Guarda nuevos puntos de una ruta
    @PostMapping("/guardar/{rutaId}")
    public ResponseEntity<Void> guardarPuntos(@PathVariable Long rutaId,
                                              @RequestBody List<PuntoRutaDTO> puntosDTO) {
        service.guardarPuntos(rutaId, puntosDTO);
        return ResponseEntity.ok().build();
    }

    // Guarda un único punto
    @PostMapping
    public PuntoRuta save(@RequestBody PuntoRuta punto) {
        return service.guardarPuntoDeRuta(punto);
    }

    // Actualiza un punto
    @PutMapping("/{id}")
    public PuntoRuta actualizarPuntoDeRuta(@PathVariable Long id, @RequestBody PuntoRuta punto) {
        return service.actualizarPuntoDeRuta(id, punto);
    }

    // Elimina un punto por ID
    @DeleteMapping("/{id}")
    public void borrarPunto(@PathVariable Long id) {
        service.borrarPuntoDeRuta(id);
    }
}