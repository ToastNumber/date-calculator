/**
 * Created by Kelsey McKenna on 15/09/2015.
 */

function addEventListeners() {
    var getPlain = function(keyCode) {
        if (keyCode >= 48 && keyCode <= 57) {
            return "" + (keyCode - 48);
        } else {
            return "ERROR";
        }
    };

    window.addEventListener("keypress", function(e) {
        var source = e.srcElement.id;
        var plain = getPlain(e.keyCode);

        if (source !== "fldNumDates" && plain != "ERROR" &&_running === true) {
            console.log(plain);
        }
    });
}

