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

//drag and drop image on dropzone
window.onload=function(){

    // dropZone event handlers
    var dropZone=document.getElementById("dropzone");
    dropZone.addEventListener("dragenter", handleDragEnter, false);
    dropZone.addEventListener("dragover", handleDragOver, false);
    dropZone.addEventListener("dragleave",handledragleave,false)
    dropZone.addEventListener("drop", handleDrop, false);
    //
    function handleDragEnter(e){
        e.stopPropagation();
        e.preventDefault();
        this.className = 'dropzone dragover';
    }
    //
    function handleDragOver(e){
        e.stopPropagation();
        e.preventDefault();
        this.className = 'dropzone dragover';
    }
    function handledragleave(e) {
        e.stopPropagation();
        e.preventDefault();
        this.className = 'dropzone';
    }
    //
    function handleDrop(e){
        e.stopPropagation();
        e.preventDefault();

        this.className = 'dropzone';
        //
        var url=e.dataTransfer.getData('text/plain');
        // for img elements, url is the img src so
        // create an Image Object & draw to canvas
        if(url){
            var img=new Image();
            img.onload=function(){
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(this,0,0,canvas.width,canvas.height);
            }
            img.src=url;
            // for img file(s), read the file & draw to canvas
        }else{
            handleFiles(e.dataTransfer.files);
        }
    }
    // read & create an image from the image file
    function handleFiles(files) {
        for (var i=0;i<files.length;i++) {
            var file = files[i];
            var imageType = /image.*/;
            if (!file.type.match(imageType)){continue;}
            var img = document.createElement("img");
            img.classList.add("obj");
            img.file = file;
            var reader=new FileReader();
            reader.onload=(function(aImg){
                return function(e) {
                    aImg.onload=function(){
                        context.clearRect(0, 0, canvas.width, canvas.height);
                        context.drawImage(aImg, 0, 0,canvas.width,canvas.height);
                    }
                    // e.target.result is a dataURL for the image
                    aImg.src = e.target.result;
                };
            })(img);
            reader.readAsDataURL(file);
        } // end for
    } // end handleFiles

}; // end $(function(){});

