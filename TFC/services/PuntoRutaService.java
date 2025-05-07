package ad.TFC.services;

import ad.TFC.models.PuntoRuta;
import ad.TFC.repositories.PuntoRutaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class PuntoRutaService {
    @Autowired
    private PuntoRutaRepository puntoRutaRepository;

    public List<PuntoRuta> obtenerPuntosDeRuta() { return puntoRutaRepository.findAll(); }

    public PuntoRuta obtenerPuntoDeRutaPorId(Long id) { return puntoRutaRepository.findById(id).orElse(null); }

    public PuntoRuta guardarPuntoDeRuta(PuntoRuta punto) { return puntoRutaRepository.save(punto); }

    public void borrarPuntoDeRuta(Long id) { puntoRutaRepository.deleteById(id); }

    public PuntoRuta actualizarPuntoDeRuta(Long id, PuntoRuta puntoRuta) {
        PuntoRuta puntoRutaExistente = puntoRutaRepository.findById(id).orElse(null);
        if (puntoRutaExistente!=null) {
            puntoRutaExistente.setDescripcion(puntoRuta.getDescripcion());
            puntoRutaExistente.setLatitud(puntoRuta.getLatitud());
            puntoRutaExistente.setLongitud(puntoRuta.getLongitud());
            puntoRutaExistente.setRuta(puntoRuta.getRuta());
        }
        return puntoRuta;
        
    }
    
}
