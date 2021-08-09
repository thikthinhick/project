import React, { Component } from 'react'
import Slider from './SliderMenu/Slider'
import Menu from './SliderMenu/Menu'
import Product from './product/product';

export class Content extends Component {
    render() {
        return (
            <div className="container-body">
                <div className="container-body-1">
                    <Slider/>
                    <Menu/>
                </div>
                <div className="container-body-2">
                    <Product/>
                </div>
            </div>
        )
    }
}
export default Content
