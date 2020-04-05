// Set some time variables taken from moment.js cdn
var toDay = moment().format('dddd');  
var currentDate = moment().format('MMMM Do');
var currentTime = moment().format('LT');
var currentHour = parseInt(moment().format('h'));

//spot check
if (currentTime < "7PM"){
    console.log("I can read time by string")
}
console.log("The current time is: " +currentTime);
console.log("currentTime is a: " + typeof currentTime);


// Insert Date (and time)
$("#currentDay").html(toDay + ", " + currentDate + "<br><br>");
$("#currentDay").append("It is currently " + currentTime);

// Set an array up to create the desired timeBlocks for 
var timesOfday=["9AM", "10AM", "11AM", "12AM", "1PM", "2PM", "3PM", "4PM", "5PM"];

//Use a for loop to add rows for each timeBlock. Make use of variables and insert the attributes in order to not get confused or too wordy. 

for(var i=0; i<timesOfday.length; i++){
    //Insert a new div containing a row for each timeBlock
    var row = $("<div>");
    row.attr("class", "row");
    row.attr("data-hour",timesOfday[i]);

    //Insert 3 columns with the hour, description, and save button
    var col1= $("<div>");
    col1.attr("class","col-md-2 hour");
    col1.text(timesOfday[i]);
    
    var col2BootStrap = $("<div>");
    col2BootStrap.addClass("col-md-8 form-group description");
    col2textArea = $('<textarea class="form-control" rows="3"></textarea>');
    col2textArea.addClass(timesOfday[i]+"color");
    col2textArea.attr("data-hour",timesOfday[i]);
    col2BootStrap.append(col2textArea);

    var col3=$("<button>");
    col3.addClass("col-md-2 fas fa-save saveBtn");
    col3.attr("data-hour",timesOfday[i]);

    //Append each colum to the row and then append the row to the timeBlock in the HTML
    row.append(col1, col2BootStrap, col3);
    $(".time-block").append(row);
}

//data-hour is assigned in each row and column
var colorLocation9AM = $(".9AMcolor");

//I can access the data-hour out of the timeColor# class by $.data("hour")
console.log(colorLocation9AM.data('hour')); //should read 9AM

//what kind of data are we working with?

var data9AM = colorLocation9AM.data('hour')
console.log("data-hour is stored as a " + typeof data9AM); //string

//what kind of data are we pulling from moment.js?
console.log("currentTime is stored as a " + typeof currentTime); //string

var currentTime = JSON.stringify(currentTime);

//Change the color of the blocks according to their time: I've tried this many ways. Here is the latest.

//set an array to the classnames of the timeBlocks
var colorOfBlocks = ["9AMcolor", "10AMcolor", "11AMcolor", "12AMcolor", "1PMcolor", "2PMcolor", "3PMcolor", "4PMcolor", "5PMcolor"]

//Use a for loop to compare the data-hour of each timeBlock to the currentTime. I've made sure these are both strings a lot using "typeof".
for (var a=0; a<colorOfBlocks.length; a++){

    var colorBlock = colorOfBlocks[a];
    console.log("var colorBlock ="+colorBlock);
    console.log("var colorBlock is a "+typeof colorBlock);
    console.log($('.'+colorBlock+'').data('hour'));

    var colorofBlocksdata = $("."+colorOfBlocks[a]+"").data("hour");
    console.log(colorofBlocksdata);

    //Start with all of them setup as gray
    $('.'+colorOfBlocks[a]+'').addClass("past");

    //Setup conditional if/else statements to assign color to class

    if (colorofBlocksdata > currentTime){
        $('.'+colorOfBlocks[a]+'').addClass("future");
         console.log("color should be green");
     } else if (colorofBlocksdata < currentTime) {
         $('.'+colorOfBlocks[a]+'').addClass("past");
         console.log("color should be gray");
     } else if (colorofBlocksdata === currentTime){
         $('.'+colorOfBlocks[a]+'').addClass("present");
         console.log("color should be red");
     } else{
         
     } 
}

console.log("-------------------");

//Set variables we are going to save and get outside of the onclick:
var readyToSave = [];
var storedScores = [];
var storeHour;
var storeInput;
var storedData;

$(".saveBtn").on("click", function () {
    //Ensure when I click the save it will know which button is clicked
    var clickLocation = $(this).data('hour');
    console.log('clicked on ' + clickLocation);

    //Let's save data: create variables for the hour & input(value)
    storeHour = $(this).data("hour")+"color"
    console.log(storeHour);
    storeInput = $("."+storeHour+"").val();
    console.log(storeInput);

     storedData = {storeHour, storeInput};
     readyToSave.push(storedData);

    localStorage.setItem("timeClass,text", JSON.stringify(readyToSave));
    loadData();
});

    //Let's load this:
    function loadData (){
    if (localStorage.getItem("timeClass,text") !== null) {
        storedScores = JSON.parse(localStorage.getItem("timeClass,text"));
        console.log(storedScores);
        console.log(storedScores.storeHour);
        console.log(storedScores.storeInput);

        for (var b = 0; b < storedScores.length; b++){
            console.log(storedScores[b].storeHour);
            console.log(storedScores[b].storeInput);
            $('.'+storedScores[b].storeHour+'').val(storedScores[b].storeInput);
        }
    }}

    loadData();





