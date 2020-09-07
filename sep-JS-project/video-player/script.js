const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');


// play and pause video

function toggleVideoStatus(){
    if(video.paused){
        video.play();
    } else {
        video.pause();
    }
}


// update play icon and pause icon

function updatePlayIcon(){
    if(video.paused){
        play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
    } else {
        play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
    }
}


// update progress and timestamp

function updateProgress(){
    const duration = video.duration; 
    const currentTime = video.currentTime;
    progress.value = (currentTime/duration)*100;
    let min,sec;
    min = Math.floor(currentTime/60);
    sec = Math.floor(currentTime - min*60);
    if(min<10) min = `0${min}`;
    else min = `${min}`
    if(sec<10) sec = `0${sec}`;
    else sec = `${sec}`
    timestamp.innerHTML = min+':'+sec;
}

// set video time

function setVideoProgress(){
    video.currentTime = progress.value*video.duration/100;
}

// stop video

function stopVideo(){
    video.currentTime = 0;
    video.pause();
}



// event listeners

video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);


// play button
play.addEventListener('click', toggleVideoStatus);
// stop button
stop.addEventListener('click', stopVideo);

progress.addEventListener('change', setVideoProgress);

