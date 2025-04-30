package ad.TFC.services;

import ad.TFC.models.Edicion;
import ad.TFC.repositories.EdicionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class EdicionService {
    @Autowired
    private EdicionRepository edicionRepository;

    public List<Edicion> obtenerEdiciones() { return edicionRepository.findAll(); }

    public Edicion obtenerEdicionesPorId(Long id) { return edicionRepository.findById(id).orElse(null); }

    public Edicion guardarEdicion(Edicion edicion) { return edicionRepository.save(edicion); }

    public void borrarEdicion(Long id) { edicionRepository.deleteById(id); }
    
    public Edicion actualizarEdicion(Long id, Edicion edicion) {
        if (edicionRepository.existsById(id)) {
            edicion.setId(id);
            return edicionRepository.save(edicion);
        } else {
            return null;
        }
    }
}