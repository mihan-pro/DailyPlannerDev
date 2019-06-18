var storage = {};
var loadingScreen = $('#loadingScreen')

window.onload = ()=>{
    storage.renderPlans();
    loadingScreen.hide(400);
}