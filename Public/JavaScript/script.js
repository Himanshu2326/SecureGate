

console.log("Hello");

let Password = document.querySelector('#password');
let ConfirmPassword = document.querySelector('#exampleInputPassword1');

const CheckPassWord=()=>{


    if (ConfirmPassword.value === Password.value){
        return;
    }
    else{
        alert("Password Not Matching");
    }

}