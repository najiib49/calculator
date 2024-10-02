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
                firstNum = num;
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
        operator = num;
    }

    if (num == "="){
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
}
let firstNum, secNum, operator, display;
const btns = document.querySelectorAll("button");
for(let i=0; i < btns.length; i++){
    btns[i].addEventListener("click", btnClick)
}