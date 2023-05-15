import './style.css';
import { useRef, useState } from 'react';
import { Number } from "./Number"
import { Message } from "./Message"
import { Display } from "./Display"
import { calculation } from './calculation';


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
    disabled={(operator == "delete" && memory == "") ? true : false}
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

  // const [calcState, setCalcState] = useState({
  //   memory: '',
  //   actual: 0,
  // })

  function handleEnter(e) { // For numbers and point
    const { target } = e;
    // Avoid entering multiple zeros at first
    if (/^0{2,}/.test(displayRef.current.innerHTML + target.value)) {
      // setCalcState({
      //   ...calcState,
      //   memory: 0
      // })
      memoryRef.current.innerHTML = 0;
      return
    }
    // Avoiding multiple points
    if (/\.\d+\./g.test(memoryRef.current.innerHTML + target.value) || memoryRef.current.innerHTML[memoryRef.current.innerHTML.length - 1] === '.' && target.value === '.') return

    // If equals symbol is present in the memory expression
    if (/=/.test(memoryRef.current.innerHTML)) {
      return
    }
    
    // If memory is empty (I mean, if there is a zero only)
    if (displayRef.current.innerHTML === 0){
      // setCalcState({
      //   actual: target.value,
      //   memory: target.value
      // })
      displayRef.current.innerHTML = target.value;
      memoryRef.current.innerHTML = target.value;
    } else {
      // setCalcState({
      //   memory: calcState.memory + target.value,
      //   actual: /\+$|\-$|\*$|\/$/.test(calcState.actual) ? target.value : calcState.actual + target.value,
      // })
      memoryRef.current.innerHTML = memoryRef.current.innerHTML + target.value;
      displayRef.current.innerHTML = /\+$|\-$|\*$|\/$/.test(displayRef.current.innerHTML) ? target.value : displayRef.current.innerHTML + target.value

    }
  }


  function operator(o) {
  
    // If = in the expression when entering operator, substitutes equales by the operator to continue calc
    if (/=/.test(memoryRef.current.innerHTML)) {
      // setCalcState({
      //   memory: calcState.memory.match(/-{0,}\d+$|-{0,}\d+\.\d+$/)[0] + o,
      //   actual: o
      // })
      memoryRef.current.innerHTML = memory.current.innerHTML.match(/-{0,}\d+$|-{0,}\d+\.\d+$/)[0] + o;
      displayRef.current.innerHTML = o
      return
    };
    if (memoryRef.current.innerHTML == '' && o == "-") {
      // setCalcState({
      //   memory: '-',
      //   actual: o
      // })
      memoryRef.current.innerHTML = '-';
      displayRef.current.innerHTML = o;
      return
    }
    // If entering - after + - x or / ALLOW
    if (o == '-' && (memoryRef.current.innerHTML[memoryRef.current.innerHTML.length - 1] === '+' || memoryRef.current.innerHTML[memoryRef.current.innerHTML.length - 1] === '*' || memoryRef.current.innerHTML[memoryRef.current.innerHTML.length - 1] === '/')) {
      // setCalcState({
      //   memory: calcState.memory + o,
      //   actual: o
      // })
      memoryRef.current.innerHTML = memoryRef.current.innerHTML + o;
      displayRef.current.innerHTML = o;
      return
    }
    // Avoid entering the same symbol
    if (o === memoryRef.current.innerHTML[memoryRef.current.innerHTML.length - 1]) {
      return
    }
    if (/\D{2,}$/.test(memoryRef.current.innerHTML + o)) {
      let memoryString = memoryRef.current.innerHTML + o
      let value = memoryString.replace(memoryString.match(/\D{2,}$/), o)
      // setCalcState({
      //   memory: value,
      //   actual: o
      // })
      memoryRef.current.innerHTML = value;
      displayRef.current.innerHTML = o;
      return
    }

    // setCalcState({
    //   memory: calcState.memory + o,
    //   actual: o
    // })
    memoryRef.current.innerHTML = memoryRef.current.innerHTML + o;
    displayRef.current.innerHTML = o;

  }
  
  function reset() {
    // setCalcState({
    //   actual: 0,
    //   memory: ''
    // })
    memoryRef.current.innerHTML = '';
    displayRef.current.innerHTML = 0;
  }
 
  function resetMemory() {
    // If there is no equals at memory DISPLAY
    if (!/=/.test(memoryRef.current.innerHTML)) {
      const resultantExpression = calculation(memoryRef.current.innerHTML+'=');
      // Checking output expression
      if (/INFINITY/.test(resultantExpression)) {
        // setCalcState({
        //   memory: resultantExpression,
        //   actual: 'INFINITY',
        // })
        memoryRef.current.innerHTML = resultantExpression;
        displayRef.current.innerHTML = 'INFINITY';
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
      
      <Display memoryRef={memoryRef} displayRef={displayRef} />
      <div className="display-message">
        <div id="myId">Richi Coder</div>
      <Message />
      </div>
      <br />
      <div className="buttons">
      <Number handleEnter={handleEnter} />
      <div className="operators">
        <Operator operator={"delete"} operation={operator} />
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

