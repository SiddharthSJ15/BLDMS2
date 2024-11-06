import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Navigation() {
    const [isAuth, setIsAuth] = useState(false);
    const hospitalLoginStatus = localStorage.getItem('hospitalLoginStatus');
    const userLoginStatus = localStorage.getItem('userLoginStatus');

    useEffect(() => {
        if (localStorage.getItem('hospitalLoginStatus') !== null || localStorage.getItem('userLoginStatus') !== null) {
            setIsAuth(true);
        }
    }, [isAuth]);
    return (
            <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
                <div class="container-fluid">
                    <Link class="navbar-brand" to='/'>BLOOD DONATION</Link>
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        
                        { userLoginStatus === 'true' &&
                            <>
                                <li class="nav-item">
                                    <Link class="nav-link active" aria-current="page" to="/user-home">Home</Link>
                                </li>                        
                                <li class="nav-item">
                                    <Link class="nav-link active" aria-current="page" to="/user-request">Request blood</Link>
                                </li>                        
                            </>
                        }

                        { hospitalLoginStatus === 'true' &&
                        <>
                            <li class="nav-item">
                                <Link class="nav-link active" aria-current="page" to="/hospital-home">Home</Link>
                            </li>     
                            <li class="nav-item">
                                 <Link class="nav-link active" aria-current="page" to="/blood-collection">Collect</Link>
                            </li>   
                            <li class="nav-item">
                                 <Link class="nav-link active" aria-current="page" to="/add-donor">Add donor</Link>
                            </li>              
                            <li class="nav-item">
                                 <Link class="nav-link active" aria-current="page" to="/hospital-requests">Requests</Link>
                            </li>   
                        </>
                        }

                    </ul>
                    <div class=" navbar-text">
                        <ul class="navbar-nav me-5 mb-2 mb-lg-0">
                            { userLoginStatus !== 'true' &&
                                <li class="nav-item dropdown badge">
                                    <div class="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Hospitals
                                    </div>
                                    <ul class="dropdown-menu dropdown-menu-lg-end dropdown-menu-dark">
                                        {isAuth ?
                                            <li class="nav-item">
                                                <Link class="dropdown-item badge" aria-current="page" to="/logout">Logout</Link>
                                            </li>
                                            :
                                            <>
                                                <li class="nav-item">
                                                    <Link class="nav-link badge" aria-current="page" to="/hospital-login">Login</Link>
                                                </li>
                                                <li class="nav-item">
                                                    <Link class="nav-link badge" aria-current="page" to="/hospital-register">Register</Link>
                                                </li>
                                            </>
                                        }
                                    </ul>
                                </li>
                            }
                            {hospitalLoginStatus !== 'true' &&
                            <li class="nav-item dropdown badge">
                                <div class="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Patients
                                </div>
                                <ul class="dropdown-menu dropdown-menu-lg-end dropdown-menu-dark">
                                    {isAuth ?
                                        <li class="nav-item">
                                            <Link class="dropdown-item badge" aria-current="page" to="/logout">Logout</Link>
                                        </li>
                                        :
                                        <>
                                            <li class="nav-item">
                                                <Link class="nav-link badge" aria-current="page" to="/">Login</Link>
                                            </li>
                                            <li class="nav-item">
                                                <Link class="nav-link badge" aria-current="page" to="/user-register">Register</Link>
                                            </li>
                                        </>
                                    }
                                </ul>
                            </li>
                            }
                        </ul>

                    </div>
                </div>
            </nav>
    )
}

export default Navigation;
