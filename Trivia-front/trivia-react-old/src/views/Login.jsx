import '../css/Login.css'
import { useState } from 'react'

export default function Login() {
    const[email, setEmail] = useState("admin@jsr.com")
    const [password, setPassword] = useState("123456")

    const submit = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch("http://localhost:8000/api/login", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
            const data = await res.json()
             console.log("Respuesta", data)
        } catch (err) {
            console.log(err)
        }
    }

    const toggleForm = (formType) => {
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        const container = document.querySelector('.login-container');

        if (formType === 'register') {
            // Oculta el login y muestra el registro con transición suave
            loginForm.style.opacity = 0;
            loginForm.style.transform = 'translateX(-100%)';

            setTimeout(() => {
                loginForm.style.display = 'none';
                registerForm.style.display = 'block';
                setTimeout(() => {
                    registerForm.style.opacity = 1;
                    registerForm.style.transform = 'translateX(0)';
                }, 10);
            }, 500); // Espera a que termine la animación de salida

        } else {
            // Oculta el registro y muestra el login con transición suave
            registerForm.style.opacity = 0;
            registerForm.style.transform = 'translateX(100%)';

            setTimeout(() => {
                registerForm.style.display = 'none';
                loginForm.style.display = 'block';
                setTimeout(() => {
                    loginForm.style.opacity = 1;
                    loginForm.style.transform = 'translateX(0)';
                }, 10);
            }, 500); // Espera a que termine la animación de salida
        }
    }
    return (
        <>

            <ul className="background-animado">
                <li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>
            </ul>
            <div className="login-container">
                <form className="login-form" id="loginForm" onSubmit={submit}>
                    <h2>Bienvenido de Nuevo</h2>
                    <p>Ingresa a tu cuenta con estilo</p>
                    <div className="input-group">
                        <label htmlFor="username">Email</label>
                        <input type="email" id="username" name="username" required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" id="password" name="password" required 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit">Iniciar Sesión</button>
                    <div className="footer">
                        <a href="#">¿Olvidaste tu contraseña?</a>
                        <a href="#" onClick={() => toggleForm('register')}>¿No tienes cuenta? Regístrate</a>
                    </div>
                </form>

                <form className="register-form" id="registerForm" style={{ display: "none" }}>
                    <h2>Crear Cuenta</h2>
                    <p>Únete a nuestra comunidad</p>
                    <div className="input-group">
                        <label htmlFor="reg-username">Nombre de Usuario</label>
                        <input type="text" id="reg-username" name="reg-username" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="reg-email">Email</label>
                        <input type="email" id="reg-email" name="reg-email" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="reg-password">Contraseña</label>
                        <input type="password" id="reg-password" name="reg-password" required />
                    </div>
                    <button type="submit">Registrarse</button>
                    <div className="footer2">
                        <a onClick={() => toggleForm('login')}>¿Ya tienes cuenta? Inicia Sesión</a>
                    </div>
                </form>
            </div>




        </>
    )
}