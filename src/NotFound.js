import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found">
      <h2>Ooops!!!</h2>
      <p>Page cannot be found.</p>
      <Link to="/">Back to HomePage</Link>
    </div>
  );
};

export default NotFound;
