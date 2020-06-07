

function populateUFs() {

  const  ufSelect = document.querySelector("select[name=uf]");

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
  .then( res => res.json() )
  .then( states => {
    for( const state of states ){
      ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
      
    }


    
  })
}

populateUFs()

function getCities(event) {
  const citySelect = document.querySelector("select[name=city]")
  const stateInput = document.querySelector("[name=state]")

  const ufValue = event.target.value

  const indexOfSelectedState = event.target.selectedIndex

  stateInput.value = event.target.options[indexOfSelectedState].text

  // console.log(event.target.value)

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
  
  citySelect.innerHTML = "<option>Selecione a Cidade</option>"
  citySelect.disabled = true

  fetch(url)
  .then( res => res.json() )
  .then( cities => {

    for( const city of cities){

      citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
    }

    citySelect.disabled = false

  })
}



// .then( (res) => { return res.json()})
document.querySelector("select[name=uf]").addEventListener("change", getCities)



//items de coleta
//pegar todos os li's

const itemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect){
  item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []


function handleSelectedItem() {
  
  const itemLi = event.target

  //adicionando class ao clicar ( add or remove class)
  // classList.add() , classList.remove() classList.toggle()

  itemLi.classList.toggle("selected")

  const itemId = itemLi.dataset.id
  
  console.log('ITEM ID: ', itemId)
  // verificar se existem itens selecionados, se sim
  // pegar os itens selecionados

  const alreadySelected = selectedItems.findIndex( item => item == itemId)


  // se já estiver selecionado, tirar da selecao

  if( alreadySelected >= 0 ) {
    
    //tirar da seleção

    const filteredItems = selectedItems.filter( item => {
      const itemIsDifferent = item != itemId
      return itemIsDifferent
    })

    selectedItems = filteredItems


  } else {
    // se não estiver selecionado,
    // adicionar á seleção
    selectedItems.push(itemId)
  }


  console.log(selectedItems)
  // atualizar o campo escondido com os itens selecionados

  collectedItems.value = selectedItems
}



//anotações extras
  // console.log(event.target.dataset.id) variavel para teste


// document
//   .querySelector("select[name=uf]")
//   .addEventListener("change", () => {
//   console.log("Mudei")
// } )



// const alreadySelected = selectedItems.findIndex( function(item) {
//   const itemFound = item == itemId //isso retorna verdadeiro ou falso
//   return itemFound
// })
