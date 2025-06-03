
---

# ✅ Archivo: `docs/source/backend/ediciones.controller.md`

```markdown
# EdicionController

## Descripción

Controlador REST que gestiona ediciones del campeonato.  
Permite cargar subidas asociadas a cada edición.

### Ruta base:
```java
@RestController
@RequestMapping("/api/ediciones")
public class EdicionController {
    @Autowired
    private EdicionService edicionService;

    @Autowired
    private SubidaRepository subidaRepository;

    // Devuelve todas las ediciones
    @GetMapping
    public List<Edicion> obtenerEdiciones() {
        return edicionService.obtenerEdiciones();
    }

    // Devuelve edición por ID
    @GetMapping("/{id}")
    public Edicion obtenerEdicionesPorId(@PathVariable Long id) {
        return edicionService.obtenerEdicionesPorId(id);
    }

    // Devuelve las 3 ediciones más recientes
    @GetMapping("/top3")
    public List<Edicion> getTop3Ediciones() {
        return edicionService.getTop3Recientes();
    }

    // Devuelve las subidas de una edición
    @GetMapping("/{id}/pruebas")
    public List<SubidaDTO> getPruebasPorEdicion(@PathVariable Long id) {
        return subidaRepository.findByEdicionId(id)
            .stream()
            .map(subida -> new SubidaDTO(
                subida.getNombre(),
                subida.getFechaFin().toString(),
                subida.getFechaInicio().toString()
            ))
            .toList();
    }

    // Guarda una edición
    @PostMapping
    public Edicion guardarEdicion(@RequestBody Edicion edicion) {
        return edicionService.guardarEdicion(edicion);
    }

    // Actualiza una edición
    @PutMapping("/{id}")
    public Edicion actualizarEdicion(@PathVariable Long id, @RequestBody Edicion edicion) {
        return edicionService.actualizarEdicion(id, edicion);
    }

    // Borra una edición
    @DeleteMapping("/{id}")
    public void borrarEdicion(@PathVariable Long id) {
        edicionService.borrarEdicion(id);
    }
}