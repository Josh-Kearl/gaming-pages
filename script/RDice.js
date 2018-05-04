





$(".diceRoller").click(function(){
    var x = Math.floor((Math.random() * 20) + 8);
    if (x > 20){
        x = 20;
    } else {
        console.log(x);
    }

});


