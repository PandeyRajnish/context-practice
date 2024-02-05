import Profile from "./components/forms/Profile";
import "./App.css";
import { Card } from "antd";

export default function App() {
  return (
    <main>
      <div className="container">
        <Card className="card">
          <h1 className="heading">Edit User Profile</h1>
          <Profile />
        </Card>
      </div>
    </main>
  );
}
