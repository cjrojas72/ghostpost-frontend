import React from "react";
import "./App.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

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

  updateState() {
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

  count_filter = () => {
    fetch(" http://127.0.0.1:8000/posts/countview")
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
    fetch(`http://127.0.0.1:8000/posts/${id}/likeview`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.updateState();
      });
    // alert("like " + id);
  };

  dislike_action = (id) => {
    fetch(`http://127.0.0.1:8000/posts/${id}/dislikeview`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.updateState();
      });
    // alert("dislike " + id);
  };

  delete_action = (id) => {
    fetch(`http://127.0.0.1:8000/posts/${id}/deleteview`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.updateState();
      });
    // alert("deleted " + id);
  };

  render() {
    return (
      <div className="app-div">
        <div>
          <h3>Add a Boast or Roast!</h3>
          <button>
            <a href="http://127.0.0.1:8000/addpost/">Post!</a>
          </button>
        </div>
        <br></br>
        <div className="filters-div">
          <button onClick={this.all_filter}>All Posts</button>
          <button onClick={this.boast_filter}>All Boasts</button>
          <button onClick={this.roast_filter}>All Roasts</button>
          <button onClick={this.count_filter}>Order by like</button>
        </div>
        {this.state.posts_data.map((post) => {
          let id = post.post_id;
          return (
            <div>
              <Card key={id} style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>choice: {post.choice}</Card.Title>
                  <Card.Text>
                    <p>{post.body}</p>
                  </Card.Text>

                  <Button variant="info" onClick={() => this.like_action(id)}>
                    Like
                  </Button>
                  <strong> {post.up_votes}</strong>

                  <Button
                    variant="secondary"
                    onClick={() => this.dislike_action(id)}
                  >
                    Dislike
                  </Button>
                  <strong> {post.down_votes} </strong>

                  <br></br>
                  <Button
                    variant="danger"
                    onClick={() => this.delete_action(id)}
                  >
                    DELETE
                  </Button>
                </Card.Body>
              </Card>

              {/* <li key={id}>
                <p>choice: {post.choice}</p>
                <p>{post.body}</p>
                <p>{post.date_time}</p>
                <p>
                  <button onClick={() => this.like_action(id)}>Like</button>
                  {post.up_votes}
                </p>
                <p>
                  <button onClick={() => this.dislike_action(id)}>
                    Dislike
                  </button>
                  {post.down_votes}
                </p>
                <br></br>
                <br></br>
                <button onClick={() => this.delete_action(id)}>DELETE</button>
                <hr></hr>
              </li> */}
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
