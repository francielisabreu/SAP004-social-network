export function signIn(emailLog, passLog) {
  firebase
    .auth()
    .singInWithEmailAndPassword(emailLog, passLog)
    .catch(function (error) {
      let errorCode = error.code;
      let errorMessege = error.message;
      alert("Não é um email válido");
    });
}

export function createUser(emailUser, passUser) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(emailUser, passUser)
    .catch(function (error) {
      let errorCode = error.code;
      let errorMessege = error.message;
      alert("Não é um email válido");
    });
}

export function userGoogle() {
  let provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      let token = result.credential.accessToken;
      let user = result.user;
    })
    .catch(function (error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      let email = error.email;
      let credential = error.credential;
    });
}

export function userFacebook() {
  let provider = new firebase.auth.FacebookAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      let token = result.credential.accessToken;
      let user = result.user;
    })
    .catch(function (error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      let email = error.email;
      let credential = error.credential;
    });
}
