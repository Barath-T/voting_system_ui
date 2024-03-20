import { useState } from 'react'
import './App.css'
import { useMutation } from '@tanstack/react-query';
import { login } from './api';
import Admin from './Admin.jsx';
import Users from './Users.jsx';

function App() {
  const [error, setError] = useState(false);

  const [mode, setMode] = useState(0); //0-not logged, 1-admin, 2-user

  const [id, setId] = useState(null);
  const [password, setPassword] = useState(null);

  const loginMutation = useMutation({
    mutationFn: async ({ id, password }) => {
      return await login(id, password);
    },
    onSuccess: () => {
      if (id === 1) {
        setMode(1);
      } else {
        setMode(2);
      }
    }
    ,
    onError: (err) => {
      console.log(JSON.stringify(err));
      setError(true);
    }

  });

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  }
  const onIdChange = (event) => {
    if (+event.target.value && parseInt(event.target.value)) {
      setId(parseInt(event.target.value));
    }
    else {
      setId(null);
    }
  }
  const onLogin = async () => {
    loginMutation.mutate({ id, password });
  }
  console.log(id, ", ", password);

  return (
    <>
      {mode == 0 ?
        <div>
          <div>
            <label>id: </label>
            <input type="text" onChange={onIdChange} />
          </div>
          <div>
            <label>password: </label>
            <input type="password" onChange={onPasswordChange} />
          </div>

          {error ? <p>wrong username/ password!</p> : null}
          <button onClick={onLogin}>login</button>
        </div>
        : mode == 1 ? <Admin /> : <Users id={id} />
      }
    </>
  );
}

export default App
