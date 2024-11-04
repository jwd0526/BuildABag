import './Nav.scss';
import '../../../../public/logo.svg';

interface NavHeaderProps {
  label: string;
}

const NavHeader: React.FC<NavHeaderProps> = ({ label }) => (
  <div className="navigation-pill">
    <div className="nav-header">{label}</div>
  </div>
);

const Nav: React.FC = () => {
  return (
    <div className="header">
      <div className="navigation-pill-list">
        <div className="title">
          <div className="logo-box">
            <img className="logo" src="logo.svg" alt="Logo" />
          </div>
          <div className="build-a-bag">BuildABag</div>
        </div>
        <NavHeader label="Clubs" />
        <NavHeader label="Resources" />
        <NavHeader label="Contact" />
      </div>
      <div className="header-auth">
        <NavHeader label="Home" />
        <div className="profile-button">
          <NavHeader label="JD" />
        </div>
      </div>
    </div>
  );
};

export default Nav;
