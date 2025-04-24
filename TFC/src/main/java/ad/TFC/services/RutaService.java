package ad.TFC.services;

import ad.TFC.models.Ruta;
import ad.TFC.repositories.RutaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class RutaService {
    @Autowired
    private RutaRepository repository;

    public List<Ruta> findAll() { return repository.findAll(); }
    public Ruta findById(Long id) { return repository.findById(id).orElse(null); }
    public Ruta save(Ruta ruta) { return repository.save(ruta); }
    public void delete(Long id) { repository.deleteById(id); }
}