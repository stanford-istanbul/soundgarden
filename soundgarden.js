
$(document).ready(function(){
    function playSound(note) {
        var audio = new Audio('sounds/'+note+'.wav');
        audio.play();
    }

});