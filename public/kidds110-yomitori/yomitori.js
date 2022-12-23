// let medias;
//     //カメラの設定をmediasに格納、※environmentでリアカメラを設定
//     medias = {
//         audio: false,
//         video: {
//             facingMode: {
//                 exact: "environment"
//             }
//         }
//     };

//     //DOMに要素追加
//     //カメラ映像を出すvideoタグを取得する
//     const video = document.getElementById("video");
//     //設定したカメラのセッティングで起動する変数promiseを設定
//     const promise = navigator.mediaDevices.getUserMedia(medias);

//     //カメラの起動許可を確認
//     promise.then(successCallback)
//         .catch(errorCallback);
//     //許可が取れるとコールバックしてvideoタグにカメラ映像を写す
//     function successCallback(stream) {
//         video.srcObject = stream;
//     };
//     //取れない場合はエラーメッセージを出す
//     function errorCallback(err) {
//         alert(err);
//     };

//     //googleのteachablemachineを使用して画像解析をする
//     const URL = "https://teachablemachine.withgoogle.com/models/DBEKuBShP/";

//     let model, labelContainer, maxPredictions;

//     // initボタンを押すと画像解析をスタートする、コードの中でawaitを使うためasync functionが必要
//     async function init() {

//         //teachablemachineのモデルURLを読み込む
//         const modelURL = URL + "model.json";
//         const metadataURL = URL + "metadata.json";

//         //モデルのイメージを格納する
//         model = await tmImage.load(modelURL, metadataURL);
//         maxPredictions = model.getTotalClasses();

//         //結果を出す為のlavelcontainerをDOMに要素追加する
//         labelContainer = document.getElementById("label-container");
//         window.requestAnimationFrame(loop);
//     }

//     async function loop() {
//         //canvasに静止画を入れる
//         var canvas = document.getElementById("canvas")
//         canvas.getContext("2d").drawImage(video, 0, 0, 200, 200)

//         //予測は、画像、ビデオ、またはキャンバスのhtml要素を取り込むことができます
//         const prediction = await model.predict(canvas);

//         //predictionの数値によって結果を変える
//         if (prediction[0].probability.toFixed(2) < 0.7) {
//             labelContainer.innerHTML = "カメラにかんばんをいれてね";
//         }

//         if (prediction[0].probability.toFixed(2) > 0.8) {
//             location.href = "success.html"
//         //上はマップ一覧画面に遷移してピンをひょうじするようにする
//         }
        
//     }