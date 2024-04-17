import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {MdSearch} from 'react-icons/md'
import Header from '../Header'
import FilterJobs from '../FilterJobs'
import JobsItem from '../JobsItem'
import './index.css'

const switchLoading = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    isProfileLoading: switchLoading.initial,
    profileDetails: {},
    searchInput: '',
    jobsAvailable: [],
    jobsState: switchLoading.initial,
    salaryRangeSelect: '',
    employmentVarieties: [],
  }

  componentDidMount() {
    this.getProfileApi()
    this.getJobsApi()
  }

  getProfileApi = async () => {
    this.setState({isProfileLoading: switchLoading.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch('https://apis.ccbp.in/profile', options)
    const fetchedProfile = await response.json()
    if (response.ok) {
      console.log(fetchedProfile)
      const fetchedProfileDetails = {
        name: fetchedProfile.profile_details.name,
        profileImageUrl: fetchedProfile.profile_details.profile_image_url,
        shortBio: fetchedProfile.profile_details.short_bio,
      }
      this.setState({
        isProfileLoading: switchLoading.success,
        profileDetails: fetchedProfileDetails,
      })
    } else {
      this.setState({
        isProfileLoading: switchLoading.failure,
      })
    }
  }

  getJobsApi = async () => {
    this.setState({
      jobsState: switchLoading.inProgress,
    })
    const {searchInput, salaryRangeSelect, employmentVarieties} = this.state
    const emp = employmentVarieties.join(',')
    console.log(emp)
    const recruitingApi = `https://apis.ccbp.in/jobs?employment_type=${emp}&minimum_package=${salaryRangeSelect}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(recruitingApi, options)
    const fetchedJobs = await response.json()
    if (response.ok) {
      const {jobs} = fetchedJobs
      const fetchedJobsList = jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      console.log(fetchedJobsList)
      this.setState({
        jobsAvailable: fetchedJobsList,
        jobsState: switchLoading.success,
      })
    } else {
      console.log('vishnu')
      this.setState({
        jobsState: switchLoading.failure,
      })
    }
  }

  retryClick = () => {
    this.getProfileApi()
  }

  jobsRetryClick = () => {
    this.getJobsApi()
  }

  changeSearchInput = e => {
    this.setState({
      searchInput: e.target.value,
    })
  }

  SearchInputClick = () => {
    this.getJobsApi()
  }

  changeSalaryRange = salary => {
    this.setState(
      {
        salaryRangeSelect: salary,
      },
      this.getJobsApi,
    )
  }

  employmentTypes = type => {
    const {employmentVarieties} = this.state
    if (employmentVarieties.includes(type)) {
      this.setState(
        prevState => ({
          employmentVarieties: prevState.employmentVarieties.filter(
            eachItem => eachItem !== type,
          ),
        }),
        this.getJobsApi,
      )
    } else {
      this.setState(
        prevState => ({
          employmentVarieties: [...prevState.employmentVarieties, type],
        }),
        this.getJobsApi,
      )
    }
  }

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileSuccess = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" className="profile-logo" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  renderProfileFailure = () => (
    <div className="loader-container">
      <button className="retry-button" type="button" onClick={this.retryClick}>
        Retry
      </button>
    </div>
  )

  renderProfileDetails = () => {
    const {isProfileLoading} = this.state
    switch (isProfileLoading) {
      case switchLoading.inProgress:
        return this.renderLoading()

      case switchLoading.success:
        return this.renderProfileSuccess()

      case switchLoading.failure:
        return this.renderProfileFailure()

      default:
        return null
    }
  }

  renderFilterJobs = () => (
    <div className="filter-jobs-container">
      {this.renderProfileDetails()}
      <FilterJobs
        changeSalaryRange={this.changeSalaryRange}
        employmentTypes={this.employmentTypes}
      />
    </div>
  )

  jobsLoading = () => (
    <div className="jobs-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  jobsSuccess = () => {
    const {jobsAvailable} = this.state
    return (
      <>
        {jobsAvailable.length === 0 ? (
          <div className="jobs-failure-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
              style={{width: '45%'}}
            />
            <h1 style={{fontSize: '40px', marginBottom: '0px'}}>
              No Jobs Found
            </h1>
            <p style={{fontSize: '14px', color: '#f1f5f9'}}>
              We could not find any jobs. Try other filters.
            </p>
          </div>
        ) : (
          <ul className="jobs-main-listing-container">
            {jobsAvailable.map(eachItem => (
              <JobsItem details={eachItem} key={eachItem.id} />
            ))}
          </ul>
        )}
      </>
    )
  }

  jobsFailure = () => (
    <div className="jobs-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        style={{width: '45%'}}
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
        onClick={this.jobsRetryClick}
      >
        Retry
      </button>
    </div>
  )

  renderJobsStatus = () => {
    const {jobsState} = this.state
    switch (jobsState) {
      case switchLoading.inProgress:
        return this.jobsLoading()

      case switchLoading.success:
        return this.jobsSuccess()

      case switchLoading.failure:
        return this.jobsFailure()

      default:
        return null
    }
  }

  renderMainContainer = () => {
    const {searchInput} = this.state
    return (
      <div className="right-main-container">
        <div className="search-container sc2">
          <input
            type="search"
            className="search-query"
            placeholder="Search"
            value={searchInput}
            onChange={this.changeSearchInput}
          />
          <div className="search-icon-container">
            <button
              className="search-button"
              id="searchButton"
              type="button"
              data-testid="searchButton"
              onClick={this.SearchInputClick}
              aria-label="Search"
            >
              <MdSearch className="search-icon" />
            </button>
          </div>
        </div>
        <>{this.renderJobsStatus()}</>
      </div>
    )
  }

  render() {
    const {searchInput} = this.state
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Header />
        <div className="jobs-whole-container">
          <div className="jobs-bg-container">
            <div className="search-container sc1">
              <input
                type="search"
                className="search-query"
                placeholder="Search"
                value={searchInput}
                onChange={this.changeSearchInput}
              />
              <div className="search-icon-container">
                <button
                  className="search-button"
                  id="searchButton"
                  type="button"
                  data-testid="searchButton"
                  onClick={this.SearchInputClick}
                  aria-label="Search"
                >
                  <MdSearch className="search-icon" />
                </button>
              </div>
            </div>
            {this.renderFilterJobs()}
            <>{this.renderMainContainer()}</>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
