export default function Button({lgBtn, innerText, calc, setCalc, answer, setAnswer}) {
    let classString = "bg-slate-300 text-center p-3 drop-shadow-lg ease-in-out duration-100 active:drop-shadow-sm active:scale-75 text-2xl font-bold"
    if (lgBtn) classString += " col-span-2"
    const add = (num1, num2) => {
        return num1 + num2
    }
    const subtract = (num1, num2) => {
        return num1 - num2
    }
    const multiply = (num1, num2) => {
        return num1 * num2
    }
    const divide = (num1, num2) => {
        return num1 / num2
    }
    const operate = (op, num1, num2) => {
        return op(num1, num2)
    }
    const evaluateCalc = str => {
        const splitStr = str.split(' ')
        splitStr.pop()
        splitStr[0] = parseFloat(splitStr[0])
        const spliceLocations = {}
        for (let i = 1; i < splitStr.length; i += 2) {
            splitStr[i + 1] = parseFloat(splitStr[i + 1])
            if ('×÷'.includes(splitStr[i])) {
                let answer
                if (splitStr[i] === '×') {
                    answer = operate(multiply, splitStr[i - 1], splitStr[i + 1])
                } else {
                    answer = operate(divide, splitStr[i - 1], splitStr[i + 1])
                }
                spliceLocations[i-1] = answer
            }
        }
        for (const key in spliceLocations) {
            splitStr.splice(parseInt(key), 3, spliceLocations[key])
        }
        let firstOperand = splitStr[0]
        for (let i = 1; i < splitStr.length; i+= 2) {
            if (splitStr[i] === "+") {
                firstOperand = operate(add, firstOperand, splitStr[i+1])
            } else {
                firstOperand = operate(subtract, firstOperand, splitStr[i+1])
            }
        }
        return firstOperand.toString()
    }

    const callback = () => {
        let newAnswer
        if (lgBtn) { 
            if (innerText === "Clear") {
                setAnswer("0")
                setCalc("")
            } else {
                setAnswer(answer.slice(0, answer.length - 1))
            }
        } else if ('1234567890'.includes(innerText)) {
            if (answer === "0" && innerText === "0") return
            else if (answer === "0") setAnswer(innerText)
            else setAnswer(answer + innerText)
        } else if (innerText === '.') {
            if (answer.at(-1) === '.') return
            else if (answer === "") setAnswer("0.")
            else setAnswer(answer + ".")
        } else { // innerText must be '+-*/='
            let newCalc
            if ('÷×−+'.includes(calc.at(-1)) && answer === "") {
                newCalc = calc.slice(0, calc.length - 1) + innerText
            } else if (calc.at(-1) === "=" || calc === "") {
                newCalc = `${answer} ${innerText}`
            } else {
                newCalc = `${calc} ${answer} ${innerText}`
            }
            setCalc(newCalc)
            if (innerText === "=") {
                let getCalcAnswer = evaluateCalc(newCalc)
                if (getCalcAnswer === 'NaN') {
                    setAnswer('0')
                } else {
                    setAnswer(getCalcAnswer)
                }
            } else {
                setAnswer("")
            }
        }
    }
    return (
        <button className={classString} onClick={callback}>{innerText}</button>
    )
}

