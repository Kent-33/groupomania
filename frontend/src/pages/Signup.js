import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import logo from '../assets/img/logo.svg';

const Signup = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    async function submit(e) {
        e.preventDefault();

        try{
            await axios.post("http://localhost:3000/api/auth/signup", {
                username, email, password
            })
            navigate("/login");
        }
        catch(e) {
            console.log(e);
        }
    }
    return (
        <main className='auth'>
            <section className='signup'>
                <img src={logo} className='logo' alt="Logo Groupomania" />
                <h1>Inscritpion</h1>
                <form action="POST" className='form' id="signup__form">
                    <input type="text" className="form__input" onChange={e => setUsername(e.target.value)}  id="username" placeholder="Nom d'utilisateur" />
                    <input type="email" className="form__input" onChange={e => setEmail(e.target.value)} id="email" placeholder='Email' />
                    <input type="password" className="form__input" onChange={e => setPassword(e.target.value)} id="password" placeholder='Mot de passe' />
                    <button className="btn btn__primary" onClick={submit}>S'enregistrer</button>
                </form>
                <Link to="/login" className="btn btn__tertiary">Vous avez déjà un compte ?</Link>
            </section>
        </main>
        
    );
};

export default Signup;