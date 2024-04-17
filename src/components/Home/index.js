import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <div style={{display: 'flex', flexDirection: 'column'}}>
    <Header />
    <div className="home-bg-container">
      <h1 className="home-content-header">Find The Job That Fits Your Life</h1>
      <p className="home-content-para">
        Millions of people are searching for jobs, salary information, company
        reviews. Find the job that fits your abilities and potential.
      </p>
      <Link className="link-route-home" to="/jobs">
        <button className="find-jobs-button" type="button">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)

export default Home
