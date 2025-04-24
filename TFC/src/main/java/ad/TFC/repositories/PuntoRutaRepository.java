package ad.TFC.repositories;

import ad.TFC.models.PuntoRuta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PuntoRutaRepository extends JpaRepository<PuntoRuta, Long> {}