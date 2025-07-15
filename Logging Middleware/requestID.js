import axios from 'axios';

const userInfo = {
  email: "SAURABHCHAMOLI.220111866@gehu.ac.in",
  name: "Saurabh Chamoli",
  mobileNo: "7505453448",
  githubUsername: "SAURABH-CHAMOLI",
  rollNo: "2219588",
  accessCode: "QAhDUr"
};

axios.post('http://20.244.56.144/evaluation-service/register', userInfo)
  .then(res => {
    console.log("Response:", res.data);
  })
  .catch(err => {
    console.error("Error:", err.response?.data || err.message);
  });
