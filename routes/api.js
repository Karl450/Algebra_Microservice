const express = require('express');
const router = express.Router();

const  _Expressions = require('../utils/expressions');
const { validateExpressionURL, validateSubstituteURL } = require('../middleware/validation');

router.get('/', (req, res, next) => {
    res.status(200).send({"server":"online"});
});
/**
 * Generates a Unique ID and saves it to the Expression object with the expression 
 */
router.get('/setExpression', validateExpressionURL, (req, res, next) => {
    
    const UID = _Expressions.generateUniqueID();
    const expression = req.query.expr;

    let exprObj = {
        "uid" : UID,
        "expr" :  expression
    };

    _Expressions.addExpression(exprObj);

    res.status(200).send({uid:UID});
});
/**
 * Get All Expressions
 */
router.get('/getAll', (req, res, next) => {
    res.status(200).send(_Expressions.ExpressionList);
});
/**
 * Substitues unknow variable with value and key
 * Returns result once when all variables are replaced
 */
router.get('/substituteVariable', validateSubstituteURL, (req, res, next) => {
    const {key, value, uid} = req.query;
    const findLetters = /[a-zA-Z]/g;
    const modifiedExpr = _Expressions.replaceVariables(uid,key,value);

    if(findLetters.test(modifiedExpr))
    {
        res.status(200).send({"result":"Variable replaced."});
    }
    else
    {
        let result = _Expressions.solve(modifiedExpr);
        res.status(200).send({"result":result});
    }
});


module.exports = router;