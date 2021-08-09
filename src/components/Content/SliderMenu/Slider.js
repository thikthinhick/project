import React, { Component } from 'react'
import './Slider.css'
import { data } from './Dataslider'
export class Slider extends Component {
    constructor(props) {
        super(props)
        this.state = { current: 0 }
    }
    showSlider() {
        if (this.state.current == 2)
            this.setState({ current: 0 })
        else
            this.setState({ current: this.state.current + 1 })


    }
    componentDidMount() {
        this.timerId = setInterval(() => this.showSlider(), 5000)
    }
    componentWillUnmount() {
        clearInterval(this.timerId)
    }
    render() {
        return (
            <div className="img-slider">
                {data.map((value, index) =>
                    <div className={(this.state.current === index) ? "slide active": "slide"}>
                        <img src={value.image} alt="" />
                        <div className="info">
                            <h2>Slide</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.</p>
                        </div>
                    </div>
                )}
                <div className="navigation">
                    {data.map((value, index) => <div className={this.state.current === index ? 'btn active': 'btn'}></div>)}
                </div>
            </div>
        )
    }
}

export default Slider
