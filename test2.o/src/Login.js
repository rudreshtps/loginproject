import React, { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

import GoogleLogo from './Img/search.png';

function Login() {
    const navigate = useNavigate();
    const [name, setUserName] = useState('');
    const [email, setuserEmail] = useState('');
    const [picture, setuserpicture] = useState('');
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);

    const handleLogin = useGoogleLogin({
        onSuccess: (codeResponse) => {
            setUser(codeResponse);
        },
        onError: (error) => console.error('Login Failed:', error)
    });

    useEffect(() => {
        if (user) {
            axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`)
                .then((res) => {
                    setProfile(res.data);
                    const { name, email, picture } = res.data;
                    sessionStorage.setItem('Name', name);
                    sessionStorage.setItem('Email', email);
                    sessionStorage.setItem('Picture', picture);
                    setUserName(name);
                    setuserEmail(email);
                    setuserpicture(picture);
                    var url = `http://127.0.0.1:8000/user/${email}`;
                    console.log(url);
                    fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        if (data) {
                            console.log(data);
                            sessionStorage.setItem('StudentId', data.StudentId);
                            navigate('/CoursePage');
                        } else {
                            alert('User not found Login again');
                        }
                    })
                    .catch(error => {
                        alert('User not found with this Email "' + email +'"\nSo try with another email');
                        console.error('Error:', error)}); 
                })
                .catch((err) => console.error('Error fetching user profile data:', err));
        }
    }, [user, navigate]);

    const logOut = () => {
        googleLogout();
        setUser(null);
        setProfile(null);
    };

    return (
        <div className='login'>
            <div className="background-shape">
                <svg xmlns="http://www.w3.org/2000/svg" className='pt-0' viewBox="0 0 1440 320">
                    <path fill="#a2d9ff" fillOpacity="0.5" d="M0,288L20,240C40,192,80,96,120,64C160,32,200,64,240,69.3C280,75,320,53,360,74.7C400,96,440,160,480,154.7C520,149,560,75,600,48C640,21,680,43,720,48C760,53,800,43,840,53.3C880,64,920,96,960,133.3C1000,171,1040,213,1080,202.7C1120,192,1160,128,1200,106.7C1240,85,1280,107,1320,149.3C1360,192,1400,256,1420,288L1440,320L1440,0L1420,0C1400,0,1360,0,1320,0C1280,0,1240,0,1200,0C1160,0,1120,0,1080,0C1040,0,1000,0,960,0C920,0,880,0,840,0C800,0,760,0,720,0C680,0,640,0,600,0C560,0,520,0,480,0C440,0,400,0,360,0C320,0,280,0,240,0C200,0,160,0,120,0C80,0,40,0,20,0L0,0Z"></path>
                </svg>
            </div>
            <div className="container h-90">
                <div className="row h-100 justify-content-center align-items-center">
                    <div className="col-md-6">
                        <div className="loginCard card">
                            <div className="loginCardBody card-body">
                                <h2 className="card-title text-center mb-5 pb-3 mx-5 px-1 border-secondary border-bottom">Welcome to Internship</h2>
                                <p className="text-center">Let's get started</p>
                                <div className="text-center">
                                    <button onClick={handleLogin} className="btn btn-primary ">
                                        <img src={GoogleLogo} alt="Google Logo" height={25} width={25} className="mr-2" />
                                        &nbsp; Sign in with Google
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;

