import * as math from "mathjs";

const calculadoraElemento = document.getElementById(
  "calculadora"
) as HTMLInputElement;
const resultadoElemento = document.getElementById(
  "resultado"
) as HTMLDivElement;

const evaluate = (expression: string): number | null => {
  try {
    if (expression.match(/[a-zA-Z&#$<>{}]/g)) throw new Error();
    const result = math.evaluate(expression);
    return typeof result === "number" ? result : null;
  } catch (e) {
    return null;
  }
};

const isNumber = (value: unknown): value is number => {
  if (typeof value === "number") return !isNaN(value) && isFinite(value);
  else return false;
};

const clipboard = (value: string | number): Promise<void> =>
  navigator.clipboard.writeText(value.toString());

const calcular = () => {
  localStorage.setItem("calculadora", calculadoraElemento.value);

  const lines = calculadoraElemento.value.split(/\r?\n/).map(evaluate);

  resultadoElemento.innerHTML = `<div>${lines
    .map((l) => `<div>${isNumber(l) ? l : "---"}</div>`)
    .join("")}</div>`;

  const total = lines.filter(isNumber).reduce((a, b) => a + b, 0);

  resultadoElemento.innerHTML += `<div id="total">${total}</div>`;

  resultadoElemento.addEventListener("click", () => clipboard(total));
};

calculadoraElemento.value = localStorage.getItem("calculadora") || "";

calculadoraElemento.addEventListener("input", calcular);
calcular();
