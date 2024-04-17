import './index.css'

const FilterJobs = props => {
  const {changeSalaryRange, employmentTypes} = props
  const changeRadio = e => {
    changeSalaryRange(e.target.value)
  }

  const changeCheckBox = type => {
    employmentTypes(type)
  }

  return (
    <>
      <hr className="hori" />
      <div className="employment-container">
        <h1 style={{fontSize: '16px', fontWeight: '400', marginBottom: '15px'}}>
          Type of Employment
        </h1>
        <ul className="ul-employment">
          <li className="employment-list">
            <input
              type="checkbox"
              id="fullTime"
              onChange={() => changeCheckBox('FULLTIME')}
            />
            <label htmlFor="fullTime" className="checkbox-label">
              Full Time
            </label>
          </li>
          <li className="employment-list">
            <input
              type="checkbox"
              id="partTime"
              onChange={() => changeCheckBox('PARTTIME')}
            />
            <label htmlFor="partTime" className="checkbox-label">
              Part Time
            </label>
          </li>
          <li className="employment-list">
            <input
              type="checkbox"
              id="freelance"
              onChange={() => changeCheckBox('FREELANCE')}
            />
            <label htmlFor="freelance" className="checkbox-label">
              Freelance
            </label>
          </li>
          <li className="employment-list">
            <input
              type="checkbox"
              id="internship"
              onChange={() => changeCheckBox('INTERNSHIP')}
            />
            <label htmlFor="internship" className="checkbox-label">
              Internship
            </label>
          </li>
        </ul>
      </div>
      <hr className="horiz" />
      <div className="employment-container">
        <h1 style={{fontSize: '16px', fontWeight: '400', marginBottom: '15px'}}>
          Salary Range
        </h1>
        <ul className="ul-employment">
          <li className="employment-list">
            <input
              type="radio"
              id="10"
              name="salary"
              value="1000000"
              onChange={changeRadio}
            />
            <label htmlFor="10" className="checkbox-label">
              10 LPA and above
            </label>
          </li>
          <li className="employment-list">
            <input
              type="radio"
              id="20"
              name="salary"
              value="2000000"
              onChange={changeRadio}
            />
            <label htmlFor="20" className="checkbox-label">
              20 LPA and above
            </label>
          </li>
          <li className="employment-list">
            <input
              type="radio"
              id="30"
              name="salary"
              value="3000000"
              onChange={changeRadio}
            />
            <label htmlFor="30" className="checkbox-label">
              30 LPA and above
            </label>
          </li>
          <li className="employment-list">
            <input
              type="radio"
              id="40"
              name="salary"
              value="4000000"
              onChange={changeRadio}
            />
            <label htmlFor="40" className="checkbox-label">
              40 LPA and above
            </label>
          </li>
        </ul>
      </div>
    </>
  )
}

export default FilterJobs
