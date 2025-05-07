package ad.TFC.services;

import ad.TFC.models.Subida;
import ad.TFC.repositories.SubidaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class SubidaService {
    @Autowired
    private SubidaRepository subidaRepository;

    public List<Subida> obtenerSubidas() { return subidaRepository.findAll(); }

    public Subida obtenerSubidaPorId(Long id) { return subidaRepository.findById(id).orElse(null); }

    public Subida guardarSubida(Subida subida) { return subidaRepository.save(subida); }

    public void borrarSubida(Long id) { subidaRepository.deleteById(id); }
    
    public Subida actualizarSubida(Long id, Subida subida) {
        Subida subidaExistente = subidaRepository.findById(id).orElse(null);
        if (subidaExistente != null) {
            subidaExistente.setNombre(subida.getNombre());
            subidaExistente.setEdicion(subida.getEdicion());
            subidaExistente.setFechaInicio(subida.getFechaInicio());
            subidaExistente.setFechaFin(subida.getFechaFin());
            subidaExistente.setGanador(subida.getGanador());
            subidaExistente.setRutas(subida.getRutas());
        }
        return subida;
    }
}