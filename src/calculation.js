export function calculation(memory) {
  const lastChar = memory[memory.length - 1];
  const beforeLastChar = memory[memory.length - 2];
  
  let initialExpression = memory;
  let str = memory;
  // Take off end symbols
  if (/\D+$/.test(str)) {
    str = str.replace(/\D+$/,'')
  }
  // Avoid division by zero
  if (/\/0/.test(str)) {
    return initialExpression + '= INFINITY'
  }
  console.log('initial', str);
//******************/
  const howManyDivs = str.match(/(\/)/g) // Counting division symbols
  const howManyMult = str.match(/(\*)/g) // Counting multiplication symbols
  let division = 1;
  let multiplication = 1;
  let whichDiv = [];
  let whichMult = [];
  // BEFORE DIVISIONS, DIVIDING BY ZERO
  // DIVISIONS
  if (howManyDivs !== null) {
      for (let i = 0; i < howManyDivs.length; i++) { // for executes and go solving divisions
          whichDiv = str.match(/[\-|\+]{0,1}\d+(\.\d+)?\/-{0,}\d+(\.\d+)?/)[0].split("/")
          division = (parseFloat(whichDiv[0])/parseFloat(whichDiv[1])).toString();
          str = str.replace(whichDiv.join("/"), /^-/.test(division) ? division : '+' + division)
          str = str.replace('*+', '*')
      }
  } /* console.log('afterDiv', str); */
  // MULTIPLICATIONS
  if (howManyMult !== null) {
      for (let i = 0; i < howManyMult.length; i++) { // for executes and go solving multiplications
          whichMult = str.match(/[\-|\+]{0,1}\d+(\.\d+)?\*-{0,}\d+(\.\d+)?/)[0].split("*");
          multiplication = (parseFloat(whichMult[0])*parseFloat(whichMult[1])).toString();
          str = str.replace(whichMult.join("*"), /^-/.test(multiplication) ? multiplication : '+' + multiplication);
      }
  } console.log('afterMULT', str);
  // TOTAL SUM
            str = str.match(/([\+|\-]{0,1}\d+\.\d+|[\+|\-]{0,1}\d+)/g)
                            .map(x => parseFloat(x))
                            .reduce((e,acum) => e + acum, 0)
                            .toFixed(10);
        // }
const result = /\.0{10}$/.test(str) ? parseInt(str.toString()) : /0+$/.test(str) ? str.replace(/0+$/,'') : str;
 
console.log('FINAAL', result, initialExpression + result);
  //----------------------------
    
    return initialExpression + result;
  }