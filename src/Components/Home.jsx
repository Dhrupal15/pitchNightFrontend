import React, { useEffect, useState } from "react";
import user from "../api/user";
import logo from "../assets/images/logo.png";
import "../Styles/Home.styles.scss";

const Home = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const response = await user.getAllUsers();
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <div className="home-card">
        <div className="row g-0">
          <div className="col-md-4">
            <img src={logo} className="img-fluid rounded-start" alt="Logo" />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h1 className="card-title mb-4">Welcome to Pitch Night</h1>
              <p className="card-text text-justify">
                Pitch night is an event that brings together faculty and
                students to share innovative ideas and collaborate. During the
                event, faculty members present their ideas, and students have
                the opportunity to learn about them and choose which projects
                they want to work on. It aims to be a centralized source of
                information accessible to students at any time, enabling them to
                explore and engage in innovative projects and ideas. Through
                Pitch night, students can connect with faculty members, access
                new ideas, and learn new skills to advance their education and
                future careers.
              </p>
              <p className="card-text">
                <small className="text-muted">
                  Click anywhere on card for more details
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
