// Set some time variable
var toDay = moment().format('dddd');  
var currentDate = moment().format('MMMM Do');
var currentTime = moment().format('LT');
var currentHour = parseInt(moment().format('h'));

//working on military time to make later if/then class assignments
if (currentHour === 1 ||currentHour === 2 ||currentHour === 3 ||currentHour === 3 ||currentHour === 5 ){
    currentHour = currentHour + 12
};
// var currentHour = JSON.stringify(currentHour);


//spot check
console.log("The current time is: " +currentTime);
console.log("currentTime is a: " + typeof currentTime);
console.log("The currentHour is " + currentHour);
console.log("currentHour is a: " + typeof currentHour);


// insert Date
$("#currentDay").html(toDay + ", " + currentDate + "<br><br>");
$("#currentDay").append("It is currently " + currentTime);

// change this to a for loop to append all times from 9-5
var timeSlot = [9 ,10,11,12,13,14,15,16,17];
var timesOfday=[]
for (var j=0; j<9; j++){
    timesOfday.push("hour"+j);
}
console.log(timeSlot);
console.log(timeSlot[1]);

//Use a for loop to add rows for each timeBlock. Make use of variables and insert the attributes in order to not get confused or too wordy. 

for(var i=0; i<timeSlot.length; i++){
    var row = $("<div>")
    row.attr("class", "row")
    var col1= $("<div>")
    col1.attr("class","col-md-2 hour" )
    col1.text(timeSlot[i])
    

    var col2BootStrap = $("<div>");
    col2BootStrap.addClass("col-md-8 form-group description");
    col2textArea = $('<textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>')
    col2textArea.addClass("timeColor"+timeSlot[i])
    col2textArea.attr("data-hour",timeSlot[i]);
    col2BootStrap.append(col2textArea);


    var col3=$("<button>")
    col3.addClass("col-md-2 fas fa-save saveBtn")
    row.append(col1, col2BootStrap, col3)
    $(".time-block").append(row)

}

var testColor9 = $(".timeColor9");


//If I wanted to loop through all the data-hours and console log
// $(".timeColor9").addClass("present");

console.log(typeof testColor9.data("hour"));
testColor9data = testColor9.data("hour");
console.log(testColor9data);
console.log(typeof currentHour);

if (currentHour === testColor9data){
    testColor9.addClass("present")
    console.log("color should be red")
} else if (currentHour < testColor9data){
    testColor9.addClass("future")
    console.log("color should be green")
} else {
    testColor9.addClass("past")
    console.log("color should be grey")
}




// $('[data-hour]').each(function() {
//     console.log($(this).data('hour'));
//   })

//   $('.timeColor9').each(function() {
//     console.log($(this).data('hour'));
//   })

// for (var a=0; a<timeSlot.length; i++){
//     if ()
// }


//   var timeValue9 = $('.timeColor9').each(function() {
//     JSON.stringify($(this).data('hour'));
//   })
// console.log(timeValue9);

// if (currentHour === $(".data-hour"[3])) {
// $(".description").addClass(".present");
// }

// if (currentHour > )

// Write a statement to set an attribute depending on the currentTime
// if (currentTime === )


// $(".hour5").attr("value", "5");
// console.log($(".hour5").value);
