import getCPF2 from '../utils/cpf_generator'

async function getreq() {

  const cpf = getCPF2();
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

for (let i = 0; i < 500; i++) {
  getreq();
}



