async function getreq(param) {
  await new Promise((resolve) => {
    console.log("getreq log");
    setTimeout(resolve, 300);
  });

  
  const url = `http://localhost:3000/get/${param}`;
  console.log("URL:", url);

  const response = await fetch(url);
  const status = response.status;
  console.log("Status:", status);

  return { status, response };
}

export default getreq;
