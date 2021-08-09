import React, { Component } from 'react'
import './Menu.css'
export class Menu extends Component {
    render() {
        return (
            <ul class="most-topic">
                <li>
                    <button>Go to</button>
                    <span>Đồ điện tử</span>
                    <img src="https://beeseo.vn/wp-content/uploads/2018/02/thiet-ke-ban-do-dien-tu.jpg" alt="" />
                </li>
                <li>
                    <button>Go to</button>
                    <span>Đồ Nội thất</span>
                    <img src="https://file.hstatic.net/1000360516/file/mua_do_noi_that_tra_gop_133596d9d80d44a0a9c33c3920c99980_grande.jpg" alt="" />
                </li>
                <li>
                    <button>Go to</button>
                    <span>Bất động sản</span>
                    <img src="https://i.pinimg.com/564x/70/5c/24/705c248800445e4d2c6e9aec772cb7c6.jpg" alt="" />
                </li>
            </ul>
        )
    }
}

export default Menu
