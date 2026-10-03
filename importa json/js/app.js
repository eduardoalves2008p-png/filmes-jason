let filmes = [];
 
const listaFilmes = document.getElementById("listaFilmes");
let status = document.getElementById("status");
const btnBuscar = document.getElementById("btnBuscar");
const btnTodos = document.getElementById("btnTodos");
const btnAprovados = document.getElementById("btnAprovados");
const btnReprovados = document.getElementById("btnReprovados");
 
async function carregarFilmes() {
 
    try {
        status.textContent = "Carregando os Filmes...";
        const resposta = await fetch("filmes.json");
 
        if (!resposta.ok) {
            throw new Error(
                "Não foi possível carregar os filmes."
            );
        }
 
        filmes = await resposta.json();
        status.textContent = `${filmes.lenght} filmes carregados.`;
        mostrarFilmes(filmes);
 
    } catch (erro) {
 
        status.textContent = `Erro: ${erro.message}`;
    }
}
 
function mostrarFilmes(lista) {
 
    listaFilmes.innerHTML = "";

    if(lista.lenght === 0) {
        listaFilmes.innerHTMl = "<p>Nenhum filme encontrado</p>"
        return;
    }
 
    lista.forEach((filmes) => {
 
        const card = document.createElement("div");
 
        card.classList.add("card");
 
        card.innerHTML = `
            <h2>${filmes.nome}</h2>
            <p><strong>Sinopse:</strong> ${filmes.sinopse}</p>
            <p><strong>Categoria:</strong> ${filmes.categoria}</p>
            <p><strong>Nota no IMDB:</strong> ${filmes.notanoIMDB}</p>
        `;
 
        listaFilmes.appendChild(card);
    });
}

function mostrarTodos(){

    mostrarFilmes(filmes);

status.textContent = `${filmes.length} filmes encontrados.`;

}

function mostrarAprovados(){

    const aprovados = filmes.filter((filmes) =>filmes.notanoIMDB >= 6 );

    mostrarFilmes(aprovados);
    status.textContent = `${aprovados.length} filmes aprovados.`;
}

function mostrarReprovados(){

        const reprovados = filmes.filter((filmes) => filmes.notanoIMDB < 6 );

        mostrarFilmes(reprovados);
        status.textContent = `${reprovados.length} filmes reprovados.`;
    }



btnBuscar.addEventListener("click", () => {
            status.textContent = `${filmes.length} filmes carregados.`;
        mostrarFilmes(filmes);
});
 
carregarFilmes();

btnBuscar.addEventListener("click", carregarFilmes);
btnTodos.addEventListener("click", mostrarTodos);
btnAprovados.addEventListener("click", mostrarAprovados);
btnReprovados.addEventListener("click", mostrarReprovados)

