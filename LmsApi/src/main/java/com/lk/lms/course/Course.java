package com.lk.lms.course;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.lk.lms.topic.Topic;

@Entity
public class Course {
	
	@Id
	private String id;
	private String corseName;
	private String description;
	
	@ManyToOne
	private Topic topic;
	
	public Course() {
		// TODO Auto-generated constructor stub
	}
	
	public Course(String id, String corseName, String description,  String topic) {
		// TODO Auto-generated constructor stub
		super();
		this.corseName = corseName;
		this.id = id;
		this.description = description;
		this.topic = new Topic(topic, "", "");
		
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getCorseName() {
		return corseName;
	}

	public void setCorseName(String corseName) {
		this.corseName = corseName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Topic getTopic() {
		return topic;
	}

	public void setTopic(Topic topic) {
		this.topic = topic;
	}
	
	

}
