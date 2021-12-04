let display = 0;
let memory = null;
let history = "";
let action = null;
let dp = false;
const maxlen = 10;

function divide(a, b){
    return a / b;
}

function plus(a, b){
        return a + b;
}

function minus(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function del(){
    display.innerText = "";
}

function showDisplay(num) {
    let d = document.getElementById("answer");
    d.innerText = stringify(num);
    /**
    * TODO:
    * - limit max number if digits after decimal point.
    * - if length of num more than 14, cut the number.
    * - do not let enter numbers longer than 10 digits.
    * - consider using scientific notation.
    */ 
}

function showHistory(str) {
    h = document.getElementById("history");
    h.innerText = str;
}

function stringify(num) {
    num = String(num);
    if(num.length < maxlen) return num.toString();
    else if(num.includes("e+")) {
        let numArray = num.split("e+");
        return parseFloat(numArray[0]).toFixed(8) + "e+" + parseFloat(numArray[1]).toFixed(8);
    }
    else if(num.includes("e-")) {
        let numArray = num.split("e-");
        return parseFloat(numArray[0]).toFixed(8) + "e-" + parseFloat(numArray[1]).toFixed(8);
    } 
    else {
        let numArray = num.split(".");
        // return parseFloat(numArray[0]).toFixed(8) + "." + parseFloat(numArray[1]).toFixed(8);
        return num.slice(0, 10);
    }
}

function parseNumber(n) {
    if(n == null) return 0;
    else if(typeof n == "string"){
        if(n == "") return 0;
        else n.replace(",", "").replace(" ", "");
        return parseFloat(n);
    } else if(typeof n == "number") return n;
    return "error";
}

function keyPressed(key) {

    // If key is mathematical action
    if(["divide","plus","minus","multiply"].includes(key)) {
        if(key == "divide") action = "/";
        else if(key == "plus") action = "+";
        else if(key == "minus") action = "-";
        else if(key == "multiply") action = "*";

        memory = display;
        display = null;
        history = stringify(memory) + action;
        showHistory(history);

      // If key is equal (=)
    } else if (key == "equal") {
        let result = 0;
        if(action){
            if(memory == null) memory = display;
            if(display == null) display = memory;

            history += display;
            switch(action) {
                case "/":
                    result = divide(memory, display);
                    break;
                case "+":
                    result = plus(memory, display);
                    break;
                case "-":
                    result = minus(memory, display);
                    break;
                case "*":
                    result = multiply(memory, display);
                    break;
                default:
                    break;
            }
            memory = display;
            display = result;

            showDisplay(display);
            showHistory(history);
        }

      // If key is clear or divide          
    } else if(key == "clear") {
        memory = null;
        display = 0;
        history = "";
        action = null;
        
        showDisplay(display);
        showHistory(history);

    } else if (key == "del") {
        if(Math.abs(display) > 0){
            display = Number(display.toString().slice(0, display.toString().length - 1));
        };
        showDisplay(display);


      // If key is a decimal point (.)
    } else if(key == "dp") {

        if(!dp) {
            dp = true;
        }

      // If key is a digit
    } else if(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(key)) {

        // Is it at max length?
        if (answer.innerText.length < maxlen){

            // If decimal point is true
            if (dp == true) {

                display = parseNumber(parseNumber(display) + dp + key);
                dp = false;

              // If decimal point is false
            } else if (dp == false) {
                display = parseNumber(parseNumber(display) + key);
            }
            showDisplay(display);
        } 

        // If display & action = true and memory = false
        if (display && action && !memory) {
            // Adds memory
            memory = display;
            display = 0;
            showDisplay(display);

        }
        
    }
}

showDisplay(display);
showHistory(history);