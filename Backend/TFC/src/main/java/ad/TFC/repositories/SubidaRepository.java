package ad.TFC.repositories;

import ad.TFC.models.Subida;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubidaRepository extends JpaRepository<Subida, Long> {
    List<Subida> findByEdicionId(Long edicionId);
}

