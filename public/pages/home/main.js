// Aqui serão criados os eventos de Manipulação de DOM e templates
import { signIn, createUser, userFacebook, userGoogle, newPost, feedPosts} from './data.js';
//import { greeting } from './firebase.js';
export const home = () => {
  const container = document.createElement('div');
  const startLogIn = `
    <section class="page-login">
      <div class="img-page-login">
        <img src="imagens/img_site_start_transparente-oficial.svg" alt="" 
        maxwidth="300"
        height="150"/>
      </div>
      <div class="logo-bardelas">
        <img
          src="imagens/bardelas-logo.svg"
          alt=""
          title="Bardelas"
          maxwidth="100"
          height="45"
        />
      </div>
    </section>
    <h2 class="description">Seja Bem Vinda!</h2>
    <form class="form" action="#" method="POST">
        <label class="label-input" for="">
          <i class="fas fa-at icon-modify"></i>
          <input id="lgn-email" type="email" placeholder="Email" title="Email" />
        </label>

        <label class="label-input" for="">
        <i class="fas fa-lock icon-modify"></i>
        <input id="lgn-pass" type="password" placeholder="Password" title="Password" />
        </label>
        <button id="lgn-btn" class="btn btn-login" name="login" type="submit" autofocus>
        Entrar
        </button>
        <button id="out-btn" class="btn btn-login" name="logout" type="submit" autofocus>
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

  const emailLog = container.querySelector('#lgn-email')
  const passLog = container.querySelector('#lgn-pass')
  const btnStart = container.querySelector('#lgn-btn')
  const btnEnd = container.querySelector('#out-btn')
  const btnFacebook = container.querySelector("#btn-facebook")
  const btnGoogle = container.querySelector('#btn-google')

btnStart.addEventListener('click', (event) => {
  event.preventDefault();
  signIn(emailLog.value, passLog.value)
})

btnFacebook.addEventListener('click', () => userFacebook())
btnGoogle.addEventListener('click', ()=> userGoogle())

btnEnd.addEventListener('click', ()=> {
  firebase.auth().signOut();
})

firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    console.log("usuário está conectado");
  } else {
    console.log("Nenhum usuário está conectado");
  }
})
  return container;
};

export const register = () => {
  const registerContainer = document.createElement('div');
  const createRegister = `
  <section class="page-login">
    <div class="img-page-login">
      <img src="imagens/img_site_start_transparente-oficial.svg" alt="" 
      maxwidth="300"
      height="150"/>
    </div>
    <div class="logo-bardelas">
      <img
        src="imagens/bardelas-logo.svg"
        alt=""
        title="Bardelas"
        maxwidth="100"
        height="45"
      />
    </div>
  </section>
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

const emailUser = registerContainer.querySelector('#crt-email')
const passUser = registerContainer.querySelector('#crt-pass')
const btnLogin = registerContainer.querySelector('#crt-login')

btnLogin.addEventListener('click', () => 
createUser(emailUser.value, passUser.value)
)
  
  return registerContainer;
};

export const feed = () => {
  const divFeed = document.createElement('div');
  const createFeed = `
  <header class="header-bg">      
    <nav class="menu-nav">
      <ul>
        <li>
          <a href="#" role="button" aria-pressed="true">Maria</a>
        </li>
        <li>
          <a href="#" class="menu-logo">
          <img src="imagens/bardelas-logo.svg" alt="logo Bardelas" title="Bardelas" > 
          </a>
        </li>
        <li>
          <a href="#" role="button" aria-pressed="true">Encerrar Sessão</a>
        </li>
      </ul>      
  </header>

    <main class="main">
      <!-----formulario de postagem----->
      <div class="newPost"> 
        <div class="infoUser">
          <div class="imgUser"></div> 
            <strong>Maria</strong>
        </div>        
          <form class="formPost">      
            <textarea id="wrt-post" class="textarea-form"type="text" placeholder="Diga o seu drink  favorito"   autocomplete="off"  maxlength="200" spellcheck="true" 
            resize="none"> 
            </textarea> 

            <div class="iconsAndButton">
              <div class="icons">
                <input type="file" name="upload" accept="jpeg"/>
                <img src="imagens/img-feed.svg" alt="adicionar imagem">
              </div>
            <button type="submit" id="btn-pst" class="btnForm btn-feed"> Compartilhar </button>
            </div>   
          </form>
      </div>
    </main>
    <div id="all-posts"></div>
  `;

  divFeed.innerHTML = createFeed;

  const postText = divFeed.querySelector('#wrt-post')
  const postBtn = divFeed.querySelector('#btn-pst')
  const postArea = divFeed.querySelector('#all-posts')

  postBtn.addEventListener('click', (event) =>{
    event.preventDefault();
    newPost(postText.value);
    postArea.innerHTML = ''; 
    feedPosts(postDrinks);
  })

  const postDrinks = (arrayDrinks) => {
    postArea.innerHTML = arrayDrinks.map(posts => `<p>${posts.text}</p>`).join('')
  }

      return divFeed
};