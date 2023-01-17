var latitude;
var longitude;
var ans;

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

//ボタン
const buttonSave = document.getElementById("buttonSave");
const ButtonReturn = document.getElementById("buttonReturn");

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

function dataSave() {
  console.log(latitude + "," + longitude);
  db.collection("users")
    .where("points", "==", latitude + "," + longitude)
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        console.log(doc.data());
        ans = doc.data();
        console.log({ ans });
      });
      if (ans) {
        alert(`${longitude + "," + latitude}この座標を既に登録されています`);
      } else {
        db.collection("users").add({
          answers: "",
          points: longitude + "," + latitude,
        });
        alert(`${longitude + "," + latitude}この座標を登録しました`);
        refreshPage();
      }
    });
}

test();
buttonSave.addEventListener("click", function () {
  dataSave();
});

function refreshPage() {
  setTimeout(function () {
    //  href = "https://formtest12-19.web.app/".location.reload();
    window.location.href = "https://formtest12-19.web.app";
  }, 1000);
}
