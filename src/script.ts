//Passo 2 - Declaração da variáveis

type ValoresCategorias = "Elenco"|"Jogos"|"Titulos"|"Camisa"|"Patrocinios"|"Politica"|"Cosmeticos do Palmeiras"|"Outros";

interface Post{
    postTitulo:string;
    postConteudo:string;
    postCategoria: ValoresCategorias;
    postImagem: File;
}


//Passo 3 - Criar uma função para acessar o HTML

function getElement<T extends HTMLElement>(seletor:string): T{
    const elemento = document.querySelector<T>(seletor);

    if (!elemento){
        throw new Error(`Elemento não encontrado: ${seletor}`);
    }

    return elemento;
}


//Passo 4 - Referenciar os elementos HTML
const forms = getElement<HTMLFormElement>("#postForm");

const titulo = getElement<HTMLInputElement>("#nomeTitulo")
const conteudo = getElement<HTMLTextAreaElement>("#escreverConteudo");
const categoria = getElement<HTMLSelectElement>("#categoriaConteudo");

const filtrarCategoria = getElement<HTMLInputElement>("#filtrarCategoriaInput");
const divArtigo = getElement<HTMLDivElement>("#divArtigo");

const inputImagem = getElement<HTMLInputElement>("#foto");


//Passo 5 - Armazenar as informações dos posts
const posts:Post[] = [];


//Passo 6 - Detectar o envio do formulário
forms.addEventListener("submit", function (event: Event): void {
    event.preventDefault();
    const postTitulo: string = titulo.value.trim();
    const postConteudo: string = conteudo.value.trim();
    const postCategoria = categoria.value as ValoresCategorias;
    const postImagem = inputImagem.files?.[0];
    
    if (!postTitulo || !postConteudo || !postImagem) return;

    const post: Post = {
        postTitulo,
        postConteudo,
        postCategoria,
        postImagem
    }

    posts.push(post);

    renderizarPost();

    //Passo 9 - Limpar o formulário
    forms.reset();
})

//Passo 7 - Renderização do post
function renderizarPost():void{
    const categoriaSelecionada = filtrarCategoria.value.trim();
    divArtigo.innerHTML = "";
    
    const filtroPosts = posts.filter((post: Post): boolean => {
        return categoriaSelecionada === "" || post.postCategoria === categoriaSelecionada;
    });
    
    filtroPosts.forEach((post : Post): void =>{
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

        elementoImagem.className = "imgPost"

        elementoImagem.src = URL.createObjectURL(post.postImagem);

        postDiv.appendChild(elementoTitulo);
        postDiv.appendChild(elementoContudo);
        postDiv.appendChild(elementoCategoria);
        postDiv.appendChild(elementoImagem);

        divArtigo.appendChild(postDiv)
    })
}


// Passo 8 - Evento do filtro

filtrarCategoria.addEventListener("input", (): void => {
    renderizarPost();
});