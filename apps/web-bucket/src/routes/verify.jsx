async function verify() {
    const url = "http://localhost:3000/verifykey"
    console.log("URL:", url);
  
    const response = await fetch(url);
    const status = response.status;
    console.log("Status:", status);
  
    return { status, response };
  }
  
  export default verify;