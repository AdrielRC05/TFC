
---

# ✅ Archivo: `docs/source/backend/ruta.controller.md`

```markdown
# RutaController

## Descripción

Controlador REST que maneja las rutas asociadas a cada subida.

### Ruta base:
```java
@RestController
@RequestMapping("/api/rutas")
public class RutaController {

    @Autowired
    private RutaService rutaService;

    // Devuelve todas las rutas
    @GetMapping
    public List<Ruta> obtenerRutas() {
        return rutaService.obtenerRutas();
    }

    // Devuelve una ruta por ID
    @GetMapping("/{id}")
    public Ruta obtenerRutasPorId(@PathVariable Long id) {
        return rutaService.obtenerRutasPorId(id);
    }

    // Guarda una ruta
    @PostMapping
    public Ruta guardarRuta(@RequestBody Ruta ruta) {
        return rutaService.guardarRuta(ruta);
    }

    // Elimina una ruta por ID
    @DeleteMapping("/{id}")
    public void borrarRuta(@PathVariable Long id) {
        rutaService.borrarRuta(id);
    }

    // Devuelve los puntos de una ruta
    @GetMapping("/{id}/ruta")
    public ResponseEntity<List<PuntoRuta>> getPuntosDeRutaPorSubida(@PathVariable Long id) {
        List<PuntoRuta> puntos = rutaService.getPuntosPorSubida(id);
        return ResponseEntity.ok(puntos);
    }
}