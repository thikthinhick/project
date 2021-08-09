import axios from 'axios';
import React from 'react'
import { getToken } from '../../../Utils/Common';
import './Notifi.css'
import Datediff from '../../Datediff';
class Notifi extends React.Component {
    constructor(props) {
        super(props);
        this.state = { thongbao: [] }
    }
    componentDidMount() {
        axios.post('http://localhost:7000/getthongbao', {iduser: getToken()}).then(res => {
            this.setState({thongbao: res.data})
        }).catch(err => console.log(err))
    }
    render() {
        return (
            <div class="notification">
                <h3>Thông báo</h3>
                <ul class='notification__main'>
                    {this.state.thongbao.map((value) =>
                        <li>
                            <div class="icon-username">
                                <div>
                                    <img src={value.anh_dai_dien} alt="" />
                                </div>                                             
                            </div>
                            <div class="content">
                                <div class="noidung">
                                   {value.content} <span style={{fontWeight: "500"}}>{value.user_name}</span>
                                </div>
                                <div class="timer">
                                    {Datediff(value.thoi_gian)}
                                </div>
                            </div>
                            <div class="img-notifi">
                                <img src="https://i.pinimg.com/564x/e7/57/2c/e7572c0e0e90590af9adcf163481737a.jpg" alt="" />
                            </div>
                        </li>
                    )}

                </ul>
            </div>
        )
    }
}
export default Notifi;