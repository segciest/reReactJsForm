import { createContext } from "react";
import HomePage from "./pages/HomePage/HomePage";
import { message } from "antd";

export const AlertContext = createContext();

function App() {
  const [messageApi, contextHolder] = message.useMessage();
  const handleAlert = (type, content) => {
    messageApi.open({
      type,
      content,
    });
  };
  return (
    <AlertContext.Provider value={{ handleAlert }}>
      {contextHolder}
      <HomePage />
    </AlertContext.Provider>
  );
}

export default App;
