package ad.TFC.services;

import ad.TFC.models.Participante;
import ad.TFC.repositories.ParticipanteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class ParticipanteService {
    @Autowired
    private ParticipanteRepository participanteRepository;

    public List<Participante> obtenerParticipantes() { return participanteRepository.findAll(); }

    public Participante obtenerParticipantesPorId(Long id) { return participanteRepository.findById(id).orElse(null); }

    public Participante guardarParticipante(Participante participante) { return participanteRepository.save(participante); }

    public void borrarParticipante(Long id) { participanteRepository.deleteById(id); }
    
    public Participante actualizarParticipante(Long id, Participante participante) {
        if (participanteRepository.existsById(id)) {
            participante.setId(id);
            return participanteRepository.save(participante);
        } else {
            return null;
        }
    }
}
