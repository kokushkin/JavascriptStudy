// Выводит имена и значения всех свойств объекта obj
function printprops(obj) {
    for (var p in obj)
        console.log(p + ": " + obj[p] + "\n");
}

// Вычисляет расстояние между точками (x1,y1) и (x2,y2)
function distance(x1, y1, x2, y2) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}

// Рекурсивная функция (вызывающая сама себя), вычисляющая факториал
function factorial(x) {
    if (x <= 1) return 1;
    return x * factorial(x - 1);
}

// Следующее выражение определяет функцию, вычисляющую 
// квадрат аргумента. Обратите внимание, 
// что она присваивается переменной 
var square = function (x) { return x * x; }

// Выражения определения функций могут иметь имена, что позволяет 
// производить рекурсивные вызовы
var f = function fact(x) {
    if (x <= 1)
        return 1;
    else
        return x * fact(x - 1);
};

// Выражения определения функций иногда могут тут же вызываться: 
var tensquared = (function (x) { return x * x; }(10));