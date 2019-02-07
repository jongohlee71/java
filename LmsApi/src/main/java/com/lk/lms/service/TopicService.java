package com.lk.lms.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lk.lms.dao.TopicsRepagitory;
import com.lk.lms.topic.Topic;

@Service
public class TopicService {
	
	@Autowired
	private TopicsRepagitory topicsRepagitory;

	public List<Topic> getAllTopics(){
		List<Topic> topics = new ArrayList<>();
		topicsRepagitory.findAll().forEach(topics::add);
		return topics;
	}
	
	public Topic getTopic(String id) {
		return topicsRepagitory.findOne(id);
	}

	public void addTopic(Topic topic) {
		topicsRepagitory.save(topic);
	}

	public void updateTopic(String id, Topic topic) {
		topicsRepagitory.save(topic);
		
	}

	public void deleteTopic(String id) {
		topicsRepagitory.delete(id);
	}
	
}
