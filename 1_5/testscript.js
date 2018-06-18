// Создадим новый объект
var obj = {name:'Alex', password:'12345' };

for (var i in obj)
{
    console.log(i);
	// Вывести значение каждого свойства объекта
	console.log(obj[i]);
}


var obj = {name:'Alex', password:'12345' };
var arr = [], i = 0;

for (arr[i++] in obj);		// пустое тело цикла

console.log(arr);			// ["name", "password"]


function getSumArray(arr)
{
    var sum = 0;
    for (var i = 0; i < arr.length; i++)
        sum += arr[i];

    return sum;
}

console.log(getSumArray([1,2,3,4,5,6,7,8,9]));