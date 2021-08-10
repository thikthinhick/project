import React, { Component } from 'react'
import './admin.css'
import Chart from './Chart'
import PieChart from './PieChart'
export default class MainContent extends Component {
    render() {
        return (
            <div>
                <div>
                <div className="main-content">
        <header>
          <div className="search-wrapper">
            <i className="fas fa-search" />
            <input type="search" placeholder="Search" />
          </div>
        </header>
        <main>
          <div className="dash-cards">
            <div className="card-single">
              <div className="card-body">
                <i className="fas fa-user" />
                <div>
                  <h4>Tài khoản người dùng</h4>
                  <h4>50</h4>
                </div>
              </div>
            </div>
            <div className="card-single">
              <div className="card-body">
                <i className="fas fa-box-open" />
                <div>
                  <h4>Sản phẩm</h4>
                  <h4>100</h4>
                </div>
              </div>
            </div>
            <div className="card-single">
              <div className="card-body">
                <i className="far fa-handshake" />
                <div>
                  <h4>Số giao dịch</h4>
                  <h4>10</h4>
                </div>
              </div>
            </div>
          </div>
          <div class='chart'>
                        <div>
                                <Chart/>
                            
                        </div>
                        <div>
                            <PieChart/>
                        </div>
                    </div>
        </main></div>

                </div>
            </div>
        )
    }
}
