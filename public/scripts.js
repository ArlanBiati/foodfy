// pega o caminho atual da página
const currentPage = location.pathname
const menuItems = document.querySelectorAll('header .nav a')
for (item of menuItems) {
    if (currentPage.includes(item.getAttribute('href'))) {
        item.classList.add('active')
    }
}

// função botao mostrar / esconder conteudo receita
const showHides = document.querySelectorAll(".button h4")
for (let i = 0; i < showHides.length; i++) {

    let list = document.querySelectorAll(".showHide")[i]

    showHides[i].addEventListener("click", function () {


        list.classList.toggle("hide")
        showHides[i].innerHTML === "Esconder" ? showHides[i].innerHTML = "Mostrar" : showHides[i].innerHTML = "Esconder"
    })

}

// funções de adicionar novo campo de ingrediente e preparação
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

const PhotosUpload = {
    input: "",
    preview: document.querySelector('#photos-preview'),
    uploadLimit: 6,
    files: [],

    handleFileInput(event) {
        const { files: fileList } = event.target
        PhotosUpload.input = event.target

        if (PhotosUpload.hasLimit(event)) return

        Array.from(fileList).forEach((file) => {

            PhotosUpload.files.push(file)

            const reader = new FileReader()

            reader.onload = () => {
                const image = new Image()
                image.src = String(reader.result)

                const div = PhotosUpload.getContainer(image)
                PhotosUpload.preview.appendChild(div)
            }

            reader.readAsDataURL(file)
        })

        PhotosUpload.input.files = PhotosUpload.getAllFiles()
    },
    hasLimit(event) {
        const { uploadLimit, input, preview } = PhotosUpload
        const { files: fileList } = input

        if (fileList.length > uploadLimit) {
            alert(`Envie no máximo ${uploadLimit} fotos`)
            event.preventDefault()
            return true
        }

        const photosDiv = []
        preview.childNodes.forEach(item => {
            if (item.classList && item.classList.value == "photo") {
                photosDiv.push(item)
            }
        })

        const totalPhotos = fileList.length + photosDiv.length

        if (totalPhotos > uploadLimit) {
            alert("Você atingiu o limite total de fotos")
            event.preventDefault()
            return true
        }
        return false
    },
    getAllFiles() {
        const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer()

        PhotosUpload.files.forEach(file => dataTransfer.items.add(file))

        return dataTransfer.files
    },
    getContainer(image) {
        const div = document.createElement('div')
        div.classList.add('photo')

        div.onclick = PhotosUpload.removePhoto

        div.appendChild(image)

        div.appendChild(PhotosUpload.getRemoveButton())

        return div
    },
    getRemoveButton() {
        const button = document.createElement('i')
        button.classList.add('material-icons')
        button.innerHTML = "close"
        return button
    },
    removePhoto(event) {
        const photoDiv = event.target.parentNode
        const photosArray = Array.from(PhotosUpload.preview.children)
        const index = photosArray.indexOf(photoDiv)

        PhotosUpload.files.splice(index, 1)
        PhotosUpload.input.files = PhotosUpload.getAllFiles()

        photoDiv.remove()
    }
}