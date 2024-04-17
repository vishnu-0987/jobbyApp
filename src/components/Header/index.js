import {FiLogOut} from 'react-icons/fi'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const logoutClick = props => {
  Cookies.remove('jwt_token')
  const {history} = props
  history.replace('/login')
}

const Header = props => (
  <nav className="header-navbar">
    <div className="nav-content-large">
      <Link className="route-link-header-items" to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="header-logo"
        />
      </Link>
      <ul className="header-items">
        <li className="nav-list-item">
          <Link className="route-link-header-items" to="/">
            Home
          </Link>
        </li>
        <li className="nav-list-item">
          <Link className="route-link-header-items" to="/jobs">
            Jobs
          </Link>
        </li>
      </ul>
      <button
        className="logout-button"
        type="button"
        onClick={() => logoutClick(props)}
      >
        Logout
      </button>
    </div>
    <div className="nav-content-small">
      <Link className="route-link-header-items" to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="header-logo"
        />
      </Link>
      <ul className="header-items">
        <li className="nav-list-item">
          <Link className="route-link-header-items" to="/">
            <AiFillHome className="nav-item-img" />
          </Link>
        </li>
        <li className="nav-list-item">
          <Link className="route-link-header-items" to="/jobs">
            <BsBriefcaseFill className="nav-item-img" />
          </Link>
        </li>
        <li className="nav-list-item">
          <FiLogOut
            className="nav-item-img"
            onClick={() => logoutClick(props)}
          />
        </li>
      </ul>
    </div>
  </nav>
)

export default withRouter(Header)
