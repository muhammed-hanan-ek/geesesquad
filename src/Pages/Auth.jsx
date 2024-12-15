import React, { useState } from 'react'
import { FloatingLabel, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { loginApi, registerApi } from '../Services/AllApi'



const Auth = ({ isReg }) => {
    const [userDetails,setUserDEtails]=useState({
        username:"",email:"",password:""
    })
    console.log(userDetails);
    const navigate = useNavigate()

    const handleRegister= async(e)=>{
        e.preventDefault();
        const {username,email,password}=userDetails
        if(username && email && password){
            try{
            const result=await registerApi(userDetails)
            console.log(result);
            if(result.status==200){
                alert(`welcome ${result?.data?.username}...`)
                setUserDEtails({username:"",email:"",password:""})
                navigate('/login')
              }else{
                if(result.response.status==406){
                  alert(result.response.data)
                  setUserDEtails({username:"",email:"",password:""})
                  navigate('/login')
                }
              }
            }catch(err){
                console.log(err);
                
            }
            
        }else{
            alert("Please Fill the Form Completely")
        }
    }

    const handleLogin = async(e)=>{
        e.preventDefault()
        if(userDetails.email && userDetails.password){
          try{
            const result = await loginApi(userDetails)
            console.log(result);
            
            if(result.status==200){
              sessionStorage.setItem("user",JSON.stringify(result.data.user))
              sessionStorage.setItem("token",result.data.token)
              setUserDEtails({username:"",email:"",password:""})
              alert("Login Successfull!!!")
              navigate('/dashboard')
            }else{
              if(result.response.status==404){
                alert(result.response.data)
              }
            }
      
          }catch(err){
            console.log(err);
            
          }
        }else{
          alert("Please fill the form completely!!!")
        }
      }
    
    return (
        <>

            <div className=' p-3'>
                <div className="row">
                    <div className="col-lg-5  d-flex justify-content-center align-items-center" style={{ minHeight: "80vh",borderRadius:"1000px 1000px 0px 900px",backgroundColor: "#12151a" }}>
                        <div><div className=' text-center' style={{ fontSize: "70px" }}><i class="fa-solid fa-list-check"></i></div>
                            <h1 className='fw-bold text-center ' style={{ fontSize: "50px" }}>TASK MANAGER</h1>
                        </div> </div>
                         <div className="col-lg-1"></div>
                    <div className="col-lg-6 mt-5 p-5" style={{borderRadius:"1000px 1000px 900px 0px",backgroundColor: "#12151a" }}>
                        <h1 className=' mt-5 fw-bold text-center'>{isReg ? "Welcome!! Register Now" : "Welcome Back!! Login"}</h1>
                        <div className="d-flex justify-content-center mt-5 w-100">
                            <div className='w-75'>
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Email address"
                                    className="mb-5 w-100"
                                >
                                    <Form.Control value={userDetails.email} onChange={e=>setUserDEtails({...userDetails,email:e.target.value})} type="email" placeholder="name@example.com" />
                                </FloatingLabel>
                                {isReg&&<FloatingLabel
                                    controlId="floatingInputUname"
                                    label="Username"
                                    className="mb-5 w-100"
                                >
                                    <Form.Control value={userDetails.username} onChange={e=>setUserDEtails({...userDetails,username:e.target.value})} type="text" placeholder="Username" />
                                </FloatingLabel>}
                                <FloatingLabel controlId="floatingPassword" label="Password">
                                    <Form.Control value={userDetails.password} onChange={e=>setUserDEtails({...userDetails,password:e.target.value})} type="password" placeholder="Password" />
                                </FloatingLabel>
                                <div className="d-flex justify-content-center mt-5">
                                    {isReg?<button onClick={handleRegister} className='btn btn-primary rounded fw-bold fs-5 w-100'>Register</button>
                                    :<button onClick={handleLogin} className='btn btn-primary rounded fw-bold w-100  fs-5'>Login</button>
                                }
                                </div>
                                {isReg
                                ?<div className='text-center mt-3'><Link to={'/login'} style={{textDecoration:"none"}}>Have account <span className='fw-bold'>Login Now!</span></Link></div>
                                
                            :<div className='text-center mt-3'><Link to={'/register'} style={{textDecoration:"none"}}>Don't have account <span className='fw-bold'>Create Now!</span></Link></div>}
                            </div>
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default Auth