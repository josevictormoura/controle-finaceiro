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

function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id)
    setLocalStorage(transactions)
    init()
}

function addTransactionIntoDom(transaction) {
    const operador = transaction.value < 0 ? '-' : '+'
    const clasCSS = transaction.value < 0 ? 'minus' : 'plus'
    const transactionValue = Math.abs(transaction.value)
    const li = document.createElement('li')
    li.classList.add(clasCSS)
    li.innerHTML = `
        ${transaction.name} <span>${operador} R$ ${transactionValue} </span><button class="delete-btn" onClick="removeTransaction(${transaction.id})"><ion-icon name="trash-outline"></ion-icon></button>
    `
    listTransactionsUl.append(li)
}