import React, { Component } from 'react'
import './ManageCart.css'
import Convert from '../../ConvertPrice'
import { Datacontext } from '../../../context/contextGlobal'
import { getToken } from '../../../Utils/Common';
import axios from 'axios';
export class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = { items: [], myproducts: [], idsanphamchon: '', idnguoichon: '', showmyproduct: false }
    }
    static contextType = Datacontext;
    componentDidMount() {
        axios.post('http://localhost:7000/getcart', { iduser: getToken() }).then(response => {
            this.context.setCart(response.data)
            const a = this.context.cart;
            this.context.cart.forEach(Element => {
                Element.isActive = false
            })
            this.setState({ items: response.data});
        }).catch(
            err => {
                console.log(err)
            }
        )

    }
    handleClick = (id) => {
        this.state.items.forEach((Element, index) => {
            if (Element.idsan_pham === id) {
                Element.isActive = !Element.isActive;
                this.setState({ items: [...this.state.items.slice(0, index), Element, ...this.state.items.slice(index + 1)] });
            }
            else {
                Element.isActive = false;
            }
        })
    }
    handleCheckBox = (id) => {
        this.state.myproducts.forEach((Element, index) => {
            if (Element.idsan_pham === id) {
                Element.isActive = !Element.isActive;
                this.setState({ myproducts: [...this.state.myproducts.slice(0, index), Element, ...this.state.myproducts.slice(index + 1)] });
            }
        })
    }
    handleExchange = (a) => {
        this.state.items.forEach((Element, index) => {
            if (Element.idsan_pham === a.idsanpham) {
                Element.isActive = !Element.isActive;
                this.setState({ items: [...this.state.items.slice(0, index), Element, ...this.state.items.slice(index + 1)] });
            }
        })
        this.setState({ idsanphamchon: a.idsanpham, idnguoichon: a.iduser, showmyproduct: true })
        axios.post('http://localhost:7000/getmyproducts', { iduser: getToken() }).then(res => {
            this.setState({ myproducts: res.data })
            this.state.myproducts.forEach(element => {
                element.isActive = false;
            })
        }).catch(err => console.log(err))
    }
    clickshow = () => {
        this.setState({ showmyproduct: !this.state.showmyproduct })
    }
    clickSendRequest = () => {
        var productsend = [];
        this.state.myproducts.forEach(element => {
            if (element.isActive) productsend.push(element.idsan_pham)
        })
        const message = {
            id_nguoi_gui: getToken(),
            id_nguoi_nhan: this.state.idnguoichon,
            productsend: productsend,
            productreceive: this.state.idsanphamchon
        }
        axios.post('http://localhost:7000/sendRequest', message).then(res => {
        }).catch(
            err =>
                console.log(err)

        )
        axios.post('http://localhost:7000/guithongbao', {
            id_nguoi_gui: getToken(),
            id_nguoi_nhan: this.state.idnguoichon,
            content: "Bạn vừa nhận được yêu cầu trao đổi đồ của"
        }).then(res => {

        }).catch(err => console.log(err))
        setTimeout(() => {
            window.location = 'http://localhost:3000/exchange'
        }, 500)
    }
    render() {
        const { removeCart, cart } = this.context;
        return (
            <div className="ManageCart">
                {cart.length > 0 ?
                    <div class="container-cart">
                        <div class="cart-left">
                            <div class="main-cart">
                                <ul class="list-product">
                                    {
                                        this.state.items.map((value, index) =>
                                            <li key={index} onClick={() => this.handleClick(value.idsan_pham)} class={value.isActive ? "active" : ""}>
                                                <div class="img-product">
                                                    <div><img src={value.link_anh} alt="" /></div>
                                                </div>
                                                <div class="thongtin">
                                                    <span>{value.namesan_pham}</span>
                                                    <span class="topic">Đồ điện tử</span>
                                                </div>
                                                <div class="price">{Convert(parseInt(value.gia_ca), "VNĐ")}</div>
                                                <button class="remove-product" onClick={() => removeCart(value.idsan_pham)}>
                                                    <i class="far fa-trash-alt"></i>
                                                </button>
                                                <button className={value.isActive ? "button__exchange active" : "button__exchange"} onClick={value.isActive ? () => this.handleExchange({ idsanpham: value.idsan_pham, iduser: value.iduser }) : ''}>Trao đổi</button>
                                            </li>
                                        )
                                    }
                                </ul>
                            </div>
                        </div>
                        <div class="ManageCart__right">
                            <h3>Danh sách sản phẩm của bạn</h3>
                            {this.state.showmyproduct ?
                                <div class="ManageCart__right-main">
                                    <ul>
                                        {this.state.myproducts.map(value =>
                                            <li className="Item">
                                                <div className="Item__img">
                                                    <img style={{ height: "100%", width: "100%", objectFit: "cover" }} src={value.link_anh} />
                                                </div>
                                                <div className="Item__content">
                                                    <div>{value.namesan_pham}</div>
                                                    <div>{Convert(parseInt(value.gia_ca), "VNĐ")}</div>
                                                </div>
                                                <input className="Item__checkbox" type="checkbox" name="vehicle1" value="Bike" onClick={() => this.handleCheckBox(value.idsan_pham)}></input>
                                            </li>
                                        )}
                                    </ul>
                                    <button class="button__show-myproduct" onClick={() => this.clickSendRequest()}>Gửi yêu cầu</button>
                                </div> : <></>}
                            <div class="show" onClick={() => this.clickshow()}><i className={this.state.showmyproduct ? "fas fa-chevron-up" : "fas fa-chevron-down"}></i></div>
                        </div>
                    </div> :
                    <div class="ManageCart__none" style={{ margin: "auto" }}>
                        <img style={{ height: "200px", marginTop: "150px" }} src="https://bantool.net/images/cart/empty-cart.png" />
                    </div>}
            </div>
        )
    }
}

export default Cart
