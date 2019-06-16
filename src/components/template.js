import React from 'react';

class Template extends React.Component {
    constructor(props) {
        super(props);
        this.changeContent = this.changeContent.bind(this);
      }
 
    changeContent = (event) => {
        event.preventDefault();
        let form = new FormData();
            form.append("text", this.refs.input.value);
            form.append("status", 10);
            form.append("token", this.props.token)

        let settings = {
            method: 'POST',
            body: form,
        }
        const url = `https://uxcandy.com/~shapoval/test-task-backend/v2/edit/${this.props.id}?developer=Najmiddin`;
        const request = new Request(url, settings);
        
        fetch(request)
            .then(data => {return data.json()})
            .then(info => {
            alert('Success!');
            this.refs.input.value = '';
            console.log(info)

            })
        }
    render() {
 
        let isAdmin = this.props.isAdmin;
        let tasks = this.props.tasks;
        return (<div className='unit'>
        <ul>
            <li><strong>Имя пользователя:</strong> {tasks.username}</li>
            <li><strong>Email:</strong> {tasks.email}</li>
            <li><strong>Текст задачи:</strong> {tasks.text}</li>
            {isAdmin ? 
                <form onSubmit={this.changeContent}>
                    <input type='text' defaultValue={tasks.text} ref='input' />
                    <button type='submit'>Редактировать</button>
                </form> 
            : <li></li>}
        </ul>
    </div>)

    }     
  
}
export default Template;