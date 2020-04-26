import React, {useState,useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories,setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      if(response && response.data){ 
        setRepositories(response.data);
      }
    });

  },[]);

  async function handleAddRepository() {
    const response = await api.post(`/repositories`, { title : `Guilherme ${Date.now()}`, owner: "Gui"}).catch(err => {
      console.log(err.response.status,err.response.data.error);
    });
    
    if(response && response.data){
      setRepositories([...repositories, response.data]);
    }
  }

  async function handleRemoveRepository(id) {
   const response = await api.delete(`/repositories/${id}`).catch(err => {
     console.log(err.response.status,err.response.data.error);
   });

   if(response){
     setRepositories( repositories.filter(repo => repo.id !== id));
   }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repo => 
          (
          <li key={repo.id}>
            {repo.title} 
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button> 
          </li>)
          )
        }
       
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
