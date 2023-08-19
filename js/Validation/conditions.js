import { checkObject, checkArray } from "./validationBasicTypes.js";

//condition
function conditionSearh(key, searchedAttribute) {
    return key == searchedAttribute;
}


function conditionHasElementAttribute(data, attribute) {
    return (checkObject(data) &&
        attribute in data ||
        checkArray(data) &&
        data.length > 0 &&
        attribute in data[0]);
}

export { conditionSearh, conditionHasElementAttribute }