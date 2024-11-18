"use client";

import Nav from "../components/Nav/Nav";
import '../../../public/logo.svg';
import '../../../public/arrow.svg';
import "./LandingPage.css";

interface LandingPageProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const LandingPage: React.FC<LandingPageProps> = ({ className = "", ...props }) => {
  const handleCTA = () => {
    const exampleSection = document.querySelector('.example-section');
    if (exampleSection) {
      exampleSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className={`landing-page ${className}`} {...props}>
      <Nav />
      <div className="background-overlay">
        <img className="background-logo" src="logo.svg" alt="Background Logo" />
      </div>
      
      <div className="content">
        <div className="headline-container">
          <div className="headline-text">
            <h1 className="primary-title">Build your golf bag, the way you want it.</h1>
            <p className="secondary-title">
              No more jumping around between websites to find the clubs you want.
            </p>
          </div>
        </div>
        <div className="cta-container clickable" onClick={handleCTA}>
          <button className="cta-button">VIEW BUILDS</button>
          <img className="cta-arrow" src="arrow.svg" alt="Arrow Icon" />
        </div>
      </div>
      <section className="example-section">
        <div className="example-text">BUILD EXAMPLE</div>
      </section>
    </div>
  );
};

export default LandingPage;