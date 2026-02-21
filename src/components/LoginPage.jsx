import AuthForm from './AuthForm';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className="auth-page">
      <div className="pattern-bg"></div>
      <div className="auth-card">
        <img src="/logo.png" alt="Logo" className="auth-logo" />
        <h2>Welcome Back</h2>
        <p>Please enter your credentials to log in.</p>
        <AuthForm type="login" />
        <p className="redirect-text">
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;