import { signIn, createUser, userGoogle, userFacebook } from "./data.js";
export const home = () => {
  const container = document.createElement("div");
  const startLogIn = `
    <h2 class="description">Seja Bem Vinda!</h2>
    <form class="form" action="#" method="POST">
    
        <label class="label-input">
          <i class="fas fa-at icon-modify"></i>
          <input id="lgn-email" type="email" placeholder="Email" title="Email" autocomplete="off" autofocus/>
        </label>

        <label class="label-input">
          <i class="fas fa-lock icon-modify"></i>
          <input id="lgn-pass" type="password" placeholder="Password" title="Password" autocomplete="off" autofocus/>
        </label>

        <button id="lgn-btn" class="btn btn-login" name="login" type="submit">
          Entrar
        </button>
        <button id="out-btn" class="btn btn-login" name="logout" type="submit">
          Sair
        </button>
      </form>
      <h2 class="description">Ou entre com...</h2>
      <section class="social-media">
        <ul class="list-social-media">
          <a class="link-social-media" href="#">
            <li class="item-social-media">
              <i id='btn-facebook' class="fab fa-facebook-f"></i>
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

  const emailLog = container.querySelector("#lgn-email");
  const passLog = container.querySelector("#lgn-pass");
  const btnStart = container.querySelector("#lgn-btn");
  const btnEnd = container.querySelector("#out-btn");
  const btnGoogle = container.querySelector("#btn-google");
  const btnFacebook = container.querySelector("#btn-facebook");

  btnGoogle.addEventListener("click", () => userGoogle());
  btnFacebook.addEventListener("click", () => userFacebook());
  btnStart.addEventListener("click", () =>
    signIn(emailLog.value, passLog.value)
  );

  btnEnd.addEventListener("click", () => {
    firebase.auth().signOut();
  });

  firebase.auth().onAuthStateChanged((firebaseUser) => {
    if (firebaseUser) {
      console.log("usuário está conectado");
    } else {
      console.log("Nenhum usuário está conectado");
    }
  });

  return container;
};

export const register = () => {
  const registerContainer = document.createElement("div");
  const createRegister = `
  
    <h2 class="description">Crie uma conta</h2>
    <form class="form"action="">
      <label class="label-input" for="input-name">
      <i class="fas fa-user-circle icon-modify"></i>
      <input id="crt-name" type="text" placeholder="Nome" />
      </label>

      <label class="label-input" for="input-email">
      <i class="fas fa-at icon-modify"></i>
      <input id="crt-email" type="text" placeholder="E-mail"/>
      </label>

      <label class="label-input" for="input-pass">
      <i class="fas fa-lock icon-modify"></i>
      <input class="input-start" id="crt-pass" type="password" placeholder="Password"
      autocomplete="off"/>
      </label>

      <input type="reset" id="reset-login" name="limpar" value="Limpar"> 
      <button id="crt-login" class="btn btn-login">Criar</button>
    </form>
    <a class=" description cadastre" href="#home"> Voltar </a>
   
     
    `;
  registerContainer.innerHTML = createRegister;

  const emailUser = registerContainer.querySelector("#crt-email");
  const passUser = registerContainer.querySelector("#crt-pass");
  const btnLogin = registerContainer.querySelector("#crt-login");

  btnLogin.addEventListener("click", () =>
    createUser(emailUser.value, passUser.value)
  );
  return registerContainer;
};
