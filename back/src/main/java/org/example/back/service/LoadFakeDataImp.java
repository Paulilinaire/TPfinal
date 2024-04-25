package org.example.back.service;

import org.example.back.entity.Pointing;
import org.example.back.entity.User;
import org.example.back.repository.PointingRepository;
import org.example.back.service.interfaces.LoadFakeData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class LoadFakeDataImp implements LoadFakeData {

    private final String DATA_DIRECTORY = "./";
    private final String FAKE_POINTING_FILE = "pointing-data.txt";

    @Autowired
    private PointingRepository pointingRepository;

    @Override
    public boolean loadFakeData(User user) {
        System.out.println("Load fake date");
        try {
            Path filePath = Paths.get(DATA_DIRECTORY, FAKE_POINTING_FILE);
            BufferedReader reader = Files.newBufferedReader(filePath, StandardCharsets.UTF_8);
            for (String line; (line = reader.readLine()) != null; ) {
                String[] separatedData = line.split("\\|");
                String startDateString = separatedData[1];
                String endDateString = separatedData[2];
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
                LocalDateTime startDate = LocalDateTime.parse(startDateString, formatter);
                LocalDateTime endDate = LocalDateTime.parse(endDateString, formatter);
                Pointing pointing = Pointing.builder().
                        startDate(startDate).
                        endDate(endDate)
                        .user(user).build();
                pointingRepository.save(pointing);
            }
            reader.close();
            return true;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}