package ad.TFC.models;

import jakarta.persistence.*;
import java.util.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Edicion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private int año;

    private String lugar;

    @JsonIgnore
    @OneToMany(mappedBy = "edicion", cascade = CascadeType.ALL)
    private List<Subida> subidas;

    Edicion() {
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
