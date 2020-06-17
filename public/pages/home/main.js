// Aqui serão criados os eventos de Manipulação de DOM e templates
import { signIn, createUser, userFacebook, userGoogle, newPost, feedPosts} from './data.js';
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

const nameUser = registerContainer.querySelector('#crt-name')  
const emailUser = registerContainer.querySelector('#crt-email')
const passUser = registerContainer.querySelector('#crt-pass')
const btnLogin = registerContainer.querySelector('#crt-login')

btnLogin.addEventListener('click', (event) => {
  event.preventDefault();
  createUser(emailUser.value, passUser.value, nameUser.value)
  })

  
  return registerContainer;
};

export const feed = () => {
  const divFeed = document.createElement('div');
  const createFeed = `
    <nav id="nav">
      <div class="logo">
        <a href="">
          <img
            src="imagens/bardelas-icon.png"
            alt="Bardelas"
            title="Bardelas"
          />
        </a>
      </div>
      <ul class="nav-links">
        <li>
          <a href="#"><strong>Maria</strong> <i class="fas fa-caret-down"></i></a>
        </li>
        <li>
          <a id="end-btn" href="#">Sair <i class="fas fa-sign-out-alt"></i></a>
        </li>
      </ul>
      <div class="menu-burguer">
        <div class="line1"></div>
        <div class="line2"></div>
        <div class="line3"></div>
      </div>
    </nav>
    <main class="main">
      <div class="newPost">
        <div class="infoUser">
          <div class="imgUser"></div>
          <strong class="nameUser">Maria</strong>
        </div>
        <form class="formPost" action="#" method="POST">
          <textarea
            name="textearea"
            id="wrt-post"
            placeholder="Compartilhe as suas bebidas favoritas aqui!"
          ></textarea>
          <div class="iconButtons">
            <div class="icons">
              <button type="button"class="btnFileForm" title="upload de imagem">
                <i class="fas fa-image "></i>
              </button>
              <button  type="button" class="btnFileForm" title="post privado">
                <i class="fas fa-user-lock"></i>
              </button>
            </div>
            <button id="btn-pst" type="submit" class="btnSubmit">Publicar</button>
          </div>
        </form>
      </div>
      </main>
      <div id="all-posts"></div>
  `;
  divFeed.innerHTML = createFeed;

  const postDrinks = (posts, likes) => {
    const postFeed = `
    <main class="main">
      <ul class="posts">
          <li class="post">
          <div class="infoUserPost">
            <div class="imgUserPost"></div>
            <div class="nameAndHour">
              <strong class="nameUser">Maria</strong>
              <p class="hourPost">21h</p>
            </div>
          </div>
          <p class="comentUser">
            ${posts.text}
          </p>
          <div class="actionBtnPost">
            <button type="button" id="btn-like" class="btnreaction like"><i class="fas fa-heart iconPost" title="Curtir"></i> ${posts.like} </button>
            <button type="button" class="btnreaction coments" title="Comentar"><i class="fas fa-comments iconPost"></i> </button>
            <button type="button" class="btnreaction edit" title="Editar"> <i class="fas fa-edit iconPost"></i> </button>
            <button type="button" class="btnreaction delete" title="Excluir"> <i class="fas fa-trash-alt iconPost"></i> </button>
          </div>
          <button type="submit"></button>
          </li>
        </ul>
      </div>
    </main>
    `;

    return postFeed;
  }

  const postText = divFeed.querySelector('#wrt-post')
  const postBtn = divFeed.querySelector('#btn-pst')
  const postArea = divFeed.querySelector('#all-posts')
  const btnSair = divFeed.querySelector('#end-btn')

  btnSair.addEventListener('click', ()=> {
    firebase.auth().signOut();
  })

  window.addEventListener('load', ()=> {
    postArea.innerHTML = feedPosts(textDrinks);
  })

  postBtn.addEventListener('click', (event) =>{
    event.preventDefault();
    newPost(postText.value);
    feedPosts(textDrinks);
  })

  const textDrinks = (arrayDrinks) => {
    postArea.innerHTML = arrayDrinks.map
    (posts => postDrinks(posts)).join('');
    // const btnLike = document.querySelector('.like');
    // btnLike.addEventListener('click', (event) =>{
    //   event.preventDefault();
    //   const countLike = newPost(likes.value)+1;
    //   console.log(countLike)
    // })
  } 

  return divFeed
};