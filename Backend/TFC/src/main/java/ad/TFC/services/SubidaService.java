package ad.TFC.services;

import ad.TFC.models.Subida;
import ad.TFC.repositories.SubidaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class SubidaService {
    @Autowired
    private SubidaRepository subidaRepository;

    public List<Subida> obtenerSubidas() { return subidaRepository.findAll(); }

    public Subida obtenerSubidaPorId(Long id) { return subidaRepository.findById(id).orElse(null); }

    public List<Subida> obtenerSubidasPorEdicion(Long id) {
        List<Subida> subidas = new ArrayList<>();
        subidaRepository.findAll().forEach(subida -> {
            if (subida.getEdicion() != null && subida.getEdicion().getId().equals(id)) {
                subidas.add(subida);
            }
        });
        return subidas;
    }

    public List<Subida> obtenerSubidasPorNombre(String nombre) {
        List<Subida> subidas = new ArrayList<>();
        subidaRepository.findAll().forEach(subida -> {
            if (subida.getNombre() != null && subida.getNombre().toLowerCase().contains(nombre.toLowerCase())) {
                subidas.add(subida);
            }
        });
        return subidas;
    }

    public Subida guardarSubida(Subida subida) { return subidaRepository.save(subida); }

    public void borrarSubida(Long id) { subidaRepository.deleteById(id); }
    
    public Subida actualizarSubida(Long id, Subida subida) {
        Subida subidaExistente = subidaRepository.findById(id).orElse(null);
        if (subidaExistente != null) {
            subidaExistente.setNombre(subida.getNombre());
            subidaExistente.setEdicion(subida.getEdicion());
            subidaExistente.setFechaInicio(subida.getFechaInicio());
            subidaExistente.setFechaFin(subida.getFechaFin());
            subidaExistente.setRutas(subida.getRutas());
        }
        return subida;
    }

    public List<Map<String, Object>> getTop3Subidas() {
        return subidaRepository.findAll().stream()
            .map(subida -> cleanName(subida.getNombre()))
            .collect(Collectors.groupingBy(name -> name, Collectors.counting())) // Agrupa por nombre y cuenta
            .entrySet().stream()
            .sorted(Map.Entry.<String, Long>comparingByValue(Comparator.reverseOrder()))
            .limit(3)
            .map(entry -> {
                Map<String, Object> map = new HashMap<>();
                map.put("nombre", entry.getKey());
                map.put("repeticiones", entry.getValue());
                return map;
            })
            .toList();
    }

    private String cleanName(String nombre) {
        if (nombre == null) return "Sin Nombre";
        return nombre
            .replaceAll("º|ª|\\d+ª|\\d+º", "") // Quita ordinales
            .split(",")[0]                      // Solo el nombre principal
            .split("\\(")[0]                    // Ignora contenido entre paréntesis
            .trim();                            // Limpia espacios extra
    }

}