import React, { Component } from 'react'
import { Datacontext } from '../../../context/contextGlobal'
import { Link } from 'react-router-dom';
import Convert from '../../ConvertPrice'
import './product.css'
import axios from 'axios'
export class product extends Component {
    constructor(props) {
        super(props);
        this.state = ({products: []})
    }
    static contextType = Datacontext;
    componentDidMount() {
        axios.get('http://localhost:7000/getproduct').then(response => {
            this.context.updateProduct(response.data);
        }).catch(
            err => {
                console.log(err)
            }
        )
    }
    render() {
        const { products } = this.context;
        return (
            <div className="product">
                <div className="product__title">
                    <div></div>
                    <h2>BLOG MỚI NHẤT</h2>
                    <div></div>
                </div>
                <ul className="product__list" >
                    {products.map((value, index) =>
                            <li key={value.id}>
                                <div className="product__list-item"  >
                                    <div className="justfinish">New</div>
                                    <div className="img-product">
                                    <Link to={`/home/${value.idsan_pham}`}><img src={value.link_anh} alt="" /></Link>
                                    </div>
                                    <div className="name-product">
                                        {value.namesan_pham}
                                    </div>
                                    <div className="price-addcart">
                                        <span>{Convert(parseInt(value.gia_ca), "VNĐ")}</span>
                                        <span onClick={() => this.context.addCart(value)}><i class="fal fa-shopping-cart"></i></span>
                                    </div>
                                    <div className="contact">
                                        <div className="name">
                                            <i className="fas fa-user" ></i>
                                            <span className="username">&ensp;{value.iduser}</span>
                                        </div>
                                        <div>
                                            <i className="fas fa-map-marker-alt"></i>
                                            <span className="address">
                                                &ensp;Hà Nội
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                    
                    )}
                </ul>
                <div class="product__button-seemore">
                    <h3>Xem thêm</h3>
                </div>
            </div>
        )
    }
}

export default product
