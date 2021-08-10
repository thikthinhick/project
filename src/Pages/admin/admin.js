import React, { Component } from 'react'
import { Router } from 'react-router-dom'
import Chart from './Chart'
import MainContent from './MainContent'
import MainSlider from './MainSlider'
import ProductTable from './ProductTable'
import UserTable from './TableData'

export default class admin extends Component {
    render() {
        return (
            <div class="Admin">
               <MainSlider />
               <MainContent />
               <ProductTable/>
            </div>
        )
    }
}
