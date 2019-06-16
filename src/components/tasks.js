import React from 'react';
import Template from './template'
import Pages from './pagination'

class ShowTasks extends React.Component {
    
    state = {
        tasks: '',
        count: '',


    }
    // getting info from api when  
    // app is loaded on client
    componentDidMount() {    
        fetch(`https://uxcandy.com/~shapoval/test-task-backend/v2/?developer=Najmiddin&page=${this.props.page}`)
            .then(response => {return response.json()})
            .then(data => {               
               this.setState({tasks: data.message.tasks});
               this.setState({count: data.message.total_task_count});
               this.props.getPageNum(this.state.count)
           })   
    }

    render() {
        const tasks = this.state.tasks;
        const count = this.state.count;
        const isAdmin = this.props.isAdmin;

        if(tasks) {
            return (
                <div>
                   {tasks.length === 3 && 
                        <div className='wrapper'>
                            <Template tasks={tasks[0]} isAdmin={isAdmin}  id={tasks[0].id} token={this.props.token}/>
                            <Template tasks={tasks[1]} isAdmin={isAdmin}  id={tasks[1].id} token={this.props.token}/>
                            <Template tasks={tasks[2]} isAdmin={isAdmin} id={tasks[2].id} token={this.props.token}/>
                        </div>}
                   {tasks.length === 2 && 
                        <div className='wrapper'>
                            <Template tasks={tasks[0]} isAdmin={isAdmin} id={tasks[0].id} token={this.props.token}/>
                            <Template tasks={tasks[1]} isAdmin={isAdmin} id={tasks[1].id} token={this.props.token}/>
                        </div>}
                   {tasks.length === 1 && 
                        <div className='wrapper'>
                            <Template tasks={tasks[0]} isAdmin={isAdmin} id={tasks[0].id} token={this.props.token}/>
                        </div>}
                   <Pages count={count} />
                </div>
            )

        }else {
            return <div></div>
        }
 
        
        
    }



}
export default ShowTasks;
    