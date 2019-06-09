

(function(){

    storage.weather = {};
    const NNPath = "http://api.openweathermap.org/data/2.5/weather?id=520555&APPID=5c35c4af3b7927cc350e0e46a2e65a81";
    const MSKPath = "http://api.openweathermap.org/data/2.5/weather?id=524901&APPID=5c35c4af3b7927cc350e0e46a2e65a81";
    const VerkhoyanskPath = "http://api.openweathermap.org/data/2.5/weather?id=2013465&APPID=5c35c4af3b7927cc350e0e46a2e65a81";
    const LondonPath = "http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=5c35c4af3b7927cc350e0e46a2e65a81";
    let userChoice = document.getElementById('cityChoice');
    
    // запрос на сервер
    let getWeather = function(path)
    {
        let options = 
        {
            type: 'GET',
            url: path,
            datType: 'json',
            success: function(data)
            {   
                storage.renderWeather(data);
                return data;
            }
            ,
            error: function()
            {
                console.log("error of conection");
            }        
        }
        let weather =  $.ajax(options);
        return weather;
    };    
    //извлечение информации о темрературе из ответа сервера
    var getTemperature = function(serverAnswer)
    {
        let response = serverAnswer;
        let json = response.responseJSON;
        let main = json.main
        let degree = main.temp;
        degree = Math.round(degree - 273);
        return degree;
    }
    //извлечение информации о погоде из ответа сервера
    var getSkyState = function(serverAnswer)
    {
        let response = serverAnswer.responseJSON;
        let weather = response.weather
        let skyState = weather[0].main;        
        return skyState;
    }
    //общее отображение
    storage.renderWeather = function()
    {
        let answer = storage.weather;
        let degree = getTemperature(answer);
        let sky = getSkyState(answer);
        renderTemp(degree);
        renderSkyState(sky);
        
    }
    //отображение текущей температуры 
    let renderTemp = function(deg)
    {
        let tempDiv = $('#tempDiv');
        let tempVal = $('#temperature-value');
        if(deg >= 20){
            $(tempDiv).removeClass();
            $(tempDiv).addClass(['tempPlus','weather-logo']);
        }
        else if(deg >= 0 && deg < 20){
            $(tempDiv).removeClass();
            $(tempDiv).addClass(['warm','weather-logo']);
        }
        else if(deg<0 && deg>-10){
            $(tempDiv).removeClass();
            $(tempDiv).addClass(['cold','weather-logo']);
        }
        else{
            $(tempDiv).removeClass('tempPlus');
            $(tempDiv).addClass('temp-');
        }
        $(tempVal).html(deg);
    }
    // отображение текущей погоды
    let renderSkyState = function(sky)
    {
        let skyDiv = $('#skyDiv');
        let skyVal = $('#sky-value');
        if(sky == "Drizzle"){
            skyDiv.removeClass();
            skyDiv.addClass(['weather-logo','cloud']);
            $(skyVal).html('Пасмурно');
        }
        if(sky == "Rain" ){
            skyDiv.removeClass();
            skyDiv.addClass(['weather-logo','rain']);
            $(skyVal).html('Дождь');
        }
        if(sky == "Snow" ){
            skyDiv.removeClass();
            skyDiv.addClass(['weather-logo','snow']);
            $(skyVal).html('Снег');
        }
        if(sky == "Thunderstorm" ){
            skyDiv.removeClass();
            skyDiv.addClass(['weather-logo','storm']);
            $(skyVal).html('Гроза');
        }
        if(sky == "Clear" ){            
            let time = new Date;
            let hour = time.getHours();
            let lightChoice = (hour)=>
            {
                if(hour > 21 || hour < 6)
                {
                skyDiv.removeClass();
                skyDiv.addClass(['weather-logo','moon']);
                $(skyVal).html('Ясно');
                return ;
                }
                else 
                {
                skyDiv.removeClass();
                skyDiv.addClass(['weather-logo','sun']);
                $(skyVal).html('Ясно');
                }
            };
            lightChoice(hour);                
        }
        
        if(sky == "Clouds" ){
            skyDiv.removeClass();
            skyDiv.addClass(['weather-logo','cloudy']);
            $(skyVal).html('Облачно');
        }
    }


    // использование функций

    storage.weather = getWeather(NNPath);
    setTimeout(()=>
    {
        storage.renderWeather.apply(storage.weather,storage.weather);
    },3000);
    setInterval(()=>{
        storage.renderWeather.apply(storage.weather,storage.weather)
    },1800000);

    userChoice.addEventListener('change',()=>    {
        if(userChoice.value == "Москва"){
            storage.weather = getWeather(MSKPath);
            // setTimeout(()=>
            // {
            //     storage.renderWeather.apply(storage.weather,storage.weather);
            // },3000);
        }
        else if(userChoice.value == "Нижний Новгород")
        {
            storage.weather = getWeather(NNPath);
            // setTimeout(()=>
            // {
            //     storage.renderWeather.apply(storage.weather,storage.weather);
            // },3000);
        }
        else if(userChoice.value == "Верхоянск")
        {
            storage.weather = getWeather(VerkhoyanskPath);
            // setTimeout(()=>
            // {
            //     storage.renderWeather.apply(storage.weather,storage.weather);
            // },3000);
        }
        else if(userChoice.value == "London")
        {
            storage.weather = getWeather(LondonPath);
            // setTimeout(()=>
            // {
            //     storage.renderWeather.apply(storage.weather,storage.weather);
            // },3000);
        }
    })
})();

