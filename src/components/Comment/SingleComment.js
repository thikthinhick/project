import React, { Component } from 'react'
import axios from 'axios'
import imageuser from '../../images/user.png'
import Datediff from '../Datediff'
import { getToken } from '../../Utils/Common'
class SingleComment extends Component {
    constructor(props) {
        super(props)
        this.state = { isfeedback: false, content: "",isButtonActive: false}
    }
    handleChangetext = (event) => {
        if(event.target.value !== '') this.setState({content: event.target.value, isButtonActive: true});
        else this.setState({content: event.target.value, isButtonActive: false})
    }
    inputReply = () => {
        return (
            <div class="input-comment">
                <div>
                    <img src={imageuser} alt="" />
                    <input type="text" placeholder="Nhập bình luận của bạn" onChange={(event) => this.handleChangetext(event)} />
                </div>
                <div>
                    <span onClick={() => this.setfeedback()}>HỦY</span>
                    <span className={(this.state.isButtonActive) ? "active":""} onClick={(event) => this.onsubmit(event)}>BÌNH LUẬN</span>
                </div>
            </div>
        )
    }
    onsubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:7000/insertcomment', { id_comment_root: this.props.parentComment, content: this.state.content, idsan_pham: this.props.params, iduser: getToken()}
        ).then(response => {
            this.props.updatecomment(response.data)
        }).catch(err => {
            console.log(err)
        })
        this.setfeedback();
    }
    setfeedback = () => {
        if(!getToken()) alert('Bạn cần đăng nhập để bình luận')
        else
        this.setState({isfeedback: !this.state.isfeedback})
    }
    render() {
        return (
            <div class="item-comment">
                <div class="img-user-comment">
                    <img style={{borderRadius: "50%"}} src={this.props.prototype.anh_dai_dien} alt="" />
                </div>
                <div class="body-comment">
                    <div class="content">
                        <div>{this.props.prototype.user_name}&ensp;<span>{Datediff(this.props.prototype.ngay_binh_luan)}</span></div>
                        <p>{this.props.prototype.noi_dung}</p>
                    </div>
                    <div class="footer-comment">
                        <span><i class="far fa-thumbs-up"></i>&nbsp;Thích</span>
                        <span onClick={() => this.setfeedback()}><i class="far fa-comment-alt-lines"></i>&nbsp;Trả lời</span>
                    </div>
                    {this.state.isfeedback && this.inputReply()} 
                </div>
            </div>
        )
    }
}

export default SingleComment
