// Aqui serão criados os eventos de Manipulação de DOM e templates
//import { greeting } from './data.js';
//import { greeting } from './firebase.js';
export const home = () => {
  const container = document.createElement('div');
  const startLogIn = `
    <h2 class="welcome">Seja Bem Vinda!</h2>
    <form action="">
      <label class="label-input" for="input-email"></label>
      <input id="input-email" type="text" placeholder="E-mail" />
      <label class="label-input" for="input-pass"></label>
      <input
       class="input-start"
       id="input-pass"
       type="password"
       placeholder="Password"
      />
      <button id="login" class="btn btn-primary">Login</button>
    </form>
    <p>Ou deseja ingressar com...<a href="#crt" class="resgister">Registrar-se</a></p> `;
  container.innerHTML = startLogIn;
  return container;
};



export const register = () => {
  const registerContainer = document.createElement('div');
  const createRegister = `
    <h2>Crie uma conta</h2>
    <form action="">
      <label class="label-input" for="input-name"></label>
      <input id="crt-name" type="text" placeholder="Nome" />
      <label class="label-input" for="input-email"></label>
      <input id="crt-email" type="text" placeholder="E-mail" />
      <label class="label-input" for="input-pass"></label>
      <input
       class="input-start"
       id="input-pass"
       type="password"
       placeholder="Password"
      />
      <button id="crt-login" class="btn btn-primary">Login</button>
      <button id="out" class="btn btn-primary">Sair</button>
    </form> `;
  registerContainer.innerHTML = createRegister;

  const emailUser = registerContainer.querySelector('#crt-email')
  const passUser = registerContainer.querySelector('#crt-pass')
  const btnLogin = registerContainer.querySelector('#crt-login')

  btnLogin.addEventListener('click', function() {
    firebase.auth().createUserWithEmailAndPassword(emailUser.value, 
    passUser.value).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessege = error.message;
      alert('Não é um email válido')
      })
  })
  
  return registerContainer;
};

/* const emailUser = registerContainer.querySelector('#crt-email')
const passUser = registerContainer.querySelector('#crt-pass')
const btnLogin = registerContainer.querySelector('#crt-login')

btnLogin.addEventListener('click', e => {
  const email = emailUser.value;
  const pass = passUser.value;
  const auth = firebase.auth();
  const promise = auth.createUserWithEmailAndPassword(email, pass);
  promise
  /* .then(user => console.log(user))  */
/* .catch(e => console.log(e.message))
});

firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    console.log(firebaseUser);
  } else {
    console.log('not logged in')
  }
})   */

 /*  const name = container.querySelector('#name');
  const greetingBtn = container.querySelector('#greeting-btn');
  const greetingMessage = container.querySelector('#greeting-message');

  greetingBtn.addEventListener('click', (event) => {
    event.preventDefault();
    greetingMessage.innerHTML = greeting(name.value);
  });

  return container;
};
 */
 

