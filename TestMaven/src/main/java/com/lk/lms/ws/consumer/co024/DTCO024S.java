package com.lk.lms.ws.consumer.co024;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>DT_CO024_S complex type에 대한 Java 클래스입니다.
 * 
 * <p>다음 스키마 단편이 이 클래스에 포함되는 필요한 콘텐츠를 지정합니다.
 * 
 * <pre>
 * &lt;complexType name="DT_CO024_S"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="SET_ID" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
 *         &lt;element name="ACCNUT_YEAR" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "DT_CO024_S", propOrder = {
    "setid",
    "accnutyear"
})
public class DTCO024S {
	
	@XmlElement(name = "SET_ID", required = true)
    protected String setid;
    @XmlElement(name = "ACCNUT_YEAR", required = true)
    protected String accnutyear;

    /**
     * setid 속성의 값을 가져옵니다.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSETID() {
        return setid;
    }

    /**
     * setid 속성의 값을 설정합니다.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSETID(String value) {
        this.setid = value;
    }

    /**
     * accnutyear 속성의 값을 가져옵니다.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getACCNUTYEAR() {
        return accnutyear;
    }

    /**
     * accnutyear 속성의 값을 설정합니다.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setACCNUTYEAR(String value) {
        this.accnutyear = value;
    }

}
