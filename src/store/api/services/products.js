import axios from "../";

class ClientService {
  getAll({ onBefore, onSuccess, onError, onFinally }) {
    onBefore();
    axios.get(`products`)
      .then((res) => onSuccess(res.data))
      .catch((err) => onError(err))
      .finally(() => onFinally());
  }
}

const clase = new ClientService();
export default clase;
