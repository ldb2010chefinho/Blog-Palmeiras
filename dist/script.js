function getElement(seletor) {
    const elemento = document.querySelector(seletor);
    if (!elemento) {
        throw new Error(`Elemento não encontrado: ${seletor}`);
    }
    return elemento;
}
const forms = getElement("#postForm");
const titulo = getElement("#nomeTitulo");
const conteudo = getElement("#escreverConteudo");
const categoria = getElement("#categoriaConteudo");
const filtrarCategoria = getElement("#filtrarCategoriaInput");
const divArtigo = getElement("#divArtigo");
const inputImagem = getElement("#foto");
const posts = [];
forms.addEventListener("submit", function (event) {
    event.preventDefault();
    const postTitulo = titulo.value.trim();
    const postConteudo = conteudo.value.trim();
    const postCategoria = categoria.value;
    const postImagem = inputImagem.files?.[0];
    if (!postTitulo || !postConteudo || !postImagem)
        return;
    const post = {
        postTitulo,
        postConteudo,
        postCategoria,
        postImagem
    };
    posts.push(post);
    renderizarPost();
    forms.reset();
});
function renderizarPost() {
    const categoriaSelecionada = filtrarCategoria.value.trim();
    divArtigo.innerHTML = "";
    const filtroPosts = posts.filter((post) => {
        return categoriaSelecionada === "" || post.postCategoria === categoriaSelecionada;
    });
    filtroPosts.forEach((post) => {
        const postDiv = document.createElement('div');
        postDiv.className = 'post';
        const elementoTitulo = document.createElement('h3');
        elementoTitulo.textContent = post.postTitulo;
        const elementoContudo = document.createElement('p');
        elementoContudo.textContent = post.postConteudo;
        const elementoCategoria = document.createElement('p');
        elementoCategoria.className = "categoria";
        elementoCategoria.textContent = `Categoria: ${post.postCategoria}`;
        const elementoImagem = document.createElement('img');
        elementoImagem.className = "imgPost";
        elementoImagem.src = URL.createObjectURL(post.postImagem);
        postDiv.appendChild(elementoTitulo);
        postDiv.appendChild(elementoContudo);
        postDiv.appendChild(elementoCategoria);
        postDiv.appendChild(elementoImagem);
        divArtigo.appendChild(postDiv);
    });
}
filtrarCategoria.addEventListener("input", () => {
    renderizarPost();
});
export {};
//# sourceMappingURL=script.js.map