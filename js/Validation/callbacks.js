//callbacks
function callbackConsoleLog(isSearh) {
    isSearh.status ? console.log("Searh") : console.log("No Searh");
}

function callbackReturnBool(isSearh) {
    return isSearh.status;
}

function callbackGetSearhElement(isSearh) {
    return isSearh.key;
}

function callbackGetStatus(isSearh) {
    return isSearh;
}

function errorChain(flag, strChain) {
    var str = '';
    if (!flag) {
        str += "Данного поля(ERROR) в объекте не существует!\n"
    } else {
        str += "Цепочка полей объекта валидна!\n"
    }
    str += strChain;
    return str;

}

export { callbackConsoleLog, callbackReturnBool, callbackGetSearhElement, callbackGetStatus, errorChain }