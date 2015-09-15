/**
 * Created by Kelsey McKenna on 15/09/2015.
 */

/**
 * Add event listeners for key presses so that the user can enter the day using a single key press.
 */
function addEventListeners() {
    var getNum = function(keyCode) {
        if (keyCode >= 48 && keyCode <= 54 || keyCode === 56) {
            return keyCode - 48;
        } else {
            return NaN;
        }
    };

    window.addEventListener("keypress", function(e) {
        var source = e.srcElement.id;
        var val = getNum(e.keyCode);

        if (source !== "fldNumDates" && !isNaN(val) &&_running === true) {
            triggerUserInput(val);
        }
    });
}

