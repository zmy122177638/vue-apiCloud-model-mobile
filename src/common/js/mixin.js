/* eslint-disable */
/**
 * 开启接触touchmove默认事件
 * @param {Element} el
 */
export const openScroll = function (el) {
  el.addEventListener(
    "touchstart",
    function () {
      var top = el.scrollTop;
      var totalScroll = el.scrollHeight;
      var currentScroll = top + el.offsetHeight;
      if (top === 0) {
        el.scrollTop = 1;
      } else if (currentScroll === totalScroll) {
        el.scrollTop = top - 1;
      }
    }, {
      passive: true
    }
  );
  el.addEventListener(
    "touchmove",
    function (evt) {
      if (el.offsetHeight < el.scrollHeight) {
        evt._isScroller = true;
      }
    }, {
      passive: true
    }
  );
};
/**
 *
 * @param {Number} len uuid长度
 * @param {Number} radix uuid截取长度
 * @param {String} typeid uuid类型标识
 */
export const uuid = function (len, radix, typeid) {
  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(
    ""
  );
  var uuid = [];
  var typeid = typeid || "";
  var radix = radix || chars.length;
  var i;
  if (len) {
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
  } else {
    var r;
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
    uuid[14] = "4";
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16);
        uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return typeid + "-" + uuid.join("");
};

/**
 * url参数转JSON参数
 * @param {url}} url
 */
export const parseQueryString = function (url) {
  var regUrl = /^[^?]+\?([\w\W]+)$/;
  var regPara = /([^&=]+)=([\w\W]*?)(&|$|#)/g;
  var arrUrl = regUrl.exec(url);
  var ret = {};
  if (arrUrl && arrUrl[1]) {
    var strPara = arrUrl[1];
    var result;
    while ((result = regPara.exec(strPara)) != null) {
      ret[result[1]] = result[2];
    }
  }
  return ret;
};
/**
 * 中文时间
 * @param {Number} dateTimeStamp 毫秒数
 */
export const timeSwitchString = function (dateTimeStamp) {
  // dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
  var minute = 1000 * 60; // 把分，时，天，周，半个月，一个月用毫秒表示
  var hour = minute * 60;
  var day = hour * 24;
  var week = day * 7;
  // var halfamonth = day * 15
  var month = day * 30;
  var now = new Date().getTime(); // 获取当前时间毫秒
  var diffValue = now - dateTimeStamp; // 时间差
  var result;
  if (diffValue < 0) {
    return;
  }
  var minC = diffValue / minute; // 计算时间差的分，时，天，周，月
  var hourC = diffValue / hour;
  var dayC = diffValue / day;
  var weekC = diffValue / week;
  var monthC = diffValue / month;
  if (monthC >= 1 && monthC <= 3) {
    result = " " + parseInt(monthC) + "月前";
  } else if (weekC >= 1 && weekC <= 3) {
    result = " " + parseInt(weekC) + "周前";
  } else if (dayC >= 1 && dayC <= 6) {
    result = " " + parseInt(dayC) + "天前";
  } else if (hourC >= 1 && hourC <= 23) {
    result = " " + parseInt(hourC) + "小时前";
  } else if (minC >= 1 && minC <= 59) {
    result = " " + parseInt(minC) + "分钟前";
  } else if (diffValue >= 0 && diffValue <= minute) {
    result = "刚刚";
  } else {
    var datetime = new Date();
    datetime.setTime(dateTimeStamp);
    var Nyear = datetime.getFullYear();
    var Nmonth =
      datetime.getMonth() + 1 < 10 ?
      "0" + (datetime.getMonth() + 1) :
      datetime.getMonth() + 1;
    var Ndate =
      datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    // var Nhour = datetime.getHours() < 10 ? '0' + datetime.getHours() : datetime.getHours()
    // var Nminute = datetime.getMinutes() < 10 ? '0' + datetime.getMinutes() : datetime.getMinutes()
    // var Nsecond = datetime.getSeconds() < 10 ? '0' + datetime.getSeconds() : datetime.getSeconds()
    result = Nyear + "-" + Nmonth + "-" + Ndate;
  }
  return result;
};

/**
 * 倒计时数组
 * 请勿使用'-'代替'/',在iPhone不支持
 * @param {String} setEndTime 2018/08/27 18:00
 */
export const countDownTime = function (setEndTime) {
  let endTime = new Date(setEndTime).getTime();
  let time = new Date().getTime();

  if (endTime <= time) {
    return [];
  } else {
    let HsecondNum = endTime - time;
    // let day = Math.floor(HsecondNum / (24 * 3600 * 1000))

    let dd = Math.floor(HsecondNum % (24 * 3600 * 1000));
    let hours = Math.floor(HsecondNum / (3600 * 1000));

    let minutesNum = dd % (3600 * 1000);
    let minutes = Math.floor(minutesNum / (60 * 1000));

    let secondNum = dd % (60 * 1000);
    let second = Math.floor(secondNum / 1000);
    return [hours, minutes, second];
  }
};

// 判断是否为微信
export const isWeixin = () => {
  let ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == "micromessenger") { //eslint-disable-line
    return true;
  } else {
    return false;
  }
};
// 判断是否为QQ
export const isQQ = () => {
  let ua = navigator.userAgent.toLowerCase();
  return !!ua.match(/mqqbrowser|qzone|qqbrowser/i);
};
// 判断是否为安卓
export const isAndroid = () => {
  let ua = navigator.userAgent;
  return ua.indexOf("Android") > -1 || ua.indexOf("Linux") > -1;
};
// 判断是否为ios
export const isIos = () => {
  let ua = navigator.userAgent;
  return !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
};

/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== "string") {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
};

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return;
  return window.localStorage.getItem(name);
};

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
};

/**
 * 存储cookie
 */
export const setCookie = (objName, objValue, objHours = 30) => {
  var str = objName + "=" + escape(objValue);
  if (objHours != null) {
    var date = new Date();
    var ms = objHours * 3600 * 1000 * 24;
    date.setTime(date.getTime() + ms);
    str += "; expires=" + date.toGMTString();
  }
  document.cookie = str;
};

/**
 * 获取cookie
 */
export const getCookie = objName => {
  var search = objName + "=";
  if (document.cookie.length > 0) {
    var offset = document.cookie.indexOf(search);
    if (offset !== -1) {
      offset += search.length;
      var end = document.cookie.indexOf(";", offset);
      if (end === -1) end = document.cookie.length;
      return unescape(document.cookie.substring(offset, end));
    } else {
      return "";
    }
  }
};
/**
 * 删除cookie
 */
export const delCookie = name => {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null) {
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  }
};
/**
 * 删除所有cookie
 */
export const clearCookie = () => {
  var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
  if (keys) {
    for (var i = keys.length; i--;) {
      document.cookie = keys[i] + "=0;expires=" + new Date(0).toUTCString();
    }
  }
};
export const hasClass = (obj, cls) => {
  return obj.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
};

export const addClass = (obj, cls) => {
  if (!this.hasClass(obj, cls)) obj.className += " " + cls;
};

export const removeClass = (obj, cls) => {
  if (hasClass(obj, cls)) {
    var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
    obj.className = obj.className.replace(reg, " ");
  }
};
// 身份证验证
export const IdCodeValid = function (code) {
  // 身份证号合法性验证
  // 支持15位和18位身份证号
  // 支持地址编码、出生日期、校验位验证
  var city = {
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙古",
    21: "辽宁",
    22: "吉林",
    23: "黑龙江 ",
    31: "上海",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江西",
    37: "山东",
    41: "河南",
    42: "湖北 ",
    43: "湖南",
    44: "广东",
    45: "广西",
    46: "海南",
    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "西藏 ",
    61: "陕西",
    62: "甘肃",
    63: "青海",
    64: "宁夏",
    65: "新疆",
    71: "台湾",
    81: "香港",
    82: "澳门",
    91: "国外 "
  };
  var row = {
    pass: true,
    msg: "验证成功"
  };
  if (
    !code ||
    !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/.test(
      code
    )
  ) {
    row = {
      pass: false,
      msg: "身份证号格式错误"
    };
  } else if (!city[code.substr(0, 2)]) {
    row = {
      pass: false,
      msg: "身份证号地址编码错误"
    };
  } else {
    // 18位身份证需要验证最后一位校验位
    if (code.length === 18) {
      code = code.split("");
      // ∑(ai×Wi)(mod 11)
      // 加权因子
      var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      // 校验位
      var parity = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
      var sum = 0;
      var ai = 0;
      var wi = 0;
      for (var i = 0; i < 17; i++) {
        ai = code[i];
        wi = factor[i];
        sum += ai * wi;
      }
      if (parity[sum % 11] != code[17].toUpperCase()) {
        row = {
          pass: false,
          msg: "身份证号校验位错误"
        };
      }
    }
  }
  return row;
};