import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './admin.css'
export default class MainSlider extends Component {
    render() {
        return (
            <div>
                 <input type="checkbox" id="sidebar-toggle" />
        <div className="sidebar">
          <div className="sidebar-header">
            <h3 className="brand">
              <span className="ti-unlink" />
              <span>SHOPPING</span>
            </h3>
            <label htmlFor="sidebar-toggle" className="ti-menu-alt" />
          </div>
          <div className="sidebar-menu">
            <ul>
              <li>
                <a href>
                  <i className="fas fa-chart-line" />
                  <span>Thống kê</span>
                </a>
              </li>
              <li>
                <a href>
                  <i className="fas fa-table" />
                  <span><Link to = '/UserTable'> Bảng quản lí</Link></span>
                </a>
              </li>
              <li>
                <a href>
                  <i className="fas fa-user" />
                  <span>Tài khoản</span>
                </a>
              </li>
              <li>
                <a href>
                  <i className="fas fa-question-circle" />
                  <span>Giới thiệu</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
            </div>
        )
    }
}
