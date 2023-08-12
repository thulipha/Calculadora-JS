const $tela = document.querySelector(".visor"); 
const $numeros = document.querySelectorAll('[data-js="buttonsNumbers"]');
const $operadores = document.querySelectorAll('[data-js="buttonsOperations"]');


function inicializar(){
  iniciarEventos();
};

function iniciarEventos(){
  $numeros.forEach((num)=>{
    num.addEventListener('click',adicionarNumero);
  });
  $operadores.forEach((oper)=>{
    oper.addEventListener('click', funcoesDosOperadores);
  });
};

function adicionarNumero(){
    return $tela.value += this.value;
};

function funcoesDosOperadores(){
  
  if(this.value == 'CE'){
    return limparTela();
  };
  
  if(this.value == '='){
    return calcular();
  };
  
  removerItemSeForUmOperador();
 
  return $tela.value += this.value;
};

function ultimoItemEhUmOperador(){
  
  const operadores = ['+','-','÷','×'];
  let ultimoItem = $tela.value.split('').pop();
  
  return operadores.some(function (operador){
    return operador === ultimoItem;
  });
};

function limparTela(){
  return $tela.value = 0;
};

function removerItemSeForUmOperador(){
  
    if(ultimoItemEhUmOperador()){
      $tela.value = $tela.value.slice(0,-1);
    };
};

function calcular(){
  
  removerItemSeForUmOperador();
  
  let todosOsValores = $tela.value.match(/\d+[+÷×-]?/g);
  
  let resultado = todosOsValores.reduce(function (acumulado, atual){
    
     let primeiroValor = acumulado.slice(0, -1);
     let operadorAtual = acumulado.split('').pop();
     let valorAtual = atual;
     
     return calculos(operadorAtual, primeiroValor, valorAtual);
  });
};

function calculos(operadorAtual, primeiroValor, valorAtual){
  
  switch(operadorAtual){
       case '+':
         return $tela.value = Number(primeiroValor) + Number(valorAtual);
         
       case '-':
         return $tela.value = Number(primeiroValor) - Number(valorAtual);
      
       case '×':
         return $tela.value = Number(primeiroValor) * Number(valorAtual);
      
       case '÷':
         return $tela.value = Number(primeiroValor) / Number(valorAtual);
     };
};

inicializar();