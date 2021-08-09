import React from "react";
import { storage } from "./config";
import "./Post.css";
import axios from "axios";
import IMG from '../../images/loading.gif'
class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: false, listImage: [], listUrlfont: [], tensanpham: '', motasanpham: '', giasanpham: '', tinhtrang: '', theloai: '', diachi: '', listUrl: [] }
    }
    handleTextChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleChange = (e) => {
        if (e.target.files[0]) {
            let file = e.target.files[0];
            const fileType = file.type;
            let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
            if (validExtensions.includes(fileType)) {
                let fileReader = new FileReader();
                fileReader.onload = () => {
                    let fileURL = fileReader.result;
                    this.setState({
                        listImage: [...this.state.listImage, e.target.files[0]],
                        listUrlfont: [...this.state.listUrlfont, fileURL]
                    });
                }
                fileReader.readAsDataURL(file)
            }
            else {
                alert("Đây ko phải file ảnh!");
            }
        }
    };
    handleRemove = (index) => {
        const {listImage, listUrlfont} = this.state;
        listImage.splice(index, 1);
        listUrlfont.splice(index, 1);
        this.setState({listUrlfont: listUrlfont, listImage: listImage})
    }
    handleUpload = () => {
        this.setState({ loading: true })
        const length = this.state.listImage;
        axios.post('http://localhost:7000/inserttitle', {
            tensanpham: this.state.tensanpham,
            motasanpham: this.state.motasanpham,
            giasanpham: this.state.giasanpham,
            tinhtrang: this.state.tinhtrang,
            theloai: this.state.theloai,
            diachi: this.state.diachi
        }).then(res => {
            this.state.listImage.forEach((element, index) => {
                const uploadTask = storage.ref(`images/${element.name}`).put(element);
                uploadTask.on(
                    "state_changed",
                    (snapshot) => { },
                    (error) => {
                        console.log(error);
                    },
                    () => {
                        storage
                            .ref("images")
                            .child(element.name)
                            .getDownloadURL()
                            .then((url) => {
                                if (index === 0) {
                                    axios.post('http://localhost:7000/insertimage', { url: url, id: res.data.id, anhchinh: 1 }).then(res => {
                                    }).catch(err => {
                                    })
                                }
                                else
                                    axios.post('http://localhost:7000/insertimage', { url: url, id: res.data.id, anhchinh: null }).then(res => {
                                    }).catch(err => {
                                    })
                                setTimeout(() => {
                                    this.props.history.push('/home')
                                }, 2000);
                            });
                    }
                );
            })
        }).catch(err => {

        })
    };
    render() {
        return (
            <div class="Post main">
                <div class="col-75">
                    <div class="Post__container">
                        <h3 style={{ marginBottom: "20px" }}>Tạo sản phẩm</h3>
                        <form>
                            <div class="Post">
                                <div class="col-50">
                                    <label for="fname"><i class="fas fa-file-signature"></i> Tên sản phẩm</label>
                                    <input type="text" name="tensanpham" id="tensanpham" onChange={(e) => this.handleTextChange(e)} required/>
                                    <label for="adr"><i class="fas fa-map-marker-alt"></i> Địa chỉ</label>
                                    <input type="text" name="diachi" id="diachi" onChange={(e) => this.handleTextChange(e)} required/>
                                    <label for="city"><i class="fas fa-coins"></i> Giá sản phẩm</label>
                                    <input type="text" name="giasanpham" id="giasanpham" onChange={(e) => this.handleTextChange(e)} required />
                                    <label for="city"><i class="fas fa-battery-half"></i> Tình trạng sản phẩm</label>
                                    <input type="text" name="tinhtrang" id="tinhtrang" onChange={(e) => this.handleTextChange(e)} required/>
                                </div>

                                <div class="col-50">
                                    <label for="cname"><i class="fas fa-adjust"></i> Miêu tả sản phẩm</label>
                                    <textarea id="motasanpham" name="motasanpham" onChange={(e) => this.handleTextChange(e)} ></textarea>
                                    <label for="cname"><i class="fas fa-list-ol"></i> Chọn thể loại</label>
                                    <select name="theloai" id="theloai" onChange={(e) => this.handleTextChange(e)}required>
                                        <option selected>Lựa chọn thể loại</option>
                                        <option value="1">Đồ điện tử</option>
                                        <option value="2">Đồ nội thất</option>
                                        <option value="3">Xe cộ</option>
                                        <option value="4">Thời trang</option>
                                    </select>
                                </div>
                            </div>
                            <label>
                                <input type="checkbox" name="sameadr" required/> <span>Bạn đã chắc chắn ghi nhận thông tin</span>
                            </label>
                            <input type="button" value="Tạo bài viết" onClick={() => this.handleUpload()}class="btn" />
                        </form>
                    </div>
                </div>
                <div class="col-25">
                    <div class="Post__container">
                        <h3 style={{marginBottom: "20px"}}>Chọn ảnh sản phẩm</h3>
                        <div className="drag-area">
                            <input type="file" onChange={(e) => this.handleChange(e)} />
                            <ul className="img__list">
                                {this.state.listUrlfont.map((value, index) => 
                                <li>
                                    <div className="img__list-post">
                                        <img src={value}/>
                                    </div>
                                    <span><i class="fas fa-times" onClick={() => this.handleRemove(index)}></i></span>
                                    
                                </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
                {this.state.loading ? <img style={{marginLeft: "560px", height: "40px"}} src={IMG}/> : <></>}
            </div>
        );
    }
}
export default Post;
