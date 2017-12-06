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
