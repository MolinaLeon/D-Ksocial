$(document).ready(() => {

    const getCurrentStudent = SDK.Student.getCurrentStudent();

    $(".page-header").html(`
    <h1>Hej, ${getCurrentStudent.regFirstName} ${getCurrentStudent.regLastName}</h1>
  `);

    $(".profile-info").html(`
    <dl>
        <dt>Email</dt>
        <dd>${getCurrentStudent.regFirstName}</dd>
     </dl>
  `);


    
});