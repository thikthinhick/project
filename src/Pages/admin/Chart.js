import React, { Component } from 'react'
import {Line} from 'react-chartjs-2'
import './admin.css'
import axios from 'axios';
export default class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = (
            {
                Timelines:{
                },
                TimelinesFeb:{
                },
                TimelinesMar:{
                },
                TimelinesApr:{
                },
                TimelinesMay:{
                },
                TimelinesJun:{
                },
                TimelinesJul:{
                },
                TimelinesAug:{
                },
                

                TimelinesOrder:{
                },
                TimelinesOrderFeb:{
                },
                TimelinesOrderMar:{
                },
                TimelinesOrderApr:{
                },
                TimelinesOrderMay:{
                },
                TimelinesOrderJun:{
                },
                TimelinesOrderJul:{
                },
                TimelinesOrderAug:{
                }

            }
        )
    }

    componentDidMount() {
        // product
        axios.get('http://localhost:7000/getTime').then(res => {
            this.setState({Timelines: res.data[0]});
        })
        axios.get('http://localhost:7000/getTimeFeb').then(res => {
            this.setState({TimelinesFeb: res.data[0]});
        })
        
        axios.get('http://localhost:7000/getTimeMar').then(res => {
            this.setState({TimelinesMar: res.data[0]});
        })
        
        axios.get('http://localhost:7000/getTimeApr').then(res => {
            this.setState({TimelinesApr: res.data[0]});
        })
        
        axios.get('http://localhost:7000/getTimeMay').then(res => {
            this.setState({TimelinesMay: res.data[0]});
        })
        
        axios.get('http://localhost:7000/getTimeJun').then(res => {
            this.setState({TimelinesJun: res.data[0]});
        })
        
        axios.get('http://localhost:7000/getTimeJul').then(res => {
            this.setState({TimelinesJul: res.data[0]});
        })
        axios.get('http://localhost:7000/getTimeAug').then(res => {
            this.setState({TimelinesAug: res.data[0]});
        })
        
        // order
        axios.get('http://localhost:7000/getTimeOrder').then(res => {
            this.setState({TimelinesOrder: res.data[0]});
        })
        axios.get('http://localhost:7000/getTimeOrderFeb').then(res => {
            this.setState({TimelinesOrderFeb: res.data[0]});
        })
        
        axios.get('http://localhost:7000/getTimeOrderMar').then(res => {
            this.setState({TimelinesOrderMar: res.data[0]});
        })
        
        axios.get('http://localhost:7000/getTimeOrderApr').then(res => {
            this.setState({TimelinesOrderApr: res.data[0]});
        })
        
        axios.get('http://localhost:7000/getTimeOrderMay').then(res => {
            this.setState({TimelinesOrderMay: res.data[0]});
        })
        
        axios.get('http://localhost:7000/getTimeOrderJun').then(res => {
            this.setState({TimelinesOrderJun: res.data[0]});
        })
        
        axios.get('http://localhost:7000/getTimeOrderJul').then(res => {
            this.setState({TimelinesOrderJul: res.data[0]});
        })
        axios.get('http://localhost:7000/getTimeOrderAug').then(res => {
            this.setState({TimelinesOrderAug: res.data[0]});
        })
    }

    render() {
        const data1 = {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul","Aug"],
            datasets: [
              {
                label: "Số lượng sản phẩm theo từng tháng",
                data: [this.state.Timelines.jan, this.state.TimelinesFeb.jan, this.state.TimelinesMar.jan,
                    this.state.TimelinesApr.jan,
                    this.state.TimelinesMay.jan,
                    this.state.TimelinesJun.jan,
                    this.state.TimelinesJul.jan,
                    this.state.TimelinesAug.jan],
               
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
              },
              {
                label: "Số lượng sản phẩm yêu cầu trao đổi theo từng tháng",
                data: [this.state.TimelinesOrder.jan, this.state.TimelinesOrderFeb.jan, this.state.TimelinesOrderMar.jan,
                    this.state.TimelinesOrderApr.jan,
                    this.state.TimelinesOrderMay.jan,
                    this.state.TimelinesOrderJun.jan,
                    this.state.TimelinesOrderJul.jan,
                    this.state.TimelinesOrderAug.jan],
        
                borderColor: "#742774"
              }
            ]
            
          };
        return (
            <div>
                <Line data = {data1}
                 width={520}
                 height={400}
                 options= {{
                     scales: {
                         yAxes: [{
                             ticks: {
                                 beginAtZero:true
                             }
                         }]
                     }
                 }}
                />
            </div>
        )
    }
}
