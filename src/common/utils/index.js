export const getParseDate = (time,sign = "-") => {
    console.log('time,',time,sign);
    const date = time ? new Date(time) : new Date();
    
    const year = date.getFullYear(),
          weekArr = ['星期天','星期一', '星期二', '星期三', '星期四', '星期五', '星期六']; // 年
    let month = date.getMonth() + 1, // 月
        day  = date.getDate(), // 日
        hour = date.getHours(), // 时
        minutes = date.getMinutes(), // 分
        seconds = date.getSeconds(), //秒
        week = weekArr[date.getDay()];
    // 为个位数时前面加 “0”
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (day >= 0 && day <= 9) {
        day = "0" + day;
    }
    if (hour >= 0 && hour <= 9) {
        hour = "0" + hour;
    }
    if (minutes >= 0 && minutes <= 9) {
        minutes = "0" + minutes;
    }
    if (seconds >= 0 && seconds <= 9) {
        seconds = "0" + seconds;
    }
    
    const fullTime = year + sign + month + sign + day + " " + `${hour}:${minutes}:${seconds}  ${week}`;
    return {year, month, day, week, hour, minutes, seconds, fullTime};
}

