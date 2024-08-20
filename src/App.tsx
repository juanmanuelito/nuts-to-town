import { useState } from "react";
import "./App.css";

function App() {
  const [values, setValues] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const validateInput = () => {
    if (values.length == 0) {
      setError("No values in the text area");
      return;
    }
    const lines = values.split("\n");
    const outputExecution = lines
      .map((line) => line.split(","))
      .map((inputNumbers) => (inputNumbers.length < 4 ? [] : inputNumbers))
      .map((inputNumbers) => inputNumbers.map((num) => parseFloat(num)))
      .map(nutsToTown)
      .join("\n");
    setOutput(outputExecution);
  };

  const nutsToTown = ([D, N, F, C]: Array<number>) => {
    let x = 0;
    let totalNuts = N;
    const consumePerKm = F * D;
    if (C < consumePerKm) {
      return 0;
    }
    while (totalNuts > consumePerKm) {
      x += (totalNuts < C ? totalNuts : C) - consumePerKm;
      totalNuts = totalNuts - C;
    }
    return x;
  };

  const reset = () => {
    setValues("");
    setError("");
    setOutput("");
  };

  return (
    <>
      <div style={{ display: "grid" }}>
        <textarea
          style={{ margin: "2rem" }}
          rows={4}
          cols={50}
          onChange={(e) => setValues(e.target.value)}
        ></textarea>
        <textarea
          style={{ margin: "2rem" }}
          rows={4}
          cols={50}
          readOnly
          value={output}
        ></textarea>
        <span>{error}</span>
        <div style={{ display: "flex" }}>
          <button style={{width:'100%'}} onClick={reset}>Reset</button>
          <button style={{width:'100%'}} onClick={validateInput}>Calcular</button>
        </div>
      </div>
    </>
  );
}

export default App;
