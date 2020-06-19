// Aqui serão exportadas as funções que irão ser usadas

export function signIn (emailLog, passLog) { firebase.auth().signInWithEmailAndPassword(emailLog,
    passLog)
    .then(function(result){
        var user = result.user;
        window.location.hash = '#logar';
    })
    .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessege = error.message;
    alert('Não é um email válido')
    })
}
export function createUser (emailUser, passUser, nameUser) {
        firebase.auth().createUserWithEmailAndPassword(emailUser,
        passUser)
        
        .then(data =>{
            const users = firebase.firestore().collection('users');
            users.doc(data.user.uid).set({
                id_user: data.user.uid,
                email: emailUser,
                displayName: nameUser,
                
            });
            var user = firebase.auth().currentUser;

            user.updateProfile({
            displayName: nameUser,
            }).then(function() {
            }).catch(function(error) {
            });
            
            alert('Conta criada com sucesso')          
        })
        .catch(function(error) {
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
export const newPost = (text, name) => {
    firebase.firestore().collection("posts").add({
        name: firebase.auth().currentUser.displayName,
        uid: firebase.auth().currentUser.uid,
        text: text,
        date: new Date().toLocaleString('pt-BR'),
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
    firebase.firestore().collection('posts')
    .onSnapshot(function(querySnapshot) {
        var drinks = [];
        querySnapshot.forEach(function(doc) {
        drinks.push({...doc.data(), id:doc.id});
        });
        callback(drinks)
    });
}
export const updateLikes = (idPost) => {
    firebase.firestore().collection('posts').doc(idPost).update({likes:firebase.firestore.FieldValue.increment(1)})
}

