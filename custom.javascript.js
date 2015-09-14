/**
 * Created by Kelsey McKenna on 14/09/2015.
 */

function initialise() {

}

function startGame() {
    alert("Start");
    populate(10);
}

function populate(numDates) {
    var table = document.getElementById("gameTable");

    //Wipe the contents of the table
    table.innerHTML = "";

    var dates = generateDates(numDates);

    for (var i = 0; i < numDates; ++i) {
        var row = document.createElement("tr");
        var dateCell = document.createElement("td");
        dateCell.innerHTML = dates[i];
        var dayCell = document.createElement("td");
        var checkCell = document.createElement("td");

        row.appendChild(dateCell);
        row.appendChild(dayCell);
        row.appendChild(checkCell);

        table.appendChild(row);
    }
}

function generateDates(num) {
    var contains = function(arr, element) {
        for (var i = 0; i < arr.length; ++i) {
            if (arr[i] === element) return true;
        }

        return false;
    }

    var svaret = [];

    for (var i = 0; i < num; ++i) {

    }
}

function randomDate() {
    var isLeap = function(y) {
        return (y % 4 == 0) && (y % 100 == 0 ? y % 400 == 0 : true);
    }

    var randInt = function(range) {
        return Math.floor(Math.random() * range);
    }

    var yearRange = (9999 - 1900);
    var year = randInt(yearRange) + 1900;

    var month = randInt(12) + 1;

    var dayRange;

    if (month == 1 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) dayRange = 31;
    else if (month == 2) {
        if (isLeap(year)) dayRange = 29;
        else dayRange = 28;
    } else dayRange = 30;

    var day = randInt(dayRange) + 1;

    return day + "/" + month + "/" + year;
}







