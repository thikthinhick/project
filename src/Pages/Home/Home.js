import React, { Component } from 'react'
import Content from '../../components/Content/Content'
import Navbar from '../../components/Navbar/Navbar.js'
import Chat from '../../components/Chat/Chat'
export class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <Navbar/>
                <Content/>
            </React.Fragment>
        )
    }
}
export default Home
