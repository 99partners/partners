// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Login = ({ onLogin }) => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (username === "admin" && password === "admin123") {
//       const user = { username: "admin" };
//       localStorage.setItem("admin-user", JSON.stringify(user));
//       onLogin(); 
//       navigate("/admin");
//     } else {
//       alert("❌ Invalid credentials");
//     }
//   };

//   return (
//     <div className="login-page" style={styles.container}>
//       <form onSubmit={handleSubmit} style={styles.form}>
//         <h2 style={styles.heading}>Admin Login</h2>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           style={styles.input}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           style={styles.input}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit" style={styles.button}>
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     display: "flex",
//     height: "100vh",
//     justifyContent: "center",
//     alignItems: "center",
//     background: "#f7f7f7",
//   },
//   form: {
//     background: "#fff",
//     padding: "2rem",
//     borderRadius: "8px",
//     boxShadow: "0 0 12px rgba(0,0,0,0.1)",
//     display: "flex",
//     flexDirection: "column",
//     width: "300px",
//   },
//   heading: {
//     marginBottom: "1rem",
//     textAlign: "center",
//   },
//   input: {
//     padding: "10px",
//     marginBottom: "1rem",
//     border: "1px solid #ccc",
//     borderRadius: "4px",
//   },
//   button: {
//     background: "#0e7afe",
//     color: "#fff",
//     padding: "10px",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//   },
// };

// export default Login;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import "../styles/main.css";

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    email: "admin@99P.in",
    password: ""
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ADMIN_EMAIL = "admin@99P.in";
    const ADMIN_PASSWORD = "admin123";

    try {
      if (
        credentials.email === ADMIN_EMAIL &&
        credentials.password === ADMIN_PASSWORD
      ) {
        localStorage.setItem("adminToken", "admin-authenticated");
        localStorage.setItem("admin-user", JSON.stringify({ 
          username: "admin",
          email: credentials.email
        }));
        
        toast.success("Login successful!");
        onLogin();
        navigate("/admin");
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      toast.error("Login failed");
    }
  };

  return (
    <div className="auth-layout">
      <div className="admin-login">
        <h2 className="login-heading">Admin Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              className="login-input"
              value={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              className="login-input"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;