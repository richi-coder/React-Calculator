import React from 'react';
import './style.css';
import { useState, useEffect } from 'react';
import { Display } from "./Display.js"
import { Number } from "./Number.js"
import { Message } from "./Message.js"


const Equals = ({resetMemory}) => {
  return <button
  className="equals-button"
  onClick={resetMemory}>=</button>
};

const Reset = ({reset}) => {
  return (
    <button
    className="reset-button"
    onClick={reset}>C</button>
  )
}

const Operator = ({operator,operation,memory}) => {
  return (
    <button
    disabled={(operator == "delete" && memory == [""]) ? true : false}
    style={{backgroundColor: operator == "delete" ? "transparent" : "rgba(50, 52, 53, 0.75)"}}
    className="operator"
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
  const [memory, setMemory] = useState([""] || actual);
  const [actual, setActual] = useState("");
  const [zero, setZero] = useState(false);
  const [displayState, setDisplayState] = useState(false);

  useEffect(() => {
    setDisplayState(false);
    setZero(false);
    if (/\/0/g.test(memory.join(""))) {
      setZero(true);
    } else {
      setActual(calculation(memory,displayState));
    }
  }, [memory]);

  function handleEnter(e) {
    const { target } = e;

    if (memory[0] == 0 || memory[0] == "-"){
      setMemory([parseInt(target.value)])
    } else if (displayState) {
      setMemory([...actual,parseInt(target.value)]);
      setDisplayState(false);
    } else {
      setMemory([...memory,parseInt(target.value)])
    }
  }


  function operator(o) {
    if (displayState) {
      setMemory([...actual],)
    }
    if (o == "delete" && memory.length > 1) {
      setMemory(memory.slice(0,memory.length - 1));
    } else if (o == "delete" && memory.length == 1) {
      setMemory([""]);
    }
    
    if (memory[0] === "" && o == "-") {
      setMemory([...memory,o])
    }
    if (typeof memory[memory.length - 1] == "number" && o != "delete") {
      setMemory([...memory,o])
    } else if (typeof memory[memory.length - 1] != "number" && o != "delete") {
      const copy = memory.slice(0,memory.length - 1);
      setMemory([...copy,o])
    }
    // Prevents entering operator symbols many times
  }
  function reset() {
    setActual("");
    setMemory([""]);
  }
 
  function resetMemory() {
    setDisplayState(true);
  }

  return (
    <div className="calculator">
      <Display memory={memory} actual={actual} displayState={displayState} />
      <div className="display-message">
      <Message zero={zero}/>
      </div>
      <br />
      <div className="buttons">
      <Number handleEnter={handleEnter} />
      <div className="operators">
        <Operator operator={"delete"} operation={operator} memory={memory}/>
        <Operator operator={"/"} operation={operator} />
        <Operator operator={"x"} operation={operator} />
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

function calculation(memory) {
  if (typeof memory[memory.length - 1] == "string" || memory.length == 1) return "";
let str = "+" + memory.join("");
//let str = "100/2/2/5/5+2+6/3+8x2-4x2x5+100/2"
const howManyDivs = str.match(/(\/)/g) // solo cuantos simbolos hay: 5
const howManyMult = str.match(/(x)/g) // solo cuantos simbolos hay: 5
let division = 1;
let multiplication = 1;
let whichDiv = [];
let whichMult = [];
// BEFORE DIVISIONS, DIVIDING BY ZERO
// DIVISIONS
if (howManyDivs !== null) {
for (let i = 0; i < howManyDivs.length; i++) {
    whichDiv = str.match(/\d+(\.\d+)?(\/)\d+(\.\d+)?/)[0].split("/")
    division = (parseFloat(whichDiv[0])/parseFloat(whichDiv[1])).toString();
    str = str.replace(whichDiv.join("/"),division);
}
}
// MULTIPLICATIONS
if (howManyMult !== null) {
for (let i = 0; i < howManyMult.length; i++) {
    whichMult = str.match(/\d+(\.\d+)?(x)\d+(\.\d+)?/)[0].split("x");
    multiplication = (parseFloat(whichMult[0])*parseFloat(whichMult[1])).toString();
    str = str.replace(whichMult.join("x"),multiplication);
}
}
// TOTAL SUM
const result = str.match(/\D+\d+(\.\d+)?/g)
                    .map(x => parseFloat(x))
                    .reduce((e,acum) => e + acum, 0)
                    .toFixed(3);
//----------------------------
  
  return /\.0{3}/.test(result) ? parseInt(result.toString()) : result;
}

//5-8+13-(5*(48515/71)*47)+(5/2) = -160565.317 TRUE, funciona perfecto!

// 2 + 3 * 2 = a: 10 false b: 8 true

// Dividir por cero
//5-8+13-(5*(48515/0)*47)+(5/0)

//2+3/2-6/3 = 1.5 OK, YA PUEDO SUMAR, RESTAR, MULTIPLICAR Y DIVIDIR OK

