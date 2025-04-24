package ad.TFC.services;

import ad.TFC.models.Subida;
import ad.TFC.repositories.SubidaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class SubidaService {
    @Autowired
    private SubidaRepository repository;

    public List<Subida> findAll() { return repository.findAll(); }
    public Subida findById(Long id) { return repository.findById(id).orElse(null); }
    public Subida save(Subida subida) { return repository.save(subida); }
    public void delete(Long id) { repository.deleteById(id); }
}