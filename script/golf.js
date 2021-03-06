var allcourses;
var selcourse;
var totalYards;
var totalYardsOut;
var totalYardsIn;
var parTotal;
var parIn;
var parOUt;
var scoreIn;
var scoreOut;
var scoreTotal;


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
            $(".midMenu").empty();
            $(".leftMenu").empty();
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

            teeSelector.prepend("<option value ='default' selected='selected'>Please select your teeBox</option>");
            $(".midMenu").empty();
            $(".leftMenu").empty();
        }
    };
    xhttp.open("GET", "https://uxcobra.com/golfapi/course"+ courseid +".txt", true);
    xhttp.send();
}

function setTee(teeindex){
    $(".midMenu").html("");
    let holesArray = [];
    let yardsArray = [];
    let hcapArray = [];
    let parArray= [];
    let node1;
    let node2;
    let node3;
    let node4;
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
        hcapArray.push("\
            <div class='column'>\
                <span class='mhcpData'>" + mycourse[i].teeBoxes[teeindex].hcp + "</span>\
            </div>");
        parArray.push("\
            <div class='column'>\
                <span class='par'>" + mycourse[i].teeBoxes[teeindex].par + "</span>\
            </div>");

         node1 = $("<div class='row' id='holeThrough18'>" + holesArray.join("") +"</div>");
         node2 = $("<div class='row' id='yardage'>" + yardsArray.join("") + "</div>");
         node3 = $("<div class='row' id='mHandicapRow'>" + hcapArray.join("") + "</div>");
         node4 = $("<div class='row' id='parOnTeeBox'>" + parArray.join("") +"</div>");

    }
    node1.appendTo($(".midMenu"));
    node2.appendTo($(".midMenu"));
    node3.appendTo($(".midMenu"));
    node4.appendTo($(".midMenu"));
    console.log(holesArray);
    $(".leftMenu").empty();
    
    buildCard();
}


function buildCard (numPlayers) {
    let playerArray = [];
    let scoreArray = [];
    let scoreNode;
    let titleNode;

    numPlayers = $(".playerSelect option:selected").text();


    for (let p = 1; p <= numPlayers; p++) {
        playerArray.push("<div contenteditable='true' class='players'>Player: " + p + "</div>");
        titleNode = $("\
            <div class ='holes'> Hole #:</div>\
            <div class='yards'>Tee box yardage:</div>\
            <div class='mensHandicap'>Handicap:</div>\
            <div class='pars'>Par:</div>\
            <div class='playerBox'>" + playerArray.join("")+ "</div>\
            ");
        for (let h = 0; h < selcourse.data.holes.length; h++) {
            scoreArray.push("<input id='p" + p + "h " + h + "' oninput='this.value = this.value.replace(/[^1-9]/, defaultValue)' type='text' class='holeinput' size='2'>");
            if (p === 1 && h === 17) {
                scoreNode = $("<div class='row' id ='scoreSlot'>" + scoreArray.join("") + "</div>");
                scoreNode.appendTo($(".midMenu"));
                scoreNode = [];
            } else if (p === 2 && h === 17) {
                scoreNode = $("<div class='row' id ='scoreSlot2'>" + scoreArray.slice(18).join("") + "</div>");
                scoreNode.appendTo($(".midMenu"));
                scoreNode = [];
            } else if (p === 3 && h === 17) {
                scoreNode = $("<div class='row' id ='scoreSlot3'>" + scoreArray.slice(36).join("") + "</div>");
                scoreNode.appendTo($(".midMenu"));
                scoreNode = [];
            } else if (p === 4 && h === 17) {
                scoreNode = $("<div class='row' id ='scoreSlot4'>" + scoreArray.slice(54).join("") + "</div>");
                scoreNode.appendTo($(".midMenu"));
                scoreNode = [];
            }
        }


    }
    console.log(scoreArray);
    titleNode.appendTo($(".leftMenu"));
    

}

function scoreMessage (){
    let netTotal = parseInt(scoreTotal) - parseInt(parTotal);
    if ((netTotal) === 5){
        $(".message").text("Keep at it you will improve eventually...");
    } else if (netTotal > 5){
        $(".message").text("Going to have to start somewhere right?");
    } else if (netTotal <= 0 && netTotal >= -5){
        $(".message").text("Well played my friend takes some serious skill to play that good");
    } else if (netTotal < -6){
        $(".message").text("You must be in the WPGA or PGA or something because you are amazing!");
    }
}


function setTotals (){

}





