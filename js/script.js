//aula 05
//criar a variável modalKey , será global
let modalKey = 0

//variável para controlar a quantidade inicial de pizzas na modal
let quantPizzas = 1

let cart = [] //carrinho
// /aula 05

//funções auxiliares ou úteis
const seleciona = (elemento) => document.querySelector(elemento)
const selecionaTodos = (elemento) => document.querySelectorAll(elemento)

const formatoReal = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})
}

const formatoMonetario = (valor) => {
    if (valor) {
        return valor.toFixed(2)
    }
}

const abrirModal = () => {
    seleciona('.pizzaWindowArea').style.opacity = 0 //transparente
    seleciona('.pizzaWindowArea').style.display = 'flex'
    setTimeout(() => seleciona('.pizzaWindowArea').style.opacity = 1
    , 150)
}

const fecharModal = () => {
    seleciona('.pizzaWindowArea').style.opacity = 0
    setTimeout(() => seleciona('.pizzaWindowArea').style.display = 'none'
    , 500)
}

const botoesFechar = () => {
   // BOTOES FECHAR MODAL
   selecionaTodos('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => item.addEventListener('click', fecharModal))    
}

const preencherDadosDasPizzas = (pizzaItem, item, index) => {
    //aula05
    //setar um atributo para identificar qual o elemento foi clicado
    pizzaItem.setAttribute('data-key', index)
    pizzaItem.querySelector('.pizza-item--img img').src = item.img
    pizzaItem.querySelector('.pizza-item--price').innerHTML = formatoReal(item.price[2])
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description
}

const preencherDadosModal = (item) => {
    seleciona('.pizzaBig img').src = item.img
    seleciona('.pizzaInfo h1').innerHTML = item.name
    seleciona('.pizzaInfo--desc').innerHTML = item.description
    seleciona('.pizzaInfo--actualPrice').innerHTML = formatoReal(item.price[2])
}

//aula 05
const pegarKey = (e) => {
    // .closest retorna o elemento mais proximo que tem a class que passamos
    // do .pizza-item ele vai pegar o valor do atributo data-key
    let key = e.target.closest('.pizza-item').getAttribute('data-key')
    console.log('Pizza clicada ' + key)
    console.log(pizzaJson[key])

    //garantir a quantidade de pizzas é 1
    quantPizzas = 1

    //Para manter a informação de qual pizza foi clicada 
    modalKey = key

    return key
}

const preencherTamanhos = (key) => {
    //tirar a seleção de tamanho atual e selecionar o tamanho grande 
    seleciona('.pizzaInfo--size.selected').classList.remove('selected')

    //selecionar todos os tamanhos
    selecionaTodos('.pizzaInfo--size').forEach((size, sizeIndex) => {
        //selecionar o tamanho grande 
        (sizeIndex == 2)? size.classList.add('selected') : ''
        size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]
    })
}

const escolherTamanhoPreco = (key) => {
    //Ações nos botões de tamanho
    //selecionar todos os tamanhos
    selecionaTodos('.pizzaInfo--size').forEach((size, sizeIndex) => {
        size.addEventListener('click', (e) => {
            //clicou em um item , tirar a seleção dos outros e marca o que vc clicou
            //tirar a seleção de tamanho atual e selecionar o tamanho grande
            seleciona('.pizzaInfo--size.selected').classList.remove('selected')

            //marcar o que vc clicou , ao invés de usar e.target use size, pois ele é o nosso item dentro do loop
            size.classList.add('selected')

            //mudar o preço de acordo com o tamanho
            seleciona('.pizzaInfo--actualPrice').innerHTML = formatoReal(pizzaJson[key].price[sizeIndex])
        })
    })
}

const mudarQuantidade = () => {
    //Ações nos botões + e - da janela modal
    seleciona('.pizzaInfo--qtmais').addEventListener('click', () => {
        quantPizzas++
        seleciona('.pizzaInfo--qt').innerHTML = quantPizzas
    })

    seleciona('.pizzaInfo--qtmenos').addEventListener('click', () => {
        if (quantPizzas > 1) {
            quantPizzas--
            seleciona('.pizzaInfo--qt').innerHTML = quantPizzas
        }
    })
}
// /aula 05

//MAPEAR pizzaJson para gerar lista de pizzas
pizzaJson.map((item, index) => {
    //console.log(item)
    let pizzaItem = document.querySelector('.models .pizza-item').cloneNode(true)
    //console.log(pizzaItem)
    document.querySelector('.pizza-area').append(pizzaItem)
    seleciona('.pizza-area').append(pizzaItem)

    //preencher os dados de cada pizza
    preencherDadosDasPizzas(pizzaItem, item, index)
   

    //pizza clicada
    pizzaItem.querySelector('.pizza-item a').addEventListener('click', (e) => {
        e.preventDefault()
        console.log('Clicou na Pizza')

        // aula 05
        let chave = pegarKey(e)
        // /aula 05
       
        //abrir janela modal
        //document.querySelector('.pizzaWindowArea').style.display = 'flex'
        abrirModal()

        //preecnhimento dos dados
        preencherDadosModal(item)
        
        // aula 05
        //pegar tamanho selecionado
        preencherTamanhos(chave)

        //definir a quantidade inicial como 1
        seleciona('.pizzaInfo--qt').innerHTML = quantPizzas

        //selecionar o tamanho e o preço com o clique no botão
        escolherTamanhoPreco(chave)
        // /aula05

    }) 
    
    botoesFechar()

})//fim fo MAPEAR pizzaJson para gerar lista de pizzas
 
// aula 05
//mudar a quantidade com os botões + e -
mudarQuantidade()
// /aula 05