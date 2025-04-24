package ad.TFC.controllers;

import ad.TFC.models.Ruta;
import ad.TFC.services.RutaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/rutas")
public class RutaController {
    @Autowired
    private RutaService service;

    @GetMapping
    public List<Ruta> findAll() { return service.findAll(); }

    @GetMapping("/{id}")
    public Ruta findById(@PathVariable Long id) { return service.findById(id); }

    @PostMapping
    public Ruta save(@RequestBody Ruta ruta) { return service.save(ruta); }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { service.delete(id); }
}