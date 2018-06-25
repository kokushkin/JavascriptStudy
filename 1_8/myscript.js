// Еще один класс, представляющий диапазон значений.
// Это функция-конструктор, которая инициализирует новые объекты Range.
// Обратите внимание, что она не создает и не возвращает объект.
// Она лишь инициализирует его.
function Range(from, to) {
	// Сохранить начальное и конечное значения в новом объекте Range.
	// Это не унаследованные свойства, и они
	// являются уникальными для данного объекта.
	this.from = from;
	this.to = to;
}

// Все объекты Range наследуют свойства этого объекта.
// Обратите внимание, что свойство обязательно должно иметь имя "prototype"
Range.prototype = {
	includes: function(x) { 
		return this.from <= x && x <= this.to; },

	foreach: function(func, objectToWrite) {
		for(var x = Math.ceil(this.from); x <= this.to; x++) 
			func.call(objectToWrite, x);
	},

	toString: function() { 
		return "Диапазон (" + this.from + "..." + this.to + ")"; 
	}
};


function Reactor(temperature, pressure) {
    this.temperature = temperature;
    this.pressure = pressure;
}

Reactor.prototype = {
    changePower: function(delta) {
        this.temperature.from += delta;
        this.temperature.to += delta;
        this.pressure.from += delta;
        this.pressure.to += delta;
    }
}


// попытка сделать наследника от Reactor. Пока не понятно как.

function RandeWithMass(from, to, mass) {
    this.mass = mass;
    
}

RandeWithMass.prototype = {

    prototype: Reactor.prototype,

	toString: function() { 
        return toString() + "mass";         
	}


}