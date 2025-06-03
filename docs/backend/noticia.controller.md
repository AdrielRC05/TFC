
---

# ✅ Archivo: `docs/source/backend/noticias.controller.md`

```markdown
# NoticiaController

## Descripción

Controlador REST que muestra noticias del campeonato organizadas por año.

### Ruta base:
```java
@RestController
@RequestMapping("/api/noticias")
public class NoticiaController {

    private final NoticiaService noticiaService;

    public NoticiaController(NoticiaService noticiaService) {
        this.noticiaService = noticiaService;
    }

    // Devuelve todas las noticias
    @GetMapping
    public List<Noticia> getAllNoticias() {
        return noticiaService.getAllNoticias();
    }

    // Busca noticias por año
    @GetMapping("/año/{año}")
    public List<Noticia> getNoticiasPorAño(@PathVariable("año") Integer año) {
        return noticiaService.getNoticiasPorAño(año);
    }

    // Busca noticias por palabra clave
    @GetMapping("/search")
    public List<Noticia> getNoticiasByKeyword(@RequestParam String q) {
        return noticiaService.searchNoticiasByKeyword(q);
    }

    // Guarda una noticia
    @PostMapping
    public Noticia addNoticia(@RequestBody Noticia noticia) {
        return noticiaService.saveNoticia(noticia);
    }

    // Guarda múltiples noticias
    @PostMapping("/id")
    public List<Noticia> addAllNoticias(@RequestBody List<Noticia> noticias) {
        return noticiaService.saveAll(noticias);
    }
}