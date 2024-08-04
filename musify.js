//onload function
function onload() {
    animationEl.style.opacity = "0";
    textSong.style.opacity = "0";
    progressEl.value = 0;
    playBox.style.opacity = "0";
}

// Avoid Changing src When Paused:
//All Dom elements
let audioElement = new Audio(`${songs[0].filepath}`);

let boxEl = document.querySelector('.container');

let playButton = document.getElementsByClassName('play');

let progressEl = document.querySelector('#progressBar');

let mainPlayButton = document.querySelector("#main-play");

let nextSong = document.querySelector("#next-song");

let previousSong = document.querySelector("#previous-song");

let currentSongName = document.querySelector("#song-name");

let animationEl = document.querySelector('.animation');

let textSong = document.querySelector("#song");

let playBox = document.querySelector(".playBox");

//All global variables
let progress = 0;
let currentId = 0;
let songProgress=0;



//for creating card element.
let cardStructure = '';
songs.forEach((item) => {

    cardStructure = cardStructure + `  <div class="card">
                     <div class="imageContainer">
                    <img class="image" src="${item.cover}"></div>


                    <div class="info">
                        <div><span>
                                Name :
                            </span>
                            <span>${item.songName}</span>
                        </div>

                        <div>
                            <span>Duration :</span>
                            <span>${item.duration.min}:${item.duration.sec}</span>
                        </div>
                        
                        <div><span>Artist :</span>
                            <span>KK</span>
                        </div>
                        
                    </div>
                   <img src="./images/play.png" class="play" alt="play_button" onclick="playSong(${item.id});Id(${item.id});">
                </div>
    
    `;
    boxEl.innerHTML = cardStructure;

});



//function to get access of any song by id then play it by audioelement.play.
//audioelement=new Audio('src');  we are changing this.
function getNewSong(id) {
    //it will not reset(update audio src) audio if same song is played.
    if (audioElement.getAttribute("src") != `${songs[id].filepath}`)
    {
        audioElement.src = `${songs[id].filepath}`;
        audioElement.currentTime = 0;
        audioElement.load();//very important;
        console.log("hii",audioElement.getAttribute("src"));
        console.log("hii",songs[id].filepath);
        
    }
    else if (audioElement.getAttribute("src") == `${songs[id].filepath}`) {
        audioElement.currentTime = songProgress;
    }
   
   
}

function makeAllButtonPlay() {
    //for all element
    songs.forEach((item) => {
        playButton[item.id].src = "./images/play.png";

    })

}

//function work onclick of playbutton;
function playSong(id) {

     //print song name in progress box when local button is pressed.
    currentSongName.innerText = `${songs[id].songName}`;
    textSong.style.opacity = "1";
    playBox.style.opacity = "1";


   
    // console.log((playButton[id].getAttribute("src")));
    // console.log(("./images/play.png"));

    // if (playButtons[id].src.endsWith("play.png"))
    if (playButton[id].getAttribute("src") == "./images/play.png") {
        makeAllButtonPlay();
        playButton[id].src = "./images/pause.png";
        mainPlayButton.src = "./images/pause.png";

        getNewSong(id);
        // audioElement.currentTime = 0;  
        console.log("suii", songProgress);
       
       
        audioElement.play();
        animationEl.style.opacity = "1";

    }

    else if (playButton[id].getAttribute("src") == "./images/pause.png") {

        playButton[id].src = "./images/play.png";
        mainPlayButton.src = "./images/play.png";
        songProgress = audioElement.currentTime;
        getNewSong(id);
        audioElement.pause();
        animationEl.style.opacity = "0";
        // songProgress = progressEl.value;

        console.log("progress : ", songProgress);

    }
}

//update progress bar on timeUpdate of song.
audioElement.addEventListener('timeupdate', () => {
    progress = (audioElement.currentTime / audioElement.duration) * 100;

    progressEl.value = progress;
});


//update audio to its current place on changing progress bar. use 'input' or 'change'
progressEl.addEventListener('input', () => {

    audioElement.currentTime = (progressEl.value * audioElement.duration) / 100;
    console.log("currentTime : ", audioElement.currentTime);
});


//id returning function on song click.
function Id(id) {
    currentId = id;
    console.log("current Id : ", currentId);
}


//Main play function
mainPlayButton.addEventListener('click', () => {

    //printing song name when master button is pressed.
    currentSongName.innerText = `${songs[currentId].songName}`;
    textSong.style.opacity = "1";

    if (mainPlayButton.getAttribute("src") == "./images/pause.png") {
        songProgress = audioElement.currentTime;
        getNewSong(currentId);
        audioElement.pause();
        animationEl.style.opacity = "0";
        
        mainPlayButton.src = "./images/play.png";
        playButton[currentId].src = "./images/play.png";
        
    }
    else if (mainPlayButton.getAttribute("src") == "./images/play.png") {

        getNewSong(currentId);
        audioElement.play();
        animationEl.style.opacity = "1";

        mainPlayButton.src = "./images/pause.png";
        playButton[currentId].src = "./images/pause.png";
    }
});

//previous play button
previousSong.addEventListener('click', () => {
   
    currentId--;

    if (currentId < 0) {
        currentId = songs.length - 1;
    }
   
    getNewSong(currentId);
    audioElement.play();
    animationEl.style.opacity = "1";
    currentSongName.innerText = `${songs[currentId].songName}`;

    //make both button play song.
    playButton[currentId].src = "./images/pause.png";
    mainPlayButton.src = "./images/pause.png";

     //since only max id=9 if current=+1 =10 then error.since we have not defined 10th id so getNewSong will not find it.
    if (currentId == songs.length - 1) {
        playButton[0].src = "./images/play.png";
    }
    else {
        playButton[currentId+1].src = "./images/play.png";
    }

});

//next play button
nextSong.addEventListener('click', () => {
    currentId++;
    if (currentId > songs.length - 1) {
        currentId = 0;
    }
   
    getNewSong(currentId);
    audioElement.play();
    animationEl.style.opacity = "1";
    currentSongName.innerText = `${songs[currentId].songName}`;

    //make both button play songs.
    playButton[currentId].src = "./images/pause.png";
    mainPlayButton.src = "./images/pause.png";

    
    if (currentId == 0) {
        playButton[songs.length-1].src = "./images/play.png"; 
    }
    else {
        playButton[currentId-1].src = "./images/play.png";
    }


});

//mouseover is not a dynamic event,means function not only run untill mouseover,but once.
playBox.addEventListener('mouseover', () => {
    playBox.style.opacity=.8;
})


//calling onload function.
onload();