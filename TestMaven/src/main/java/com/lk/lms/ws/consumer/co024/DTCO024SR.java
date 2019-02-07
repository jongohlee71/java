package com.lk.lms.ws.consumer.co024;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>DT_CO024_SR complex type에 대한 Java 클래스입니다.
 * 
 * <p>다음 스키마 단편이 이 클래스에 포함되는 필요한 콘텐츠를 지정합니다.
 * 
 * <pre>
 * &lt;complexType name="DT_CO024_SR"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="CONFM_BUDGET" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="EXPNDTR_ACMTL" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="BUDGET_BLCE" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "DT_CO024_SR", propOrder = {
    "confmbudget",
    "expndtracmtl",
    "budgetblce"
})

public class DTCO024SR {
	
	@XmlElement(name = "CONFM_BUDGET")
    protected String confmbudget;
    @XmlElement(name = "EXPNDTR_ACMTL")
    protected String expndtracmtl;
    @XmlElement(name = "BUDGET_BLCE")
    protected String budgetblce;

    /**
     * confmbudget 속성의 값을 가져옵니다.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCONFMBUDGET() {
        return confmbudget;
    }

    /**
     * confmbudget 속성의 값을 설정합니다.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCONFMBUDGET(String value) {
        this.confmbudget = value;
    }

    /**
     * expndtracmtl 속성의 값을 가져옵니다.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getEXPNDTRACMTL() {
        return expndtracmtl;
    }

    /**
     * expndtracmtl 속성의 값을 설정합니다.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setEXPNDTRACMTL(String value) {
        this.expndtracmtl = value;
    }

    /**
     * budgetblce 속성의 값을 가져옵니다.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getBUDGETBLCE() {
        return budgetblce;
    }

    /**
     * budgetblce 속성의 값을 설정합니다.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setBUDGETBLCE(String value) {
        this.budgetblce = value;
    }


}
