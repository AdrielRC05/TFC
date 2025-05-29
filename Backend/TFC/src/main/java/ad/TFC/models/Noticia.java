package ad.TFC.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.*;

@Entity
@Table(name = "noticia")
public class Noticia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "enlace", nullable = false, length = 512)
    private String enlace;

    @Column(name = "año")
    @JsonProperty("ano")
    private Integer año;

    public Noticia() {
    }

    public Noticia(String enlace, Integer año) {
        this.enlace = enlace;
        this.año = año;
    }

    // Getters y Setters

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEnlace() {
        return enlace;
    }

    public void setEnlace(String enlace) {
        this.enlace = enlace;
    }

    public Integer getAño() {
        return año;
    }

    public void setAño(Integer año) {
        this.año = año;
    }
}