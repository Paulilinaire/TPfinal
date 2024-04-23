package org.example.back.service;

import org.example.back.entity.Pointing;
import org.example.back.entity.User;
import org.example.back.repository.PointingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class PointingService {

    @Autowired
    private PointingRepository repository;

    public boolean clockIn(User user){
        Pointing lastPointing=repository.searchLastPointing(user);
        if(lastPointing==null || lastPointing.getEndDate()!=null){
            Pointing pointing=Pointing.builder().
                    startDate(LocalDateTime.now()).
                    user(user).build();
            repository.save(pointing);
            return true;
        }
        return false;
    }

    public boolean clockOut(User user){
        Pointing lastPointing;
        lastPointing=repository.searchLastPointing(user);
        if(lastPointing!=null &&lastPointing.getEndDate()==null){
            lastPointing.setEndDate(LocalDateTime.now());
            repository.update(lastPointing);
            return true;
        }
        return false;
    }
}
