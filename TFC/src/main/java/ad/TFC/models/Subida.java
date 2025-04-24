package ad.TFC.models;

import jakarta.persistence.*;
import java.util.*;

@Entity
public class Subida {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private Date fechaInicio;
    private Date fechaFin;

    @ManyToOne
    @JoinColumn(name = "edicion_id")
    private Edicion edicion;

    @ManyToOne
    @JoinColumn(name = "ganador_id")
    private Participante ganador;

    @OneToMany(mappedBy = "subida", cascade = CascadeType.ALL)
    private List<Ruta> rutas;

    Subida() {
        // Constructor por defecto
    }

    // Getters y setters

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public Date getFechaInicio() {
        return fechaInicio;
    }
    public void setFechaInicio(Date fechaInicio) {
        this.fechaInicio = fechaInicio;
    }
    public Date getFechaFin() {
        return fechaFin;
    }
    public void setFechaFin(Date fechaFin) {
        this.fechaFin = fechaFin;
    }
    public Edicion getEdicion() {
        return edicion;
    }
    public void setEdicion(Edicion edicion) {
        this.edicion = edicion;
    }
    public Participante getGanador() {
        return ganador;
    }
    public void setGanador(Participante ganador) {
        this.ganador = ganador;
    }
    public List<Ruta> getRutas() {
        return rutas;
    }
    public void setRutas(List<Ruta> rutas) {
        this.rutas = rutas;
    }
}
    