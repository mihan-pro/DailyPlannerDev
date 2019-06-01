(function(){
let importantCount = $('#importantCount');
let unimportantCount = $('#unimportantCount');
let donePercent = $('#donePercent');

let updateImportantCount = function(){
    let value = storage.getCountImpPlans();
    $(importantCount).html(value);
}
let updateUniportantCount = function(){
    let valueAll = storage.getCountPlans();
    let valueImp = storage.getCountImpPlans();
    let value = valueAll-valueImp;
    $(unimportantCount).html(value);
}
let updatePercent = function(){
    let allPlans = storage.getAllPlansCount();    
    let finishedPlans = storage.getCountFinishedPlans();
    if(allPlans == 0 && finishedPlans < 1){
        $(donePercent).html( 0 + " %");
        return;
    }
    if(allPlans == 0 && finishedPlans > 0){
        $(donePercent).html( 100 + " %");
        return;
    }
    let percent = finishedPlans/allPlans*100;
    percent = Math.round(percent);
    $(donePercent).html(percent + " %");
}
storage.renderStats = function(){
    updateImportantCount();
    updateUniportantCount();
    updatePercent();
}
})();