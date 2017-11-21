import React, {Component} from "react";
import Comments from "./Comments";
import db from "./firestore";

function Post({post}) {
    return (
        <div>
            <h4>Пользователь {post.name} дал игре {post.game} рейтинг {post.rating}</h4>
            <blockquote>{post.text}</blockquote>
        </div>
    );
}

class PostDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            post: null,
            fetching: true
        };
    }

    componentDidMount() {
        this.unsubscribe = db.collection("posts").doc(this.props.match.params.postId).onSnapshot(doc => {
            if (doc.exists) {
                let post = {};
                post.id = doc.id;
                post.name = doc.get("name");
                post.game = doc.get("game");
                post.text = doc.get("text");
                post.rating = doc.get("rating");
                this.setState(() => {
                    return {
                        post: post,
                        fetching: false
                    };
                });
            } else {
                this.setState(() => {
                    return {
                        fetching: false
                    };
                });
            }
        }, error => console.log(error));
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        return (
            <div className="container">
                {this.state.post ?
                    <div>
                        <Post post={this.state.post}/>
                        <Comments doc={this.props.match.params.postId}/>
                    </div> :
                    (this.state.fetching ? <h3>Загрузка отзыва...</h3> : <h3>Такого отзыва не существует</h3>)
                }
            </div>
        );
    }
};

export default PostDetails;