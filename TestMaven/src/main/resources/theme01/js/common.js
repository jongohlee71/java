/**
 *  *===================================File description=============================================
 * File Name    : ext-common.js
 * Comment      : common Function [ 프로젝트에 특화되지 않은 일반 기능에 대한 공통/유틸 함수 ]
 * ================================================================================================

 * >>> Grid 관련 함수
 * - gfn_getRowTrimData               : Grid 상에서 특정셀을 클릭시 클릭한 행의 데이타추출, 기본적으로 _state 정보는 제외처리
 * - gfn_pagerShowHide                : Grid 하단의 pager 영역 show/hide 처리
 * - gfn_tabPagerShowHide             : Tab하단의 pager 영역 show/hide 처리
 * - gfn_getSelectRowData             : Grid 의 목록에서 체크된 항목의 해당 Row Data 를 모두 가져옴, _state 정보는 제외처리
 * - gfn_getSelectRowDataById         : Grid 에서 여러개의 항목을 선택후 체크된 항목중에서 특정 컬럼값만 추출시
 * - gfn_hierarchy2Tree                  : 계층형 테이블 쿼리 결과를 JSON 트리 구조로 변경
 * - gfn_gridSave                     : 편집이 가능한 그리드의 Flag 칼럼이 D(삭제), I(신규), U(수정) 된 부분만 데이타를 추출
 * - gfn_dataGetGrid                  : Grid의 데이터를 얻어올 때 사용
 *  
 * >>> 날짜 관련 함수
 * - gfn_today()                       : 오늘 날짜 조회, yyyy-mm-dd 형식
 * - gfn_addMonth(2)                   : 이번달에서 2개월후
 * - gfn_addMonth(-2)                  : 이번달에서 2개월전
 * - gfn_addDate(-7)                   : 오늘날짜에서 7일전
 * - gfn_addDate(7)                    : 오늘날짜에서 7일후
 * - gfn_getMonthFirstDay()            : 이번달 1일 날짜
 *  
 *  
 * >>> 기타 유틸 함수
 * - gfn_getFieldAll                   : 페이지로딩시 Alopex init 함수에 바인딩된 param 에서 fields 항목만 모두 추출
 * - gfn_setValue                      : input 혹은 select box 중에서 ID 값을 이용해서 해당 ID에 값을 설정
 * - gfn_getValue                      : input 혹은 select box 중에서 ID 값을 이용해서 해당 ID에 값을 가져옴
 * - gfn_isDisable                     : Alopex 에서 제공하는 setEnabled 함수에 의해 enable / disable 된 상태 정보 체크할때 사용 
 * - gfn_alert                         : alert 창, type별로 구분자를 사용 (단순alert:"info", 에러인경우:"error", 경고인경우:"warn", 확인창인경우 :"confirm")
 * - gfn_isEnterKey                    : input 에서 enter key 입력여부 판단
 * - isEmpty()                         : 해당 Object 의 값이 존재하는지 체크, empty 상태체크 
 * - isNumber()                        : 해당 Object 의 값이 숫자인지 아닌지 체크
 * - gfn_getHyphen()                   : 휴대폰 번호에서 - 표시
 * - gfn_comma                         : 숫자 천단위 마다 콤마 입력
 * - gfn_convertSpecialChar            : 특수문자 취환
 * - gfn_bizrNoCheck                   : 사업자등록번호 유효성 체크
 * - gfn_preventScreenCapture()           : 스크린캡쳐 막기
 * - gfn_isNull                        : null 여부 체크 함수
 * - gfn_setCheck                      : checkbox 에 해당 값을 적용할 때 사용
 * - gfn_size                          : json data 혹은 배열의 length 값을 반환
 * - isNoneId                           : 해당 ID가 존재하는지 검사하는 함수
 * - gfn_isEmpty                       : text box, select box의 값이 있는지 없는지 확인
 * - gfn_getFormatedFileSize           : 파일 사이즈 문자화 함수
 * 
 * 
 * >>> emk-common.js 추가 함수
 * - gfn_getSplitTelno                : 전화번로 Validation 및 추출
 */



//////////////////// **********************************************************
/// prototype 함수
/// @author : keehyun-park
//////////////////// **********************************************************
/**
 * 문자중에 정규표현식 문자열 치환.
 * 
 * @return : 치환문자열.
 */
String.prototype.meta = function() {
    var str = this;
    var result = "";

    for ( var i = 0; i < str.length; i++) {
        if ((/([\$\(\)\*\+\.\[\]\?\\\^\{\}\|]{1})/).test(str.charAt(i))) {
            result += str.charAt(i).replace((/([\$\(\)\*\+\.\[\]\?\\\^\{\}\|]{1})/), "\\$1");
        } else {
            result += str.charAt(i);
        }
    }
    return result;
};

/**
 * 특정문자열 replace 처리 함수
 */
String.prototype.replaceAll = function(target, replacement) {
  return this.split(target).join(replacement);
};

/**
 * 특정문자(열)로 종결되는지 여부를 확인시 사용, java 의 .endsWidth()와 동일한 함수
 */
String.prototype.endsWith = function(searchString, position) {
    var subjectString = this.toString();
    if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
      position = subjectString.length;
    }
    position -= searchString.length;
    var lastIndex = subjectString.indexOf(searchString, position);
    return lastIndex !== -1 && lastIndex === position;
};

/**
 * 문자열이 모두 숫자형태로 구성되어 있는지 확인
 */
String.prototype.isNumber = function(){
    if(gfn_isNull(this)){
        return false;
    } else {
        return /^\d+$/.test(this+"");
    }
}


/**
 * 특정 문자(열) 중에서 지정한 문자(열) 부분을 "" 로 변경처리
 */
String.prototype.remove=function(a){
    return a==null?this:eval("this.replace(/["+a.meta()+']/g, "")');
};

/**
 * 특정 문자(열)로 시작하는지 여부를 확인할때 사용, Java 의 startsWith 함수와 동일
 */
String.prototype.startsWith = function(searchString, position){
   position = position || 0;
   return this.substr(position, searchString.length) === searchString;
};

String.prototype.ymd = function(){
    if(gfn_isNull(this)){
        return "";
    }
    var n = this + "";
    var match1 = n.match(/(\d{4})(\d{2})(\d{2})/);
    var match2 = n.match(/(\d{4})(\d{2})/);
    var match3 = n.match(/(\d{4})/);
    if(match1){
        return match1[1] +"-"+match1[2] +"-"+match1[3];
    } else if(match2){
        return match2[1] +"-"+match2[2];
    } else if(match3){
        return match3[1];
    }
    return "";
};

String.prototype.money = function(){
    if(this==0) return 0;
    var n = this + "";
    if( !n.isNumber()){
        return "NaN";
    }
    var reg = /(^[+-]?\d+)(\d{3})/;
    while (reg.test(n)) n = n.replace(reg, '$1' + ',' + '$2');
    return n;
};

/**
 * 숫자 3자리마다 콤마
 */
Number.prototype.money = function(){
    if(this==0) return 0;
    var n = this + "";
    if( !n.isNumber()){
        return "NaN";
    }
    var reg = /(^[+-]?\d+)(\d{3})/;
    while (reg.test(n)) n = n.replace(reg, '$1' + ',' + '$2');
    return n;
};

/**
 * 연도가 숫자로 넘어온 경우
 */
Number.prototype.ymd = function(){
    if(gfn_isNull(this)){
        return "";
    }
    var n = this + "";
    var match1 = n.match(/(\d{4})(\d{2})(\d{2})/);
    var match2 = n.match(/(\d{4})(\d{2})/);
    var match3 = n.match(/(\d{4})/);
    if(match1){
        return match1[1] +"-"+match1[2] +"-"+match1[3];
    } else if(match2){
        return match2[1] +"-"+match2[2];
    } else if(match3){
        return match3[1];
    }
    return "";
};




/**
 * 
 */
Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  var arrYMD = [];
  arrYMD[0] = this.getFullYear();
  arrYMD[1] = mm > 9 ? mm : '0'+ mm;
  arrYMD[2] = dd > 9 ? dd : '0' + dd;

  return arrYMD.join('-'); // padding
};

/**
 * 사용법 new Date().formatDate("yyyy-MM-dd hh:mm:ss")
 */
Date.prototype.formatDate = function (format) {
    var date = this,
        day = date.getDate(),
        month = date.getMonth() + 1,
        year = date.getFullYear(),
        hours = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds();

    if (!format) {
        format = "yyyy-MM-dd";
    }

    format = format.replace("MM", month.toString().replace(/^(\d)$/, '0$1'));

    if (format.indexOf("yyyy") > -1) {
        format = format.replace("yyyy", year.toString());
    } else if (format.indexOf("yy") > -1) {
        format = format.replace("yy", year.toString().substr(2, 2));
    }

    format = format.replace("dd", day.toString().replace(/^(\d)$/, '0$1'));

    if (format.indexOf("t") > -1) {
        if (hours > 11) {
            format = format.replace("t", "pm");
        } else {
            format = format.replace("t", "am");
        }
    }

    if (format.indexOf("HH") > -1) {
        format = format.replace("HH", hours.toString().replace(/^(\d)$/, '0$1'));
    }

    if (format.indexOf("hh") > -1) {
        if (hours > 12) {
            hours -= 12;
        }

        if (hours === 0) {
            hours = 12;
        }
        format = format.replace("hh", hours.toString().replace(/^(\d)$/, '0$1'));
    }

    if (format.indexOf("mm") > -1) {
        format = format.replace("mm", minutes.toString().replace(/^(\d)$/, '0$1'));
    }

    if (format.indexOf("ss") > -1) {
        format = format.replace("ss", seconds.toString().replace(/^(\d)$/, '0$1'));
    }

    return format;
};




/**
 * 그리드 페이징 영역에 대한 show / hide 처리 데이터 건수가 있을 경우 pager 표시, 없을 경우 표시 하지 않음
 * 
 * @param gridId
 */
function gfn_pagerShowHide(gridId){
    var grLen =    $("#"+gridId).alopexGrid("dataGet").length;
    if(grLen <= 0) {
        $("#"+gridId).find('div.pager').hide();
    } else {
        $("#"+gridId).find('div.pager').show();
    }
}

/**
 * Tab 하단의 페이징 영역에 대한 show / hide 처리 데이터 건수가 있을 경우 pager 표시, 없을 경우 표시 하지 않음
 * 
 * @param tabId,
 *            gridId
 */
function gfn_tabPagerShowHide(tabId, gridId){
    var $grdId = $("#"+tabId).find("#"+gridId);
    var grLen =    $grdId.alopexGrid("dataGet").length;
    if(grLen <= 0) {
        $grdId.find('div.pager').hide();
    } else {
        $grdId.find('div.pager').show();
    }
}

/**
 * gfn_hierarchy2Tree() 계층형 테이블 쿼리 결과를 JSON 트리 구조로 변경
 * 
 * @param arrayList
 *            {object}: 서버 계층형 쿼리 결과 (RecordSet)
 * @param parameters
 *            {object} : 자바스크립트 오브젝트 타입의 요청 데이터
 */
function gfn_hierarchy2Tree(arrayList, rootId, id, upper_id) {
    var rootNodes = [];
    var traverse = function (nodes, item, index) {
        if (nodes instanceof Array) {
            return nodes.some(function (node) {
                if (node[id] === item[upper_id]) {
                    node.items = node.items || [];
                    return node.items.push(arrayList.splice(index, 1)[0]);
                }
                return traverse(node.items, item, index);
            });
        }
    };

    while (arrayList.length > 0) {
        arrayList.some(function (item, index) {
            if (item[upper_id] === rootId) {
                return rootNodes.push(arrayList.splice(index, 1)[0]);
            }

            return traverse(rootNodes, item, index);
        });
    }

    return rootNodes;
}

/**
 * 그리드에서 선택된 행의 데이타를 추출할때 사용하는 함수
 * 
 * @param gridId
 * @param trimFlag :
 *            AlopexGrid.trimData() 사용여부, default 는 사용하는것을 원칙으로 함
 * @returns
 * @author keehyun-park
 */
function gfn_getSelectRowData(gridId, trimFlag){
    var selData = $("#"+ gridId).alopexGrid("dataGet", {_state: {selected: true}}); // 선택된
																					// 행
    if(gfn_isNull(trimFlag)){
        return AlopexGrid.trimData(selData);
    } else {
        if(trimFlag){
            return AlopexGrid.trimData(selData);
        } else {
            return selData;
        }
    }
}

/**
 * 그리드에선 선택된 RowData 중에서 특정 항목만 추출할 경우 사용하는 함수
 * 
 * @param gridId
 * @param selectId
 * @returns {Array}
 * @author keehyun-park
 */
function gfn_getSelectRowDataById(gridId, selectId){
    var arrReturnValue = [];
    var selData = gfn_getSelectRowData(gridId);
    var loopSize = selData.length;
    if(loopSize == 0){
        return "";
    }
    var returnValue = "";
    for(var i=0; i<loopSize; i++){
        var tmp = selData[i];
        arrReturnValue[i] = $.trim(tmp[selectId]);
    }
    return arrReturnValue.join(",");
}

/**
 * 엔터키 입력여부 확인
 * 
 * @param ev
 * @author keehyun-park
 */
function gfn_isEnterKey(evnt){
    evnt.preventDefault();
    evnt.stopPropagation();
    var evntCode = (window.netscape) ? evnt.which : evnt.keyCode;
    if(evntCode == 13){
        return true;
    }
    else{
        return false;
    }
}

/**
 * 해당 ID가 존재하는지 검사하는 함수
 * 
 * @param objId
 * @returns {Boolean}
 */
function isNoneId(objId){
    if($('#'+objId).length == 0){
        return true;
    } else {
        return false;
    }
}

/**
 * text box, select box 등의 폼요소의 값을 반환한다 단 체크박스는 제외
 * 
 * @param objId
 * @returns
 * @author keehyun-park
 */
function gfn_getValue(objId) {
    if(isNoneId(objId)){
        return "";
    }

  var obj = document.getElementById(objId);
  var rtnValue = "";

  switch (obj.type) {
    case 'text':
    case 'textarea':
    case 'hidden':
    case 'password':
    case 'select-one':
    rtnValue = $.trim($("#"+objId).val());
    break;
    case 'radio':
        var rdoNm = $('#'+objId).attr("name");
        var tmp = $("input:radio[name="+rdoNm+"]:checked").val();
        if(tmp == undefined || tmp == null){
            rtnValue = "";
        } else {
            rtnValue = $("input:radio[name="+rdoNm+"]:checked").val();
        }
    break;
  }

  return rtnValue;
}


/**
 * 폼 요소에 원하는 값 설정
 * 
 * @param objId
 * @param objValue
 * @returns {String}
 * @author keehyun-park
 */
function gfn_setValue(objId,objValue) {
    if(isNoneId(objId)){
        return "";
    }
  var obj = document.getElementById(objId);
  var rtnValue = "";
  if(obj == undefined || obj == null){
      return "";
  }
  var setValue = "";
  if( !gfn_isNull(objValue)){
      setValue = objValue;
  }
  switch (obj.type) {
    case 'text':
    case 'textarea':
    case 'password':
    case 'hidden':
    $("#"+objId).val(setValue);
    break;
    case 'radio':
        var rdoNm = $('#'+objId).attr("name");
        $("input:radio[name="+rdoNm+"]").val([setValue]);
    break;
    case 'select-one':
    $("#"+objId).val(setValue);
    break;
  }
}

/**
 * text box, select box의 값이 있는지 없는지 확인
 * 
 * @param objId :
 *            변수명
 * @param delOption :
 *            삭제할 구분자
 * @returns {Boolean}
 * @author keehyun-park
 * 
 * 예) gfn_isEmpty("txt1") -- true / false 로 리턴 예) gfn_isEmpty("txt1",'값을
 * 입력하십시오')
 */
function gfn_isEmpty(objId, msg) {
  var obj = document.getElementById(objId);
  if( !$('#'+objId).length){  // Not exist object
    return true;
  }

  var rtnValue = "";
  var alertMsg = "";
  if(msg == undefined || msg == null || msg == ""){
    alertMsg = "";
  }
  else{
    alertMsg = msg;
  }

  switch (obj.type) {
    case 'text':
    case 'textarea':
    case 'hidden':
    case 'password':
    case 'select-one':
    rtnValue = $.trim($("#"+objId).val());
    break;
    case 'radio':
    var tmp = $("input:radio[name="+objId+"]:checked").val();
    if(tmp == undefined || tmp == null){
        rtnValue = "";
    } else {
        rtnValue = $("input:radio[name="+objId+"]:checked").val();
    }

    break;
  }

  if(rtnValue.length == 0){
    if(alertMsg.length > 0){
      gfn_alert("warn", alertMsg);
    }
    return true;
  }
  else{
    return false;
  }

}


/**
 * 그리드상에서 특정셀을 클릭 했을때 선택한 행의 data 를 가져오는 함수 리턴되는 data 에는 상태정보가 제외
 * 
 * @param event
 * @returns
 */
function gfn_getRowTrimData(event) {
    var evObj = AlopexGrid.parseEvent(event);
    var rowdata = evObj.data;
    var ret = AlopexGrid.trimData(rowdata)
    ret["rowCount"] = $('.perPage').val();
    //
    var curNo = evObj.page;
    $a.session("currentNo", curNo);
    //
    return ret;
}



// ////////////////// *********************************************************
// *** gfn_alert() 창 설정
// ////////////////// *********************************************************
/**
 * 공통 alert 창 호출
 * 
 * @param typeName :
 *            닫기버튼 1개인 경우 , OK/cancel 버튼 이 2개 나오는 경우
 * @param msg :
 *            rule 에 어긋난 경우 발생할 메세지 내용
 * @param width :
 *            다이얼로그창 가로크기
 * @param height :
 *            다이얼로그창 세로크기
 * @param xcallback :
 *            다이얼로그창 X 버튼클릭시 호출할 callback 함수
 */
function gfn_alert(typeName, msg, width, height, xcallback){
    // console.log("alert msg===" + msg);
    var sort = typeName.toLowerCase();
    var retName = "";
    var _width = "";
    var _height = "";
    var _xcallback = null;
    if( !gfn_isNull(xcallback)){
        if(xcallback && typeof(xcallback) === 'function'){
            _xcallback = xcallback;
        }
    }

    if(width == undefined || width == null || width == ""){
        _width = 400;
    } else {
        _width = width;
    }
    if(height == undefined || height == null || height == ""){
        _height = 180;
    } else {
        _height = height;
    }

    var widthScreen = $(window).width();
    if(widthScreen < _width){
        _width = widthScreen;
    }

    var _codeType = "";
    switch(sort){
        case "confirm":             // 확인 창을 띄울때
            _codeType = "confirm";
            retName = "okcancel";
            break;
// case "okcancel":
// retName = "okcancel";
// break;
// case "base":
        case "error":                // 처리 결과 오류 발생시
            _codeType = "error";
            retName = "close";
            break;
// case "close":
        case "info":                 // 처리 결과에 대한 단순 메세지
            _codeType = "info";
            retName = "close";
            break;
        case "warn":                 // 유효성 검사시 오류가 발생시
            _codeType = "warn";
            retName = "close";
            break;
        default:
            retName = "close";
            break;
    }
    var retMsg = "";
    if(msg != undefined && msg != null && msg != ""){
        retMsg = msg;
    }
    return gfn_getAttribute(retName, retMsg, _width, _height, _codeType, _xcallback);
}



/**
 * 공통 alert 창닫기 할때 호출하는 함수
 */
function gfn_alertClose() {
    $('.dialog_btn').click(); // Dialog를 닫기.
    $('#alertDialog').close(); // Dialog를 닫기.
    $('#alertDialog').remove(); // Dialog 삭제
}

// 
function gfn_getQueryString(pageUrl){
    var data = {};
    if(pageUrl != undefined && pageUrl != null && pageUrl != ""){
        var strUrl = pageUrl.replaceAll("?", "");
        var arrPath = strUrl.split("&");
        if(arrPath.length >= 1){
            for(var i=0; i<arrPath.length; i++){
                var arrTemp = arrPath[i].split("=");
                var strKey = arrTemp[0];
                var strVal = arrTemp[1];
                data[strKey] = strVal;
            }
        }
    }

    return data;
}





/**
 * gfn_getFormatedFileSize() 파일 사이즈 문자화 함수
 * 
 * @author 오승우
 * @param filesize :
 *            파일 사이즈
 */
function gfn_getFormatedFileSize(filesize) {
    var kb = 0.0, mb = 0.0;

    try {
        kb = Math.round(filesize/1024);
    }
    catch(E) {
        kb = 0.0;
    }
    if (kb<=0.0) {
        return filesize; // 입력값 오류시 그대로 반환
    }

    if (kb<1024.0) {
        return kb.toFixed(1) + " KB";
    }

    mb = Math.round(kb/1024);

    return mb.toFixed(1) + " MB";
}


/**
 * 문자열 empty 체크
 * 
 * @author : keehyun-park
 */
String.prototype.isEmpty = function() {
  if(gfn_isNull(this)){
      return true;
  } else {
      if (!this.match(/\S/)) {     return true;     }
      else {                    return false;    }
  }
}


/**
 * 오늘날짜, YYYY-MM-DD 형식
 * 
 * @returns
 * @author : keehyun-park
 */
function gfn_today(){
    var date = new Date();
    return date.yyyymmdd();
}


/**
 * 이번달 1일 날짜
 * 
 * @returns
 * @author : keehyun-park
 */
function gfn_getMonthFirstDay(){
    var d = new Date();
    m = d.getMonth();
    y = d.getFullYear(); // current year
    return new Date(y,m,1).yyyymmdd();
}

/**
 * 이번달 마지막 날짜
 * 
 * @returns
 * @author : keehyun-park
 */
function gfn_getMonthLastDay(){
    var d = new Date();
    m = d.getMonth()+1;
    y = d.getFullYear(); // current year
    return new Date(y,m,0).yyyymmdd();
}

/**
 * 
 * @param diffMon :
 *            현재월에서 몇개월전, 후의 값을 가져올때 사용(정수값만 사용)
 * @returns
 * @author : keehyun-park
 */
function gfn_addMonth(diffMon){
    var mon = 0;
    if(diffMon == undefined || diffMon == null || diffMon == ""){
        mon = 0;
    } else {
        mon = diffMon;
    }
    var date1 = new Date();
    var ret = date1.setMonth(date1.getMonth() - Number(mon));
    var retymd = new Date(ret);
    if(retymd.getDate()!=date1.getDate()){
        retymd = gfn_getMonthFirstDay();
    }else{
        retymd = retymd.yyyymmdd();
    }
    return retymd;
}
/**
 * 
 * @param diffMon :
 *            오늘일자에서 몇일전, 후의 값을 가져올때 사용(정수값만 사용)
 * @returns
 * @author : keehyun-park
 */
function gfn_addDate(diffday){
    var dt = new Date();
    var temp = dt.setDate(dt.getDate() + Number(diffday));
    return new Date(temp).yyyymmdd();
}

/**
 * null 여부 체크 함수
 */
function gfn_isNull(obj) {
    if(obj == undefined || obj == null || obj == "" || obj == 'undefined') {
        return true;
    }
    else {
        return false;
    }
}

/**
 * Alopex 에서 제공하는 setEnabled 함수에 의해 enable / disable 된 상태 정보 체크할때 사용
 * 
 * @param objId
 * @returns {Boolean}
 * @author : keehyun-park
 */
function gfn_isDisable(objId){
    var ret = $("#"+objId).is(":disabled");
    if(ret){
        return true;
    } else {
        return false;
    }
}


/**
 * checkbox 에 해당 값을 적용할 때 사용
 * 
 * @param objId
 * @param objVal
 * @author : keehyun-park
 */
function gfn_setCheck(objId, objVal){

    var chkNm = $('#'+objId).attr("name");
    var arrVal = [];
    if($.isArray(objVal) ){
        arrVal = objVal;
    } else {
        if (typeof objVal !== "undefined" && typeof objVal != "") {
            arrVal = objVal.split(",");
        }
    }
    // -----------------------------------------------------
    $('input[type="checkbox"][name="'+chkNm+'"]').prop("checked", false);
    // -----------------------------------------------------
    $('input[type="checkbox"][name="'+chkNm+'"]').each(function(index, ele){
        if(this.value == arrVal[index]){
            $(this).prop("checked", true);
        } else {
            $(this).prop("checked", false);
        }
    });
    // -----------------------------------------------------
}


/**
 * json data 혹은 배열의 length 값을 반환
 * 
 * @param jsonData
 * @returns
 * @author : keehyun-park
 */
function gfn_size(jsonData){
    if(gfn_isNull(jsonData)){
        return 0;
    } else {
        if(isJSON(jsonData)){
            return Object.keys(jsonData).length;
        } else {
            return jsonData.length || 0;
        }
    }
}


/**
 * [내부함수] 공통함수 개발시 argument 값이 json object 인지 판별시 사용
 * 
 * @param someData
 * @returns {Boolean}
 * @author : keehyun-park
 */
function isJSON (someData) {
    if (typeof someData != 'string')
        someData = JSON.stringify(someData);
    try {
        JSON.parse(someData);
        return true;
    } catch (e) {
        return false;
    }
}



/**
 * FLAG 상태정보가 D(삭제), I(신규추가), U(수정) 된 항목만을 추출해서 dataset을 만듬
 * 
 * @param gridId
 * @param trimFlag :
 *            AlopexGrid.trimData() 함수사용여부 , default는 사용함, false를 줄때만 미사용.
 * 
 * @param isFlagI :
 *            AlopexGrid.trimData() 함수사용여부 , default는 사용함, false를 줄때만 미사용.
 * @param isFlagU :
 *            AlopexGrid.trimData() 함수사용여부 , default는 사용함, false를 줄때만 미사용.
 * @param isFlagD :
 *            AlopexGrid.trimData() 함수사용여부 , default는 사용함, false를 줄때만 미사용.
 * 
 * @returns
 * @author : keehyun-park
 * 
 * 
 * 
 * gfn_gridSave('gridId', true) -> grid의 신규추가, 수정,삭제 데이터 조회
 * gfn_gridSave('gridId', true, true, true, fasle) -> grid의 신규추가, 수정 데이터 조회
 * gfn_gridSave('gridId', true, true, true, true) -> grid의 신규추가, 수정, 삭제 데이터 조회
 * gfn_gridSave('gridId', true, true, false, true) -> grid의 신규추가, 삭제 데이터 조회
 * gfn_gridSave('gridId', true, false, ture, true) -> grid의 수정, 삭제 데이터 조회
 * 
 */
function gfn_gridSave(gridId, trimFlag, isFlagI, isFlagU, isFlagD){

    $('#'+gridId).alopexGrid('endEdit'); // 편집중일때 강제 편집종료 이벤트 발생
    
    // endEdit 로 유효성 체크 이벤트 발생됨
    // allowInvalid.true 일때의 체크는 getGridValidate 에서 가능

    var gridDIU = null;
    
    // 등록,수정 삭제 플래그 없을시 전체 조회(기존과 동일)
    if(isFlagI==undefined && isFlagU == undefined && isFlagD==undefined){
        gridDIU = $("#"+gridId).alopexGrid( "dataGet" , { _state : { added:false, deleted:true } },{ _state : { added:true } }, { _state : { added:false, edited:true } }     );
    }else if(!isFlagI && !isFlagU && !isFlagD){
        // 전부 false인경우
        gridDIU == null;
    }else{ // 특정 Flag의 데이터만 조회
        
        var arg = [];
        if( isFlagI==undefined||isFlagI){
            arg.push({ _state : { added:true } });
        }
        
        if( isFlagU==undefined||isFlagU){
            arg.push({ _state : { added:false, edited:true }});
        }
        
        if( isFlagD==undefined||isFlagD){
            arg.push({ _state : { added:false, deleted:true } });
        }
        gridDIU = $("#"+gridId).alopexGrid( "dataGet", arg);        
    }
    
    if( !gfn_isNull(gridDIU) && gfn_size(gridDIU) > 0){
        if(gfn_isNull(''+trimFlag)){   // false값이 넘어오는 경우 null로 체크되는 현상 방지
            return AlopexGrid.trimData(gridDIU);
        } else {
            if(trimFlag){
                return AlopexGrid.trimData(gridDIU);
            } else {
                return gridDIU;
            }
        }
    } else {
        return ""; // if (checkData.length > 0) { 에서 에러 발생 가능성 있음
    }
}



// Grid 데이터를 얻어올때 사용
function gfn_dataGetGrid(gridId, trimFlag){
    var gridData = $("#"+gridId).alopexGrid( "dataGet" );
    if( !gfn_isNull(gridData) && gfn_size(gridData) > 0){
        if(gfn_isNull(trimFlag)){
            return AlopexGrid.trimData(gridData);
        } else {
            if(!trimFlag){
                return AlopexGrid.trimData(gridData);
            } else {
                return gridData;
            }
        }
    } else {
        return "";
    }
}



/**
 * 디버그용, 특정화면에서 중복된 ID 가 존재하는 지 체크해 볼때 사용[일반개발자는 사용금지]
 * 
 * @author : keehyun-park
 */
function gfn_findDupId(){
    var allElements = document.getElementsByTagName("*");
    var allIds = {};
    var foundFlag = false;
    for (var i = 0, n = allElements.length; i < n; ++i) {
        var id = allElements[i].id;
        if (id) {
            if (allIds[id] === undefined) {
                allIds[id] = 1;
            } else {
                foundFlag = true;
                console.warn('Duplicate ID Find#====' + id);
            }
        }
    }
    if (!foundFlag) {
        console.log('No duplicate IDs found');
    }
    return foundFlag;
}

/**
 * 비밀번호 유효성 검사
 * 
 * @param passwd
 */
function gfn_IsValidPasswd(pwd) {
    if (/(admin|system|master|root|sknetwork|rentok|password|passwd|cipher)/gi.test(pwd)) {
        gfn_alert("error", "비밀번호에 차단된 단어가 포함되어 있습니다.\n\n(예) password, sknetwork, rentok");
        return false;
    }

    if (gfn_IsContinuedValue(pwd)) {
        gfn_alert("error", "연속되는 숫자, 문자를 사용하실 수 없습니다.\n\n(예) 123, abc");
        return false;
    }

    if (/(\w)\1\1/.test(pwd)) {
        gfn_alert("error", "같은 문자를 3회 이상 연속하여 사용하실 수 없습니다.\n\n(예) 111, www");
        return false;
    }

    var chk_num = pwd.search(/[0-9]/g);
    var chk_eng = pwd.search(/[a-z]/ig);

    if (chk_num < 0 || chk_eng < 0) {
        gfn_alert("error", "비밀번호는 숫자와 영문자를 혼용하여야 합니다.");
        return false;
    }

    return true;
}

/**
 * 연속된 문자(123,abc..) 체크로직
 * 
 * @param value
 */
function gfn_IsContinuedValue(value) {
    var intCnt1 = 0;
    var intCnt2 = 0;
    var temp0 = "";
    var temp1 = "";
    var temp2 = "";

    for (var i = 0; i < value.length; i++) {
        temp0 = value.charAt(i);
        temp1 = value.charAt(i+1);
        temp2 = value.charAt(i+2);

        if ( temp0.charCodeAt(0) - temp1.charCodeAt(0) == 1 &&
             temp1.charCodeAt(0) - temp2.charCodeAt(0) == 1) {
            intCnt1 = intCnt1 + 1;
        }

        if ( temp0.charCodeAt(0) - temp1.charCodeAt(0) == -1 &&
             temp1.charCodeAt(0) - temp2.charCodeAt(0) == -1) {
            intCnt2 = intCnt2 + 1;
        }
    }

    return (intCnt1 > 0 || intCnt2 > 0);
}

/**
 * maskedinput
 * 
 * @param type
 *            TEL, HP
 * @param value
 *            string
 * @returns string
 * @author nicecomputer
 */
function gfn_getHyphen(type, value) {
    value = value.replace(/[^0-9]/g, '');

    // 최소 길이 체크
    if (value.length < 9) return value;

    // 타입별 처리
    if (type == "TEL" || type == "HP") {
        value = value.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,"$1-$2-$3");
    }

    return value;
}


/**
 * 숫자 천단위 마다 콤마 입력
 * 
 * @param 숫자
 * @author : nicecomputer
 * 
 */
function gfn_comma(value){
    
    // gfn_comma(-123456789) => -,123,456,789"
    /*
	 * var temp = value.toString(); return
	 * temp.split(/(?=(?:\d{3})+(?:\.|$))/g).join(',');
	 */
    
    return number(value, {money:true})
}

/**
 * 스크린캡쳐 막기
 */
function gfn_preventScreenCapture(fowardUrl, scrCptPrvntYn) {
    var browserAgent = navigator.userAgent.toLowerCase();
    var url = '/web/portal/script/lib/WebCube/screenCapturePrevent.jsp?SCFUrl='+ encodeURIComponent(fowardUrl) + '&PARA_VAL=' + scrCptPrvntYn;
    if (browserAgent.indexOf("chrome") != -1 && scrCptPrvntYn == 'Y') {
        alert("크롬 브라우저에서는 화면캡쳐를 제어할 수 없습니다.");
        gfn_logout();
    }
    else if (browserAgent.indexOf("chrome") != -1 && scrCptPrvntYn == 'N') {
        $a.navigate(fowardUrl);
    }
    else {
        $a.navigate(url);
    }
}


/**
 * MaskInput 처리 (알로펙스가 안되서 만듬)
 */
function gfn_mask($inputText, mask) {

    // 전화번호 처리
    if(mask === 'TelNo') {
        $inputText.on('keyup', function(e) {
            var tempValue = $inputText.val();
            tempValue = tempValue.replace(/[^0-9]/g,'');
            tempValue = tempValue.replace(/(0(?:2|[0-9]{2}))([0-9]+)([0-9]{4}$)/,"$1-$2-$3");
            $inputText.val(tempValue);
        });
    }

}

/**
 * 특수문자 치환
 */
function gfn_convertSpecialChar(str){
     str = str.replace(/</g,"&lt;");
     str = str.replace(/>/g,"&gt;");
     str = str.replace(/\"/g,"&quot;");
     str = str.replace(/\'/g,"&#39;");
     str = str.replace(/&/g,"&amp;");
     return str;
}

/**
 * 사업자등록번호 유효성을 체크
 * 
 * @param obj
 * @returns true:유효, false:무효
 */
function gfn_bizrNoCheck(obj) {
    if (gfn_isNull(obj)) return false;

    var bizNo = obj.replaceAll("-", "");    // 사업자등록번호
    var chkKey = "137137135";                // 인증키 - 고정
    
    // 숫자자 아니거나 10자리가 아니면 무효
    if (!bizNo.isNumber() || bizNo.length != 10) return false;
    
    // 사업자등록번호, 인증키 9자리까지 각 자리수를 곱하여 합을 구한다.
    var tot = 0;
    for (var i=0; i<9; i++) {
        tot += Number(bizNo.substr(i, 1)) * Number(chkKey.substr(i, 1));
        // console.log("bizrNo " + i + " =====> " + Number(bizNo.substr(i, 1)) *
		// Number(chkKey.substr(i, 1)));
    }
    // console.log("bizrNo tot =====> " + tot);
    
    // 9째자리끼리 곱하여 10으로 나눈 몫을 구한다.
    var chkVal = Math.floor((Number(bizNo.substr(8, 1)) * Number(chkKey.substr(8, 1))) / 10);
    // console.log("chkVal =====> " + chkVal);
    
    // 구해진 몫을 합에 더한다.
    tot += chkVal;
    // console.log("bizrNo tot =====> " + tot);
    
    // 합을 10으로 나눈 나머지를 10에서 뺀다.
    var chkDigit = 10 - (tot % 10);
    if (chkDigit == 10) chkDigit = 0;
    // console.log("chkDigit =====> " + chkDigit);
    
    // 사업자등록번호 마지막 값이 구해진 값(chkDigit)과 같으면 유효
    if (Number(bizNo.substr(9, 1)) != chkDigit) return false;
    
    return true;
}


// //////////////// emk-common.js 추가 //////////////////

// getCode()용 TEMP
var _TMP_CODE = {};


// 미사용 함수로 삭제(아래예제로 변경)
// -> dateUtil(value, {return:'yyyy-MM-dd'})
// /**
// * 날짜포맷 YYYY-MM-DD 로 리턴하는 함수
// * @param str
// * @returns {String}
// */
// function setDateFormat(str){
//    
// if(str==undefined || str.length<8){
// return '';
// }
//    
// return dateUtil(str, {return:'yyyy-MM-dd'});
// }




// ## ext-common.js gfn_today() 와 동일 기능
// parameter option 사용 하지 않으면, 해당 함수로 대체 검토 요청

// gfn_today()로 대체예정
// function getToday(option) {
// alert('getToday 을 gfn_today 변경 해주세요');
// return dateUtil(new Date(), {return:'yyyy-MM-dd'});
// };



// ## ext-common.js gfn_comma 와 동일 기능이지만 해당 함수는 사용자 정의 함수(number) 추가 사용
// 확인 요청 -> gfn_comma 변경예정
// /**
// * 숫자에 ,추가
// *
// * setNumberCommaFormat('1234567890')
// * @param str
// * @returns
// */
// function setNumberCommaFormat(str){
// alert('setNumberCommaFormat 을 gfn_comma로 변경 해주세요');
// return number(str, {money:true})
// }


/**
 * 
 * @param _upperCd
 *            코드아이디
 * @param syncType
 *            async : true/false
 * @param successCallBack
 *            콜백함수
 * @param param
 *            추가파라미터
 * @returns
 */
function getCodeList(_upperCd, syncType, successCallBack, param){
    
    switch(_upperCd){
    case 'M_CCPY':// 대상설비코드
            if(param==undefined || gfn_isNull(param.mtrilId)){
                console.log('[mtrilId] 코드가 없습니다.');
                var codeList = [];
                successCallBack(codeList);
                break;
            }
            
            $a.request( '/sft/mst/sftmst015/getItemC01003.json', {
                data: param,
                async : syncType, // 동기
                // callBack함수 정의
                success: function(res){
                    var codeList = [];
                    $.each(res.codeList,function(i,d){
                        codeList.push({'value':d.ccpyId,'text':d.ccpyNm});
                    });
                    successCallBack(codeList);
                    
                },
                
                fail: function(response){
                    console.log("httpRequest fail");
                }
            });
            
            
            break;
    case 'M_TEAM':// 시설보수코드

        /*
		 * if(param==undefined || gfn_isNull(param.mtrilId)){
		 * console.log('mtrilId 코드가 코드가 없습니다.'); var codeList = [];
		 * successCallBack(codeList); break; }
		 */
        
        if(param==undefined || gfn_isNull(param.ccpyId)){
            console.log('ccpyId 코드가 없습니다.');
            var codeList = [];
            successCallBack(codeList);
            break;
        }
        
        $a.request( '/sft/mst/sftmst015/getItemC01004.json', {
            data: param,
            async : syncType, // 동기
            
            // callBack함수 정의
            success: function(res){
                var codeList = [];
                $.each(res.codeList,function(i,d){
                    codeList.push({'value':d.teamId,'text':d.teamNm});
                });
                successCallBack(codeList);
                
            },
            fail: function(response){
                console.log("httpRequest fail");
            }
        });
        
        
        break;
    case 'M_CTGRY':// 대상설비코드
        
        if(param==undefined || gfn_isNull(param.customerCd)){
            console.log('[대상설비코드조회]고객 코드가 없습니다.');
            var codeList = [];
            successCallBack(codeList);
            break;
        }
        
        $a.request( '/sft/sfm/sftsfm023/getListU02002.json', {
            data: param,
            async : syncType, // 동기
            // callBack함수 정의
            success: function(res){
                var codeList = [];
                $.each(res.codeList,function(i,d){
                    codeList.push({'value':d.fcltId,'text':d.ctgryNm});
                });
                successCallBack(codeList);
                
            },
            fail: function(response){
                console.log("httpRequest fail");
            }
        });
        
        
        break;
        case 'M_PRDUCT' :// 제품 (코드 / 텍스트)
// var codeList = [];
// codeList = [
// {value:'C3', text:'프로판'},
// {value:'C4', text:'부탄'},
// {value:'CS', text:'이소부탄'}
// ];
// successCallBack(codeList);
//            
//            
            var parameters = {};

            $a.request( '/getPrductOptionList.json', {
                data: parameters,
                async : syncType, // 동기
                
                // callBack함수 정의
                success: function(res){
                    
                    var prductList = [];
                    
                    $.each(res.prductList,function(i,d){
                        prductList.push({'value':d.prductCd,'text':d.prductNm});
                    });
                    
                    successCallBack(prductList);
                },
                fail: function(response){
                    console.log("httpRequest fail");
                }
            });
            
            
            break;
            
        case 'M_YEAR':// 연도(2016,2017,2018,2019,2020)
            var codeList = [];
            
            for(var i=-2; i<=2; i++){ 
                var year = dateUtil(new Date(), {add:{y:i}, return:'yyyy'});
                
                
                codeList.push({
                    'value':year,
                     'text':year
                });
            }
            
            successCallBack(codeList);
            
            break;
        
        case 'M_MONTH':// 월 01~12
            var codeList = [];
            
            for(var i=1; i<=12; i++) { 
                
                codeList.push({
                    'value':setDigit(i,2),
                     'text':setDigit(i,2)
                });
            }
            
            successCallBack(codeList);
            
            break;
            
        case 'M_HOUR':// 시간 00~23
            var codeList = [];
            
            for(var i=0; i<=23; i++){ 
                
                codeList.push({
                    'value':setDigit(i,2),
                     'text':setDigit(i,2)
                });
            }
            
            successCallBack(codeList);
            
            break;
        case 'M_MINUTE':// 00~59
            
            var codeList = [];
            
            for(var i=0; i<=59; i++){ 
                codeList.push({
                    'value':setDigit(i,2),
                     'text':setDigit(i,2)
                });
            }
            
            successCallBack(codeList);
            break;
        case 'M_DSTRCT':// 소권역코드
            
            
            if(param==undefined || gfn_isNull(param.trnspFoCd)){
                console.log('[소권역코드조회]수송사 코드가 없습니다.');
                var codeList = [];
                successCallBack(codeList);
                break;
            }
                        

            $a.request( '/tms/btm/tmsbtm160/getListI01001.json', {
                data: param,
                async : syncType, // 동기
                
                // callBack함수 정의
                success: function(res){
                    var codeList = [];
                    $.each(res.gridData,function(i,d){
                        codeList.push({'value':d.dstrctCd,'text':d.dstrctNm});
                    });
                    successCallBack(codeList);
                    
                },
                fail: function(response){
                    console.log("httpRequest fail");
                }
            });
            
            
            break;
        case 'M_CARALCTAK':// 배차조 코드
            
            
            if(param==undefined || gfn_isNull(param.trnspFoCd)){
                console.log('[배차조코드조회]수송사 코드가 없습니다.');
                var codeList = [];
                successCallBack(codeList);
                break;
            }
                        

            $a.request( '/tms/btm/tmsbtm220/getListI01001.json', {
                data: param,
                async : syncType, // 동기
                
                // callBack함수 정의
                success: function(res){
                    var codeList = [];
                    $.each(res.gridData,function(i,d){
                        codeList.push({'value':d.caralcTakCd,'text':d.caralcTakNm});
                    });
                    successCallBack(codeList);
                    
                },
                fail: function(response){
                    console.log("httpRequest fail");
                }
            });
            
            
            break;
        
        case 'M_FCLTY_MENDNG':// 시설보수코드

            if(param==undefined || gfn_isNull(param.customerCd)){
                console.log('[시설보수코드]고객 코드가 코드가 없습니다.');
                var codeList = [];
                successCallBack(codeList);
                break;
            }
            
            if(param==undefined || gfn_isNull(param.fcltId)){
                console.log('[시설보수코드]대상설비 코드가 없습니다.');
                var codeList = [];
                successCallBack(codeList);
                break;
            }
            
            $a.request( '/sft/sfm/sftsfm023/getListU02003.json', {
                data: param,
                async : syncType, // 동기
                
                // callBack함수 정의
                success: function(res){
                    var codeList = [];
                    $.each(res.codeList,function(i,d){
                        codeList.push({'value':d.fcltyMendngId,'text':d.brrerLgtff});
                    });
                    successCallBack(codeList);
                    
                },
                fail: function(response){
                    console.log("httpRequest fail");
                }
            });
            
            
            break;
        case 'M_SHIP_CORP':// 해운사 리스트 조회

            $a.request( '/tms/stm/tmsstm110/getListI01001.json', {
                data: param,
                async : syncType, // 동기
                
                // callBack함수 정의
                success: function(res){
                    successCallBack(res.shipCorpList);
                    
                },
                fail: function(response){
                    console.log("httpRequest fail");
                }
            });
            
            
            break;
            
        case 'M_SHIP':// 해운사 선박코드

            $a.request( '/tms/stm/tmsstm110/getListI01002.json', {
                data: param,
                async : syncType, // 동기
                
                // callBack함수 정의
                success: function(res){
                    successCallBack(res.shipList);
                    
                },
                fail: function(response){
                    console.log("httpRequest fail");
                }
            });
            
            
            break;
            
        default :// 코드조회
            var parameters = {
                    upperCd : _upperCd
                };

            $a.request( '/getCommonOptionList.json', {
                data: parameters,
                async : syncType, // 동기
                
                // callBack함수 정의
                success: function(res){
                    successCallBack(res.codeList);
                    
                },
                fail: function(response){
                    console.log("httpRequest fail");
                }
            });
            
        break;
    }
    
    
}

/**
 * defaultCoumnMapping 을 통해 전체 ColumnMapping 속성을 변경 하고자 할때 사용.
 * defaultCoumnMapping은 그리드가 초기화 될 때 columnMapping에 적용되는 객체 이기 때문에
 * updateOption으로 속성 값 변경이 적용 되지 않음.
 * 
 * @param option:
 *            변경할 옵션 값 ex) true, fasle
 * @param optionName:
 *            변경할 옵션 명
 * @return columnMapping
 */
function updateColumnMapping($grid, option, optionName) {
  var columnMapping = $grid.alopexGrid('readOption').columnMapping;
  
  columnMapping.map(function(column, i) {
    // 조건문으로 선별가능
    switch (optionName) {
        case  'headerDragDrop' : 
            column.headerDragDrop = option;
            break;
        case  'headerSorting' : 
            column.sorting = option;
            break;        
        default  :
            break;
    }
                    }, option);
  return columnMapping;
}

/**
 * request custom common
 * 
 * @param serviceId
 * @param serviceUrl
 * @param parameters
 * @param successCallback
 * @param failCallback
 * @param gridId :
 *            결과를 보여줄 화면의 GridId
 * @param syncType :
 *            async 사용 여부, true/null: 비동기, false : 동기방식 호출
 */
function httpRequest(serviceId, serviceUrl, parameters, successCallback, failCallback, gridId, syncType) {
    var gridIds = [];
    if(!gfn_isNull(gridId)){
        if($.isArray(gridId)){
            gridIds = gridId;
        }else{
            gridIds.push(gridId);
        }
    }
    
    console.log(serviceId, parameters);
    
    var syncTy = true;
    if (!gfn_isNull('' + syncType)) syncTy = syncType;
    
    // a.request에 data, array 둘 중 하나만 전달 되어야 함. 2.10.14 수정사항 대응
    var dataParam = parameters;
    var arrayParam = parameters.array;
    
    if (arrayParam) {
        dataParam = null;
    }
    
    
    $a.request( serviceUrl, {
        data  : dataParam,
        array : arrayParam,
        async : syncTy,
        // 전처리, 후처리
        before : function(id, option) {
            
            $.each(gridIds, function(i,d){
                var $gridDiv = $('#'+d);
                
                $gridDiv.alopexGrid('showProgress');  
                // dataSet되고 나서 지우는거랑 확인 필요..
                $gridDiv.find('div[data-sas-valid="0"].bodycell').removeAttr('data-sas-valid'); // 이전
																								// grid
																								// Validation
																								// 속성
																								// 제거
                
            });
        }, 
        after: function(res) {
            
            $.each(gridIds, function(i,d){
                var $gridDiv = $('#'+d);
                $gridDiv.alopexGrid('hideProgress');
            });
        },
        
        // callBack함수 정의
        success: function(response){
            console.log("httpRequest success");
            // 통신이 성공적으로 이루어 진 경우 호출되는 콜백함수
            successCallback(serviceId, response, !gfn_isNull(gridIds[0])?gridIds[0]:null);
        },
        fail: function(response){
            console.log("httpRequest fail");
            // 통신이 성공적으로 이루어 졌으나, 서버오류(500 에러 등)가 발생하여 서버로부터
            // 받은 에러코드가 after 콜백으로 왔을 경우, this.isSuccess=false;로 설정하면 호출되는 콜백
            
            if (typeof failCallback == "undefined" || failCallback == null) {
                gfailCallback(serviceId, response, !gfn_isNull(gridIds[0])?gridIds[0]:null);
            } else {
                failCallback(serviceId, response, !gfn_isNull(gridIds[0])?gridIds[0]:null);
            }
        },
        last: function(res) {
            
            $.each(gridIds, function(i,d){
                var $gridDiv = $('#'+d);
                $gridDiv.alopexGrid('hideProgress');
            });
        }
        
    });
}

/**
 * 공통 팝업 호출 script & global callback
 */


/**
 * 검색 팝업 글로벌 콜백
 * 
 * @param serviceId
 * @param data
 * @returns
 */
function gCallbackPopupAll(serviceId, data) {
    alert("콜백 함수 미정의." + serviceId);
    console.log("data",data);
}

/**
 * 우편번호/주소 검색 팝업 리턴값은 호출한곳의 콜백에서 조합하여 사용
 */
function popupAddress(serviceId, lCallbackPopupAddress) {
    $a.popup({
        popid : 'comPopAddressP',
        url : '/com/pop/address/popup.do',
        width : 600,
        height : 550,
        title : '주소 검색',
        callback : function(data) {
            console.log("data : " , data);
            if (data != null)
                if (typeof lCallbackPopupAddress == "undefined") {
                    gCallbackPopupAddress(serviceId, data);
                } else {
                    lCallbackPopupAddress(serviceId, data);
                }
        }
    });    
}

/**
 * 우편번호/주소 검색 팝업 글로벌 콜백 참조해서 로컬에서 선언해야함
 * 
 * @param serviceId
 * @param data {}
 */
function gCallbackPopupAddress(serviceId, data) {
    alert("콜백 함수 미정의." + serviceId);
    console.log("data",data);
}


/**
 * Root메뉴 ID 조회 메뉴 ID/명으로 해당 메뉴가 존재하는지 조회 결과가 한건일 경우 팝업창 별도로 띄우지 않고 바로 setting
 * 0건 or 2건 이상 일 경우 팝업창 호출
 * 
 * @param serviceId
 * @param menuId
 * @returns
 */
function popupRootMenuInfo(serviceId, searchValue, lCallbackRootMenuInfo) {
    var serviceUrl = '/com/mng/commng003/getListR01001P1.json';
    
    var parameters = { // 조회 조건 등 parameter값 세팅
            // 조회조건 등
            searchValue   : searchValue,
            pageNo        : 1,
            rowPerPage    : 2
    }

    $a.request( serviceUrl, {
        data: parameters,
        async : false,
    
        // 전처리, 후처리
        before : function(id, option) {    
        }, 
        after: function(res) {    
        },
        // callBack함수 정의
        success: function(response){
            if (response.gridData.totalLength == 1) {
                if (typeof lCallbackRootMenuInfo == "undefined") {
                    gCallbackRootMenuInfo(serviceId, response.gridData.list[0]);
                } else {
                    lCallbackRootMenuInfo(serviceId, response.gridData.list[0]);
                }
            } else {    
                $a.popup({
                    popid : 'commng003P1',
                    url : '/com/mng/commng003/r01p.do',
                    data: {"searchValue" :searchValue }, // 전달할 데이터
                    width : 700,
                    height : 550,
                    title : "ROOT메뉴조회",
                    callback : function(data) {
                        if (data != null) {
                            // console.log("data : " , data);
                            if (typeof lCallbackRootMenuInfo == "undefined") {
                                gCallbackRootMenuInfo(serviceId, data);
                            } else {
                                lCallbackRootMenuInfo(serviceId, data);  // 로컬에서
																			// 최초로
																			// 호출할때
																			// 서비스
																			// Id
                            }
                        }
                    }
                });        
            }
        },
        fail: function(response){
            console.log("httpRequest fail");
        }
    });
}

/**
 * ROOT메뉴 팝업 글로벌 콜백
 */
function gCallbackRootMenuInfo(serviceId, data) {
    alert("콜백 함수 미정의." + serviceId);
    console.log("data",data);
}


/**
 * 공통코드 조회 공통 코드 호출 upperCd, searchValue 조건으로 결과가 한건일 경우 팝업창 별도로 띄우지 않고 바로
 * setting 0건 or 2건 이상 일 경우 팝업창 호출. 팝업 호출 시 상위코드 필수 (upperCd)
 * 
 * @param serviceId
 * @param params : {
 *            upperCd : , searchValue : }
 * @param searchTitle
 * @returns
 */
function popupComCode(serviceId, params, searchTitle, lCallbackPopupComCode) {
    var serviceUrl = '/com/pop/compop004/getCodeList.json';
    var parameters = params;    // 조회 조건 등 parameter값 세팅
    parameters.pageNo = 1;
    parameters.rowPerPage = 10;
    parameters.searchTitle = searchTitle;
    // console.log("parameters => " + JSON.stringify(parameters));
    
    $a.request( serviceUrl, {
        data: parameters,
        async : false,
    
        // 전처리, 후처리
        before : function(id, option) {    
        }, 
        after: function(res) {    
        },
        // callBack함수 정의
        success: function(response){
            if (response.gridData.totalLength == 1) {
                if (typeof lCallbackPopupComCode == "undefined") {
                    gCallbackPopupComCode(serviceId, response.gridData.list[0]);
                } else {
                    lCallbackPopupComCode(serviceId, response.gridData.list[0]);
                }
            } else {
                
                if (typeof searchTitle == "undefined" || searchTitle == "") {
                    searchTitle ='공통'; // Title 정의하지 않았을 경우
                }
                
                $a.popup({
                    popid : 'comPop004P',
                    url : '/com/pop/compop004/popup.do',
                    data : parameters, // 전달할 데이터
                    width : 600,
                    height : 713,
                    title : searchTitle + '조회',
                    callback : function(data) {
                        if (data != null)
                            // console.log("data : " , data);
                            if (typeof lCallbackPopupComCode == "undefined") {
                                gCallbackPopupComCode(serviceId, data);
                            } else {
                                lCallbackPopupComCode(serviceId, data);  // 로컬에서
																			// 최초로
																			// 호출할때
																			// 서비스
																			// Id
                            }
                    }
                });    
                
            }
        },
        fail: function(response){
            console.log("httpRequest fail");
        }
    });
}


/**
 * 프로그램 ID 조회 프로그램 ID로 해당 프로그램이 존재하는지 조회 결과가 한건일 경우 팝업창 별도로 띄우지 않고 바로 setting 0건
 * or 2건 이상 일 경우 팝업창 호출
 * 
 * @param serviceId
 * @param menuId
 * @returns
 */
function popupProgramInfo(serviceId, searchValue, lCallbackPopupProgramInfo) {
    var serviceUrl = '/com/mng/commng002/getListR01003P.json';
    
    var parameters = { // 조회 조건 등 parameter값 세팅
            // 조회조건 등
            searchValue   : searchValue,
            pageNo        : 1,
            rowPerPage    : 2
    }

    $a.request( serviceUrl, {
        data: parameters,
        async : false,
    
        // 전처리, 후처리
        before : function(id, option) {    
        }, 
        after: function(res) {    
        },
        // callBack함수 정의
        success: function(response){
            if (response.gridData.totalLength == 1) {
                if (typeof lCallbackPopupProgramInfo == "undefined") {
                    gCallbackPopupProgramInfo(serviceId, response.gridData.list[0]);
                } else {
                    lCallbackPopupProgramInfo(serviceId, response.gridData.list[0]);
                }
            } else {    
                $a.popup({
                    popid : 'commng002P2',
                    url : '/com/mng/commng002/r01p.do',
                    data: {"searchValue" :searchValue }, // 전달할 데이터
                    width : 700,
                    height : 550,
                    title : "프로그램조회",
                    callback : function(data) {
                        if (data != null)
                            // console.log("data : " , data);
                            if (typeof lCallbackPopupProgramInfo == "undefined") {
                                gCallbackPopupProgramInfo(serviceId, data);
                            } else {
                                lCallbackPopupProgramInfo(serviceId, data);  // 로컬에서
																				// 최초로
																				// 호출할때
																				// 서비스
																				// Id
                            }
                    }
                });    
                
            }
        },
        fail: function(response){
            console.log("httpRequest fail");
        }
    });
}

/**
 * 프로그램 검색 팝업 글로벌 콜백
 */
function gCallbackPopupProgramInfo(serviceId, data) {
    alert("콜백 함수 미정의." + serviceId);
    console.log("data",data);
}


/**
 * 공통코드 검색 팝업 글로벌 콜백 참조해서 로컬에서 선언해야함
 * 
 * @param serviceId
 * @param data
 *            {upperCd:'', lwprtCode:'', codeNm:''}
 */
function gCallbackPopupComCode(serviceId, data) {
    alert("콜백 함수 미정의." + serviceId);
    console.log("data",data);

}


/**
 * 고객(거래처) 조회 고객(거래처) 호출 searchValue 조건으로 결과가 한건일 경우 팝업창 별도로 띄우지 않고 바로 setting
 * 0건 or 2건 이상 일 경우 팝업창 호출.
 * 
 * @param serviceId
 * @param params : {
 *            bplcCd : 사업장 , siteCd : 사이트, cusGroupCd : 거래처그룹코드, searchValue : }
 * @returns
 */
function popupCusInfo(serviceId, params, lCallbackPopupCusInfo) {
    var serviceUrl = '/emk/com/emkcom160/getListR01001.json';
    var parameters = params;    // 조회 조건 등 parameter값 세팅
    parameters.pageNo = 1;
    parameters.rowPerPage = 10;
    // console.log("parameters => " + JSON.stringify(parameters));
    // console.log("################ window height ::: " + $(window).height());
    var popHeight = $(window).height() < 723?$(window).height():723;
    // console.log("################ popHeight ::: " + popHeight);
    
    $a.request( serviceUrl, {
        data: parameters,
        async : true,
        // 코드값 입력 후 검색버튼을 눌렀을 경우, 코드에 해당되는 데이터는 한건만 있는데도
        // 명칭으로 검색하여 다건 검색결과가 있기 때문에 팝업이 호출되는 현상 처리하기 위해 수정
        // 예) 1776900 : 에스케이(SK)평택충전소 -> "에스케이(SK)평택충전소" 에 해당되는 데이터가 다건 존재
		// (2018-11-23 현재)
        // by 문창모 2018-11-23
        // async : false,
    
        // 전처리, 후처리
        before : function(id, option) {    
        }, 
        after: function(res) {    
        },
        // callBack함수 정의
        success: function(response){
            if (response.gridData.totalLength == 1) {
                if (typeof lCallbackPopupCusInfo == "undefined") {
                    gCallbackPopupCusInfo(serviceId, response.gridData.list[0]);
                } else {
                    lCallbackPopupCusInfo(serviceId, response.gridData.list[0]);
                }
            } else {
                $a.popup({
                    popid : 'emkcom160p', 
                    url : '/emk/com/emkcom160/emkcom160r01p.do', 
                    data : parameters, // 전달할 데이터
                    width : 750,
                    height : popHeight,
                    title : '고객(거래처)조회',
                    callback : function(data) {
                        if (data != null)
                            // console.log("data : " , data);
                            if (typeof lCallbackPopupCusInfo == "undefined") {
                                gCallbackPopupCusInfo(serviceId, data);
                            } else {
                                lCallbackPopupCusInfo(serviceId, data);  // 로컬에서
																			// 최초로
																			// 호출할때
																			// 서비스
																			// Id
                            }
                    }
                });
            }
        },
        fail: function(response){
            console.log("httpRequest fail");
        }
    });
}

/**
 * 고객(거래처) 검색 팝업 글로벌 콜백 참조해서 로컬에서 선언해야함
 * 
 * @param serviceId
 * @param data
 *            {upperCd:'', lwprtCode:'', codeNm:''}
 */
function gCallbackPopupCusInfo(serviceId, data) {
    // alert("콜백 함수 미정의." + serviceId);
    console.log("data",data);
}

/*******************************************************************************
 * 고객(수요처) 조회 고객(수요처) 호출 searchValue 조건으로 결과가 한건일 경우 팝업창 별도로 띄우지 않고 바로 setting
 * 0건 or 2건 이상 일 경우 팝업창 호출.
 * 
 * @param serviceId
 * @param
 * @param searchType
 * @param searchValue
 * @returns
 */
/*
 * function popupEnduserInfo(serviceId, cusCd, searchNm,
 * lCallbackPopupEnduserInfo) { if (cusCd == null || cusCd == "") { alert("고객사를
 * 먼저 선택해 주세요."); return; }
 * 
 * var serviceUrl = '/emk/com/emkcom180/getListR01001.json'; var parameters = { //
 * 조회 조건 등 parameter값 세팅 //조회조건 등 cusCd : cusCd, searchType : "", // 조회조건
 * searchValue : searchNm, // 조회명 pageNo : 1, rowPerPage : 2 }
 * 
 * $a.request( serviceUrl, { data: parameters, async : false,
 * 
 * //전처리, 후처리 before : function(id, option) { }, after: function(res) { }, //
 * callBack함수 정의 success: function(response){ if (response.gridData.totalLength ==
 * 1) { if (typeof lCallbackPopupEnduserInfo == "undefined") {
 * gCallbackPopupEnduserInfo(serviceId, response.gridData.list[0]); } else {
 * lCallbackPopupEnduserInfo(serviceId, response.gridData.list[0]); } } else {
 * $a.popup({ popid : 'emkcom180p', url : '/emk/com/emkcom180/emkcom180r01p.do',
 * data: {cusCd : cusCd, "searchType" : "", // 조회 조건 "searchValue" : searchNm //
 * 조회조건명 }, width : 900, height : 700, title : '고객(수요처)조회', callback :
 * function(data) { if (data != null) //console.log("data : " , data); if
 * (typeof lCallbackPopupEnduserInfo == "undefined") {
 * gCallbackPopupEnduserInfo(serviceId, data); } else {
 * lCallbackPopupEnduserInfo(serviceId, data); // 로컬에서 최초로 호출할때 서비스 Id } } }); } },
 * fail: function(response){ console.log("httpRequest fail"); } }); }
 */
/**
 * 고객(수요처) 검색 팝업 글로벌 콜백 참조해서 로컬에서 선언해야함
 * 
 * @param serviceId
 * @param data
 *            {upperCd:'', lwprtCode:'', codeNm:''}
 */
/*
 * function gCallbackPopupEnduserInfo(serviceId, data) { //alert("콜백 함수 미정의." +
 * serviceId); console.log("data",data); }
 */
/*******************************************************************************
 * 운전기사 검색 조회 운전기사 호출 searchValue 조건으로 결과가 한건일 경우 팝업창 별도로 띄우지 않고 바로 setting 0건
 * or 2건 이상 일 경우 팝업창 호출.
 * 
 * @param serviceId
 * @param params : {
 *            searchValue : }
 * @returns
 */
function popupDrverInfo(serviceId, params, lCallbackPopupDrverInfo) {
    var serviceUrl = '/emk/com/emkcom130/getListR01001.json';
    var parameters = params;
    parameters.pageNo = 1;
    parameters.rowPerPage = 10;
    // console.log("parameters => " + JSON.stringify(parameters));
    
    $a.request( serviceUrl, {
        data: parameters,
        async : false,
    
        // 전처리, 후처리
        before : function(id, option) {    
        }, 
        after: function(res) {    
        },
        // callBack함수 정의
        success: function(response){
            if (response.gridData.totalLength == 1) {
                if (typeof lCallbackPopupDrverInfo == "undefined") {
                    gCallbackPopupDrverInfo(serviceId, response.gridData.list[0]);
                } else {
                    lCallbackPopupDrverInfo(serviceId, response.gridData.list[0]);
                }
            } else {
                $a.popup({
                    popid : 'emkcom130p', 
                    url   : '/emk/com/emkcom130/emkcom130r01p.do', 
                    data  : parameters,
                    width : 670,
                    height : 713,
                    title : '운전기사 조회',
                    callback : function(data) {
                        if (data != null)
                            // console.log("data : " , data);
                            if (typeof lCallbackPopupDrverInfo == "undefined") {
                                gCallbackPopupDrverInfo(serviceId, data);
                            } else {
                                lCallbackPopupDrverInfo(serviceId, data);  // 로컬에서
																			// 최초로
																			// 호출할때
																			// 서비스
																			// Id
                            }
                    }
                });
            }
        },
        fail: function(response){
            console.log("httpRequest fail");
        }
    });
};

/**
 * 운전기사 검색 팝업 글로벌 콜백 참조해서 로컬에서 선언해야함
 * 
 * @param serviceId
 * @param data
 *            {upperCd:'', lwprtCode:'', codeNm:''}
 */
function gCallbackPopupDrverInfo(serviceId, data) {
    // alert("콜백 함수 미정의." + serviceId);
    console.log("data",data);
};

/*******************************************************************************
 * 납지처 조회 납지처 호출 searchValue 조건으로 결과가 한건일 경우 팝업창 별도로 띄우지 않고 바로 setting 0건 or 2건
 * 이상 일 경우 팝업창 호출.
 * 
 * @param serviceId
 * @param params : {
 *            cusCd : , searchValue : }
 * @returns
 */
function popupKunweInfo(serviceId, params, lCallbackPopupKunweInfo) {
    var serviceUrl = '/emk/com/emkcom120/getListR01001.json'; 
    var parameters = params;
    parameters.pageNo = 1;
    parameters.rowPerPage = 10;
    // console.log("parameters => " + JSON.stringify(parameters));
    
    if (gfn_isNull(parameters.cusCd)) {
        alert('[거래처코드] 정보가 필요합니다.'); 
        return;
    }
    
    $a.request( serviceUrl, {
        data: parameters,
        async : false,
    
        // 전처리, 후처리
        before : function(id, option) {    
        }, 
        after: function(res) {    
        },
        // callBack함수 정의
        success: function(response){
            if (response.gridData.totalLength == 1) {
                if (typeof lCallbackPopupKunweInfo == "undefined") {
                    gCallbackPopupKunweInfo(serviceId, response.gridData.list[0]);
                } else {
                    lCallbackPopupKunweInfo(serviceId, response.gridData.list[0]);
                }
            } else {
                $a.popup({
                    popid : 'emkcom120p', 
                    url : '/emk/com/emkcom120/emkcom120r01p.do', 
                    data: parameters,     // 전달할 데이타
                    width : 900,
                    height : 713,
                    title : '납지처 검색',
                    callback : function(data) {
                        if (data != null)
                            // console.log("data : " , data);
                            if (typeof lCallbackPopupKunweInfo == "undefined") {
                                gCallbackPopupKunweInfo(serviceId, data);
                            } else {
                                lCallbackPopupKunweInfo(serviceId, data);  // 로컬에서
																			// 최초로
																			// 호출할때
																			// 서비스
																			// Id
                            }
                    }
                });
            }
        },
        fail: function(response){
            console.log("httpRequest fail");
        }
    });
}

/**
 * 납지처 검색 팝업 글로벌 콜백 참조해서 로컬에서 선언해야함
 * 
 * @param serviceId
 * @param data
 *            {upperCd:'', lwprtCode:'', codeNm:''}
 */
function gCallbackPopupKunweInfo(serviceId, data) {
    // alert("콜백 함수 미정의." + serviceId);
    console.log("data",data);
}

/*******************************************************************************
 * 실납지처 조회 실납지처 호출 searchValue 조건으로 결과가 한건일 경우 팝업창 별도로 띄우지 않고 바로 setting 0건 or
 * 2건 이상 일 경우 팝업창 호출.
 * 
 * @param serviceId
 * @param params : {
 *            cusCd : , searchValue : }
 * @returns
 */
function popupSilKunweInfo(serviceId, params, lCallbackPopupSilKunweInfo) {
    var serviceUrl = '/emk/com/emkcom150/getListR01001.json'; 
    var parameters = params;
    parameters.pageNo = 1;
    parameters.rowPerPage = 10;
    // console.log("parameters => " + JSON.stringify(parameters));

    if (gfn_isNull(parameters.cusCd)) {
        alert('[거래처코드] 정보가 필요합니다.'); 
        return;
    }
    
    $a.request( serviceUrl, {
        data: parameters,
        async : false,
    
        // 전처리, 후처리
        before : function(id, option) {    
        }, 
        after: function(res) {    
        },
        // callBack함수 정의
        success: function(response){
            if (response.gridData.totalLength == 1) {
                if (typeof lCallbackPopupSilKunweInfo == "undefined") {
                    gCallbackPopupSilKunweInfo(serviceId, response.gridData.list[0]);
                } else {
                    lCallbackPopupSilKunweInfo(serviceId, response.gridData.list[0]);
                }
            } else {
                $a.popup({
                    popid : 'emkcom150p', 
                    url : '/emk/com/emkcom150/emkcom150r01p.do', 
                    data: parameters,     // 전달할 데이타
                    width : 900,
                    height : 713,
                    title : '실납지처 검색',
                    callback : function(data) {
                        if (data != null)
                            console.log("data : " , data);
                            if (typeof lCallbackPopupSilKunweInfo == "undefined") {
                                gCallbackPopupSilKunweInfo(serviceId, data);
                            } else {
                                lCallbackPopupSilKunweInfo(serviceId, data);  // 로컬에서
																				// 최초로
																				// 호출할때
																				// 서비스
																				// Id
                            }
                    }
                });
            }
        },
        fail: function(response){
            console.log("httpRequest fail");
        }
    });
}

/**
 * 실납지처 검색 팝업 글로벌 콜백 참조해서 로컬에서 선언해야함
 * 
 * @param serviceId
 * @param data
 *            {upperCd:'', lwprtCode:'', codeNm:''}
 */
function gCallbackPopupSilKunweInfo(serviceId, data) {
    // alert("콜백 함수 미정의." + serviceId);
    console.log("data",data);
}     

/*******************************************************************************
 * 판매점 조회 판매점 호출 cusCd, searchValue 조건으로 결과가 한건일 경우 팝업창 별도로 띄우지 않고 바로 setting 0건
 * or 2건 이상 일 경우 팝업창 호출. 팝업 호출 시 거래처코드 필수 (cusCd)
 * 
 * @param serviceId
 * @param params : {
 *            cusCd : , searchValue : , cusChk : (필수아님) 거래처코드 필수체인 경우 Y}
 * @returns
 */
function popupAgentInfo(serviceId, params, lCallbackPopupAgentCode) {
    var serviceUrl = '/emk/com/emkcom170/getListR01001.json';
    var parameters = params;
    parameters.pageNo = 1;
    parameters.rowPerPage = 10;
    // console.log("parameters => " + JSON.stringify(parameters));
    var validText = "거래처코드";
    if (!gfn_isNull(parameters.validText)) validText = parameters.validText;  
    
    if (!gfn_isNull(parameters.cusChk)){
        if (gfn_isNull(parameters.cusCd)) {
            alert('[' + validText + '] 정보가 필요합니다.'); 
            return;
        }        
    }
    
    $a.request( serviceUrl, {
        data  : parameters,
        async : true,
        // 코드값 입력 후 검색버튼을 눌렀을 경우, 코드에 해당되는 데이터는 한건만 있는데도
        // 명칭으로 검색하여 다건 검색결과가 있기 때문에 팝업이 호출되는 현상 처리하기 위해 수정
        // 예) 1776900 : 에스케이(SK)평택충전소 -> "에스케이(SK)평택충전소" 에 해당되는 데이터가 다건 존재
		// (2018-11-23 현재)
        // by 문창모 2018-11-23
        // async : false,
    
        // 전처리, 후처리
        before : function(id, option) {    
        }, 
        after  : function(res) {    
        },
        // callBack함수 정의
        success : function(response){
            if (response.gridData.totalLength == 1) {
                if (typeof lCallbackPopupAgentCode == "undefined") {
                    gCallbackPopupAgentCode(serviceId, response.gridData.list[0]);
                } else {
                    lCallbackPopupAgentCode(serviceId, response.gridData.list[0]);
                }
            } else {
                $a.popup({
                    popid : 'emkcom170',
                    url   : '/emk/com/emkcom170/emkcom170r01p.do',
                    data  : parameters, // 전달할 데이터
                    width : 900,
                    height: 713,
                    title : '판매점 검색',
                    callback : function(data) {
                        if (data != null) {
                            // console.log("data : " , data);
                            if (typeof lCallbackPopupAgentCode == "undefined") {
                                gCallbackPopupAgentCode(serviceId, data);
                            } else {
                                lCallbackPopupAgentCode(serviceId, data);  // 로컬에서
																			// 최초로
																			// 호출할때
																			// 서비스
																			// Id
                            }
                        }
                    }
                });    
                
            }
        },
        fail : function(response){
            console.log("httpRequest fail");
        }
    });
}

/**
 * 판매점 검색 팝업 글로벌 콜백 참조해서 로컬에서 선언해야함
 * 
 * @param serviceId
 * @param data
 *            {upperCd:'', lwprtCode:'', codeNm:''}
 */
function gCallbackPopupAgentCode(serviceId, data) {
    // alert("콜백 함수 미정의." + serviceId);
    console.log("data",data);
}     


/*******************************************************************************
 * 차량번호 조회 차량번호 호출 vhcleTy(차량유형), searchValue 조건으로 결과가 한건일 경우 팝업창 별도로 띄우지 않고 바로
 * setting 0건 or 2건 이상 일 경우 팝업창 호출. 팝업 호출 시 거래처코드 필수 (cusCd)
 * 
 * @param serviceId
 * @param params : {
 *            vhcleTy : , tlYn : , blYn :, searchValue : }
 * @returns
 */
function popupVehicleInfo(serviceId, params, lCallbackPopupVehicleCode) {
    var serviceUrl = '/emk/com/emkcom140/getListR01001.json';
    var parameters = params;
    parameters.pageNo = 1;
    parameters.rowPerPage = 10;
    // console.log("parameters => " + JSON.stringify(parameters));
    
    $a.request( serviceUrl, {
        data  : parameters,
        async : false,
    
        // 전처리, 후처리
        before : function(id, option) {    
        }, 
        after  : function(res) {    
        },
        // callBack함수 정의
        success : function(response){
            if (response.gridData.totalLength == 1) {
                if (typeof lCallbackPopupVehicleCode == "undefined") {
                    gCallbackPopupVehicleCode(serviceId, response.gridData.list[0]);
                } else {
                    lCallbackPopupVehicleCode(serviceId, response.gridData.list[0]);
                }
            } else {
                $a.popup({
                    popid : 'emkcom140',
                    url   : '/emk/com/emkcom140/emkcom140r01p.do',
                    data  : parameters, // 전달할 데이터
                    width : 900,
                    height: 713,
                    title : '차량번호 검색',
                    callback : function(data) {
                        if (data != null) {
                            // console.log("data : " , data);
                            if (typeof lCallbackPopupVehicleCode == "undefined") {
                                gCallbackPopupVehicleCode(serviceId, data);
                            } else {
                                lCallbackPopupVehicleCode(serviceId, data);  // 로컬에서
																				// 최초로
																				// 호출할때
																				// 서비스
																				// Id
                            }
                        }
                    }
                });    
                
            }
        },
        fail : function(response){
            console.log("httpRequest fail");
        }
    });
}

/**
 * 차량검색 팝업 글로벌 콜백 참조해서 로컬에서 선언해야함
 * 
 * @param serviceId
 * @param data
 *            {upperCd:'', lwprtCode:'', codeNm:''}
 */
function gCallbackPopupVehicleCode(serviceId, data) {
    // alert("콜백 함수 미정의." + serviceId);
    console.log("data",data);
}     


/*******************************************************************************
 * 수요처 조회 수요처 호출 searchValue 조건으로 결과가 한건일 경우 팝업창 별도로 띄우지 않고 바로 setting 0건 or 2건
 * 이상 일 경우 팝업창 호출.
 * 
 * @param serviceId
 * @param params : {
 *            cusCd : , agentCd :[필수아님], searchValue :, cusChk : (필수아님) 거래처코드
 *            필수체인 경우 Y }
 * @returns
 */
function popupEnduserInfo(serviceId, params, lCallbackPopupEnduserInfo) {
    var serviceUrl = '/emk/com/emkcom180/getListR01001.json';
    var parameters = params;
    parameters.pageNo = 1;
    parameters.rowPerPage = 10;
    // console.log("parameters => " + JSON.stringify(parameters));
    
    // 20180823 거래코드가 없이도 검색될수 있도록 수정
    if (!gfn_isNull(parameters.cusChk)){
        if (gfn_isNull(parameters.cusCd)) {
            alert('[거래처코드(고객)] 정보가 필요합니다.'); 
            return;
        }        
    }
    
    $a.request( serviceUrl, {
        data: parameters,
        async : true,
        // 코드값 입력 후 검색버튼을 눌렀을 경우, 코드에 해당되는 데이터는 한건만 있는데도
        // 명칭으로 검색하여 다건 검색결과가 있기 때문에 팝업이 호출되는 현상 처리하기 위해 수정
        // 예) 1776900 : 에스케이(SK)평택충전소 -> "에스케이(SK)평택충전소" 에 해당되는 데이터가 다건 존재
		// (2018-11-23 현재)
        // by 문창모 2018-11-23
        // async : false,
    
        // 전처리, 후처리
        before : function(id, option) {    
        }, 
        after: function(res) {    
        },
        // callBack함수 정의
        success: function(response){
            if (response.gridData.totalLength == 1) {
                if (typeof lCallbackPopupEnduserInfo == "undefined") {
                    gCallbackPopupEnduserInfo(serviceId, response.gridData.list[0]);
                } else {
                    lCallbackPopupEnduserInfo(serviceId, response.gridData.list[0]);
                }
            } else {
                $a.popup({
                    popid : 'emkcom180p', 
                    url   : '/emk/com/emkcom180/emkcom180r01p.do', 
                    data  : parameters,
                    width : 900,
                    height : 713,
                    title : '수요처조회',
                    callback : function(data) {
                        if (data != null)
                            // console.log("data : " , data);
                            if (typeof lCallbackPopupEnduserInfo == "undefined") {
                                gCallbackPopupEnduserInfo(serviceId, data);
                            } else {
                                lCallbackPopupEnduserInfo(serviceId, data);  // 로컬에서
																				// 최초로
																				// 호출할때
																				// 서비스
																				// Id
                            }
                    }
                });
            }
        },
        fail: function(response){
            console.log("httpRequest fail");
        }
    });
}

/**
 * 수요처검색 팝업 글로벌 콜백 참조해서 로컬에서 선언해야함
 * 
 * @param serviceId
 * @param data
 *            {upperCd:'', lwprtCode:'', codeNm:''}
 */
function gCallbackPopupEnduserInfo(serviceId, data) {
    // alert("콜백 함수 미정의." + serviceId);
    console.log("data",data);
}


/*******************************************************************************
 * 사이트 검색 팝업 searchValue 조건으로 결과가 한건일 경우 팝업창 별도로 띄우지 않고 바로 setting 0건 or 2건 이상 일
 * 경우 팝업창 호출. 팝업 호출 시 거래처코드 필수 (cusCd)
 * 
 * @param serviceId
 * @param params : {
 *            searchValue : }
 * @returns
 */
function popupSiteInfo(serviceId, params, lCallbackPopupSiteCode) {
    var serviceUrl = '/emk/com/emkcom250/getListR01001.json';
    var parameters = params;
    parameters.pageNo = 1;
    parameters.rowPerPage = 10;
    
    var popHeight = $(window).height() < 700?$(window).height():700;

    $a.request( serviceUrl, {
        data  : parameters,
        async : false,
    
        // 전처리, 후처리
        before : function(id, option) {    
        }, 
        after  : function(res) {    
        },
        // callBack함수 정의
        success : function(response){
            if (response.gridData.totalLength == 1) {
                if (typeof lCallbackPopupSiteCode == "undefined") {
                    gCallbackPopupSiteCode(serviceId, response.gridData.list[0]);
                } else {
                    lCallbackPopupSiteCode(serviceId, response.gridData.list[0]);
                }
            } else {
                $a.popup({
                    popid : 'emkcom250',
                    url   : '/emk/com/emkcom250/emkcom250r01p.do',
                    data  : parameters,    // 전달할 데이터
                    width : 900,
                    height: popHeight,
                    title : '사이트 검색',
                    callback : function(data) {
                        if (data != null) {
                            // console.log("data : " , data);
                            if (typeof lCallbackPopupSiteCode == "undefined") {
                                gCallbackPopupSiteCode(serviceId, data);
                            } else {
                                lCallbackPopupSiteCode(serviceId, data);  // 로컬에서
																			// 최초로
																			// 호출할때
																			// 서비스
																			// Id
                            }
                        }
                    }
                });    
                
            }
        },
        fail : function(response){
            console.log("httpRequest fail");
        }
    });
}

/**
 * 사이트 팝업 글로벌 콜백 참조해서 로컬에서 선언해야함
 * 
 * @param serviceId
 * @param data
 *            {upperCd:'', lwprtCode:'', codeNm:''}
 */
function gCallbackPopupSiteCode(serviceId, data) {
    // alert("콜백 함수 미정의." + serviceId);
    console.log("data",data);
}



/*******************************************************************************
 * 회원 조회 팝업 searchValue 조건으로 결과가 한건일 경우 팝업창 별도로 띄우지 않고 바로 setting 0건 or 2건 이상 일
 * 경우 팝업창 호출. 팝업 호출 시 거래처코드 필수 (cusCd)
 * 
 * @param serviceId
 * @param params : {
 *            searchValue : }
 * @returns
 */
function popupUserInfo(serviceId, params, lCallbackPopupUserInfo) {
    var serviceUrl = '/com/pop/compop001/getListR01001P.json';
    var parameters = params;
    parameters.pageNo = 1;
    parameters.rowPerPage = 10;
    
    var popHeight = $(window).height() < 700?$(window).height():700;

    $a.request( serviceUrl, {
        data  : parameters,
        async : false,
    
        // 전처리, 후처리
        before : function(id, option) {    
        }, 
        after  : function(res) {    
        },
        // callBack함수 정의
        success : function(response){
            if (response.gridData.totalLength == 1) {
                if (typeof lCallbackPopupUserInfo == "undefined") {
                    gCallbackPopupUserInfo(serviceId, response.gridData.list[0]);
                } else {
                    lCallbackPopupUserInfo(serviceId, response.gridData.list[0]);
                }
            } else {
                $a.popup({
                    popid : 'compop001r01',
                    url   : '/com/pop/compop001/r01p.do',
                    data  : parameters,    // 전달할 데이터
                    width : 900,
                    height: popHeight,
                    title : '회원 검색',
                    callback : function(data) {
                        if (data != null) {
                            // console.log("data : " , data);
                            if (typeof lCallbackPopupUserInfo == "undefined") {
                                gCallbackPopupUserInfo(serviceId, data);
                            } else {
                                lCallbackPopupUserInfo(serviceId, data);  // 로컬에서
																			// 최초로
																			// 호출할때
																			// 서비스
																			// Id
                            }
                        }
                    }
                });    
            }
        },
        fail : function(response){
            console.log("httpRequest fail");
        }
    });
}

/**
 * 회원조회 팝업 글로벌 콜백 참조해서 로컬에서 선언해야함
 * 
 * @param serviceId
 * @param data
 *            {upperCd:'', lwprtCode:'', codeNm:''}
 */
function gCallbackPopupUserInfo(serviceId, data) {
    // alert("콜백 함수 미정의." + serviceId);
    console.log("data",data);
}

/*******************************************************************************
 * 주소 조회 MAP
 * 
 * @param searchValue
 * @returns
 */
function popupAddressMapInfo(searchValue) {
    if (searchValue=='') {
        alert('[주소] 정보가 필요합니다.'); 
        return;
    }
    
    $a.popup({
        popid : 'comPopAddressMapP',
        url   : '/com/pop/address/comPopAddressMapP.do',
        data  : {
                "searchValue"         : searchValue }, // 전달할 데이터
        width : 900,
        height: 700,
        title : '주소 검색 MAP',
        callback : function(data) {
        }
    });
}

/*******************************************************************************
 * 좌표 조회 MAP
 * 
 * @param lat(위도)
 * @param lng(경도)
 * @returns
 */
function popupCoordinateMapInfo(lat, lng) {
    if (lat=='' || lng=='') {
        alert('[위,경도] 정보가 필요합니다.'); 
        return;
    }
    
    $a.popup({
        popid : 'comPopCoordinateMapP',
        url   : '/com/pop/address/comPopCoordinateMapP.do',
        data  : {
                "lat"         : lat,
                "lng"        :lng}, // 전달할 데이터
        width : 900,
        height: 700,
        title : '좌표 검색 MAP',
        callback : function(data) {
        }
    });
}

/*******************************************************************************
 * 협력업체 조회 협력업체 호출 ccpyClCd(협력업체코드), searchValue 조건으로 결과가 한건일 경우 팝업창 별도로 띄우지 않고
 * 바로 setting 0건 or 2건 이상 일 경우 팝업창 호출. 팝업 호출 시 협력업체코드필수 (ccpyClCd)
 * 
 * @param serviceId
 * @param params : {
 *            vhcleTy : , searchValue : }
 * @returns
 */
function popupCprInfo(serviceId, params, lCallbackPopupCprInfo) {
    var serviceUrl = '/sup/sci/supsci100/getListR01001.json';
    var parameters = params;
    parameters.pageNo = 1;
    parameters.rowPerPage = 10;
    // console.log("parameters => " + JSON.stringify(parameters));

    if (gfn_isNull(parameters.ccpyClCd)) {
        alert('[협력업체유형코드] 정보가 필요합니다.'); 
        return;
    }

    $a.request( serviceUrl, {
        data: parameters,
        async : false,
    
        // 전처리, 후처리
        before : function(id, option) {    
        }, 
        after: function(res) {    
        },
        // callBack함수 정의
        success: function(response){
            if (response.gridData.totalLength == 1) {
                if (typeof lCallbackPopupCprInfo == "undefined") {
                    gCallbackPopupCprInfo(serviceId, response.gridData.list[0]);
                } else {
                    lCallbackPopupCprInfo(serviceId, response.gridData.list[0]);
                }
            } else {
                $a.popup({
                    popid : 'supsci100r01p', 
                    url : '/sup/sci/supsci100/supsci100r01p.do', 
                    data: parameters,
                    width : 530,
                    height : 713,
                    title : '협력업체 조회',
                    callback : function(data) {
                        if (data != null)
                            if (typeof lCallbackPopupCprInfo == "undefined") {
                                gCallbackPopupCprInfo(serviceId, data);
                            } else {
                                lCallbackPopupCprInfo(serviceId, data);  // 로컬에서
																			// 최초로
																			// 호출할때
																			// 서비스
																			// Id
                            }
                    }
                });
            }
        },
        fail: function(response){
            console.log("httpRequest fail");
        }
    });
}

/**
 * 협력업체 검색 팝업 글로벌 콜백 참조해서 로컬에서 선언해야함
 * 
 * @param serviceId
 * @param data
 */
function gCallbackPopupCprInfo(serviceId, data) {
    // alert("콜백 함수 미정의." + serviceId);
    console.log("data",data);
}

/*******************************************************************************
 * 탱크 조회 탱크 호출 enduserCd, searchValue 조건으로 결과가 한건일 경우 팝업창 별도로 띄우지 않고 바로 setting
 * 0건 or 2건 이상 일 경우 팝업창 호출. 팝업 호출 시 거래처코드 필수 (cusCd)
 * 
 * @param serviceId
 * @params { enduserCd : enduserCd, useYn : useYn, searchType : searchType,
 *         searchValue : searchValue }
 * @returns
 */
function popupTankInfo(serviceId, params, lCallbackPopupTankCode) {
    var serviceUrl = '/emk/com/emkcom260/getListR01001.json';
    var parameters = params;
    parameters.pageNo = 1;
    parameters.rowPerPage = 10;
    // console.log("parameters => " + JSON.stringify(parameters));

    $a.request( serviceUrl, {
        data  : parameters,
        async : false,
    
        // 전처리, 후처리
        before : function(id, option) {    
        }, 
        after  : function(res) {    
        },
        // callBack함수 정의
        success : function(response){
            if (response.gridData.totalLength == 1) {
                if (typeof lCallbackPopupTankCode == "undefined") {
                    gCallbackPopupTankCode(serviceId, response.gridData.list[0]);
                } else {
                    lCallbackPopupTankCode(serviceId, response.gridData.list[0]);
                }
            } else {
                $a.popup({
                    popid : 'emkcom260',
                    url   : '/emk/com/emkcom260/emkcom260r01p.do',
                    data  : parameters,
                    width : 900,
                    height: 693,
                    title : 'TANK 검색',
                    callback : function(data) {
                        if (data != null) {
                            // console.log("data : " , data);
                            if (typeof lCallbackPopupTankCode == "undefined") {
                                gCallbackPopupTankCode(serviceId, data);
                            } else {
                                lCallbackPopupTankCode(serviceId, data);  // 로컬에서
																			// 최초로
																			// 호출할때
																			// 서비스
																			// Id
                            }
                        }
                    }
                });    
                
            }
        },
        fail : function(response){
            console.log("httpRequest fail");
        }
    });
}

/**
 * 판매점 검색 팝업 글로벌 콜백 참조해서 로컬에서 선언해야함
 * 
 * @param serviceId
 * @param data
 *            {upperCd:'', lwprtCode:'', codeNm:''}
 */
function gCallbackPopupTankCode(serviceId, data) {
    // alert("콜백 함수 미정의." + serviceId);
    console.log("data",data);
}     


// ## sas-popup 으로 이동요청
/**
 * 수요처 현황 조회 팝업
 * 
 * @param enduserCd
 * @returns
 * 
 * popupEnduserDetail('0011032799');
 */
function popupEnduserDetail(enduserCd){
    $a.popup({
        popid : 'emkbor121r01p', 
        url : '/emk/bor/emkbor121/r01.do', 
        data: {    "enduserCd"        : enduserCd},
        width : 1000,
        height : 700,
        title : '수요처 현황 조회',
        callback : function(data) {
            
        }
    });
}

/*******************************************************************************
 * 2차수송사 조회 2차수송사 호출 trnspFoCd, searchValue 조건으로 결과가 한건일 경우 팝업창 별도로 띄우지 않고 바로
 * setting 0건 or 2건 이상 일 경우 팝업창 호출. 팝업 호출 시 수송사코드 필수 (cusCd)
 * 
 * @param serviceId
 * @params { trnspFoCd : trnspFoCd, scdTrnspFoCd : scdTrnspFoCd, searchValue :
 *         searchValue }
 * @returns
 */
function popupScdTrnspInfo(serviceId, params, lCallbackPopupScdTrnspCode) {
    var serviceUrl = '/tms/ttm/tmsttm100/getListL01001.json';
    var parameters = params;
    parameters.pageNo = 1;
    parameters.rowPerPage = 10;
    // console.log("parameters => " + JSON.stringify(parameters));

    $a.request( serviceUrl, {
        data  : parameters,
        async : false,
    
        // 전처리, 후처리
        before : function(id, option) {    
        }, 
        after  : function(res) {    
        },
        // callBack함수 정의
        success : function(response){
            // if (response.gridData.totalLength == 1) {
            if (response.gridData.list.length == 1) {
                if (typeof lCallbackPopupScdTrnspCode == "undefined") {
                    gCallbackPopupScdTrnspCode(serviceId, response.gridData.list[0]);
                } else {
                    lCallbackPopupScdTrnspCode(serviceId, response.gridData.list[0]);
                }
            } else {
                $a.popup({
                    popid : 'tmsttm100l01p', 
                    url   : '/tms/ttm/tmsttm100/l01.do', 
                    data  : parameters,
                    width : 900,
                    height: 693,
                    title : '2차 수송사 검색',
                    callback : function(data) {
                        if (data != null) {
                            // console.log("data : " , data);
                            if (typeof lCallbackPopupScdTrnspCode == "undefined") {
                                gCallbackPopupScdTrnspCode(serviceId, data);
                            } else {
                                lCallbackPopupScdTrnspCode(serviceId, data);  // 로컬에서
																				// 최초로
																				// 호출할때
																				// 서비스
																				// Id
                            }
                        }
                    }
                });    
                
            }
        },
        fail : function(response){
            console.log("httpRequest fail");
        }
    });
}

/**
 * 2차수송사 검색 팝업 글로벌 콜백 참조해서 로컬에서 선언해야함
 * 
 * @param serviceId
 * @param data
 *            {upperCd:'', lwprtCode:'', codeNm:''}
 */
function gCallbackPopupScdTrnspFoCode(serviceId, data) {
    // alert("콜백 함수 미정의." + serviceId);
    console.log("data",data);
}

/*******************************************************************************
 * 소권역 관리 팝업 팝업 호출 시 수송사코드 필수 (trnspFoCd)
 * 
 * @param serviceId
 * @param params : {
 *            trnspFoCd :'수송사코드' }
 * @returns
 */
function popupDstrctMng(serviceId, params, lCallback) {
    
    if(gfn_isNull(params.trnspFoCd)){
        alert('수송사코드가 필요 합니다.');
        return;
    }
    
    var parameters = params;
    var popHeight = $(window).height() < 700?$(window).height():700;
    $a.popup({
        popid : 'tmsbtm160p',
        url   : '/tms/btm/tmsbtm160/i01p.do',
        data  : parameters,    // 전달할 데이터
        width : 550,
        height: popHeight,
        title : '소권역 관리',
        callback : function(data) {
            // console.log("data : " , data);
            if (typeof lCallback == "undefined") {
                gCallbackPopupAll(serviceId, data);
            } else {
                lCallback(serviceId, data);  // 로컬에서 최초로 호출할때 서비스 Id
            }
        }
    });    
}


/*******************************************************************************
 * 배차조 관리 팝업 팝업 호출 시 수송사코드 필수 (trnspFoCd)
 * 
 * @param serviceId
 * @param params : {
 *            trnspFoCd :'수송사코드' }
 * @returns
 */
function popupCaralcTakMng(serviceId, params, lCallback) {
    
    if(gfn_isNull(params.trnspFoCd)){
        alert('수송사코드가 필요 합니다.');
        return;
    }
    
    var parameters = params;
    var popHeight = $(window).height() < 700?$(window).height():700;
    $a.popup({
        popid : 'tmsbtm161',
        url   : '/tms/btm/tmsbtm220/i01p.do',
        data  : parameters,    // 전달할 데이터
        width : 550,
        height: popHeight,
        title : '배차조 관리',
        callback : function(data) {
            // console.log("data : " , data);
            if (typeof lCallback == "undefined") {
                gCallbackPopupAll(serviceId, data);
            } else {
                lCallback(serviceId, data);  // 로컬에서 최초로 호출할때 서비스 Id
            }
        }
    });    
}


/**
 * 그리드에서 일반 첨부팝업을 호출하여 콜백에서 [첨부그룹순번] 까지 세팅
 */
function gfnGridAttachPopup(gridId, _key, _row, atchGroupSn, sourcTable, readOnly) {
    var params = {"sourcTable" :sourcTable, "atchGroupSn":atchGroupSn, "atchType":"all", "readOnly":readOnly };
    popupFileAttach("popupAttach", params,  
            function(serviceId, data) {
                // console.log("grid Callback", data);
                  // $('#popupComCode #atchGroupSn').val(data.atchGroupSn);
                  if (!gfn_isNull(data)) {
// var keyStr = '{"'+_key+'":"'+data.atchGroupSn+'"}';
// var keyJson = JSON.parse(keyStr);
                      var keyJson = {};
                      keyJson[_key] = data.atchGroupSn;
                      console.log("keyJson",keyJson);
                      $('#'+gridId).alopexGrid('dataEdit',keyJson,{_index:{row:_row}});
                      $('#'+gridId).data("fileInfo", data);
                  }
            }
    );
}

/**
 * 그리드에서 이미지 첨부팝업을 호출하여 콜백에서 [첨부그룹순번] 까지 세팅
 */
function gfnGridImagePopup(gridId, _key, _row, atchGroupSn, sourcTable, readOnly) {
    var params = {"sourcTable" :sourcTable, "atchGroupSn":atchGroupSn, "atchType":"image", "readOnly":readOnly };
    popupFileAttach("popupAttach", params,  
            function(serviceId, data) {
                // console.log("grid Callback", data);
                  // $('#popupComCode #atchGroupSn').val(data.atchGroupSn);
                  if (!gfn_isNull(data)) {
// var keyStr = '{"'+_key+'":"'+data.atchGroupSn+'"}';
// var keyJson = JSON.parse(keyStr);
                      var keyJson = {};
                      keyJson[_key] = data.atchGroupSn;
                      console.log("keyJson",keyJson);
                      $('#'+gridId).alopexGrid('dataEdit',keyJson,{_index:{row:_row}});
                      $('#'+gridId).data("fileInfo", data);
                  }
            }
    );
}

/**
 * 첨부파일 팝업을 호출
 * 
 * @deplicated popupFileAttach
 */
function popupAttach(serviceId, atchGroupSn, sourcTable, lCallbackPopup) {
    $a.popup({
        popid : 'popupAttach',
        url : '/attach/popup.do',
        data: {"sourcTable" :sourcTable, "atchGroupSn":atchGroupSn }, // 전달할
																		// 데이터
        width : 600,
        height : 270+66,
        title : '첨부파일',
        callback : function(data) {
            console.log("data : " , data);
            if (!gfn_isNull(data))
                if (gfn_isNull(lCallbackPopup)) {
                    gCallbackPopupAll(serviceId, data);
                } else {
                    lCallbackPopup(serviceId, data);
                }
        }
    });
}

/**
 * 첨부파일 팝업을 호출
 * 
 * @param serviceId
 * @param params :
 *            {"sourcTable" :sourcTable, "atchGroupSn":atchGroupSn,
 *            "atchType":atchType, "readOnly":readOnly} sourcTable : 업무테이블명
 *            atchGroupSn : 첨부파일 그룹순번 atchType : default(all) 첨부파일 유형(all:가능한전체,
 *            image:이미지파일만) readOnly : default(N) 첨부 추가/수정/삭제 불가 여부(Y:추가/수정/삭제
 *            불가, N:권한에 따른 추가/수정/삭제 가능)
 * @param lCallbackPopup
 * @returns data
 */
function popupFileAttach(serviceId, params, lCallbackPopup) {
    var popupAttach = $a.popup({
        popid : 'popupAttach',
        url : '/attach/popup.do',
        data: params, // 전달할 데이터
        width : 600,
        height : 302,
        title : '첨부파일',
        callback : function(data) {
            console.log("data : " , data);
            if (!gfn_isNull(data))
                if (gfn_isNull(lCallbackPopup)) {
                    gCallbackPopupAll(serviceId, data);
                } else {
                    lCallbackPopup(serviceId, data);
                }
        }
    });
}



/*******************************************************************************
 * 안전점검 자재 품명 조회
 * 
 * @param serviceId
 * @param params : {
 *            schdulId : , ccpyId : , teamId : }
 * @returns
 */
function popupMtrilInfo(serviceId, params, lCallbackPopupAgentCode) {
    alert(1);
    var serviceUrl = '/sft/mst/sftmst007/getListR03001.json';    
    var parameters = params;
    parameters.pageNo = 1;
    parameters.rowPerPage = 10;
        
    $a.request( serviceUrl, {
        data  : parameters,
        async : false,
    
        // 전처리, 후처리
        before : function(id, option) {    
        }, 
        after  : function(res) {    
        },
        // callBack함수 정의
        success : function(response){
            if (response.gridData.totalLength == 1) {
                if (typeof lCallbackPopupAgentCode == "undefined") {
                    gCallbackPopupAgentCode(serviceId, response.gridData.list[0]);
                } else {
                    lCallbackPopupAgentCode(serviceId, response.gridData.list[0]);
                }
            } else {
                $a.popup({
                    popid : 'sftmst007',
                    url : '/sft/mst/sftmst007/r03p.do',
                    
                    data  : parameters, // 전달할 데이터
                    width : 900,
                    height: 713,
                    title : '안전점검 자재 품명 검색',
                    callback : function(data) {
                        if (data != null) {
                            // console.log("data : " , data);
                            if (typeof lCallbackPopupAgentCode == "undefined") {
                                gCallbackPopupAgentCode(serviceId, data);
                            } else {
                                lCallbackPopupAgentCode(serviceId, data);  // 로컬에서
																			// 최초로
																			// 호출할때
																			// 서비스
																			// Id
                            }
                        }
                    }
                });    
                
            }
        },
        fail : function(response){
            console.log("httpRequest fail");
        }
    });
}

/**
 * 자재 품명 검색 팝업 글로벌 콜백 참조해서 로컬에서 선언해야함
 * 
 * @param serviceId
 * @param data
 *            {upperCd:'', lwprtCode:'', codeNm:''}
 */
function gCallbackPopupAgentCode(serviceId, data) {
    // alert("콜백 함수 미정의." + serviceId);
    console.log("data",data);
}   

/**
 * 계열거래처 조회 계거래처 호출 searchValue 조건으로 결과가 한건일 경우 팝업창 별도로 띄우지 않고 바로 setting 0건 or
 * 2건 이상 일 경우 팝업창 호출.
 * 
 * @param serviceId
 * @param params : {
 *            intltshCusId : 계열거래처ID, searchValue : }
 * @returns
 */
function popupIntltshCusInfo(serviceId, params, lCallbackPopupIntltshCusInfo) {
    var serviceUrl = '/cre/com/crecom001/getListR01001.json';
    var parameters = params;    // 조회 조건 등 parameter값 세팅
    parameters.pageNo = 1;
    parameters.rowPerPage = 10;
    // console.log("parameters => " + JSON.stringify(parameters));
    // console.log("################ window height ::: " + $(window).height());
    var popHeight = $(window).height() < 723?$(window).height():723;
    // console.log("################ popHeight ::: " + popHeight);
    
    $a.request( serviceUrl, {
        data: parameters,
        async : false,
    
        // 전처리, 후처리
        before : function(id, option) {    
        }, 
        after: function(res) {    
        },
        // callBack함수 정의
        success: function(response){
            if (response.gridData.totalLength == 1) {
                if (typeof lCallbackPopupIntltshCusInfo == "undefined") {
                    gCallbackPopupIntltshCusInfo(serviceId, response.gridData.list[0]);
                } else {
                    lCallbackPopupIntltshCusInfo(serviceId, response.gridData.list[0]);
                }
            } else {
                $a.popup({
                    popid : 'crecom001p', 
                    url : '/cre/com/crecom001/crecom001r01p.do', 
                    data : parameters, // 전달할 데이터
                    width : 750,
                    height : popHeight,
                    title : '계열거래처조회',
                    callback : function(data) {
                        if (data != null) {
                            // console.log("data : " , data);
                            if (typeof lCallbackPopupIntltshCusInfo == "undefined") {
                                gCallbackPopupIntltshCusInfo(serviceId, data);
                            } else {
                                lCallbackPopupIntltshCusInfo(serviceId, data);  // 로컬에서
																				// 최초로
																				// 호출할때
																				// 서비스
																				// Id
                            }
                        }
                    }
                });
            }
        },
        fail: function(response){
            console.log("httpRequest fail");
        }
    });
}

/**
 * 고객(거래처) 검색 팝업 글로벌 콜백 참조해서 로컬에서 선언해야함
 * 
 * @param serviceId
 * @param data
 *            {upperCd:'', lwprtCode:'', codeNm:''}
 */
function gCallbackPopupIntltshCusInfo(serviceId, data) {
    // alert("콜백 함수 미정의." + serviceId);
    console.log("data",data);
}

/**
 * Entree 결재문서 보기 팝업
 * 
 * @param entreeUrl :
 *            Entree 연결 URL
 */
function popupEntreeView(entreeUrl, msgText) {
    if (gfn_isNull(entreeUrl)) {
        var msg = "";
        if (!gfn_isNull(msgText)) {
            msg = msgText; 
        }
        else {
            msg = "결재문서보기";
        }
        msg = msg + " URL이";
        alert(getUIMessage('U1000057',new Array(msg)));    // U1000057 {0}
															// 없습니다.
        return;
    }
    
    var popupOption = 'width=880,height=680,top=10,left=10,scrollbars=no,resizable=no';
    var winPopup = window.open(entreeUrl, '전자결재', popupOption);
}


function setCookie(cookieName, value, exdays, path){
       var exdate = new Date();
       exdate.setDate(exdate.getDate() + exdays);
       var cookieValue = escape(value) + ((exdays==null) ? "" : "; expires=" + exdate.toGMTString());
       cookieValue = cookieValue + ((path==null) ? "" : "; path="+path);
       
       document.cookie = cookieName + "=" + cookieValue;
}

function deleteCookie(cookieName){
   var expireDate = new Date();
   expireDate.setDate(expireDate.getDate() - 1);
   document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString();
}

function getCookie(cookieName) {
   cookieName = cookieName + '=';
   var cookieData = document.cookie;
   var start = cookieData.indexOf(cookieName);
   var cookieValue = '';
   if(start != -1){
      start += cookieName.length;
      var end = cookieData.indexOf(';', start);
      if(end == -1)end = cookieData.length;
      cookieValue = cookieData.substring(start, end);
   }
   return unescape(cookieValue);
}

// 공지사항 팝업 type = 1:로그인화면, 2:메인화면
function gfn_noticePopupChecker(type) {
    // console.log("공지사항 팝업 type = ", type);
    var serviceId = 'noticePopup';
    var serviceUrl = '/notice/getListR01003.json';
    
    var parameters = { // 조회 조건 등 parameter값 세팅
          popupLc : type 
        , ntceYn  : 'Y'
        , popupTyNm : 'PC'
    }
        
    // request 메소드
    httpRequest(serviceId, serviceUrl, parameters, 
            function(serviceId, res) {
                console.log("success callback", serviceId, res);
                if (gfn_isNull(res.list) || res.list.length == 0) return;

                for (var i=0; i<res.list.length; i++) {
                    // if (i>=2) return; // test
                    
                    var item = res.list[i];
                    var cookieName = "notiNotPopup_" + item.noticeId
                    // console.log("### cookieName=", cookieName);
                    
                    // deleteCookie(cookieName); // test용
                    var cookieVal = getCookie(cookieName);
                    // var cookieVal = localStorage.getItem(cookieName)
                    // console.log("cookieVal ==> ", cookieVal, ",
					// item.popupExpsr= ", item.popupExpsr)
                    var chkSessionName = 'BO_NoticeSession_' + item.noticeId;
                    // console.log("### chkSessionName=", chkSessionName);
                    var sessionVal = $a.session(chkSessionName);
                    // console.log("### sessionVal=", sessionVal);
                    if (gfn_isNull(cookieVal) || item.popupExpsr == "3") {  // 3:
																			// 강제로
																			// 팝업열기
                        if (item.popupExpsr == "3" && !gfn_isNull(sessionVal)) {
                            // 쿠키 설정으로 팝업 안 띠움
                            console.log("강제로 계속 열기 세션설정으로 팝업 안띄움 => ", item);
                        } else {
                            // 팝업 실행
                            gfn_noticePopup(item);
                        }
                    }
                    else {
                        // 쿠키 설정으로 팝업 안 띄움
                        console.log("쿠키 설정으로 팝업 안 띄움 => ", item);
                    }
                }
            } 
            , function() {
                // alert('처리중 오류가 발생했습니다.')
            }
    );
}

// 공지사항 팝업
function gfn_noticePopup(data) {
    // console.log("공지사항 팝업", data);
    
    if (gfn_isNull(data)) {
        return;
    }
    
    var browser = "IE";
    agentInfo = navigator.userAgent.toLowerCase();
    // console.log("################## agentInfo == ", agentInfo);
    if (agentInfo.match(/chrome/i) != null) {
        browser = "CHROME";
    } else if (agentInfo.match(/safari/i) != null) {
        browser = "SAFARI";
    } else if (agentInfo.match(/firefox/i) != null) {
        browser = "FIREFOX";
    }
    
    // IE에서는 referer 정보가 없음
    if (browser == 'IE') {
        var ieUrl = CONTEXT_PATH + "/notice/p01.do?noticeId=" + data.noticeId;
        var specs =  "width="+data.popupWidth+",height="+data.popupVrticl+",top=" + data.popupUpend + ",left=" + data.popupLeft + ",scrollbars=yes,resizable=yes,location=no";
        fnWindowOpen(ieUrl, 'Alopex_Popup_notice_' + data.noticeId, specs);
    } else {
        $a.popup({
            url : '/notice/p01.do',
            popid : 'notice_' + data.noticeId,
            width : data.popupWidth,
            height : data.popupVrticl,
            title : "[공지사항] " + data.sj,
            data  : {noticeId:data.noticeId},
            modal : false,
            windowpopup : true,
            iframe : true,
            other : "top=" + data.popupUpend + ",left=" + data.popupLeft + ",scrollbars=yes,resizable=yes,location=no",
            callback : function(data) { }
        });
    }
}



/**
 * 오브젝트가 String인지 판단합니다.
 * 
 * @param {Object}
 *            O
 * @returns {Boolean}
 */
function isString(O) {
    return Object.prototype.toString.call(O) == "[object String]";
}

// ## ext-common.js 의 String.prototype.isNumber와 동일기능
// ->삭제
// /**
// * 오브젝트가 Number인지 판단합니다.
// * @param {Object} O
// * @returns {Boolean}
// */
// function isNumber(O) {
// return Object.prototype.toString.call(O) == "[object Number]";
// }


/**
 * 원하는 횟수 만큼 자릿수 맞춤 문자열을 포함한 문자열을 반환합니다. 문자열 길이보다 작은값을 보내면 무시됩니다.
 * 
 * @param {String|Number}
 *            num
 * @param {Number}
 *            length
 * @param {String}
 *            [padder=0]
 * @param {Number}
 *            [radix]
 * @returns {String}
 * @example setDigit(2016, 6) // "002016" setDigit(2016, 2) // "2016" ```
 */
function setDigit(num, length, padder, radix) {
    var s = num.toString(radix || 10);
    return times((padder || '0'), (length - s.length)) + s;
}

/**
 * 문자열을 지정된 수만큼 반복 합니다.
 * 
 * @param {String}
 *            s
 * @param {Number}
 *            count
 * @returns {string}
 * @example ``` times(2016, 2) //"20162016" ```
 */
function times(s, count) {
    return count < 1 ? '' : new Array(count + 1).join(s);
}


/**
 * 문자열의 특정 문자열까지 잘라주거나 원하는 포지션까지 잘라줍니다.
 * 
 * @param {String}
 *            str - 문자열
 * @param {String|Number}
 *            pos - 찾을 문자열 또는 포지션
 * @returns {String}
 * @example ```js right("abcd.efd", 3); // efd right("abcd.efd", "."); // efd
 *          ```
 */
function right(str, pos) {
    if (typeof str === "undefined" || typeof pos === "undefined") return "";
    str = '' + str;
    if (isString(pos)) {
        return (str.lastIndexOf(pos) > -1) ? str.substr(str.lastIndexOf(pos) + 1) : "";
    }
    else if ((pos+'').isNumber()) {
        return str.substr(str.length - pos);
    }
    else {
        return "";
    }
}

function localDate(yy, mm, dd, hh, mi, ss) {
    var utcD, localD;
    localD = new Date();
    if (mm < 0) mm = 0;
    if (typeof hh === "undefined") hh = 12;
    if (typeof mi === "undefined") mi = 0;
    utcD = new Date(Date.UTC(yy, mm, dd || 1, hh, mi, ss || 0));

    if (mm == 0 && dd == 1 && utcD.getUTCHours() + (utcD.getTimezoneOffset() / 60) < 0) {
        utcD.setUTCHours(0);
    }
    else {
        utcD.setUTCHours(utcD.getUTCHours() + (utcD.getTimezoneOffset() / 60));
    }
    return utcD;
}


/**
 * 문자열에서 -. 을 제외한 모든 문자열을 제거하고 숫자로 반환합니다. 옵션에 따라 원하는 형식의 숫자로 변환 할 수 도 있습니다.
 * 
 * @method number
 * @param {String|Number}
 *            str
 * @param {Object}
 *            cond - 옵션
 * @returns {String|Number}
 * @example ```js var cond = { round: {Number|Boolean} - 반올림할 자릿수, money:
 *          {Boolean} - 통화, abs: {Boolean} - 절대값, byte: {Boolean} - 바이트 }
 * 
 * console.log(number(123456789.678, {round:1}));
 * console.log(number(123456789.678, {round:1, money:true}));
 * console.log(number(123456789.678, {round:2, byte:true}));
 * console.log(number(-123456789.8888, {abs:true, round:2, money:true}));
 * console.log(number("A-1234~~56789.8~888PX", {abs:true, round:2,
 * money:true}));
 * 
 * //123456789.7 //123,456,789.7 //117.7MB //123,456,789.89 //123,456,789.89 ```
 */
function number(str, cond) {
    var result, pair = ('' + str).split(/\./), isMinus, returnValue;

    isMinus = (Number(pair[0].replace(/,/g, "")) < 0 || pair[0] == "-0");
    returnValue = 0.0;
    pair[0] = pair[0].replace(/[-|+]?[\D]/gi, "");

    if (pair[1]) {
        pair[1] = pair[1].replace(/\D/gi, "");
        returnValue = Number(pair[0] + "." + pair[1]) || 0;
    }
    else {
        returnValue = Number(pair[0]) || 0;
    }
    result = (isMinus) ? -returnValue : returnValue;

    $.each(cond, function (k, c) {
        if (k == "round") {
            if ((c+'').isNumber()) {
               /*
				 * if (c < 0) { result = +(Math.round(result + "e-" +
				 * Math.abs(c)) + "e+" + Math.abs(c)); } else { result =
				 * +(Math.round(result + "e+" + c) + "e-" + c); }
				 */
                
                // 지정한 자리수 만큼 무조건 호출하도록 수정
                result = result.toFixed(Math.abs(c)); 
            }
            else {
                result = Math.round(result);
            }
        }
        if (k == "floor") {
            result = Math.floor(result);
        }
        if (k == "ceil") {
            result = Math.ceil(result);
        }
        else if (k == "money") {
            result = (function (val) {
                var txtNumber = '' + val;
                if (isNaN(txtNumber) || txtNumber == "") {
                    return "";
                }
                else {
                    var arrNumber = txtNumber.split('.');
                    arrNumber[0] += '.';
                    do {
                        arrNumber[0] = arrNumber[0].replace(new RegExp('([0-9])([0-9][0-9][0-9][,.])'), '$1,$2');
                    } while (new RegExp('([0-9])([0-9][0-9][0-9][,.])').test(arrNumber[0]));
                    if (arrNumber.length > 1) {
                        return arrNumber.join('');
                    }
                    else {
                        return arrNumber[0].split('.')[0];
                    }
                }
            })(result);
        }
        else if (k == "abs") {
            result = Math.abs(Number(result));
        }
        else if (k == "byte") {
            result = (function (val) {
                val = Number(result);
                var nUnit = "KB";
                var myByte = val / 1024;
                if (myByte / 1024 > 1) {
                    nUnit = "MB";
                    myByte = myByte / 1024;
                }
                if (myByte / 1024 > 1) {
                    nUnit = "GB";
                    myByte = myByte / 1024;
                }
                return number(myByte, {round: 1}) + nUnit;
            })(result);
        }
    });

    return result;
}


// ## ext-common.js 로 이동요청 gfn_getMonthLastDay(mon) 함수와 동일 기능 (마지막 날 구함)
/**
 * 년월에 맞는 날자수를 반환합니다. (new Date()).getMonth() 기준으로 월값을 보냅니다. "2월" 인경우 "1" 을 넘기게
 * 됩니다.
 * 
 * @method daysOfMonth
 * @param {Number}
 *            y
 * @param {Number}
 *            m
 * @returns {Number}
 * @examples ```js daysOfMonth(2015, 11); // 31 daysOfMonth(2015, 1); // 28 ```
 */
function daysOfMonth(y, m) {
    if (m == 3 || m == 5 || m == 8 || m == 10) {
        return 30;
    }
    else if (m == 1) {
        return (((y % 4 == 0) && (y % 100 != 0)) || (y % 400 == 0)) ? 29 : 28;
    }
    else {
        return 31;
    }
}


/**
 * 필수값 체크
 * 
 * @param objId
 * @param objNm
 * @returns false : true
 * 
 * fn_requiredCheck('cusCd'); // objId와 같은 label 이 지정된 경우
 * fn_requiredCheck('cusCd','고객아이디'); label과 다른 명을 넣고 싶은 경우
 * 
 * 
 * ex) if(!fn_requiredCheck('cusCd')){ return; }
 * 
 */
function fn_checkRequired(objId, objNm){
    
    var $obj = $('#'+objId);
    
    
    if(gfn_isNull(objNm)){
        objNm = $('[for='+objId+']').text();
    }
    
    if(gfn_isNull($obj.val())){
        alert('['+objNm+'] 을 확인해주세요');
        $obj.focus();
        return false;
    }else{
        return true;
    }
}
/**
 * option = { sidoObjId sigunguObjId emdObjId }
 * 
 * 시/도, 시/군/구, 읍/면/동 Selectbox
 * 
 * 
 * ex)
 * 
 * fn_addressSelector({'sidoObjId':'sido', //시/도 'sigunguObjId':'sigungu',
 * //시/군/구 'emdObjId':'emd' }); //읍/면/동
 * 
 * 
 */
var fn_addressSelector = function(option){
    
    $('#'+option.sidoObjId).setData({
        // select Component의 data-bind="options:sidoCode"에 조회해온 결과값 세팅
        sidoCode:[{code : "", name : "시/도"}]
    });
    
    $('#'+option.sigunguObjId).setData({
        // select Component의 data-bind="options:sidoCode"에 조회해온 결과값 세팅
        sigunguCode:[{code : "", name : "시/군/구"}]
    });
    
    $('#'+option.emdObjId).setData({
        // select Component의 data-bind="options:sidoCode"에 조회해온 결과값 세팅
        emdCode:[{code : "", name : "읍/면/동"}]
    });
    
    getSidoCode(function(serviceId, res){
        res.sidoList.unshift({code : "", name : "시/도"});
        
        $('#'+option.sidoObjId).setData({
            // select Component의 data-bind="options:sidoCode"에 조회해온 결과값 세팅
            
            sidoCode:res.sidoList
        });
    });

    // 시도 변경시
    $('#'+option.sidoObjId).unbind('change');
    $('#'+option.sidoObjId).on('change', function(e) {          
        
        var value  = $(this).val();
        
        /*
		 * resetSelectBox("sigungu"); resetSelectBox("emd");
		 * resetSelectBox("dongli");
		 */
        
        if (value == '36') { // 세종특별자치시 시군구명 별도로 없음. 코드값은 110
            
            // 읍면동 바로 조회.
            getEmdCode(value,'110',function(serviceId, res){
                res.emdList.unshift({code : "", name : "읍/면/동"});
                $('#'+option.emdObjId).setData({
                    emdCode:res.emdList
                });    
            });
            
            
        } else {
// getOptionValue2(value);
            
            getSigunguCode(value,function(serviceId, res){
                res.sigunguList.unshift({code : "", name : "시/군/구"});
                    $('#'+option.sigunguObjId).setData({
                        sigunguCode:res.sigunguList
                });    
            });
        }
    });
    // 시군구 변경시
    $('#'+option.sigunguObjId).unbind('change');
    $('#'+option.sigunguObjId).on('change', function(e) {          
        var value1  = $('#'+option.sidoObjId).val();
        var value2  = $('#'+option.sigunguObjId).val();
// resetSelectBox("emd");
// resetSelectBox("dongli");
// getOptionValue3(value1, value2);
        
        // 읍면동 바로 조회.
        getEmdCode(value1, value2,function(serviceId, res){
            res.emdList.unshift({code : "", name : "읍/면/동"});
            $('#'+option.emdObjId).setData({
                emdCode:res.emdList
            });    
        });
        
    });
    
    // 읍면동 변경시
    $("#emd").unbind('change');
    $("#emd").on('change', function(e) {     
// var value1 = $('#sido').val();
// var value2 = $('#sigungu').val();
// if (value1 == '36') { // 세종특별자치시 시군구명 별도로 없음. 코드값은 110
// value2 = '110';
// }
// value3 = $('#emd').val();
// resetSelectBox("dongli");
// getOptionValue4(value1,value2,value3);
    });
}

/**
 * 시도 코드 조회
 * 
 * @param callBack
 * @returns
 */
function getSidoCode(callBack){
    // request 메소드
    httpRequest('sidoCode', '/com/mng/commng006/getSidoCode.json', "", callBack);
}


/**
 * 시군구 코드 조회
 * 
 * @param sidoCode
 * @param callBack
 * @returns
 */
function getSigunguCode(sidoCode, callBack){
    var parameters =  {
            sido : sidoCode
    };
    
    // request 메소드
    httpRequest('sigunguCode', '/com/mng/commng006/getSigunguCode.json', parameters, callBack);
}

/**
 * 읍면동 코드 조회
 * 
 * @param sidoCode
 * @param sigunguCode
 * @returns
 */
function getEmdCode(sidoCode, sigunguCode, callBack) {
    var parameters =  {
            sido : sidoCode,
            sigungu : sigunguCode
    };
    
    // request 메소드
    httpRequest('emdCode', '/com/mng/commng006/getEmdCode.json', parameters, callBack);
}


// 전화 번호 추출
function gfn_getSplitTelno (strTelno, styGb){
    var regExpTelno = /^(01[016789]{1}|02|050[256]{1}|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/; // 전화번호
																									// 검증
																									// 정규식
    var chk = regExpTelno.test(strTelno);
    
    if(chk){
        var telNoBlock = ["","",""];
        if(strTelno.indexOf("-") < 0 ){
            var intTelnoSize = strTelno.length;
            
            if(intTelnoSize == 9){
                telNoBlock[0] = strTelno.substring(0,2);
                telNoBlock[1] = strTelno.substring(2,5);
                telNoBlock[2] = strTelno.substring(5,9);
            }else if(intTelnoSize == 10){
                if(strTelno.substring(0,2) == '02'){
                    telNoBlock[0] = strTelno.substring(0,2);
                    telNoBlock[1] = strTelno.substring(2,6);
                    telNoBlock[2] = strTelno.substring(6,10);    
                }else{
                    telNoBlock[0] = strTelno.substring(0,3);
                    telNoBlock[1] = strTelno.substring(3,6);
                    telNoBlock[2] = strTelno.substring(6,10);
                }
            }else if(intTelnoSize == 11){
                telNoBlock[0] = strTelno.substring(0,3);
                telNoBlock[1] = strTelno.substring(3,7);
                telNoBlock[2] = strTelno.substring(7,11);
            }
        }else{
            telNoBlock = strTelno.split("-");
        }
        
        if (styGb == "1") {
            return telNoBlock[0];
        } else if (styGb == "2") {
            return telNoBlock[1];
        } else if (styGb == "3") {
            return telNoBlock[2];
        } else {
            return telNoBlock;
        }
    }else{
        return '';
    }
}     

// grid에서 keyboard 이동으로 선택한 row 이동 : focused Class 속성 변경으로 선택 효과적용
// return : 이동한 row의 row데이터를 가지고 이후 업무 처리
function gfn_gridKeyMove(gridId, e) {
    
    var evObj = AlopexGrid.parseEvent(e);      
    var curRow = evObj.toSelectionRow;
    var curData = $('#' + gridId).alopexGrid('dataGet', {_index: {row: curRow}});
    
    // 이동 전row focused 제거
    $('#' + gridId).find('[data-alopexgrid-rowindex!='+curRow+']').each(function() {
        $(this).removeClass('focused');  // 키보드 이동으로 인해 focused Class 있는 경우
											// clear위해서 추가
    });    
    
    // 이동후 row에 focused 추가
    $('#' + gridId).find('[data-alopexgrid-rowindex='+curRow+']').each(function() {
        $(this).addClass('focused');  // 키보드 이동으로 인해 focused Class 있는 경우
										// clear위해서 추가
    });    
    
    return curData;
    
}

/**
 * 금액입력시 한글금액변환
 * 
 */
// 1 ~ 9 한글 표시
var arrNumberWord = new Array("","일","이","삼","사","오","육","칠","팔","구");
// 10, 100, 100 자리수 한글 표시
var arrDigitWord = new  Array("","십","백","천");
// 만단위 한글 표시
var arrManWord = new  Array("","만","억", "조");

function gfn_hangul_money(amt)
{
    var    num_value    = amt;
        num_value    = new String(num_value);
        
    if(typeof num_value != "undefined"){
        num_value    = num_value.replace(/,/gi,"");
    }    
    
    var num_length    = num_value.length;
      
    if(isNaN(num_value) == true)
        return;
    var han_value = "";
    var man_count = 0;    // 만단위 0이 아닌 금액 카운트.

    for(i=0; i < num_value.length; i++){
        // 1단위의 문자로 표시.. (0은 제외)
        var strTextWord = arrNumberWord[num_value.charAt(i)];
        
        // 0이 아닌경우만, 십/백/천 표시
        if(strTextWord != "")
        {
            man_count++;
            strTextWord += arrDigitWord[(num_length - (i+1)) % 4];
        }
        // 만단위마다 표시 (0인경우에도 만단위는 표시한다)
        if(man_count != 0 && (num_length - (i+1)) % 4 == 0)
        {
            man_count = 0;
            strTextWord = strTextWord + arrManWord[(num_length - (i+1)) / 4];
        }
        han_value += strTextWord;
    }

    if(num_value != 0)
        han_value = han_value + " 원";
    
    return han_value;
}

/**
 * 주문량(배차량) 반환
 * 
 * 수요처 하위의 모든 탱크의 최대 충전가능 용량(kg), 탱크용량(kg), 잔량(%)을 입력 받아서 주문량(배차량)을 반환하는 함수
 * 
 * @param maxTankQty
 *            탱크의 최대 충전가능 용량(kg)
 * @param tankQty
 *            탱크용량(kg)
 * @param tankRate
 *            잔량(%)
 * @returns 주문량(배차량)(kg)
 */
function getTankOrderQty(maxTankQty, tankQty, tankRate) {

    var data1 = tankQty * tankRate / 100;
    var calValue = maxTankQty - data1;

    // 0보다 작은 값은 0으로 변환하는 처리 추가
    if (calValue < 0) {
        return 0;
    }

    // 소수점 버림처리
    calValue = Math.floor(calValue);
    
    return calValue;
}

// IE accept-charset 적용이 안되는 현상이 있어 추가
function emulAcceptCharset(form){
    if(form.canHaveHTML){// detectIE
        document.charset=form.acceptCharset;
    }
    return true;
}


// 권한관리 적용
function authControl() {
    console.log('authControl()');
    var groupId = '${authVO.groupId}';
    var menuId = '${authVO.menuId}';
    var progrmId = '${authVO.progrmId}';
    var authorC = '${authVO.authorC}';
    var authorR = '${authVO.authorR}';
    var authorU = '${authVO.authorU}';
    var authorD = '${authVO.authorD}';
    var authorE = '${authVO.authorE}';
    
    var authorStr = 'authVO : groupId['+groupId+'], menuId['+menuId+'], progrmId['+progrmId+'], authorC['+authorC+'], authorR['+authorR+'], authorU['+authorU+'], authorD['+authorD+'], authorE['+authorE+']';
    console.log(authorStr);

    if (authorC != 'Y') {
        $('body').find('.authorC').attr("title","authorC").css("display","none");
        $('body').find('.authorC').on('click', function(e) {
            e.preventDefault();
            alert('권한이 없습니다.');
        });
    }
    if (authorR != 'Y') {
        $('body').find('.authorR').attr("title","authorR").css("display","none");
        $('body').find('.authorR').on('click', function(e) {
            e.preventDefault();
            alert('권한이 없습니다.');
        });
    }
    if (authorU != 'Y') {
        $('body').find('.authorU').attr("title","authorU").css("display","none");
        $('body').find('.authorU').on('click', function(e) {
            e.preventDefault();
            alert('권한이 없습니다.');
        });
    }
    if (authorD != 'Y') {
        $('body').find('.authorD').attr("title","authorD").css("display","none");
        $('body').find('.authorD').on('click', function(e) {
            e.preventDefault();
            alert('권한이 없습니다.');
        });
    }
    if (authorE != 'Y') {
        $('body').find('.authorE').attr("title","authorE").css("display","none");
        $('body').find('.authorE').on('click', function(e) {
            e.preventDefault();
            alert('권한이 없습니다.');
        });
    }
    
    var debugMode = $a.session('debugMode');
    
    if (debugMode == "Y") {
        $('.cnt-title').append('<span class="info-txt">'+authorStr+'</span>');
        $('.popup-wrap').prepend('<span class="info-txt">'+authorStr+'</span>');
        if (authorC == 'Y') {
            $('body').find('.authorC').attr("title","authorC").css("background","orange");
        } else {
            $('body').find('.authorC').attr("title","authorC").css("display","inline-block");
            $('body').find('.authorC').attr("title","authorC").css("background","red");
        }
        if (authorR == 'Y') {
            $('body').find('.authorR').attr("title","authorR").css("background","orange");
        } else {
            $('body').find('.authorR').attr("title","authorR").css("display","inline-block");
            $('body').find('.authorR').attr("title","authorR").css("background","red");
        }
        if (authorU == 'Y') {
            $('body').find('.authorU').attr("title","authorU").css("background","orange");
        } else {
            $('body').find('.authorU').attr("title","authorU").css("display","inline-block");
            $('body').find('.authorU').attr("title","authorU").css("background","red");
        }
        if (authorD == 'Y') {
            $('body').find('.authorD').attr("title","authorD").css("background","orange");
        } else {
            $('body').find('.authorD').attr("title","authorD").css("display","inline-block");
            $('body').find('.authorD').attr("title","authorD").css("background","red");
        }
        if (authorE == 'Y') {
            $('body').find('.authorE').attr("title","authorE").css("background","orange");
        } else {
            $('body').find('.authorE').attr("title","authorE").css("display","inline-block");
            $('body').find('.authorE').attr("title","authorE").css("background","red");
        }
    }

}


// 권한관리 적용
/*
 * function authControl() { var groupId = '${authVO.groupId}'; var menuId =
 * '${authVO.menuId}'; }
 */
// class 로 정의된 이벤트 처리
function initClassEvent() {
    
    /*
	 * 내역 변경시 구역안의 이벤트 정리 '' 변경시 : 구역안의 모든 input 클리어 내용 변경시 : 구역안의 나를 제외한 모든
	 * input 클리어 첫번째 button 이벤트 호출
	 * 
	 * attr('sasAreaClear') => 검색후에 focusout시 한번더 호출되는 현상 떄문에 추가
	 */
     
    $('body').on('change keydown', '.sasAreaClear', function(e) {
        if(e.type=='keydown'){
            $(this).removeAttr('sasAreaClear');
            if(e.keyCode != 13){
                return;
            }
        }
        
        if($(this).attr('sasAreaClear')=== "true"){
            return;
        }
        
        if(e.type=='change' && e.keyCode === 13){
            return;
        }
        
        var afterVal = $(this).val().trim();
        var thisId = $(this).attr('id');
        if (afterVal == '') {
            $(this).parent().find('input').each(function() {
                $(this).val('');
            })
        } else {
            $(this).parent().find('input[id!='+thisId+']').each(function() {
                $(this).val('');
            })
            $(this).parent().find('button:first').click();
        }
        
        e.preventDefault();
        $(this).attr('sasAreaClear',"true");
    });
    
    
    
    /*
	 * grid 토글을 위한 이벤트 SC1001.html 구성 참조
	 */
    $(".btn_toggle").on('click', function(){
        var toggleStatus = $(this).hasClass('btn_plus');
        // button 영역
        var $targetArea1 = $(this).closest(".title-info__wrap").find(".insurance_action_box");
        // grid 영역
        var $targetArea2 = $(this).closest(".title-info__wrap").next(".insurance_detail_box");
        
        if (toggleStatus) {
            // .btn_plus -> .btn_minus
            $(this).removeClass('btn_plus');
            $(this).addClass('btn_minus');
            $targetArea1.hide();
            $targetArea1.addClass('line')
            $targetArea2.hide();
        } else {
            // .btn_minus -> .btn_plus
            $(this).removeClass('btn_minus');
            $(this).addClass('btn_plus');
            $targetArea1.show();
            $targetArea1.removeClass('line')
            $targetArea2.show();
        }
    });
    
    /* 검색어 삭제버튼 추가 wrapper 타입 */
    if ($(".input-deletep-wrap").length > 0 ) {
        
        /* 검색어 삭제버튼 추가 */
        $(".input-deletep-wrap").append("<span class='deletep-button'></span>");
        
        /* 검색어 삭제 버튼 초기화 */
        setTimeout(function(){ 
            
            var idOffsetX = $(".input-deletep-wrap input").position().left;
            var idWidth = $(".input-deletep-wrap input").outerWidth();
            var leftPosition = idOffsetX + idWidth - 25;                
            $(".input-deletep-wrap .deletep-button").css({"left": leftPosition + "px", "right": "auto" });
            
            if ($(".input-deletep-wrap input").val() != "" ) {
                $(".input-deletep-wrap .deletep-button").css("visibility", "visible");
            }
            
        }, 200);
        
        /* input keyup 이벤트 핸들러 */
        $(".input-deletep-wrap input").on('keyup', function(){
            if ($(".input-deletep-wrap input").val() != "") {
                $(".input-deletep-wrap .deletep-button").css("visibility", "visible");
            } else {
                $(".input-deletep-wrap .deletep-button").css("visibility", "hidden");
            }
        })
        
        /* input delete 이벤트 핸들러 */
        $(".input-deletep-wrap .deletep-button").on('click', function(){
            $(".input-deletep-wrap input").val("");
            $(".input-deletep-wrap .deletep-button").css("visibility", "hidden");
        })
    }
    
    /* 검색어 삭제버튼 추가 normal 타입 */
    if ($("input.Textinput").length > 0 ) {
        
        $("input.Textinput").each(function(){
            if(!$(this).parent().hasClass("input-deletep-wrap") && !$(this).attr("type")) {
                $(this).attr("type", "search");
            }
        });
        
    }
    
    /* 에디터 다이얼로그 높이 버그 대응 */
    $("body").on('click', ".note-btn.Button.Typeb.Onlyicon.af-icon-top", function(){
        
        console.log("hi");
        /* 0.2초 후에 웹 에디터 dialog의 높이를 헤더 높이 만큼 키워줌 */
        setTimeout(function(){ 
            if ($(".webeditor .Dialog").length > 0 ){
                console.log("korea");
                $(".webeditor .Dialog:visible").outerHeight($(".webeditor .Dialog:visible").outerHeight() + 60);
            }
        }, 100);
        
    });
                
}

// 비밀번호 강제
function checkValidPassword() {
    // 비밀번호 만기여부
    var pwExpire = '${sessionScope.__loginInfo.pwExpire}';
    // 비밀번호 변경경고
    var pwNotice = '${sessionScope.__loginInfo.pwNotice}';
}



});  

/**
 * 프로그램 ID 로 첫번째 메뉴로 이동
 * 
 * @param programId
 * @param param
 * @param callUrl :
 *            메뉴 하위 화면 이동시 url 정보 제공
 * @returns
 */
function gfn_navigate(programId, param, callUrl) {
var menuId = null; // 
var pageUrl = null;
// sas_top.jsp : initMenuList() 에서 세팅되는 값 사용
var menuList = $a.session('menuList');

$(menuList).each(function(idx, data) {
    if (data.progrmId == programId) {
        console.log("programId data",data);
        pageUrl = data.progrmUrl;
        // 메뉴에는 표현안되고 프로그램만 등록된 경우, 아래에서 상속받아야 한다.
        if (data.menuUseYn == "Y") {
            menuId = data.menuId;
        }
    }
});

if (menuId == null) {
    // alert("프로그램["+programId+"] 에 해당되는 메뉴가 없습니다.");
    // return;
    if (!gfn_isNull($a.session('menuId'))) {
        // 권한 상속
        menuId = $a.session('menuId');
    }
    else {
        alert("프로그램["+programId+"] 에 해당되는 정보가 없습니다.");
        return;
    }
}

if (!gfn_isNull(callUrl)) {
    pageUrl = callUrl;
} else if (gfn_isNull(pageUrl)) {
    alert("gfn_navigate(programId, param, callUrl) 호출 에러\n programId:["+grogramId+"]\n callUrl:["+callUrl+"]\n 해당programId 가 메뉴에 등록이 안되었거나 대체되는callUrl 이 없는경우");
}

var requestUrl = pageUrl + "?menuId=" + menuId;
// alert('requestUrl:'+requestUrl);
// console.log('requestUrl:'+requestUrl);

$a.session('menuId', menuId);
var paramData = $.extend({"gfn_navigate":"Y"}, param);
// alert("go navigate : requestUrl="+requestUrl);
$a.navigate('${ctx}'+requestUrl, paramData);

}

// 메세지 정보가 변경 되었을시에 다시 로드
function initMessageList() {

var msgList = $a.session('msgList');
<sec:authorize access="isAnonymous()">
    msgList = {};
</sec:authorize>
if (gfn_isNull(msgList)) {
    console.log("initMessageList : reload msgList");
    $a.request( '/getMessageList.json', {
        // async : false,
        // callBack함수 정의
        success: function(response) {
            msgList = response.msgList;
            $a.session('msgList', msgList);
            console.log('msgList', msgList);
        },
        fail: function(response) {
            alert("메세지정보 수신 오류");
        }
    });
} else {
    console.log("initMessageList : $a.session get msgList");
}
return msgList;
}


/**
 * 주문배차 권한 컨트롤
 * 
 */
function authControlEmk($rootObj, _userGbn){
console.log('authControlEmk Start');


if(gfn_isNull($rootObj)){
    $rootObj = $('body');
}


var userGbn = '${sessionScope.__loginInfo.userGbn}';
// 테스트용
if(_userGbn!=undefined && _userGbn!=null){
    userGbn = _userGbn;
}
console.log('userGbn : '+userGbn);

// 사업장 코드, 명, 검색
var $bplcCdObj = $rootObj.find('.authorBplcCd');
var $bplcNmObj = $rootObj.find('.authorBplcNm');
var $bplcSearchObj = $rootObj.find('.authorBplcSearch');

// 고객 코드, 명, 검색
var $cusCdObj = $rootObj.find('.authorCusCd');
var $cusNmObj = $rootObj.find('.authorCusNm');
var $cusSearchObj = $rootObj.find('.authorCusSearch');

// 판매점 코드, 명, 검색
var $agentCdObj = $rootObj.find('.authorAgentCd');
var $agentNmObj = $rootObj.find('.authorAgentNm');
var $agentSearchObj = $rootObj.find('.authorAgentSearch');

// 수요처 코드, 명, 검색
var $enduserCdObj = $rootObj.find('.authorEnduserCd');
var $enduserNmObj = $rootObj.find('.authorEnduserNm');
var $enduserSearchObj = $rootObj.find('.authorEnduserSearch');

// 1차수송사
 var $trnspFoCdObj = $rootObj.find('.authorTrnspFoCd');
var $trnspFoNmObj = $rootObj.find('.authorTrnspFoNm');
var $trnspFoSearchObj = $rootObj.find('.authorTrnspFoSearch');

// 2차수송사
var $scdTrnspFoCdObj = $rootObj.find('.authorScdTrnspFoCd');
var $scdTrnspFoNmObj = $rootObj.find('.authorScdTrnspFoNm');
var $scdTrnspFoSearchObj = $rootObj.find('.authorScdTrnspFoSearch');



// .css("background","red");

// $bplcCdObj.css("background","red");

var debugMode = $a.session('debugMode');
if (debugMode == "Y") {
    
    
    
    
      // 사업장 코드, 명, 검색
    $bplcCdObj.attr("title","authorBplcCd").css("background","orange");
    $bplcNmObj.attr("title","authorBplcNm").css("background","orange");
    $bplcSearchObj.attr("title","authorBplcSearch").css("background","orange");
    
    // 고객 코드, 명, 검색
    $cusCdObj.attr("title","author").css("background","orange");
    $cusNmObj.attr("title","author").css("background","orange");
    $cusSearchObj.attr("title","author").css("background","orange");
    
    // 판매점 코드, 명, 검색
    $agentCdObj.attr("title","author").css("background","orange");
    $agentNmObj.attr("title","author").css("background","orange");
    $agentSearchObj.attr("title","author").css("background","orange");
    
    // 수요처 코드, 명, 검색
    $enduserCdObj.attr("title","author").css("background","orange");
    $enduserNmObj.attr("title","author").css("background","orange");
    $enduserSearchObj.attr("title","author").css("background","orange");

    // 1차수송사
     $trnspFoCdObj.attr("title","author").css("background","orange");
    $trnspFoNmObj.attr("title","author").css("background","orange");
    $trnspFoSearchObj.attr("title","author").css("background","orange");
    
    // 2차수송사
    $scdTrnspFoCdObj.attr("title","author").css("background","orange");
    $scdTrnspFoNmObj.attr("title","author").css("background","orange");
    $scdTrnspFoSearchObj.attr("title","author").css("background","orange");
    
    
}


switch (userGbn) {
case 'M010':    // /전체관리자
    $bplcCdObj.val('${sessionScope.__loginInfo.bplcCd}');
    $bplcNmObj.val('${sessionScope.__loginInfo.bplcCdNm}');
    break;
case 'M020':     // 업무관리자
    $bplcCdObj.val('${sessionScope.__loginInfo.bplcCd}');
    $bplcNmObj.val('${sessionScope.__loginInfo.bplcCdNm}');
    $bplcNmObj.setEnabled(false);
    $bplcSearchObj.remove();
    break;
case 'M030':     // 가스직원
    
    $bplcCdObj.val('${sessionScope.__loginInfo.bplcCd}');
    $bplcNmObj.val('${sessionScope.__loginInfo.bplcCdNm}');
    $bplcNmObj.setEnabled(false);
    $bplcSearchObj.remove();
    
    break;
case 'M040':     // 협력사
    
    $cusCdObj.val('${sessionScope.__loginInfo.cusCd}');
    $cusNmObj.val('${sessionScope.__loginInfo.cusCdNm}');
    $cusNmObj.setEnabled(false);
    $cusSearchObj.remove();
    
    break;
case 'M050':     // 거래처
    
    $bplcCdObj.val('${sessionScope.__loginInfo.bplcCd}');
    $bplcNmObj.val('${sessionScope.__loginInfo.bplcCdNm}');
    $bplcNmObj.setEnabled(false);
    $bplcSearchObj.remove();
    
    $cusCdObj.val('${sessionScope.__loginInfo.cusCd}');
    $cusNmObj.val('${sessionScope.__loginInfo.cusCdNm}');
    $cusNmObj.setEnabled(false);
    $cusSearchObj.remove();
    
    break;
case 'M060':     // 판매점

    $agentCdObj.val('${sessionScope.__loginInfo.agentCd}');
    $agentNmObj.val('${sessionScope.__loginInfo.agentCdNm}');
    $agentNmObj.setEnabled(false);
    $agentSearchObj.remove();
    
    break;
case 'M070':     // 수요처
    
    $enduserCdObj.val('${sessionScope.__loginInfo.enduserCd}');
    $enduserNmObj.val('${sessionScope.__loginInfo.enduserCdNm}');
    $enduserNmObj.setEnabled(false);
    $enduserSearchObj.remove();
    break;
case 'M080':     // 1차수송사
    
    $trnspFoCdObj.val('${sessionScope.__loginInfo.cusCd}');
    $trnspFoNmObj.val('${sessionScope.__loginInfo.cusCdNm}');
    $trnspFoNmObj.setEnabled(false);
    $trnspFoSearchObj.remove();
    
    break;
case 'M081':     // 수송사
    $scdTrnspFoCdObj.val('${sessionScope.__loginInfo.cusCd}');
    $scdTrnspFoNmObj.val('${sessionScope.__loginInfo.cusCdNm}');
    $scdTrnspFoNmObj.setEnabled(false);
    $scdTrnspFoSearchObj.remove();
    break;
case 'M090':     // 운전기사
    
    $trnspFoCdObj.val('${sessionScope.__loginInfo.cusCd}');
    $trnspFoNmObj.val('${sessionScope.__loginInfo.cusCdNm}');
    $trnspFoNmObj.setEnabled(false);
    $trnspFoSearchObj.remove();
    
    break;

default:
    break;
}


console.log('authorControlEmk End');
}

/**
 * 주어진 영역에 해당 mrd 파일을 파라메터로 표현한다.
 */
function gfnShowReportByDataServer(reportDiv, reportName, reportParam) {

var rd_reportingserver_url = '<spring:eval expression="@mode_properties['rd.reportingserver.url']"/>';
var rd_dataserver_url = '<spring:eval expression="@mode_properties['rd.dataserver.url']"/>';
var rd_mrd_root = '<spring:eval expression="@mode_properties['rd.mrd.root']"/>';

var viewer = new m2soft.crownix.Viewer(rd_reportingserver_url, reportDiv);
// 툴바 크기 배율 조정옵션(툴바가 너무 커보일때 조정)
// var viewer = new m2soft.crownix.Viewer(rd_reportingserver_url, reportDiv, {
// toolbarScale: 0.8 });

viewer.openFile(rd_mrd_root + reportName, '/rfn ['+rd_dataserver_url+'] /rv ' + reportParam);

console.log("* rd_mrd_root =>", rd_mrd_root);
console.log("* reportName =>", reportName);
console.log("* rd_dataserver_url =>", rd_dataserver_url);
console.log("* reportParam =>", reportParam);

// 뷰어 옵션 showPageNum: 페이지 번호 노출 여부, defaultZoom: 뷰어 기본배율(1 -> 100%),
// defaultZoomCentre: 뷰어 배율을 확대 했을때 초기위치(LEFTTOP -> 왼쪽위)
// viewer.openFile(rd_mrd_root + reportName, '/rfn ['+rd_dataserver_url+'] /rv '
// + reportParam, { showPageNum: true, defaultZoom: 1, defaultZoomCentre:
// 'LEFTTOP' });
}

/**
 * 주어진 영역에 해당 mrd 파일을 JSON 데이터로 표현한다.
 */
function gfnShowReportByJSON(reportDiv, reportName, reportData) {

var rd_reportingserver_url = '<spring:eval expression="@mode_properties['rd.reportingserver.url']"/>';
// var rd_dataserver_url = '<spring:eval
// expression="@mode_properties['rd.dataserver.url']"/>';
var rd_mrd_root = '<spring:eval expression="@mode_properties['rd.mrd.root']"/>';

var viewer = new m2soft.crownix.Viewer(rd_reportingserver_url, reportDiv);
viewer.setRData(reportData);
viewer.openFile(rd_mrd_root + reportName, '');
}

/**
 * 결재화면 팝업을 띄운다.
 * 
 */
function popupEntree(orgId, taskId, orgKey, comId, empNo, formId) {
// var entreeUrl = 'http://168.154.244.15/ErpApvNew/IFSSGate.aspx';
var entreeUrl = '<spring:eval expression="@mode_properties['entree.gate.url']"/>';
var entreeParam = '?ORGID='+orgId+'&TASKID='+taskId+'&ORGKEY='+orgKey+'&COMID='+comId+'&EMPNO='+empNo+'&FORMID='+formId;
var popupOption = 'width=1000,height=800,top=10,left=10,scrollbars=yes,resizable=yes';

console.log("popupEntree", entreeUrl+entreeParam);
console.log("popupOption", popupOption);

var winPopup = fnWindowOpen(entreeUrl+entreeParam, '전자결재', popupOption);

}

/**
 * 데이터 권한 추가 검색조건 반환
 * 
 * @returns JSON
 */
function gfnAuthorLevelCond() {
var addCond = {};

var authorLevel = "${authVO.authorLevel}";
// console.log("########### authorLevel : ", authorLevel);
if (authorLevel == "A0") {    // 전체관리자
}
else if (authorLevel == "B0") {    // 업무관리자
}
else if (authorLevel == "C0") {    // 직원-사업장
    $.extend(addCond, { userBplcCd: "${sessionScope.__loginInfo.bplcCd}" });
}
else if (authorLevel == "C1") {    // 직원-부서
    $.extend(addCond, { userDeptCd: "${sessionScope.__loginInfo.deptCd}" });
}
else if (authorLevel == "C2") {    // 직원-본인
    $.extend(addCond, { userLoginId: "${sessionScope.__loginInfo.loginId}" });
}
else if (authorLevel == "D0") {    // 업체
    var userType = "${sessionScope.__loginInfo.userGbn}";
    /*
	 * M010 전체관리자 M020 업무관리자 M030 가스직원 M040 협력사 M050 거래처 M060 판매점 M070 수요처 M080
	 * 1차수송사 M081 2차수송사 M090 운전기사
	 */
    if (userType == "M040") {
        $.extend(addCond, { userCcpyId: "${sessionScope.__loginInfo.ccpyId}" });
    }
    else if (userType == "M050" || userType == "M080" || userType == "M081") {
        $.extend(addCond, { userCusCd: "${sessionScope.__loginInfo.cusCd}" });
    }
    else if (userType == "M060") {
        $.extend(addCond, { userAgentCd: "${sessionScope.__loginInfo.agentCd}" });
    }
    else if (userType == "M070") {
        $.extend(addCond, { userEnduserCd: "${sessionScope.__loginInfo.enduserCd}" });
    }
    else if (userType == "M090") {
        $.extend(addCond, { userLoginId: "${sessionScope.__loginInfo.loginId}" });
    }
}
// console.log("########### addCond : ", addCond);

return addCond;
}


// 공지사항 팝업 type = 1:로그인화면, 2:메인화면
function gfn_popupNotice(type) {

}

