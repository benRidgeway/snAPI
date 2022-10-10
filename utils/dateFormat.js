const DateTime = require('luxon');

const dateFormat = function(inputDate) {
    //takes the inputted DateTime object and formats it into a string
    // MM/DD/YY 1:30 PM
    return inputDate.toLocaleString(DateTime.DATETIME_SHORT);
};

module.exports = dateFormat;