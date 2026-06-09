let courses =
JSON.parse(localStorage.getItem("courses")) || [];

renderCourses();

function addCourse(){

const code =
document.getElementById("courseCode").value;

const unit =
Number(document.getElementById("creditUnit").value);

const grade =
Number(document.getElementById("grade").value);

if(!code || !unit || grade === ""){
alert("Fill all fields");
return;
}

courses.push({
code,
unit,
grade
});

saveData();
renderCourses();

document.getElementById("courseCode").value="";
document.getElementById("creditUnit").value="";
document.getElementById("grade").value="";
}

function renderCourses(){

const table =
document.getElementById("courseTable");

table.innerHTML="";

courses.forEach((course,index)=>{

const row=`
<tr>
<td>${course.code}</td>
<td>${course.unit}</td>
<td>${gradeLetter(course.grade)}</td>
<td>${course.unit*course.grade}</td>
<td>
<button
class="delete-btn"
onclick="deleteCourse(${index})">
Delete
</button>
</td>
</tr>
`;

table.innerHTML += row;

});

calculateGPA();
}

function deleteCourse(index){
courses.splice(index,1);
saveData();
renderCourses();
}

function gradeLetter(point){

switch(point){
case 5:return "A";
case 4:return "B";
case 3:return "C";
case 2:return "D";
case 1:return "E";
default:return "F";
}

}

function calculateGPA(){

let totalUnits=0;
let totalPoints=0;

courses.forEach(course=>{

totalUnits += course.unit;
totalPoints +=
course.unit*course.grade;

});

let gpa =
totalUnits
?
(totalPoints/totalUnits).toFixed(2)
:
0;

document.getElementById("gpa")
.innerText=gpa;
}

function calculateCGPA(){

let previousUnits =
Number(document.getElementById("previousUnits").value);

let previousPoints =
Number(document.getElementById("previousPoints").value);

let currentUnits=0;
let currentPoints=0;

courses.forEach(course=>{

currentUnits += course.unit;

currentPoints +=
course.unit*course.grade;

});

let cgpa =
(
(previousPoints+currentPoints)
/
(previousUnits+currentUnits)
).toFixed(2);

document.getElementById("cgpa")
.innerText=cgpa;
}

function saveData(){

localStorage.setItem(
"courses",
JSON.stringify(courses)
);

}

const themeToggle =
document.getElementById("themeToggle");

themeToggle.addEventListener("click",()=>{

document.body.classList.toggle("dark");

localStorage.setItem(
"theme",
document.body.classList.contains("dark")
);

});

if(localStorage.getItem("theme")==="true"){
document.body.classList.add("dark");
}