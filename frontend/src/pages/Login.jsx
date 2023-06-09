import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import logo from '../assets/img/logo.svg'

const Login = () => {
    const [data, setData] = useState({username: "", password: ""})
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleChange = ({ currentTarget: input}) => {
        setData({...data, [input.name]: input.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:3000/api/auth/login";
            const { data: res } = await axios.post(url, data);
            localStorage.setItem("token", res.token);
            navigate("/");
        }
        catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }
    }

    return (
        <main className='auth'>
            <section className='login'>
                <img src={logo} className='logo' alt="Logo Groupomania" />
                <h1>Connexion</h1>
                <form action="POST" className='form' id="login__form" onSubmit={handleSubmit}>
                    <input type="text" name="username" value={data.username} onChange={handleChange} className="form__input" id="username" placeholder="Nom d'utilisateur" />
                    <input type="password" name="password" value={data.password} onChange={handleChange} className="form__input" id="password" placeholder='Mot de passe' />
                    {error && <div className="error_msg">{error}</div>}
                    <button type="submit" className="btn btn__primary">Connexion</button>
                </form>
                <Link to="/signup" className="btn btn__tertiary" >Pas encore inscrit?</Link>
            </section>
        </main>
    );
};

export default Login;