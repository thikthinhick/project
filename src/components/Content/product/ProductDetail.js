import axios from 'axios';
import React, { Component } from 'react'
import { Router } from 'react-router-dom';
import { getToken } from '../../../Utils/Common';
import './ProductDetail.css'
import IMG from '../../../images/maxresdefault.jpg'
import { Datacontext } from '../../../context/contextGlobal';
export default class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
      images: [],
      user: {}
    }
  }
  static contextType = Datacontext;
  componentDidMount() {
    axios.post('http://localhost:7000/product/getImage', { idsan_pham: this.props.params.id}).then(response => {
      this.setState({images: response.data.images, user: response.data.user})
    }).catch(
      err => {
        console.log(err)
      }
    )
  }
  handleChat = (idreceive) => {
    if(getToken())
    this.context.showChat(idreceive);
    else
    alert("Bạn cần phải đăng nhập")
  }
  next = (n) => {
    if (this.state.number + n === 3) n = -2;
    if (this.state.number + n === -1) n = 2;
    this.setState({ number: this.state.number + n })
  }
  render() {
    return (
      <React.Fragment>
        <div class="Detail">
          <div class="Detail__left">
            <div class="Detail__left-slider">
              {this.state.images.map((value, index) =>
                <div class={(this.state.number === index) ? "mySlides fade active" : "mySlides fade"}>
                  <div class="numbertext"><i class="fas fa-camera"></i> {index + 1} / 3</div>
                  <img src={value.link_anh} />
                </div>
              )}
              <a class="prev" onClick={() => this.next(-1)}><i class="fas fa-chevron-left"></i></a>
              <a class="next" onClick={() => this.next(1)}><i class="fas fa-chevron-right"></i></a>
            </div>
            <div class="product-name">
              <h2>THANH LÝ TIVI SONY BRAVIA 42ich</h2>
            </div>
            <div class="price-cart">
              <div class="price">4.000.000 Đ</div>
              <div><i class="fas fa-cart-plus"></i>&ensp;Thêm vào giỏ hàng</div>
            </div>
            <div class="content">
              <p><span style={{ fontWeight: "600" }}>Miêu tả: </span>Nhà đổi tivi to hoen cần thanh lý tivi sony như ảnh
                đang dùng tốt trước mua rất đắt, tivi nguyên bản
                âm anh nghe rất to màn sáng đẹp bán lại cho ai có nhu cầu. Cần thì gọi điện trực tiếp
                Cám ơn.</p>
            </div>
          </div>
          <div class="Detail__right">
            <div class="Detail__right-main">
              <div class="user-sell">
                <div class="header-user">
                  <div class="img-user">
                    <img style={{ height: "40px" }} src={this.state.user.anh_dai_dien} alt="" />
                    <div class="name-and-state">
                      <span>{this.state.user.user_name}</span>
                      <div class="state">Đang hoạt động</div>
                    </div>
                  </div>

                  <button class="personal-page">
                    Trang cá nhân
                  </button>
                </div>
                <div class="footer-user">
                  <div class="assess">
                    <div class="title">Đánh giá</div>
                    <ul>
                      <li><i class="fas fa-star"></i></li>
                      <li><i class="fas fa-star"></i></li>
                      <li><i class="fas fa-star"></i></li>
                      <li><i class="fas fa-star"></i></li>
                      <li><i class="fas fa-star"></i></li>
                    </ul>
                  </div>
                  <div class="gachngang"></div>
                  <div class="feedback">
                    <div class="title">Tỉ lệ phản hồi</div>
                    <div class="data">90%</div>
                  </div>
                </div>
              </div>
              <div class="chat-user" onClick={() => this.handleChat(this.state.user.iduser)}>
              <i class="far fa-comment-alt"></i>&ensp;<span>Chat với người bán</span>
              </div>
              <div class="share-app">
                <ul>
                  <li>
                    <i class="fab fa-facebook-f"></i>
                  </li>
                  <li>
                    <i class="fab fa-instagram"></i>
                  </li>
                  <li>
                    <i class="fab fa-twitter"></i>
                  </li>
                  <li>
                    <i class="fab fa-pinterest-p"></i>
                  </li>
                  <li>
                    <i class="fab fa-google-plus-g"></i>
                  </li>
                  <li>
                    <i class="fab fa-linkedin-in"></i>
                  </li>
                </ul>
              </div>
            </div>
            <div class="quangcao">
              <img src={IMG} alt="" />
            </div>
          </div>
        </div>
        <div class="Detail bottom">
          <div>
            <div class="location">
              <i class="fas fa-map-marker-alt"></i>
              <p>1072 Đê La Thành Hà Nội.</p>
            </div>
            <div class="tinhtrang">
              <i class="fas fa-heartbeat"></i>
              <p>Hàng cũ chưa sửa chữa(60%).</p>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
