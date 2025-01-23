import { BriefcaseIcon } from 'lucide-react';

interface LandingProps {
  onGetStarted: () => void;
}

export function Landing({ onGetStarted }: LandingProps) {
  return (
    <div className="landing-container">
      {/* Header */}
      <header className="landing-header">
        <nav className="nav-container">
          <div className="logo">
            <BriefcaseIcon className="h-6 w-6" />
            <span>jobstera</span>
          </div>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#solutions">Solutions</a>
            <a href="#blog">Blog</a>
            <a href="#contact">Contact Us</a>
          </div>
          <div className="nav-auth">
            <button className="login-btn" onClick={onGetStarted}>Login</button>
            <button className="register-btn" onClick={onGetStarted}>Register Now</button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <span>🎯 Find opportunities worldwide</span>
          </div>
          <h1>Supporting Job Seekers Every Step of the Way</h1>
          <p>Unlock new opportunities and discover a world of possibilities that align with your skills, interests, and aspirations.</p>
          
          <div className="stats-container">
            <div className="stat-item">
              <span className="stat-number">400K</span>
              <span className="stat-label">Active Users</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">20K</span>
              <span className="stat-label">Companies</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">800K</span>
              <span className="stat-label">Job Posts</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">120</span>
              <span className="stat-label">Countries</span>
            </div>
          </div>

          <div className="trusted-by">
            <span>Trusted By:</span>
            <div className="company-logos">
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" alt="Microsoft" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="feature-card">
          <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e" alt="Job Search" className="feature-image" />
          <div className="feature-content">
            <h3>The things you care about matter to Jobstera</h3>
            <p>Unlock your potential and discover a world of opportunities that align with your skills, interests, and aspirations.</p>
            <button className="feature-btn" onClick={onGetStarted}>Get Started</button>
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="integration-section">
        <h2>We Empower Job Seekers Like You To Streamline And Supercharge Your Job Search.</h2>
        <div className="integration-grid">
          {/* Integration cards would go here */}
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Newsletter</h4>
            <p>Stay up to date with the latest job opportunities and career advice.</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email" />
              <button>Subscribe</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}