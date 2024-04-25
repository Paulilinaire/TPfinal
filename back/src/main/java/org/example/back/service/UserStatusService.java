package org.example.back.service;

import org.example.back.entity.Pointing;
import org.example.back.entity.User;
import org.example.back.repository.PointingRepository;
import org.springframework.stereotype.Service;

@Service
public class UserStatusService {

    private final PointingRepository pointingRepository;

    public UserStatusService(PointingRepository pointingRepository) {
        this.pointingRepository = pointingRepository;
    }

    public boolean getUserStatus(User user) {
        Pointing result = pointingRepository.searchLastPointing(user);
        return result != null && result.getStartDate() != null && result.getEndDate() == null;
    }
}
