import axios from "axios";
import { ElMessage } from "element-plus";

axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";

const call = axios.create({
  baseURL: "/api/v1",
  timeout: 30000,
  withCredentials: false,
});

call.interceptors.response.use(
  (response) => {
    const { data, status } = response;
    if (status === 200 && data.code === 100) {
      return response.data;
    } else {
      ElMessage.error({ message: data.error});
      throw data.error;
    }
  },
  (error) => {
    ElMessage.error({ message: `系统错误` });
    throw error;
  }
);

export default call;
