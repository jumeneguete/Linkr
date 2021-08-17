import axios from "axios";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { Page, FieldsContainer, FormContainer } from "../components/login_signUp/Styles";
import Banner from "../components/login_signUp/Banner";
import Button from "../components/login_signUp/Button";
import Input from "../components/login_signUp/Input";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [url, setUrl] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);

    const history = useHistory();

    function SigningUp(e) {
        e.preventDefault();

        const body = { email, password, username, pictureUrl: url };

        const request = axios.post(`${process.env.REACT_APP_API_BASE_URL}/sign-up`, body);
        setIsDisabled(true);
        request.then(() => {
            history.push("/");
            setIsDisabled(false);
        });
        request.catch((resp) => {
            if (resp.response.status === 403) {
                alert("This user already exist!");
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
                <FormContainer onSubmit={SigningUp}>
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
                    <Input
                        type="username"
                        placeholder="username"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        disabled={isDisabled}
                    />
                    <Input
                        type="url"
                        placeholder="picture url"
                        onChange={(e) => setUrl(e.target.value)}
                        value={url}
                        disabled={isDisabled}
                    />
                    <Button disabled={isDisabled}>Sign Up</Button>
                </FormContainer>
                <Link to={"/"}>
                    <p>Switch back to log in</p>
                </Link>
            </FieldsContainer>
        </Page>
    );
}
