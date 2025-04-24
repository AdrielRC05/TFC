package ad.TFC.models;

import jakarta.persistence.*;
import java.util.*;

@Entity
public class Edicion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private int año;

    private Date fechaInicio;
    private Date fechaFin;
    private String lugar;

    @OneToMany(mappedBy = "edicion", cascade = CascadeType.ALL)
    private List<Subida> subidas;

    Edicion() {
        // Constructor por defecto
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public int getAño() {
        return año;
    }
    public void setAño(int año) {
        this.año = año;
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
    public String getLugar() {
        return lugar;
    }
    public void setLugar(String lugar) {
        this.lugar = lugar;
    }
    public List<Subida> getSubidas() {
        return subidas;
    }
    public void setSubidas(List<Subida> subidas) {
        this.subidas = subidas;
    }
}
