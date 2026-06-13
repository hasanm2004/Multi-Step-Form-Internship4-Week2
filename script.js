const form = document.getElementById("multiStepForm");

const passwordInput = document.getElementById("password");

passwordInput.addEventListener("input", checkStrength);

loadEntries();

function nextStep(step){

if(step === 1){

const name = document.getElementById("name").value.trim();
const age = document.getElementById("age").value.trim();
const phone = document.getElementById("phone").value.trim();

const phoneRegex = /^03\d{9}$/;

if(name === ""){
alert("Enter Name");
return;
}

if(age < 18){
alert("Age must be 18+");
return;
}

if(!phoneRegex.test(phone)){
alert("Invalid Phone Number");
return;
}

document.getElementById("step1").classList.remove("active");
document.getElementById("step2").classList.add("active");
}

if(step === 2){

const email = document.getElementById("email").value.trim();
const password = document.getElementById("password").value;
const confirm = document.getElementById("confirmPassword").value;

const emailRegex =
/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(!emailRegex.test(email)){
alert("Invalid Email");
return;
}

if(password.length < 6){
alert("Password too weak");
return;
}

if(password !== confirm){
alert("Passwords do not match");
return;
}

document.getElementById("step2").classList.remove("active");
document.getElementById("step3").classList.add("active");

showSummary();
}
}

function prevStep(step){

if(step === 2){
document.getElementById("step2").classList.remove("active");
document.getElementById("step1").classList.add("active");
}

if(step === 3){
document.getElementById("step3").classList.remove("active");
document.getElementById("step2").classList.add("active");
}
}

function checkStrength(){

const password = passwordInput.value;
const strength = document.getElementById("strength");

if(password.length < 6){

strength.innerHTML = "Weak";

}
else if(password.length < 10){

strength.innerHTML = "Medium";

}
else{

strength.innerHTML = "Strong";

}
}

function showSummary(){

document.getElementById("summary").innerHTML = `
<p><strong>Name:</strong> ${name.value}</p>
<p><strong>Age:</strong> ${age.value}</p>
<p><strong>Phone:</strong> ${phone.value}</p>
<p><strong>Email:</strong> ${email.value}</p>
`;
}

form.addEventListener("submit", function(e){

e.preventDefault();

const userData = {

name: name.value,
age: age.value,
phone: phone.value,
email: email.value

};

let users =
JSON.parse(localStorage.getItem("users")) || [];

users.push(userData);

localStorage.setItem(
"users",
JSON.stringify(users)
);

alert("Registration Successful");

form.reset();

document.getElementById("step3").classList.remove("active");
document.getElementById("step1").classList.add("active");

loadEntries();

});

function loadEntries(){

let users =
JSON.parse(localStorage.getItem("users")) || [];

const tableBody =
document.getElementById("tableBody");

tableBody.innerHTML = "";

users.forEach((user,index)=>{

tableBody.innerHTML += `
<tr>
<td>${user.name}</td>
<td>${user.age}</td>
<td>${user.phone}</td>
<td>${user.email}</td>
<td>
<button class="delete-btn"
onclick="deleteEntry(${index})">
Delete
</button>
</td>
</tr>
`;

});
}

function deleteEntry(index){

let users =
JSON.parse(localStorage.getItem("users")) || [];

users.splice(index,1);

localStorage.setItem(
"users",
JSON.stringify(users)
);

loadEntries();
}