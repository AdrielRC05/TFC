package ad.TFC.controllers;

import ad.TFC.models.PuntoRuta;
import ad.TFC.models.DTOs.PuntoRutaDTO;
import ad.TFC.services.PuntoRutaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/ruta/{rutaId}")
        public ResponseEntity<List<PuntoRuta>> getPuntosPorRuta(@PathVariable Long rutaId) {
        List<PuntoRuta> puntos = service.obtenerPuntosDeRutaPorRutaId(rutaId);
        
        if (puntos.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(puntos);
    }

    @PostMapping("/guardar/{rutaId}")
    public ResponseEntity<Void> guardarPuntos(@PathVariable Long rutaId,
                                              @RequestBody List<PuntoRutaDTO> puntosDTO) {
        service.guardarPuntos(rutaId, puntosDTO);
        return ResponseEntity.ok().build();
    }

    @PostMapping
    public PuntoRuta save(@RequestBody PuntoRuta punto) { return service.guardarPuntoDeRuta(punto); }

    @PutMapping("/{id}")
    public PuntoRuta actualizarPuntoDeRuta(@PathVariable Long id, @RequestBody PuntoRuta punto) {
        return service.actualizarPuntoDeRuta(id, punto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { service.borrarPuntoDeRuta(id); }
}