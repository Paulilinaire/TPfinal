package org.example.back.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.example.back.entity.Pointing;

import java.util.List;

@Data
@AllArgsConstructor
public class WorkHourOnDateDto {
    private int workingHour;
    private int overtime;
    private List<Pointing> pointingList;
}
