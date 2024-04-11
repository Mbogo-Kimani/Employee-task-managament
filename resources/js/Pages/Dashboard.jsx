import React from 'react'
import DashboardItem from '../Components/DashboardItem'

function Home({ auth, employees, departments, pendingLeaves, users, totalTasks }) {
  const data = [
    {
      numberToDisplay: employees,
      textToDisplay: 'Total Employees',
      pictureSrc: 'assests/image/teamwork.png',
      href: '/Employee/viewEmployee',
    },
    {
      numberToDisplay: totalTasks,
      textToDisplay: 'Assigned Task',
      pictureSrc: 'assests/image/task.png',
      href: '/Task/TaskList',
    },
    {
      numberToDisplay: departments,
      textToDisplay: 'Departments',
      pictureSrc: 'assests/image/department.png',
      href: '/Networking/department',
    },
    {
      numberToDisplay: pendingLeaves,
      textToDisplay: 'Leave Request',
      pictureSrc: 'assests/image/leave.png',
      href: '/Leave/LeaveStatus',
    },
    {
      numberToDisplay: users,
      textToDisplay: 'Assigned Task',
      pictureSrc: 'assests/image/users.png',
      href: '/users',
    },
  ];

  return (
    <div>
      <div className="page-header ">
        <span id="dayOfWeek" className="page-heading" style={{fontSize: '30px'}}></span>
        <br/>
        <span id='ct7' className="page-heading text-[25px]" style={{fontSize: '25px'}}></span>
        <p className="fw-medium fs-5 animated-text"> <span>Hello,</span>
          <span className="fw-bold ">{ auth?.user?.name }</span>
          <span>Welcome</span>
          <span>to</span>
          <span>Elephant</span>
          <span>Technologies</span>
        </p>
        <hr/>
      </div>
      <section className="mb-3 mb-lg-5">
        <div className="row mb-3">
          {
            (Array.isArray(data) ? data : []).map((item, idx) => {
              return (
                <DashboardItem
                  key={idx}
                  numberToDisplay={item.numberToDisplay}
                  textToDisplay={item.textToDisplay}
                  pictureSrc={item.pictureSrc}
                  href={item.href}
                />
              )
            })
          }
        
          
          <div className="col-sm-6 col-lg-3 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h4 className="fw-normal text-success"></h4>
                    <p className="subtitle text-sm text-muted mb-0">Payrolls History</p>
                  </div>
                  <div className="flex-shrink-0 ms-3">
                    <div>
                      <img
                        className="img-fluid custom-small-img"
                        src="{{ asset('assests/image/money.png') }}"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <a className="text-decoration-none" href="{{ route('payroll.view') }}">
                <div className="card-footer py-3 bg-green-light">
                  <div className="row align-items-center text-green">
                    <div className="col-10">
                      <p className="mb-0">View Details</p>
                    </div>
                    <div className="col-2 text-end"><i className="fas fa-caret-up"></i>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>

          <div className="col-sm-6 col-lg-3 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h4 className="fw-normal text-green"></h4>
                    <p className="subtitle text-sm text-muted mb-0">My Profile</p>
                  </div>
                  <div className="flex-shrink-0 ms-3">
                    <div>
                      <img
                        className="img-fluid custom-small-img"
                        src="{{ asset('assests/image/profile.png') }}"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <a className="text-decoration-none" href="{{ route('profile') }}">
                <div className="card-footer py-3 bg-green-light">
                  <div className="row align-items-center text-green">
                    <div className="col-10">
                      <p className="mb-0">View Details</p>
                    </div>
                    <div className="col-2 text-end">
                      <i className="fas fa-caret-up"></i>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>

          <div className="col-sm-6 col-lg-3 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h4 className="fw-normal text-primary"></h4>
                    <p className="subtitle text-sm text-muted mb-0">My Payroll</p>
                  </div>
                  <div className="flex-shrink-0 ms-3">
                    <div>
                      <img
                        className="img-fluid custom-small-img"
                        src="{{ asset('assests/image/exchange.png') }}"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <a className="text-decoration-none" href="{{ route('myPayroll') }}">
                <div className="card-footer py-3 bg-primary-light">
                  <div className="row align-items-center text-primary">
                    <div className="col-10">
                      <p className="mb-0">View Details</p>
                    </div>
                    <div className="col-2 text-end">
                      <i className="fas fa-caret-up"></i>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>

          <div className="col-sm-6 col-lg-3 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h4 className="fw-normal text-green">{ '$pendingLeaves' }</h4>
                    <p className="subtitle text-sm text-muted mb-0">My Leave</p>
                  </div>
                  <div className="flex-shrink-0 ms-3">
                    <div>
                      <img 
                        className="img-fluid custom-small-img"
                        src="{{ asset('assests/image/logout.png') }}"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <a className="text-decoration-none" href="{{ route('leave.myLeave') }}">
                <div className="card-footer py-3 bg-dark-light">
                  <div className="row align-items-center text-dark">
                    <div className="col-10">
                      <p className="mb-0">View Details</p>
                    </div>
                    <div className="col-2 text-end">
                      <i className="fas fa-caret-up"></i>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
