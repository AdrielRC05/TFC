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
    private RutaRepository rutaRepository;

    @Autowired
    private PuntoRutaRepository puntoRutaRepository;

    public List<Ruta> obtenerRutas() { return rutaRepository.findAll(); }

    public Ruta obtenerRutasPorId(Long id) { return rutaRepository.findById(id).orElse(null); }

    public Ruta guardarRuta(Ruta ruta) { return rutaRepository.save(ruta); }

    public void borrarRuta(Long id) { rutaRepository.deleteById(id); }

    public Ruta actualizarRuta(Long id, Ruta ruta) {
        Ruta rutaExistente = rutaRepository.findById(id).orElse(null);
        if (rutaExistente != null) {
            rutaExistente.setNombre(ruta.getNombre());
            rutaExistente.setDescripcion(ruta.getDescripcion());
            rutaExistente.setDistancia(ruta.getDistancia());
            rutaExistente.setPuntos(ruta.getPuntos());
            rutaExistente.setSubida(ruta.getSubida());
        }
        return ruta;
    }
    
    public List<PuntoRuta> getPuntosPorSubida(Long subidaId) {
        List<Ruta> rutas = rutaRepository.findBySubidaId(subidaId);
        List<PuntoRuta> puntos = new ArrayList<>();
        for (Ruta ruta : rutas) {
            puntos.addAll(puntoRutaRepository.findByRutaIdOrderByIdAsc(ruta.getId()));
        }
        return puntos;
    }
}