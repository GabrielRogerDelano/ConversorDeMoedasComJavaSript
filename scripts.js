"use strict";
const listOne = document.querySelector(".primeira_lista");
const listTwo = document.querySelector(".segunda_lista");
const inputAmount = document.querySelector(".input_de_valor");

const change = document.querySelector(".atualizar");

const resultAmount = document.querySelector(".valor_resultado");
const resultBtn = document.querySelector(".botao_resultado");

const apiObject = {
    apiKey: "d0afe9f706c2f144e25db75f"
};

let request, resultRequest, option, firstLoad = true, finalResult;

function createList(acronymCurrency, list){
    let option = document.createElement("OPTION");
    option.value = acronymCurrency;
    option.innerHTML = acronymCurrency;
    list.appendChild(option);
}
async function getFirstData(currencyOne, currencyTwo, amount){
    request = await fetch(`https://v6.exchangerate-api.com/v6/${apiObject.apiKey}/latest/${currencyOne}`);
    resultRequest = await request.json();

    inputAmount.value = amount;
    finalResult = amount * resultRequest.conversion_rates[currencyTwo];
    resultAmount.innerHTML = `${finalResult.toFixed(2)} ${currencyTwo}`;

    if(firstLoad){
        Object.keys(resultRequest.conversion_rates).forEach((e)=>{
            createList(e, listOne);
            createList(e, listTwo);
        });
        listTwo.value = currencyTwo;
        firstLoad = false;
    };
};

window.addEventListener("load", ()=>{
    getFirstData("EUR", "BRL", "1");
});

resultBtn.addEventListener("click", ()=>{
    getFirstData(listOne.value, listTwo.value, inputAmount.value);
});

change.addEventListener("click", ()=>{
    let valueListOne = listOne.value;
    listOne.value = listTwo.value;
    listTwo.value = valueListOne;
    console.log(valueListOne, listTwo.value)
});