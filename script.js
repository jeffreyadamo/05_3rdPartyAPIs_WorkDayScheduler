// Set some time variable
var toDay = moment().format('dddd');  
var currentDate = moment().format('MMMM Do');
var currentTime = moment().format('LT');
var currentHour = parseInt(moment().format('h'));

//working on military time to make later if/then class assignments
if (currentHour === 1 ||currentHour === 2 ||currentHour === 3 ||currentHour === 3 ||currentHour === 5 ){
    currentHour = currentHour + 12
};
var currentHour = JSON.stringify(currentHour);


//spot check
console.log("The current time is: " +currentTime);
console.log("currentTime is a: " + typeof currentTime);
console.log("The currentHour is " + currentHour);
console.log("currentHour is a: " + typeof currentHour);




// insert Date
$("#currentDay").html(toDay + ", " + currentDate + "<br><br>");
$("#currentDay").append("It is currently " + currentTime);

// Insert HTML for in time-block div:

//This uses div classes
// $(".time-block").append("<div class='row hour8'>");
// $(".hour8").append("<div class='col-md-2 hour'>8am</div>");
// $(".hour8").append("<div class='col-md-8 description'>Text here</div>");
// $(".hour8").append("<i class='col-md-2 fas fa-save saveBtn'></i>");


//This uses a form

//How can I do the above in a loop?

// change this to a for loop to append all times from 9-5
var timeSlot = [9 ,10,11,12,13,14,15,16,17];
var timesOfday=[]
for (var j=0; j<9; j++){
    timesOfday.push("hour"+j);
}
console.log(timeSlot);
console.log(timeSlot[1]);

for(var i=0; i<timeSlot.length; i++){
    var row = $("<div>")
    row.attr("class", "row")
    var col1= $("<div>")
    col1.attr("class","col-md-2 hour" )
    col1.text(timeSlot[i])
    
    // var col2=$("<input>")
    
    // col2.addClass("col-md-8 description timeColor"+ timeSlot[i]);
    // col2.attr("type", "text");
    // col2.attr("data-hour",timeSlot[i])

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
console.log(testColor9)

//If I wanted to loop through all the data-hours and console log
$(".timeColor9").addClass("present");


// $('[data-hour]').each(function() {
//     console.log($(this).data('hour'));
//   })

//   $('.timeColor9').each(function() {
//     console.log($(this).data('hour'));
//   })

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
