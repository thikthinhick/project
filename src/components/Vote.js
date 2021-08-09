import React, { Component } from 'react'

export class Vote extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const x = parseFloat(this.props.value)
        if(x)
        return (
            <div style={{fontSize: "18px",
                color: "#FD4"}}>
                {
                    [0, 0, 0, 0, 0].map((value, index) => 
                        (index + 1 <= x) ? <i class="fas fa-star"></i> : (index < x) ? <i class="fas fa-star-half-alt"></i> : <i class="far fa-star"></i>
                    )
                }

            </div>
        )
        else return <></>
    }
}

export default Vote
