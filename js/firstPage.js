//Udviklet med udgangspunkt i Jesper Bruun Hansens repo: https://github.com/Distribuerede-Systemer-2017/javascript-client/
//Branch: Master, exercise & solution

$(document).ready(() => {

    $currentStudent = $("#current-stud");

    SDK.Student.getCurrentStudent((cb, currentStudent) => {
        currentStudent = JSON.parse(currentStudent);

        console.log(currentStudent.firstName);

        const currentStudentHtml = `
        <div> Velkommen </div>
        <br/>
        </div>${currentStudent.firstName}</div>
        `;

        $currentStudent.append(currentStudentHtml);
    });

});
