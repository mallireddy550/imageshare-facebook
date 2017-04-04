/**
 * Created by ANKIOM on 07-03-2017.
 */
function el(id){
    return document.getElementById(id);
} // Get elem by ID

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

//set the image to canvas
function readImage() {
    if ( this.files && this.files[0] ) {
        var FR= new FileReader();
        FR.onload = function(e) {
            var img = new Image();
            img.onload = function() {
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(img, 0, 0, canvas.width, canvas.height);
            };
            img.src = e.target.result;
        };
        FR.readAsDataURL( this.files[0] );
    }
}

el("fileUpload").addEventListener("change", readImage, false);

//Write text on canvas image
function changeText(textarea){
    // context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = "15px Verdana";
    var text =  textarea.value;
    context.fillText(text, 20, 20);
}
function centertext(textarea) {
    // alert(textarea);
    context.textAlign = 'center';
    var text =  textarea.value;
    context.fillText(text, 100, 100);
}

//share image to facebook
function fbs_click(TheImg) {
    u=TheImg.src;
    // t=document.title;
    t=TheImg.getAttribute('alt');
    window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(u)+'&t='+encodeURIComponent(t),'sharer','toolbar=0,status=0,width=626,height=436');return false;
}

function color() {
    context.save();
    context.fillStyle = document.getElementById("backgroundColor").value;
    context.fillRect(0,0,canvas.width,canvas.height);
    context.restore();
}
//Download the image
function downloadCanvas(link, canvasId, filename) {
    link.href = document.getElementById(canvasId).toDataURL();
    link.download = filename;
}
document.getElementById('download').addEventListener('click', function() {
    downloadCanvas(this, 'canvas', 'test.png');
}, false);

// dropzone event handlers
var dropzone;
dropzone = document.getElementById("dropzone");
dropzone.addEventListener("dragenter", dragenter, false);
dropzone.addEventListener("dragover", dragover, false);
dropzone.addEventListener("dragleave",dragleave,false);
dropzone.addEventListener("drop", drop, false);

function dragenter(e) {

    e.dataTransfer.effectAllowed = "move";

    // Sets the value and type of the dragged data
    e.dataTransfer.setData("Text", e.target.getAttribute("id"));
    e.stopPropagation();
    e.preventDefault();
    this.className = 'dropzone dragover';
}
//

function dragover(e) {
    e.stopPropagation();
    e.preventDefault();
    this.className = 'dropzone dragover';
}

function dragleave(e) {
    e.stopPropagation();
    e.preventDefault();
    this.className = 'dropzone';
}

//
function drop(e) {
    e.stopPropagation();
    e.preventDefault();

    var dt = e.dataTransfer;
    var files = dt.files;

    this.className = 'dropzone';

    handleFiles(files);
}

//
function handleFiles(files) {

    for (var i = 0; i < files.length; i++) {

        // get the next file that the user selected
        var file = files[i];
        var imageType = /image.*/;

        // don't try to process non-images
        if (!file.type.match(imageType)) {
            continue;
        }

        // a seed img element for the FileReader
        var img = document.createElement("img");
        img.classList.add("obj");
        img.file = file;

        // get an image file from the user
        // this uses drag/drop, but you could substitute file-browsing
        var reader = new FileReader();
        reader.onload = (function(aImg) {
            return function(e) {
                aImg.onload = function() {
                    // draw the aImg onto the canvas
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    context.drawImage(aImg, 0, 0,canvas.width,canvas.height);
                }
                // e.target.result is a dataURL for the image
                aImg.src = e.target.result;
            };
        })(img);
        reader.readAsDataURL(file);

    } // end for

}// end handleFiles

