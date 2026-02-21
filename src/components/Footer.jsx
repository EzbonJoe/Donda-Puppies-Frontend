import {useState, useEffect} from 'react';

const Footer = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Store Info */}
        <div className="footer-section">
          <h4>Auto-Mobile</h4>
          <p>Your trusted destination for quality cars in Uganda. Stylish, affordable, and built to last.</p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/products">Shop</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/faq">FAQs</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h4>Contact</h4>
          <p>📍 123 Home Street, Kamapala</p>
          <p>📞 +256 800 123 4567</p>
          <p>✉️ support@auto-mobile.ug</p>
        </div>

        {/* Newsletter */}
        <div className="footer-section">
          <h4>Newsletter</h4>
          <p>Subscribe for updates and special offers</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Your email" />
            <button type="submit">Subscribe</button>
          </form>
          <div className="social-icons">
            <button href="#"><i className="fab fa-facebook-f"></i></button>
            <button href="#"><i className="fab fa-instagram"></i></button>
            <button href="#"><i className="fab fa-twitter"></i></button>
          </div>
        </div>
      </div>

      {showButton && (
        <button className={`back-to-top ${showButton ? "visible" : ""}`} onClick={scrollToTop}>
          <i className="fas fa-chevron-up"></i>
        </button>
      )}

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Auto-mobile. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;