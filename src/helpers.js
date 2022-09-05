let humanDate = function (date) {
    const formattingOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
    let day = date ? new Date(date) : new Date();

    return day.toLocaleDateString('ro', formattingOptions);
}
  
let generateRandom = function(maxLimit = 100){
    let rand = Math.random() * maxLimit;
    rand = Math.floor(rand); // 99

    return rand;
} 

export { humanDate, generateRandom } 

function calculateDaysBetweenDates(begin, end) {
    let oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    let firstDate = new Date(begin);
    let secondDate = new Date(end);
    
    return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
}

function fizzbuzz(number) {
    let result = '';
    if (number % 3 === 0) {
        result += 'Fizz';
    }
    if (number % 5 === 0) {
        result += 'Buzz';
    }
    return result;
}