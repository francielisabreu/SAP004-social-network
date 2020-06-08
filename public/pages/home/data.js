// Aqui serão exportadas as funções que irão ser usadas

//export const greeting = name => `Oi ${name}! Que bom ver você aqui!`;

export function signIn (emailLog, passLog) { firebase.auth().singInWithEmailAndPassword(emailLog,
    passLog).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessege = error.message;
    alert('Não é um email válido')
    })
}

export function createUser (emailUser, passUser) {firebase.auth().createUserWithEmailAndPassword(emailUser,
        passUser).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessege = error.message;
        alert('Não é um email válido')
        })
    }

export function userFacebook() {
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
          var token = result.credential.accessToken;
          var user = result.user;
          }).catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
          })
      } 
      
export function userGoogle () {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
    var token = result.credential.accessToken;
    var user = result.user;
    }).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
    })
}    

 
