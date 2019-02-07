package com.lk.lms.dao;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.lk.lms.course.Course;

public interface CourseRepagitory extends CrudRepository<Course, String> {
	
	public List<Course> findByTopicId(String topicId);
	
}
