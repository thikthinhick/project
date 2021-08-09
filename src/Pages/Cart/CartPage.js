import React, { Component } from 'react'
import ManageCart from '../../components/Content/PageCart/ManageCart'
import Navbar from '../../components/Navbar/Navbar'
export class CartPage extends Component {
    render() {
        return (
          <React.Fragment>
              <Navbar/>
              <ManageCart/>
          </React.Fragment>
        )
    }
}

export default CartPage
