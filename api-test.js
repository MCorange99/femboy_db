const axios = require("axios").default;
// const wst = require("./ws-test");
const url = "http://127.0.0.1:8080/v1"



async function register(username, email, password) {
    const res = await axios.post(`${url}/auth/register`, {username, email, password}).catch(e => console.log(e.response.data));
    const res2 = await axios.get(`${url}${res.data.Location}`).catch(e => console.log(e.response.data));
    return res2.data;
}

async function login(email, password) {
    const res = await axios.post(`${url}/auth/login`, {email, password}).catch();
    const res2 = await axios.get(`${url}${res.data.Location}`).catch();
    return res2.data;
}


module.exports = {
    login,
    register
}

