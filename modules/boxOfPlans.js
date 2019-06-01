(function(){
    storage.plansStore = {};
    let plansCounter = 0;
    let plansIndex = 0;//для идентификации планов
    const id = "ID";//для идентификации планов
    let impPlansCount = 0;
    let finishedPlans = 0;

    storage.addNewPlan = function(name,description,status){
        plansCounter++;
        let index = id + plansIndex;
        if(plansIndex == 0){
            finishedPlans = 0;
        }
        plansIndex++;
        if(status == 1){
            impPlansCount++;
        }

        storage.plansStore[index] = {
            plansName: name ,
            plansDescription: description ,
            plansStatus: status ,
            plansId: index ,
        };
        
        storage.renderStats();
    };

    storage.deleteOnePlan = function(id){
        plansCounter--;
        let plan = storage.plansStore[id];
        let planStaus = plan.plansStatus;
        if(planStaus == 1){
            impPlansCount--;
        }
        delete storage.plansStore[id];
        let allPlans = storage.getCountPlans();
        if(allPlans == 0){
            plansIndex = 0;
            // finishedPlans = 0;
        }
        storage.renderStats();
    };

    storage.finishOnePlan = function(id){ 
        finishedPlans++;
        storage.deleteOnePlan(id);
        storage.renderStats();
    }

    storage.deleteAllPlans = function(){
        plansCounter = 0;
        plansIndex = 0;
        for(item in storage.plansStore){
            delete storage.plansStore[item];
            storage.renderStats();
        };
    };

    storage.getPlans = function(){
        return storage.plansStore;
    };

    storage.getCountPlans = function(){
        return plansCounter;
    }

    storage.getCountImpPlans = function(){
        return impPlansCount;
    }

    storage.getCountFinishedPlans = function(){
        return finishedPlans;
    }
    
    storage.getAllPlansCount = function(){
        return plansIndex;
    }

})();