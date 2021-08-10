
import './App.css';
import React from 'react';
import Login from './Pages/Login/Login'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { DataProvider } from './context/contextGlobal'
import Cart from './Pages/Cart/CartPage'
import Home from './Pages/Home/Home'
import Detail from './Pages/Detail/Detail.js'
import Chat from './components/Chat/Chat'
import Search from './Pages/Search/Search'
import { Datacontext } from './context/contextGlobal'
import PagePost from './Pages/Post/PagePost';
import Personal from './Pages/Personal/Personal';
import Exchange from './Pages/Exchange/Exchange';
import { PrivateRoute } from './Utils/privateRoute'
import Admin from './Pages/admin/admin'
class App extends React.Component {
  
  render() {
    return (
      <Router>
        <DataProvider>
          <div className="App">
            <Route path='/Personal/:id' value={'hello'} component={Personal} />
            <Route path='/cart' exact component={Cart} />
            <Route path='/' exact component={Home} />
            <Route path="/search" component={Search} />
            <Route path='/login' exact component={Login} />
            <Route path='/home/:id' component={Detail} />
            <PrivateRoute path="/admin" component={Admin}/>
            <PrivateRoute path="/Exchange" component={Exchange} exact={true} />
            <PrivateRoute path="/post" component={PagePost} exact={true} />
          </div >
          <Datacontext.Consumer>
            {value =>
              (value.chat) ? <Chat /> : <></>
            }
          </Datacontext.Consumer>
        </DataProvider>
      </Router>
    );
  }
}

export default App;
