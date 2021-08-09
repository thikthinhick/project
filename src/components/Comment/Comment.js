import React, { Component } from 'react'
import './Comment.css'
import Singlecomment from './SingleComment';
import Replycomment from './ReplyComment'
import {getToken} from '../../Utils/Common'
import axios from 'axios'
export class Comment extends Component {
    constructor(props) {
        super(props)
        this.state = ({ CommentLists: [] });
       
    }
    componentDidMount(){
         axios.post('http://localhost:7000/getcomment', {idsan_pham: this.props.params}
        ).then(response => {
            this.setState({ CommentLists: response.data, isButtonActive: false})
        }).catch(err => {
            console.log(err)
        })
    }
    handleChangetext = (event) => {
        if(event.target.value !== '') this.setState({content: event.target.value, isButtonActive: true});
        else this.setState({content: event.target.value, isButtonActive: false})
    }
    onsubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:7000/insertcomment', {content: this.state.content, idsan_pham: this.props.params, id_comment_root: null, iduser: getToken()}
        ).then(response => {
            this.updatecomment(response.data)
        }).catch(err => {
            console.log(err)
        })
        this.setState({content: ''})
    }
    setfeedback = () => {
        this.setState({isfeedback: !this.state.isfeedback})
    }
    updatecomment = (newcomment) => {
        this.setState({CommentLists: [ ...newcomment, ...this.state.CommentLists]})
    }
    render() {
        return (
            <div class="container">
                <div class="reviews">
                    <h2>44 hỏi đáp</h2>
                    {(getToken()) ? <div class="input-comment">
                        <div>
                            <img src="https://www.iconninja.com/files/155/832/15/business-human-seo-person-user-account-profile-icon.svg" alt="" />
                            <input type="text" placeholder="Nhập bình luận của bạn" onChange={(event)=> this.handleChangetext(event)} value={this.state.content}/>
                        </div>
                        <div>
                            <span>HỦY</span>
                            <span className={(this.state.isButtonActive) ? "active": ""}onClick={(event) => this.onsubmit(event)}>BÌNH LUẬN</span>
                        </div>
                    </div>: <></>}
                    <ul class="list-comment">
                        {this.state.CommentLists.map((value, index) =>
                            (value.idbinh_luan_cha === null) &&
                            <React.Fragment>
                             <Singlecomment params={this.props.params} prototype={value} parentComment={value.idbinh_luan} updatecomment={this.updatecomment}/>
                             <Replycomment params={this.props.params}CommentLists={this.state.CommentLists} parentComment={value.idbinh_luan} updatecomment={this.updatecomment}/>
                            </React.Fragment>
                        )}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Comment
