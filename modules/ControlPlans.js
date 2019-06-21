// (function(){
let deleteAllButton = document.getElementById('delAllBtn');
var plansList = document.getElementById('plansListID');

// удаление всех планов
deleteAllButton.addEventListener('click', ()=>{
    storage.deleteAllPlans();
    storage.renderPlans();
    storage.renderStats();
})

//удаление одного плана

plansList.addEventListener('click',()=>{
    let target = event.target;
    let plan = target.parentElement;    
    plan = plan.parentElement;
    if(plan.classList.contains('plansList__plan')&&
    target.id == 'deletePlanBtn'){        
        let id = plan.getAttribute('data-plansid');
        storage.deleteOnePlan(id);
        setTimeout(storage.renderPlans(),0); 
        storage.renderStats();
    }
})

//Отметить сделаный и удалить из списка
plansList.addEventListener('click',()=>{
    let target = event.target;
    let plan = target.parentElement;    
    plan = plan.parentElement;
    if(plan.classList.contains('plansList__plan')&&
    target.id == 'readyPlanBtn'){        
        let id = plan.getAttribute('data-plansid');
        storage.finishOnePlan(id);
        storage.renderPlans();
        storage.renderStats();        
    }
});

//вернуть план  в список на выполнения
plansList.addEventListener('click',()=>{
    let target = event.target;
    let plan = target.parentElement;    
    plan = plan.parentElement;
    if(plan.classList.contains('plansList__plan')&&
    target.id == 'returnPlanBtn'){        
        let id = plan.getAttribute('data-plansid');
        storage.returnPlan(id);
        storage.renderPlans();
        storage.renderStats();        
    }
})

















// })();