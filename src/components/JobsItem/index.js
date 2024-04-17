import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobsItem = props => {
  const {details} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    id,
    packagePerAnnum,
    rating,
    title,
  } = details
  return (
    <Link className="link-click" to={`/jobs/${id}`}>
      <li className="job-each-item-container">
        <div className="top-company-logo-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo-jobsList"
          />
          <div className="role-top-container">
            <h1 className="role-designated">{title}</h1>
            <div
              style={{display: 'flex', alignItems: 'center', marginTop: '-2px'}}
            >
              <FaStar className="fa-star" />
              <p className="rating-count">{rating}</p>
            </div>
          </div>
        </div>
        <div className="middle-job-package-container">
          <div className="location-employment-container">
            <IoLocationSharp className="location-employment-images" />
            <p className="location-para">{location}</p>
            <BsFillBriefcaseFill className="location-employment-images" />
            <p className="employment-para">{employmentType}</p>
          </div>
          <h1 className="package-heading">{packagePerAnnum}</h1>
        </div>
        <hr className="breaker-middle" />
        <div className="description-job-container">
          <h1 className="description-header-job">Description</h1>
          <p className="description-content-job">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobsItem
