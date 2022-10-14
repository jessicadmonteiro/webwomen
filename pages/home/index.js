const containerReceberVagas = document.querySelector(".container_vagas")

function criarCardDeVaga(vagas) {
    containerReceberVagas.innerHTML = ""

    vagas.forEach((element, index) => {
        let id         = element.id
        let titulo     = element.title
        let empresa    = element.enterprise
        let cidade     = element.location
        let descricao  = element.descrition
        let modalidade = element.modalities

        let tagLi               = document.createElement("li")
        let tagH2               = document.createElement("h2")
        let tagDivEmpresaCidade = document.createElement("div")
        let tagPEmpresa         = document.createElement("p")
        let tagPCidade          = document.createElement("p")
        let TagPDescricao       = document.createElement("p")
        let tagDivBts           = document.createElement("div")
        let tagBtHome           = document.createElement("button")
        let tagBtCandidatar     = document.createElement("button")

        tagLi.classList.add("container_descricao_vaga")
        tagH2.classList.add("titulo_vaga")
        tagDivEmpresaCidade.classList.add("container_empresa_cidade")
        tagPEmpresa.classList.add("empresa", "color_grey2")
        tagPCidade.classList.add("cidade", "color_grey2")
        TagPDescricao.classList.add("descricao_vaga", "color_grey2")
        tagDivBts.classList.add("container_bt_homeOff_Candidatar")
        tagBtHome.classList.add("bt_home", "bt_borda")
        tagBtCandidatar.classList.add("bt_candidatar", "bt_borda", "bt_cor")


        tagH2.innerText           = titulo
        tagPEmpresa.innerText     = empresa
        tagPCidade.innerText      = cidade
        TagPDescricao.innerText   = descricao
        tagBtHome.innerText       = modalidade[0]
        tagBtCandidatar.innerText = "Candidatar"
        tagBtCandidatar.id        = id

        tagLi.append(tagH2, tagDivEmpresaCidade, TagPDescricao, tagDivBts)
        tagDivEmpresaCidade.append(tagPEmpresa, tagPCidade)
        tagDivBts.append(tagBtHome, tagBtCandidatar)

        return containerReceberVagas.appendChild(tagLi)
    })

}
criarCardDeVaga(jobsData)


let selecionarVaga = []

const listaVagasSelecionadas = document.querySelector(".conteiner_receber_vagas_selecionadas")

function criarCardSelecionado(array) {
    listaVagasSelecionadas.innerHTML = ""

    array.forEach((element, index) => {

        let id      = element.id
        let titulo  = element.title
        let empresa = element.enterprise
        let cidade  = element.location

        let tagLi               = document.createElement("li")
        let tagDivTiuloLixeira  = document.createElement("div")
        let tagH2               = document.createElement("h2")
        let tagBtLixeira        = document.createElement("button")
        let tagDivEmpresaCidade = document.createElement("div")
        let tagPEmpresa         = document.createElement("p")
        let tagPCidade          = document.createElement("p")

        tagLi.classList.add("container_vaga_selecionada")
        tagDivTiuloLixeira.classList.add("container_titulo_btLixeira")
        tagBtLixeira.classList.add("bt_lixeira")
        tagH2.classList.add("titulo_vaga_selecionada")
        tagDivEmpresaCidade.classList.add("container_empresa_cidade")
        tagPEmpresa.classList.add("empresa_selecionada")
        tagPCidade.classList.add("cidade_selecionada")

        tagH2.innerText       = titulo
        tagPEmpresa.innerText = empresa
        tagPCidade.innerText  = cidade
        tagBtLixeira.id       = index

        tagBtLixeira.addEventListener("click", (event) => {

            const id    = event.target.id
            const botao = event.target
            const arr   = JSON.parse(localStorage.getItem("vagas")) || []

            const index = arr.findIndex(element => element.id == id)

            arr.splice(index, 1)

            localStorage.setItem("vagas", JSON.stringify(arr))

            criarCardSelecionado(arr)

            
            selecionarCandidatura()

            botao.innerText = "Candidatar"

        })


        tagLi.append(tagDivTiuloLixeira, tagDivEmpresaCidade)
        tagDivTiuloLixeira.append(tagH2, tagBtLixeira)
        tagDivEmpresaCidade.append(tagPEmpresa, tagPCidade)

        listaVagasSelecionadas.appendChild(tagLi)
    })

}
criarCardSelecionado(selecionarVaga)


function selecionarCandidatura() {
    const botaoCandidatar = document.querySelectorAll(".bt_candidatar")

    const botao = botaoCandidatar.forEach((botaoAtual) => {

        const arr = JSON.parse(localStorage.getItem("vagas")) || []

        const find = arr.find(element => element.id == botaoAtual.id)

        if (find) {
            botaoAtual.innerText = "Remover Candidatura"
            botaoAtual.addEventListener("click", remover)
        } else {
            botaoAtual.innerText = "Candidatar"
            botaoAtual.addEventListener("click", adicionar)
        }
    })
}
selecionarCandidatura()


function remover(event) {
    const id    = event.target.id
    const botao = event.target
    const arr   = JSON.parse(localStorage.getItem("vagas")) || []

    const index = arr.findIndex(element => element.id == id)

    arr.splice(index, 1)

    localStorage.setItem("vagas", JSON.stringify(arr))

    criarCardSelecionado(arr)

    botao.innerText = "Candidatar"

    botao.removeEventListener("click", remover)
    botao.addEventListener("click", adicionar)
}


function adicionar(event) {
    const id    = event.target.id
    const botao = event.target
    const arr   = JSON.parse(localStorage.getItem("vagas")) || []

    const vaga  = jobsData.find(element => element.id == id)

    arr.push(vaga)

    localStorage.setItem("vagas", JSON.stringify(arr))

    criarCardSelecionado(arr)

    let containerselecionarVagaVazio = document.querySelector(".selecionarVazio")

    if (arr !== []) {
        containerselecionarVagaVazio.style.display = "none"
    }

    botao.innerText = "Remover Candidatura"

    botao.removeEventListener("click", adicionar)

    botao.addEventListener("click", remover)
}