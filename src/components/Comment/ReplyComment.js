import React, { Component } from 'react'
import SingleComment from './SingleComment'

export class ReplyComment extends Component {
    constructor(props) {
        super(props)
        this.state = { openReply: false }
    }
    renderReply = () => {
        var array = []
        this.props.CommentLists.forEach(element => {
            if (element.idbinh_luan_cha === this.props.parentComment)
                array.push(element)
        });
        return (
            array.map((value, index) =>
                <React.Fragment key={value.idbinh_luan}>
                    <SingleComment params={this.props.params} prototype={value} parentComment={value.idbinh_luan} updatecomment={this.updatecomment} />
                    <ReplyComment params={this.props.params} CommentLists={this.props.CommentLists} parentComment={value.idbinh_luan} updatecomment={this.updatecomment} />
                </React.Fragment>
            )
        )
    }
    showNumberReply = () => {
        var length = 0;
        this.props.CommentLists.forEach(element => {
            if (element.idbinh_luan_cha === this.props.parentComment)
                length++;
        });
        return length;
    }
    openReply = () => {
        this.setState({ openReply: !this.state.openReply })
    }
    render() {
        return (
            <div class="show-reply" style={{ marginLeft: "50px" }} >
                {(this.showNumberReply() > 0) ? <React.Fragment>
                    <i class={(!this.state.openReply) ? "fas fa-caret-down" : "fas fa-caret-up"}
                        onClick={() => this.openReply()}>&ensp;<span>{(this.state.openReply) ? `Ẩn ${this.showNumberReply()} phản hồi` : `Xem ${this.showNumberReply()} phản hồi`}</span></i>
                    {this.state.openReply && this.renderReply()}
                </React.Fragment> : <></>
                }
            </div>
        )
    }
}

export default ReplyComment
