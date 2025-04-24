package ad.TFC.controllers;

import ad.TFC.models.PuntoRuta;
import ad.TFC.services.PuntoRutaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/puntos")
public class PuntoRutaController {
    @Autowired
    private PuntoRutaService service;

    @GetMapping
    public List<PuntoRuta> findAll() { return service.findAll(); }

    @GetMapping("/{id}")
    public PuntoRuta findById(@PathVariable Long id) { return service.findById(id); }

    @PostMapping
    public PuntoRuta save(@RequestBody PuntoRuta punto) { return service.save(punto); }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { service.delete(id); }
}