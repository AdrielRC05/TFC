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
    public List<PuntoRuta> findAll() { return service.obtenerPuntosDeRuta(); }

    @GetMapping("/{id}")
    public PuntoRuta findById(@PathVariable Long id) { return service.obtenerPuntoDeRutaPorId(id); }

    @PostMapping
    public PuntoRuta save(@RequestBody PuntoRuta punto) { return service.guardarPuntoDeRuta(punto); }

    @PutMapping("/{id}")
    public PuntoRuta actualizarPuntoDeRuta(@PathVariable Long id, @RequestBody PuntoRuta punto) {
        return service.actualizarPuntoDeRuta(id, punto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { service.borrarPuntoDeRuta(id); }
}