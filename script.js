
const testing = { 
    nama : "hello",
    kelas : "world", 
    used : "hell yeah"
}; 
// this is for printing some
var template =  `name ${testing.nama} ` + "hello thing"; 
// this is template of array
var staff = ["50", "12"]
// this is for looping through the thing

let sum  = 0;
staff.forEach((index) => { 
    let thing = `thing ${index}`; 
    // document.writeln(`<h1>${thing}</h1>`)
});

// this is for add the eventlistener to button hell yeah 
document.getElementById("btn-submit").addEventListener("click", function(){
    var value = document.getElementById("input-user").value
    console.log(`this is your value : ${value}`)
    document.getElementById('hasil').innerHTML = `${value}`
    if(value !=-1){
        document.getElementById("input-user").value = ""
    }
});





// this is for using function 
// HasOwnProperty 





