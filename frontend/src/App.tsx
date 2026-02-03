import "./App.css";
import HomePage from "./shared/pages/HomePage";
import { getBasicAuthToken, saveCredentials } from "./auth/authStorage";

function App() {
  if (!getBasicAuthToken()) {
    saveCredentials("admin", "admin123");
  }

  return (
    <>
      <HomePage />
    </>
  );
}

export default App;
