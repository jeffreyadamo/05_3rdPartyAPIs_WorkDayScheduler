# 05 Third-Party APIs: Work Day Scheduler

## Objective:

Provide a functional work day schedule application that provides the user the current time, an area to take notes at each time hour of the day, and have each time block's color represent it's time relative to the current time.  Be able to save tasks and revisit later. 

## User Story

```
AS AN employee with a busy schedule
I WANT to add important events to a daily planner
SO THAT I can manage my time effectively
```

## Acceptance Criteria for MVP (with notes - more notes in script.js)

```
GIVEN I am using a daily planner to create a schedule
WHEN I open the planner
THEN the current day is displayed at the top of the calendar
WHEN I scroll down
THEN I am presented with timeblocks for standard business hours
WHEN I view the timeblocks for that day
THEN each timeblock is color coded to indicate whether it is in the past, present, or future
WHEN I click into a timeblock
THEN I can enter an event
WHEN I click the save button for that timeblock
THEN the text for that event is saved in local storage
```

## Demo:
![Image](/Assets/WorkDay.gif)


## Development Notes

GIVEN I am using a daily planner to create a schedule
WHEN I open the planner
THEN the current day is displayed at the top of the calendar
```javascript
//Utilizing moment.js CDN, variables were set and placed into the #currentDay <div>:
    var toDay = moment().format('dddd'); 
    var currentDate = moment().format('MMMM Do');

    $("#currentDay").html(toDay + ", " + currentDate + "<br><br>");
```
WHEN I scroll down
THEN I am presented with timeblocks for standard business hours
```javascript
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
```
* I couldn't figure out how to assign the hover over save button style changed here.

WHEN I view the timeblocks for that day
THEN each timeblock is color coded to indicate whether it is in the past, present, or future
```javascript
    //Use a for loop to compare the data-hour of each timeBlock to the currentTime. I've made sure these are both strings a lot using "typeof".
for (var a = 0; a < timeClass.length; a++) {
  var colorBlock = timeClass[a];
  var colorofBlocksdata = $("." + timeClass[a] + "").data("hour");
  //Setup conditional if/else statements to assign color to class
  
  if (colorofBlocksdata < currentTime) {
    $("." + timeClass[a] + "").addClass("past");
    console.log(timeClass[a] +" color should be gray");
  } 
  if (colorofBlocksdata === currentTime) {
    $("." + timeClass[a] + "").addClass("present");
    console.log(timeClass[a] +" color should be red");
  }
   if (colorofBlocksdata > currentTime) {
    $("." + timeClass[a] + "").addClass("future");
    console.log(timeClass[a] +" color should be green");
  } 
```
* I struggled to get this to work correctly. It seems to want to set the first timeBlock as future and will be green when it is not 9AM. I switched between using strings and numbers and went with the final string output of the "data-hour" of the timeBlock, which seems to be the format from moment.js
### PATCH FOR 9AM COLOR ERROR - 4/18/2020:
* Fixed with a number specific if/then statement:

```javascript
////////////PATCH FOR 9AM COLOR: System thinks 9AM is greater than any other value, so will assign a "future" class. Rewrote an if/then statement specifically for the number 9 and the first number of the currentTime. Since 9 should be higher than 1-8, this works with one digit. For 10, 11, and 12, we'll go back to comparing 9 to currentTime

  $(".9AMcolor").removeClass("future");
    if(9 > currentTime[0]){
      $(".9AMcolor").addClass("past");
    }
    if(9 < currentTime.slice(0,2)){
      $(".9AMcolor").addClass("future");
    }
    if(9 === currentTime[0]){
      $(".9AMcolor").addClass("present");
    }
```


WHEN I click into a timeblock
THEN I can enter an event
WHEN I click the save button for that timeblock
THEN the text for that event is saved in local storage
```javascript
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
```

WHEN I refresh the page
THEN the saved events persist
```javascript
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
```
