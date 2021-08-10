import React, { Component } from 'react'
import MaterialTable from 'material-table'
import axios from 'axios'
import { Modal } from 'react-modal';
export default class TableData extends Component {
  constructor(props) {
    super(props);
    this.state = ( 
     {
       users : [],
       modalIsOpen: false,
       iduser: '',
       user_name: '',
       password:'',
       anh_dai_dien:'',
       email:'',
       is_admin:'',
       so_thongbao: 0
     }
    )
  }

  componentDidMount() {
    axios.get('http://localhost:7000/getuser').then(response => {
      this.setState({users:response.data});
      console.log(response.data);
    })
  }

  componentWillUnmount() {
    Modal.setAppElement('body');
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name] : value
    })
  }

  handleDelete = (item) => {
    const temp = item;
    axios.post('http://localhost:7000/deleteUser', temp).then(res => {
      this.setState(prev => ({
        users: prev.users.filter(el => el.iduser !== temp.iduser)
      }));
    })
  }

  handleInsertSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      iduser: this.state.iduser,
      user_name: this.state.user_name,
      password : this.state.password,
      anh_dai_dien: this.state.anh_dai_dien,
      email: this.state.email,
      is_admin: this.state.is_admin,
      so_thongbao : 0
    };

    axios.post('http://localhost:7000/insertUser', newUser).then(res =>{
      let users = this.state.users;
      users = [newUser,...users];
      this.setState({users: users});
    })
  }

  openModal =() =>{
    this.setState({
      modalIsOpen: true
    });
  }

  closeModal =() => {
    this.setState({
      modalIsOpen: false
    });
  }

  handleEditSubmit = (event) => {
    event.preventDefault();

    const newUpdateUser = {
      iduser: this.state.iduser,
      user_name: this.state.user_name,
      password : this.state.password,
      anh_dai_dien: this.state.anh_dai_dien,
      email: this.state.email,
      is_admin: this.state.is_admin,
      so_thongbao : this.state.so_thongbao
    };

    axios.post('http://localhost:7000/editUser', newUpdateUser).then(res => {
      let key = this.state.iduser;
      
      this.setState(prevState => ({
        users: prevState.users.map(
          elm => elm.iduser === key ? {
            ...elm,
            user_name: this.state.user_name,
            password: this.state.password,
            anh_dai_dien: this.state.anh_dai_dien,
            email: this.state.email,
            is_admin: this.state.is_admin,
            so_thongbao : this.state.so_thongbao
          }: elm
        )
      }))
    }).catch(error => console.log(error));
  }

  render() {
    const columns = [{
      title:'IdUser',field:'iduser'
    },
    {
      title:'user_name', field:'user_name'
    },
    {
      title:'Image',field:'anh_dai_dien'
    },
    {
      title:'Email',field:'email'
    },
    {
      title:'IsAdmin',field:'is_admin'
    }];
        return (
            <div>
                <div class = "main-content">
                    <main> Bảng dữ liệu người dùng

                    <div class="Admin__table">
                <div class="table-wrapper">
                    <MaterialTable class = "table table-striped table-hover" title = "UserDetai" id = "datatable"
                          data = {this.state.users}
                          columns = {columns}
                          actions = {[
                            {
                              icon : 'edit',
                              tooltip: 'Edit',
                              onClick: (event, rowData) => window.alert("edit ?")
                            },
                            {
                              icon: 'delete',
                              tooltip: 'Edit',
                              onClick: (event, rowData ) => window.alert("delete?")
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
                                           <th><label>Iduser</label></th>
                                           <td>
                                           <input
                                               value = {this.state.iduser}
                                               name="iduser"
                                               type="text"
                                               onChange={this.handleInputChange}>
                                               </input>
                                           </td>
                                       </tr>
           
                                       <tr>
                                           <th><label>UserName</label></th>
                                           <td>
                                           <textarea
                                               value = {this.state.user_name}
                                               name="user_name"
                                               onChange={this.handleInputChange} />
                                           </td>
                                       </tr>
           
                                       <tr>
                                           <th><label>Password</label></th>
                                           <td>
                                           <input
                                               value = {this.state.password}
                                               name="password"
                                               onChange={this.handleInputChange} />
                                           </td>
                                       </tr>
                                       <tr>
                                           <th><label>Ảnh đại diện</label></th>
                                           <td>
                                           <textarea
                                               value = {this.state.anh_dai_dien}
                                               name="anh_dai_dien"
                                               onChange={this.handleInputChange} />
                                           </td>
                                       </tr>
                                       <tr>
                                           <th><label>Email</label></th>
                                           <td>
                                           <textarea
                                               value={this.state.email}
                                               name="email"
                                               onChange={this.handleInputChange} />
                                           </td>
                                       </tr>
                                       <tr>
                                           <th><label>IsAdmin</label></th>
                                           <td>
                                           <textarea
                                               value = {this.state.is_admin}   
                                               name="is_admin"
                                               onChange={this.handleInputChange} />
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
