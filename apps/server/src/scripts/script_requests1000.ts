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
    const status = response.status
    
    console.log('Resposta recebida:', status);
  } catch (error) {
    console.error('Erro na requisição:', error.message);
  }
}

for (let i = 0; i < 1000; i++) {
  getreq();
}



