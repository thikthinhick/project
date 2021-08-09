import React, { useState } from 'react';
import './Navbar.css';
import Cart from './Cart/cart'
import { Link } from 'react-router-dom'
import Notifi from './notification/Notifi'
import { MenuList } from './Navbardata'
import { Datacontext } from '../../context/contextGlobal';
import Account from './Account/Account';
import axios from 'axios';
import { getToken } from '../../Utils/Common'
class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { clicked: true, clickCart: false, login: true, clickNotifi: false, clickAccount: false, user: null, soluong: 0 }
        this.handClick = this.handClick.bind(this)
        this.showCart = this.showCart.bind(this)
        this.showNotifi = this.showNotifi.bind(this)
    }
    static contextType = Datacontext;
    componentDidMount() {
        axios.post('http://localhost:7000/getuser', { id: getToken() }).then(response => {
            this.setState({ user: response.data[0] })
        }).catch(
            err => {
                console.log(err)
            }
        )
        axios.post('http://localhost:7000/sothongbao', {iduser: getToken()}).then(res => {
            this.setState({soluong: res.data[0].soluong})
        }).catch(err => console.log(err))
        this.timerID = setInterval(
            () => this.updatethongbao(),
            10000
        );
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    updatethongbao() {
        axios.post('http://localhost:7000/sothongbao', {iduser: getToken()}).then(res => {
            this.setState({soluong: res.data[0].soluong})
        }).catch(err => console.log(err))
    }
    handClick() {
        this.setState({ clicked: !this.state.clicked })
    }
    showCart() {
        this.setState({ clickCart: !this.state.clickCart })
        if(!this.state.clickCart) this.setState({clickAccount: false, clickNotifi: false})
    }
    showNotifi() {
        this.setState({ clickNotifi: !this.state.clickNotifi })
        if(!this.state.clickNotifi) this.setState({clickCart: false, clickAccount: false})
    }
    showAccount = () => {
        this.setState({ clickAccount: !this.state.clickAccount })
        if(!this.state.clickAccount) this.setState({clickNotifi: false, clickCart: false})
    }
    render() {
        return (
            <header className="myheader">
                <div className="menu-icon">
                    <i className={(this.state.clicked === true) ? "fas fa-bars" : "fas fa-times"} onClick={() => this.handClick()}></i>
                </div>
                <div className="header-logo">
                    <Link to="/home"><h1>Shopping</h1></Link>
                </div>
                <div className="header-menu">
                    <ul>
                        {MenuList.map((value, index) =>
                            <li key={index}>
                                <Link to={value.link} className={value.class}>
                                    <span>{value.title}</span>
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
                <div className="header-tools">
                    <div className="signup-login">
                        <div>
                            <div>
                                {
                                    (this.state.user) ? <> <img src={this.state.user.anh_dai_dien}></img>
                                        <span>&ensp;{this.state.user.user_name}</span></> : <Link to="/login">Login / Signup</Link>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="header-search hide-item">
                        <div>
                            <i className="fas fa-search"></i>
                        </div>
                    </div>
                    {(this.state.user) ? <><div className="header-bag icon-tools hide-item">
                        <i className="fas fa-shopping-bag" onClick={() => this.showCart()}><span>{this.context.cart.length}</span></i>
                        {(this.state.clickCart) ? <Cart /> : <></>}
                    </div>
                        <div className="bell-notifi icon-tools hide-item">
                            <i className="far fa-bell" onClick={() => this.showNotifi()}><span>{this.state.soluong}</span></i>
                            {(this.state.clickNotifi) ? <Notifi /> : <></>}
                        </div>
                        <div className="hide-item Account__item">
                            <i class="fas fa-caret-down" onClick={() => this.showAccount()}></i>
                            {(this.state.clickAccount) ? <Account value={this.state.user}/> : <></>}
                        </div></> : <></>}
                </div>
            </header>
        )
    }
}
export default Navbar;