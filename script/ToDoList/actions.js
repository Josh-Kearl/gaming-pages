$(document).ready(function() {


    $(document).on("click", ".deleteBtn", function(){
        if($(".toDoRowActive")){
            $(this).closest(".toDoRowActive").slideUp("fast", function(){
                $(this).remove();
            })
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
        var list = $(".list");
        var appendedElement = $("<div class='toDoRow'>\
                                <span class='checkMark'><i class='fas fa-check-square'></i></span>\
                                <span class='listLabel'>" + inputText + "</span>\
                                <a class=\"deleteBtn\"><i class=\"fas fa-minus-square\"></i></a>\
                         </div>");

        if (inputText === "") {
            alert("Invalid input: Please enter a task");
        } else {
            appendedElement.appendTo(list);
            list.children().last().slideDown("fast");
            list.children().last().css("display", "flex");
            resetVal;
        }

    })

    $(".taskCreator").keypress(function(e) {
        if (e.which === 13) {
            $(".addTask").click();
        }


    });

});

function openNav (){
    $(".sideNav").toggleClass("sideNavActive");
}

function closeNav () {
    $(".sideNavActive").toggleClass("sideNav");
}




