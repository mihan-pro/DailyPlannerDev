(function(){    
    var plansStore = {};
    if (localStorage.plansStore === undefined) {
        localStorage.setItem("plansStore", JSON.stringify(plansStore));
    }
    if(localStorage.plansIndex === undefined){
        localStorage.setItem('plansIndex', 0 + '');
    }

    var plansCounter = 0
    //для идентификации планов
    const id = "ID";//для идентификации планов
    var impPlansCount = 0;
    var finishedPlans = 0;



    //добавить план
    storage.addNewPlan = function(name,description,status,timeLim){
        plansCounter++;
        let plansIndex = localStorage.plansIndex;
        let index = id + plansIndex;
        if(+plansIndex == 0){
            finishedPlans = 0;
        }
        +plansIndex++
        localStorage.plansIndex = plansIndex + "";
        if(status == 1){
            impPlansCount++;
        }

        let currentStore = localStorage.plansStore;
        try {
            currentStore = JSON.parse(currentStore);
        } catch {
            currentStore = {};
        }
                

        currentStore[index] =
            {
            plansName: name ,
            plansDescription: description ,
            plansStatus: status ,
            plansId: index ,
            timeLimit: timeLim,
            };
            localStorage.plansStore = JSON.stringify(currentStore);    
        storage.renderStats();
    };

    //удалить один план
    storage.deleteOnePlan = function(id){
        plansCounter--;
        let currentStore = localStorage.plansStore;
        currentStore = JSON.parse(currentStore);

        let plan = currentStore[id];
        let planStaus = plan.plansStatus;
        if(planStaus == 1){
            impPlansCount--;
        }
        
        delete currentStore[id];
        localStorage.plansStore = JSON.stringify(currentStore);

        let allPlans = storage.getCountPlans();
        if(allPlans == 0){
            localStorage.plansIndex = 0 + "";
            // finishedPlans = 0;
        }
        storage.renderStats();
    };

    //закончить один план
    storage.finishOnePlan = function(id){ 
        finishedPlans++;
        storage.deleteOnePlan(id);
        storage.renderStats();
    }

    //удалить все планы
    storage.deleteAllPlans = function(){
        plansCounter = 0;
        localStorage.plansIndex = 0 + "";
        localStorage.plansStore = {};
        storage.renderStats();
        
    };

    //получить количество
    storage.getCountPlans = function(){
        let count = 0;
        let currentStore = localStorage.plansStore;
        try{
            currentStore = JSON.parse(currentStore);
        } catch{
            currentStore = {};
        }
        
        for(item in currentStore){
            count++
        }
        return count;
    };

    //получить количество важных
    storage.getCountImpPlans = function(){
        let count = 0;
        let currentStore = localStorage.plansStore;
        try{
            currentStore = JSON.parse(currentStore);
        } catch{
            currentStore = {};
        }
        
        for(item in currentStore){
            let obj = currentStore[item];
            if(obj.plansStatus == 1){
                count++;
            }
        }
        return count;
    }

    //functions for statistic
    storage.getCountFinishedPlans = function(){
        return finishedPlans;
    }
    
    storage.getAllPlansCount = function(){
        return localStorage.plansIndex;
    }

//check overdues


})();