import React, { Component } from 'react';
import axios from 'axios'
import Img from '../../images/loading.gif'
import { getToken, setUserSession } from '../../Utils/Common'
import './Login.css'
import {Datacontext} from '../../context/contextGlobal'
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userNameLogin: '', passwordLogin: '',
            passwordSignup: '', confirmSignup: '', email: '', userNameSignup: '',
            loadding: false, error: null, isLogin: true
        }
        this.addLoading = this.addLoading.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleValidation = this.handleValidation.bind(this)
    }
    static contextType = Datacontext;
    handleLogin = () => {
        this.setState({ loadding: true })
        axios.post('http://localhost:7000/user/signin', {
            email: this.state.userNameLogin, password: this.state.passwordLogin
        }).then(response => {
            setTimeout(() => {
                if (response.data.error) this.setState({ error: "Mật khẩu hoặc tài khoản nhập không đúng!" })
                else {
                    setUserSession(response.data.iduser)
                    this.context.adduser(getToken());
                    this.props.history.push('/')
                }
                this.setState({ loadding: false });
            }, 1000);

        }).catch(err => {
            this.setState({ loadding: false });
            console.log(err)
        })

    }
    handleValidation() {
        if (this.state.error) return <div>{this.state.error}</div>
    }
    onTextChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    addLoading() {
        if (this.state.loadding) return (
            <div className="btn-loadding"><img className="loadding" src={Img}></img></div>
        )
        else
            return <input type="button" value="Login" onClick={this.handleLogin}></input>

    }
    changeTheme = (event) => {
        const Class = event.target.classList[0];
        if (this.state.isLogin === true && Class === "btn__signup") this.setState({ isLogin: false })
        else if (this.state.isLogin === false && Class === "btn__login") this.setState({ isLogin: true })
    }
    render() {
        const marginleft = (this.state.isLogin) ? '0px' : '-100%';
        return (
            <div classNam='login'>
                <div class="login__container">
                    <div>
                        <h1>{(this.state.isLogin) ? "Login" : "Signup"}</h1>
                        {(this.state.error !== null) ? <div class="login__container-error">
                            <i class="fas fa-exclamation-triangle"></i>&ensp;<span>Mật khẩu hoặc tài khoản của bạn nhập không đúng</span>
                        </div> : <></>}
                        <div class="btn__signup__login">
                            <button class={(this.state.isLogin) ? "btn__login active" : "btn__login"} onClick={(event) => this.changeTheme(event)}>Log In</button>
                            <button class={(!this.state.isLogin) ? "btn__signup active" : "btn__signup"} onClick={(event) => this.changeTheme(event)}>Sign Up</button>
                        </div>
                        <div class="login__signup">
                            <div style={{ marginLeft: marginleft }}>
                                <div class="grid">
                                    <form action="javascript:void(0);" class="form login">
                                        <div class="form__field">
                                            <label htmlFor="login__user"><i class="fas fa-user"></i><span class="hidden"></span></label>
                                            <input id="login__user" type="text" class="form__input" name="userNameLogin"
                                                placeholder="Username" value={this.state.userNameLogin} onChange={(event) => this.onTextChange(event)} required />
                                        </div>
                                        <div class="form__field">
                                            <label htmlFor="login__password"><i class="fas fa-lock"></i><span class="hidden"></span></label>
                                            <input id="login__password" type="password" class="form__input" name="passwordLogin" placeholder="Password"
                                                value={this.state.passwordLogin} onChange={(event) => this.onTextChange(event)} required />
                                        </div>
                                        <div class="form__field">
                                            <input type="submit" value="LOGIN" onClick={() => this.handleLogin()} />
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: "center", marginTop: "10px" }} class="loadding">
                                            {this.state.loadding ? <img style={{ height: "30px", margin: "auto" }} src={Img} /> : <></>}
                                        </div>
                                    </form>
                                </div>
                                <div class="grid">
                                    <form action="https://httpbin.org/post" method="POST" class="form login">
                                        <div class="form__field">
                                            <label htmlFor="login__username"><i class="far fa-envelope"></i>
                                                <span class="hidden">Username</span></label>
                                            <input name="email" id="login__username" type="email" name="username" class="form__input"
                                                placeholder="Email" required />
                                        </div>
                                        <div class="form__field">
                                            <label htmlFor="login__username"><i class="fas fa-user"></i>
                                                <span class="hidden">Username</span></label>
                                             <input name="userNameSignup" id="login__username" type="text" class="form__input"
                                                placeholder="Username" required />
                                        </div>
                                        <div class="form__field">
                                            <label htmlFor="login__password"><i class="fas fa-lock"></i><span class="hidden">Password</span></label>
                                            <input type="password" name="passwordSignup" class="form__input" placeholder="Password"
                                                required />
                                        </div>
                                        <div class="form__field">
                                            <label htmlFor="login__password"><i class="fas fa-lock"></i><span class="hidden">Confirm
                                                Password</span></label>
                                            <input id="login__password" type="password" name="confirmSignup" class="form__input"
                                                placeholder="Confim Password" required />
                                        </div>
                                        <div class="form__field">
                                            <input type="submit" defaultValue="Registration" value="SIGN UP" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Login