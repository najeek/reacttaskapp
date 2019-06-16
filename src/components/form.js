import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSubmit(e) {
      e.preventDefault();

      let form = new FormData();
          form.append("username", this.refs.username.value);
          form.append("email", this.refs.email.value);
          form.append("text", this.refs.text.value);

      let settings = {
          method: 'POST',
          body: form
      }
     const url = 'https://uxcandy.com/~shapoval/test-task-backend/v2/create?developer=Najmiddin';
     const request = new Request(url, settings);
      
      fetch(request)
        .then(data => {return data.json()})
        .then(info => {
          alert('Success!');
          this.refs.username.value = '';
          this.refs.email.value = '';
          this.refs.text.value = '';
          console.log(info)

        })
    }
  
    render() {

      return (
          <div className='form-box'>
            <div><h2>Cоздать задачу</h2> </div>
            <form onSubmit={this.handleSubmit}>
              Введите ваш юзернейм:
              <input ref="username" className="phone" type='tel' name="phone" required />
              Введите ваш email:
              <input ref="email" className="email" type='email' name="email" required />
              Введите вашу задачу:
              <input ref="text" className="text" type='tel' name="email" required />
              <input type="submit" value="Submit"/>
             
            </form>
          </div>
      );
    }
  }
  
export default Form;
