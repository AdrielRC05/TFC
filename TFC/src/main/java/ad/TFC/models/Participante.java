package ad.TFC.models;

import jakarta.persistence.*;

@Entity
public class Participante {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private int edad;
    private int titulos;
    private String coche;

    Participante() {
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
    public int getEdad() {
        return edad;
    }
    public void setEdad(int edad) {
        this.edad = edad;
    }
    public int getTitulos() {
        return titulos;
    }
    public void setTitulos(int titulos) {
        this.titulos = titulos;
    }
    public String getCoche() {
        return coche;
    }
    public void setCoche(String coche) {
        this.coche = coche;
    }
}