package org.example.back.service;

import org.example.back.entity.Pointing;
import org.example.back.entity.User;
import org.example.back.repository.PointingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.*;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAdjusters;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

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

    public List<Pointing> getPointingOfWeek(LocalDate date,User user){
        LocalDateTime startOfTheWeek= date.with(DayOfWeek.MONDAY).atStartOfDay();
        LocalDateTime endOfTheWeek=startOfTheWeek.plusDays(6).withHour(23).withMinute(59).withSecond(59);

        return repository.searchPointingBetweenDate(startOfTheWeek,endOfTheWeek,user);
    }

    public List<Pointing> getPointingOfTheDay(LocalDate date,User user){
        LocalDateTime startDate= date.atStartOfDay();
        LocalDateTime endDate=startDate.withHour(23).withMinute(59).withSecond(59);
        return repository.searchPointingBetweenDate(startDate,endDate,user);
    }

    public List<Pointing> getPointingOfThePreviousMonth(LocalDateTime localDateTime, User user) {
        LocalDate currentDate = localDateTime.toLocalDate();
        LocalDate previousMonth = currentDate.minusMonths(1);

        LocalDate firstDay = previousMonth.withDayOfMonth(1);

        LocalDate lastDay = previousMonth.withDayOfMonth(previousMonth.lengthOfMonth());

        LocalDateTime startOfMonth = firstDay.atStartOfDay();
        LocalDateTime endOfMonth = lastDay.atTime(LocalTime.MAX);  // This sets time to 23:59:59.999999999

        return repository.searchPointingBetweenDate(startOfMonth, endOfMonth, user);
    }
}
