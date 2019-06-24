(function(){
let importantCount = $('#importantCount');
let unimportantCount = $('#unimportantCount');
let donePercent = $('#donePercent');

let updateAllPlansCount = function(){
    storage.allPlans = storage.getCountImpPlans();
}
//получение важных планов
let updateImportantCount = function(){
    let value = storage.getCountImpPlans();
    $(importantCount).html(value);
}
//получение неважных планов
let updateUniportantCount = function(){
    let valueAll = storage.getCountPlans();
    let valueImp = storage.getCountImpPlans();
    let value = valueAll-valueImp;
    $(unimportantCount).html(value);
}
//подсчёт процента
let updatePercent = function(){
    storage.allPlans = storage.getCountPlans() + storage.getCountFinishedPlans();    
    let finishedPlans = storage.getCountFinishedPlans();
    if(storage.allPlans == 0 && finishedPlans < 1){
        $(donePercent).html( 0 + " %");
        return;
    }
    if(storage.allPlans == 0 && finishedPlans > 0){
        $(donePercent).html( 100 + " %");
        return;
    }
    let percent = finishedPlans/storage.allPlans*100;
    percent = Math.round(percent);
    $(donePercent).html(percent + " %");
}
//all plans show
let showAllPlansCount = function(){
    let count = $('#allPlansID');
    count.html(storage.getCountPlans());
}
storage.renderStats = function(){
    showAllPlansCount();
    updateAllPlansCount();
    updateImportantCount();
    updateUniportantCount();
    updatePercent();
}
})();