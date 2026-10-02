function add(x,y){
    return x + y;
}
function sub(x,y){
    return x - y;
}
//exporting of the module ;-> 
//module.exports = add;
//module.exports = sub;//overwrites the module

module.exports = {add, sub};

// comstomized name passing 
// module.exports = {
//     addfun : add,
//     subFun : sub
// }
//no function name passed from here because it has no function name here 
// anonymous fun 
// in this case there will be no overwritting (you can pass multiple function like this)
// exports.add1 = (a, b) => a+b
// exports.sub1 = (a, b) => a-b