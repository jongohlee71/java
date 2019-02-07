package com.lk.lms.ws.consumer.co024;

import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlElementDecl;
import javax.xml.bind.annotation.XmlRegistry;
import javax.xml.namespace.QName;


/**
 * This object contains factory methods for each 
 * Java content interface and Java element interface 
 * generated in the skgas.sas.ws.consumer.tr031 package. 
 * <p>An ObjectFactory allows you to programatically 
 * construct new instances of the Java representation 
 * for XML content. The Java representation of XML 
 * content can consist of schema derived interfaces 
 * and classes representing the binding of schema 
 * type definitions, element declarations and model 
 * groups.  Factory methods for each of these are 
 * provided in this class.
 * 
 */

@XmlRegistry
public class ObjectFactory {
	
	private final static QName _MTCO024S_QNAME = new QName("http://skgas.co.kr/CO024", "MT_CO024_S");
    private final static QName _MTCO024SR_QNAME = new QName("http://skgas.co.kr/CO024", "MT_CO024_SR");

    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: skgas.sas.ws.consumer.co024
     * 
     */
    public ObjectFactory() {
    }

    /**
     * Create an instance of {@link DTCO024S }
     * 
     */
    public DTCO024S createDTCO024S() {
        return new DTCO024S();
    }

    /**
     * Create an instance of {@link DTCO024SR }
     * 
     */
    public DTCO024SR createDTCO024SR() {
        return new DTCO024SR();
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link DTCO024S }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://skgas.co.kr/CO024", name = "MT_CO024_S")
    public JAXBElement<DTCO024S> createMTCO024S(DTCO024S value) {
        return new JAXBElement<DTCO024S>(_MTCO024S_QNAME, DTCO024S.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link DTCO024SR }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://skgas.co.kr/CO024", name = "MT_CO024_SR")
    public JAXBElement<DTCO024SR> createMTCO024SR(DTCO024SR value) {
        return new JAXBElement<DTCO024SR>(_MTCO024SR_QNAME, DTCO024SR.class, null, value);
    }


}
