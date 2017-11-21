import React, { Component } from 'react';
import db from './firestore';

class PostForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            name : '',
            game: '',
            rating : 5,
            text : ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {

        const target = event.target;
        const value = target.type === 'radio' ? parseInt(target.value, 10) : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        db.collection("posts").add({
            name : this.state.name,
            game : this.state.game,
            rating : this.state.rating,
            text : this.state.text,
            time: Date.now()
        }).catch(function(error) {
            console.error("Error adding document: ", error);
        });

        this.setState(()=>{
            return {
                name : '',
                game: '',
                rating : '1',
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

                <label htmlFor='game'>Название игры</label>
                <input id='game' type='text' autoComplete='off' name="game" value={this.state.game} onChange={this.handleInputChange}/>

                <label htmlFor='rating'>Как вы оцениваете игру?</label>
                <span>
                    <label><input type="radio" name="rating" value="1" defaultChecked={this.state.rating === 1} onClick={this.handleInputChange}/> 1 балл</label>
                    <label><input type="radio" name="rating" value="2" defaultChecked={this.state.rating === 2} onClick={this.handleInputChange}/> 2 балла</label>
                    <label><input type="radio" name="rating" value="3" defaultChecked={this.state.rating === 3} onClick={this.handleInputChange}/> 3 балла</label>
                    <label><input type="radio" name="rating" value="4" defaultChecked={this.state.rating === 4} onClick={this.handleInputChange}/> 4 балла</label>
                    <label><input type="radio" name="rating" value="5" defaultChecked={this.state.rating === 5} onClick={this.handleInputChange}/> 5 баллов</label>
                </span>
                <label htmlFor='text'>Ваш отзыв об игре</label>
                <textarea id='text' autoComplete='off' name='text' value={this.state.text} onChange={this.handleInputChange}/>
                <button className='pure-button pure-button-primary' type='submit'
                        disabled={!this.state.name || !this.state.game || !this.state.rating || !this.state.text}>Отправить</button>
            </form>
        )
    }
}

export default PostForm