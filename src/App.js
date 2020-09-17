import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function loadRepositories() {
      const response = await api.get('repositories');
      setRepositories(response.data);
    }

    loadRepositories();
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'Unform',
      url: 'https://github.com/Rocketseat/unform',
      techs: ['React', 'Form', 'Forms', 'React Native']
    });

    const repository = response.data;

    setRepositories([
      ...repositories,
      repository
    ]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    
    setRepositories(repositories.filter((repository) => repository.id !== id));
  }

  return (
    <div className="container">
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            <h4>{repository.title}</h4>

            <span className="techs-title">Techs</span>
            <div className="techs">
              {repository.techs.map((tech) => <span key={tech}>{tech}</span>)}
            </div>

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository} className="add-button">Adicionar</button>
    </div>
  );
}

export default App;
