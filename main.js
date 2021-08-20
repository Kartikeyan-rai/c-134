var status="";
var object=[];
var song="";
function preload(){
    img=loadImage('bed.jpg');
    song=loadSound('bad_to_the_bone.mp3')
}
function setup(){
    canvas=createCanvas(380,380);
    canvas.position(450,120);
    video=createCapture(VIDEO);
    video.hide();
    video.size(380,380)
    objectDetect=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status : detecting object";
}
function draw(){
    image(video,0,0,380,380);
    r=random(255);
    g=random(255);
    b=random(255);
    if(status != ""){ 
        objectDetect.detect(video , gotresults)
        document.getElementById("status").innerHTML="Status : object detected";
        document.getElementById("object").innerHTML="baby found";
            song.stop()
        for( i=0;i<object.length;i++){
            fill(r,g,b);
            confidenc=floor(object[i].confidence * 100)
            text(object[i].label+" "+confidenc+"%",object[i].x+20,object[i].y+50);
            noFill();
            stroke(r,g,b);
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
        }
    }else{
            song.play()
            document.getElementById("object").innerHTML="Baby not found";
        }
}

function modelLoaded(){
    console.log("model loaded");
    status=true;
}
function gotresults(error,results){
   if(error){
       console.log(error);
   }
   else{
       console.log(results);
       object=results;
   }
}