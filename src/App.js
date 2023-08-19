import logo from './logo.svg';
import './App.css';
import { Auth } from "./components/auth"
import { db, auth } from "./config/firebase"
import { useEffect, useState } from 'react';
import { getDocs, collection, addDoc, deleteDoc, doc } from "firebase/firestore";

function App() {
  const [personList, setPersonList]=useState([]);

  const [personName, setPersonName]=useState("");
  const [personLocation, setpersonLocation]=useState("");
  const [personContact, setPersonContact]=useState(0);

  const personCollectionRef = collection(db,"persons");
  const getlist = async () =>{
    try{
      const data=await getDocs(personCollectionRef);
      console.log(data);
      const filteredData=data.docs.map((doc)=>({
        ...doc.data(),
        id:doc.id,
      }))
      setPersonList(filteredData);
    }catch(err){
      console.error(err);
    }
  };
  useEffect(()=>{
    
    getlist();
  },[]);

  const onSubmitList = async () =>{
    await addDoc(personCollectionRef,{
      
      contact: personContact,
      location: personLocation,
      name: personName,
      userId: auth?.currentUser?.uid
      
    })
    getlist();
  }
  const deleteList = async (id)=>{
    const listDoc=doc(db,"persons",id);
    await deleteDoc(listDoc);
    getlist();
  }
  return (
    <div className="App">
      <div className="header">
      <div className="header-title">Room Sharing</div>
                <div className="auth-buttons">
                    <Auth />
                </div>
            </div>
      <div className="input-container">
                <input
                    className="input-field"
                    type="text"
                    placeholder="Name..."
                    onChange={(e) => setPersonName(e.target.value)}
                />
                <input
                    className="input-field"
                    type="text"
                    placeholder="Location..."
                    onChange={(e) => setpersonLocation(e.target.value)}
                />
                <input
                    className="input-field"
                    type="number"
                    placeholder="Contact..."
                    onChange={(e) => setPersonContact(e.target.value)}
                />
                <div className="button-container">
                    <button onClick={onSubmitList}>Submit</button>
                </div>
      </div>
      <div className="person-list">
                {personList.map((p) => (
                    <div className="person-card" key={p.id}>
                        <h1>{p.name}</h1>
                        <p>{p.location}</p>
                        <p>{p.contact}</p>
                        <button onClick={() => deleteList(p.id)}>Delete</button>
                    </div>
                ))}
            </div>
            <div className="footer">
                <p>Copyright@gomumomo</p>
                <a className="footer-link" href="https://github.com/GomuOP" target="_blank" rel="noopener noreferrer">
                    Contact Me
                </a>
            </div>
    </div>
  );
}

export default App;
