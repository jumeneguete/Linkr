import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import UserContext from "../contexts/UserContext";
import { Page, FieldsContainer, FormContainer } from "../components/login_signUp/Styles";
import Banner from "../components/login_signUp/Banner";
import Button from "../components/login_signUp/Button";
import Input from "../components/login_signUp/Input";

export default function Login() {
  const { userProfile, setUserProfile } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (userProfile) {
      history.push("/timeline");
      return;
    }
  }, [history, userProfile]);

  function SigningIn(e) {
    e.preventDefault();

    const body = { email, password };

    const request = axios.post(`${process.env.REACT_APP_API_BASE_URL}/sign-in`, body);
    setIsDisabled(true);
    request.then((response) => {
      setUserProfile(response.data);
      const loginSaved = JSON.stringify(response.data);
      localStorage.setItem("lastLogin", loginSaved);
      history.push("/timeline");
      setIsDisabled(false);
    });
    request.catch((resp) => {
      if (resp.response.status === 403) {
        alert("Invalid email or password!");
      } else {
        alert("Fill all field correctly!");
      }
      setIsDisabled(false);
    });
  }

  return (
    <Page>
      <Banner />
      <FieldsContainer>
        <FormContainer onSubmit={SigningIn}>
          <Input
            type="email"
            placeholder="e-mail"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            disabled={isDisabled}
          />
          <Input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            disabled={isDisabled}
          />
          <Button disabled={isDisabled}>Sign Up</Button>
        </FormContainer>
        <Link to={"/sign-up"}>
          <p>First time? Create an account!</p>
        </Link>
      </FieldsContainer>
    </Page>
  );
}
