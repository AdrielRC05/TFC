
---

# ✅ Archivo: `docs/source/backend/participantes.controller.md`

```markdown
# ParticipanteController

## Descripción

Controlador REST que maneja la información de los participantes del campeonato.

### Ruta base:
```java
@RestController
@RequestMapping("/api/participantes")
public class ParticipanteController {
    @Autowired
    private ParticipanteService participanteService;

    // Devuelve todos los participantes
    @GetMapping
    public List<Participante> obtenerParticipantes() {
        return participanteService.obtenerParticipantes();
    }

    // Devuelve un participante por ID
    @GetMapping("/{id}")
    public Participante obteneParticipantePorId(@PathVariable Long id) {
        return participanteService.obtenerParticipantesPorId(id);
    }

    // Guarda un nuevo participante
    @PostMapping
    public Participante guardParticipante(@RequestBody Participante participante) {
        return participanteService.guardarParticipante(participante);
    }

    // Actualiza un participante existente
    @PutMapping("/{id}")
    public Participante actualizarParticipante(@PathVariable Long id, @RequestBody Participante participante) {
        return participanteService.actualizarParticipante(id, participante);
    }

    // Elimina un participante por ID
    @DeleteMapping("/{id}")
    public void borrarParticipante(@PathVariable Long id) {
        participanteService.borrarParticipante(id);
    }
}