import { Warning } from '@material-ui/icons'
import axios from 'axios'
import React, { Component } from 'react'
import './Edit.css'
import { Datacontext } from '../../../context/contextGlobal'
export class Edit extends Component {
    constructor(props) {
        super(props)
        this.state = this.props.product
    }
    static contextType = Datacontext;
    submit = () => {
        axios.post('http://localhost:7000/updateproduct', this.state).then(res => {
            alert('Chỉnh sửa sản phẩm thành công')
            this.context.setShowEdit();
            document.getElementById('Modal').style.display = 'none'
            window.location = document.location.href
        })
    }
    handleChangeText = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    render() {
        const product = this.state;
        return (
            <div class="Edit__wrapper">
                <div class="Edit__wrapper-title">
                    CHỈNH SỬA SẢN PHẨM
                </div>
                <div class="Edit__wrapper-form">
                    <div class="inputfield">
                        <label>Tên sản phẩm</label>
                        <input type="text" class="input" name="namesan_pham" value={product.namesan_pham} onChange={(e) => this.handleChangeText(e)} />
                    </div>
                    <div class="inputfield">
                        <label>Địa chỉ</label>
                        <input type="text" class="input" value={product.dia_chi}/>
                    </div>
                    <div class="inputfield">
                        <label>Giá sản phẩm</label>
                        <input type="text" class="input" name="gia_ca"  onChange={(e) => this.handleChangeText(e)}value={product.gia_ca}/>
                    </div>

                    <div class="inputfield">
                        <label>Thể loại sản phẩm</label>
                        <div class="custom_select">
                            <select value={product.idthe_loai} name='idthe_loai' onChange={(e) => this.handleChangeText(e)}>
                                <option value="1">Đồ điện tử</option>
                                <option value="2">Male</option>
                                <option value="3">Female</option>
                            </select>
                        </div>
                    </div>
                    <div class="inputfield">
                        <label>Mô tả sản phẩm</label>
                        <textarea class="textarea" name="mo_ta_chi_tiet" onChange={(e) => this.handleChangeText(e)} value={product.mo_ta_chi_tiet}></textarea>
                    </div>
                    <div class="inputfield">
                        <label>Tình trạng sản phẩm</label>
                        <input type="text" name="tinh_trang_san_pham" onChange={(e) => this.handleChangeText(e)}class="input" value={product.tinh_trang_san_pham} />
                    </div>
                    <div class="inputfield terms">
                        <label class="check">
                            <input type="checkbox" id="checkedEdit"/>
                            <span class="checkmark"></span>
                        </label>
                        <p>bạn có ghi nhận những thông tin đã chỉnh sửa</p>
                    </div>
                    <div class="inputfield">
                        <input type="submit" value="Ghi nhận" class="btn" onClick={() => this.submit()} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Edit