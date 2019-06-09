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
            
            // ломается здесь не может найти свойства у обьекта item
            //сделано!            

            let obj = renderList[item];

            if(+obj.plansStatus == 1){
                statusClass = "important-plan";
            }
            
            let htmlString = ' <div class = "plansList__plan ' + statusClass +
            ' " data-plansid = "' + obj.plansId +
            '"> <p class = "plans-name " >' + obj.plansName +
            '</p><p class="plans-description">' + obj.plansDescription + '</p>'+
            '<div class="plans__comandButtons">'+
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