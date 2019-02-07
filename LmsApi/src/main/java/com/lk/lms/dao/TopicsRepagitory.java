package com.lk.lms.dao;

import org.springframework.data.repository.CrudRepository;

import com.lk.lms.topic.Topic;

public interface TopicsRepagitory extends CrudRepository<Topic, String> {

}
