import React, { Component } from 'react';
import db from './firestore';

class CommentForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            name : '',
            text : ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        db.collection("posts").doc(this.props.doc).collection('comments').add({
            name : this.state.name,
            rating : 0,
            text : this.state.text
        }).catch(function(error) {
            console.error("Error adding document: ", error);
        });

        this.setState(()=>{
            return {
                name : '',
                text : ''
            }
        });
        this.props.onSubmit();
    }


    render() {
        return (
            <form className='pure-form pure-form-stacked' onSubmit={this.handleSubmit} style={this.props.hidden ? { display:'none'} : null}>
                <label htmlFor='name'>Ваше имя</label>
                <input id='name' type='text' autoComplete='off' name="name" value={this.state.name} onChange={this.handleInputChange}/>
                <label htmlFor='text'>Комментарий</label>
                <textarea id='text' autoComplete='off' name='text' value={this.state.text} onChange={this.handleInputChange}/>
                <button className='pure-button pure-button-primary' type='submit' disabled={!this.state.name || !this.state.text}>Отправить</button>
            </form>
        )
    }
}

export default CommentForm