import axios from 'axios'
import React, { Component } from 'react'
import './ContentPersonal.css'
export class ContentPersonal extends Component {
    constructor(props) {
        super(props);
        this.state = ({user: {}})
    }
    componentDidMount(){
        axios.post('http://localhost:7000/getuser', {id: this.props.id}).then(res => {
            this.setState({user: res.data[0]})
        })
    }
    render() {

        return (
            <div class="Personal">
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
                        <li>Danh sách sản phẩm đã đăng bán - 10 sản phẩm</li>
                        <li>
                            <div class="PersonalPage__item" >
                                <div>
                                    <div class="PersonalPage__item-img">
                                        <img src="https://vaithuhayho.com/wp-content/uploads/2021/03/hinh-anh-dep-41.jpg" />

                                    </div>
                                    <div class="PersonalPage__item-content">
                                        <h3>Giày thể thao nữ adidas</h3>
                                        <div>1.0999.999 Đ</div>
                                        <div>
                                            <i class="far fa-calendar-alt"></i>: 20/3/2021
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <span><i class="far fa-edit"></i></span>
                                    <span><i class="far fa-trash-alt"></i></span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default ContentPersonal
