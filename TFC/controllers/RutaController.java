package ad.TFC.controllers;

import ad.TFC.models.PuntoRuta;
import ad.TFC.models.Ruta;
import ad.TFC.services.RutaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/rutas")
public class RutaController {

    @Autowired
    private RutaService rutaService;

    @GetMapping
    public List<Ruta> obtenerRutas() { return rutaService.obtenerRutas(); }

    @GetMapping("/{id}")
    public Ruta obtenerRutasPorId(@PathVariable Long id) { return rutaService.obtenerRutasPorId(id); }

    @PostMapping
    public Ruta guardarRuta(@RequestBody Ruta ruta) { return rutaService.guardarRuta(ruta); }

    @DeleteMapping("/{id}")
    public void borrarRuta(@PathVariable Long id) { rutaService.borrarRuta(id); }

    @GetMapping("/{id}/ruta")
    public ResponseEntity<List<PuntoRuta>> getPuntosDeRutaPorSubida(@PathVariable Long id) {
        List<PuntoRuta> puntos = rutaService.getPuntosPorSubida(id);
        return ResponseEntity.ok(puntos);
    }
}