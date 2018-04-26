var allcourses;
var selcourse;
var numplayers = 4;

loadDoc();


function loadDoc(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            allcourses = JSON.parse(this.responseText);
            console.log(allcourses);

            for (let i = 0; i < allcourses.courses.length; i++) {
                console.log(allcourses.courses[i].id);
                $(".courseDropdown").append("<option value ='"+ allcourses.courses[i].id +"'>" + allcourses.courses[i].name +"</option>");
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
            for (let i = 0; i < holeontees.length; i++){
                $(".teeDropdown").append("<option value ='"+ i +"'>"+ holeontees[i].teeType +"</option>")
            }
            $(".rightMenu").empty();
            $(".leftMenu").empty();
        }
    };
    xhttp.open("GET", "https://uxcobra.com/golfapi/course"+ courseid +".txt", true);
    xhttp.send();
}

function setTee(teeindex){
    $(".rightMenu").html("");

    let mycourse = selcourse.data.holes;
    for(let i = 0; i < mycourse.length; i++){
        $(".rightMenu").append("\
            <div class='column' id='c" + i + "'>\
            <div class='pHeader'>" + (i + 1) + "</div>\
            <div class='yds'>" + mycourse[i].teeBoxes[teeindex].yards +" YDS</div>\
            </div>");
    }
    buildCard()

}

function buildCard (){
    for (let p =1; p<= numplayers; p++){
        $(".leftMenu").append("<div class='players'>player " + p + "</div>");
        for(let h = 0; h < selcourse.data.holes.length; h++){
            $('#c' + h).append("<input id='p"+ p +"h "+ h +"' type='text' class='holeinput'>");
        }
    }
}