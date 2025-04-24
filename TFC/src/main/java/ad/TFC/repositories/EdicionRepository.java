package ad.TFC.repositories;

import ad.TFC.models.Edicion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EdicionRepository extends JpaRepository<Edicion, Long> {}