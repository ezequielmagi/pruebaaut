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

//logout
const logout = document.querySelector("#logout");

logout.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    console.log("sing out");
  });
});

//Google Login
const googleButton = document.querySelector("#googleLogin");
googleButton.addEventListener("click", (e) => {
  // console.log("click google");
  const provider = new firebase.auth.GoogleAuthProvider();
  auth
    .signInWithPopup(provider)
    .then((result) => {
      console.log("Google sign in");
      signupform.reset();
      $("#signinModal").modal("hide");
    })
    .catch((err) => {
      console.log(err);
    });
});

//post
const postList = document.querySelector(".post");
const setupPost = (data) => {
  if (data.length) {
    let html = "";
    data.forEach((doc) => {
      const post = doc.data();
      console.log(post);
      const li = `
      <li class="list-group-item list-group-item-action">
        <h5>${post.title}</h5>
        <p>${post.description}</p>
      </li>
      `;
      html += li;
    });
    postList.innerHTML = html;
  } else {
    postList.innerHTML = "<p>Logeate para ver las publicaciones</p>";
  }
};
// events
//listar para usuarios autenticados
auth.onAuthStateChanged((user) => {
  if (user) {
    // console.log("auth: singin");
    fs.collection("post")
      .get()
      .then((snapshot) => {
        console.log(snapshot.docs);
        setupPost(snapshot.docs);
      });
  } else {
    setupPost([]);
  }
});
