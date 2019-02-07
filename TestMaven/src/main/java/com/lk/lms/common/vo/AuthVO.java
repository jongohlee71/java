package com.lk.lms.common.vo;

import java.util.ArrayList;
import java.util.List;

public class AuthVO extends DefaultVO {
	
private static final long serialVersionUID = -7127950387840291187L;
    
    private String loginId;
    private String userId;
    
    private int menuLevel;
    private String menuId;
    private String upperMenuId;
    private String menuUseYn;
    
    private String menuIdL0;
    private String menuIdL1;
    
    private String menuNm;
    private String menuGbn;
    private String progrmId;
    private String progrmUrl;
    private String progrsSttus;
    private String progrsSttusNm;
    private String progrmUseYn;
    private String groupId;
    private String groupUseYn;
    
    private String useYn;
    private String authorC;
    private String authorR;
    private String authorU;
    private String authorD;
    private String authorE;
    private String authorLevel;
    
    private String menuIdPath;
    private String leafYn;
    private String sort;
    private String df;
    
    private List<AuthVO> childList;
    
    /**
     * [upperMenuId, menuId] 구조를 Parent - Child Object 로 변환
     * @param flatList
     * @return
     */
    public static AuthVO toChildList(List<AuthVO> flatList) {
        AuthVO authVO = new AuthVO();
        authVO.setChildList(authVO.parseChildList(flatList));
        return authVO;
    }
    
    /**
     * 
     * @param flatList [upperMenuId, menuId] ordered List
     * @param pLevel Parent Level
     * @return
     */
    public List<AuthVO> parseChildList(List<AuthVO> flatList) {
        List<AuthVO> rList = new ArrayList<>();
        
        // 0 level add
        for (AuthVO authVO : flatList) {
            if (authVO.getMenuLevel() == 0) {
                rList.add(authVO);
            }
        }
        
        // 1 level child add
        for (AuthVO authVO : rList) {
            //if ("N".equals(authVO.getLeafYn())) {
                List<AuthVO> cList1 = this.findChildList(authVO.getMenuId(), flatList);
                for (AuthVO authVO2 : cList1) {
                    //if ("N".equals(authVO2.getLeafYn())) {
                        List<AuthVO> cList2 = this.findChildList(authVO2.getMenuId(), flatList);
                        authVO2.setChildList(cList2);
                    //}
                }
                authVO.setChildList(cList1);
            //}
        }
        return rList;
//        final List<AuthVO> copyList = new ArrayList<>(flatList);
//
//        copyList.forEach(element -> {
//            flatList
//                    .stream()
//                    .filter(parent -> parent.menuId == element.upperMenuId)
//                    .findAny()
//                    .ifPresent(parent -> {
//                        if (parent.childList == null) {
//                            parent.childList = new ArrayList<>();
//                        }
//                        parent.childList.add(element);
//                        flatList.remove(element);
//                    });
//        });
//        return flatList;
//
//        int cLevel = pLevel + 1; // 현재 레벨
//        List<AuthVO> list = new ArrayList<>();
//        
//        for (AuthVO authVO : flatList) {
//            int aLevel = authVO.getMenuLevel();
//            if (aLevel < cLevel) {
//                // 상위 레벨 : 리스트 마감하고 반환
//                return list;
//            } else if (aLevel > cLevel) {
//                // 하위 레벨 : 현재 이후 리스트 재귀호출로 던져서 전에꺼 하위에 추가
//            } else if (aLevel == cLevel) {
//                // 현재 레벨 : 리스트 추가
//                list.add(authVO);
//            }
//        }
//
//        return list;
    }
    
    public List<AuthVO> findChildList(String parentMenuId, List<AuthVO> flatList) {
        List<AuthVO> rList = new ArrayList<>();
        for (AuthVO authVO : flatList) {
            if (parentMenuId.equals(authVO.getUpperMenuId())) {
                //logger.debug("findChildList : {}\n{}", parentMenuId, authVO);
                rList.add(authVO);
            }
        }
        return rList;
    }
    
    public String getLoginId() {
        return loginId;
    }
    public void setLoginId(String loginId) {
        this.loginId = loginId;
    }
    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }
    public String getMenuId() {
        return menuId;
    }
    public void setMenuId(String menuId) {
        this.menuId = menuId;
    }
    public String getUpperMenuId() {
        return upperMenuId;
    }
    public void setUpperMenuId(String upperMenuId) {
        this.upperMenuId = upperMenuId;
    }
    public String getMenuNm() {
        return menuNm;
    }
    public void setMenuNm(String menuNm) {
        this.menuNm = menuNm;
    }
    public String getMenuGbn() {
        return menuGbn;
    }
    public void setMenuGbn(String menuSe) {
        this.menuGbn = menuSe;
    }
    public String getProgrmUrl() {
        return progrmUrl;
    }
    public void setProgrmUrl(String progrmRrl) {
        this.progrmUrl = progrmRrl;
    }
    public String getProgrsSttus() {
        return progrsSttus;
    }
    public void setProgrsSttus(String progrsSttus) {
        this.progrsSttus = progrsSttus;
    }
    public String getGroupId() {
        return groupId;
    }
    public void setGroupId(String groupId) {
        this.groupId = groupId;
    }
    public String getAuthorC() {
        return authorC;
    }
    public void setAuthorC(String authorC) {
        this.authorC = authorC;
    }
    public String getAuthorR() {
        return authorR;
    }
    public void setAuthorR(String authorR) {
        this.authorR = authorR;
    }
    public String getAuthorU() {
        return authorU;
    }
    public void setAuthorU(String authorU) {
        this.authorU = authorU;
    }
    public String getAuthorD() {
        return authorD;
    }
    public void setAuthorD(String authorD) {
        this.authorD = authorD;
    }
    public String getAuthorE() {
        return authorE;
    }
    public void setAuthorE(String authorE) {
        this.authorE = authorE;
    }
    public String getAuthorLevel() {
        return authorLevel;
    }
    public void setAuthorLevel(String authorLevel) {
        this.authorLevel = authorLevel;
    }
    public String getSort() {
        return sort;
    }
    public void setSort(String sort) {
        this.sort = sort;
    }
    public String getDf() {
        return df;
    }
    public void setDf(String df) {
        this.df = df;
    }
    public int getMenuLevel() {
        return menuLevel;
    }
    public void setMenuLevel(int menuLevel) {
        this.menuLevel = menuLevel;
    }
    public String getUseYn() {
        return useYn;
    }
    public void setUseYn(String useYn) {
        this.useYn = useYn;
    }
    public String getMenuIdL0() {
        return menuIdL0;
    }
    public void setMenuIdL0(String menuIdL0) {
        this.menuIdL0 = menuIdL0;
    }
    public String getMenuIdL1() {
        return menuIdL1;
    }
    public void setMenuIdL1(String menuIdL1) {
        this.menuIdL1 = menuIdL1;
    }

    public String getMenuIdPath() {
        return menuIdPath;
    }

    public void setMenuIdPath(String menuIdPath) {
        this.menuIdPath = menuIdPath;
    }

    public String getLeafYn() {
        return leafYn;
    }

    public void setLeafYn(String leafYn) {
        this.leafYn = leafYn;
    }

    public List<AuthVO> getChildList() {
        return childList;
    }

    public void setChildList(List<AuthVO> childList) {
        this.childList = childList;
    }

    public String getProgrsSttusNm() {
        return progrsSttusNm;
    }

    public void setProgrsSttusNm(String progrsSttusNm) {
        this.progrsSttusNm = progrsSttusNm;
    }

    public String getProgrmId() {
        return progrmId;
    }

    public void setProgrmId(String progrmId) {
        this.progrmId = progrmId;
    }

    public String getMenuUseYn() {
        return menuUseYn;
    }

    public void setMenuUseYn(String menuUseYn) {
        this.menuUseYn = menuUseYn;
    }

    public String getProgrmUseYn() {
        return progrmUseYn;
    }

    public void setProgrmUseYn(String progrmUseYn) {
        this.progrmUseYn = progrmUseYn;
    }

    public String getGroupUseYn() {
        return groupUseYn;
    }

    public void setGroupUseYn(String groupUseYn) {
        this.groupUseYn = groupUseYn;
    }

}
