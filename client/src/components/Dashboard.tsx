import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Dashboard content</p>
      <div className="fixed-action-btn">
        <Link to="/surveys/new" className="btn-floating btn-large red">
          {/* the content of the i-tag below determines the icon */}
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
