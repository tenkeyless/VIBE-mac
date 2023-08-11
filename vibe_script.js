document.addEventListener("keydown", (event) => {
  const playButton = document.getElementById('btn_now');
  const prevButton = document.getElementsByClassName('btn_play_prev')[0];
  const nextButtons = document.getElementsByClassName('btn_play_next');
  const nextButton = Array.from(nextButtons).find((e) => e.childNodes.length == 1);
  const likeButtons = document.getElementsByClassName('btn_like');
  const likeButtonArray = Array.from(likeButtons);
  const likeButton = likeButtonArray[likeButtonArray.length-1];

  // 재생 일시정지 토글
  if (event.code == "KeyP") {
    playButton.click();
  // 일시정지
  } else if (event.code == "KeyI") {
    if (playButton.classList.contains('play')) {
      playButton.click();
    }
  // 재생
  } else if (event.code == "KeyU") {
    if (!playButton.classList.contains('play')) {
      playButton.click();
    }
  // 좋아요
  } else if (event.code == "KeyJ") {
    const songInfo = getCurrentSongInfo();
    if (!likeButton.classList.contains('on')) {
      likeButton.click();
      noti(songInfo[0].data, songInfo[1].data, true);
    } else {
      likeButton.click();
      noti(songInfo[0].data, songInfo[1].data, false);
    }
  // 이전 트랙
  } else if (event.code == "BracketLeft") {
    prevButton.click();
  // 이후 트랙
  } else if (event.code == "BracketRight") {
    nextButton.click();
  // 알림
  } else if (event.code == "KeyN") {
    const songInfo = getCurrentSongInfo();
    if (songInfo != null) {
      noti(songInfo[0].data, songInfo[1].data, likeButton.classList.contains('on'));
    } else {
      noti("재생 중이 아님", "재생 중인 곡이 없습니다.");
    }
  }
});

const wikiHeart = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/1280px-Heart_coraz%C3%B3n.svg.png"

function noti(title, message, isLike) {
    Notification.requestPermission().then(perm => {
        if(perm === 'granted') {
            if (!isLike) {
                new Notification(title, { body: message, silent: true });
            } else {
                new Notification(title, { body: message, icon: wikiHeart, silent: true });
            }
        }
    })
}

function getCurrentSongInfo() {
    const player = document.getElementById('player');
    const songs = player.getElementsByClassName('song');
    if (songs.length > 1) {
        const song = Array.from(songs).find((e) => e.attributes.length == 1);
        const songText = song.getElementsByTagName('a')[0].firstChild;
        const artists = player.getElementsByClassName('artist');
        const artist = Array.from(artists).find((e) => e.attributes.length == 1);
        const artistText = artist.getElementsByClassName('text')[0].firstChild;
        return [songText, artistText];
    } else {
        return null;
    }
}
