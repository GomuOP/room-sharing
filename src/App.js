import logo from './logo.svg';
import './App.css';
import { Auth } from "./components/auth"
import { db, auth } from "./config/firebase"

function App() {
  return (
    <div className="App">
      <Auth/>
    </div>
  );
}

export default App;
