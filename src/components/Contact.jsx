import { useState } from "react";
import axios from "axios";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await axios.post("http://localhost:5000/api/contact", formData);
      setStatus(res.data.msg);
      setFormData({ name: "", email: "", message: "" }); // clear form
    } catch (err) {
      setStatus("Failed to send message. Please try again later.");
    }
  };

  return (
    <div className="contact">
      <h1>Contact Us</h1>
      
      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
        />
        
        <label htmlFor="email">Email:</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />
        
        <label htmlFor="message">Message:</label>
        <textarea 
          id="message" 
          name="message" 
          value={formData.message} 
          onChange={handleChange} 
          required
        ></textarea>
        
        <button type="submit">Send Message</button>
      </form>

      {/* Feedback */}
      {status && <p className="status">{status}</p>}
      <div className="contact-info">
        <h2>Our Office</h2>
        <p><strong>Address:</strong> 123 Furniture Street, Kampala, Uganda</p>
        <p><strong>Phone:</strong> +256 700 000 000</p>
        <p><strong>Email:</strong> furniture@example.com</p>

        <div className="social-links">
          <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a> | 
          <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a> | 
          <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a>
        </div>
      </div>
    
    </div>
    
  );
}