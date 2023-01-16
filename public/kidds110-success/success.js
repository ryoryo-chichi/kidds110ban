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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

//const docRef = firestore.doc("samples").ref();
const saveButton = document.getElementById("saveButton");

//座標を取得
function test() {
  navigator.geolocation.getCurrentPosition(test2);
}

function test2(position) {
  //my code
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;

  console.log(latitude);
  console.log(longitude);
}

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

saveButton.addEventListener("click", function () {
  console.log(latitude + "," + longitude);
  db.collection("users")
    .where("points", "==", latitude + "," + longitude)
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        console.log(doc.data());
        khajana = doc.data();
        console.log({ khajana });
      });
      if (khajana) {
        alert(`${latitude + "," + longitude}この座標を既に登録されています`);
      } else {
        db.collection("users").add({
          answers: "",
          points: latitude + "," + longitude,
        });
        alert(`${latitude + "," + longitude}この座標を登録しました`);
        refresh();
      }
    });
});

//refersh page
function refresh() {
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
    test();
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
    console.log("marker");
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
            switch (hellotest) {
              case (1, 2, 3):
                break;
              case (4, 5, 6):
                break;
            }
            var contentString_Show = `<h1>show</h1>
            <li>${abcde}</li><li>日曜日   ✔</li>`;

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

      var contentString_Form = ` '<h1 id="firstHeading" class="firstHeading">アンケート画面</h1>' 
    <a href="https://formtest12-19.web.app/form.html?${queryString}" >form画面</a>`;

      var infoWindow_Form = new google.maps.InfoWindow({
        content: contentString_Form,
      });
    });
  }
}
