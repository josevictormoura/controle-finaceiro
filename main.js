const listTransactionsUl = document.querySelector('#transactions')
const form = document.querySelector('#form')
const nameInputTransaction = document.querySelector('#text')
const valueInputTransaction = document.querySelector('#amount')
const btnAddTransaction = document.querySelector('.button-add')
const modalForm = document.querySelector('.modal-form')

let transactions = JSON.parse(localStorage.getItem('transactions')) ?? [];
const setLocalStorage = (transaction) => localStorage.setItem('transactions', JSON.stringify(transaction));

function addTransactionLocalStorage(transaction) {
    transactions.push(transaction)
    setLocalStorage(transactions)
}

const modalConfirmeDelete = document.querySelector('.container-remover-transaction')

const showModalConfirmeDelete = () => {
    modalConfirmeDelete.classList.add('active')
    modalConfirmeDelete.querySelector('.content-remover-transaction').classList.add('animate')
}
const closeModalConfirmeDelete = () => document.querySelector('.container-remover-transaction').classList.remove('active')


function confirmeRemoverTransaction(id) {
    showModalConfirmeDelete()

    modalConfirmeDelete.querySelector('.content-remover-transaction').addEventListener('click', (e)=>{
        if (e.target.id === 'btn-remover-transacao') {
            transactions = transactions.filter(transaction => transaction.id !== id)
            console.log(transactions);
            setLocalStorage(transactions)
            closeModalConfirmeDelete()
            init()
        }

        if (e.target.id === 'btn-cancelar-remover') {
            closeModalConfirmeDelete()
        }
    })

}

function addTransactionIntoDom(transaction) {
    const operador = transaction.value < 0 ? '-' : '+'
    const clasCSS = transaction.value < 0 ? 'minus' : 'plus'
    const transactionValue = Math.abs(transaction.value)
    const li = document.createElement('li')
    li.classList.add(clasCSS)
    li.innerHTML = `
        ${transaction.name} <span>${operador} R$ ${transactionValue} </span><button class="delete-btn" onClick="confirmeRemoverTransaction(${transaction.id})"><ion-icon name="trash-outline"></ion-icon></button>
        
    `
    listTransactionsUl.append(li)
}

function updateStatusScren() {
    const transactionValues = transactions.map(transaction => transaction.value)
    const total = transactionValues.reduce((accumulation, value) => accumulation + value ,0).toFixed(2)
    const receita = document.querySelector('#money-plus')
    const despesa = document.querySelector('#money-minus')

    if (transactionValues.length === 0) {
        receita.innerHTML = '+ R$ 0.00'
        despesa.innerHTML = '- R$ 0.00'
    }else{
       const receitaValue = transactionValues.filter(value => value > 0).reduce((accumulation, value) => accumulation + value ,0).toFixed(2)
       const despesaValue = transactionValues.filter(value => value < 0).reduce((accumulation, value) => accumulation + value ,0).toFixed(2)
        
       receita.textContent = `R$ ${receitaValue}`
       despesa.textContent = `R$ ${despesaValue}`
    }

    document.querySelector('#balance').textContent = `R$ ${total}`
}

function init() {
   listTransactionsUl.innerHTML = ""
   transactions.forEach(addTransactionIntoDom)
   updateStatusScren()
   checkListTransactionsNull()
}

init()

btnAddTransaction.addEventListener('click', ()=>{
    modalForm.classList.add('active')
    modalForm.querySelector('.modal-container').classList.add('animate')
})

document.querySelector('.btn-close-modal').addEventListener('click', ()=>{
    closeModalForm()
})

modalForm.addEventListener('click', event => {
    if (event.target === modalForm) {
        closeModalForm()
    }
})

const closeModalForm = () => modalForm.classList.remove('active')

form.addEventListener('submit', handleFormSubit)

function handleFormSubit(event) {
    event.preventDefault()

    const nameTransaction = nameInputTransaction.value.trim()
    const valueTransaction = valueInputTransaction.value.trim()
    const formIsValid = nameTransaction === "" && valueTransaction === ""
    const idRandomTransaction = () => Math.floor(Math.random() * 1000)

    if (formIsValid) {
        alert('Preencha todos os campos do formulario porfavor!')
        return
    }

    const transaction = {
        id: idRandomTransaction(),
        name: nameInputTransaction.value,
        value: Number(valueInputTransaction.value)
    }

    addTransactionLocalStorage(transaction)
    init()
    updateStatusScren()
    closeModalForm()
    clearFieldForm()
}

function clearFieldForm() {
    nameInputTransaction.value = ""
    valueInputTransaction.value = ""
}

function checkListTransactionsNull() {

    const contentAlert = document.createElement('div')
    contentAlert.classList.add('contentainerAlert')
    
    const ionIcon = document.createElement('ion-icon')
    ionIcon.setAttribute('name', 'alert-circle-outline')
    ionIcon.classList.add('ion-icon')
    
    const span = document.createElement('span')
    span.classList.add('spanText')

    const checkListNull = transactions.length === 0

    if (checkListNull) {
        span.innerHTML = 'Nenhuma transação no momento, clique em adicionar!'
        listTransactionsUl.appendChild(contentAlert)
    }
    
    contentAlert.appendChild(ionIcon)
    contentAlert.appendChild(span)
}