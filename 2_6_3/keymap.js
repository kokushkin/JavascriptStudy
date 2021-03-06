// Функция конструктор 
function Keymap(bindings) {
    this.map = {};   // Определить отображение идентификатор->обработчик
    if (bindings) {
        // Скопировать в него начальную карту привязок
        for (name in bindings)
            this.bind(name, bindings[name]);
    }
}

// Связывает указанный идентификатор клавиши с указанной функцией обработчиком 
Keymap.prototype.bind = function (key, func) {
    this.map[Keymap.normalize(key)] = func;
};

// Удаляет привязку для указанного идентификатора клавиши
Keymap.prototype.unbind = function (key) {
    delete this.map[Keymap.normalize(key)];
};

// Устанавливает этот объект Keymap в указанный HTML-элемент
Keymap.prototype.install = function (element) {
    var keymap = this;

    // Определить функции обработчика события
    function handler(event) { return keymap.dispatch(event, element); }

    // Установить ее 
    if (element.addEventListener)
        element.addEventListener("keydown", handler, false);
    else if (element.attachEvent)
        element.attachEvent("onkeydown", handler);
};

// Этот метод делегирует обработку события клавиатуры, опираясь на привязки 
Keymap.prototype.dispatch = function (event, element) {
    // Изначально нет ни имен клавиш-модификаторов, ни имени клавиши
    var modifiers = "";
    var keyname = null;

    // Сконструировать строки модификаторов в каноническом виде из символов 
    // в нижнем регистре, расположив их в алфавитном порядке. 
    if (event.altKey) modifiers += "alt_";
    if (event.ctrlKey) modifiers += "ctrl_";
    if (event.metaKey) modifiers += "meta_";
    if (event.shiftKey) modifiers += "shift_";

    // Имя клавиши легко получить, если реализовано свойство key, 
    // определяемое стандартом DOM Level 3: 
    if (event.key)
        keyname = event.key;

    // Для получения имен функциональных клавиш в Safari и Chrome можно 
    // использовать свойство keyIdentifier
    else
        if (event.keyIdentifier && event.keyIdentifier.substring(0, 2) !== "U+")
            keyname = event.keyIdentifier;

        // В противном случае можно использовать свойство keyCode
        // и отображение код > имя ниже 
        else keyname = Keymap.keyCodeToKeyName[event.keyCode];

    // Если имя клавиши не удалось определить, просто проигнорировать событие 
    // и вернуть управление.
    if (!keyname) return;

    // Канонический идентификатор клавиши состоит из имен модификаторов
    // и имени клавиши в нижнем регистре
    var keyid = modifiers + keyname.toLowerCase();

    // Проверить, имеется ли привязка для данного идентификатора клавиши
    var handler = this.map[keyid];

    if (handler) { // Если обработчик для данной клавиши, вызвать его 
        // Вызвать функцию обработчик
        var retval = handler.call(element, event, keyid);

        // Если обработчик вернул false, отменить действия по умолчанию 
        // и прервать всплытие события 
        if (retval === false) {
            if (event.stopPropagation)
                event.stopPropagation(); 	// модель DOM
            else event.cancelBubble = true;	// модель IE

            if (event.preventDefault)
                event.preventDefault(); 	// DOM 
            else event.returnValue = false;	// IE
        }

        // Вернуть значение, полученное от обработчика 
        return retval;
    }
};

// Вспомогательная функция преобразования идентификатора клавиши в каноническую форму. 
// Нам необходимо преобразовать идентификатор "meta" в "ctrl", чтобы превратить 
// идентификатор Meta-C в "Command-C" на компьютерах Mac и в "Ctrl-C" на всех остальных. 
Keymap.normalize = function (keyid) {
    keyid = keyid.toLowerCase();				// В нижний регистр
    var words = keyid.split(/\s+|[\-+_]/);		// Вычленить модификаторы
    var keyname = words.pop();					// keyname - последнее слово
    keyname = Keymap.aliases[keyname] || keyname; // Это псевдоним?
    words.sort();							// Сортировать модификаторы
    words.push(keyname);						// Поместить обратно нормализованное имя

    return words.join("_"); // Объединить все вместе
}

Keymap.aliases = {
    // Отображение привычных псевдонимов клавиш в их
    // "официальные" имена, используемые в DOM Level 3, и отображение кодов клавиш
    // в имена ниже. Имя и значение должны состоять только из символов нижнего регистра
    "escape": "esc",
    "return": "enter",
    "delete": "del",
    "ctrl": "control",
    "space": "spacebar",
    "ins": "insert"
};

// Старое свойство keyCode объекта события keydown не стандартизовано
// Но следующие значения с успехом могут использоваться в большинстве браузеров и ОС.
Keymap.keyCodeToKeyName = {
    // Клавиши со словами или стрелками на них
    8: "Backspace", 9: "Tab", 13: "Enter", 16: "Shift", 17: "Control", 18: "Alt", 19: "Pause",
    20: "CapsLock", 27: "Esc", 32: "Spacebar", 33: "PageUp", 34: "PageDown", 35: "End",
    36: "Home", 37: "Left", 38: "Up", 39: "Right", 40: "Down", 45: "Insert", 46: "Del",

    // Цифровые клавиши на основной клавиатуре (не на дополнительной)
    48: "0", 49: "1", 50: "2", 51: "3", 52: "4", 53: "5", 54: "6", 55: "7", 56: "8", 57: "9",

    // Буквенные клавиши. Обратите внимание, что здесь не различаются 
    // символы верхнего и нижнего регистров
    65: "A", 66: "B", 67: "C", 68: "D", 69: "E", 70: "F", 71: "G", 72: "H", 73: "I",
    74: "J", 75: "K", 76: "L", 77: "M", 78: "N", 79: "O", 80: "P", 81: "Q", 82: "R",
    83: "S", 84: "T", 85: "U", 86: "V", 87: "W", 88: "X", 89: "Y", 90: "Z",

    // Цифровые клавиши на дополнительной клавиатуре и клавиши со знаками препинания. 
    // (Не поддерживаются в Opera.)
    96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7", 104: "8",
    105: "9", 106: "Multiply", 107: "Add", 109: "Subtract", 110: "Decimal", 111: "Divide",

    // Функциональные клавиши
    112: "F1", 113: "F2", 114: "F3", 115: "F4", 116: "F5", 117: "F6", 118: "F7", 119: "F8",
    120: "F9", 121: "F10", 122: "F11", 123: "F12", 124: "F13", 125: "F14", 126: "F15",
    127: "F16", 128: "F17", 129: "F18", 130: "F19", 131: "F20", 132: "F21",
    133: "F22", 134: "F23", 135: "F24",

    // Клавиши со знаками препинания, для ввода которых не требуется
    // удерживать нажатой клавишу Shift.
    // Дефис не может использоваться переносимым способом: FF возвращает 
    // тот же код, что и для клавиши Subtract
    59: ";", 61: "=", 186: ";", 187: "=", // Firefox и Opera возвращают 59,61
    188: ",", 190: ".", 191: "/", 192: "`", 219: "[", 220: "\\", 221: "]", 222: "'"
};