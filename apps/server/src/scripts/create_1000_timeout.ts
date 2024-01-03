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
    const status = await response.status
    console.log('Sucesss', status)
  } catch (error) {
    console.log('Erro na requisição:', error.message);
  }
}

for (let i = 0; i < 1000; i++) {
  getreq();
  await new Promise(resolve => setTimeout(resolve, 300)); 
}


