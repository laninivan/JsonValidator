import { orderData } from '../JSON/orderData.js';
import { recursiveSearhByCondition, hasObjectElement, isChainElementsValide, getPuthByElementName } from './Validation/validationObjAttributes.js';
import { callbackConsoleLog, callbackReturnBool, callbackGetSearhElement } from './Validation/callbacks.js'
import { checkArray, checkBool, checkDate, checkFloat, checkInteger, checkNull, checkObject, checkString, checkEmpty, checkEmptyStr } from './Validation/validationBasicTypes.js';

import { jsonParse } from './jsonSchema/strValidator/jsonParser.js'
import { objValidation } from './jsonSchema/objValidator/validator.js'

import {schema1} from './jsonSchema/Schemes/schema1.js';

var jsonData = JSON.stringify(orderData);
var objData = JSON.parse(jsonData);
var testArray = [3, 3.5, "4","3.0", "4.54", "2012-04-21", "ahaha", "", " ", "null", "true", "FALSE", true, null, undefined, {}, []];

// console.log("\n____________CHECK NULL");
// testArray.forEach(el => {
//     console.log(((el === " " && "' '") ||
//         (checkArray(el) && "[]") ||
//         (el === "" && "''") || el + "(" + typeof (el) + ")") + " - " + checkNull(el));
// });

// console.log("\n____________CHECK EMPTYSTR");
// testArray.forEach(el => {
//     console.log(((el === " " && "' '") ||
//         (checkArray(el) && "[]") ||
//         (el === "" && "''") || el + "(" + typeof (el) + ")") + " - " + checkEmptyStr(el));
// });

// console.log("\n____________CHECK EMPTY");
// testArray.forEach(el => {
//     console.log(((el === " " && "' '") ||
//         (checkArray(el) && "[]") ||
//         (el === "" && "''") || el + "(" + typeof (el) + ")") + " - " + checkEmpty(el));
// });


// console.log("\n____________CHECK INTEGER");
// testArray.forEach(el => {
//     console.log(((el === " " && "' '") ||
//         (checkArray(el) && "[]") ||
//         (el === "" && "''") || el + "(" + typeof (el) + ")") + " - " + checkInteger(el));
// });

// console.log("\n____________CHECK FLOAT");
// testArray.forEach(el => {
//     console.log(((el === " " && "' '") ||
//         (checkArray(el) && "[]") ||
//         (el === "" && "''") || el + "(" + typeof (el) + ")") + " - " + checkFloat(el));
// });

// console.log("\n____________CHECK STRING");
// testArray.forEach(el => {
//     console.log(((el === " " && "' '") ||
//         (checkArray(el) && "[]") ||
//         (el === "" && "''") || el + "(" + typeof (el) + ")") + " - " + checkString(el));
// });

// console.log("\n____________CHECK BOOLEAN");
// testArray.forEach(el => {
//     console.log(((el === " " && "' '") ||
//         (checkArray(el) && "[]") ||
//         (el === "" && "''") || el + "(" + typeof (el) + ")") + " - " + checkBool(el));
// });

// console.log("\n____________CHECK OBJ");
// testArray.forEach(el => {
//     console.log(((el === " " && "' '") ||
//         (checkArray(el) && "[]") ||
//         (el === "" && "''") || el + "(" + typeof (el) + ")") + " - " + checkObject(el));
// });

// console.log("\n____________CHECK DATE");
// console.log("\n--------------------------------Не даты:")
// testArray.forEach(el => {
//     console.log(((el === " " && "' '") ||
//         (checkArray(el) && "[]") ||
//         (el === "" && "''") || el + "(" + typeof (el) + ")") + " - " + checkDate(el));
// });
// console.log("\n--------------------------------Даты без ошибок:")
// console.log("2012-04-21T18:25:43+05:00" + " " + (checkDate("2012-04-21T18:25:43+05:00")));
// console.log("2012-04-21T18:25:43+03:00" + " " + (checkDate("2012-04-21T18:25:43+03:00")));
// console.log("2012-04-21T18:25:43" + " " + (checkDate("2012-04-21T18:25:43")));
// console.log("2012-04-21" + " " + (checkDate("2012-04-21")));
// console.log("2012-04-21T18:25:43-05:00" + " " + (checkDate("2012-04-21T18:25:43-05:00")));
// console.log("2012-04-21T18:25:43-03:00" + " " + (checkDate("2012-04-21T18:25:43-03:00")));
// console.log("2012-04-21T18:25:43" + " " + (checkDate("2012-04-21T18:25:43")));

// console.log("\n--------------------------------Даты с ошибками:")
// console.log("2012-04-21T18:25:43-03" + " " + (checkDate("2012-04-21T18:25:43-03")));
// console.log("2012-04-21T18:25:43+03" + " " + (checkDate("2012-04-21T18:25:43+03")));
// console.log("2012-04-2118:25:43+05:00" + " " + (checkDate("2012-04-2118:25:43+05:00")));
// console.log("20f12-04-21T18:25:43+03:00" + " " + (checkDate("20f12-04-21T18:25:43+03:00")));
// console.log("202-04-21T18:5:43" + " " + (checkDate("202-04-21T18:5:43")));
// console.log("2012-0-21T18:25:43+03" + " " + (checkDate("2012-0-21T18:25:43+03")));
// console.log("2012-4-21" + " " + (checkDate("2012-4-21")));
// console.log("2012-04-21T18:25:43-05:002222" + " " + (checkDate("2012-04-21T18:25:43-05:002222")));
// console.log("20162-04-21T18:25:43-03:00" + " " + (checkDate("20162-04-21T18:25:43-03:00")));
// console.log("20162-04-21T18:25:43" + " " + (checkDate("20162-04-21T18:25:43")));
// console.log("2012-04-21T18:25:4303" + " " + (checkDate("2012-04-21T18:25:4303")));




//Проверка наличия элемента в обхекте(обход в глубину)
// hasObjectElement(orderData, "IsRich", callbackConsoleLog);
// hasObjectElement(orderData, "IsRic2h", callbackConsoleLog);

// console.log();

// if (isChainElementsValide(orderData, ["GetMaxInOrderPrice", "Orders", "OrderId"]).rezult) {
//     console.log("YEES");
// }

// if (!isChainElementsValide(orderData, ["GetMaxInOrderPrice", "Ordersf", "OrderId"]).rezult) {
//     console.log("NO");
// }

// console.log();

// //Проверка валидности валидной цепочки элементов
// var rez = isChainElementsValide(orderData, ["GetMaxInOrderPrice", "Orders", "OrderId"]);
// console.log(rez.rezult);
// console.log(rez.description);

// console.log();

// //Проверка валидности невалидной цепочки элементов
// var rez = isChainElementsValide(orderData, ["GetMaxInOrderPrice", "ааOrders", "OrderId"]);
// console.log(rez.rezult);
// console.log(rez.description);

// console.log();

// //Получение пути до существующего элемента
// var searhPuth1 = getPuthByElementName(orderData, "Weight");
// //Получение пути до несуществующего элемента
// var searhPuth2 = getPuthByElementName(orderData, "Weigtht");

// console.log(searhPuth1.description);
// console.log(searhPuth1.status);
// console.log('puth: ' + searhPuth1.puth);

// console.log();

// console.log(searhPuth2.description);
// console.log(searhPuth2.status);
// console.log('puth: ' + searhPuth2.puth);

// console.log(JSON.stringify(schema1));

var rez=objValidation(objData,schema1);
console.log(rez.status);
console.log(rez.message);