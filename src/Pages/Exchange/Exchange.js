import React, { Component } from 'react'
import ManageExchange from '../../components/ManageExchange/ManageExchange'
import Navbar from '../../components/Navbar/Navbar'
export class Exchange extends Component {
    render() {
        return (
            <React.Fragment>
                <Navbar />
                <ManageExchange />
            </React.Fragment>
        )
    }
}

export default Exchange
