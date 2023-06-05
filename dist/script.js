import * as math from "mathjs";
var calculadoraElemento = document.getElementById("calculadora");
var resultadoElemento = document.getElementById("resultado");
var evaluate = function (expression) {
    try {
        if (expression.match(/[a-zA-Z&#$<>{}]/g))
            throw new Error();
        var result = math.evaluate(expression);
        return typeof result === "number" ? result : null;
    }
    catch (e) {
        return null;
    }
};
var isNumber = function (value) {
    if (typeof value === "number")
        return !isNaN(value) && isFinite(value);
    else
        return false;
};
var clipboard = function (value) {
    return navigator.clipboard.writeText(value.toString());
};
var calcular = function () {
    localStorage.setItem("calculadora", calculadoraElemento.value);
    var lines = calculadoraElemento.value.split(/\r?\n/).map(evaluate);
    resultadoElemento.innerHTML = "<div>".concat(lines
        .map(function (l) { return "<div>".concat(isNumber(l) ? l : "---", "</div>"); })
        .join(""), "</div>");
    var total = lines.filter(isNumber).reduce(function (a, b) { return a + b; }, 0);
    resultadoElemento.innerHTML += "<div id=\"total\">".concat(total, "</div>");
    resultadoElemento.addEventListener("click", function () { return clipboard(total); });
};
calculadoraElemento.value = localStorage.getItem("calculadora") || "";
calculadoraElemento.addEventListener("input", calcular);
calcular();
//# sourceMappingURL=script.js.map