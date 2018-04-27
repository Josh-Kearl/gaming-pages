var allcourses;
var selcourse;
var numplayers = 1;

loadDoc();


function loadDoc(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            allcourses = JSON.parse(this.responseText);
            console.log(allcourses);
            for (let i = 0; i < allcourses.courses.length; i++) {
                console.log(allcourses.courses[i].id);
                $(".courseDropdown").append("\
                    <option value ='"+ allcourses.courses[i].id +"'>\
                " + allcourses.courses[i].name +"</option>");
            }


            $(".rightMenu").empty();
        }
    };

    xhttp.open("GET", "https://uxcobra.com/golfapi/courses.txt", true);
    xhttp.send();
}

function getCourse(courseid){
    $(".teeDropdown").html("");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            selcourse = JSON.parse(this.responseText);
            console.log(selcourse);


            let holeontees = selcourse.data.holes[0].teeBoxes;
            let teeSelector = $(".teeDropdown");

                for (let i = 0; i < holeontees.length; i++){
                    teeSelector.append("<option value ='"+ i +"'>"+ holeontees[i].teeType +"</option>")
                }
            $(".rightMenu").empty();
            $(".leftMenu").empty();
            teeSelector.prepend("<option value ='default' selected='selected'>Please select your teeBox</option>");
        }
    };
    xhttp.open("GET", "https://uxcobra.com/golfapi/course"+ courseid +".txt", true);
    xhttp.send();
}

function setTee(teeindex){
    $(".rightMenu").html("");
    let holesArray = [];
    let yardsArray = [];
    let node1;
    let node2;
    let mycourse = selcourse.data.holes;

    for(let i = 0; i < mycourse.length; i++){
        holesArray.push("\
            <div class='column'>\
                <span class='pHeader'>" + (i + 1) + "</span>\
            </div>");
        yardsArray.push("\
            <div class='column' id ='c" + i + "'>\
                <span class='yds'>" + mycourse[i].teeBoxes[teeindex].yards +"</span>\
            </div>");

         node1 = $("<div class='row' id='holeThrough18'>" + holesArray.join("") +"</div>");
         node2 = $("<div class='row' id='yardage'>" + yardsArray.join("") + "</div>");

    }
    node1.appendTo($(".rightMenu"));
    node2.appendTo($(".rightMenu"));



    console.log(holesArray);
    buildCard()

}




function buildCard (){
    let playerArray = [];
    let scoreArray = [];
    let scoreNode;
    let titleNode;


    for (let p = 1; p <= numplayers; p++){
        playerArray.push("<div class='players'>Player: " + p + "</div>");
        titleNode = $("\
        <div class ='holes'> Hole #</div>\
        <div class='yards'>Tee box yardage</div>" + playerArray.join(""));

        for(let h = 0; h < selcourse.data.holes.length; h++){
            scoreArray.push("<input id='p"+ p +"h "+ h +"' type='text' class='holeinput'>");
            scoreNode = $("<div class='row' id='scoreSlot'>" + scoreArray.join("") + "</div>");
        }
        scoreNode.appendTo($(".rightMenu"));
        titleNode.appendTo($(".leftMenu"));
    }
}