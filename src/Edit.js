import { useEffect, useState } from "react";
import useFetch from "./useFetch";
import { useParams, useHistory } from "react-router-dom";

const Edit = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("mario");
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();
  const { id } = useParams();
  const {
    data: blog,
    error,
    isPending: fetchIsPending,
  } = useFetch("http://localhost:8000/blogs/" + id);

  useEffect(() => {
    if (!fetchIsPending && blog) {
      setTitle(blog.title);
      setAuthor(blog.author);
      setBody(blog.body);
    }
  }, [blog]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const blogUpdated = { title, body, author };

    setIsPending(true);

    fetch("http://localhost:8000/blogs/" + blog.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blogUpdated),
    }).then(() => {
      setIsPending(false);
      history.push("/");
    });
  };

  return (
    <div className="create">
      <h2>Edit a Blog Post</h2>
      {fetchIsPending && <div>Loading.....</div>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Blog Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          required
        />
        <label htmlFor="">Blog body:</label>
        <textarea
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
          required
        ></textarea>
        <label htmlFor="">Blog Author:</label>
        <select
          value={author}
          onChange={(e) => {
            setAuthor(e.target.value);
          }}
        >
          <option value="mario">Mario</option>
          <option value="youshi">Youshi</option>
        </select>
        {!isPending && <button>Update Blog</button>}
        {isPending && <button disabled>Updating Blog......</button>}
      </form>
    </div>
  );
};

export default Edit;
