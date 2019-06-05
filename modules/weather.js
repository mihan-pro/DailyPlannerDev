

(function(){

    storage.weather = {};
    const NNPath = "http://api.openweathermap.org/data/2.5/weather?id=520555&APPID=5c35c4af3b7927cc350e0e46a2e65a81";
    const MSKPath = "http://api.openweathermap.org/data/2.5/weather?id=524901&APPID=5c35c4af3b7927cc350e0e46a2e65a81";
    let userChoice = document.getElementById('cityChoice');
    
    let getWeather = function(path){
        let options = {
            type: 'GET',
            url: path,
            datType: 'json',
            success: function(data){
                return data;
            }
            ,
            error: function(){
                console.log("connection error")
            }        
        }
        let weather =  $.ajax(options);
        return weather;
    };
    
    storage.weather = getWeather(NNPath);
    

    var getTemperature = function(serverAnswer){
        let response = serverAnswer;
        console.log(typeof(response),
        "answer = ",response['responseJSON']);
        console.log("response = ",response);
        let json = response.responseJSON;
        console.log("json = ",json);
        let main = json.main
        let degree = main.temp;
        degree = Math.round(degree - 273);
        return degree;
    }

    var getSkyState = function(serverAnswer){
        let response = serverAnswer.responseJSON;
        let weather = response.weather
        let skyState = weather[0].description        
        return skyState;
    }

    storage.renderWeather = function(){
        let answer = storage.weather;
        let degree = getTemperature(answer);
        let sky = getSkyState(answer);
        renderTemp(degree);
        renderSkyState(sky);
        
    }

    let renderTemp = function(deg){
        let tempDiv = $('#tempDiv');
        let tempVal = $('#temperature-value');
        if(deg >= 0){
            $(tempDiv).removeClass('temp-');
            $(tempDiv).addClass('tempPlus');
        }
        else{
            $(tempDiv).removeClass('tempPlus');
            $(tempDiv).addClass('temp-');
        }
        $(tempVal).html(deg);
    }
    let renderSkyState = function(sky){
        let skyDiv = $('#skyDiv');
        let skyVal = $('#sky-value');
        if(sky == "broken clouds"){
            skyDiv.removeClass();
            skyDiv.addClass(['weather-logo','cloud']);
            $(skyVal).html('Пасмурно');
        }
        if(sky == "shower rain"|| sky == "rain" ){
            skyDiv.removeClass();
            skyDiv.addClass(['weather-logo','rain']);
            $(skyVal).html('Дождь');
        }
        if(sky == "snow" ){
            skyDiv.removeClass();
            skyDiv.addClass(['weather-logo','snow']);
            $(skyVal).html('Снег');
        }
        if(sky == "thunderstorm" ){
            skyDiv.removeClass();
            skyDiv.addClass(['weather-logo','storm']);
            $(skyVal).html('Гроза');
        }
        if(sky == "clear sky" ){
            skyDiv.removeClass();
            skyDiv.addClass(['weather-logo','sun']);
            $(skyVal).html('Ясно');
        }
        if(sky == "few clouds" || sky == "scattered clouds" ){
            skyDiv.removeClass();
            skyDiv.addClass(['weather-logo','cloudy']);
            $(skyVal).html('Облачно');
        }
    }



    userChoice.addEventListener('change',()=>{
        if(userChoice.value == "Москва"){
            storage.weather = getWeather(MSKPath);
            setTimeout(()=>{
                storage.renderWeather.apply(storage.weather,storage.weather);
            },3000);
        }
        else if(userChoice.value == "Нижний Новгород"){
            storage.weather = getWeather(NNPath);
            setTimeout(()=>{
                storage.renderWeather.apply(storage.weather,storage.weather);
            },3000);
        }
    })


})();

