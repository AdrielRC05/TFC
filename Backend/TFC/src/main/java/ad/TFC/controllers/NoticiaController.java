package ad.TFC.controllers;

import ad.TFC.models.Noticia;
import ad.TFC.services.NoticiaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/noticias")
public class NoticiaController {

    private final NoticiaService noticiaService;

    public NoticiaController(NoticiaService noticiaService) {
        this.noticiaService = noticiaService;
    }

    @GetMapping
    public List<Noticia> getAllNoticias() {
        return noticiaService.getAllNoticias();
    }

    @GetMapping("/año/{año}")
    public List<Noticia> getNoticiasPorAño(@PathVariable("año") Integer año) {
        return noticiaService.getNoticiasPorAño(año);
    }

    @GetMapping("/search")
    public List<Noticia> searchNoticias(@RequestParam String q) {
        return noticiaService.searchNoticiasByKeyword(q);
    }

    @PostMapping
    public Noticia addNoticia(@RequestBody Noticia noticia) {
        return noticiaService.saveNoticia(noticia);
    }

    @PostMapping("/id")
    public List<Noticia> addAllNoticias(@RequestBody List<Noticia> noticias) {
        return noticiaService.saveAll(noticias);
    }
}