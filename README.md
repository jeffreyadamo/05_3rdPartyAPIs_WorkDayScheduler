# 05 Third-Party APIs: Work Day Scheduler

## Objective:
Create a simple calendar application that allows the user to save events for each hour of the day. This app will run in the browser and feature dynamically updated HTML and CSS powered by jQuery.

You'll need to use the [Moment.js](https://momentjs.com/) library to work with date and time. Be sure to read the documentation carefully and concentrate on using Moment.js in the browser.

## User Story

```
AS AN employee with a busy schedule
I WANT to add important events to a daily planner
SO THAT I can manage my time effectively
```

## Acceptance Criteria (with notes - more notes in script.js)


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
```
* I struggled to get this to work correctly. It seems to want to set the first timeBlock as future and will be green when it is not 9AM. I switched between using strings and numbers and went with the final string output of the "data-hour" of the timeBlock, which seems to be the format from moment.js
* I spent a long time on this.


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
* I struggled with this part. The bug here is upon refreshing, everything is still there (yay!), but when hitting a save button, it erases everything except for the last entry. 

## Fin.

The following animation demonstrates what the application should be doing:



![day planner demo](./Assets/05-third-party-apis-homework-demo.gif)

## Review

You are required to submit the following for review:

* The URL of the deployed application.

* The URL of the GitHub repository. Give the repository a unique name and include a README describing the project.

- - -
© 2019 Trilogy Education Services, a 2U, Inc. brand. All Rights Reserved.
