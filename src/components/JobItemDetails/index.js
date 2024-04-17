import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'
import Header from '../Header'
import './index.css'

const switchLoading = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    jobStatus: switchLoading.initial,
    selectedJobDetails: {},
    similarJobDetails: [],
  }

  componentDidMount() {
    this.getJobDetailsApi()
  }

  getJobDetailsApi = async () => {
    this.setState({
      jobStatus: switchLoading.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params

    const api = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(api, options)
    const fetchedData = await response.json()
    console.log(fetchedData)
    if (response.ok) {
      const fetchedSelectedJob = {
        companyLogoUrl: fetchedData.job_details.company_logo_url,
        companyWebsiteUrl: fetchedData.job_details.company_website_url,

        employmentType: fetchedData.job_details.employment_type,
        id: fetchedData.job_details.id,
        jobDescription: fetchedData.job_details.job_description,
        description: fetchedData.job_details.life_at_company.description,
        companyImageUrl: fetchedData.job_details.life_at_company.image_url,
        location: fetchedData.job_details.location,
        packagePerAnnum: fetchedData.job_details.package_per_annum,
        rating: fetchedData.job_details.rating,
        title: fetchedData.job_details.title,
        skills: fetchedData.job_details.skills.map(eachItem => ({
          imageUrl: eachItem.image_url,
          name: eachItem.name,
        })),
      }

      const fetchedSimilarJobs = fetchedData.similar_jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        rating: eachItem.rating,
        title: eachItem.title,
      }))

      console.log(fetchedSimilarJobs)
      this.setState({
        jobStatus: switchLoading.success,
        selectedJobDetails: fetchedSelectedJob,
        similarJobDetails: fetchedSimilarJobs,
      })
    } else {
      this.setState({
        jobStatus: switchLoading.failure,
      })
    }
  }

  itemRetryClick = () => {
    this.getJobDetailsApi()
  }

  skillsContainer = () => {
    const {selectedJobDetails} = this.state
    const {skills} = selectedJobDetails
    return (
      <div className="skills-job-container">
        <h2 className="skills-header">Skills</h2>
        <ul className="skills-list-ul">
          {skills.map(eachItem => (
            <li className="skill-each-list-item">
              <img
                src={eachItem.imageUrl}
                alt={eachItem.name}
                className="skills-img"
              />
              <p className="skill-name">{eachItem.name}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  selectedJobContainer = () => {
    const {selectedJobDetails} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      id,
      jobDescription,
      description,
      title,
      companyImageUrl,
      location,
      packagePerAnnum,
      rating,
    } = selectedJobDetails
    return (
      <div className="selected-job-details-container">
        <div className="top-company-logo-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo-jobsList comp-logo2"
          />
          <div className="role-top-container">
            <h1 className="role-designated des2">{title}</h1>
            <div
              style={{display: 'flex', alignItems: 'center', marginTop: '3px'}}
            >
              <FaStar className="fa-star star2" />
              <p className="rating-count count2">{rating}</p>
            </div>
          </div>
        </div>
        <div className="middle-job-package-container mid2">
          <div className="location-employment-container">
            <IoLocationSharp className="location-employment-images loc2" />
            <p className="location-para locpara2">{location}</p>
            <BsFillBriefcaseFill className="location-employment-images loc2" />
            <p className="employment-para empara2">{employmentType}</p>
          </div>
          <h1 className="package-heading pack2">{packagePerAnnum}</h1>
        </div>
        <hr className="breaker-middle" />
        <div className="description-job-container des-job-cont2">
          <div className="des-href-container">
            <h1 className="description-header-job des-head2">Description</h1>
            <a className="company-website-anchor" href={companyWebsiteUrl}>
              Visit <FiExternalLink style={{marginLeft: '5px'}} />
            </a>
          </div>
          <p className="description-content-job des-con2">{jobDescription}</p>
        </div>
        {this.skillsContainer()}
        <div className="company-life-culture-container">
          <h1 className="company-life-header">Life at Company</h1>
          <div className="life-des-container">
            <p className="life-des-para">{description}</p>
            <img src={companyImageUrl} className="life-img" alt={title} />
          </div>
        </div>
      </div>
    )
  }

  similarJobContainer = () => {
    const {similarJobDetails} = this.state
    return (
      <div className="similar-jobs-container">
        <h1 className="similar-job-header">Similar Jobs</h1>
        <ul className="similar-job-list-container">
          {similarJobDetails.map(eachItem => (
            <li className="similar-hob-list-item">
              <div className="top-similar-container">
                <img
                  src={eachItem.companyLogoUrl}
                  alt={eachItem.title}
                  className="similar-company-logo"
                />
                <div className="top-right-similar-container">
                  <h1 className="header-company-title">{eachItem.title}</h1>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginTop: '0px',
                    }}
                  >
                    <FaStar className="fa-star" />
                    <p className="rating-count">{eachItem.rating}</p>
                  </div>
                </div>
              </div>
              <h2 className="des-similar">Description</h2>
              <p className="des-para-similar">{eachItem.jobDescription}</p>
              <div className="location-employment-container">
                <IoLocationSharp className="location-employment-images " />
                <p className="location-para locpara2">{eachItem.location}</p>
                <BsFillBriefcaseFill className="location-employment-images " />
                <p className="employment-para empara2">
                  {eachItem.employmentType}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderLoading = () => (
    <div className="loader-container-job-details" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSuccess = () => (
    <div className="success-job-details-container">
      {this.selectedJobContainer()}
      {this.similarJobContainer()}
    </div>
  )

  renderFailure = () => (
    <div className="loader-container-job-details">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        style={{width: '30%'}}
      />
      <h1 style={{fontSize: '40px', marginBottom: '0px'}}>
        Oops! Something Went Wrong
      </h1>
      <p style={{fontSize: '14px', color: '#f1f5f9'}}>
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="jobs-retry-button"
        type="button"
        onClick={this.itemRetryClick}
      >
        Retry
      </button>
    </div>
  )

  renderJobItemDetails = () => {
    const {jobStatus} = this.state
    switch (jobStatus) {
      case switchLoading.inProgress:
        return this.renderLoading()
      case switchLoading.success:
        return this.renderSuccess()
      case switchLoading.failure:
        return this.renderFailure()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderJobItemDetails()}
      </>
    )
  }
}

export default JobItemDetails
