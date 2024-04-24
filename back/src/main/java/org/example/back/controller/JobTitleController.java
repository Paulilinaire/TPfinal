package org.example.back.controller;

import org.example.back.entity.JobTitle;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/job-title")
public class JobTitleController {

    @GetMapping
    public JobTitle[] getJobTitles() {
        return JobTitle.values();
    }
}
