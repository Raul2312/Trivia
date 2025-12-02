import '../css/Login.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  // Estado para el LOGIN
  const [email, setEmail] = useState("admin@jrs.com")
  const [password, setPassword] = useState("123456")

  // Estado para el REGISTRO (Nuevos)
  const [name, setName] = useState("")
  const [regEmail, setRegEmail] = useState("")
  const [regPassword, setRegPassword] = useState("")

  const navigate = useNavigate()

  // --- Lógica de Login ---
  const submit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()
      console.log("Respuesta Login:", data)

      if (res.ok && data.token) {

        // Guardar datos
        localStorage.setItem("token", data.token)
        localStorage.setItem("user", JSON.stringify(data.user))

        // 🔥🔥🔥 VALIDACIÓN PARA ADMINISTRADOR 🔥🔥🔥
        if (email === "admin@jrs.com" && password === "123456") {
          navigate("/admin")         // 🔥 Va al dashboard admin
        } else {
          navigate("/indexscreen")   // Usuarios normales
        }

      } else {
        alert("Credenciales incorrectas o error en el servidor")
      }
    } catch (err) {
      console.log(err)
      alert("Error al conectar con el servidor")
    }
  }

  // --- Lógica de Registro (Nueva) ---
  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch("http://localhost:8000/api/users", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          name: name,
          email: regEmail,
          password: regPassword
        })
      })

      const data = await res.json()
      console.log("Respuesta Registro:", data)

      if (res.ok) {
        alert("¡Usuario creado correctamente! Ahora inicia sesión.")
        
        setName("")
        setRegEmail("")
        setRegPassword("")
        
        toggleForm('login')
      } else {
        alert("Error al registrar: " + (data.message || "Verifica los datos"))
      }

    } catch (err) {
      console.log(err)
      alert("Error al intentar registrarse")
    }
  }

  // --- Animación de cambio de formulario ---
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

          {/* FORMULARIO DE LOGIN */}
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

          {/* FORMULARIO DE REGISTRO */}
          <form 
            className="register-form" 
            id="registerForm" 
            style={{ display: "none" }} 
            onSubmit={handleRegister}
          >
            <h2>Crear Cuenta</h2>
            <p>Únete a nuestra comunidad</p>

            <div className="input-group">
              <label>Nombre de Usuario</label>
              <input 
                type="text" 
                required 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input 
                type="email" 
                required 
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Contraseña</label>
              <input 
                type="password" 
                required 
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
              />
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
