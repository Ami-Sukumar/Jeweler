
const jsonData = require('./data.json');


// console.log(jsonData.title);
// console.log(jsonData.discription);   

application.get('/', (req,res) => {
    // res.send('Hello,World!') ;

    res.send(" The product name is "+ DataTransfer.name)
});