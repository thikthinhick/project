import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2'
import axios from 'axios';
export default class PieChart extends Component {
    constructor(props) {
        super(props);
        this.state = (
            {
                users:{
                },
                products:[],
                orders:{
                },
                message:{ 
                },
                binh_luan:{
                },
                chat:{}
            }
        )
    }

    componentDidMount() {
        //counter
        axios.get('http://localhost:7000/getTotalUser').then(res => {
            this.setState({users: res.data[0]});
          });
        axios.get('http://localhost:7000/getTotalProduct').then(res => {
            this.setState({products: res.data[0]});
          })
        axios.get('http://localhost:7000/getTotalOrder').then(res => {
            this.setState({orders:res.data[0]});
          })
        axios.get('http://localhost:7000/getTotalBinhluan').then(res => {
            this.setState({binh_luan:res.data[0]});
          })
        axios.get('http://localhost:7000/getTotalChat').then(res => {
            this.setState({chat:res.data[0]});
          })

        console.log(this.state.chat.chat);  
    }
    render() {
        return (
            <div>
                <Bar
                      data={{
                        labels: ['Users', 'Products', 'Orders', 'Thông báo', 'Comments', 'Chat'],
                        datasets: [{
                            label: 'Thông số',
                            data: [this.state.users.users,
                                this.state.products.products,
                                this.state.orders.orders,
                                this.state.users.so_thongbao,
                                this.state.binh_luan.comments,
                                this.state.chat.chat
                            ],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                        }]
                    }}
                    width={520}
                    height={400}
                    options={{ 
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }}
                />
            </div>
        )
    }
}
