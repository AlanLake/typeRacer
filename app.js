const quote_api = 'https://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timer = document.getElementById('timer')
const records = document.getElementById('records')
let finished = true

quoteInputElement.addEventListener('input', () =>{
    const arrayQuote = quoteDisplayElement.querySelectorAll('span')
    const arrayValue = quoteInputElement.value.split('')
    arrayQuote.forEach((charSpan, index) => {
        const char = arrayValue[index]
        if (char == null){
            charSpan.classList.remove('correct')
            charSpan.classList.remove('incorrect')
            finished = false
        }
        else if(char === charSpan.innerText) {
            charSpan.classList.add('correct')
            charSpan.classList.remove('incorrect')
            finished = true
        }
        else {
            charSpan.classList.remove('correct')
            charSpan.classList.add('incorrect')
            finished = false
        }
    })
    if(arrayValue.length == 1){
        setTimer()
    }
    if (finished) {
        renderRecord()
        renderNewQuote()
        clearInterval(time)
    }
})

function getRandomQuote() {
    return fetch(quote_api)
        .then(response => response.json())
        .then(data => data.content)
}

async function renderNewQuote() {
    const quote = await getRandomQuote()
    window.wordsCount = quote.split(" ").length
    quoteDisplayElement.innerText = '';
    quote.split('').forEach(char => {
        const charSpan = document.createElement('span')
        charSpan.innerText = char
        quoteDisplayElement.appendChild(charSpan)
    })
    quoteInputElement.value = null
    console.log(quote)
    console.log(wordsCount)
}

let startTime
function setTimer() {
    timer.innerText = 0
    startTime = new Date()
    time = setInterval(() => {
       timer.innerText = getTimerTime()
    }, 1000)
}

function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000)
}

function renderRecord() {
    let finishedTimer = timer.innerText
    let record = (wordsCount + 1) / (finishedTimer/60)
    records.innerHTML = `
    <h2>Result:</h2>
    <p>WPM: ${Math.floor(record)}</p>
    `
}

renderNewQuote()
xxxxxxxxxxxxxxx

