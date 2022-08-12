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
        let counter = 0
        while (counter < splitStr.length) {
            if ('−+'.includes(splitStr[counter])) {
                splitStr[counter + 1] = parseFloat(splitStr[counter + 1])
                counter++
            } else if ('×÷'.includes(splitStr[counter])) {
                splitStr[counter + 1] = parseFloat(splitStr[counter + 1])
                let op = splitStr[counter] === '×' ? multiply : divide
                let answer = operate(op, splitStr[counter - 1], splitStr[counter + 1])
                splitStr.splice(counter - 1, 3, answer)
            } else { // value is a number
                counter++
            }
        }
        let firstOperand = splitStr[0]
        for (let i = 1; i < splitStr.length; i += 2) {
            let op = splitStr[i] === '+' ? add : subtract
            firstOperand = operate(op, firstOperand, splitStr[i + 1])
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

