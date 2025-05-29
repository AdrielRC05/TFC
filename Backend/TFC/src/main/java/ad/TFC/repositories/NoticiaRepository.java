package ad.TFC.repositories;

import ad.TFC.models.Noticia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoticiaRepository extends JpaRepository<Noticia, Integer> {

    List<Noticia> findByAño(Integer año);

    List<Noticia> findByEnlaceContainingIgnoreCase(String texto);
}