/**
 * Created by Kelsey McKenna on 14/09/2015.
 */

/**
 * either "running" or "stopped"
 */
var _running = false;

function initialise() {
    addEventListeners();
}

function startGame() {
    var numDates = getNumDates();
    var mode = getMode();

    if (numDates < 1) alert("Number of dates must be greater than 0");
    else if (numDates > 500) alert("Too many dates");
    else if (isNaN(numDates)) alert("Please enter an integer greater than 0");
    else {
        populate(numDates, mode);
        _running = true;
        _answerIndex = 0;
        _gameStartTime = Date.now();
    }
}

function populate(numDates, mode) {
    var table = document.getElementById("gameTable");

    //Wipe the contents of the table
    table.innerHTML = "";

    var dates = generateDates(numDates, mode);
    _currentDates = dates;

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

var _numDates = 10;
/**
 * @returns {Number} The number of dates to be generated, as specified by the user. Will return NaN if user enters an
 * invalid value.
 */
function getNumDates() {
    return _numDates;
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
    var contains = function (arr, element) {
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
    var isLeap = function (y) {
        return (y % 4 == 0) && (y % 100 == 0 ? y % 400 == 0 : true);
    };

    var randInt = function (range) {
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

/**
 * An integer storing the index of the date to be answered
 */
var _answerIndex;
var _currentDates;
/**
 * Handles the user's input - either a day value entered, or the resetting.
 * @param val the value/number given by the user.
 */
function triggerUserInput(val) {
    if (val === 8) startGame();
    else {
        var dayToInt = function (day) {
            return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].indexOf(day);
        };

        var intToDay = function (i) {
            return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][i];
        };

        setContent(_answerIndex, 1, intToDay(val));

        var expectedIndex = dayToInt(getDayFrom(_currentDates[_answerIndex]));

        if (val === expectedIndex) {
            setContent(_answerIndex, 2, "Correct!");
            setClass(_answerIndex, 2, "correct");
        } else {
            setContent(_answerIndex, 2, intToDay(expectedIndex));
            setClass(_answerIndex, 2, "incorrect");
        }

        ++_answerIndex;

        if (_answerIndex >= _currentDates.length) stopGame();
    }
}

/**
 * Sets the content of the specified cell in the game table
 * @param row the row index
 * @param col the column index
 * @param val the new value for the cell
 */
function setContent(row, col, val) {
    var table = document.getElementById("gameTable");
    var rowD = table.children[row];
    var cellD = rowD.cells[col];

    cellD.innerHTML = val;
}

/**
 * Sets the class of the specified cell in the game table
 * @param row the row index
 * @param col the column index
 * @param newClass the new class for the cell
 */
function setClass(row, col, newClass) {
    var table = document.getElementById("gameTable");
    var rowD = table.children[row];
    var cellD = rowD.cells[col];

    cellD.setAttribute("class", newClass);
}

var _gameStartTime;
/**
 * Stops the game - displays the time elapsed and stops listening for keys
 */
function stopGame() {
    var format = function (t) {
        var minutes = Math.floor(t / 60);
        var seconds = t % 60;

        var s = "" + seconds;
        var periodIndex = s.indexOf(".");

        if (periodIndex > -1) s = s.substring(0, Math.min(periodIndex + 3, s.length));

        if (minutes > 0) {
            s = (seconds < 10 ? "0" + s : "" + s);
            return minutes + ":" + s;
        } else {
            return "" + s;
        }
    };

    if (isTimed()) {
        var time = (Date.now() - _gameStartTime) / 1000;
        alert("Time taken: " + format(time) + (time < 60 ? " seconds" : ""));
    }

    _running = false;
}

function isTimed() {
    return document.getElementById("timeCheckbox").checked;
}

/**
 * Shows a prompt to the user to change the number of dates shown.
 */
function showNumPrompt() {
    var finished;

    do {
        finished = true;

        var input = prompt("Enter the number of dates to be generated in each round", "" + _numDates);

        if (input === null) finished = true;
        else {
            var val = parseInt(input);
            if (val < 1 || isNaN(val)) {
                finished = false;
                alert("Please enter an integer greater than 0.");
            } else _numDates = val;
        }
    } while (!finished);
}



