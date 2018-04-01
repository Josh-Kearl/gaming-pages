$(document).ready(function() {


    $(document).on("click", ".deleteBtn", function(){
        if($(".toDoRowActive")){
            console.log(this);
            $(this).closest(".toDoRowActive").remove();
        }

    });




    $(document).on("click", ".toDoRow", function () {
        $(this).toggleClass("toDoRow toDoRowActive");
        $(this).find(".checkMark").toggleClass("checkMark checkMarkActive");

    });
    $(document).on("click", ".toDoRowActive", function () {
        $(this).toggleClass("toDoRowActive toDoRow");
        $(this).find(".checkMarkActive").toggleClass("checkMarkActive checkMark");
    });


    $(".addTask").click(function () {
        var inputText = $(".taskCreator").val();
        var resetVal = $(".taskCreator").val("");

        if (inputText === "") {
            alert("Invalid input: Please enter a task");
        } else {
            $(".list").append("<div class='toDoRow'>\
                                <span class='checkMark'><i class='fas fa-check-square'></i></span>\
                                <span class='listLabel'>" + inputText + "</span>\
                                <a class=\"deleteBtn\"><i class=\"fas fa-minus-square\"></i></a>\
                         </div>");
            resetVal;
        }


    })

    $(".taskCreator").keypress(function(e) {
        if (e.which === 13) {
            $(".addTask").click();
        }


    });

});


