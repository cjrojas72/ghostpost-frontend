import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts_data: [],
    };
  }

  componentDidMount() {
    fetch(" http://127.0.0.1:8000/posts/")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ posts_data: data });
      });
  }

  all_filter = () => {
    fetch(" http://127.0.0.1:8000/posts/")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ posts_data: data });
      });
  };

  boast_filter = () => {
    fetch(" http://127.0.0.1:8000/posts/boast")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ posts_data: data });
      });
  };

  roast_filter = () => {
    fetch(" http://127.0.0.1:8000/posts/roast")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ posts_data: data });
      });
  };

  like_action = (id) => {
    fetch(`http://127.0.0.1:8000/posts/${id}/LikeView`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    alert("like" + id);
  };

  dislike_action = (id) => {
    fetch(`http://127.0.0.1:8000/posts/${id}/DislikeView`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    alert("dislike" + id);
  };

  render() {
    return (
      <div className="app-div">
        <h1>Ghost Post</h1>
        <div>
          <h3>Add a Boast or Roast!</h3>
          <button>
            <a href="http://127.0.0.1:8000/addpost/">Post!</a>
          </button>
        </div>
        <div className="filters-div">
          <button onClick={this.all_filter}>All Posts</button>
          <button onClick={this.boast_filter}>All Boasts</button>
          <button onClick={this.roast_filter}>All Roasts</button>
        </div>
        {this.state.posts_data.map((post) => {
          let id = post.post_id;
          return (
            <li key={id}>
              <p>choice: {post.choice}</p>
              <p>{post.body}</p>
              <p>{post.date_time}</p>
              <p>
                <button onClick={() => this.like_action(id)}>Like</button>
                {post.up_votes}
              </p>
              <p>
                <button onClick={() => this.dislike_action(id)}>Dislike</button>
                {post.down_votes}
              </p>
              <hr></hr>
            </li>
          );
        })}
      </div>
    );
  }
}

export default App;
