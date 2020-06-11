// Aqui serão exportadas as funções que irão ser usadas

export function signIn (emailLog, passLog, rootFeed) { firebase.auth().signInWithEmailAndPassword(emailLog,
    passLog)
    .then(function(result){
        var user = result.user;
        window.location.hash = rootFeed;
    })
    .catch(function(error) {
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

export const newPost = () => {
    firebase.firestore().collection("posts").add({
        user_name: '',
        text: text,
        likes: 0,
        comments: []
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

export const feedPosts = (callback) => {
    firebase.firestore().collection("posts")
    .onSnapshot(function(querySnapshot) {
        var drinks = [];
        querySnapshot.forEach(function(doc) {
        drinks.push(doc.data());
        });
        callback(drinks)
        //console.log("Current cities in CA: ", cities.join(", "));
    });
}

