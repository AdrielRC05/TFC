package ad.TFC.services;

import ad.TFC.models.PuntoRuta;
import ad.TFC.models.Ruta;
import ad.TFC.repositories.PuntoRutaRepository;
import ad.TFC.repositories.RutaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class RutaService {
    @Autowired
    private RutaRepository repository;

    @Autowired
    private PuntoRutaRepository puntoRepo;

    @Autowired
    private RutaRepository rutaRepo;

    public List<Ruta> findAll() { return repository.findAll(); }

    public Ruta findById(Long id) { return repository.findById(id).orElse(null); }

    public Ruta save(Ruta ruta) { return repository.save(ruta); }

    public void delete(Long id) { repository.deleteById(id); }
    
    public List<PuntoRuta> getPuntosPorSubida(Long subidaId) {
        List<Ruta> rutas = rutaRepo.findBySubidaId(subidaId);
        List<PuntoRuta> puntos = new ArrayList<>();
        for (Ruta ruta : rutas) {
            puntos.addAll(puntoRepo.findByRutaIdOrderByIdAsc(ruta.getId()));
        }
        return puntos;
    }
}