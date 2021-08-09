import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getToken, removeUserSession } from '../../../Utils/Common'
import './Account.css'
export class Account extends Component {
    constructor(props) {
      super(props)
    }
    clicklogout = (e) => {
      e.preventDefault();
      removeUserSession();
    }
    render() {
        const link = '/personal/' + getToken();
        return (
            <div class="account">
            <div class="account__personalpage">
              <div class="account__personalpage-img">
                <img src={this.props.value.anh_dai_dien}/>
              </div>
              <div class="account__personalpage-title">
                <div>{this.props.value.user_name}</div>
                <Link to = {link} >Xem trang cá nhân</Link>
              </div>
            </div>
            <ul class="account__menu">
              <li>
                <div class="account__menu-icon"><i class="fas fa-question-circle"></i></div>
                <div class="account__menu-title">Trợ giúp và hỗ trợ</div>
              </li>
              <li>
                <div class="account__menu-icon"><i class="fas fa-cog"></i></div>
                <div class="account__menu-title">Cài đặt</div>
              </li>
              <li>
                <div class="account__menu-icon"><i class="fas fa-sign-out-alt"></i></div>
                <div class="account__menu-title" onClick = {(e) => this.clicklogout(e)}>Đăng xuất</div>
              </li>
            </ul>
          </div>
        )
    }
}

export default Account
