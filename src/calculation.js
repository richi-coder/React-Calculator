export function calculation(memory) {
    if (typeof memory[memory.length - 1] == "string" || memory.length == 1) return '';
  let str =  memory.join("");
  console.log('initial', str);
  // Depuration
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
          whichDiv = str.match(/-{0,}\d+(\.\d+)?(\/)-{0,}\d+(\.\d+)?/)[0].split("/")
          division = (parseFloat(whichDiv[0])/parseFloat(whichDiv[1])).toString();
          str = str.replace(whichDiv.join("/"),division);
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
        let result;
        // if (/^-\d+$/.test(str)) {
        //     result = str
        // } 
        // else {
            console.log('pilas');
            result = str.match(/([\+|\-]{0,1}\d+\.\d+|[\+|\-]{0,1}\d+)/g)
                            .map(x => parseFloat(x))
                            .reduce((e,acum) => e + acum, 0)
                            .toFixed(4);
        // }
  
 
console.log('final', result);
  //----------------------------
    
    return /\.0{4}$/.test(result) ? parseInt(result.toString()) : /0+$/.test(result) ? result.replace(/0+$/,'') : result;
  }