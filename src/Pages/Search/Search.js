import axios from 'axios';
import React, { Component } from 'react'
import ConvertPrice from '../../components/ConvertPrice';
import Navbar from '../../components/Navbar/Navbar';
import { Datacontext } from '../../context/contextGlobal';
import { Link } from 'react-router-dom';
export class Search extends Component {
    constructor(props) {
        super(props)
        this.state = ({products: []})
       
    }
    static contextType = Datacontext
    componentDidMount(){
        var value = document.location.search.split('=')[1];
        axios.post('http://localhost:7000/search/getproduct', {value: value}).then(res => {
            this.setState({products: res.data})
        })
    }
    render() {
        return (
            <React.Fragment>
                <Navbar />
                <div className="product">
                    
                <ul className="product__list" >
                    {this.state.products.length > 0 ? this.state.products.map((value, index) =>
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
                                    <span>{ConvertPrice(parseInt(value.gia_ca), "VNĐ")}</span>
                                    <span onClick={() => this.context.addCart(value)}><i class="fas fa-shopping-cart"></i></span>
                                </div>
                                <div className="contact">
                                    <div className="name">
                                        <i className="fas fa-user" ></i>
                                        <span className="username">&ensp;{value.user_name}</span>
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
                    ):<h1>Không tồn tại sản phẩm bạn tìm</h1>}
                </ul>
            </div>
            </React.Fragment>
        )
    }
}

export default Search;