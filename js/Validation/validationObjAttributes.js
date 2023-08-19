import { checkNull, checkObject, checkArray, checkDate, checkBool, checkInteger, checkFloat, checkNumber, checkString } from './validationBasicTypes.js';
import { conditionSearh, conditionHasElementAttribute } from './conditions.js'
import { callbackGetSearhElement, callbackGetStatus, errorChain } from './callbacks.js'

//Рекурсивный обход объекта в глубину с динамическими коллбеками и условиями
function recursiveSearhByCondition(obj, attribute, conditionFunction, isSearh) {
    if (isSearh.status) return;

    for (var key in obj) {
        var value = obj[key];
        isSearh.key = key;

        if (conditionFunction(key, attribute)) {
            isSearh.status = true;
            isSearh.value = value;
            return;
        }
        else if (checkObject(value) || checkArray(value)) {
            recursiveSearhByCondition(value, attribute, conditionFunction, isSearh);

        }
    }
    return;
}

//Проверка наличия элемента в обхекте(обход в глубину)
function hasObjectElement(obj, attribute, callbackFunction) {
    var isSearh = {
        status: false,
        key: null,
        value: null
    };

    recursiveSearhByCondition(obj, attribute, conditionSearh, isSearh);
    return callbackFunction(isSearh);
}


//Проверка наличия частя цепочки элементов в обхекте(обход в глубину)
// function hasObjectAttributeByChain(obj, namesArr, callbackFunction) {
//     var isSearh = {
//         status: false,
//         key: null,
//         value: null,
//     };
//     var attributeByChain = '';

//     namesArr.map(function (attribute) {
//         obj = obj.hasObjectElement(obj, attribute, callbackGetStatus, isSearh);
//         console.log(isSearh.status + " " + isSearh.key + " " + isSearh.value + "|" + obj);
//         attributeByChain = attributeByChain + " -> " + attribute;
//         if (!isSearh.status) {

//             attributeByChain += "(error)";
//             return callbackFunction(isSearh.status);
//         }
//     })
//     console.log(attributeByChain);
//     return callbackFunction(isSearh.status);
// }






//Получение пути до элемента по имени
function getPuthByElementName(data, attribute, puth = '', searhStatus = { status: false, puth: '-', description: '-' }) {
    if (conditionHasElementAttribute(data, attribute)) {
        puth = puth + '.' + attribute;
        searhStatus.status = true;
        searhStatus.puth = puth;
        searhStatus.description = 'Объект содержит элемент "' + attribute + '".';
        return searhStatus;
    }

    if (checkObject(data)) {
        for (var key in data) {
            if (searhStatus.status)
                return searhStatus;
            var newPuth = puth + '.' + key;
            newPuth = getPuthByElementName(data[key], attribute, newPuth, searhStatus);
            if (searhStatus.status) {
                return searhStatus;
            }
        }
        puth = newPuth;
    } else if (checkArray(data) &&
        data.length > 0) {
        for (var i = 0; i < data.length; i++) {

            var newPuth = puth + '[' + i + "]";
            newPuth = getPuthByElementName(data[i], attribute, newPuth, searhStatus);
            if (searhStatus.status) {
                return searhStatus;
            }
        }
        puth = newPuth;
    };

    // return searhStatus.puth;
    searhStatus.puth = "-"
    searhStatus.description = 'Объект не осдержит элемент "'+ attribute+'".'
    return searhStatus;
}

//Проверка валидности цепи элементов
function isChainElementsValide(data, namesArr) {
    var steChain = "";
    var rezult = true;

    for (var attribute of namesArr) {
        if (conditionHasElementAttribute(data, attribute)) {
            if (checkObject(data)) {
                steChain = steChain + "{} -> " + attribute;
                data = data[`${attribute}`];
            } else if (checkArray(data)) {
                steChain = steChain + "[] -> " + attribute;
                data = data[0][attribute];
            }
        } else {
            steChain = steChain + " -> " + attribute + "(ERROR)";
            rezult = false;
            break;
        }
    }

    return {
        rezult: rezult,
        description: errorChain(rezult, steChain)
    };
}

export { recursiveSearhByCondition, hasObjectElement, isChainElementsValide, getPuthByElementName }