// Aqui serão exportadas as funções que irão ser usadas

export function signIn(emailLog, passLog) {
  firebase
    .auth()
    .signInWithEmailAndPassword(emailLog, passLog)
    .then(function (result) {
      var user = result.user;
      window.location.hash = "#logar";
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessege = error.message;
      alert("Não é um email válido");
    });
}
export function createUser(emailUser, passUser, nameUser) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(emailUser, passUser)

    .then((data) => {
      const users = firebase.firestore().collection("users");
      users.doc(data.user.uid).set({
        id_user: data.user.uid,
        email: emailUser,
        displayName: nameUser,
      });
      var user = firebase.auth().currentUser;

      user
        .updateProfile({
          displayName: nameUser,
        })
        .then(function () {})
        .catch(function (error) {});

      alert("Conta criada com sucesso");
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessege = error.message;
      alert("Não é um email válido");
    });
}

export function userGoogle () {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
    var token = result.credential.accessToken;
    var user = result.user;
    window.location.hash = '#logar';
    }).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
}
export const newPost = (text, name, uid) => {
  firebase
    .firestore()
    .collection("posts")
    .add({
      name: firebase.auth().currentUser.displayName,
      uid: firebase.auth().currentUser.uid,
      text: text,
      date: new Date().toLocaleString("pt-BR"),
      likes: [],
      comments: [],
    })
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
};
export const editPrivate = (postId, privatePost) => {
    firebase.firestore().collection('posts').doc(postId).update({
      privacy: privatePost,
    });
  };
  
export const feedPosts = (callback) => {
  firebase
    .firestore()
    .collection("posts")
    .orderBy("date", "desc")
    .onSnapshot(function (querySnapshot) {
      var drinks = [];
      querySnapshot.forEach(function (doc) {
        drinks.push({ ...doc.data(), id: doc.id });
      });
      callback(drinks);
    });
};
export const checkLikesLength = async (idPost) => {
  const post = await firebase.firestore().collection("posts").doc(idPost).get().then((data) =>
      data.data().likes.includes(firebase.auth().currentUser.uid)
    );
  return post;
};
export const updateLikes = async (idPost) => {
  const previouslyLikesLength = await checkLikesLength(idPost);
  if (!previouslyLikesLength) {
    firebase
      .firestore()
      .collection("posts")
      .doc(idPost)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(
          firebase.auth().currentUser.uid
        ),
      });
  } else if (previouslyLikesLength) {
    firebase
      .firestore()
      .collection("posts")
      .doc(idPost)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(
          firebase.auth().currentUser.uid
        ),
      });
  }
};
export const deletePost = (idDelete) => {
  firebase
    .firestore()
    .collection("posts")
    .doc(idDelete)
    .delete()
    .then(() => {});
};

export const editText = (idTxt, newText) => {
  firebase
    .firestore()
    .collection("posts")
    .doc(idTxt)
    .update(newText)
    .then(() => {});
};

export const feedPostsProfile = (func, postArea) => {
  firebase
    .firestore()
    .collection("posts")
    .orderBy("date", "desc")
    .onSnapshot(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        if (doc.data().uid === firebase.auth().currentUser.uid) {
          func(postArea, doc)
        }
      });
    });
};
