import axios from 'axios';

export const Log = async (stack, level, pkg, msg) => {
  try {
    await axios.post('http://20.244.56.144/evaluation-service/log', {
      stack,
      level,
      package: pkg,
      message: msg
    });
  } catch (err) {
  }
};
