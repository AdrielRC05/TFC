package ad.TFC.repositories;

import ad.TFC.models.PuntoRuta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PuntoRutaRepository extends JpaRepository<PuntoRuta, Long> {
    List<PuntoRuta> findByRutaIdOrderByIdAsc(Long rutaId);
    void deleteByRutaId(Long rutaId);
    List<PuntoRuta> findByRutaId(Long rutaId);
}