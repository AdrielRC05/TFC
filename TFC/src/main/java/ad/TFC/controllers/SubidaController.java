package ad.TFC.controllers;

import ad.TFC.models.Subida;
import ad.TFC.services.SubidaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/subidas")
public class SubidaController {
    @Autowired
    private SubidaService subidaService;

    @GetMapping
    public List<Subida> obtenerSubidas() { return subidaService.obtenerSubidas(); }

    @GetMapping("/{id}")
    public Subida obtenerSubidasPorId(@PathVariable Long id) { return subidaService.obtenerSubidaPorId(id); }

    @PostMapping
    public Subida guardarSubida(@RequestBody Subida subida) { return subidaService.guardarSubida(subida); }

    @PutMapping("/{id}")
    public Subida actualizarSubida(@PathVariable Long id, @RequestBody Subida subida) {
        return subidaService.actualizarSubida(id, subida);
    }

    @DeleteMapping("/{id}")
    public void borrarSubida(@PathVariable Long id) { subidaService.borrarSubida(id); }
}