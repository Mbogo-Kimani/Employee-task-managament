import React from 'react'

function DashboardItem({ numberToDisplay, textToDisplay, pictureSrc, href }) {
  return (
    <div className="col-sm-6 col-lg-3 mb-4 ">
      <div className="card h-100">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <h4 className="fw-normal text-red">{ numberToDisplay }</h4>
              <p className="subtitle text-sm text-muted mb-0">{ textToDisplay }</p>
            </div>
            <div className="flex-shrink-0 ms-3">
              <div>
                <img
                  className="img-fluid custom-small-img"
                  src={ pictureSrc }
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <a className="text-decoration-none" href={ href }>
          <div className="card-footer py-3 bg-red-light">
            <div className="row align-items-center text-red">
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
  )
}

export default DashboardItem