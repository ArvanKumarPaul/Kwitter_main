var firebaseConfig = {
  apiKey: "AIzaSyCnkoO1YiMGKVqpHR1YSvJ4Gxk6xK7usaQ",
  authDomain: "kwitter-e99bb.firebaseapp.com",
  databaseURL: "https://kwitter-e99bb-default-rtdb.firebaseio.com",
  projectId: "kwitter-e99bb",
  storageBucket: "kwitter-e99bb.appspot.com",
  messagingSenderId: "116722887476",
  appId: "1:116722887476:web:03ef4d4d83e5d21fde1361"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
    
user_name = localStorage.getItem("user_name");

document.getElementById("user_name").innerHTML = "Welcome " + user_name + " !";
    
function addRoom() {

      room_name = document.getElementById("room_name").value;

      localStorage.setItem("room_name" , room_name);
  
      firebase.database().ref("/").child(room_name).update({
  
        purpose:"Adding Roomname"
  
      }); 

      window.location = "Kwitter_page.html";
  
}

function getData() {

  firebase.database().ref("/").on('value', function(snapshot) {
     document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey = childSnapshot.key;

    room_names = childKey;
    console.log("room-name : " + room_names);
    row = "<br><br><div class='room_name' id="+ room_names +" onclick='redirecttoroomName(this.id)'>#" + room_names + "</div><hr>";
    document.getElementById("output").innerHTML += row;

     });

    });

}

getData();

function redirecttoroomName(name) {

  console.log(name);
  localStorage.setItem("room_name" , name);
  window.location = "Kwitter_page.html";

}

function logOut() {

  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location.replace("Kwitter.html");

}
