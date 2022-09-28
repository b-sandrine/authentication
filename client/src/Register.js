import { useState, useRef, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';
import Login from './Login';
import axios from './api/axios';

const USER_REGIX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register'

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser ] = useState('');
    const [validName, setValidName ] = useState(false)
    const [userFocus, setUserFocus ] = useState(false);

    const [pwd, setPwd ] = useState('');
    const [validPwd, setValidPwd ] = useState(false)
    const [pwdFocus, setPwdFocus ] = useState(false);

    const [matchPwd, setMatchPwd ] = useState('');
    const [validMatch, setValidMatch ] = useState(false)
    const [matchFocus, setMatchFocus ] = useState(false);

    const [errMsg, setErrMsg ] = useState('');
    const [ success, setSuccess ] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    },[])

    useEffect(() => {
        const result = USER_REGIX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result)
    },[user])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result)
        console.log(pwd)
        const match = pwd === matchPwd;
        setValidPwd(result);
        setValidMatch(match)
    },[pwd, matchPwd])

    useEffect(() => {  // this useEffect means that whenever the client changes the values in the dependency array, we will go ahead and set error message to null
        setErrMsg('')
    },[user,pwd,matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        // If button enables with JS hack 
        const v1 = USER_REGIX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if(!v1 || !v2) {
            setErrMsg("Invalid Entry");
            console.log(user,pwd)
            return;
        }

        console.log(user,pwd)
        setSuccess(true);
    }

    return (
        <>
        {success ? (
            <section>
                <h1>Success!</h1>
                <Login />
                <p>
                    <a href="#">Sign In</a>
                </p>
            </section>
        ):(
        <section>
            <p ref={errRef} className={errMsg ? "errmgs": "offscreen"} 
            aria-live="assertive">{errMsg}</p>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">User name:
                <span className={validName ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validName || !user ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
                </label>
                <input type = "text" id="username" ref={userRef}
                autoComplete="off" onChange={(e) => setUser(e.target.value)} 
                required aria-invalid={validName ? "false" : "true"}
                aria-describedby = "uidnote" onFocus={() => setUserFocus(true)}
                onBlur= {() => setUserFocus(false)} />
                <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon = {faInfoCircle} />
                    4 to 24 characters.<br />
                    Must begin with a letter. <br />
                    Letters, numbers, underscores, hyphens are allowed.
                </p>

                <label htmlFor="password">
                    Password:
                    <span className={validPwd ? "valid" : "hide"}>
                        <FontAwesomeIcon icon = {faCheck} />
                    </span>
                    <span className = {validPwd || !pwd ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </span>
                </label>
                <input type = "password" id="password" onChange={(e) => setPwd(e.target.value)} 
                required aria-invalid={validPwd ? "false" : "true"}
                aria-describedby = "pwdnote" onFocus={() => setPwdFocus(true)}
                onBlur= {() => setPwdFocus(false)}/>
                <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon = {faInfoCircle} />
                    8 to 24 characters.<br />
                    Must include uppercase and lowercase, a number and special character. <br />
                    allowed special characters: <span aria-label="exclamation mark">!</span> 
                    <span aria-label="hashtag">#</span>
                    <span aria-label="at symbol">@</span>
                    <span aria-label="dollar sign">$</span>
                    <span aria-label="percent">%</span>
                </p>

                <label htmlFor="confirm_pwd">
                    Confirm Password:
                    <span className={validMatch && matchPwd ? "valid" : "hide"}>
                        <FontAwesomeIcon icon = {faCheck} />
                    </span>
                    <span className = {validMatch || !matchPwd ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </span>
                </label>
                <input type = "password" id="confirm_pwd" onChange={(e) => setMatchPwd(e.target.value)} 
                required aria-invalid={validMatch ? "false" : "true"}
                aria-describedby = "confirmnote" onFocus={() => setMatchFocus(true)}
                onBlur= {() => setMatchFocus(false)} />
                <p id="confirmnote" className={matchFocus && !validPwd ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon = {faInfoCircle} />
                    Must match the first password input field
                </p>

                <button disabled={!validName || !validPwd || !validMatch ? true : false}> Sign Up</button>

                <p className="additional-paragraph">
                    Already registered? <br />
                    <span>
                        {/* put the router link here  */}
                        <a href="#">Sign In</a>
                        {/* <Link to= {Login}>Sign In</Link> */}
                    </span>
                </p>
            </form>
        </section>
        )}
        </>
    )
}

export default Register;