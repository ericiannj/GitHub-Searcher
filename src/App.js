import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

import Navbar from './Navbar';
import Profile from './Profile';
import Repo from './Repo';

export default function App() {
  const url = 'https://api.github.com/users';
  const client_id = '3927e2c2bbf88d01ddb1';
  const client_secret = '4e0663426f9c05ec033ad340618d7ad803afd9b0';
  const count = 7;
  const sort = 'created: asc';
  const [user, setUser] = useState([]);
  const [repos, setRepos] = useState([]);

  async function loadUser() {
    const response = await axios.get(
      `${url}/${user}?client_id=${client_id}&client_secret=${client_secret}`
    );
    console.log(response.data);
  }

  useEffect(() => {
    loadUser();
  }, []);

  async function loadRepos() {
    const response = await axios.get(
      `${url}/${user}/repos?per_page=${count}&sort=${sort}&client_id=${client_id}&client_secret=${client_secret}`
    );
    setRepos(response.data);
  }

  useEffect(() => {
    loadRepos();
  }, []);

  const handleUser = (event) => {
    const newUser = event.target.value;
    setUser(newUser);
  };

  const renderProfile = () => {
    if (user !== '') {
      return (
        <div className="row">
          <div className="col-md-4">
            <Profile user={user} />
          </div>
          <div className="col-md-8">
            {repos.map((repo) => (
              <Repo key={repo.name} repo={repo} />
            ))}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="App">
      <Navbar />

      <div className="container">
        <div className="card card-body">
          <h1>Pesquisar Usuários do GitHub</h1>
          <p className="lead">
            Digite um nome para encontrar usuários e repositórios
          </p>
          <input
            onChange={(handleUser, renderProfile)}
            id="search"
            type="text"
            className="form-control"
            required
          />
        </div>
      </div>
    </div>
  );
}
