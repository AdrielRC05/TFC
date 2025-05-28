package ad.TFC.models;

import jakarta.persistence.*;
import java.util.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
public class Edicion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonProperty("ano")
    @Column(unique = true, nullable = false, name = "año")
    private int ano;

    @ManyToOne
    @JoinColumn(name = "ganador_barquetas", referencedColumnName = "id", nullable = true)
    private Participante ganador_barquetas;

    @ManyToOne
    @JoinColumn(name = "ganador_turismos", referencedColumnName = "id", nullable = true)
    private Participante ganador_turismos;

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
        return ano;
    }
    public void setAño(int año) {
        this.ano = año;
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
