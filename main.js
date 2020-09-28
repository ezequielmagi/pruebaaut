//signUp event
const signupform = document.querySelector("#signup-form");

signupform.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.querySelector("#signup-email").value;
  const Password = document.querySelector("#signup-password").value;
  // console.log(signupEmail, signupPassword);
  auth
    .createUserWithEmailAndPassword(email, Password)
    .then((userCredential) => {
      signupform.reset();
      $("#signupModal").modal("hide");
      console.log("sign up");
    });
});

//signin

const signinForm = document.querySelector("#loginform");

signinForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.querySelector("#login-email").value;
  const Password = document.querySelector("#login-password").value;
  // console.log(email, Password);
  auth.signInWithEmailAndPassword(email, Password).then((userCredential) => {
    loginform.reset();
    $("#signinModal").modal("hide");
    console.log("sign in");
  });
});
