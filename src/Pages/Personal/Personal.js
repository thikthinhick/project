import React, { Component } from 'react'
import ContentPersonal from '../../components/Content/ContentPersonal/ContentPersonal'
import Navbar from '../../components/Navbar/Navbar'
export class Personal extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount(){
        
    }
    render() {
        return (
            <React.Fragment>
                <Navbar />
                <ContentPersonal id ={this.props.match.params.id}/>
            </React.Fragment>
        )
    }
}

export default Personal
