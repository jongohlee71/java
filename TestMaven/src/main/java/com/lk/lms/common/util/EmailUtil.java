package com.lk.lms.common.util;

import java.net.URLDecoder;
import java.util.Properties;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.activation.DataHandler;
import javax.activation.FileDataSource;
import javax.mail.Address;
import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.SendFailedException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.mail.internet.MimeUtility;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class EmailUtil extends Thread {
	
private static final Logger logger = LoggerFactory.getLogger(EmailUtil.class);
    
    String to = null;
    String cc = null; 
    String from = null; 
    String fromName = null;
    String subject = null;
    String mailhost = null; 
    String content = null; 
    String[] attach = null;
    
    
    public static void main(String[] args) {
        String to = "youngjun.g@partner.sk.com;feelingsgap@naver.com;feelingsgap@gmail.com;";
        //String to = "feelingsgap@naver.com";
        //String to = "shs12kkk@sk.com;";
        //String to = "shs12kkk@sk.com;";
        String cc = null;
        String from = "youngjun.g@elpg.com";
        String fromName = "영준";
        String subject = "메일 테스트1015";
        //String mailhost = "168.154.244.53";
        String mailhost = "168.154.246.249";
        String content = "hello<br>안녕3";
        String[] attach = null;
        EmailUtil.htmlsend(to, cc, from, fromName, subject, mailhost, content, attach);

    }

    /**
     * Thread 기본 생성자 상위생성자 호출해야한다.
     *
     */
    public EmailUtil() {
        super();
    }
    /**
     * html 내용형식의 메일을 MIME형태로 email<br>
     * 내부에서 Thread 생성하여 실행
     * @param to 수신자
     * @param cc 참조인
     * @param from 발신자 email
     * @param fromName 발신자명
     * @param subject 제목
     * @param mailhost SMTP 호스트
     * @param content 내용
     * @param attach 첨부파일리스트
     * @return 성공시 true
     */
    public static boolean htmlsend(String to, String cc, String from, String fromName, String subject,
        String mailhost, String content, String[] attach)
    {
        EmailUtil mu = new EmailUtil();
        
        mu.to = to;
        mu.cc = cc;
        mu.from = from;
        mu.fromName = fromName;
        mu.subject = subject;
        mu.mailhost = mailhost;
        mu.content = content;
        mu.attach = attach;
        
        mu.start();   
        
        return true;
    }
    /**
     * thread.start()에 호출되는 Thread 시작점
     */
    public void run() {
        this.sendmail();
    }
    /**
     * html 내용형식의 메일을 MIME형태로 email
     * @return true or false
     */
    private boolean sendmail() {
        boolean rv = false;
        try {
            // Properties 설정
            Properties props = new Properties();
            if (StringUtils.isNotEmpty(mailhost)) {
                props.put("mail.transport.protocol", "smtp");
                props.put("mail.smtp.host", mailhost);
                props.put("mail.smtp.starttls.enable", "true");
                props.put("mail.smtp.auth", "true");
            }
            
            Authenticator auth = new SMTPAuthenticator();
            
            // 메일을 보낼 섹션을 생성
            Session session = Session.getDefaultInstance(props, auth);
            // 메일의 내용이 들어갈 메세지 클래스
            Message msg = new MimeMessage(session);

            logger.debug("to = {}", to);
            logger.debug("cc = {}", cc);
            logger.debug("from = {}", from);
            
            // 수신인
            msg.setRecipients(Message.RecipientType.TO,    getAddresses(to));
            
            // 발신인
            if (StringUtils.isNotEmpty(from)) {
                // 발신자명이 없으면 email 주소로 대체
                if(StringUtils.isEmpty(fromName)) {
                    fromName = from;
                }
                Address senderAddress = new InternetAddress(from, MimeUtility.encodeText(fromName, "UTF-8", "B"));
                msg.setFrom(senderAddress);
            }

            // 참조인
            if (StringUtils.isNotEmpty(cc)) {
                msg.setRecipients(Message.RecipientType.CC, getAddresses(cc));
            }

            // 제목
            subject = MimeUtility.encodeWord(subject, "UTF-8", "B");
            msg.setSubject(subject);

            // 메세지
            MimeBodyPart mbp1 = new MimeBodyPart();
            mbp1.setContent(content, "text/html;charset=UTF-8");

            Multipart mp = new MimeMultipart();
            mp.addBodyPart(mbp1);
            if (attach != null) {
                int max = attach.length;
                for (int i = 0; i < max; i++) {
                    MimeBodyPart mbp2 = new MimeBodyPart();
                    FileDataSource fds = new FileDataSource(attach[i]);
                    mbp2.setDataHandler(new DataHandler(fds));
                    mbp2.setFileName(fds.getName());
                    mbp2.setFileName(URLDecoder.decode(mbp2.getFileName(), "UTF-8"));
                    mp.addBodyPart(mbp2);
                }
            }
            msg.setContent(mp);

            // 메세지 헤더정보
            msg.setHeader("X-Mailer", "SAS");
            // 메세지 보내는 날짜 지정
            msg.setSentDate(new java.util.Date());
            // SMTP를 이용하여 메세지 발송
            Transport.send(msg);
            logger.debug("send mail --------------------------- complete!!!!!!!!!!!!");
            rv = true;
        } catch(SendFailedException e) {
            logger.debug("MailUtil.htmlsend : SendFailedException", e);
            logger.debug("to = {}", to);
            logger.debug("cc = {}", cc);
            logger.debug("from = {}", from);
            logger.debug("subject = {}", subject);
            logger.debug("mailhost = {}", mailhost);
            logger.debug("content = {}", content);
            rv =false;
        } catch (Exception e) {
            logger.debug("MailUtil.htmlsend : Exception", e);
            logger.debug("to = {}", to);
            logger.debug("cc = {}", cc);
            logger.debug("from = {}", from);
            logger.debug("subject = {}", subject);
            logger.debug("mailhost = {}", mailhost);
            logger.debug("content = {}", content);
            rv =false;
        }
        return rv;
    }
    
    /**
     * 구글 사용자 메일 계정 아이디/패스 정보
     * @author Administrator
     */
    private class SMTPAuthenticator extends javax.mail.Authenticator {
        public PasswordAuthentication getPasswordAuthentication() {
            String username = "sasAdmin"; // IConstants.CONS_WEB_MASTER_EMAIL;     // Gmail 인증 메일
            String password = "sasAdmin12#$"; //IConstants.CONS_WEB_MASTER_PASSWORD;    // Gmail 인증 패스워드
            return new PasswordAuthentication(username, password);
        }
    }
    
    /**
     * 메일 주소(세미콜론으로 구분) 배열로 리턴
     * @param String
     * @return Address[]
     */
    private Address[] getAddresses(String address) {
        String[] array = address.split(";");
        Address[] addresses = new Address[array.length];
        
        try {
            for(int i=0; i<array.length; i++) {
                addresses[i] = new InternetAddress(array[i]);
            }
        } catch (AddressException e) {
            e.printStackTrace();
        }
        
        return addresses;
    }
    
    

    /**
     * 이메일 주소가 형식에 맞는지 체크하여 true 또는 false 값을 리턴
     * @param str 이메일 주소
     * @return true or false
     */
    public static boolean isValidMailAddress(String str) {
        
        if (StringUtils.isEmpty(str)) return false;
        
        Pattern pattern = Pattern.compile("\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*");
        Matcher matcher = pattern.matcher(str.trim());
        
        return matcher.matches();
    }
    
}
