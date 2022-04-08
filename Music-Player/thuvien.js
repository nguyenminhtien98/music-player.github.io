let allMusic = [
    {
        name: 'Hẹn Ước Từ Hư Vô',
        singer: 'Mỹ Tâm',
        path: 'Hẹn Ước Từ Hư Vô - Mỹ Tâm',
        img: 'hen_uoc_tu_hu_vo.jpg'
    },
    {
        name: 'Dường Như Ta Đã',
        singer: 'Mỹ Tâm',
        path: 'Dường Như Ta Đã - Mỹ Tâm',
        img: 'duong_nhu_ta_da.jpg'
    },
    {
        name: 'Thiên Đường Gọi Tên',
        singer: 'Hà Anh Tuấn - Phương Linh',
        path: 'Thiên Đường Gọi Tên - Hà Anh Tuấn, Phương Linh',
        img: 'thien_duong_goi_ten.jpg'
    },
    {
        name: 'Mong Manh Tình Về',
        singer: 'Mỹ Tâm',
        path: 'Mong Manh Tình Về - Mỹ Tâm',
        img: 'mong_manh_tinh_ve.jpg'
    },
    {
        name: 'Xuân Thì',
        singer: 'Hà Anh Tuấn',
        path: 'Xuân Thì - Hà Anh Tuấn',
        img: 'xuan_thi.jpg'
    },
    {
        name: 'Tuyết Rơi Mùa Hè',
        singer: 'Hà Anh Tuấn',
        path: 'Tuyết Rơi Mùa Hè - Hà Anh Tuấn',
        img: 'tuyet_roi_mua_he.jpg'
    },
    {
        name: 'Sự Thật Ta Yêu Nhau',
        singer: 'Mỹ Tâm',
        path: 'Sự Thật Ta Yêu Nhau - Mỹ Tâm',
        img: 'su_that_ta_yeu_nhau.jpg'
    },
];


const wrapper = document.querySelector(".wrapper"),
cdThumb = wrapper.querySelector('.img-area')
musicName = wrapper.querySelector(".song-details .name"),
musicImg = wrapper.querySelector(".img-area img"),
musicSinger = wrapper.querySelector(".song-details .artist"),
mainAudio = wrapper.querySelector("#audio"),
playPauseBtn = wrapper.querySelector(".play-pause"),
prevBtn = wrapper.querySelector("#prev"),
nextBtn = wrapper.querySelector("#next"),
progressArea = wrapper.querySelector(".progress-area"),
progressBar = wrapper.querySelector(".progress-bar"),
musicList = wrapper.querySelector(".music-list"),
showMoreBtn = wrapper.querySelector("#more-music"),
hideMusicBtn = musicList.querySelector("#close"),
addSong = wrapper.querySelector(".add_song"),
showMusicAddBtn = wrapper.querySelector("#music_add"),
hideAddSongBtn = addSong.querySelector("#add_song_close");

let musicIndex = 1;
isMusicPaused = true;

window.addEventListener("load", ()=> {
    loadMusic(musicIndex);
    playingNow();
    
})

// tải thông tin bài hát
function loadMusic(indexNumb) {
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicSinger.innerText = allMusic[indexNumb - 1].singer;
    musicImg.src = `img/${allMusic[indexNumb - 1].img}`;
    mainAudio.src = `music/${allMusic[indexNumb - 1].path}.mp3`;
}

// xử lý quay CD
const cdThumbAnimate = cdThumb.animate([
    { transform: 'rotate(360deg)'}
], {
    duration: 10000, // 10 giây
    iterations: Infinity
});
cdThumbAnimate.pause();

// play bài hát
function playMusic() {
    wrapper.classList.add("paused");
    playPauseBtn.querySelector("i").innerText = "pause";
    mainAudio.play();
    cdThumbAnimate.play();
}

// pause bài hát
function pauseMusic() {
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector("i").innerText = "play_arrow";
    mainAudio.pause();
    cdThumbAnimate.pause();
}

// next bài hát
function nextMusic() {
    const repeatBtn = wrapper.querySelector("#repeat-plist").textContent;
    if(repeatBtn == "shuffle") {
        let randIndex = Math.floor((Math.random() * allMusic.length) + 1); 
        do{
            randIndex = Math.floor((Math.random() * allMusic.length) + 1);
        }while(musicIndex == randIndex);
        musicIndex = randIndex;
        loadMusic(musicIndex);
        playMusic();
        playingNow();
    } else {
        musicIndex++;
        musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
        loadMusic(musicIndex);
        playMusic();
        playingNow();
        scrollToActiveSong();
    }
}

// prev bài hát
function prevMusic() {
    const repeatBtn = wrapper.querySelector("#repeat-plist").textContent;
    if(repeatBtn == "shuffle") {
        let randIndex = Math.floor((Math.random() * allMusic.length) + 1); 
        do{
            randIndex = Math.floor((Math.random() * allMusic.length) + 1);
        }while(musicIndex == randIndex);
        musicIndex = randIndex;
        loadMusic(musicIndex);
        playMusic();
        playingNow();
        scrollToActiveSong();
    } else {
            
        musicIndex--;
        musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
        loadMusic(musicIndex);
        playMusic();
        playingNow();
        scrollToActiveSong();
    }
}



// lắng nghe sự kiện
// play và pause khi click button
playPauseBtn.addEventListener("click", ()=>{
    const isMusicPaused = wrapper.classList.contains("paused");
    isMusicPaused ? pauseMusic() : playMusic();
    playingNow();
});

// next khi click button
nextBtn.addEventListener("click", ()=>{
    nextMusic();
});

// prev khi click button
prevBtn.addEventListener("click", ()=>{
    prevMusic();
});
// end

// cập nhập thanh tiến trình theo thời gian hiện tại của bài hát
mainAudio.addEventListener("timeupdate", (e)=>{
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    let musicCurrentTime = wrapper.querySelector(".current-time"),
    musicDuration = wrapper.querySelector(".duration");
    mainAudio.addEventListener("loadeddata", ()=>{
        // cập nhập tổng thời gian bài hát
        let audioDuration = mainAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if(totalSec < 10){
            totalSec = `0${totalSec}`;
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`;
    });

    // cập nhập thời gian phát bài hát hiện tại
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if(currentSec < 10){
        currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

// tua bài hát
progressArea.addEventListener("click", (e)=>{
    let progressWidthval = progressArea.clientWidth;
    let clickedOffSetX = e.offsetX;
    let songDuration = mainAudio.duration;

    mainAudio.currentTime = (clickedOffSetX / progressWidthval) * songDuration;
    playMusic();
    playingNow();
});

// repeat bài hát
const repeatBtn = wrapper.querySelector("#repeat-plist");
repeatBtn.addEventListener("click", ()=>{
    let getText = repeatBtn.innerText;
    switch(getText) {
        case "repeat":
            repeatBtn.innerText = "repeat_one";
            repeatBtn.setAttribute("title", "Lặp lại bài hát");
            break;
        case "repeat_one":
            repeatBtn.innerText = "shuffle";
            repeatBtn.setAttribute("title", "Phát ngẫu nhiên");
            break;
        case "shuffle":
            repeatBtn.innerText = "repeat";
            repeatBtn.setAttribute("title", "Lặp lại Playlist");
            break;
    }
});

// các việc cần làm khi bài hát kết thúc
mainAudio.addEventListener("ended", ()=>{
    let getText = repeatBtn.innerText;
    switch(getText) {
        case "repeat":
            nextMusic();
            playMusic();
            break;
        case "repeat_one":
            mainAudio.currentTime = 0;
            loadMusic(musicIndex);
            playMusic();
            break;
        case "shuffle":
            let randIndex = Math.floor((Math.random() * allMusic.length) + 1); 
            do{
                randIndex = Math.floor((Math.random() * allMusic.length) + 1);
            }while(musicIndex == randIndex);
            musicIndex = randIndex;
            loadMusic(musicIndex);
            playMusic();
            playingNow();
            break;
    }
});



// hiện list bài hát khi click btn showmore
showMoreBtn.addEventListener("click", (e)=>{
    musicList.classList.toggle("show");
});

// ẩn list bài hát khi click btn close
hideMusicBtn.addEventListener("click", (e)=>{
    showMoreBtn.click();
});


// hiện music add
showMusicAddBtn.addEventListener("click", (e)=>{
    addSong.classList.toggle("show");
});

// ẩn music add
hideAddSongBtn.addEventListener("click", (e)=>{
    showMusicAddBtn.click();
});


// hiển thị list bài hát
const ulTag = wrapper.querySelector("ul");
for (let i = 0; i < allMusic.length; i++) {
    let liTag = `<li class="song" li-index="${i + 1}">
                    <div class="row">
                        <span>${allMusic[i].name}</span>
                        <p>${allMusic[i].singer}</p>
                    </div>
                    <audio class="${allMusic[i].path}" src="music/${allMusic[i].path}.mp3"></audio>
                    <span id="${allMusic[i].path}" class="audio-duration"></span>
                </li>`;
    ulTag.insertAdjacentHTML("beforeend", liTag);

}

// thêm class playing khi click phát bài hát
function playingNow() {
    const allLiTags = ulTag.querySelectorAll("li");
    for (let j = 0; j < allLiTags.length; j++) {
        let audioTag = allLiTags[j].querySelector(".audio-duration")
        if(allLiTags[j].classList.contains("playing")) {
            allLiTags[j].classList.remove("playing");
            audioTag.innerText = "";
        }

        if(allLiTags[j].getAttribute("li-index") == musicIndex){
             allLiTags[j].classList.add("playing");
             audioTag.innerText = "Playing";
        }
        allLiTags[j].setAttribute("onclick", "clicked(this)");
    }
}

//phát bài hát khi click trong list bài hát
function clicked(element) {
    let getLiIndex = element.getAttribute("li-index");
    musicIndex = getLiIndex;
    loadMusic(musicIndex);
    playMusic();
    playingNow();
}

// function scrollToActiveSong() {
//     setTimeout(() => {
//         if (musicIndex == 1) {
//             $('li.playing').scrollIntoView({
//                 behavior: 'smooth',
//                 block: 'center'
//             })
//         } else {
//             $('li.playing').scrollIntoView({
//                 behavior: 'smooth',
//                 block: 'nearest'
//             })
//         }
//     }, 300)
// }

// view đến bài hát đang hát
function scrollToActiveSong() {
    const playlist = document.querySelector(".playlist"),
    playing = playlist.querySelector('.song.playing')
    if (musicIndex == 1,2,3) {
        playing.scrollIntoView()
        musicList.style.bottom = "0";
        addSong.style.bottom = "0";
    } else {
        playing.scrollIntoView()
        musicList.style.bottom = "0";
        addSong.style.bottom = "0";
    }
}


// save file

async function saveFile() {
    const songInfo = document.querySelector(".song-info"),
    nameSong = songInfo.querySelector('.name_song').value,
    singerSong = songInfo.querySelector('.singer_song').value;
    // imgSong = songInfo.querySelector('.img-area'),
    // audioSong = songInfo.querySelector('.img-area');
    console.log(nameSong)
    let formData = new FormData();
    // let allMusic = [];
    formData.append("file", audio_upload.files[0]);
    await fetch('upload.php', {method: "POST", body: formData});
    alert('The file has been uploader successfuly');
    const musicAdd = 
        {
        name: nameSong,
        singer: singerSong,
        path: audio_upload.files[0].name,
        img: '',
        };
    allMusic.push(musicAdd);
    loadMusic(musicIndex);
    console.log(allMusic)
    console.log(nameSong)
}
