# SubidaController

## Descripción

Controlador REST que maneja las subidas del Campeonato Gallego de Montaña.

### Ruta base:
```java
@RestController
@RequestMapping("/api/subidas")
public class SubidaController {
    @Autowired
    private SubidaService subidaService;

    // Devuelve todas las subidas con rutas y puntos cargados
    @GetMapping
    public List<Subida> obtenerSubidas() {
        List<Subida> subidas = subidaService.obtenerSubidas();
        subidas.forEach(subida -> {
            if (subida.getRutas() != null) {
                subida.getRutas().forEach(r -> {
                    if (r.getPuntos() != null) {
                        r.getPuntos().size(); // Fuerza carga perezosa
                    }
                });
            }
        });
        return subidas;
    }

    // Devuelve una única subida por ID
    @GetMapping("/{id}")
    public Subida obtenerSubidaPorId(@PathVariable Long id) {
        Subida subida = subidaService.obtenerSubidaPorId(id);
        if (subida != null && subida.getRutas() != null) {
            subida.getRutas().forEach(r -> {
                if (r.getPuntos() != null) {
                    r.getPuntos().size();
                }
            });
        }
        return subida;
    }

    // Obtiene subidas asociadas a una edición
    @GetMapping("/edicion/{id}/subidas")
    public List<Subida> obtenerSubidasPorEdicion(@PathVariable Long id) {
        List<Subida> subidas = subidaService.obtenerSubidasPorEdicion(id);
        subidas.forEach(subida -> {
            if (subida.getRutas() != null) {
                subida.getRutas().forEach(r -> {
                    if (r.getPuntos() != null) {
                        r.getPuntos().size();
                    }
                });
            }
        });
        return subidas;
    }

    // Busca subidas por nombre
    @GetMapping("/nombre/{nombre}")
    public List<Subida> obtenerSubidasPorNombre(@RequestParam String nombre) {
        List<Subida> subidas = subidaService.obtenerSubidasPorNombre(nombre);
        subidas.forEach(subida -> {
            if (subida.getRutas() != null) {
                subida.getRutas().forEach(r -> {
                    if (r.getPuntos() != null) {
                        r.getPuntos().size();
                    }
                });
            }
        });
        return subidas;
    }

    // Guarda una nueva subida
    @PostMapping
    public Subida guardarSubida(@RequestBody Subida subida) {
        return subidaService.guardarSubida(subida);
    }

    // Actualiza una subida existente
    @PutMapping("/{id}")
    public Subida actualizarSubida(@PathVariable Long id, @RequestBody Subida subida) {
        return subidaService.actualizarSubida(id, subida);
    }

    // Borra una subida por ID
    @DeleteMapping("/{id}")
    public void borrarSubida(@PathVariable Long id) {
        subidaService.borrarSubida(id);
    }
}