package ad.TFC.controllers;

import ad.TFC.models.Participante;
import ad.TFC.services.ParticipanteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/participantes")
public class ParticipanteController {
    @Autowired
    private ParticipanteService service;

    @GetMapping
    public List<Participante> findAll() { return service.findAll(); }

    @GetMapping("/{id}")
    public Participante findById(@PathVariable Long id) { return service.findById(id); }

    @PostMapping
    public Participante save(@RequestBody Participante participante) { return service.save(participante); }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { service.delete(id); }
}
