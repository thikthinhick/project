import axios from 'axios';
import MaterialTable from 'material-table';
import React, { Component } from 'react'
import Modal from 'react-modal'
export default class ProductTable extends Component {
  constructor(props) {
    super(props);
    this.state = ( 
     {
       modalIsOpen : false,
       products : [],
       idsan_pham : '',
       namesan_pham: '',
       gia_ca: '',
       tinh_trang_san_pham: '',
       thoi_gian_dang: '',
       idthe_loai: 0,
       iduser: '',
       mo_ta_chi_tiet:''
     }
    )
  }
  componentWillUnmount() {
    Modal.setAppElement('body');
  }
  openModal = () => {
    this.setState({
      modalIsOpen: true
    });
  }
  closeModal = () => {
    this.setState({
      modalIsOpen: false
    });
  };
  componentDidMount() {
    axios.get('http://localhost:7000/getproduct').then(response => {
      this.setState({products:response.data});
    })
  }
  handleDelete = (item) =>{
    const temp = item;
    axios.post('http://localhost:7000/delete', temp).then(response => {
      this.setState(prev => ({
        products: prev.products.filter(el => el.idsan_pham !== temp.idsan_pham)
      }));
    })
  }
  handleInputChange = (event) => {
    const target = event.target;
    const value  = target.value;
    const name = target.name;
    
    this.setState({
      [name] : value
    })
  }
    openModal =(item) => {
      this.setState({
        modalIsOpen: true,
        idsan_pham: item.idsan_pham,
        namesan_pham: item.namesan_pham,
        gia_ca: item.gia_ca,
        tinh_trang_san_pham: item.tinh_trang_san_pham,
        thoi_gian_dang: item.thoi_gian_dang,
        idthe_loai: item.idthe_loai,
        iduser: item.iduser,
        mo_ta_chi_tiet: item.mo_ta_chi_tiet
      });

    }

    handleEditSubmit = (event) => {
      event.preventDefault();
      
      const newUpdateProduct = {
        idsan_pham: this.state.idsan_pham,
        namesan_pham: this.state.namesan_pham,
        gia_ca : this.state.gia_ca,
        tinh_trang_san_pham: this.state.tinh_trang_san_pham,
        thoi_gian_dang : this.state.thoi_gian_dang,
        idthe_loai: this.state.idthe_loai,
        iduser : this.state.iduser,
        mo_ta_chi_tiet: this.state.mo_ta_chi_tiet
      };
      console.log("newUpdateProduct" + newUpdateProduct);

      axios.post('http://localhost:7000/edit', newUpdateProduct).then(res =>{
        let key = this.state.idsan_pham;
        console.log(key);
      this.setState(prevState => ({
        products: prevState.products.map(
          elm => elm.idsan_pham === key ? {
            ...elm,
            namesan_pham: this.state.namesan_pham,
            gia_ca : this.state.gia_ca,
            tinh_trang_san_pham: this.state.tinh_trang_san_pham,
            thoi_gian_dang : this.state.thoi_gian_dang,
            idthe_loai: this.state.idthe_loai,
            iduser : this.state.iduser,
            mo_ta_chi_tiet: this.state.mo_ta_chi_tiet
          }: elm
        )
      }))
      });
  };
  render() {
        const columns = [{
            title:'IdProduct',field:'idsan_pham'
        },
        {
          title:'ProductName',field:'namesan_pham'
        },
        {
          title:'Price',field:'gia_ca'
        },
        {
          title:'Tình trạng sản phẩm',field:'tinh_trang_san_pham'
        }
      ];
      
   
        return (
           <div>
               <div class = "main-content">
                    <main> Bảng dữ liệu sản phẩm

                    <div class="Admin__table">
                <div class="table-wrapper">
                <MaterialTable
                                  data= {this.state.products}
                                  columns = {columns}
                                  actions={[
                                    {
                                      icon: 'edit',
                                      tooltip: 'Edit',
                                      onClick: (event , rowData) => this.openModal(rowData)
                                    },
                                    {
                                      icon: 'delete',
                                      tooltip: 'Delete  ',
                                      onClick: (event , rowData) => this.handleDelete(rowData)
                                    }
                                  ]}
                              />
                <Modal  
                            isOpen={this.state.modalIsOpen}
                            onRequestClose= {this.closeModal}
                          >
                              <div class = "main-content">
                                <div class="Admin__table">
                <div class="table-wrapper">
                            <button onClick = {this.closeModal}>Close</button>
                            <form onSubmit = {this.handleEditSubmit}>
                              <table>
                            <tbody>
                            <tr>
                                <th><label>IdProduct</label></th>
                                <td>
                                <input
                                    value = {this.state.idsan_pham}
                                    name="idsan_pham"
                                    type="text"
                                  >
                                    </input>
                                </td>
                            </tr>

                            <tr>
                                <th><label>ProductName</label></th>
                                <td>
                                <textarea
                                    name="namesan_pham"
                                    value = {this.state.namesan_pham}
                                    onChange = {this.handleInputChange}
                                 />
                                </td>
                            </tr>

                            <tr>
                                <th><label>Price</label></th>
                                <td>
                                <textarea
                                    name="gia_ca"
                                    value = {this.state.gia_ca}
                                    onChange = {this.handleInputChange}
                                 />
                                </td>
                            </tr>
                            <tr>
                                <th><label>Tình trạng sản phẩm</label></th>
                                <td>
                                <textarea
                                    name="tinh_trang_san_pham"
                                    value = {this.state.tinh_trang_san_pham}
                                    onChange = {this.handleInputChange}
                                  />
                                </td>
                            </tr>
                            <tr>
                                <th><label>Thời gian đăng</label></th>
                                <td>
                                <input
                                    name="thoi_gian_dang"
                                    value = {this.state.thoi_gian_dang}
                                    onChange = {this.handleInputChange}
                                />
                                </td>
                            </tr>
                            <tr>
                                <th><label>Id Thể loại</label></th>
                                <td>
                                <input
                                    name="idthe_loai"
                                    value = {this.state.idthe_loai}
                                />
                                </td>
                            </tr>
                            <tr>
                                <th><label>Id Người sở hữu</label></th>
                                <td>
                                <input
                                    name="iduser"
                                    value = {this.state.iduser}
                                />
                                </td>
                            </tr>
                            <tr>
                                <th><label>Mô tả chi tiết</label></th>
                                <td>
                                <textarea
                                    name="mo_ta_chi_tiet"
                                    value = {this.state.mo_ta_chi_tiet}
                                    onChange={this.handleInputChange}
                                />
                                </td>
                            </tr>
                            </tbody>
                        </table>

                              <button type="submit" onClick= {() => window.alert("Bạn đã chỉnh sửa thành công")}>Edit</button>
                            </form>
                            </div>
                            </div>
                            </div>
                      </Modal>
                </div>
            </div>
                    </main>
                </div>
               
           </div>
        )
    }
}




