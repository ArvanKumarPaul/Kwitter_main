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
    room_name = localStorage.getItem("room_name");

function Send() {

  message = document.getElementById("msg").value;

  firebase.database().ref(room_name).push({

    username : user_name , 
    message : message , 
    likes : 0

  });

  document.getElementById("msg").value = "";

}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;

         console.log(firebase_message_id);
         console.log(message_data);
         name = message_data['name'];
         message = message_data['message'];
         likes = message_data['likes'];
         name_with_tag = "<h4>" + name + "<img src='tick.png' class='user_tick'></h4>";
         message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
         like_button = "<button class='btn btn-warning' id="+ firebase_message_id +" value="+ likes +" onclick='updateLikes(this.id)'>"
         span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'> like : </span></button><hr>";
         row = name_with_tag + message_with_tag + like_button + span_with_tag;
         document.getElementById("output").innerHTML = row;
      } });  }); }

getData();

function updateLikes(message_id) {
 
  console.log("like button is clicked " + message_id);
  button_id = message_id;
  likes = document.getElementById(button_id).value;
  updated_likes = Number(likes) + 1;
  console.log(updated_likes);
  firebase.database().ref(room_name).child(message_id).update({

    like : updated_likes 

  });

}

function logOut() {

  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location.replace("Kwitter.html");

}

