export const Operator = ({operator,operation,memory}) => {
    return (
      <button
      disabled={(operator == "delete" && memory == "") ? true : false}
      className={operator === 'delete' ? 'delete' : 'operator'}
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