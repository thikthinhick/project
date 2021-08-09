import React, { Component } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import ProductDetail from '../../components/Content/product/ProductDetail'
import Comment from '../../components/Comment/Comment.js'
export class Detail extends Component {
    render() {
        console.log(this.props.match)
        return (
            <React.Fragment>
               <Navbar/>
               <ProductDetail params = {this.props.match.params}/> 
               <Comment params = {this.props.match.params.id}/> 
            </React.Fragment>
        )
    }
}

export default Detail
