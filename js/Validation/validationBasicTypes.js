function checkEmpty(element) {
    return element === "" ||
        checkNull(element) 
        // ||element === undefined
        ;
}


function checkEmptyStr(element) {
    return element === "";
}

function checkArray(element) {
    return Array.isArray(element);
}

function checkObject(element) {
    return typeof element === "object" &&
        !checkNull(element)
        && !checkArray(element);
}



// ВЕРСИЯ 1, ЕСЛИ ДАННЫЕ В КАВЫЧКАХ НЕ СЧИТАЮТСЯ СТРОКОЙ

function checkNull(element) {
    return element === null || element === "null";
}

function checkBool(element) {
    return typeof (element) === "boolean" ||
        /(true)|(false)/i.test(element);
}

function checkInteger(element) {
    if(typeof(element)==="string") {    
        return /^\d+$/.test(element);
    }
    return (checkNumber(element) && Number.isInteger(Number(element)));
}

function checkFloat(element) {
    if(typeof(element)==="string") {    
        return /^\d+\.\d$/.test(element);
    }
    return !checkNull(element) && checkNumber(element)
        && Number(element) % 1 !== 0;
}

function checkNumber(element) {
    return !checkArray(element) &&
        !isNaN(element) &&
        element !== '' &&
        !checkNull(element) &&
        !checkBool(element) &&
        element !== ' ' &&
        element !== undefined &&
        Number.isFinite(Number(element));
}

function checkString(element) {
    return typeof (element) === "string" &&
        !checkNull(element) &&
        !checkBool(element) &&
        !checkObject(element) &&
        !checkArray(element) &&
        !checkNumber(element);
}

function checkDate(element) {
    // Формат: ISO 8601 «2012-04-21T18:25:43-05:00».  

    if (!checkString(element)) {

        return false;
    }
    var arr = [];
    var tempDate = new Date(element);

    if (/^(\d{4}-[01]\d-[0-3]\d)$/.test(element)) {
        //yyyy-mm-dd
        arr = element.split('-');

        return tempDate.getFullYear() == arr[0] &&
            tempDate.getMonth() + 1 == arr[1] &&
            tempDate.getDate() == arr[2];
    } else if (/^(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)$/.test(element)) {
        //yyyy-mm-ddThh:mm:ss
        arr = element.split(/\T|\-|\:/);

        return tempDate.getUTCFullYear() == arr[0] &&
            tempDate.getUTCMonth() + 1 == arr[1] &&
            tempDate.getUTCDate() == arr[2] &&
            tempDate.getHours() == arr[3] &&
            tempDate.getMinutes() == arr[4] &&
            tempDate.getSeconds() == arr[5];
    } else if (/^(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d-[0-2]\d:[0-5]\d)$/.test(element)) {
        //yyyy-mm-ddThh:mm:ss-hh:ss
        arr = element.split(/\T|\-|\:/);
        var unsetHours = Number(arr[6]);
        var unsetMinutes = Number(arr[7]);

        return tempDate.getUTCFullYear() == arr[0] &&
            tempDate.getUTCMonth() + 1 == arr[1] &&
            tempDate.getUTCDate() == arr[2] &&
            tempDate.getUTCHours() - unsetHours == arr[3] &&
            tempDate.getUTCMinutes() - unsetMinutes == arr[4] &&
            tempDate.getUTCSeconds() == arr[5];

    } else if (/^(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\+[0-2]\d:[0-5]\d)$/.test(element)) {
        //yyyy-mm-ddThh:mm:ss+hh:ss
        arr = element.split(/\T|\-|\:|\+/);
        var unsetHours = Number(arr[6]);
        var unsetMinutes = Number(arr[7]);

        return tempDate.getUTCFullYear() == arr[0] &&
            tempDate.getUTCMonth() + 1 == arr[1] &&
            tempDate.getUTCDate() == arr[2] &&
            tempDate.getUTCHours() + unsetHours == arr[3] &&
            tempDate.getUTCMinutes() + unsetMinutes == arr[4] &&
            tempDate.getUTCSeconds() == arr[5]
    }

    return false;
}

// ВЕРСИЯ 2, ЕСЛИ ДАННЫЕ В КАВЫЧКАХ ВСЕГДА ЯВЛЯЮТСЯ СТРОКОЙ ИЛИ ДАТОЙ



// function checkNull(element) {
//     return element === null;
// }


// function checkBool(element) {
//     return typeof (element) === "boolean";
// }

// function checkInteger(element) {
//     return checkNumber(element) && Number.isInteger(element);
// }

// function checkFloat(element) {
//     return checkNumber(element)
//         && element % 1 !== 0;
// }

// function checkNumber(element) {
//     return typeof (element) === "number" &&
//         Number.isFinite(element);
// }

// function checkString(element) {
//     return typeof (element) === "string"
// }

// function checkDate(element) {
//     // Формат: ISO 8601 «2012-04-21T18:25:43-05:00».  

//     if (!checkString(element)) {

//         return false;
//     }
//     var arr = [];
//     var tempDate = new Date(element);

//     if (/^(\d{4}-[01]\d-[0-3]\d)$/.test(element)) {
//         //yyyy-mm-dd
//         arr = element.split('-');

//         return tempDate.getFullYear() == arr[0] &&
//             tempDate.getMonth() + 1 == arr[1] &&
//             tempDate.getDate() == arr[2];
//     } else if (/^(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)$/.test(element)) {
//         //yyyy-mm-ddThh:mm:ss
//         arr = element.split(/\T|\-|\:/);

//         return tempDate.getUTCFullYear() == arr[0] &&
//             tempDate.getUTCMonth() + 1 == arr[1] &&
//             tempDate.getUTCDate() == arr[2] &&
//             tempDate.getHours() == arr[3] &&
//             tempDate.getMinutes() == arr[4] &&
//             tempDate.getSeconds() == arr[5];
//     } else if (/^(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d-[0-2]\d:[0-5]\d)$/.test(element)) {
//         //yyyy-mm-ddThh:mm:ss-hh:ss
//         arr = element.split(/\T|\-|\:/);
//         var unsetHours = Number(arr[6]);
//         var unsetMinutes = Number(arr[7]);

//         return tempDate.getUTCFullYear() == arr[0] &&
//             tempDate.getUTCMonth() + 1 == arr[1] &&
//             tempDate.getUTCDate() == arr[2] &&
//             tempDate.getUTCHours() - unsetHours == arr[3] &&
//             tempDate.getUTCMinutes() - unsetMinutes == arr[4] &&
//             tempDate.getUTCSeconds() == arr[5];

//     } else if (/^(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\+[0-2]\d:[0-5]\d)$/.test(element)) {
//         //yyyy-mm-ddThh:mm:ss+hh:ss
//         arr = element.split(/\T|\-|\:|\+/);
//         var unsetHours = Number(arr[6]);
//         var unsetMinutes = Number(arr[7]);

//         return tempDate.getUTCFullYear() == arr[0] &&
//             tempDate.getUTCMonth() + 1 == arr[1] &&
//             tempDate.getUTCDate() == arr[2] &&
//             tempDate.getUTCHours() + unsetHours == arr[3] &&
//             tempDate.getUTCMinutes() + unsetMinutes == arr[4] &&
//             tempDate.getUTCSeconds() == arr[5]
//     }

//     return false;
// }

export { checkNull, checkObject, checkArray, checkDate, checkBool, checkInteger, checkFloat, checkNumber, checkString, checkEmpty, checkEmptyStr }