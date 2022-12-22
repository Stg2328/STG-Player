console.log("Welcome to Shah Shubham Music Player");
let songIndex=0;
let audioElement = new Audio('songs/Kesariya.mp3');
let masterPlay = document.getElementById('masterPlay');
let progressbar = document.getElementById('myprogressbar');
let gif =document.getElementById('gif');
let songsList = Array.from(document.getElementsByClassName('songitem'));
let clicks = 0;

let songs=[
    {songname:"Kesariya" ,filepath:"songs/Kesariya.mp3" ,coverpath:"covers/kesariya.png"},
    {songname: "Ratan Lambiya" ,filepath:"songs/ratanlambiya.mp3" ,coverpath:"covers/ratanlambiya.png"},
    {songname: "Srivalli" ,filepath:"songs/srivali.mp3" ,coverpath:"covers/srivali.png"},
    {songname: "Meri Zindagi Hai Tu" ,filepath:"songs/merizindagihaitu.mp3" ,coverpath:"covers/merizindagihaitu.png"},
    {songname:"Jogi",filepath:"songs/jogi.mp3" ,coverpath:"covers/jogi.png"},
    {songname:"Kalank",filepath:"songs/kalank.mp3" ,coverpath:"covers/kalank.png"},
    {songname:"Mehama",filepath:"songs/mehrama.mp3" ,coverpath:"covers/mehama.png"},
    {songname:"Mai Teri Ho Gya",filepath:"songs/maiterihogya.mp3" ,coverpath:"covers/mehama.png"}
]



songsList.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
    element.getElementsByClassName("songitems")[0].innerText = songs[i].songname;

})

masterPlay.addEventListener('click',()=>
{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        makeallplays();
        gif.style.opacity=0; 
    }
})
Array.from(document.getElementsByClassName('songitemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        songIndex=parseInt(e.target.id);
        clicks += 1;
        makeallplays();
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `${songs[songIndex].filepath}`
        element.currentTime = 0;
        var playPromise = audioElement.play();
        console.log(masterPlay.classList[2] = "fa-circle-pause")
        
 
        if (playPromise !== undefined) {
            playPromise.then(_ => {
            // Automatic playback started!
            // Show playing UI.
            // We can now safely pause video...
            if(clicks%2 == 0){
                playPromise.pause();
                e.target.classList.remove('fa-circle-pause');
                e.target.classList.add('fa-circle-play');
                audioElement.pause();
                masterPlay.classList.remove('fa-circle-pause');
                masterPlay.classList.add('fa-circle-play');
                gif.style.opacity=0;
            }
                
            })
            .catch(error => {
            // Auto-play was prevented
            // Show paused UI.
            });
        }
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        document.getElementById('mastersong').innerHTML = songs[songIndex].songname;
        gif.style.opacity=1;
        // if(clicks%2 == 0){
        //     e.target.classList.remove('fa-circle-pause');
        //     e.target.classList.add('fa-circle-play');
        //     audioElement.pause();
        //     masterPlay.classList.remove('fa-circle-pause');
        //     masterPlay.classList.add('fa-circle-play');
        //     gif.style.opacity=0; 
        //    }
    })
})

audioElement.addEventListener('timeupdate',()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myprogressbar.value = progress; 
    
})

myprogressbar.addEventListener('change',()=>{
    audioElement.currentTime = myprogressbar.value * audioElement.duration/100;
})

const makeallplays = ()=> {
    Array.from(document.getElementsByClassName('songitemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
})
}


document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=7){
        songIndex=0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `${songs[songIndex].filepath}`
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    document.getElementById('mastersong').innerHTML = songs[songIndex].songname;
    gif.style.opacity=1;
    
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `${songs[songIndex].filepath}`
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    document.getElementById('mastersong').innerHTML = songs[songIndex].songname;
    gif.style.opacity=1;
})
