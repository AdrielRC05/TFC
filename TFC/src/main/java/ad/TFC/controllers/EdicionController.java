package ad.TFC.controllers;

import ad.TFC.models.Edicion;
import ad.TFC.services.EdicionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/ediciones")
public class EdicionController {
    @Autowired
    private EdicionService edicionService;

    @GetMapping
    public List<Edicion> obtenerEdiciones() { return edicionService.obtenerEdiciones(); }

    @GetMapping("/{id}")
    public Edicion obtenerEdicionesPorId(@PathVariable Long id) { return edicionService.obtenerEdicionesPorId(id); }

    @PostMapping
    public Edicion guardarEdicion(@RequestBody Edicion edicion) { return edicionService.guardarEdicion(edicion); }

    @PutMapping("/{id}")
    public Edicion actualizarEdicion(@PathVariable Long id, @RequestBody Edicion edicion) {
        return edicionService.actualizarEdicion(id, edicion);
    }

    @DeleteMapping("/{id}")
    public void borrarEdicion(@PathVariable Long id) { edicionService.borrarEdicion(id); }
}
