var modal = document.getElementById("myModal");
var image = document.getElementById("destiny2");
var modalimage = document.getElementById("destiny2Large");
var captionText = document.getElementById("caption");
image.onclick = function() {
    modal.style.display = "block";
    modalimage.src = this.src;
    captionText.innerHTML = this.alt;
}

var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
    modal.style.display = "none";
}