# Project Name
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

`https://algebra-microservice.herokuapp.com/getAll` <- *Returns all expressions with corresponding expressions UID*
`https://algebra-microservice.herokuapp.com/setExpression?expr=(5*4+3*2)-x` <- *Saves an expression and returns a generated UID*
`https://algebra-microservice.herokuapp.com/substituteVariable?key=x&value=1&uid=E47` <- *Sets value for variable for specific expression*

### Use in IDE

`npm Start`

### Testing
`npm test`

NOTE: For testing purposes added a default expression with UID E00
```
{
    "uid":"E00",
    "expr":"1+x"
}
```