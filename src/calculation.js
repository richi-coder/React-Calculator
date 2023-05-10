export function calculation(memory) {
  const lastChar = memory[memory.length - 1];
  const beforeLastChar = memory[memory.length - 2];
  const lastTwo = beforeLastChar + lastChar;
  
    
    // Empty display when last char is an operator
    if (lastChar == "*" || lastChar == "/" || lastChar == "+" || lastChar == "-" ||  memory.length == 1) return '';
  let initialExpression = memory.join('');
  let str =  memory.join("");
  console.log('initial', str);
  // Depuration
      // Modify operator when
      if (/=\+/.test(beforeLastChar)) {
        // let change = str.match(/=\D/)
        str.replace(/=\D/, '+')
      }
      // Checking continuity
      if (/=\+/.test(str)) {
        str = str.replace(/=\+/, '+')
        console.log('igualMAAAS');
      }
      // Checking double .
      if (/\.{2,}/.test(str)) {
        str = str.replace(/\.{2,}/, '.')
      }
      // Checking if there are x+ or x/
      if (/\*\+|\*\/|-\+|-\*|-\//.test(str)) {
        let change = str.match(/\*\+|\*\//g)
        console.log(change, 'change');
        // Should check into for for many cases
        let finalOperator = change[0][change[0].length - 1]
        str = str.replace(/\*\+|\*\/|-\+|-\*|-\//,finalOperator)
        // for end
        console.log('pueppp', str, finalOperator);
      }
      


//******************/
  const howManyDivs = str.match(/(\/)/g) // solo cuantos simbolos hay: 5
  const howManyMult = str.match(/(\*)/g) // solo cuantos simbolos hay: 5
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
          str = str.replace(whichDiv.join("/"), /^-/.test(division) ? division : '+' + division);
      }
  } console.log('afterDiv', str);
  // MULTIPLICATIONS
  if (howManyMult !== null) {
      for (let i = 0; i < howManyMult.length; i++) { // for executes and go solving multiplications
          whichMult = str.match(/-{0,}\d+(\.\d+)?(\*)-{0,}\d+(\.\d+)?/)[0].split("*");
          multiplication = (parseFloat(whichMult[0])*parseFloat(whichMult[1])).toString();
          str = str.replace(whichMult.join("*"),multiplication);
          
      }
  } console.log('afterMULT', str);
  // TOTAL SUM
            str = str.match(/([\+|\-]{0,1}\d+\.\d+|[\+|\-]{0,1}\d+)/g)
                            .map(x => parseFloat(x))
                            .reduce((e,acum) => e + acum, 0)
                            .toFixed(4);
        // }
const result = /\.0{4}$/.test(str) ? parseInt(str.toString()) : /0+$/.test(str) ? str.replace(/0+$/,'') : str;
 
console.log('final', str, result);
  //----------------------------
    
    return initialExpression + '=' + result;
  }