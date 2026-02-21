import AuthForm from './AuthForm';
import { Link } from 'react-router-dom';

const SignupPage = () => {
  return (
    <div className="auth-page">
      <div className="pattern-bg"></div>
      <div className="auth-card">
        <img src="/logo.png" alt="Logo" className="auth-logo" />
        <h2>Create Your Account</h2>
        <p>Join Go Furniture to get started!</p>
        <AuthForm type="signup" />
        <p className="redirect-text">
          Already have an account? <Link to="/login">Log in here</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;