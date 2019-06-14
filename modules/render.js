(function(){
    
    // console.log("renderList ==",renderList);

    storage.renderPlans = function()
    {
        let renderList = localStorage.plansStore;
        try{
            renderList = JSON.parse(renderList);
        }catch{
            console.log("somthing was wrong");
            renderList = {};
        }
        
        $('#plansListID').empty();
        
        for(let item in renderList){
            if(renderList.hasOwnProperty(item)){            
            let statusClass = "";
            let obj = renderList[item];
            let date = obj.timeLimit;
            date = new Date(date);
            let plansYear = +date.getFullYear();
            let plansMonth = +date.getMonth();
            let plansDay = +date.getDate();
            let timeLimitText = "Выполнить до: "
            
            if(plansDay<10){
                plansDay = "0"+ plansDay;
            }
            if(plansMonth<10){
                plansMonth = "0"+ plansMonth;
            }
            
            plansDay+=".";
            plansMonth+="."
            if(plansYear == 3000){
                plansYear = "";
                plansMonth = "";
                plansDay = ""
                timeLimitText = "";
            }
            if(+obj.plansStatus == 1){
                statusClass = "important-plan";
            }
            
            
            let htmlString = ' <div class = "plansList__plan ' + statusClass +
            ' " data-plansid = "' + obj.plansId +
            '"> <p class = "plans-name " >' + obj.plansName +
            '</p><p class="plans-description">' + obj.plansDescription + '</p>'+
            '<div class="plans__comandButtons">'+
            '<div class="plansTimeLimit">'+ timeLimitText + 
            '<span id="plansTimeLimitVal">'+ 
            `${plansDay }${plansMonth}${plansYear}`+
            '</span> </div>'+
            '<div></div>'+
            '<div class=" btn delete-pln-btn" id="deletePlanBtn">Удалить</div>'+
            '<div class="btn add-pln-btn" id="readyPlanBtn">Готово!</div>';
        

        let newElement = document.createElement('div');
        let list = document.getElementById('plansListID');
        $(newElement).html(htmlString);
        list.appendChild(newElement);
        }
        // $('.content-block__planList').append(htmlString);
    }
    storage.renderStats();
};
})();