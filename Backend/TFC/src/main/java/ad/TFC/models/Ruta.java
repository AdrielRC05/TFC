package ad.TFC.models;

import jakarta.persistence.*;
import java.util.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Ruta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String descripcion;
    private double distancia;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "subida_id")
    private Subida subida;

    @OneToMany(mappedBy = "ruta", cascade = CascadeType.ALL)
    private List<PuntoRuta> puntos;

    Ruta() {
    }

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
    public String getDescripcion() {
        return descripcion;
    }
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
    public double getDistancia() {
        return distancia;
    }
    public void setDistancia(double distancia) {
        this.distancia = distancia;
    }
    public Subida getSubida() {
        return subida;
    }
    public void setSubida(Subida subida) {
        this.subida = subida;
    }
    public List<PuntoRuta> getPuntos() {
        return puntos;
    }
    public void setPuntos(List<PuntoRuta> puntos) {
        this.puntos = puntos;
    }

    /*Revisar
    public void addPunto(PuntoRuta punto) {
        if (puntos == null) {
            puntos = new ArrayList<>();
        }
        puntos.add(punto);
        punto.setRuta(this);
    }
    public void removePunto(PuntoRuta punto) {
        if (puntos != null) {
            puntos.remove(punto);
            punto.setRuta(null);
        }
    }*/
}