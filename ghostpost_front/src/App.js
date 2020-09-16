import React from "react";
import "./App.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Moment from "react-moment";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts_data: [],
      choice: "BO",
      body: "",
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

  onSubmit = (e) => {
    e.preventDefault();
    // helps to give post a random id
    let randomSTR = Math.random().toString(36).substr(2, 6);
    // end
    const formData = {
      post_id: randomSTR,
      choice: this.state.choice,
      body: this.state.body,
    };
    fetch(" http://127.0.0.1:8000/posts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ body: "" });
        this.updateState();
      });
  };

  // updates state for post body
  handleBodyChange = (e) => {
    this.setState({ body: e.target.value });
    console.log(this.state.body);
  };

  // updates state for post choice
  handleChoiceChange = (e) => {
    this.setState({ choice: e.target.value });
    console.log(this.state.choice);
  };

  // grabs all posts
  all_filter = () => {
    fetch(" http://127.0.0.1:8000/posts/")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ posts_data: data });
      });
  };

  // filters posts for boasts
  boast_filter = () => {
    fetch(" http://127.0.0.1:8000/posts/boast")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ posts_data: data });
      });
  };

  // orders posts by most likes
  count_filter = () => {
    fetch(" http://127.0.0.1:8000/posts/countview")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ posts_data: data });
      });
  };

  // filters poasts for roasts
  roast_filter = () => {
    fetch(" http://127.0.0.1:8000/posts/roast")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ posts_data: data });
      });
  };

  //handles liking a post
  like_action = (id) => {
    fetch(`http://127.0.0.1:8000/posts/${id}/likeview`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.updateState();
      });
    // alert("like " + id);
  };

  //handles disliking a post
  dislike_action = (id) => {
    fetch(`http://127.0.0.1:8000/posts/${id}/dislikeview`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.updateState();
      });
    // alert("dislike " + id);
  };

  //handles deleting a post
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
          <form id="postForm" onSubmit={this.onSubmit} className="form-inline">
            <select
              name="choice"
              id="choice"
              form="postForm"
              onChange={this.handleChoiceChange}
            >
              <option value="BO">Boast</option>
              <option value="RO">Roast</option>
            </select>
            <input
              type="text"
              name="body"
              value={this.state.body}
              onChange={this.handleBodyChange}
              className="form-control"
              placeholder="add a boast or roast!"
            />
            <Button type="submit" variant="primary">
              Post!
              {/* <a style={{ color: "white" }} href="http://127.0.0.1:8000/addpost/">
              Submit a Post!
            </a> */}
            </Button>
          </form>
        </div>
        <br></br>
        <div className="filters-div">
          <Button variant="info" onClick={this.all_filter}>
            All Posts
          </Button>
          <Button variant="info" onClick={this.boast_filter}>
            All Boasts
          </Button>
          <Button variant="info" onClick={this.roast_filter}>
            All Roasts
          </Button>
          <Button variant="info" onClick={this.count_filter}>
            Order by like
          </Button>
        </div>
        <div className="card-list">
          {this.state.posts_data.map((post) => {
            let id = post.post_id;
            let choiceString = "";
            if (post.choice === "BO") {
              choiceString = "Boast!";
            } else {
              choiceString = "Roast!";
            }
            return (
              <div key={id}>
                <Card key={id} style={{ width: "600px", margin: "5px" }}>
                  <Card.Body>
                    <Card.Title>
                      {choiceString}
                      <Moment parse="YYYY-MM-DD">{post.date_time}</Moment>
                    </Card.Title>
                    <Card.Text>{post.body}</Card.Text>

                    <hr></hr>

                    <button
                      style={{ margin: "5px" }}
                      onClick={() => this.like_action(id)}
                    >
                      Like
                    </button>
                    <strong> {post.up_votes}</strong>

                    <button
                      style={{ margin: "5px" }}
                      onClick={() => this.dislike_action(id)}
                    >
                      Dislike
                    </button>
                    <strong> {post.down_votes} </strong>

                    <br></br>
                    <br></br>
                    <Button
                      variant="danger"
                      onClick={() => this.delete_action(id)}
                    >
                      DELETE
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
