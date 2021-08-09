import React, { Component } from 'react'
import axios from 'axios';
import { getToken } from '../Utils/Common';
export const Datacontext = React.createContext();
export class DataProvider extends Component {
    state = {
        products: [
        ],
        cart: [],
        user: null,
        chat: false,
        receiver: null
    }
    componentDidMount() {
        if (getToken()) {
            axios.post('http://localhost:7000/getcart', { iduser: getToken() }).then(response => {
                this.setState({ cart: [...this.state.cart, ...response.data] })
            }).catch(
                err => {
                    console.log(err)
                }
            )
        }
    }
    adduser = (id) => {
        axios.post('http://localhost:7000/getuser', { id: getToken() }).then(response => {
            this.setState({ user: response.data[0] })
        }).catch(
            err => {
                console.log(err)
            }
        )
    }
    addCart = (product) => {
        const check = this.state.cart.every(item => {
            return item.idsan_pham !== product.idsan_pham;
        })
        const check2 = !(product.iduser === getToken())
        if (check && check2) {
            axios.post('http://localhost:7000/insertAndRemoveCart', { idsanpham: product.idsan_pham, iduser: getToken(), add: true }).then(res => {
                this.setState({ cart: [...this.state.cart, product] });
                console.log('add')
            }).catch(err => {
                console.log(err)
            })
        }
        else
            alert('Sản phẩm đã có sẵn trong giỏ hàng hoặc đây là sản phẩm của bạn')
    }
    setCart = (a) => {
        this.setState({cart: a})
    }
    updateProduct = (products) => {
        this.setState({ products: products })
    }
    removeCart = (id) => {
        const { cart } = this.state;
        cart.forEach((value, index) => {
            if (value.idsan_pham === id)
                cart.splice(index, 1);
        })
        axios.post('http://localhost:7000/insertAndRemoveCart', { idsanpham: id, iduser: getToken(), add: false }).then(res => {
            this.setState({ cart: cart });
            console.log('remove')
        }).catch(err => {
            console.log(err)
        })
    }
    showChat = (idreceive) => {
        this.setState({ chat: !this.state.chat, receiver: idreceive })
    }
    render() {
        const { products, cart, user, chat, receiver } = this.state;
        const { addCart, removeCart, adduser, showChat, updateProduct,setCart } = this;
        return (
            <Datacontext.Provider value={{ products, cart, addCart, removeCart, adduser, user, chat, showChat, receiver, updateProduct,setCart }}>
                {this.props.children}
            </Datacontext.Provider>
        )
    }
}

export default DataProvider;
