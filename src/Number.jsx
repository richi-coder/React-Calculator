export const Number = ({handleEnter}) => {
  const numbers = Array(10).fill(null);
  return (
    <div className="numbers">
      {numbers.map((n, i) => {
        return (
          <button 
          key={i}
          onClick={handleEnter}
          className="number"
          id={numbers.length - i - 1 == 9 ?
          "nine" :
          numbers.length - i - 1 == 8 ?
          "eight" :
          numbers.length - i - 1 == 7 ?
          "seven" :
          numbers.length - i - 1 == 6 ?
          "six" :
          numbers.length - i - 1 == 5 ?
          "five" :
          numbers.length - i - 1 == 4 ?
          "four" :
          numbers.length - i - 1 == 3 ?
          "three" :
          numbers.length - i - 1 == 2 ?
          "two" :
          numbers.length - i - 1 == 1 ?
          "one" : "zero"
          }
          value={numbers.length - i - 1}
          >
            {numbers.length - i - 1}
          </button>
        );
      })}
      <button
      className="number"
      onClick={handleEnter}
      value="."
      >.</button>
    </div>
  );
};