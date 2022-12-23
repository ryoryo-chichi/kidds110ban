const music = new Audio('しっぱい.mp3')
let targetSync = new Vivus('svg1887', {
    duration: 60,
    start: 'autostart',
    type: 'sync' //アニメーション変更箇所
}, function (obj) {
    obj.el.classList.add('finished');
});
window.addEventListener('load', (event) => {
    setTimeout(() => {
        music.play();
        console.log('a');
        setTimeout(function () {
            window.location.href = 'https://s212069.web.app/kidds110-start/start.html';
        }, 5000);
    }, 3000);
});