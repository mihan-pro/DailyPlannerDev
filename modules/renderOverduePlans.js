(function(){
    let plansList = document.getElementById('plansListID');
    let renderPlansButton = document.getElementById('renderPlansBtn');
    let showOVDBtn = document.getElementById('renderOverduesPlansBtn');

    //отображение просроченных планов
    storage.renderOverduePlans = function()
    {
        let renderList = localStorage.overduePlansStore;
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
            
            
            let htmlString = ' <div class = "plansList__planOverdue' + " red" +
            ' " data-plansid = "' + obj.plansId +
            '"> <p class = "plans-nameOVD " >' + obj.plansName +
            '</p><p class="plans-descriptionOVD">' + obj.plansDescription + '</p>'+
            '<div class="plans__comandButtonsOVD">'+
            '<div class=" btn delete-pln-btn" id="deleteOVDPlanBtn">Удалить</div>'+
            '<div class="btn add-pln-btn" id="returnPlanBtn">Вернуть</div>';
        

            let newElement = document.createElement('div');
            let list = document.getElementById('plansListID');
            $(newElement).html(htmlString);
            list.appendChild(newElement);
        }
        }
        
    };

    //ДЕЙСТВИЕ КНОПКИ 'АКТИВНЫЕ' ПЛАНЫ

    renderPlansButton.addEventListener('click',()=>{
        storage.renderPlans();
    });
    //действие кнопки показать просроченные

    showOVDBtn.addEventListener('click',()=>{
        storage.checkOverdues();
        storage.renderOverduePlans();
    });

    //действие возвращения плана

        plansList.addEventListener ('click', ()=>{
        let target = event.target;
        let plan = target;   
        plan = plan.parentElement;
        plan = plan.parentElement;
        
        if(plan.classList.contains('plansList__planOverdue')&&
        target.id == 'returnPlanBtn'){
            console.log("works herere");
            let id = plan.getAttribute('data-plansid');     
            storage.returnPlan(id);
        }
        else{
            return false;
        }
    })

    // кнопка удаления просроченного плана

    plansList.addEventListener('click', () => {
        let target = event.target;
        let plan = target;
        plan = plan.parentElement;
        plan = plan.parentElement;
        if (plan.classList.contains('plansList__planOverdue')
            &&
            (target.id == 'deleteOVDPlanBtn')) {
            let renderList = localStorage.overduePlansStore;
            console.log("TCL: let renderList", renderList)
            
            try {
                renderList = JSON.parse(renderList);

            } catch{
                console.log(Error.caller);
            }
            let id = plan.getAttribute('data-plansid');
            storage.delOneOverduePlan(renderList, id);
        
        localStorage.overduePlansStore = JSON.stringify(renderList);
        storage.renderOverduePlans();
        }
    })    

})();


    