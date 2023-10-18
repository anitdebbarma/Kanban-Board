import React from "react";
import { useSelector } from "react-redux";
import { BsCircle, BsPlusLg } from "react-icons/bs";
import { BiTimeFive, BiNotepad } from 'react-icons/bi';
import "../styles/Dashboard.css";
import Card from "../components/Card";

const Dashboard = () => {
  const { dataSelected, user } = useSelector((state) => state.dataSelectSlice);

  const getIconForCategory = (category) => {
    if (category === "Todo") {
      return <BsCircle style={{ fill: "green" }} />;
    } else if (category === "InProgress") {
      return <BiTimeFive />;
    } else if (category === "Backlog") {
      return <BiNotepad style={{ fill: "red" }}/>;
    }
  };

  return (
    dataSelected && (
      <div className="container" style={{ justifyContent: "space-evenly" }}>
        {dataSelected.map((element, index) => {
          const category = element[index]?.title;

          return (
            <div key={index} className="dashboard" style={{ backgroundColor: "whitesmoke" }}>
              <div className="cardHeading1">
                <div className="sideView1" style={{ display: "flex", alignItems: "center" }}>
                  {!user ? (
                    getIconForCategory(category)
                  ) : (
                    <div className="image">
                      <img
                        src="https://img.freepik.com/free-photo/user-sign-icon-front-side-with-white-background_187299-40022.jpg?w=740&t=st=1697607535~exp=1697608135~hmac=04c9ff44fdb271025f007c7ca837a54b758187ade07e2a867e4be7dc12c39d3b"
                        alt="Avatar"
                      />
                    </div>
                  )}
                  <span>
                    {element[index]?.title} {element[index]?.value?.length}
                  </span>
                </div>
                <div className="sideView2">
                  {!user ? (
                    <div className="plus-icon-container">
                      <BsPlusLg />
                      <span style={{ marginLeft: "2px", letterSpacing: "2px" }}>...</span>
                    </div>
                  ) : (
                    <div className="icon-container">
                      {getIconForCategory(category)}
                      {category === "InProgress" && (
                        <span style={{ marginLeft: "2px" }}>
                          <BiTimeFive />
                        </span>
                      )}
                    </div>
                )}
                </div>
              </div>
              <div className="selectList">
                {element[index]?.value?.map((element, ind) => {
                  return (
                    <Card
                      id={element.id}
                      title={element.title}
                      tags={element.tag}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    )
  );
};

export { Dashboard };