var latitude;
var longitude;
var array;
var letter = [];
var arraytest = "";
var word = "";
var finalanswer;
var placeCount = [];
var abcde;
var queryString;
var value1;
var khajana;
var location1;
var location2;
var current_marker;

const firebaseConfig = {
  apiKey: "AIzaSyBlqNHdLwYQ_7o0UgXpMbQxt1d7l5F1H4s",
  authDomain: "maps-42f90.firebaseapp.com",
  databaseURL: "https://maps-42f90-default-rtdb.firebaseio.com",
  projectId: "maps-42f90",
  storageBucket: "maps-42f90.appspot.com",
  messagingSenderId: "645482197750",
  appId: "1:645482197750:web:980af93b0137d2c130b2d7",
  measurementId: "G-67PQD2TSR7",
};
// new new new
function watchPosition(position) {
  var watchID;

  if (navigator.geolocation) {
    // 現在の位置情報を取得
    watchID = navigator.geolocation.watchPosition(
      // 位置情報の取得を成功した場合
      function (pos) {
        location1 = pos.coords.latitude;
        location2 = pos.coords.longitude;

        //変数にまとめる
        dots = location1 + "," + location2;
        console.log("location1,2" + location1, location2);
        //  alert(watchID);
        console.log("watchID" + watchID);
        //icon
        const icon = {
          url: "images/google-maps-current-location-icon-15.jpg", // url
          scaledSize: new google.maps.Size(50, 50), // scaled size
          origin: new google.maps.Point(0, 0), // origin
          anchor: new google.maps.Point(0, 0), // anchor
        };

        if (current_marker !== undefined) {
          current_marker.setMap(null);
        }

        current_marker = new google.maps.Marker({
          position: new google.maps.LatLng(location1, location2),
          map: map,
          //draggable:true,
          icon: icon,
        });
      }
    );
  } else {
    window.alert("Geolocationが使えません");
  }
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

//const docRef = firestore.doc("samples").ref();
const saveButton = document.getElementById("saveButton");

//座標を取得
// function test() {
//   navigator.geolocation.getCurrentPosition(test2);
// }

// function test2(position) {
//   //my code
//   latitude = position.coords.latitude;
//   longitude = position.coords.longitude;

//   console.log(latitude);
//   console.log(longitude);
// }

//test();

//get all data where statement
db.collection("users")
  .where("answers", "==", "")
  .get()
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      console.log(doc.data());
    });
  });

//get all data
// db.collection("users")
//   .get()
//   .then((snapshot) => {
//     snapshot.docs.forEach((doc) => {
//       console.log(doc.data());
//     });
//   });

//  ボタンを押すと座標を表示する
//saveButton.addEventListener("click", function () {
  // console.log(location1 + "," + location2);
  // db.collection("users")
  //   .where("points", "==", location1 + "," + location2)
  //   .get()
  //   .then((snapshot) => {
  //     snapshot.docs.forEach((doc) => {
  //       console.log(doc.data());
  //       khajana = doc.data();
  //       console.log({ khajana });
  //     });
  //     if (khajana) {
  //       alert(`${location1 + "," + location2}この座標を既に登録されています`);
  //     } else {
  //       db.collection("users").add({
  //         answers: "",
  //         points: location1 + "," + location2,
  //       });
  //       alert(`${location1 + "," + location2}この座標を登録しました`);
  //       refreshPage();
  //     }
  //   });

  // saveボタン押すと次のページに飛ぶ
//   window.location.href = "zahyou.html";
// });

//新しい座標を追加する時に追加した座標をすぐに地図に反映するコード ページをreloadしている
function refreshPage() {
  setTimeout(function () {
    location.reload();
  }, 2000);
}

//get all data from firebase

db.collection("users")
  .get()
  .then((snapshot) => {
    snapshot.docs.map((doc) => {
      console.log(doc.data().points);
      arraytest = doc.data().points;
      console.log(arraytest);
      placeCount.push(arraytest);
      word += arraytest + ":";
    });
    // test();
    watchPosition();
    initMap();
  });
function initMap() {
  // Map option

  var options = {
    center: { lat: 35.1725302, lng: 136.8865799 },
    zoom: 8,
  };

  //New Map
  map = new google.maps.Map(document.getElementById("map"), options);

  //listen for click on map location

  google.maps.event.addListener(map, "click", (event) => {
    //add Marker
    marker({ location: event.latLng });
  });

  console.log("placeCount " + placeCount.length);

  //for
  for (i = 0; i < placeCount.length; i++) {
    var answer = word.split(/:/)[i];
    console.log(word.split(/:/)[i]);
    console.log(answer);

    finalanswer = answer;
    var finalanswer = finalanswer.split(/,|\s/);

    console.log(finalanswer[0]);
    console.log(finalanswer[1]);

    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(finalanswer[0], finalanswer[1]),
      map: map,

      //draggable:true,
      //icon:'/scripts/img/logo-footer.png'
    });

    marker.addListener("click", function (e) {
      // data form firebase
      var touchPoint = e.latLng.lat() + "," + e.latLng.lng();

      //urlで座標を別のページに送る
      value1 = e.latLng.lat() + "," + e.latLng.lng();
      queryString = "?para1=" + value1;

      console.log("querystring " + queryString);

      db.collection("users")
        .where("points", "==", touchPoint)
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            console.log(doc.data());
            abcde = doc.data().answers;

            console.log("abcde " + abcde);
            console.log("touchPoint " + touchPoint);
          });
          if (abcde && abcde.length > 0) {
            console.log("abcde " + abcde);
            //座標に入っているアンケート結果を表示する
            var hellotest = abcde;

            var contentString_Show = `<h1>show</h1>
            <li>${abcde}</li>`;

            var infoWindow_Show = new google.maps.InfoWindow({
              content: contentString_Show,
            });

            infoWindow_Show.open(map, this);
          } else {
            // "&para2=" + value2;
            // window.location.href =
            //   "https://formtest12-19.web.app/form.html" + queryString;

            //アンケートが未回答なのでinfoWindow_Formを表示してアンケート画面に誘導

            infoWindow_Form.open(map, this);
          }

          console.log(e.latLng.lat());
          console.log(e.latLng.lng());
        });

      var contentString_Form = `<h1 id="firstHeading" class="firstHeading">アンケート画面</h1>
    <a href="https://formtest12-19.web.app/form.html?${queryString}" >form画面</a>`;

      var infoWindow_Form = new google.maps.InfoWindow({
        content: contentString_Form,
      });
    });
  }
}

//buzzer button
//マップの画面でブザーボタン押すとbuzar.htmlに飛ぶようになっている
// document.getElementById("buzzerButton").addEventListener("click", function () {
//   window.location.href = "https://formtest12-19.web.app/buzar.html";
// });
// document.getElementById("routeButton").addEventListener("click", function () {
//   window.location.href = "https://formtest12-19.web.app/Rooting.html";
// });
// document.getElementById("saveButton").addEventListener("click", function () {
//   window.location.href = "https://formtest12-19.web.app/Camera.html";
// });