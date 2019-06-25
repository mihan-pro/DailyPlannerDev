var storage = {};
var loadingScreen = $('#loadingScreen')

window.onload = ()=>{
    storage.checkOverdues();
    storage.renderPlans();
    loadingScreen.hide(400);
}