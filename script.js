// Set some time variable
var toDay = moment().format('dddd');  
var currentDate = moment().format('MMMM Do');
var currentTime = moment().format('LT');
var currentHour = moment().format('h');
var value11 = $(".hour11").value;

//spot check
console.log("The current time is: " +currentTime);
console.log("currentTime is a: " + typeof currentTime);
console.log("The currentHour is " + currentHour);
console.log("currentHour is a: " + typeof currentHour);
console.log(value11)


// insert Date
$("#currentDay").html(toDay + ", " + currentDate + "<br><br>");
$("#currentDay").append("It is currently " + currentTime);



if (currentHour < "The div's hour"){
    ;
}