import logo from "../logo.svg";
import mainImage from "../assets/main-page.PNG";
import "./main.css";
import { Button, Typography } from "antd";
import { useAuth0 } from "@auth0/auth0-react";
const { Title } = Typography;

export const Main = ({ setGetStarted }) => {
  const { loginWithRedirect } = useAuth0();
  return (
    <div className="main">
      <div className="header">
        <img src={logo} className="App-logo" alt="logo" />
        <Button
          onClick={() => loginWithRedirect()}
          size="large"
          style={{ margin: "1%" }}
          className="header-button"
        >
          Sign In
        </Button>
      </div>
      <div className="body">
        <div style={{ flex: "65%" }}>
          <div className="body-left">
            <Title level={1} style={{ color: "white", fontSize: "500%" }}>
              Stock Market Monitor
            </Title>
            <Title
              level={4}
              style={{ color: "white", fontSize: "250%", marginTop: "auto" }}
            >
              The Easiest way to monitor Stock Market
            </Title>
            <Button
              onClick={() => setGetStarted(true)}
              type="primary"
              size="large"
              className="enter-button"
            >
              Get Started
            </Button>
          </div>
        </div>
        <div style={{ flex: "35%" }}>
          <img src={mainImage} alt="main_logo" />
        </div>
      </div>
    </div>
  );
};
