import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repo, setRepo] = useState([])

  useEffect(() => {
    api.get('repositories').then(res => {
      setRepo(res.data)
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'Desafio com PHP',
      url: 'https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-conceitos-nodejs',
      'techs': [
        'PHP',
        'jQuery'
      ],
    })

    setRepo([...repo, response.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    setRepo(repo.filter(e => e.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repo.map(e => (
            <li key={e.id}>
              {e.title}
              <button onClick={() => handleRemoveRepository(e.id)}>
                Remover
              </button>
            </li>
          ))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
