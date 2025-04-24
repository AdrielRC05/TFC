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
    private SubidaService service;

    @GetMapping
    public List<Subida> findAll() { return service.findAll(); }

    @GetMapping("/{id}")
    public Subida findById(@PathVariable Long id) { return service.findById(id); }

    @PostMapping
    public Subida save(@RequestBody Subida subida) { return service.save(subida); }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { service.delete(id); }
}