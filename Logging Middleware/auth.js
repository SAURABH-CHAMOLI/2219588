import axios from 'axios';

const user = {
  email: "SAURABHCHAMOLI.220111866@gehu.ac.in",
  name: "Saurabh Chamoli",
  rollNo: "2219588",
  accessCode: "QAhDUr",
  clientID: 'e68734dd-3fda-42b9-b6cd-cf5192dc2438',
  clientSecret: 'WfnqVXDdzgwuGyZq'
};

axios.post('http://20.244.56.144/evaluation-service/auth', user)
  .then(res => {
    const token = res.data.access_token;
    console.log("Bearer Token:", token);
    return axios.get('http://20.244.56.144/evaluation-service/some-protected-route', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  })
  .then(res => {
    console.log("API Response:", res.data);
  })
  .catch(err => {
    console.error("Error:", err.response?.data || err.message);
  });
