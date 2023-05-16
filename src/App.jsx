
import { useRef, useState } from 'react';
import { Number } from "./Number"
import { Display } from "./Display"
import { calculation } from './calculation';
import { Equals } from './Equals';
import { Reset } from './Reset';
import { Operator } from './Operator';

export default function App() {
  const memoryRef = useRef();
  const displayRef = useRef();

  function handleEnter(e) { // For numbers and point
    const { target } = e;
    // Maximum input length
    if ((displayRef.current.innerHTML + e.target.value).length >= 9) {
      return
    }
    // Avoid entering multiple zeros at first
    if (/^0{2,}/.test(displayRef.current.innerHTML + target.value)) {
      memoryRef.current.innerHTML = 0;
      return
    }
    // Avoiding multiple points
    if (/\.\d+\./g.test(memoryRef.current.innerHTML + target.value) || memoryRef.current.innerHTML[memoryRef.current.innerHTML.length - 1] === '.' && target.value === '.') {
      return
    } else if (e.target.value === '.') {
      displayRef.current.innerHTML+= '.';
      memoryRef.current.innerHTML+= '.';
      return
    }

    // If equals symbol is present in the memory expression
    if (/=/.test(memoryRef.current.innerHTML)) {
      return
    }
    
    // If memory is empty (I mean, if there is a zero only)
    if (displayRef.current.innerHTML === '0'){
      displayRef.current.innerHTML = target.value;
      memoryRef.current.innerHTML = target.value;
    } else {
      memoryRef.current.innerHTML = memoryRef.current.innerHTML + target.value;
      displayRef.current.innerHTML = /\+$|\-$|\*$|\/$/.test(displayRef.current.innerHTML) ? target.value : displayRef.current.innerHTML + target.value

    }
    memoryRef.current.scrollTo({
      behavior: 'smooth',
      left: 1000
    })
  }

  function operator(o) {
    // Case delete operator
    if (o === 'delete') {
      // Case only 1 char at display and memory having only ''
      if (displayRef.current.innerHTML.length === 1 && memoryRef.current.innerHTML == '' || memoryRef.current.innerHTML.length === 1) {
        displayRef.current.innerHTML = 0;
        memoryRef.current.innerHTML = '';
      } else { // Case length more than 1
        memoryRef.current.innerHTML = memoryRef.current.innerHTML.slice(0, memoryRef.current.innerHTML.length - 1)
        if (!/\D/.test(displayRef.current.innerHTML)) {
          displayRef.current.innerHTML = displayRef.current.innerHTML.slice(0, displayRef.current.innerHTML.length - 1)
        } else {
          displayRef.current.innerHTML = memoryRef.current.innerHTML;
        }
      }
      return
    }
  
    // If = in the expression when entering operator, substitutes equales by the operator to continue calc
    if (/=/.test(memoryRef.current.innerHTML)) {
      memoryRef.current.innerHTML = memoryRef.current.innerHTML.match(/-{0,}\d+$|-{0,}\d+\.\d+$/)[0] + o;
      displayRef.current.innerHTML = o
      return
    };
    if (memoryRef.current.innerHTML == '' && o == "-") {
      memoryRef.current.innerHTML = '-';
      displayRef.current.innerHTML = o;
      return
    }
    // If entering - after + - x or / ALLOW
    if (o == '-' && (memoryRef.current.innerHTML[memoryRef.current.innerHTML.length - 1] === '+' || memoryRef.current.innerHTML[memoryRef.current.innerHTML.length - 1] === '*' || memoryRef.current.innerHTML[memoryRef.current.innerHTML.length - 1] === '/')) {
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
      memoryRef.current.innerHTML = value;
      displayRef.current.innerHTML = o;
      return
    }

    memoryRef.current.innerHTML = memoryRef.current.innerHTML + o;
    displayRef.current.innerHTML = o;
  }
  
  function reset() {
    memoryRef.current.innerHTML = '';
    displayRef.current.innerHTML = 0;
  }
 
  function resetMemory() {
    // If there is no equals at memory DISPLAY
    if (!/=/.test(memoryRef.current.innerHTML)) {
      const resultantExpression = calculation(memoryRef.current.innerHTML+'=');

      // Checking output expression
      
      // Infinity case (division by zero)
      if (/INFINITY/.test(resultantExpression)) {
        memoryRef.current.innerHTML = resultantExpression;
        displayRef.current.innerHTML = 'INFINITY';
      } else { // Normal case
        memoryRef.current.innerHTML = resultantExpression;
        displayRef.current.innerHTML = resultantExpression.match(/-{0,}\d+$|-{0,}\d+\.\d+$/)[0];
      }
    }
    memoryRef.current.scrollTo({
      behavior: 'smooth',
      left: 1000
    })
  }

  return (
    <div className="calculator">
      <Display memoryRef={memoryRef} displayRef={displayRef} />
      <div className="display-message">
        <div id="myId" style={{marginLeft: '10px'}}>Richi Coder</div>
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