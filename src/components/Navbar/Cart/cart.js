import React from 'react'
import './cart.css'
import {Link} from 'react-router-dom'
import emptycart from '../../../images/empty-cart.png'
import convertPrice from '../../ConvertPrice'
import { Datacontext } from '../../../context/contextGlobal';
class Cart extends React.Component {
    constructor(props) {
        super(props);
    }
    static contextType = Datacontext;
    render() {
        return (
            <div className="cart">
                <h3>Giỏ hàng</h3>
                <ul className="main-cart">
                    {
                    this.context.cart.length !== 0 ?
                    this.context.cart.map((value, index) =>
                        <li>
                            <div className="product-img">
                                <div className="border-img">
                                    <img src={value.link_anh} alt=""/>
                                </div>
                            </div>
                            <div className="cart-content">
                                <div>
                                    {value.namesan_pham}
                                </div>
                                <div className="product-price">
                                    {convertPrice(parseInt(value.gia_ca), "VNĐ")}
                                </div>
                            </div>
                        </li>
                    ): <img style={{width: "100%"}}src={emptycart}/>
                }
                </ul>
                <Link to="/cart">
                    <div class="btn__xemgiohang"> <button>Xem giỏ hàng</button></div>
                </Link>
            </div >
        )
    }
}
export default Cart;