$(document).ready(() => {

    const currentStudent = SDK.Student.currentStudent();

    $(".page-header").html(`
    <h1>Hej, ${currentStudent.firstName} ${currentStudent.lastName}</h1>
  `);

    $(".profile-info").html(`
    <dl>
        <dt>Email</dt>
        <dd>${currentStudent.email}</dd>
     </dl>
  `);


    
});