import { useState } from "react";
import Numbers from "./components/Numbers";
import { evaluate } from "mathjs";
import ELEMENT from "./utils/elements";

function App() {
  const [result, setResult] = useState("");
  const [currentNumber, setCurrentNumber] = useState(0);
  const [expression, setExpression] = useState("");

  const setDataBoard = (value) => {
    switch (value) {
      case "AC":
        reset();
        break;
      case "+/-":
        setCurrentNumber(
          (currentValue) =>
            Number(`${currentValue === 0 ? "" : currentValue}`) * -1
        );
        setExpression(
          (currentExpression) =>
            Number(`${currentExpression === 0 ? "" : currentExpression}`) * -1
        );
        break;
      case ".":
        if (currentNumber === 0) return;
        if (currentNumber.toString().indexOf(".") > 0) break;
        if (currentNumber.toString().length === 1 && currentNumber === 0) {
          setCurrentNumber(`0.`);
          setExpression(0);
          break;
        } else {
          setCurrentNumber(
            (currentValue) => `${currentValue === 0 ? "" : currentValue}.`
          );
          setExpression(
            (currentExpression) =>
              `${currentExpression === 0 ? "" : currentExpression}.`
          );
        }
        break;
      case "%":
        setCurrentNumber((currentValue) => {
          let newValue = `${currentValue === 0 ? "" : currentValue}`;
          return Number(newValue) / 100;
        });
        setExpression((currentExpression) => {
          let newValue = `${currentExpression === 0 ? "" : currentExpression}`;
          return Number(newValue) / 100;
        });
        break;
      default:
        setCurrentNumber(
          (currentValue) => `${currentValue === 0 ? "" : currentValue}${value}`
        );
        setExpression(
          (currentExpression) =>
            `${currentExpression === 0 ? "" : currentExpression}${value}`
        );
        break;
    }
  };

  const handleSign = (sign) => {
    if (sign === "x") sign = "*";
    if (sign === "÷") sign = "/";
    if (sign === "%") return;
    setExpression(
      (currentExpression) =>
        `${currentExpression === 0 ? "" : currentExpression}` + sign
    );
  };

  const reset = () => {
    setCurrentNumber(0);
    setResult("");
    setExpression("");
  };

  const calculateResult = () => {
    try {
      setResult(evaluate(expression));
    } catch (error) {
      reset();
    }
  };

  const handleOparation = (value) => {
    if(value.element === "="){
      if(Number(currentNumber) === 0) return;
      calculateResult()
    }
    else{
      if(value.operator) {
        calculateResult();
          handleSign(value.element);
          setCurrentNumber(0);
      }
      else{
        setResult("");
        setDataBoard(value.element)
      }
    }
  };

  return (
    <div className="bg-blue-100 bg-opacity-20 h-screen w-full flex items-center">
      <div className="w-[400px] h-[600px] m-auto grid text-center grid-cols-4 grid-rows-6">
        <div className="col-span-4 bg-[#7a7b88] text-white text-5xl flex items-center justify-end px-4 relative overflow-x-auto max-w-full ">
          <span>{result === "" ? currentNumber : result}</span>
        </div>
        {ELEMENT.map((value, index) => {
          return (
            <Numbers
              key={index}
              onClick={() => handleOparation(value)}
              value={value.element}
              className={`${value.element === "0" ? "col-span-2" : ""} ${
                value.operator ? "sign" : ""
              }`}
            />
          );
        })}
        {}
      </div>
    </div>
  );
}

export default App;
