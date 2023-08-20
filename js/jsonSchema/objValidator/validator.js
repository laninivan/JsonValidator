import { checkArray, checkBool, checkDate, checkFloat, checkInteger, checkNull, checkObject, checkString, checkEmpty, checkEmptyStr, checkNumber } from '../../Validation/validationBasicTypes.js';


function propertiesCompare(propertObj, propertSchema, puth) {
    var rezult = { status: true, message: "" }
    if (Object.keys(propertObj).length > Object.keys(propertSchema.properties).length) {
        rezult.message = 'Присутствуют лишние данные(вместо : ' + Object.keys(propertSchema.properties).length + ' - ' + Object.keys(propertObj).length + ')' + puth;
        rezult.status = false;
    }
    return rezult;
}

function objValidation(element, elementData, rezult = { status: true, message: 'Валидация данных прошла успешно!' }, puth = '') {

    if (checkEmpty(element)) {
        if (!elementData.possibleEmpry || elementData.possibleEmpry && elementData.possibleEmpry === "false") {
            rezult.status = false;
            rezult.message = 'Обнаружено недопустимое пустое значение! ' + puth;
            return rezult;
        }
    }
    else if (elementData.type === "object") {
        if (checkObject(element)) {
            var nextElementData = elementData.properties;

            var compare = propertiesCompare(element, elementData, puth);
            if (!compare.status) {
                rezult.status = compare.status;
                rezult.message = compare.message;
                return rezult;
            }

            for (var key in nextElementData) {
                var newPuth = puth + key + ".";
                if (!(key in element)) {
                    if (elementData.required && elementData.required.includes(key)) {
                        rezult.status = false;
                        rezult.message = 'Отсутствует свойство - ' + key + ": " + newPuth;
                        break;
                    }
                } else if (!objValidation(element[key], nextElementData[key], rezult, newPuth).status) {
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
