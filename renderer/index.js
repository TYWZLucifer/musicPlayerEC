const { ipcRenderer } = require('electron');
const { $, convertTime } = require('../utils/helper');
let musicAudio = new Audio();
let allTracks;
let currentTrack;

$("add_music").addEventListener("click", () => {
    ipcRenderer.send("add_music");
});

$("music_list").addEventListener('click', (e) => {
    e.preventDefault();
    const { dataset, classList } = e.target;
    const id = dataset && dataset.id;
    if(id) {
        // 点击播放按钮
        if(classList.contains('fa-play')) {
            if(currentTrack && currentTrack.id === id) musicAudio.play(); // 继续播放当前音乐
            // 点击了其他音乐的播放按钮
            else {
                currentTrack = allTracks.find(track => track.id === id);
                musicAudio.src = currentTrack.path;
                musicAudio.play();
                // 更换暂停图标
                const resetPause = document.querySelector('.fa-pause');
                if(resetPause) resetPause.classList.replace('fa-pause', 'fa-play');
            }
            classList.replace('fa-play', 'fa-pause');
        }else if(classList.contains('fa-pause')) {  // 点击暂停按钮
            musicAudio.pause();
            classList.replace('fa-pause', 'fa-play');
        }else if(classList.contains('fa-trash-alt')) { // 点击删除按钮
            ipcRenderer.send("delete_music", id);
        }
    }    
});

const renderMusicList = (tracks) => {
    const renderMusicListHTML = tracks.reduce((html, track) => {
        html += `<li class="list-group-item row d-flex justify-content-between align-items-center">
            <div class="col-10"><i class="fas fa-music me-2 text-secondary"></i><b>${track.name}</b></div>
            <div class="col-2">
                <i class="fas fa-play me-3" data-id="${track.id}"></i>
                <i class="far fa-trash-alt" data-id="${track.id}"></i>
            </div>
        </li>`;
        return html;
    }, '');
    $("music_list").innerHTML = tracks.length ? renderMusicListHTML : '<div class="alert alert-primary">还未添加任何音乐</div>';
}

ipcRenderer.on('render_music_list', (e, tracks) => {
    allTracks = tracks;
    renderMusicList(tracks);
});

const renderPlayerHTML = (name, duration) => {
    const html = `<div class="col fw-bold">
        正在播放: ${name}
        </div>
        <div class="col">
            <span id="current-seeker">00:00</span> / ${convertTime(duration)}
        </div>
    `
    $("player-status").innerHTML = html;
}

// 渲染播放器状态
musicAudio.addEventListener('loadedmetadata', () => {
    renderPlayerHTML(currentTrack.name, musicAudio.duration);
});

const undateTimeHtml = (time, duration) => {
    const pg = Math.floor(time / duration * 100);
    $("player-progress").innerHTML = pg + "%";
    $("player-progress").style.width = pg + "%";
    $("current-seeker").innerHTML = convertTime(time);
}

// 更新播放状态
musicAudio.addEventListener('timeupdate', () => {
    undateTimeHtml(musicAudio.currentTime, musicAudio.duration);
});