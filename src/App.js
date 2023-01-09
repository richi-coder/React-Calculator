import React from 'react';
import './style.css';
import { useState, useEffect } from 'react';
import { Display } from "./Display.js"
import { Number } from "./Number.js"
import { Message } from "./Message.js"


const Equals = ({memory}) => {
  return <button
  className="equals-button"
  onClick={() => calculation(memory)}>=</button>
};

const Reset = ({reset}) => {
  return (
    <button
    className="reset-button"
    onClick={reset}>C</button>
  )
}

const Operator = ({operator,resetActual,operation}) => {
  return (
    <button
    style={{backgroundColor: operator == "delete" ? "transparent" : "rgba(50, 52, 53, 0.75)"}}
    className="operator"
    onClick={() => {
      operation(operator);
      resetActual;
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
  const [memory, setMemory] = useState([""]);
  const [actual, setActual] = useState("");
  const [zero, setZero] = useState(false);
  useEffect(() => {
    setZero(false);
    if (/\/0/g.test(memory.join(""))) {
      setZero(true);
    } else {
      setActual(calculation(memory));
    }
  }, [memory]);

  function handleEnter(e) {
    const { target } = e;
    /*
    if (actual == 0) {
      setActual(e.target.value.toString())
    } else {
      setActual(actual + e.target.value.toString());
    }*/
    if (memory[0] == 0 || memory[0] == "-"){
      setMemory([parseInt(target.value)])
    } else {
      setMemory([...memory,parseInt(target.value)])
    }
  }


  function operator(o) {
    if (o == "delete") {
      setMemory(memory.slice(0,memory.length - 1));
    } 
    
    if (memory[0] === "" && o == "-") {
      setMemory([...memory,o])
    }
    if (typeof memory[memory.length - 1] == "number" && o != "delete") {
      setMemory([...memory,o])
    } else if (typeof memory[memory.length - 1] != "number") {
      const copy = memory.slice(0,memory.length - 1);
      setMemory([...copy,o])
    }
    // Prevents entering operator symbols many times
  }
  function reset() {
    setActual("");
    setMemory([""]);
  }
  function resetActual() {
    setActual("");
  }
  return (
    <div className="calculator">
      <Display memory={memory} actual={actual}/>
      <div>
      <Message zero={zero}/>
      </div>
      <br />
      <div className="buttons">
      <Number handleEnter={handleEnter} />
      <div className="operators">
        <Operator operator={"delete"} operation={operator} resetActual={resetActual} />
        <Operator operator={"/"} operation={operator} resetActual={resetActual} />
        <Operator operator={"x"} operation={operator} resetActual={resetActual} />
        <Operator operator={"-"} operation={operator} resetActual={resetActual} />
        <Operator operator={"+"} operation={operator} resetActual={resetActual} />
      </div>
      <div className="c-equals">
      <Reset reset={reset}/>
      <Equals memory={memory} />
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
  //if (/\/0/g.test(str)) setMemory("hi")
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
  
  return result
}
//5-8+13-(5*(48515/71)*47)+(5/2) = -160565.317 TRUE, funciona perfecto!

// 2 + 3 * 2 = a: 10 false b: 8 true

// Dividir por cero
//5-8+13-(5*(48515/0)*47)+(5/0)

//2+3/2-6/3 = 1.5 OK, YA PUEDO SUMAR, RESTAR, MULTIPLICAR Y DIVIDIR OK

