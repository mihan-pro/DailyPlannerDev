storage.weather = {};
storage.NNPath = "http://api.openweathermap.org/data/2.5/weather?id=520555&APPID=5c35c4af3b7927cc350e0e46a2e65a81";
storage.MSKPath = "http://api.openweathermap.org/data/2.5/weather?id=524901&APPID=5c35c4af3b7927cc350e0e46a2e65a81";


storage.getWeather = function(path){
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
    // console.log(weather);
    return weather;
};

storage.weather = storage.getWeather(storage.NNPath);
storage.weather =  storage.weather.responseText;

// 520555 nizhni
// 524901 moscow