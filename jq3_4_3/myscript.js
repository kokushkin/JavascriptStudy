// myscript.js
var flowers = [
    ["astor", "daffodil", "rose"],
    ["peony", "primula", "snowdrop"],
    ["carnation", "lily", "orchid"]
]

var flowersR = [
    ["Астра", "Нарцисс", "Роза"],
    ["Пион", "Примула", "Подснежник"],
    ["Гвоздика", "Лилия", "Орхидея"]
]

$('<div id=row3 class=drow/>').appendTo('div.dtable');

var fTemplate = $('<div class=dcell><img/><label/><input/></div>');
 
for (var row = 0; row < flowers.length; row++) {
    var fNames = flowers[row];
    var fNamesR = flowersR[row];
    
    for (var i = 0; i < fNames.length; i++) {
        fTemplate.clone().appendTo("#row" + (row + 1)).children()
            .filter('img').attr('src',"http://professorweb.ru/downloads/jquery/" 
                                          + fNames[i] + ".png").end()
            .filter('label').attr('for', fNames[i]).text(fNamesR[i]).end()
            .filter('input').attr({name: fNames[i], value: 0})
    }        
}