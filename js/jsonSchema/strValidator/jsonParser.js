function jsonParse(jsonStr) {
    var curSymbol;
    var thisTypeElement = "object";
    var openingBrackets = [];
    var closingBrackets = [];
    for (var index = 0; index < jsonStr.length; index++) {
        curSymbol = jsonStr[index];
        switch (curSymbol) {
            case "{":
                // console.log("{");

                break;
            case "}":
                // console.log("}");

                break;
            case "(":
                // console.log("(");

                break;

            case ")":
                // console.log(")");
                
                break;


            default:
                break;
        }

    }
}

export { jsonParse }