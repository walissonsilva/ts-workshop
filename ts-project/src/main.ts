import axios = require("axios")

const soma = (num1: number, num2: number) => {
  return num1 + num2
}

const resultado = soma(20, 10)
console.log(resultado)

// Vamos considerar o contrato de uma mensagem de outbound (objeto)

// messageId
// tenantId
// contactId
// central
// messageType
// content
// supplierSession: objeto que contém o id do atendimento, a data de abertura do atendimento, e os dados do gerente (nome e email) dentro de outro objeto

// Como podemos fazer a tipagem desse objeto