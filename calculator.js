function add(a, b){
    return a + b;
}
function subtract(a, b){
    return a - b;
}
function multiply(a,b){
    return a * b;
}
function divide(a,b){
    if(b == 0){
        return "Really?"
    }
    return a/b;
}
function isNumber(number){
    let numbers = "0123456789";
    return numbers.includes(number);
}
function populateDisplay(num){
    display.textContent = limitOverflow(num);
}
function Del(){
    if(display.textContent != "0"){
        let num = display.textContent; // always returns a string
        let end = num.length - 1;
        let slicedNum;
        if (num.length == 1){
            slicedNum = 0;
        } else{
            slicedNum =  num.slice(0, end);
        }
        if(num == firstNum){
            firstNum =  slicedNum;
        } else if (num == secNum){
            secNum =  num.slice(0, end);
        }
        populateDisplay(slicedNum)

    }
}
function operate(num_1, operator, num_2){
    if (operator === "+"){
        return add(num_1, num_2);
    } else if (operator === "-"){
        return subtract(num_1, num_2);
    } else if (operator === "*"){
        return multiply(num_1, num_2);
    } else if (operator === "/"){
        return divide(num_1, num_2);
    }
}
function clearBtn(){
    populateDisplay("0");
    firstNum = undefined;
    secNum = undefined;
    operator = undefined;
    previousCalculation = false;

}
function limitOverflow(num){
    if(num.includes(".")){
        indexOfDecimal = num.indexOf(".");
        lengthAfterDecimal = num.slice(indexOfDecimal+1).length;
        if (lengthAfterDecimal > 8){
            num = Number(num).toFixed(8);
        }
    }
    return num;
}
function calculateResult(){
    if (firstNum != undefined && secNum !==undefined && operator !== undefined){
        console.log(firstNum);
        console.log(secNum);
        console.log(operator);
        let calculatedVal = operate(Number(firstNum), operator, Number(secNum));
        firstNum = calculatedVal.toString();
        previousCalculation = true;
        operator = undefined;
        secNum = undefined;
        populateDisplay(firstNum);
    }
}
function btnClick(e){
    num = e.target.textContent;
    if (num === "Ac"){
        return clearBtn();
    }
    if (isNumber(num)){
        if(firstNum === undefined){
            firstNum = num;
            populateDisplay(firstNum);
            
        }else if (secNum === undefined && operator === undefined){
            // resets first number from previous calclation when a new number is entered. 
            if(previousCalculation){
                firstNum = num;
                previousCalculation = false;
            } else{    
                if(firstNum == "0"){
                    firstNum = num;
                }else{
                    firstNum = firstNum.concat(num);
                }       
            }
            populateDisplay(firstNum);

        }else if(secNum ===undefined){
            secNum = num;
            populateDisplay(secNum);

        }else if(operator != undefined){
            if(secNum == "0"){
                secNum = num
            } else{
                secNum = secNum.concat(num);
            }
            populateDisplay(secNum);
        }
    }
    if(num === "."){
        if(firstNum === undefined){
            firstNum = "0.";
            populateDisplay(firstNum);
        }else if(previousCalculation && secNum === undefined && operator === undefined){
            previousCalculation = false;
            firstNum = "0.";
            populateDisplay(firstNum);

        }else if(secNum === undefined && operator !== undefined){
            secNum = "0.";
            populateDisplay(secNum);
        }else{
            if(!display.textContent.includes(".")){
                if(display.textContent == firstNum){
                    firstNum = firstNum.concat(num);
                    populateDisplay(firstNum)
                }else if (display.textContent == secNum){
                    secNum = secNum.concat(num)
                    populateDisplay(secNum);
                }
            }
        }
    }
    if("+-*/".includes(num)){
        if(operator === "undefined"){
            operator = num;
        }else{
            calculateResult();
            operator = num;
        }
    }
    if (num === "del"){
        Del();
    }

    if (num == "="){
       calculateResult();
    }
}
let firstNum, secNum, operator;
//start a clean sheet when a new number is entered after a calculation
let previousCalculation = false;
let display = document.querySelector(".display");
const btns = document.querySelectorAll("button");
for(let i=0; i < btns.length; i++){
    btns[i].addEventListener("click", btnClick)
}