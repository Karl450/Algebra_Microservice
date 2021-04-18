/**
 * Create an object that will contain all expressions per server start.
 * Will be deleted when server restarts.
 */
class Expressions {
    
    constructor (){
        this.ExpressionList = [
            {
                "uid":"E00",
                "expr":"1+x"
            }
        ];
        this.Operators = {
            "/": {
                priority: 3,
                action : (var1, var2)=>{
                    var res = parseInt(var1) / parseInt(var2);
                    return res;
                }
            },
            "*": {
                priority: 3,
                action : (var1, var2)=>{
                    var res = parseInt(var1) * parseInt(var2);
                    return res;
                }
            },
            "+": {
                priority: 2,
                action : (var1, var2)=>{
                    var res = parseInt(var1) + parseInt(var2);
                    return res;
                }
            },
            "-": {
                priority: 2,
                action : (var1, var2)=>{
                    var res = parseInt(var1) - parseInt(var2);
                    return res;
                }
            }
        };
    }
    /**
     * Generate a unique ID startign with letter E following a number between 0-99
     */
    generateUniqueID (){
        let UID = `E${Math.floor(Math.random() * 99)}`;
        let existingUID = _Expressions.ExpressionList.map( (expr) => {
            return expr.uid;
        });

        if(UID == existingUID) module.exports.generateUniqueID();

        if(UID[0] != 'E') return res.status(422).send({"Error":"Cannot start with anythign except E"});

        return UID;
    };
    /**
     * Add Expression to object
     */
    addExpression (objExpr){
        objExpr.expr = objExpr.expr.replace(/\s/g,'+');
        this.ExpressionList.push(objExpr);
    };
    /**
     * Replaces unknow variables with needed key,value, if previous character is a number put a * before replace
     */
    replaceVariables (uid,key,val){
        var pos = _Expressions.ExpressionList.map((expr)=>{return expr.uid; }).indexOf(uid);
        for(var idx = 0; idx < _Expressions.ExpressionList[pos].expr.length; idx++)
        {
            let rgxLetter = new RegExp(`[${key}]`);
            let rgxNbr = /[0-9]/;
            if(_Expressions.ExpressionList[pos].expr[idx].match(rgxLetter))
            {
                if(_Expressions.ExpressionList[pos].expr[idx-1] != undefined && _Expressions.ExpressionList[pos].expr[idx-1].match(rgxNbr) ){
                    _Expressions.ExpressionList[pos].expr = _Expressions.ExpressionList[pos].expr.replace(key,"*"+val);
                }
                else{
                    _Expressions.ExpressionList[pos].expr = _Expressions.ExpressionList[pos].expr.replace(key,val);
                }
            }
        };
        return _Expressions.ExpressionList[pos].expr;
    };
    /**
     * Transform expression infix to postfix
     */
    translateToPostfix (expr){
        var strQeueu = "";
        var arrStack = [];

        expr = expr.replace(/\s+/g, "");
        expr = expr.split(/([\+\-\*\/\^\(\)])/);

        for(var i = 0; i < expr.length; i++) {
            if(expr[i] === "") { expr.splice(i, 1); }
        }

        for(var i = 0; i < expr.length; i++) 
        {
            var token = expr[i];

            if(parseFloat(token)) {
                strQeueu += token + " ";
            } 
            else if("*/+-".indexOf(token) !== -1) {
                var operator1 = token;
                var operator2 = arrStack[arrStack.length - 1];
                while( "*/+-".indexOf(operator2) !== -1 && ( ( _Expressions.Operators[operator1].priority <= _Expressions.Operators[operator2].priority) || ( _Expressions.Operators[operator1].priority < _Expressions.Operators[operator2].priority) ) ) 
                {
                    strQeueu += arrStack.pop() + " ";
                    operator2 = arrStack[arrStack.length - 1];
                }
                arrStack.push(operator1);
            } 
            else if(token === "(") {
                arrStack.push(token);
            } 
            else if(token === ")") {
                while(arrStack[arrStack.length - 1] !== "(") 
                {
                    strQeueu += arrStack.pop() + " ";
                }
                arrStack.pop();
            }
        }

        while(arrStack.length > 0) {
            strQeueu += arrStack.pop() + " ";
        }

        return strQeueu;
    }

    /**
     * Calculate result using the postfix
     */
    calculateResult(postfix){
        var arrPostfix = postfix.trim().split(" ");
        var regexOperators = /[\+\-\/\*]/;
        var arrStack = [];

        for(var i = 0; i < arrPostfix.length; i++) {
            if(arrPostfix[i] === "") { arrPostfix.splice(i, 1); }
        }

        for(var i = 0; i < arrPostfix.length; i++){
            if ( regexOperators.test(arrPostfix[i])){   
                var secondVar = arrStack.pop();
                var firstVar = arrStack.pop();

                if(isNaN(secondVar)) { secondVar = '0' };
                if(isNaN(firstVar)) { firstVar = '0' };

                var res = _Expressions.Operators[arrPostfix[i]].action(firstVar, secondVar);

                arrStack.push(res);
            } else {
                arrStack.push(arrPostfix[i]);
            }
        }
        return arrStack;
    }

    /**
     * Solve the expression
     */
    solve (expr){
        let postFix = module.exports.translateToPostfix(expr);
        let result = module.exports.calculateResult(postFix);
        return result[0];
    };
}
const _Expressions = new Expressions();
module.exports = _Expressions;