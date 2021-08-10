import React, { Component } from 'react'
import ContentPersonal from '../../components/Content/ContentPersonal/ContentPersonal'
import Navbar from '../../components/Navbar/Navbar'
import { Datacontext } from '../../context/contextGlobal'
export class Personal extends Component {
    constructor(props) {
        super(props)
    }
    static contextType = Datacontext;
    hideModal = () => {
        document.getElementById('Modal').style.display = "none"
        this.context.setShowEdit();
    }
    render() {
        return (
            <React.Fragment>
                <div id="Modal" onClick={() => this.hideModal()}></div>
                <Navbar />
                <ContentPersonal id ={this.props.match.params.id}/>
            </React.Fragment>
        )
    }
}

export default Personal
