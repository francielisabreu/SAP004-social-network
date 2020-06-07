// Aqui serão criados os eventos de Manipulação de DOM e templates
import { signIn, createUser, userGoogle } from './data.js';
//import { greeting } from './firebase.js';
export const home = () => {
  const container = document.createElement('div');
  const startLogIn = `
    <h2 class="description">Seja Bem Vinda!</h2>
    <form class="form" action="#" method="POST">
        <label class="label-input" for="">
          <i class="fas fa-at icon-modify"></i>
          <input id="lgn-email" type="email" placeholder="Email" title="Email" />
        </label>

        <label class="label-input" for="">
          <i class="fas fa-eye icon-modify"></i>
          <input id="lgn-pass" type="password" placeholder="Password" title="Password" />
        </label>
        <button id="lgn-btn" class="btn btn-login" name="login" type="submit" autofocus>
        <a class="link-social-media" href="#logar">Entrar</a>
        </button>
        <button id="out-btn" class="btn btn-login" name="logout" type="submit" autofocus>
          Sair
        </button>
      </form>
      
      <section class="social-media">
        <ul class="list-social-media">
          <a class="link-social-media" href="#">
            <li class="item-social-media">
              <i class="fab fa-facebook-f"></i>
            </li>
          </a>
          <a class="link-social-media" href="#">
            <li class="item-social-media">
              <i id='btn-google' class="fab fa-google"></i>
            </li>
          </a>
        </ul>
      </section>
      <p class="description">
        Você não tem uma conta? <a class="cadastre" href="#crt"> Cadastre-se </a>
      </p>
    </section> `;
  container.innerHTML = startLogIn;

  const emailLog = container.querySelector('#lgn-email')
  const passLog = container.querySelector('#lgn-pass')
  const btnStart = container.querySelector('#lgn-btn')
  const btnEnd = container.querySelector('#out-btn')
  const btnGoogle = container.querySelector('#btn-google')

btnGoogle.addEventListener('click', ()=> 
userGoogle()
/* var provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().signInWithPopup(provider).then(function(result) {
  var token = result.credential.accessToken;
  var user = result.user;
}).catch(function(error) {
  var errorCode = error.code;
  var errorMessage = error.message;
  var email = error.email;
  var credential = error.credential;
}) */
)

btnStart.addEventListener('click', () => 
  signIn(emailLog.value, passLog.value)
)
  
btnEnd.addEventListener('click', ()=> {
  firebase.auth().signOut();
})

firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    console.log(firebaseUser);
  } else {
    console.log('not logged in')
  }
})
  return container;
};

export const register = () => {
  const registerContainer = document.createElement('div');
  const createRegister = `
  <a class="cadastre" href="#home"> Voltar </a>
    <h2>Crie uma conta</h2>
    <form action="">
      <label class="label-input" for="input-name"></label>
      <input id="crt-name" type="text" placeholder="Nome" />
      <label class="label-input" for="input-email"></label>
      <input id="crt-email" type="text" placeholder="E-mail" />
      <label class="label-input" for="input-pass"></label>
      <input
      class="input-start"
      id="crt-pass"
      type="password"
      placeholder="Password"
      />
    </form>
    <button id="crt-login" class="btn btn-login">Criar</button>
    `;
  registerContainer.innerHTML = createRegister;

const emailUser = registerContainer.querySelector('#crt-email')
const passUser = registerContainer.querySelector('#crt-pass')
const btnLogin = registerContainer.querySelector('#crt-login')
const btnOut = registerContainer.querySelector('#out')


btnLogin.addEventListener('click', () => 
createUser(emailUser.value, passUser.value)
)
  
  return registerContainer;
};
export const feed = () => {
// colocar feed no body
      `<header class="profile-bar">
        <img src="assets/images/bardelas-icon.png" alt="pardelas-perfil">
      </header>
      <section class="post"> 
        <label for=""></label>
        <input type="text" id="write-post" class="write-post" placeholder="Qual drink você gostaria de nos mostrar?">
        <label for="">Compartilhe conosco:</label>
        <input type="file" class="img-post" id="img" name="img" accept="image/*">
        <button class="btn-post"><a href="#feed">Postar</a></button>
      </section>
      <section class="feed">
        <img src="assets/images/foto-perfil.jpg" alt="perfil" class="foto-perfil">
        <p class="post-container">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem quia, temporibus dolorum suscipit.</p>
        <img src="assets/images/drink.jpg" alt="profile" class="foto-drink">
      </section>`
} 