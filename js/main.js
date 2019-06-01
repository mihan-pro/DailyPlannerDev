var storage = {};
storage.time = $('#timeID');
storage.date = $('#dateID');

// обьявление функций
//установка времени
storage.setTime = function(time){
    let date = new Date;
    let minute = date.getMinutes();
    if(minute<10)
    {
        minute = '0'+ minute;
    }
    time = date.getHours() + ":" + minute;
    if(date.getHours == 0){
        $(storage.date).html(storage.setDate());
    } 
    return time;
}
//форматирование в российский формат
storage.setDate = function(date){
    let formater = new Intl.DateTimeFormat("ru");
    let dateNow = formater.format(new Date); 
    return dateNow;
}

// использование функций
$(storage.date).html(storage.setDate(storage.date));
$(storage.time).html(storage.setTime(storage.time));
setInterval(()=>{
    $(storage.time).html(storage.setTime(storage.time));
},30000);