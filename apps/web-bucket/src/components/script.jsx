import cpf from "./cpf";

async function getreq() {
  await new Promise((resolve) => {
    console.log("passou aqui");
    setTimeout(resolve, 300);
  });

  const cpf1 = cpf();
  const url = "http://localhost:3000/get/" + cpf1;
  console.log("URL:", url);

  const response = await fetch(url);
  const status = response.status;
  console.log("Status:", status);

  return { status, response };
}

export default getreq;
