import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaSearch, FaTimes, FaBars, FaUserShield } from "react-icons/fa";

export default function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = !!user;
  const isAdmin = user?.isAdmin === true;
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(query)}`);
      setShowSearch(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="site-header">
      {/* Left: Hamburger Menu */}
      <button
        className="menu-toggle"
        onClick={() => setShowMenu(!showMenu)}
        aria-label="Toggle menu"
      >
        {showMenu ? <FaTimes /> : <FaBars />}
      </button>

      {/* Center: Logo */}
      <div className="header-logo">
        <Link to="/" className="logo-text">
          Donda Puppies
        </Link>
      </div>

      {/* Desktop searchbar */}
       <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search for puppies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          className="search-bar"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Right: Search icon */}
      <button
        className="search-toggle"
        onClick={() => setShowSearch(!showSearch)}
        aria-label="Toggle search"
      >
        {showSearch ? <FaTimes /> : <FaSearch />}
      </button>

    

      {/* Slide-down search bar */}
      {showSearch && (
        <div className="mobile-search-bar">
          <input
            type="text"
            placeholder="Search for puppies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      )}

      {/* Desktop navigation links */}
       <nav className="desktop-nav">
        <ul>
          <li><Link to="/" className="link">Home</Link></li>
          <li><Link to="/puppies" className="link">Puppies</Link></li> 
          <li><Link to="/products" className="link">Products</Link></li> 
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          {isLoggedIn && !isAdmin && (
            <>
              <li><Link to="/cart">Cart</Link></li>  
              <li><Link to="/puppy-cart"> Puppy Cart</Link></li>       
              <li>
                <Link to="/userDashboard">Dashboard</Link>
              </li>
              <li>
                <span style={{ color: "white", textDecoration: "none"}}>Hi, {user?.name?.split(" ")[0]}</span>
              </li>              
            </>
          )}
          {isLoggedIn && isAdmin && (
            <>
              <li>
                <Link to="/adminDashboard" className="link">Admin Panel</Link>
              </li>
              <li><span style={{ color: "white" }}><FaUserShield/> {user.name}</span></li>
              
            </>
          )}
          {!isLoggedIn && (
            <>
              <li><Link to="/login" className="link">Login</Link></li>
              <li><Link to="/signup" className="link">Signup</Link></li>
            </>
          )}
        </ul>
      </nav>

      {/* Slide-in mobile menu */}
      <div className={`mobile-menu ${showMenu ? "open" : ""}`}>
        <ul>
          <li><Link to="/" onClick={() => setShowMenu(false)}>Home</Link></li>
          <li><Link to="/puppies" onClick={() => setShowMenu(false)}>Puppies</Link></li>
          <li><Link to="/products" onClick={() => setShowMenu(false)}>Products</Link></li>
          <li><Link to="/about" onClick={() => setShowMenu(false)}>About</Link></li>
          <li><Link to="/contact" onClick={() => setShowMenu(false)}>Contact</Link></li>

          {isLoggedIn && !isAdmin && (
            <>
              <li><Link to="/cart" onClick={() => setShowMenu(false)}>Cart</Link></li>
              <li><Link to="/puppy-cart" onClick={() => setShowMenu(false)}>Puppy Cart</Link></li>
              <li><Link to="/userDashboard" onClick={() => setShowMenu(false)}>Dashboard</Link></li>
              <li className="user-greeting">Hi, {user?.name?.split(" ")[0]}</li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          )}

          {isLoggedIn && isAdmin && (
            <>
              <li>
                <Link to="/adminDashboard" onClick={() => setShowMenu(false)}>
                  <FaUserShield /> Admin Panel
                </Link>
              </li>
              <li className="user-greeting">{user.name}</li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          )}

          {!isLoggedIn && (
            <>
              <li><Link to="/login" onClick={() => setShowMenu(false)}>Login</Link></li>
              <li><Link to="/signup" onClick={() => setShowMenu(false)}>Signup</Link></li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}
