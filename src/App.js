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
      <Auth/>
      <div>
        <input placeholder="Name..."
          onChange={(e)=>setPersonName(e.target.value)}
        />
        <input placeholder="Location..."
          onChange={(e)=>setpersonLocation(e.target.value)}
        />
        <input placeholder="Contact..." type="number"
          onChange={(e)=>setPersonContact(e.target.value)}
        />
        <button onClick={onSubmitList}>Submit</button>
      </div>
      <div>
        {personList.map((p)=>(
          <div>
            <h1>{p.name}</h1>
            <p>{p.location}</p>
            <p>{p.contact}</p>
            <button onClick={()=>deleteList(p.id)}>Delete </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
