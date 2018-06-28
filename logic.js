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
  


  database.ref().on("value", function(snapshot) {
    //   console.log(snapshot.val());
  })

  $("#addTrainButton").on("click", function(event) {
      event.preventDefault();

    

      var trainName = $("#trainName").val().trim();
      var trainDestination = $("#trainDestination").val().trim();
      var firstTrainTime = $("#firstTrainTime").val().trim();
      var trainFrequency = $("#trainFrequency").val().trim();
      var firstTrainTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1,"years");
      var diffTime = moment().diff(moment(firstTrainTimeConverted), "minutes");
      var timeRemaining = diffTime % trainFrequency;
      var minuesUntilTrain = trainFrequency - timeRemaining;
      var nextArrival = moment().add(minuesUntilTrain, "minutes")

        console.log(timeRemaining);
        console.log(minuesUntilTrain);
        console.log(nextArrival);


      var newTrain = {
          train: trainName,
          destination: trainDestination,
          start: firstTrainTime,
          frequency: trainFrequency
        //   arrival: nextArrival,
        //   maway: minuesUntilTrain
      };

      database.ref().push(newTrain);
  })

  database.ref().on("child_added", function(childSnapshot) {

    // console.log(childSnapshot.val());

    var trainName = childSnapshot.val().train;
    var trainDestination = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().start;
    var trainFrequency = childSnapshot.val().frequency;

    $("#trainTimes").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td></tr>");

  })