package ad.TFC.repositories;

import ad.TFC.models.Participante;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParticipanteRepository extends JpaRepository<Participante, Long> {
    List<Participante> findAllByOrderByTitulosDesc();
}