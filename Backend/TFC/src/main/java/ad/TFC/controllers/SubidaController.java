package ad.TFC.controllers;

import ad.TFC.models.Subida;
import ad.TFC.services.SubidaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/subidas")
public class SubidaController {
    @Autowired
    private SubidaService subidaService;

    @GetMapping
    public List<Subida> obtenerSubidas() {
        List<Subida> subidas = subidaService.obtenerSubidas();
        subidas.forEach(subida -> {
            if (subida.getRutas() != null) {
                subida.getRutas().forEach(ruta -> {
                    if (ruta.getPuntos() != null) {
                        ruta.getPuntos().size(); // Fuerza la carga de los puntos
                    }
                });
            }
        });
        return subidas;
    }


    @GetMapping("/{id}")
    public Subida obtenerSubidaPorId(Long id) {
        Subida subida = subidaService.obtenerSubidaPorId(id);
        if (subida != null && subida.getRutas() != null) {
            subida.getRutas().forEach(r -> {
                if (r.getPuntos() != null) {
                    r.getPuntos().size();
                }
            });
        }
        return subida;
    }

    @GetMapping("/edicion/{id}/subidas")
    public List<Subida> obtenerSubidasPorEdicion(@PathVariable Long id) {
        List<Subida> subidas = subidaService.obtenerSubidasPorEdicion(id);
        subidas.forEach(subida -> {
            if (subida.getRutas() != null) {
                subida.getRutas().forEach(r -> {
                    if (r.getPuntos() != null) {
                        r.getPuntos().size();
                    }
                });
            }
        });
        return subidas;
    }

    @GetMapping("/nombre/{nombre}")
    public List<Subida> obtenerSubidasPorNombre(@RequestParam String nombre) {
        List<Subida> subidas = subidaService.obtenerSubidasPorNombre(nombre);
        subidas.forEach(subida -> {
            if (subida.getRutas() != null) {
                subida.getRutas().forEach(r -> {
                    if (r.getPuntos() != null) {
                        r.getPuntos().size();
                    }
                });
            }
        });
        return subidas;
    }

    @PostMapping
    public Subida guardarSubida(@RequestBody Subida subida) { return subidaService.guardarSubida(subida); }

    @PutMapping("/{id}")
    public Subida actualizarSubida(@PathVariable Long id, @RequestBody Subida subida) {
        return subidaService.actualizarSubida(id, subida);
    }

    @DeleteMapping("/{id}")
    public void borrarSubida(@PathVariable Long id) { subidaService.borrarSubida(id); }
}