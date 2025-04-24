package ad.TFC.services;

import ad.TFC.models.Participante;
import ad.TFC.repositories.ParticipanteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class ParticipanteService {
    @Autowired
    private ParticipanteRepository repository;

    public List<Participante> findAll() { return repository.findAll(); }
    public Participante findById(Long id) { return repository.findById(id).orElse(null); }
    public Participante save(Participante participante) { return repository.save(participante); }
    public void delete(Long id) { repository.deleteById(id); }
}
