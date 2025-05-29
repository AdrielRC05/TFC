package ad.TFC.services;

import ad.TFC.models.Noticia;
import ad.TFC.repositories.NoticiaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoticiaService {

    private final NoticiaRepository noticiaRepository;

    @Autowired
    public NoticiaService(NoticiaRepository noticiaRepository) {
        this.noticiaRepository = noticiaRepository;
    }

    // Obtener todas las noticias
    public List<Noticia> getAllNoticias() {
        return noticiaRepository.findAll();
    }

    // Filtrar por año
    public List<Noticia> getNoticiasPorAño(Integer año) {
        return noticiaRepository.findByAño(año);
    }

    // Buscar por palabra clave en el enlace
    public List<Noticia> searchNoticiasByKeyword(String keyword) {
        return noticiaRepository.findByEnlaceContainingIgnoreCase(keyword);
    }

    // Guardar una noticia nueva
    public Noticia saveNoticia(Noticia noticia) {
        return noticiaRepository.save(noticia);
    }

    // Guardar varias noticias nuevas
    public List<Noticia> saveAll(List<Noticia> noticias) {
        return noticiaRepository.saveAll(noticias);
    }
}