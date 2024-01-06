function getCPF() {
    let cpf = "";
    for (let i = 0; i < 9; i++) {
      cpf += Math.floor(Math.random() * 10);
    }
    cpf += calcularDigitoVerificador(cpf);
    cpf += calcularDigitoVerificador(cpf);
    return cpf;
  }
  
  function calcularDigitoVerificador(cpfParcial) {
    let soma = 0;
  
    for (let i = 0; i < cpfParcial.length; i++) {
      soma += parseInt(cpfParcial.charAt(i)) * (cpfParcial.length + 1 - i);
    }
  
    let resto = soma % 11;
    let digito = resto < 2 ? 0 : 11 - resto;
  
    return digito.toString();
  }
  
  export default getCPF;
  