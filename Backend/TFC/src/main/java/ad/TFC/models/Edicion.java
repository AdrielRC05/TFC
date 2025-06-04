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

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ganador_barquetas", referencedColumnName = "id", nullable = true)
    private Participante ganador_barquetas;

    @ManyToOne(fetch = FetchType.EAGER)
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
    public Participante getGanador_barquetas() {
        return ganador_barquetas;
    }
    public void setGanador_barquetas(Participante ganador_barquetas) {
        this.ganador_barquetas = ganador_barquetas;
    }
    public Participante getGanador_turismos() {
        return ganador_turismos;
    }
    public void setGanador_turismos(Participante ganador_turismos) {
        this.ganador_turismos = ganador_turismos;
    }
}
