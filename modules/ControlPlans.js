// (function(){
let deleteAllButton = document.getElementById('delAllBtn');
var plansList = document.getElementById('plansListID');

// удаление всех планов
deleteAllButton.addEventListener('click', ()=>{
    storage.deleteAllPlans();
    storage.renderPlans();
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
        storage.renderPlans();        
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
    }
})

















// })();