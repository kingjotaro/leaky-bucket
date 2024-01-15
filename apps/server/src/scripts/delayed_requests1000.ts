import getCPF2 from '../utils/cpf_generator';

async function getreq() {
  await new Promise(resolve => {
    console.log("delayd request log");
    setTimeout(resolve, 300);
  });
  const cpf = getCPF2();
  const url = 'http://localhost:3000/get/' + cpf;
  console.log('URL:', url);
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    const status = await response.status
    console.log('Sucesso', status)
  } catch (error) {
    console.log('Erro na requisição:', error.message);
  }
}

async function runRequests() {
  for (let i = 0; i < 1000; i++) {
    await getreq();
  }
}

runRequests();
