// função botao mostrar / esconder conteudo receita

const showHides = document.querySelectorAll(".button h4")


for (let i = 0; i < showHides.length; i++) {

    let list = document.querySelectorAll(".showHide")[i]

    showHides[i].addEventListener("click", function () {


        list.classList.toggle("hide")
        showHides[i].innerHTML === "Esconder" ? showHides[i].innerHTML = "Mostrar" : showHides[i].innerHTML = "Esconder"
    })

}

document.querySelector("#add-ingredient")
    .addEventListener("click", cloneFieldIngredient)

function cloneFieldIngredient() {
    const newFieldContainer = document.querySelector("#ingredient").cloneNode(true)

    const fields = newFieldContainer.querySelectorAll("input")

    fields.forEach(function (field) {
        field.value = ""
    })

    document.querySelector(".ingredient").appendChild(newFieldContainer)
}

document.querySelector("#add-preparation")
    .addEventListener("click", cloneFieldPreparation)

function cloneFieldPreparation() {
    const newFieldContainer = document.querySelector("#preparation").cloneNode(true)

    const fields = newFieldContainer.querySelectorAll("input")

    fields.forEach(function (field) {
        field.value = ""
    })

    document.querySelector(".preparation").appendChild(newFieldContainer)
}