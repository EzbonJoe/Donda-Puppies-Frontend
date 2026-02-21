import { useState } from "react";
import authApi from "../api/authApi";
import { useNavigate } from "react-router-dom";
import {FaEye, FaEyeSlash} from 'react-icons/fa';
import cartApi from "../api/cartApi";


const AuthForm = ({ type }) => {
  const [form, setForm] = useState({name: '',  email: '', password: '', phone: '' });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (type === 'signup') {
        res = await authApi.signup(form);
      } else {
        // only send email and password for login
        const { email, password } = form;
        res = await authApi.login({ email, password }); 
      }

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      // Create a new cart for the user after login/signup
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user.id;
      await cartApi.createNewCart();


      // Navigate to dashboard
      if (res.data.user.isAdmin) {
        navigate('/adminDashboard');
      } else {
        navigate('/userDashboard');
      }
    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.message || 'Authentication failed');
    }
  };
   
  return (
    <form onSubmit={handleSubmit} className="auth-form">
      {type === 'signup' && (
        <>
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          /> 
          
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="+256 700 123456"
            required
          />
          
        </>
      )}
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })} 
        required
      />      

      <div className="password-field">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <span
          className="toggle-password-icon"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <FaEye /> : <FaEyeSlash />}
        </span>
      </div>
      
      <button type="submit">{type === 'signup' ? 'Sign Up' : 'Login'}</button>
    </form>
  );
 
}

export default AuthForm;
