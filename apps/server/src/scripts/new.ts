async function getreq() {
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

  const cpf = getCPF(); // Gerar um CPF
  const url = 'http://localhost:3000/get/' + cpf;
  console.log('URL:', url);
  
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Resposta recebida:', data);
  } catch (error) {
    console.error('Erro na requisição:', error.message);
  }
}

for (let i = 0; i < 100; i++) {
  getreq();
}
