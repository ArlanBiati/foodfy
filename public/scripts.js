// função botao mostrar / esconder conteudo receita

const showHides = document.querySelectorAll(".button h4")


for (let i = 0; i < showHides.length; i++) {
    
    let list = document.querySelectorAll(".showHide")[i]

    showHides[i].addEventListener("click", function(){


        list.classList.toggle("hide")
        showHides[i].innerHTML === "Esconder" ? showHides[i].innerHTML = "Mostrar" : showHides[i].innerHTML = "Esconder"
    })
    
}