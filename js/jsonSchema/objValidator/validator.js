import { checkArray, checkBool, checkDate, checkFloat, checkInteger, checkNull, checkObject, checkString, checkEmpty, checkEmptyStr, checkNumber } from '../../Validation/validationBasicTypes.js';




function objValidation(element, elementData, rezult = { status: true, message: 'Валидация данных прошла успешно!' }, puth = '') {

    if (checkEmpty(element)) {
        if (!elementData.possibleEmpry || elementData.possibleEmpry && elementData.possibleEmpry === "false") {
            rezult.status = false;
            rezult.message = 'Обнаружено пустое или несуществующее значение! ' + puth;
            return rezult;
        }
    }
    else if (elementData.type === "object") {
        if (checkObject(element)) {
            // console.log("ЗАШЕЛ В ОБЪЕКТ");
            var nextElementData = elementData.properties;
            if (Object.keys(nextElementData).length < Object.keys(element).length) {
                rezult.status = false;
                rezult.message = 'Присутствуют лишние данные(вместо : ' + Object.keys(nextElementData).length + ' - ' + Object.keys(element).length + ')' + puth;
                console.log(Object.keys(element));
                return rezult;
            }
            for (var key in nextElementData) {
                var newPuth = puth + key + ".";
                if (!objValidation(element[key], nextElementData[key], rezult, newPuth).status) {
                    return rezult;
                }
            }
        }
        else {
            rezult.message = `Элемент ${key} не является ОБЪЕКТОМ: ` + puth;
            rezult.status = false;
        }
    } else if (elementData.type === "array") {
        if (checkArray(element)) {
            // console.log("ЗАШЕЛ В МАССИВ");
            var nextElementData = elementData.items;
            for (var elArr = 0; elArr < element.length; elArr++) {
                var newPuth = puth + "[" + elArr + "].";
                if (!objValidation(element[elArr], nextElementData, rezult, newPuth).status) {
                    return rezult;
                }
            }

        } else {
            rezult.message = `Элемент ${element} не является МАССИВОМ: ` + puth;
            rezult.status = false;
            return;
        }
    } else if (elementData.type === "integer" && !checkInteger(element)) {
        rezult.message = `Элемент ${element} не является ЦЕЛЫМ ЧИСЛОМ! ` + puth
        rezult.status = false;
    }
    else if (elementData.type === "float" && !checkFloat(element)) {
        rezult.message = `Элемент ${element} не является ВЕЩЕСТВЕННЫМ ЧИСЛОМ! ` + puth;
        rezult.status = false;
    } else if (elementData.type === "number" && !checkNumber(element)) {
        rezult.message = `Элемент ${element} не является ЧИСЛОМ! ` + puth;
        rezult.status = false;
    } else if (elementData.type === "boolean" && !checkBool(element)) {
        rezult.message = `Элемент ${element} не является ЛОГИЧЕСКИМ! ` + puth;
        rezult.status = false;
    } else if (elementData.type === "date" && !checkDate(element)) {
        rezult.message = `Элемент ${element} не является ДАТОЙ! ` + puth;
        rezult.status = false;
    }
    return rezult;

}


export { objValidation }
