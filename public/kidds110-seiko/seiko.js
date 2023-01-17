const music = new Audio('a.mp3')
let targetSync = new Vivus('svg5', {
    duration: 30,
    start: 'autostart',
    type: 'sync' //アニメーション変更箇所
}, function (obj) {
    obj.el.classList.add('finished');
});
window.addEventListener('load', (event) => {
    setTimeout(() => {
        music.play();
        console.log('a');
        // setTimeout(function () {
        //     window.location.href = 'https://s212069.web.app/kidds110-sippai/sippai.html';
        // }, 5000);
    }, 3000);
});