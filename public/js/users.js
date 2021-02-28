window.addEventListener('load', function(e){

    let userArray = [];
    
    const users = fetch('server/api/v1/employees')
    .then((resp) => users.json())

    console.log(users)
})