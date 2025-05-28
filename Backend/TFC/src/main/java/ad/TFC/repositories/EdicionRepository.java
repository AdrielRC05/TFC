package ad.TFC.repositories;

import ad.TFC.models.Edicion;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EdicionRepository extends JpaRepository<Edicion, Long> {
    List<Edicion> findTop3ByOrderByIdDesc();
}