import React, {Component} from "react";
import db from "./firestore";
import CommentForm from "./CommentForm";

function Comment({comment, changeRating}) {
    function _increaseRating() {
        changeRating(comment.id, 1);
    }

    function _decreaseRating() {
        changeRating(comment.id, -1);
    }

    return (
        <div className="pure-g">
            <div className="pure-u-2-3">
                <p>Пользователь: {comment.name}</p>
                <p>Комментарий: {comment.text}</p>
            </div>
            <div className="pure-u-1-3">
                <p>Рейтинг комментария: {comment.rating}</p>
                <button onClick={_increaseRating}>+</button>
                <button onClick={_decreaseRating}>-</button>
            </div>
        </div>
    );
}


function CommentsGrid(props) {
    return (
        <div>
            <h3>Комментарии</h3>
            {props.comments
                .map((comment) => {
                    return (
                        <Comment key={comment.id}
                                 comment={comment}
                                 changeRating={props.changeRating}
                        />
                    );
                })
            }
        </div>
    );
}

class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            fetching: true,
            hidden: true
        };

        this.handleShowForm = this.handleShowForm.bind(this);
        this.changeRating = this.changeRating.bind(this);

    }

    handleShowForm() {
        this.setState((prevState) => {
            return {
                hidden: !prevState.hidden
            }
        })
    }

    changeRating(ref, n) {
        let commentRef = db.collection("posts").doc(this.props.doc).collection('comments').doc(ref);
        commentRef.get().then(doc => {
            let newRating = doc.get('rating') + n;
            commentRef.update({rating: newRating}).catch(function (error) {
                console.error("Error updating document: ", error);
            });
        });
    }

    componentDidMount() {

        this.unsubscribe = db.collection("posts").doc(this.props.doc).collection('comments').orderBy('rating', 'desc').onSnapshot(querySnapshot => {
            let comments = [];
            querySnapshot.forEach(doc => {
                let comment = {};
                comment.id = doc.id;
                comment.name = doc.get("name");
                comment.text = doc.get("text");
                comment.rating = doc.get("rating");
                comments.push(comment);
            });

            this.setState(() => {
                return {
                    comments: comments,
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
            <div>
                <button className="pure-button" onClick={this.handleShowForm}>Добавить комментарий</button>
                <CommentForm hidden={this.state.hidden} doc={this.props.doc} onSubmit={this.handleShowForm}/>
                {this.state.comments.length > 0 ?
                    <CommentsGrid changeRating={this.changeRating} comments={this.state.comments}/> :
                    (this.state.fetching ? <h3>Загрузка комментариев...</h3> : <h3>Нет комментариев</h3>)
                }
            </div>
        );
    }
}

export default Comments