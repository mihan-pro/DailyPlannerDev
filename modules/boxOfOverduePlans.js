(function(){
    let overduesCount;
    if(localStorage.overduePlansStore == undefined){
        localStorage.overduePlansStore = {};
        overduesCount = 0;
    }
    
    //добавить план в просроченные
    storage.addNewOverduePlan = function(id){
        overduesCount += 1;
        let currentStore = localStorage.overduePlansStore;
        try{
            currentStore = JSON.parse(currentStore);
        }
        catch{
            currentStore = {};
        }
        let plansStore = localStorage.plansStore;
        plansStore = JSON.parse(plansStore);
        let plan = plansStore[id];
        console.log("plan;= ", plan);
        currentStore[id] = plan;
        console.log("currentStore[id] = plan;= ",currentStore[id]);

        localStorage.overduePlansStore = JSON.stringify(currentStore);
        storage.deleteOnePlan(id);
        storage.renderPlans();
    };

    //удалить все планы
    let delOverduePlans = ()=>{
        localStorage.overduePlansStore = {};
        overduesCount = 0;
    }

    //удалить один план
    storage.delOneOverduePlan = (obj,id)=>{
        delete obj[id];
    }

    //функция возвращения плана в основное хранилище
    storage.returnPlan = function(id){
        let currentStore = localStorage.overduePlansStore;
        try{
            currentStore = JSON.parse(currentStore);
        }
        catch{
            console.log("НЕ МОГУ ОТКРЫТЬ ХРАНИЛИЩЕ ПРОСРОЧЕННЫХ ПЛАНОВ")
        }
        let luckyPlan = currentStore;
        luckyPlan = luckyPlan[id];
        let name = luckyPlan.plansName;
        let description = luckyPlan.plansDescription;
        let status = luckyPlan.plansStatus;
        let timeLim = new Date("3000-01-15");

        storage.addNewPlan(name,description,status,timeLim);
        storage.delOneOverduePlan(currentStore,id);
        localStorage.overduePlansStore = JSON.stringify(currentStore);
        storage.renderOverduePlans();
    }

    //проверка основного хранилища на просроченные планы
    storage.checkOverdues = function(){
        let currentStore = localStorage.plansStore;
        try {
            currentStore = JSON.parse(currentStore);
        } catch {
            console.log(Error.caller);
        }
        let curDate = new Date;
        for(item in currentStore){
            let obj = currentStore[item];
            let date = obj.timeLimit;
            date = new Date(date);
            date.setMonth(date.getMonth()-1);
            date.setDate(date.getDate()+1); //костыль 
            if(date<curDate){                
                storage.addNewOverduePlan(obj.plansId);
                storage.deleteOnePlan(obj.plansId);
            }
        }
        localStorage.plansStore = JSON.stringify(currentStore);
    }
    //получение плана из хранилища просроченных
    storage.getOverdueItem = function(id){
        let currentStore = localStorage.overduePlansStore;
        try{
            currentStore = JSON.parse(currentStore);
        }catch{
            console.log(Error.caller);
        }
        return currentStore[id];        
    }

    //проверка хранилища просроченных планов на пустоту 
    storage.checkOverdueStorage = function(){
        let currentStore = localStorage.overduePlansStore;
        try{
            currentStore = JSON.parse(currentStore);
        }catch{
            console.log(Error.caller);
        }
        if(currentStore === {}){
            return false;
        }
        let keys = Object.keys(currentStore);
        if(keys.length > 0){
            return true;
        }
        else{
            return false;
        }    
    }






















})();