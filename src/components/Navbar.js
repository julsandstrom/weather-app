import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header className="d-flex justify-content-between align-items-center p-3 px-md-4 bg-light border-bottom box-shadow">
     
      <div className="d-flex align-items-center">
        <h4 className="my-0 font-weight-bold" style={{
          fontWeight: 'bold', 
          textShadow: '1px 1px 1px rgba(0, 0, 0, 0.3)',
          color: '#333',
        }}>Global Window</h4>
        <img 
          src="https://cdn.pixabay.com/photo/2024/05/18/01/15/window-8769303_1280.png" 
          alt="Window Icon" 
          style={{
            width: '30px', 
            height: '30px', 
            marginLeft: '10px' 
          }}
        />
      </div>
    
      <nav className="my-2 my-md-0">
  <a className="cool-link" href="https://www.youtube.com/watch?v=NCfMPD5A6hQ" target="_blank" rel="noopener noreferrer">Stockholm (Live)</a>
  <a className="cool-link" href="https://www.youtube.com/watch?v=AqkYfZl4vkA" target="_blank" rel="noopener noreferrer">Gothenburg (Live)</a>
</nav>
    </header>
  );
}

export default Navbar;