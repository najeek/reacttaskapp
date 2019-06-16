import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import Navbar from './components/navbar'
import Form from './components/form';
import ShowTasks from './components/tasks';
import {BrowserRouter, Route} from 'react-router-dom'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.checkInputs = this.checkInputs.bind(this);
  }

  state = {
    pageNum: '',
    routers: '',
    login: 'admin',
    password: '123',
    isAdmin: false,
    token: ''
  }

  checkInputs(event) {
    event.preventDefault();
    let username = this.refs.username.value;
    let password = this.refs.password.value;
    let state = this.state;
    let form = new FormData();
        form.append("username", username);
        form.append("password", password);
    let settings = {
        method: 'POST',
        body: form
    }

    const url = 'https://uxcandy.com/~shapoval/test-task-backend/v2/login?developer=Najmiddin';
    const request = new Request(url, settings);

    if(username.toLowerCase() === state.login && password.toLowerCase() === state.password) {
        alert('Вы вошли как админ! ');
        fetch(request)
           .then(data => {return data.json()})
           .then(info => {
             this.refs.username.value = '';
             this.refs.password.value = '';
             this.setState({token: info.message.token})
             document.querySelector('.form-box').style.display = 'none';
             this.setState({isAdmin: true})
             return <Route path='/' push exact render = {() => <ShowTasks page={1} getPageNum={this.getPageNum} isAdmin={this.state.isAdmin} />} />     

           }) 
    } else {
      alert('Вы неправильно ввели пароль или логин, попробуйте ещё раз!');
      this.refs.username.value = '';
      this.refs.password.value = '';
    }
  }

  componentDidMount() {    
    fetch(`https://uxcandy.com/~shapoval/test-task-backend/v2/?developer=Najmiddin&page=${this.props.page}`)
        .then(response => {return response.json()})
        .then(data => {
          const count = data.message.total_task_count; 
          let pages;
          if(count % 3 === 0)  pages = count / 3;
          if(count % 3 !== 0)  pages = parseInt(count / 3) + 1;
          this.setState({pageNum: pages})
       })
   }
  getPageNum = value => {
    let pages;
    if(value % 3 === 0)  pages = value / 3;
    if(value % 3 !== 0)  pages = parseInt(value / 3) + 1;
    this.setState({pageNum: pages})
  }

  returnRouters = pageNum => {
    
    let links = [];
    for(let i = 1; i <= pageNum; i++) {
      links.push( <Route key={i} path={`/page=${i}`} exact render = {() => <ShowTasks page={i} getPageNum={this.getPageNum} token={this.state.token} />} />)
    }
    return links;
  }

  render() {

      const formBox = (
        <div className='form-box'> 
        <form onSubmit={this.checkInputs}>
          <div className='input-box'>
            <input ref="username" type='text' required placeholder='Введите ваш логин' />
            <input ref="password" type='text' required placeholder='Введите ваш пароль' />
          </div>  
          <button type="submit">Войти</button>
        </form>
      </div>
      )
      return (  
        <div className='wrapper'>
          <Navbar />
          {this.state.isAdmin ? <div></div> : <div><h2>Войти:</h2> {formBox}</div>}
          <Route path='/' exact render = {() => <ShowTasks page={1} getPageNum={this.getPageNum} isAdmin={this.state.isAdmin} token={this.state.token} />} />       
          { this.state.pageNum ? this.returnRouters(this.state.pageNum) : <div></div>}  
          <Route path='/create' exact component={Form} />  
        </div>
      )
    }
  };

const application = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
  
ReactDOM.render(application, document.getElementById('root')); 