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
    private ParticipanteService participanteService;

    @GetMapping
    public List<Participante> obtenerParticipantes() { return participanteService.obtenerParticipantes(); }

    @GetMapping("/{id}")
    public Participante obteneParticipantePorId(@PathVariable Long id) { return participanteService.obtenerParticipantesPorId(id); }

    @PostMapping
    public Participante guardParticipante(@RequestBody Participante participante) { return participanteService.guardarParticipante(participante); }

    @PutMapping("/{id}")
    public Participante actualizarParticipante(@PathVariable Long id, @RequestBody Participante participante) {
        return participanteService.actualizarParticipante(id, participante);
    }

    @DeleteMapping("/{id}")
    public void borrarParticipante(@PathVariable Long id) { participanteService.borrarParticipante(id); }
}
