package ad.TFC.controllers;

import ad.TFC.models.Edicion; // Adjust the package path to the correct location of the Edicion class
import ad.TFC.services.EdicionService; // Adjust the package path to the correct location of EdicionService
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/ediciones")
public class EdicionController {
    @Autowired
    private EdicionService service;

    @GetMapping
    public List<Edicion> findAll() { return service.findAll(); }

    @GetMapping("/{id}")
    public Edicion findById(@PathVariable Long id) { return service.findById(id); }

    @PostMapping
    public Edicion save(@RequestBody Edicion edicion) { return service.save(edicion); }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { service.delete(id); }
}
