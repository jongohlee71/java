package com.lk.lms.controller;

import java.text.DateFormat;
import java.util.Date;
import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


/**
 * Handles requests for the application home page.
 * sas form
@Controller
@RequestMapping("/emk/bor/emkbor160")
public class EmkBor160Controller {
    
    @Autowired
    private EmkBor160Service emkBor160Service;    
    

    @RequestMapping("/r01")
    public String initR() {
        return "s/emk/bor/emkbor160r01";
    }
    
    @Transactional
    @RequestMapping("/getListR01001")
    public Model getListR01001(@RequestBody CamelCaseMap param, Model model) {
        
        List<CamelCaseMap> list = emkBor160Service.getListR01001(param);
        model.addAttribute("gridData", list);
        
        return model;
    } 
    
}
*/

@Controller
public class HomeContorller {
	
	//private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {
		//logger.info("Welcome home! The client locale is {}.", locale);
		
		Date date = new Date();
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);
		
		String formattedDate = dateFormat.format(date);
		
		model.addAttribute("serverTime", formattedDate );
		
		return "home";
	}
	
	

}
