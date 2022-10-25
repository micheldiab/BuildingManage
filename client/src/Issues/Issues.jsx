import React, { useState, useEffect } from "react";
import "./Issues.css";
import LeftSide from "../components/LeftSide/LeftSide.jsx";
import RightSide from "../components/rightSide/RightSide.jsx";
import Navbar from "../components/Navbar/Navbar";
import IssuesCard from "../components/IssuesCard/IssuesCard";
import AddIssue from "../components/AddIssue/AddIssue";
import Axios from "axios";

const Issues = () => {
  const [issueList, setIssueList] = useState([]);

  const getIssues = () => {
    Axios.get("http://localhost:3001/getIssues").then((response) => {
      setIssueList(response.data);
    });
  };
  useEffect(() => {
    Axios.get("http://localhost:3001/getIssues").then((response) => {
      setIssueList(response.data);
    });
  }, []);

  const addIssue = (category, desc, date) => {
    Axios.post("http://localhost:3001/addIssue", {
      category: category,
      desc: desc,
      date: date,
    });
    getIssues();
  };
  return (
    <div className="home-container">
      <LeftSide />
      <Navbar title={"Issues"} desc={"All Issues"} />
      <RightSide />
      <div className="IssuesCard-content">
        <div className="AllIssues">
          {issueList.map((data, id) => {
            return (
              <IssuesCard
                key={id}
                category={data.category}
                desc={data.desc}
                date={data.date}
              />
            );
          })}
        </div>

        <AddIssue addIssuehandler={addIssue} />
      </div>
    </div>
  );
};

export default Issues;