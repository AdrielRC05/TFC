package ad.TFC.services;

import ad.TFC.models.PuntoRuta;
import ad.TFC.models.Ruta;
import ad.TFC.models.DTOs.PuntoRutaDTO;
import ad.TFC.repositories.PuntoRutaRepository;
import jakarta.transaction.Transactional;

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

    public List<PuntoRuta> obtenerPuntosDeRutaPorRutaId(Long rutaId) {
        return puntoRutaRepository.findByRutaId(rutaId);
    }

    @Transactional
    public void guardarPuntos(Long rutaId, List<PuntoRutaDTO> puntosDTO) {
        // Elimina puntos anteriores si quieres actualizar
        puntoRutaRepository.deleteByRutaId(rutaId);

        List<PuntoRuta> puntos = puntosDTO.stream()
            .map(dto -> {
                PuntoRuta pr = new PuntoRuta();
                pr.setLatitud(dto.getLatitud());
                pr.setLongitud(dto.getLongitud());
                pr.setDescripcion(dto.getDescripcion());
                
                Ruta ruta = new Ruta();
                ruta.setId(rutaId);
                pr.setRuta(ruta);
                
                return pr;
            })
            .toList();

        puntoRutaRepository.saveAll(puntos);
    }
    
}
