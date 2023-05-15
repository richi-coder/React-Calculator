import './style.css';
import { useRef, useState } from 'react';
import { Number } from "./Number"
import { Message } from "./Message"
import { Display } from "./Display"
import { calculation } from './calculation';

let test = 'saludo'


const Equals = ({resetMemory}) => {
  return <button
  id='equals'
  className="equals-button"
  value='='
  onClick={resetMemory}>=</button>
};

const Reset = ({reset}) => {
  return (
    <button
    className="reset-button"
    id='clear'
    onClick={reset}>AC</button>
  )
}

const Operator = ({operator,operation,memory}) => {
  return (
    <button
    disabled={(operator == "delete" && memory == [""]) ? true : false}
    style={{backgroundColor: operator == "delete" ? "transparent" : "rgba(50, 52, 53, 0.75)"}}
    className="operator"
    id={operator === '+' ? 'add' : operator === '-' ? 'subtract' : operator === '/' ? 'divide' : operator === '*' ? 'multiply' : operator}
    onClick={() => {
      operation(operator);
      }}>
      {operator == "delete" ?
      <i className="fa-solid fa-delete-left"></i> :
      operator == "/" ? 
      "÷" :
      operator}
    </button>
  )
}

export default function App() {
  const memoryRef = useRef();
  const displayRef = useRef();

  const [calcState, setCalcState] = useState({
    memory: '',
    actual: 0,
  })

  function handleEnter(e) { // For numbers and point
    
    const { target } = e;
    // Avoid entering multiple zeros at first
    if (/^0{2,}/.test(calcState.actual + target.value)) {
      setCalcState({
        ...calcState,
        memory: 0
      })
      return
    }
    // Avoiding multiple points
    if (/\.\d+\./g.test(calcState.memory + target.value) || calcState.memory[calcState.memory.length - 1] === '.' && target.value === '.') return

    // If equals symbols present in the memory expression
    if (/=/.test(calcState.memory)) {
      return
    }
    
    // If memory is empty (I mean, if there is a zero only)
    if (calcState.actual === 0){
      setCalcState({
        actual: target.value,
        memory: target.value
      })
    } else {
      setCalcState({
        memory: calcState.memory + target.value,
        actual: /\+$|\-$|\*$|\/$/.test(calcState.actual) ? target.value : calcState.actual + target.value,
      })
    }
  }


  function operator(o) {
  
    // If = in the expression when entering operator, substitutes equales by the operator to continue calc
    if (/=/.test(calcState.memory)) {
      setCalcState({
        memory: calcState.memory.match(/-{0,}\d+$|-{0,}\d+\.\d+$/)[0] + o,
        actual: o
      })
      return
    };
    if (calcState.memory == '' && o == "-") {
      setCalcState({
        memory: '-',
        actual: o
      })
      return
    }
    // If entering - after + - x or / ALLOW
    if (o == '-' && (calcState.memory[calcState.memory.length - 1] === '+' || calcState.memory[calcState.memory.length - 1] === '*' || calcState.memory[calcState.memory.length - 1] === '/')) {
      setCalcState({
        memory: calcState.memory + o,
        actual: o
      })
      return
    }
    // Avoid entering the same symbol
    if (o === calcState.memory[calcState.memory.length - 1]) {
      return
    }
    if (/\D{2,}$/.test(calcState.memory + o)) {
      let memoryString = calcState.memory + o
      let value = memoryString.replace(memoryString.match(/\D{2,}$/), o)
      setCalcState({
        memory: value,
        actual: o
      })
      return
    }

    setCalcState({
      memory: calcState.memory + o,
      actual: o
    })

  }
  
  function reset() {
    setCalcState({
      actual: 0,
      memory: ''
    })
  }
 
  function resetMemory() {
    // If there is no equals at memory DISPLAY
    if (!/=/.test(calcState.memory)) {
      const resultantExpression = calculation(calcState.memory+'=');
      test = 'resultantExpression'
      // Checking output expression
      if (/INFINITY/.test(resultantExpression)) {
        setCalcState({
          memory: resultantExpression,
          actual: 'INFINITY',
        })
      } else {
        // setCalcState({
        //   memory: resultantExpression,
        //   actual: resultantExpression.match(/-{0,}\d+$|-{0,}\d+\.\d+$/)[0],
        // })
        memoryRef.current.innerHTML = resultantExpression;
        displayRef.current.innerHTML = resultantExpression.match(/-{0,}\d+$|-{0,}\d+\.\d+$/)[0];
      }
    }
  }

  return (
    <div className="calculator">
      
      <Display memory={calcState.memory} actual={calcState.actual} memoryRef={memoryRef} displayRef={displayRef} test={test} />
      <div className="display-message">
        <div id="myId">Richi Coder</div>
      <Message />
      </div>
      <br />
      <div className="buttons">
      <Number handleEnter={handleEnter} />
      <div className="operators">
        <Operator operator={"delete"} operation={operator} memory={calcState.memory}/>
        <Operator operator={"/"} operation={operator} />
        <Operator operator={"*"} operation={operator} />
        <Operator operator={"-"} operation={operator} />
        <Operator operator={"+"} operation={operator} />
      </div>
      <div className="c-equals">
      <Reset reset={reset} />
      <Equals resetMemory={resetMemory} />
      </div>
      </div>
      <br />
    </div>
  );
}

//5-8+13-(5*(48515/71)*47)+(5/2) = -160565.317 TRUE, funciona perfecto!

// 2 + 3 * 2 = a: 10 false b: 8 true

// Dividir por cero
//5-8+13-(5*(48515/0)*47)+(5/0)

//2+3/2-6/3 = 1.5 OK, YA PUEDO SUMAR, RESTAR, MULTIPLICAR Y DIVIDIR OK

