storage.popUp = $('.addNewPopUp');
storage.addNewBtn = document.getElementById('addNewBtnID');
storage.closeBtn = document.getElementById('closeBtnID');
storage.setNewPlanBtn = document.getElementById('setNewBtnID');

// описание функций

//появление и скрытие формы
storage.showPopUp = function(){
    $('.POPUP').css('display','contents');
    $(storage.popUp).show(200);
}

storage.hidePopUp = function(){
    $(storage.popUp).hide(150);
}

// получение данных из формы
storage.takeNameFromPopUp = function(){
    let input = $('#plansNameInputID');
    let val = $(input).val();    
    // 
    return val;
}
storage.takeDescriptonFromPopUp = function(){
    let input = $('#plansDescriptInputID');
    let val = $(input).val();    
    // storage.descriptionOfPlan = val;
    return val;
}
storage.takeStatusFromPopUp = function(){
    let input = $('#PlansStatusID');
    let val = '0'
    if( $(input).is(":checked")){
        val = '1';
    }    
    // 
    return val;
}
storage.takeTimeLimit = function(){
    let userValDate = $('#timeLimitDate').val();
    let userValMonth = $('#timeLimitMonth').val();
    let userValYear = $('#timeLimitYear').val();
    if( userValDate  == "" ||
        userValMonth == "" || 
        userValYear  == "" ){
        userVal = "3000-01-15";
        var userDate = new Date(userVal);
        return userDate;
    }
    try{
        var userDate = new Date(userValYear,userValMonth,userValDate);
        console.log("evrything were good = ",userDate);
    } catch{
        console.log("somthing was wrong into ", userDate);
    }
    return userDate;
}

//Очистка формы
storage.clearValuesInPopUp = function(){
    $('#plansNameInputID').val("");
    $('#plansDescriptInputID').val("");
    $('#PlansStatusID').prop('checked',false);
    $('#timeLimitDate').val("");
    $('#timeLimitMonth').val("");
    $('#timeLimitYear').val("");
    storage.nameOfPlan = "";
    storage.descriptionOfPlan = "";
    storage.status = "";
}

//проверки заполнения формы
storage.checkNamePopUp = function(){
    let name = $('#plansNameInputID');
    let val = $(name).val();
    val.trimLeft();
    console.log( 'val enght = ', val.length);
    if(val < "                                             A"){
        return false;
    }    
    return true;
}
storage.checkDiscriptPopUp = function(){
    let descript = $('#plansDescriptInputID');
    let val = $(descript).val();
    val.trimLeft();
    console.log( 'val enght = ', val.length);
    if(val < "                                             A"){
        return false;
    }    
    return true;
}

storage.checkTimeLimit = function(){
    let currentDate = new Date;
 {   // let userValDate = $('#timeLimitDate').val();
    // let userValMonth = $('#timeLimitMonth').val();
    // let userValYear = $('#timeLimitYear').val();
    // if( userValDate  == "" ||
    //     userValMonth == "" || 
    //     userValYear  == "" ){
    //     userVal = "3000-01-15";
    //     var userDate = new Date(userVal);
    //     return true;
    // }
    // try{
    //     var userDate = new Date(userValYear,userValMonth,userValDate);
    //     console.log("evrything were good = ",userDate);
    // } catch{
    //     console.log("somthing was wrong into ", userDate);
    // }
}
    let userDate = storage.takeTimeLimit();    
    if( currentDate > userDate){
        return false;
    }
    else
    {
        return true;
    }    
}

var requierFill = function(){
    if(!storage.checkNamePopUp()){
        $('#plansNameInputID').focus();
        $('#pNameID').addClass('error');
        $('#notice').html("Это поле обязательно для заполнения!")
        return true;
    }
    else{
        $('#pNameID').removeClass('error');
        $('#notice').html("")
        return false;
    }
}

var requierTimeLimit = function(){
    if(!storage.checkTimeLimit()){
        $('#timeLimitDate').focus();
        $('#setStatus__timeAlert').show();
        return true;
    }
    else{
        $('#setStatus__timeAlert').hide();
        return false;
    }
}


storage.setNewPlanBtn.addEventListener('click',()=>{
    storage.showPopUp();
    $('#plansNameInputID').focus();
});

$('#plansNameInputID').blur(()=>{
    requierFill();
});

$('#timeLimitYear').blur(()=>{
    storage.checkTimeLimit();
    requierTimeLimit();
});

storage.closeBtn.addEventListener('click',storage.hidePopUp);

storage.addNewBtn.addEventListener('click', ()=>{
    if(requierFill())return false;
    if(requierTimeLimit()){return false};
    storage.addNewPlan( storage.takeNameFromPopUp() ,
                        storage.takeDescriptonFromPopUp() ,
                        storage.takeStatusFromPopUp(),
                        storage.takeTimeLimit(),
                    );
    storage.clearValuesInPopUp();
    storage.hidePopUp();
    storage.renderPlans();
});

