import React from 'react'
import { Link } from 'react-router-dom'


const Footer = () => {
  return (
    <>
        <div className='bg-light text-dark p-5 container-fluid'>
            <div className="row">
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                    <div className=' d-flex justify-content-center'>
                        <div className="bg-dark text-light d-flex align-items-center justify-content-center me-3" style={{borderRadius:"50%",width:"50px",height:"50px"}}><i class="fa-brands fa-facebook-f fs-5"></i></div>
                        <div className="bg-dark text-light d-flex align-items-center justify-content-center me-3" style={{borderRadius:"50%",width:"50px",height:"50px"}}><i class="fa-brands fa-x-twitter fs-5"></i></div>
                        <div className="bg-dark text-light d-flex align-items-center justify-content-center me-3" style={{borderRadius:"50%",width:"50px",height:"50px"}}><i class="fa-brands fa-instagram fs-5"></i></div>
                        <div className="bg-dark text-light d-flex align-items-center justify-content-center me-3" style={{borderRadius:"50%",width:"50px",height:"50px"}}><i class="fa-brands fa-youtube fs-5"></i></div>
                        <div className="bg-dark text-light d-flex align-items-center justify-content-center" style={{borderRadius:"50%",width:"50px",height:"50px"}}><i class="fa-solid fa-envelope fs-5"></i></div>
                    </div>
                    <div className='d-flex mt-4 justify-content-center'>
                        
                            <Link to={'/'} className='text-dark fw-bold me-4' style={{textDecoration:"none"}}>Home</Link>
                        |
                        <Link to={'/login'} className='text-dark fw-bold me-4 ms-4' style={{textDecoration:"none"}}>Login</Link>
                        |
                        <Link to={'/dashboard'} className='text-dark fw-bold me-4 ms-4' style={{textDecoration:"none"}}>Dashboard</Link>
                        |
                        <Link to={'/history'} className='text-dark fw-bold  ms-4' style={{textDecoration:"none"}}>History</Link>
                    </div>
                </div>
                <div className="col-lg-4"></div>
            </div>
            <div className="d-flex justify-content-center"></div>
        </div>
        <div className="bg-dark p-3 row container-fluid">
        <div className="col-lg-4"></div>
        <div className="col-lg-4">
        <div className='d-flex justify-content-center'><Link className='text-light fw-bold ms-3 name' style={{ textDecoration: "none" }}><i class="fa-solid fa-list-check me-3"></i>TASK MANAGER</Link></div>
        <div className='text-center mt-2'>© 2024 Task Manager. All rights reserved.</div>
        </div>
        <div className="col-lg-4"></div>
        </div>
    </>
  )
}

export default Footer