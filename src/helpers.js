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
