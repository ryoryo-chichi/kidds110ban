function audio() {
    if (!btn_audio.paused) {
      btn_audio.pause();
    }
    else {
      btn_audio.play();
    } 

    let btn = document.getElementsByClassName("btn")[0];
    console.log(btn);
    if (btn.textContent === "おん！！") {
      btn.textContent = "おふ！！";
    } else {
      btn.textContent = "おん！！";
    }

  }
