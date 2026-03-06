/* -------------------------- Login Form ------------------------- */

document.getElementById("login-btn")
    .addEventListener("click", function (event) {

        // console.log('btn clicked')
        event.preventDefault();

        // step-1: get the user name input
        const userInput = document.getElementById("input-user");
        const userName = userInput.value;

        // step-2: get the pass input
        const passInput = document.getElementById("input-pass");
        const pass = passInput.value;

        // step-3: metch user & pass 
        if (userName === "admin" && pass === "admin123") {
            // step-3.1 if true::alert::>all-issues page
            alert("login Success");
            window.location.assign("./all-issues.html");
        } else {
            // step-3.2 if false::alert::>return
            alert("login Failed");
            setTimeout(() => {
                window.location.reload();
            }, 100);
        }
    })