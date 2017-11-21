import React, {Component} from "react";
import db from "./firestore";
import {
    NavLink
} from 'react-router-dom';
import PostForm from "./PostForm";


function PostsGrid(props) {
    return (
        <div>
            <h3>Отзывы пользователей</h3>
            <table className="pure-table pure-table-horizontal">
                <thead>
                <tr className="text-center">
                    <th>#</th>
                    <th>Пользователь</th>
                    <th>Игра</th>
                    <th>Рейтинг</th>
                    <th>Время</th>
                </tr>
                </thead>
                <tbody>
                {props.posts
                    .map((post, index) => {
                        return (
                            <tr className="text-center" key={post.id}>
                                <td>{index + 1}</td>
                                <td>{post.name}</td>
                                <td>{post.game}</td>
                                <td>{post.rating}</td>
                                <td>
                                    <NavLink to={`/posts/${post.id}`}>
                                        {post.time ? new Date(post.time).toLocaleString() : 'Давно'}
                                    </NavLink>
                                </td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>
        </div>
    );
}

class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            fetching: true,
            hidden: true
        };
        this.handleShowForm = this.handleShowForm.bind(this);

    }

    handleShowForm() {
        this.setState((prevState) => {
            return {
                hidden: !prevState.hidden
            }
        })
    }

    componentDidMount() {
        this.unsubscribe = db.collection("posts").orderBy('rating', 'desc').onSnapshot(querySnapshot => {
            let posts = [];
            querySnapshot.forEach(doc => {
                let post = {};
                post.id = doc.id;
                post.name = doc.get("name");
                post.game = doc.get("game");
                post.rating = doc.get("rating");
                post.time = doc.get("time");
                posts.push(post);
            });
            this.setState(() => {
                return {
                    posts: posts,
                    fetching: false
                };
            });
        }, error => console.log(error));
    }

    componentWillUnmount() {
        this.unsubscribe();
    }


    render() {

        return (
            <div className="container">
                <div>
                    <button className="pure-button" onClick={this.handleShowForm}>Добавить отзыв</button>
                </div>
                <div>
                    <PostForm hidden={this.state.hidden} onSubmit={this.handleShowForm}/>
                </div>
                {this.state.posts.length > 0 ? <PostsGrid posts={this.state.posts}/> :
                    (this.state.fetching ? <h3>Загрузка отзывов...</h3> : <h3>Нет отзывов</h3>)
                }
            </div>
        );
    }
}

export default Posts;