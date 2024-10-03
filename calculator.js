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
    display = document.querySelector(".display");
    display.textContent = num;
}
function Del(){
    if(display.textContent != "0"){
        let num = display.textContent;
        console.log(num);
        console.log(typeof num)
        console.log(num.length)
        let end = num.length - 1;
        console.log(end);
        let slicedNum;
        if (num.length == 1){
            slicedNum = 0;
        } else{
            slicedNum =  num.slice(0, end);
        }
        if(num === firstNum){
            firstNum =  slicedNum
        } else if (num === secNum){
            secNum =  num.slice(0, end);
        }
        display.textContent = slicedNum;

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
    display.textContent = 0;
    firstNum = undefined;
    secNum = undefined;
    operator = undefined;

}
function calculateResult(){
    if (firstNum != undefined && secNum !==undefined && operator !== undefined){
        console.log(Number(firstNum));
        console.log(Number(secNum))
        console.log(operator)
        let calculatedVal = operate(Number(firstNum), operator, Number(secNum));
        firstNum = calculatedVal;
        operator = undefined;
        secNum = undefined;
        populateDisplay(calculatedVal);
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
            if (typeof firstNum === "number"){
                firstNum = String(num);
            } else{
                firstNum = firstNum.concat(num);
            }
            populateDisplay(firstNum);

        }else if(secNum ===undefined){
            secNum = num;
            populateDisplay(secNum);

        }else if(operator != undefined){
            secNum = secNum.concat(num);
            populateDisplay(secNum);
        }
        // populateDisplay(num);
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
let firstNum, secNum, operator, display;
const btns = document.querySelectorAll("button");
for(let i=0; i < btns.length; i++){
    btns[i].addEventListener("click", btnClick)
}