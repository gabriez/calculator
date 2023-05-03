import { useState } from "react";
import "../styles/index.css";

const App = () => {
    const [operations, useOperations] = useState(["0"]);
    const [result, setResult] = useState()

    const clear = () => {
        useOperations(["0"])
        setResult()
    }

    const doOperations = (op) => {
        let arrayToOperate = [...op];
        let regexOp = /\+|-|\*|\//;
        let regexStr = /[0-9]/;
        let aritmeticOp;

        if (arrayToOperate.length == 1) {
            return
        }

        if (regexOp.test(arrayToOperate[arrayToOperate.length - 1]) && !regexStr.test(arrayToOperate[arrayToOperate.length - 1])) {
            arrayToOperate.splice(arrayToOperate.length - 1, 1);
        }

        for (let i = 0; i < arrayToOperate.length; i++) {
            if (regexStr.test(arrayToOperate[i]) && regexStr.test(arrayToOperate[i + 2]) && /\/|\*/.test(arrayToOperate[i + 1])) {
                if (arrayToOperate[i + 1] == "/") {
                    aritmeticOp = parseFloat(arrayToOperate[i]) / parseFloat(arrayToOperate[i + 2]);
                    arrayToOperate.splice(i, 3, aritmeticOp);
                }
                if (arrayToOperate[i + 1] == "*") {
                    aritmeticOp = parseFloat(arrayToOperate[i]) * parseFloat(arrayToOperate[i + 2]);
                    arrayToOperate.splice(i, 3, aritmeticOp);
                }
                i--;
            }
        }

        for (let i = 0; i < arrayToOperate.length; i++) {
            console.log(/-|\+/.test(arrayToOperate[i + 1]));
            if (regexStr.test(arrayToOperate[i]) && regexStr.test(arrayToOperate[i + 2]) && /-|\+/.test(arrayToOperate[i + 1])) {
                console.log("showme")
                if (arrayToOperate[i + 1] == "+") {
                    aritmeticOp = parseFloat(arrayToOperate[i]) + parseFloat(arrayToOperate[i + 2]);
                    arrayToOperate.splice(i, 3, aritmeticOp);
                }
                if (arrayToOperate[i + 1] == '-') {

                    aritmeticOp = parseFloat(arrayToOperate[i]) - parseFloat(arrayToOperate[i + 2]);
                    arrayToOperate.splice(i, 3, aritmeticOp);
                }
                i--;
            }
        }
        setResult([...arrayToOperate])
    }

    const addNumbers = (val) => {
        useOperations((current) => {

            let regexStr = /[0-9]|\./;
            let addStr = "";
            let regexOp = /\+|-|\*|\//;
            let arrayLen = current.length;

            if (current[0] == "0" && val != ".") {
                return [val];
            }

            if ((regexStr.test(current[arrayLen - 1]) || /-/.test(current[arrayLen - 1]) && regexOp.test(current[arrayLen - 2]))
                && regexStr.test(val)) {

                if (result) {
                    setResult();
                    return [val]
                }

                if (current[arrayLen - 1].length == 1 && current[arrayLen - 1] == "0" && val != ".") {
                    current[arrayLen - 1] = val;
                    return [...current];
                }

                if (/\./.test(current[arrayLen - 1]) && val == ".") {

                }

                addStr = current[arrayLen - 1] + val;
                current.splice(arrayLen - 1, 1, addStr);
                return [...current];
            }

            if (regexOp.test(current[arrayLen - 1]) && !regexStr.test(val) && !regexStr.test(current[arrayLen - 1])) {
                addStr = val;

                if (/-/.test(val) && !regexOp.test(current[arrayLen - 2])) {
                    return [...current, val];
                }

                if (/\+|\*|\//.test(val) && regexOp.test(current[arrayLen - 2]) && !regexStr.test(current[arrayLen - 1])) {
                    console.log(regexStr.test(current[arrayLen - 1]));
                    current.splice(arrayLen - 2, 2, val);
                    return [...current];
                }

                current.splice(arrayLen - 1, 1, val);
                return [...current];
            }

            if (result) {
                current = [...result]
                setResult();
            }

            return [...current, val];
        })

    }

    return (
        <div className="calculator_container">
            <div id="display">{operations.map((item, index) => (<span key={index}> {item} </span>))}
                {result && (<span>= {result}</span>)}</div>
            <div className="operations_container">
                <button onClick={clear} id="clean" className="buttons_animations">AC
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <button onClick={() => addNumbers('/')} id="divide" className="buttons_animations operators">/
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <div className="numbers_container">
                    <button onClick={() => addNumbers('1')} className="numbers buttons_animations">1
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <button onClick={() => addNumbers('2')} className="numbers buttons_animations">2
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <button onClick={() => addNumbers('3')} className="numbers buttons_animations">3
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <button onClick={() => addNumbers('4')} className="numbers buttons_animations">4
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <button onClick={() => addNumbers('5')} className="numbers buttons_animations">5
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <button onClick={() => addNumbers('6')} className="numbers buttons_animations">6
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <button onClick={() => addNumbers('7')} className="numbers buttons_animations">7
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <button onClick={() => addNumbers('8')} className="numbers buttons_animations">8
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <button onClick={() => addNumbers('9')} className="numbers buttons_animations">9
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <button onClick={() => addNumbers('0')} className="numbers buttons_animations">0
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <button onClick={() => addNumbers('.')} className="numbers buttons_animations">.
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
                <button onClick={() => addNumbers('*')} id="multiply" className="buttons_animations operators">*
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <button onClick={() => addNumbers('+')} id="add" className="buttons_animations operators">+
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <button onClick={() => addNumbers('-')} id="substract" className="buttons_animations operators">-
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <button onClick={() => { doOperations(operations) }} id="equals" className="buttons_animations">=
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </div>
    )
}

export default App; 