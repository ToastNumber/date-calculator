/**
 * Created by Kelsey McKenna on 14/09/2015.
 */

function initialise() {
}

function startGame() {
    var numDates = getNumDates();
    var mode = getMode();

    if (numDates < 1) alert("Number of dates must be greater than 0");
    else if (numDates > 500) alert("Too many dates");
    else if (isNaN(numDates)) alert("Please enter an integer greater than 0");
    else {
        populate(numDates, mode);
    }
}

function populate(numDates, mode) {
    var table = document.getElementById("gameTable");

    //Wipe the contents of the table
    table.innerHTML = "";

    var dates = generateDates(numDates, mode);

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

/**
 * @returns {Number} The number of dates to be generated, as specified by the user. Will return NaN if user enters an
 * invalid value.
 */
function getNumDates() {
    var s = document.getElementById("fldNumDates").value.trim();
    return parseInt(s);
}

/**
 * @returns {string} A string indicating the difficulty selected by the user - either "easy" or "hard".
 */
function getMode() {
    return document.getElementById("mode").value.trim().toLowerCase();
}

/**
 *
 * @param num the number of dates to generate
 * @param mode string, either "easy" or "hard". "easy" means 1900-1999, "hard means 1900-9999".
 * @returns {Array} an array of strings representing <i>different</i> dates
 */
function generateDates(num, mode) {
    var contains = function(arr, element) {
        for (var i = 0; i < arr.length; ++i) {
            if (arr[i] === element) return true;
        }

        return false;
    };

    var startYear, endYear;

    if (mode === "easy") {
        startYear = 1900;
        endYear = 1999;
    } else {
        startYear = 1900;
        endYear = 9999;
    }

    var svaret = [];
    for (var i = 0; i < num; ++i) {
        var currentDate;

        do {
            currentDate = randomDate(startYear, endYear);
        } while (contains(svaret, currentDate));

        svaret.push(currentDate);
    }

    return svaret;
}

/**
 * @param startYear an integer representing the earliest possible year
 * @param endYear an integer representing the last possible year
 * @returns {string} of the form "dd/mm/yyyy"
 */
function randomDate(startYear, endYear) {
    var isLeap = function(y) {
        return (y % 4 == 0) && (y % 100 == 0 ? y % 400 == 0 : true);
    };

    var randInt = function(range) {
        return Math.floor(Math.random() * range);
    };

    var format = function (day, month, year) {
        var ds = day < 10 ? "0" + day : "" + day;
        var ms = month < 10 ? "0" + month : "" + month;

        return ds + "/" + ms + "/" + year;
    };

    var yearRange = (endYear - startYear);
    var year = randInt(yearRange) + startYear;

    var month = randInt(12) + 1;

    var dayRange;

    if (month == 1 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) dayRange = 31;
    else if (month == 2) {
        if (isLeap(year)) dayRange = 29;
        else dayRange = 28;
    } else dayRange = 30;

    var day = randInt(dayRange) + 1;

    return format(day, month, year);
}







