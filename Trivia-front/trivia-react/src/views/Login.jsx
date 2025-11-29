import '../css/Login.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState("admin@jsr.com")
  const [password, setPassword] = useState("123456")

  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      })

      const data = await res.json()
      console.log("Respuesta:", data)

      // Verifica si la API envió el token correctamente
      if (res.ok && data.token) {
        // Guardar token y user en localStorage
        localStorage.setItem("token", data.token)
        localStorage.setItem("user", JSON.stringify(data.user))

        // Opcional: redirigir al dashboard
        navigate("/indexscreen")
      } else {
        alert("Credenciales incorrectas o error en el servidor")
      }

    } catch (err) {
      console.log(err)
      alert("Error al conectar con el servidor")
    }
  }

  const toggleForm = (formType) => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (formType === 'register') {
      loginForm.style.opacity = 0;
      loginForm.style.transform = 'translateX(-100%)';

      setTimeout(() => {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        setTimeout(() => {
          registerForm.style.opacity = 1;
          registerForm.style.transform = 'translateX(0)';
        }, 10);
      }, 500);

    } else {
      registerForm.style.opacity = 0;
      registerForm.style.transform = 'translateX(100%)';

      setTimeout(() => {
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
        setTimeout(() => {
          loginForm.style.opacity = 1;
          loginForm.style.transform = 'translateX(0)';
        }, 10);
      }, 500);
    }
  }

  return (
    <>
      <div className="body">
        <ul className="background-animado">
          <li></li><li></li><li></li><li></li><li></li>
          <li></li><li></li><li></li><li></li><li></li>
        </ul>

        <div className="login-container">
          <form className="login-form" id="loginForm" onSubmit={submit}>
            <h2>Bienvenido de Nuevo</h2>
            <p>Ingresa a tu cuenta con estilo</p>

            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Contraseña</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit">Iniciar Sesión</button>

            <div className="footer">
              <a href="#">¿Olvidaste tu contraseña?</a>
              <a onClick={() => toggleForm('register')}>¿No tienes cuenta? Regístrate</a>
            </div>
          </form>

          <form className="register-form" id="registerForm" style={{ display: "none" }}>
            <h2>Crear Cuenta</h2>
            <p>Únete a nuestra comunidad</p>

            <div className="input-group">
              <label>Nombre de Usuario</label>
              <input type="text" required />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input type="email" required />
            </div>

            <div className="input-group">
              <label>Contraseña</label>
              <input type="password" required />
            </div>

            <button type="submit">Registrarse</button>

            <div className="footer2">
              <a onClick={() => toggleForm('login')}>
                ¿Ya tienes cuenta? Inicia Sesión
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
