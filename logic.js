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





$("#addTrainButton").on("click", function (event) {
    event.preventDefault();

    database.ref().on("value", function (snapshot) {

    });

    var trainName = $("#trainName").val().trim();
    var trainDestination = $("#trainDestination").val().trim();
    var firstTrainTime = $("#firstTrainTime").val().trim();
    var trainFrequency = $("#trainFrequency").val().trim();





    var newTrain = {
        train: trainName,
        destination: trainDestination,
        start: firstTrainTime,
        frequency: trainFrequency
        //   arrival: nextArrivalFormatted,
        //   maway: minutesUntilTrain
    };

    database.ref().push(newTrain);
})

database.ref().on("child_added", function (childSnapshot) {

    // console.log(childSnapshot.val());

    var trainName = childSnapshot.val().train;
    var trainDestination = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().start;
    var trainFrequency = childSnapshot.val().frequency;
    // var nextArrivalFormatted = childSnapshot.val().arrival;
    // var minutesUntilTrain = childSnapshot.val().maway;
    var firstTrainTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(firstTrainTimeConverted), "minutes");
    var timeRemaining = diffTime % trainFrequency;
    var minutesUntilTrain = trainFrequency - timeRemaining;
    var nextArrival = moment().add(minutesUntilTrain, "minutes")
    var nextArrivalFormatted = moment(nextArrival).format("hh:mm")

    console.log(timeRemaining);
    console.log(minutesUntilTrain);
    console.log(nextArrivalFormatted);
    $("#trainTimes").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + nextArrivalFormatted + "</td><td>" + minutesUntilTrain + "</td></tr>");



})