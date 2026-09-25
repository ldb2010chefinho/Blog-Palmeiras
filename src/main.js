//Passo 2 - Declaração da variáveis
//Passo 3 - Criar uma função para acessar o HTML
function getElement(seletor) {
    const elemento = document.querySelector(seletor);
    if (!elemento) {
        throw new Error(`Elemento não encontrado: ${seletor}`);
    }
    return elemento;
}
//Passo 4 - Referenciar os elementos HTML
const forms = getElement("#postForm");
const titulo = getElement("#nomeTitulo");
const conteudo = getElement("#escreverConteudo");
const categoria = getElement("#Btn-Publicar");
const filtrarCategoria = getElement("#FiltrarCategoria");
const divArtigo = getElement("#divArtigo");
//Passo 5 - Armazenar as informações dos posts
const posts = [];
//Função para adicionar novo artigo
function adicionarArtigo(adicionarTitulo, adicionarConteudo, adicionarCategoria) { }
//Passo 6 - Detectar o envio do formulário
forms.addEventListener("submit", function (event) {
    event.preventDefault();
    const postTitulo = titulo.value.trim();
    let postConteudo = conteudo.value.trim();
    let postCategoria = categoria.value;
    if (!postTitulo && !postConteudo)
        return;
    const post = {
        postTitulo,
        postConteudo,
        postCategoria
    };
    posts.push(post);
    renderizarPost();
});
//Passo 7 - Renderização do post
function renderizarPost() {
    const categoriaSelecionada = filtrarCategoria.value;
    divArtigo.innerHTML = "";
    const filtroPosts = posts.filter((post) => {
        return (categoriaSelecionada === "Outros" ||
            post.postCategoria === categoriaSelecionada);
    });
    console.log(categoriaSelecionada);
}
