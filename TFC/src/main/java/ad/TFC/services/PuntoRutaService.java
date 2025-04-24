package ad.TFC.services;

import ad.TFC.models.PuntoRuta;
import ad.TFC.repositories.PuntoRutaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class PuntoRutaService {
    @Autowired
    private PuntoRutaRepository repository;

    public List<PuntoRuta> findAll() { return repository.findAll(); }

    public PuntoRuta findById(Long id) { return repository.findById(id).orElse(null); }

    public PuntoRuta save(PuntoRuta punto) { return repository.save(punto); }

    public void delete(Long id) { repository.deleteById(id); }
}
