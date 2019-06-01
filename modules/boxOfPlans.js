(function(){
    storage.plansStore = {};
    let plansCounter = 0;
    let plansIndex = 0;
    const id = "ID";
    let impPlansCount = 0;
    let finishedPlans = 0;

    storage.addNewPlan = function(name,description,status){
        plansCounter++;
        let index = id + plansIndex;
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
    };

    storage.deleteOnePlan = function(id){
        plansCounter--;
        if(storage.plansStore[id].status == 1){
            impPlansCount--;
        }
        delete storage.plansStore[id];
    };

    storage.finishOnePlan = function(id){        
        finishedPlans++;
        storage.deleteOnePlan(id);
    }

    storage.deleteAllPlans = function(){
        plansCounter = 0;
        for(item in storage.plansStore){
            delete storage.plansStore[item];
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

})();