const  _Expressions = require('../utils/expressions');

module.exports = {
    validateExpressionURL(req,res,next) {
        const rgxValidate = /[^xyzXYZ0-9\+\-\*\/\(\)\s]/;

        if(req.query.expr == undefined) return res.status(404).send({"Error":"Expression not found"});
        if(req.query.expr.match(rgxValidate)) return res.status(422).send({"Error":`Invalid Expression`});

        next();
    },

    validateSubstituteURL(req,res,next) {

        const {key, value, uid} = req.query;
        const rgxKeyValidate = /[xyzXYZ]/;
        const rgxValueValidate = /[0-9]/;
        const rgxUIDValidate = /E{1}\d{1,2}/;
        const existingExpr = _Expressions.ExpressionList.filter( (expr) => { return expr.uid == uid; });
    
        if(key == undefined) return res.status(404).send({"Error":`key Not found`});
        if(!rgxKeyValidate.test(key)) return res.status(422).send({"Error":`Invalid Key`});
    
        if(value == undefined) return res.status(404).send({"Error":`val Not found`});
        if(!rgxValueValidate.test(value)) return res.status(422).send({"Error":`Invalid Value`});
    
        if(uid == undefined) return res.status(404).send({"Error":`uid Not found`});
        if(!rgxUIDValidate.test(uid)) return res.status(422).send({"Error":`Invalid UID`});

        if(existingExpr == '') return res.status(422).send({"Error":`UID deosnt exist`});
        if(existingExpr[0].expr.indexOf(key) < 1) return res.status(422).send({"Error":`Key doesn\'t exist in expression`});

        next();
    }
}