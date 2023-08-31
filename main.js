objects = [];
status = "";
video="";

function preload(){
    video = createVideo(VIDEO);
    video.hide();
    song = loadSound("baby.mp3");
}

function setup(){
    canvas = createCanvas(420,420);
    canvas.position(450,300);
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Baby";
}


function draw(){
    image(video,0,0,420,420 );
    if(status !=""){
        objectDetector.detect(video, gotResult);
        for (i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Baby Detected";
            document.getElementById("number").innerHTML = "Number Of Babies Detected: " + objects.length;

           fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }

}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results
}

function modelLoaded(){
    console.log("Model Loaded !!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}