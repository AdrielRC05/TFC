package ad.TFC.services;

import ad.TFC.models.Edicion;
import ad.TFC.repositories.EdicionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class EdicionService {
    @Autowired
    private EdicionRepository repository;

    public List<Edicion> findAll() { return repository.findAll(); }
    public Edicion findById(Long id) { return repository.findById(id).orElse(null); }
    public Edicion save(Edicion edicion) { return repository.save(edicion); }
    public void delete(Long id) { repository.deleteById(id); }
}