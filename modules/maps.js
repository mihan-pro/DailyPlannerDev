(function () {
    let userChoice = document.getElementById('cityChoice');


    try{
    ymaps.ready(init)
    function init() {
        var myMap = new ymaps.Map("mapsBlock", {
            center: [56.314509846689724,43.98961707026494],
            controls:['geolocationControl','searchControl','trafficControl','typeSelector','fullscreenControl'],
            zoom: 10
        });
        let control = myMap.controls.get('trafficControl');

        // Покажем пробки на карте.
        control.showTraffic();
        userChoice.addEventListener('change', () => {
            if (userChoice.value == "Москва") {
                myMap.panTo([[55.75287121566924,37.624756535596966]], {duration: 2000});
            }
            else if (userChoice.value == "Нижний Новгород") {
                myMap.panTo([56.314509846689724,43.98961707026494], {duration: 2000});
            }
            else if (userChoice.value == "Верхоянск") {
                myMap.panTo([67.54897420102687,133.3891371016075], {duration: 2000});
            }
            else if (userChoice.value == "London") {
                myMap.panTo([[51.508916513575834,-0.12684962547236317]], {duration: 2000});
            }
        });
    }
    }
    catch{
        let block = $('#mapsBlock');
        block.html('<img src="./img/disconnected.png">'+
        '<p class="maps-txt">Для отображения карт и погоды <br>'+
        'Пожалуйста подключитесь к сети </p>' );
    }

    


})();

