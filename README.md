# Algebra Microservice

Algebra Microservice project by Karl Nagribianko

This project was given to me by Jason Rudland.
 

### Requirements
* NodeJS
* NPM

### Installation
```
git clone url
cd PROJECT_NAME
npm i
```
### Use dirrectly within browser
NOTE: Heroku shut down automaticaly when is it no longer in use and data is not saved as a file but instead is saved as an object. So if server shutdown data will be lost.


*This link will return all the expressions with their unique id*
`https://algebra-microservice.herokuapp.com/getAll`

*This link will set an expression and will be given an unique id*
`https://algebra-microservice.herokuapp.com/setExpression?expr=(5*4+3*2)-x`

*This link will substitute the chosen expression and will return the result once all unknown variables are replace*
`https://algebra-microservice.herokuapp.com/substituteVariable?key=x&value=1&uid=E47`

### Use in IDE

`npm Start`

*This link will return all the expressions with their unique id*
`http://localhost:3000/getAll`

*This link will set an expression and will be given an unique id*
`http://localhost:3000/setExpression?expr=(5*4+3*2)-x`

*This link will substitute the chosen expression and will return the result once all unknown variables are replace*
`http://localhost:3000/substituteVariable?key=x&value=1&uid=E47` <- *Sets value for variable for specific expression*

### Testing
`npm test`

NOTE: For testing purposes added a default expression with UID E00
```
{
    "uid":"E00",
    "expr":"1+x"
}
```