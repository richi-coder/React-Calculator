import './style.css';
import { useState, useEffect, memo } from 'react';
import { Display } from "./Display"
import { Number } from "./Number"
import { Message } from "./Message"
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
    onClick={reset}>C</button>
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
  const [memory, setMemory] = useState(["0"]);
  const [actual, setActual] = useState("");
  const [zero, setZero] = useState(false);
  const [displayState, setDisplayState] = useState(false);

  useEffect(() => {
    setDisplayState(false);
    setZero(false);
    //console.log(/\/0/g.test(memory.join("")), 'test');

    // if (/\/0/g.test(memory.join(""))) {
    //   setZero(true);
    // } else if (memory[0] === ''){
    //   setMemory([0])
    // }
    // else {
    //   setActual(calculation(memory));
    // }
  }, [memory]);

  function handleEnter(e) { // For numbers and point
    const { target } = e;
    // Avoiding multiple points
    if (/\.\d+\./g.test(memory.join('') + target.value) || memory[memory.length - 1] === '.' && target.value === '.') return
    // 
    if (/\+$|\-$|\*$|\/$/.test(actual)) {
      setActual(target.value)
    } else {
      setActual(actual + target.value)
    }
    
    const newValue = target.value == "." ? "." : parseInt(target.value);
    
    // If memory is empty (I mean, if there is a zero only)
    if (memory[0] == '0' && memory.length == 1){
      setMemory([newValue])
    } else if (displayState) {
      setMemory([actual,newValue]);
      setDisplayState(false);
    } else {
      setMemory([...memory,newValue])
    }
  }


  function operator(o) {
    setActual(o)
    // If = in the expression when entering operator, substitutes equales by the operator to continue calc
    if (/=/.test(memory[0])) {
      setMemory([...memory[0].match(/-{0,}\d+$|-{0,}\d+\.\d+$/)[0], o])
      return
    };
    // Normal delete when length is more than 1
    if (o == "delete" && memory.length > 1) {
      setMemory(memory.slice(0,memory.length - 1));
      return
    } 
    // Delete and put to 0 when length is 1
    if (o == "delete" && memory.length == 1) {
      setMemory([0]);
      return
    }
    // Start expression with minus operator
    if (memory[0] == '0' && memory.length === 1 && o == "-") {
      setMemory(['-'])
      return
    }
    if (displayState) {
      setMemory([actual,o])
      setDisplayState(true);
    } else {
          // If entering - after + - or /
          if (memory[memory.length - 1] != 'number' && memory[memory.length - 1] != '-' && o == '-') {
            setMemory([...memory, o])
            return
          }

          // If entering + x - / after number, it does it
          if (typeof memory[memory.length - 1] == "number" && o != "delete") {
            setMemory([...memory,o])
            // else if entering + x - / after non number, just changes the last operator
          } else if (typeof memory[memory.length - 1] != "number" && o != "delete") {
            const copy = memory.slice(0,memory.length - 1);
            setMemory([...copy,o])
          }
    }
    // Prevents entering operator symbols many times
  }
  
  function reset() {
    setActual('');
    setMemory([0]);
  }
 
  function resetMemory() {
    if (!/=/.test(memory.join(''))) {
      setMemory([calculation(memory)])
      setActual(calculation(memory).match(/-{0,}\d+$|-{0,}\d+\.\d+$/)[0], 'ACCT')
      setDisplayState(true);
    }
  }

  return (
    <div className="calculator">
      
      <Display memory={memory} actual={actual} displayState={displayState} />
      <div className="display-message">
        <div id="myId">Richi Coder</div>
      <Message zero={zero}/>
      </div>
      <br />
      <div className="buttons">
      <Number handleEnter={handleEnter} />
      <div className="operators">
        <Operator operator={"delete"} operation={operator} memory={memory}/>
        <Operator operator={"/"} operation={operator} />
        <Operator operator={"*"} operation={operator} />
        <Operator operator={"-"} operation={operator} />
        <Operator operator={"+"} operation={operator} />
      </div>
      <div className="c-equals">
      <Reset reset={reset} />
      <Equals memory={memory} resetMemory={resetMemory} displayState={displayState} />
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

