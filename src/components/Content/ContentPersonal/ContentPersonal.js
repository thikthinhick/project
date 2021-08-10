import axios from 'axios'
import React, { Component } from 'react'
import { getToken } from '../../../Utils/Common';
import './ContentPersonal.css'
import ConvertPrice from '../../ConvertPrice';
import Edit from './Edit';
import { Datacontext } from '../../../context/contextGlobal';
export class ContentPersonal extends Component {
    constructor(props) {
        super(props);
        this.state = ({ user: {}, products: [], editProduct: {} })
    }
    static contextType = Datacontext
    componentDidMount() {
        axios.post('http://localhost:7000/getuser', { id: this.props.id }).then(res => {
            this.setState({ user: res.data[0] })
        })
        axios.post('http://localhost:7000/getmyproducts', { iduser: getToken() }).then(res => {
            this.setState({ products: res.data })
        }).catch(err => console.log(err))
    }
    deleteproduct = (id) => {
        axios.post('http://localhost:7000/deleteproduct', {id: id}).then(res => {
            alert('xóa sản phẩm thành công')
            window.location = document.location.href
        })
    }
    Editproduct = (id) => {
        axios.post('http://localhost:7000/getEditproduct', {id: id}).then(res => {
            this.setState({editProduct: res.data[0]})
            this.context.setShowEdit();
            document.getElementById('Modal').style.display = 'block'
        })
    }
    render() {

        return (
            <div class="Personal">
                <div style={{position: "relative",display:"flex",justifyContent: "center"}}>
                    {this.context.showEdit ? <Edit product={this.state.editProduct}/>: <></>}
                </div>
                <div class="Personal__main">
                    <div class="Personal__main-left">
                        <div class="profile">
                            <div>
                                <div className="profile__image">
                                    <span>
                                        <i class="fas fa-camera"></i>
                                    </span>
                                    <img src={this.state.user.anh_dai_dien}
                                        alt="Admin" class="rounded-circle" width="134" />
                                </div>
                                <div className="thongtin">
                                    <h2>{this.state.user.user_name}</h2>
                                    <div class="danhgia">
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star-half-alt"></i>
                                    </div>
                                    <div className="button__profile">
                                        <button><i class="fas fa-user-plus"></i></button>
                                        <button><i class="far fa-comment-alt-dots"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="Personal__main-right">
                        <div class="card">
                            <div class="card__row">
                                <div class="col-sm-3">
                                    <h4 class="mb-0"><i class="far fa-envelope"></i> Email</h4>
                                </div>
                                <div class="col-sm-9 text-secondary">
                                    {this.state.user.email}
                                </div>
                            </div>
                            <hr />
                            <div class="card__row">
                                <div class="col-sm-3">
                                    <h4 class="mb-0"><i class="fas fa-phone"></i> Số điện thoại</h4>
                                </div>
                                <div class="col-sm-9 text-secondary">
                                    {this.state.user.phone}
                                </div>
                            </div>
                            <hr />
                            <div class="card__row">
                                <div class="col-sm-3">
                                    <h4 class="mb-0"><i class="fas fa-map-marker-alt"></i> Địa chỉ</h4>
                                </div>
                                <div class="col-sm-9 text-secondary">
                                    {this.state.user.address}
                                </div>
                            </div>
                            <hr />
                            <div class="card__row">
                                <div class="col-sm-3">
                                    <h4 class="mb-0"><i class="fas fa-user-plus"></i> Theo dõi</h4>
                                </div>
                                <div class="col-sm-9 text-secondary">
                                    1
                                </div>
                            </div>
                            <hr />
                            <div class="card__row">
                                <div class="col-sm-3">
                                    <h4 class="mb-0"><i class="far fa-calendar-alt"></i> Ngày tham gia</h4>
                                </div>
                                <div class="col-sm-9 text-secondary">
                                    30/4/1975
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="Personal__main">
                    <ul class="list-group">
                        <li>Danh sách sản phẩm của bạn</li>

                        {this.state.products.map((value) =>
                            <li> <div class="PersonalPage__item" >
                                <div>
                                    <div class="PersonalPage__item-img">
                                        <img src={value.link_anh}/>

                                    </div>
                                    <div class="PersonalPage__item-content">
                                        <h3>{value.namesan_pham}</h3>
                                        <div>{ConvertPrice(parseInt(value.gia_ca), "VNĐ")}</div>
                                        <div>
                                            <i class="far fa-calendar-alt"></i>: 20/3/2021
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <span onClick ={() => this.Editproduct(value.idsan_pham)}><i class="far fa-edit"></i></span>
                                    <span onClick = {() => this.deleteproduct(value.idsan_pham)}><i class="far fa-trash-alt"></i></span>
                                </div>
                            </div>
                            </li>
                        )}

                    </ul>
                </div>
            </div>
        )
    }
}

export default ContentPersonal
