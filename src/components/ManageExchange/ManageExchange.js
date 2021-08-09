import axios from 'axios'
import React, { Component } from 'react'
import { getToken } from '../../Utils/Common'
import './ManageExchange.css'
import img from '../../images/exchange.png'
import Vote from '../Vote'
import ConvertPrice from '../ConvertPrice'
import { Datacontext } from '../../context/contextGlobal'
export class ManageExchange extends Component {
    contructor() {
        this.state = ({ items: [], numberStar: 0, idyeucau: null })
    }
    static contextType = Datacontext;
    componentDidMount() {
        axios.post('http://localhost:7000/getManageExchange', { iduser: getToken() }).then(res => {
            var result = res.data.reduce(function (r, a) {
                r[a.id_yeu_cau] = r[a.id_yeu_cau] || [];
                r[a.id_yeu_cau].push(a);
                return r;
            }, Object.create(null));
            console.log(result)
            this.setState({ items: result, showdanhgia: false });

        }).catch(err => console.log(err))
    }
    handleAgree = (a, b) => {
        const sql = `update yeu_cau_trao_doi set tinh_trang = '${a}' where id_yeu_cau = '${b}'`;
        axios.post('http://localhost:7000/updateRequest', { sql: sql }).then(res => {
            if (this.state.items) {
                var x = this.state.items;
                x[b].forEach(value => value.tinh_trang = a)
                this.setState({ items: x })
            }
            if (a === '2') alert('Bạn đã chấp nhận trao đổi đồ!')
            else alert('Bạn đã hủy lời mời trao đổi đồ')
        }).catch(err => console.log(err))
    }
    handleStar = (a) => {
        this.setState({ numberStar: a })
    }
    handleDanhGia = () => {
        var send;
        if (this.state.items[this.state.idyeucau][0].id_nguoi_gui === getToken()) send = true;
        else send = false;
        axios.post('http://localhost:7000/insertdanhgia', { id_yeu_cau: this.state.idyeucau, send: send, sosao: this.state.numberStar }).then(res => {
            var x = this.state.items;
            x[this.state.idyeucau].forEach(value => value.danh_gia_gui = this.state.numberStar)
            this.setState({ items: x, idsanpham: null })
        }).catch(err => console.log(err))
    }
    valueshow = (value) => {
        this.setState({ idyeucau: value })
    }
    showVoting = () => {
        return (
            <div class="stars">
                <div>
                    <input class="star star-5" id="star-5" type="radio" name="star" value='5' onClick={() => this.handleStar(5)} />
                    <label class="star star-5" for="star-5"></label>
                    <input class="star star-4" id="star-4" type="radio" name="star" value='4' onClick={() => this.handleStar(4)} />
                    <label class="star star-4" for="star-4"></label>
                    <input class="star star-3" id="star-3" type="radio" name="star" value='3' onClick={() => this.handleStar(3)} />
                    <label class="star star-3" for="star-3"></label>
                    <input class="star star-2" id="star-2" type="radio" name="star" value="2" onClick={() => this.handleStar(2)} />
                    <label class="star star-2" for="star-2"></label>
                    <input class="star star-1" id="star-1" type="radio" name="star" value="1" onClick={() => this.handleStar(1)} />
                    <label class="star star-1" for="star-1"></label>
                </div>
                <div>
                    <button onClick={() => this.handleDanhGia()}>Đánh giá</button>
                </div>
            </div>)
    }
    clickhidden = (event) => {
        event.target.className = "fas fa-chevron-up";
        var x = event.target.parentElement.parentElement.firstElementChild.style.overflow;
        if (x === 'hidden' || x === '') {
            event.target.parentElement.parentElement.firstElementChild.style.overflow = "visible"
            event.target.className = "fas fa-chevron-up";
        }
        else {
            event.target.parentElement.parentElement.firstElementChild.style.overflow = "hidden"
            event.target.className = "fas fa-chevron-down";
        }
    }
    render() {
        const items = this.state;
        return (
            <div className="Exchange" style={{ position: 'relative' }}>
                <h2>Quản lí trao đổi đồ</h2>
                {(items) ?
                    Object.keys(items.items).map((value, index) =>
                        <div style={{ marginBottom: "5px", padding: "10px" }} >
                            {(items.items[value][0].tinh_trang === '1') ?
                                <div className='Exchange__main-status'><i class="fas fa-exclamation-circle wait"></i> Chờ xác nhận đổi đồ</div>
                                : (items.items[value][0].tinh_trang === '2') ? <div className='Exchange__main-status'><i class="fas fa-check-circle complete"></i> Giao dịch được hoàn thành</div>
                                    : <div className='Exchange__main-status'><i class="fas fa-times-circle error"></i> Giao dịch bị từ chối</div>}
                            <div className={items.items[value][0].iduser === getToken() ? "Exchange__main-header theme-green" : "Exchange__main-header theme-yellow"}>
                                <div className="Me">
                                    <div>
                                        <img src={items.items[value].filter(element => element.iduser === getToken())[0].anh_dai_dien} />
                                        <Vote value={items.items[value][0].iduser !== getToken() ? items.items[value][0].danh_gia_gui : items.items[value][0].danh_gia_nhan} />
                                    </div>

                                    <div className="Name">You</div>
                                </div>
                                <div className="Exchange__main-header__list">
                                    <ul>
                                        {items.items[value].map(value =>
                                            (value.iduser === getToken()) ?
                                                <li>
                                                    <div className="product-img">
                                                        <div className="border-img">
                                                            <img src={value.link_anh} alt="" />
                                                        </div>
                                                    </div>
                                                    <div className="cart-content">
                                                        <div>
                                                            {value.namesan_pham}
                                                        </div>
                                                        <div className="product-price">
                                                            {ConvertPrice(parseInt(value.gia_ca), "VNĐ")}
                                                        </div>
                                                    </div>
                                                </li>
                                                : <></>
                                        )}
                                    </ul>
                                    <div onClick={(event) => this.clickhidden(event)} style={{ left: "-18px", position: "absolute", cursor: "pointer" }}><i class="fas fa-chevron-down"></i></div>
                                </div>
                                <div className="button__image-exchange">
                                    <img src={img} />
                                    {(items.items[value][0].tinh_trang === '1' && items.items[value][0].id_nguoi_gui !== getToken()) ? <div>
                                        <button onClick={() => this.handleAgree('3', value)}><i class="fas fa-ban"></i></button>
                                        <button><i class="far fa-comment-alt-lines"></i></button>
                                        <button onClick={() => this.handleAgree('2', value)}><i class="fas fa-handshake"></i></button>
                                    </div> : <div><button onClick = {() => this.context.showChat(items.items[value].filter(element => element.iduser !== getToken())[0].iduser)}><i class="far fa-comment-alt-lines"></i></button></div>}
                                </div>
                                <div className="Exchange__main-header__list">
                                    <ul>
                                        {items.items[value].map(value =>
                                            (value.iduser !== getToken()) ?
                                                <li>
                                                    <div className="product-img">
                                                        <div className="border-img">
                                                            <img src={value.link_anh} alt="" />
                                                        </div>
                                                    </div>
                                                    <div className="cart-content">
                                                        <div>
                                                            {value.namesan_pham}
                                                        </div>
                                                        <div className="product-price">
                                                            {ConvertPrice(parseInt(value.gia_ca), "VNĐ")}
                                                        </div>
                                                    </div>
                                                </li>
                                                : <></>
                                        )}
                                    </ul>
                                    <div onClick={(event) => this.clickhidden(event)} style={{ left: "-18px", position: "absolute", cursor: "pointer" }}><i class="fas fa-chevron-down"></i></div>
                                </div>
                                <div className="You">
                                    <div ><img src={items.items[value].filter(element => element.iduser !== getToken())[0].anh_dai_dien} />
                                        <div className="Vote">
                                            <Vote value={items.items[value][0].iduser !== getToken() ? items.items[value][0].danh_gia_gui : items.items[value][0].danh_gia_nhan} />
                                        </div>
                                    </div>

                                    <div class="Name">{items.items[value].filter(element => element.iduser !== getToken())[0].user_name}</div>
                                </div>
                            </div>

                            {
                                (items.items[value][0].tinh_trang === '2' && (items.items[value][0].iduser === getToken() ? (items.items[value][0].danh_gia_gui === null) : (items.items[value][0].danh_gia_nhan === null))) ? <button onClick={() => this.valueshow(value)}>Đã nhận được hàng</button> : ''}
                        </div>

                    ) : <></>
                }
                {(items) ? ((this.state.idyeucau) ? this.showVoting() : <></>) : <></>}
            </div>
        )
    }
}

export default ManageExchange
