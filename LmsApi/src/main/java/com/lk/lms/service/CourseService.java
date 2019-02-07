package com.lk.lms.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lk.lms.course.Course;
import com.lk.lms.dao.CourseRepagitory;

@Service
public class CourseService {
	
	@Autowired
	private CourseRepagitory courseRepagitory;
	
	public List<Course> getAllCourses(){
		List<Course> courses = new ArrayList<>();
		courseRepagitory.findAll().forEach(courses::add);
//		courseRepagitory.findByTopicId(topicId).forEach(courses::add);
		return courses;
	}
	
	public List<Course> getFindCourses(String topicId){
		List<Course> courses = new ArrayList<>();
//		courseRepagitory.findAll(topicId).forEach(courses::add);
		courseRepagitory.findByTopicId(topicId).forEach(courses::add);
		return courses;
	}
	
	public Course getCourse(String topicId, String id) {
		List<Course> courses = new ArrayList<>();
		courseRepagitory.findByTopicId(topicId).forEach(courses::add);
		return courseRepagitory.findOne(id);
	}

	public void addCourse(Course course) {
		courseRepagitory.save(course);
	}

	public void updateCourse(Course course) {
		courseRepagitory.save(course);
		
	}

	public void deleteCourse(String id) {
		courseRepagitory.delete(id);
	}

}
