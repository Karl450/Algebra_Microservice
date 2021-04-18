# Project Name
Project description.

### Requirements
* NodeJS
* NPM

### Installation
```
git clone url
cd PROJECT_NAME
npm i
```
### Usage
Start server using `npm start`

### Usage
`http://localhost:3000/getAll` <- *Returns all expressions with corresponding expressions UID*
`http://localhost:3000/setExpression?expr=(5*4+3*2)-x` <- *Saves an expression and returns a generated UID*
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