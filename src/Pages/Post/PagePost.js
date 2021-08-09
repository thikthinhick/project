import React, { Component } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Post from './Post'

export class PagePost extends Component {
    render() {
        return (
            <React.Fragment>
                <Navbar/>
                <Post/>
            </React.Fragment>
        )
    }
}

export default PagePost
