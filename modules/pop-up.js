storage.popUp = $('.addNewPopUp');
storage.addNewBtn = document.getElementById('addNewBtnID');
storage.closeBtn = document.getElementById('closeBtnID');
storage.setNewPlanBtn = document.getElementById('setNewBtnID');

// описание функций

//появление и скрытие формы
storage.showPopUp = function(){
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

//Очистка формы
storage.clearValuesInPopUp = function(){
    $('#plansNameInputID').val("");
    $('#plansDescriptInputID').val("");
    $('#PlansStatusID').prop('checked',false);
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


// применение
$(storage.popUp).hide();



storage.setNewPlanBtn.addEventListener('click',()=>{
    storage.showPopUp();
    $('#plansNameInputID').focus();
});

$('#plansNameInputID').blur(()=>{
    requierFill();
});

storage.closeBtn.addEventListener('click',storage.hidePopUp);

storage.addNewBtn.addEventListener('click', ()=>{
    if(requierFill())return false;
    storage.addNewPlan( storage.takeNameFromPopUp() ,
                        storage.takeDescriptonFromPopUp() ,
                        storage.takeStatusFromPopUp() 
                    );
    storage.clearValuesInPopUp();
    storage.hidePopUp();
    storage.renderPlans();
});

