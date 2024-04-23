package org.example.back.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import org.example.back.entity.Pointing;
import org.example.back.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public class PointingRepository {

    @Autowired
    private EntityManager manager;

    @Transactional
    public void save(Pointing pointing){
        manager.persist(pointing);
    }

    @Transactional
    public void update(Pointing pointing){
        manager.merge(pointing);
    }

    public Pointing searchLastPointing( User user){
        Query query = manager.createQuery("SELECT p FROM Pointing p WHERE p.user = :user ORDER BY p.startDate DESC");
        query.setParameter("user",user);
        List<Pointing> results = query.getResultList();
        return results.isEmpty() ? null : results.get(0);
    }
}
