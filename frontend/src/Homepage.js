import { useEffect, useRef, useState } from "react";
import { Link ,useLocation} from 'react-router-dom';
import axios from "axios";
import './HomePageStyles.css';

function Homepage() {
  const [movies, setMovies] = useState([]);
  const [filterMovies, setFilterMovies] = useState([]);
  const [userSearch, setUserSearch] = useState('');
  const [year, setYear] = useState('');
  const [language, setLanguage] = useState('');
  const [zoner, setZoner] = useState('');
  const [rating, setRating] = useState('');
  const [director, setDirector] = useState('');
  const [activeTab, setActiveTab] = useState('Movies');
  const [activeSection, setActiveSection] = useState('movies');
  const [carouselData, setCarouselData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);
  const API_URL = process.env.REACT_APP_API_URL;
  const location = useLocation();
const username = location?.state?.username || "User";

const [isAvatar1, setIsAvatar1] = useState(true);
const image1 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzfVvKwZ1_EHw0tuTfzK9NBtEXh8BwE4D3-A&s";
const image2 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjf0Ixe34aRn7tip59eNJcWsdo3duNzs75bA&s";

  useEffect(() => {
    axios.get(`${API_URL}${activeSection}`)
      .then(res => {
        setMovies(res.data);
        setFilterMovies(res.data);
      })
      .catch(err => console.error("Failed to fetch movies", err));
  }, [activeSection]);

  useEffect(() => {
    fetch(`${API_URL}Latest`)
      .then(res => res.json())
      .then(data => {
        if (activeSection === "movies") {
          setCarouselData(data.movies);
        } else if (activeSection === "shows") {
          setCarouselData(data.shows);
        } else if (activeSection === "webseries") {
          setCarouselData(data.webseries);
        } else {
          setCarouselData([]);
        }
      })
      .catch(err => console.error("Failed to load carousel data", err));
  }, [activeSection]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % carouselData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselData]);

  useEffect(() => {
    let filtered = movies;
    if (year) filtered = filtered.filter(movie => movie.year === parseInt(year));
    if (zoner) filtered = filtered.filter(movie => movie.zoner === zoner);
    if (language) filtered = filtered.filter(movie => movie.language === language);
    if (director) filtered = filtered.filter(movie => movie.director === director);
    if (rating) filtered = filtered.filter(movie => movie.rating === parseFloat(rating));

    filtered = filtered.filter(movie =>
      movie.movie_name.toLowerCase().includes(userSearch.toLowerCase())
    );

    setFilterMovies(filtered);
  }, [userSearch, year, language, zoner, director, rating, movies]);

  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
  if (!carouselRef.current) return;
  let startX = 0;
  let endX = 0;

  const handleTouchStart = (e) => {
    startX = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) setActiveIndex((prev) => (prev + 1) % carouselData.length);
    if (endX - startX > 50) setActiveIndex((prev) => (prev - 1 + carouselData.length) % carouselData.length);
  };

  const track = carouselRef.current;
  track.addEventListener("touchstart", handleTouchStart);
  track.addEventListener("touchend", handleTouchEnd);

  return () => {
    track.removeEventListener("touchstart", handleTouchStart);
    track.removeEventListener("touchend", handleTouchEnd);
  };
}, [carouselData]);


  return (
    <>
      <header id="homeheader" className={isMobile ? "mobile-header" : ""}>
        <section id="logo">
          <div>
            <img src="./logo.png" alt="logo" />
          </div>
          <h1>Home <span>Theatre</span></h1>
        </section>

        {!isMobile && (
          <nav id="nav-tabs">
            {['Movies', 'Shows', 'Web Series'].map(tab => (
              <button
                key={tab}
                className={`nav-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab(tab);
                  setActiveSection(tab.toLowerCase().replace(' ', ''));
                }}
              >
                {tab}
              </button>
            ))}
          </nav>
        )}

        <section id="search-bar-account">
          <form>
            <input
              type="text"
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              placeholder="Search for movies..."
            />
          </form>



          <div
  className="user-avatar"
  style={{
    backgroundImage: `url(${isAvatar1 ? image1 : image2})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }}
  onClick={() => {
    const dropdown = document.getElementById("dropdown");
    dropdown.classList.toggle("show");
    setIsAvatar1(!isAvatar1); 
  }}
></div>

      

<div id="dropdown" className="user-dropdown">
  <h3>👋 Welcome, <span className="username">User</span></h3>
  <div className="username-wrapper">
    <p className="user-username"><strong>👤</strong> {username}</p>
  </div>
  <button className="dropdown-btn">🎟️ My Bookings</button>
  <button className="dropdown-btn">🕓 Watch History</button>
  <button className="dropdown-btn">❤️ Wishlist</button>
  <button className="dropdown-btn">💳 Subscription</button>
  <button className="dropdown-btn">⚙️ Settings</button>
  <button className="dropdown-btn">❓ Help</button>
  <button className="dropdown-btn logout" onClick={() => window.location.href = "/login"}>
    🚪 Logout
  </button>
</div>


        </section>
      </header>
{!isMobile && (
  <>
    <button className="carousel-btn left" onClick={() => setActiveIndex(prev => (prev - 1 + carouselData.length) % carouselData.length)}>
      &#8249;
    </button>
    <button className="carousel-btn right" onClick={() => setActiveIndex(prev => (prev + 1) % carouselData.length)}>
      &#8250;
    </button>
  </>
)}


      <section id="carousel">
        <div className="carousel-track" ref={carouselRef} style={{
          transform: `translateX(-${activeIndex * 100}%)`,
          transition: 'transform 0.8s ease-in-out'
        }}>
          {carouselData.slice(0, 5).map((movie, idx) => (
            <div className="carousel-item" key={idx}>
              <img src={movie.movie_pic} alt={movie.movie_name} />
              <div className="carousel-overlay">
                <div className="carousel-left">
                  <img src={movie.movie_pic} alt={movie.movie_name} className="poster" />
                </div>
                <div className="carousel-right">
                  <h2>{movie.movie_name}</h2>
                  <div className="rating-box">
                    <h3>
                      <span className="star">⭐</span> {movie.rating}/10 ({(movie.votes / 1000).toFixed(1)}K Votes)
                    </h3>
                    <button className="rate-btn">Rate Now</button>
                  </div>
                  <div className="meta">
                    <span className="badge">2D</span>
                    {movie.languages.map(lang => (
                      <span key={lang} className="badge">{lang}</span>
                    ))}
                  </div>
                  <div className="info">
                    {movie.duration} • {movie.genres.join(", ")} • {movie.certificate} • {movie.release_date}
                  </div>
                  <button className="Book_Now">Book Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>

          <div className="carousel-dots">
  {carouselData.map((_, index) => (
    <span
      key={index}
      className={`dot ${index === activeIndex ? "active" : ""}`}
      onClick={() => setActiveIndex(index)}
    ></span>
  ))}
</div>


      </section>

  


      <section id="filters">
          {isMobile && (
          <select className="options" onChange={(e) => {
            const value = e.target.value;
            setActiveTab(value);
            setActiveSection(value.toLowerCase().replace(' ', ''));
          }}>
            <option value="Movies">Movies</option>
            <option value="Shows">Shows</option>
            <option value="Web Series">Webseries</option>
          </select>
        )}
          <select className="options" onChange={(e) => setYear(e.target.value)}>
            <option value="">Year</option>
            {[2025, 2024, 2023, 2022, 2021, 2020].map(y => <option key={y} value={y}>{y}</option>)}
          </select>

          <select className="options" onChange={(e) => setLanguage(e.target.value)}>
            <option value="">Language</option>
            {['Telugu', 'English', 'Hindi'].map(lang => <option key={lang} value={lang.toLowerCase()}>{lang}</option>)}
          </select>

          <select className="options" onChange={(e) => setZoner(e.target.value)}>
            <option value="">Zoner</option>
            {['Action', 'Comedy', 'Thriller', 'Romantic', 'Drama', 'Sci-Fi', 'Fantasy'].map(z => <option key={z} value={z.toLowerCase()}>{z}</option>)}
          </select>

          <select className="options" onChange={(e) => setRating(e.target.value)}>
            <option value="">Rating</option>
            {[4.8, 4.7, 3.9, 4.2, 4.5, 4.0, 4.9, 4.6, 3.6, 4.3].map(r => <option key={r} value={r}>{r}</option>)}
          </select>

          <select className="options" onChange={(e) => setDirector(e.target.value)}>
            <option value="">Director</option>
            {["koratala siva", "sukumar", "kalyan shankar", "sailesh kolanu", "saikiran", "sekhar kammula", "rajamouli", "bhaskar", "puri jagannadh", "boyapati srinu", "anil ravipudi", "james cameron"].map(d => <option key={d} value={d}>{d}</option>)}
          </select>
    
      </section>




      <section id="parentStylesObject">
  {!movies.length ? (
  
    <div className="loading-wrapper">
      <div id="loading_box">
        <div className="clapper">
          <div className="top"></div>
          <img
            className="bottom-image"
            src="./loading_animation.png"
            alt="Movie Clapper Bottom"
          />
        </div>
        <p className="loading-text">Camera, rolling... ACTION!</p>
      </div>
    </div>
  ) : filterMovies.length > 0 ? (
  
    filterMovies.map(movie => (
      <div id="chaildStylesObject" key={movie._id}>
        <img id="imageStylesObject" src={movie.movie_pic} alt={movie.movie_name} />
        <div id="buttons">
          <Link to="/online" state={{ movie }}><button>Online</button></Link>
          <Link to="/offline" state={{ movie }}><button>Offline</button></Link>
        </div>
      </div>
    ))
  ) : (
  
    <h1 style={{ color: "red", textAlign: "center", width: "100dvw" }}>No Data Found</h1>
  )}
</section>




    </>
  );
}

export default Homepage;
