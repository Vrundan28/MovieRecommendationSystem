import React, { useContext } from "react";
import NavigationBar from "../NavigationBar/NavigationBar";
import { Context } from "../../context/Context";
import "./AdminPanel.css";
import GenderChart from "./GenderChart";
const AdminPanel = () => {
  const { user, dispatch } = useContext(Context);
  return (
    <>
      <NavigationBar />
      <div className="admin_container">
        <div className="admin_info_container">
          <div className="admin_greeting">
            Welcome Administrator {user.username}{" "}
          </div>
          <div className="AdminPanel_analytics">
            <GenderChart />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
