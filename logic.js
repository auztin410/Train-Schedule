var config = {
    apiKey: "AIzaSyCOIzQEmbMchMzLkdq8_qjMeYhR1jDT2XM",
    authDomain: "train-schedule-8b252.firebaseapp.com",
    databaseURL: "https://train-schedule-8b252.firebaseio.com",
    projectId: "train-schedule-8b252",
    storageBucket: "",
    messagingSenderId: "692525157761"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  var snap = snapshot.val();


  database.ref().on("value", function(snapshot) {
      console.log(snap);
  })

  $("#addTrainButton").on("click", function(event) {
      event.preventDefault();

      var trainName = $("#trainName").val().trim();
      var trainDestination = $("#trainDestination").val().trim();
      var firstTrainTime = $("#firstTrainTime").val().trim();
      var trainFrequency = $("#trainFrequency").val().trim();

      var newTrain = {
          train: trainName,
          destination: trainDestination,
          start: firstTrainTime,
          frequency: trainFrequency
      };

      database.ref().push(newTrain);
  })

  database.ref().on("child_added", function(childSnapshot) {

    console.log(childSnapshot.val());

    
  })