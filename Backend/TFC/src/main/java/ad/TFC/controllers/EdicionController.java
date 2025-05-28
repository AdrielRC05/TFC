package ad.TFC.controllers;

import ad.TFC.models.Edicion;
import ad.TFC.models.DTOs.SubidaDTO;
import ad.TFC.services.EdicionService;
import ad.TFC.repositories.SubidaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/ediciones")
public class EdicionController {
    @Autowired
    private EdicionService edicionService;

    @Autowired
    private SubidaRepository subidaRepository;

    @GetMapping
    public List<Edicion> obtenerEdiciones() { return edicionService.obtenerEdiciones(); }

    @GetMapping("/{id}")
    public Edicion obtenerEdicionesPorId(@PathVariable Long id) { return edicionService.obtenerEdicionesPorId(id); }

    @GetMapping("/top3")
    public List<Edicion> getTop3Ediciones() {
        return edicionService.getTop3Recientes();
    }

    @GetMapping("/{id}/pruebas")
    public List<SubidaDTO> getPruebasPorEdicion(@PathVariable Long id) {
        return subidaRepository.findByEdicionId(id)
            .stream()
            .map(subida -> new SubidaDTO(
                subida.getNombre(),
                subida.getFechaFin().toString(),
                subida.getFechaInicio().toString()
            ))
            .toList();
    }

    @PostMapping
    public Edicion guardarEdicion(@RequestBody Edicion edicion) { return edicionService.guardarEdicion(edicion); }

    @PutMapping("/{id}")
    public Edicion actualizarEdicion(@PathVariable Long id, @RequestBody Edicion edicion) {
        return edicionService.actualizarEdicion(id, edicion);
    }

    @DeleteMapping("/{id}")
    public void borrarEdicion(@PathVariable Long id) { edicionService.borrarEdicion(id); }
}
