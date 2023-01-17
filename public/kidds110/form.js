//firebase
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

//get points data from maps
//マーカを押した時にアンケートの結果が空だったらその場合の座標をindex.jsからurlで受けとる
var queryString = decodeURIComponent(window.location.search);
queryString = queryString.substring(1);
var queries = queryString.split("&");
var queries = queryString.split("para1=");

//imp code
//index.jsからurlで受け取った座標をspkitで分解する
console.log("queryString " + queryString);

var next = queries[1].split(",");
var last = next[0] + "," + next[1];

console.log(last);

// checkboxの情報
document.querySelectorAll('input[type="checkbox"]:checked');
const body = document.querySelector("body");
var selected = [];

body.addEventListener("change", (event) => {
  if (event.target.type === "checkbox") {
    const checked = document.querySelectorAll('input[type="checkbox"]:checked');
    selected = Array.from(checked).map((x) => x.value);
  }
  console.log(selected);
});

// アンケートが未回答IDを取得してアンケートの結果を保存する
var id;

document.getElementById("buttonSend").addEventListener("click", function () {
  //index.jsで送った座標を使っていデータベースアンケートの中未回答のIDを探す
  db.collection("users")
    .where("points", "==", last)
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        console.log(doc.data());
        console.log(doc.id);
        id = doc.id;

        // whereで検索して座標のidにアンケートの結果を保存
        console.log("selected.length" + selected.length);
        if (selected.length > 0) {
          db.collection("users").doc(id).update({
            answers: selected,
          });
          alert(`アンケート結果が保存しました。`);
          refreshPage();
        } else {
          alert(`アンケート結果を入力してから保存してください。`);
        }
      });
    });
});
//アンケート結果を後で答える時に追加したアンケート結果をすぐに地図に反映するコード
//ページをreloadしている
function refreshPage() {
  setTimeout(function () {
    //  href = "https://formtest12-19.web.app/".location.reload();
    window.location.href = "https://formtest12-19.web.app";
  }, 3000);
}

document.getElementById("buttonReturn").addEventListener("click", function () {
  window.location.href = "https://formtest12-19.web.app";
});
