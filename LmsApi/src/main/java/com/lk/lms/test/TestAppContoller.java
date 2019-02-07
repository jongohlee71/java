package com.lk.lms.test;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestAppContoller {
	
	@RequestMapping(value="/")
	public String hellow() {
		return "hi";
	}

}
