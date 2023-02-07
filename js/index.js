// rates.RUB

const btnsLeft = document.querySelectorAll('.left button');
const btnsRight = document.querySelectorAll('.right button');
let purpleLeft = document.querySelector('.left .purple').textContent;
let purpleRight = document.querySelector('.right .purple').textContent;
let inputLeft = document.querySelector('.left input');
let inputRight = document.querySelector('.right input');
const leftCurse = document.querySelector('.left-curse');
const rightCurse = document.querySelector('.right-curse');
let rightRate;
let leftRate;



startResponse()


btnsLeft.forEach(elem => {
    elem.addEventListener('click', () => {

        btnsLeft.forEach(elems => {
            elems.classList.remove('purple');
        })

        elem.classList.add('purple');
        purpleLeft = document.querySelector('.left .purple').textContent;
        console.log(purpleLeft);
        startResponse()
        
    })
})

btnsRight.forEach(elem => {
    elem.addEventListener('click', () => {

        btnsRight.forEach(elems => {
            elems.classList.remove('purple');
        })

        elem.classList.add('purple');
        purpleRight = document.querySelector('.right .purple').textContent;
        startResponse()
    })
})


function startResponse(){
    fetch(`https://api.exchangerate.host/latest?base=${purpleRight}&symbols=${purpleLeft} `)
    .then((response) => response.json())
    .then(
        (result) => {
            rightRate = +(result.rates[purpleLeft]);
            rightRate = Math.round(rightRate*10000)/10000;
            leftRate = Math.round(10000/rightRate)/10000;
            changeValut(leftRate, rightRate)
            inputRight.value = Math.round((inputLeft.value * leftRate)*10000)/10000; 
            resizeToFitLeft();
            resizeToFitRight();
        })
    .catch((err) => {
        alert(`Ошибка, попробуйте обновить страницу // [${err}]`)
    })
}
    

function changeValut(valueLeft, valueRight){
    leftCurse.textContent = `1 ${purpleLeft} = ${valueLeft} ${purpleRight}`;
    rightCurse.textContent = `1 ${purpleRight} = ${valueRight} ${purpleLeft}`;
}


function addValue(firstInput, secondInput){
    inputLeft.value = firstInput;
    inputRight.value = secondInput;
}

inputLeft.addEventListener('keyup', (evt) => {
    if (isNaN(+evt.key) && evt.key != '.' && evt.key !=','){
        let x = inputLeft.value.split('');
        x.pop();
        inputLeft.value = x.join('')
    } else if (evt.key == ',' || evt.key == '.') {
        let x = inputLeft.value.split('');
        x.pop();
        if(!x.includes('.')) x.push('.')
        inputLeft.value = x.join('')
    }

    inputRight.value = Math.round((inputLeft.value * leftRate)*10000)/10000; 
    resizeToFitRight();
})


inputRight.addEventListener('keyup', (evt) => {
    if (isNaN(+evt.key) && evt.key != '.' && evt.key !=','){
        let x = inputRight.value.split('');
        x.pop();
        inputRight.value = x.join('')
    } else if (evt.key == ',' || evt.key == '.') {
        let x = inputRight.value.split('');
        x.pop();
        if(!x.includes('.')) x.push('.')
        inputRight.value = x.join('')

    }

    inputLeft.value = Math.round((inputRight.value * rightRate)*10000)/10000;
     resizeToFitLeft();
})


function resizeToFitLeft(){
    inputLeft.style.fontSize = '36px'
    if(inputLeft.value.length>13){
        inputLeft.style.fontSize = '22px'
    } else if (inputLeft.value.length>11){
        inputLeft.style.fontSize = '28px'
    }
}

function resizeToFitRight(){
    inputRight.style.fontSize = '36px'
    if(inputRight.value.length>13){
        inputRight.style.fontSize = '22px'
    } else if (inputRight.value.length>11){
        inputRight.style.fontSize = '28px'
    }
}
