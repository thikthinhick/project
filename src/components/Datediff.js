export default function Datediff(string){
    var date1 = new Date(string)
    var date2 = new Date();
    var date = new Date(date2 - date1);
    var time = "";
    var year = date.getFullYear() - 1970;
    var month = date.getMonth();
    var day = date.getUTCDate() - 1;
    var hour = date.getUTCHours();
    var minutes = date.getUTCMinutes();
    var second = date.getUTCSeconds();
    if(year > 0) {time+=year + ' năm trước'; return time;}
    else if(month > 0){ time+=month + ' tháng trước'; return time;}
    else if(day >= 7 && day < 30) {time+= (day/7)+ ' tuần trước'; return time}
    else if(day > 0 && day < 7 ) {time += day + ' ngày trước'; return time}
    else if(hour > 0) {time += hour + ' giờ trước'; return time}
    else if(minutes > 0) {time += minutes + " phút trước"; return time;}
    else time+= second + " giây trước"
    return time;
}