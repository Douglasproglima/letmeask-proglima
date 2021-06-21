import { useState } from "react";

export function CounterButton() {
  
  const [counter, setCounter] = useState(0);

  const increment = () => {
    setCounter(counter + 1);
  }

  //Clousure
  console.log(counter);

  return (
    <>
      <button onClick={increment}>{ counter }</button>
    </>
  );
}