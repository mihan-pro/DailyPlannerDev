(function(){

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
            
            
            let htmlString = ' <div class = "plansList__planOverdue ' + "red" +
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

    let renderPlansButton = document.getElementById('renderPlansBtn');
    renderPlansButton.addEventListener('click',()=>{
        storage.renderPlans();
    });

    let renderOverduePlansButton = document.getElementById('renderOverduesPlansBtn');
    renderOverduePlansButton.addEventListener('click',()=>{
        storage.checkOverdues();
        storage.renderOverduePlans();
    });

    let returnPlanButton = document.getElementById('plansListID');
        returnPlanButton.addEventListener('click', ()=>{
        let target = event.target;
        let plan = target.parentElement;    
        plan = plan.parentElement;
        if(plan.classList.contains('plansList__planOverdue')&&
        target.id == 'returnPlanBtn'){        
            let id = plan.getAttribute('data-plansid');
            storage.returnPlan(id);
        }
    })

    let deleteOVDPlanBtn = document.getElementById('deleteOVDPlanBtn');
        returnPlanButton.addEventListener('click', ()=>{
        let renderList = localStorage.overduePlansStore;
        try{
            renderList = JSON.parse(renderList);
            
        }catch{
            console.log(Error.caller);
        } 
        let target = event.target;
        let plan = target.parentElement;    
        plan = plan.parentElement;
        if(plan.classList.contains('plansList__planOverdue')&&
        target.id == 'deleteOVDPlanBtn'){        
            let id = plan.getAttribute('data-plansid');            
            storage.delOneOverduePlan(renderList,id);
            
        }
        localStorage.overduePlansStore = JSON.stringify(renderList);
        storage.renderOverduePlans();
    })    

})();