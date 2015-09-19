/**
 * Created by Kelsey McKenna on 15/09/2015.
 */

/**
 * Calculates the day of the week given the date in the form "dd/mm/yyyy".
 *
 * @param date the date whose day will be calculated
 * @return {String} The day for the date
 */
function getDayFrom(date) {
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    var monthLookUp = [0, 3, 3, 6, 1, 4, 6, 2, 5, 0, 3, 5];
    var centuryLookUp = [6, 4, 2, 0];

    var parts = date.split("/");
    var day = parseInt(parts[0]);
    var month = parseInt(parts[1]);
    var century = parseInt(parts[2].substring(0, 2));
    var year = parseInt(parts[2].substring(2));

    var monthL = monthLookUp[month - 1];
    var centuryL = centuryLookUp[century % 4];
    var yearL = year + Math.floor(year/4);

    return days[(day + monthL + centuryL + yearL) % 7];
}




