import axios from "axios";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import Banner from "./Banner"
import Button from "./Button";
import Input from "./Input";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    function SigningUp (e){
        e.preventDefault();

        const body = {email, password, username, pictureUrl: url }

        const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/sign-up", body);
        setLoading(true);
        request.then(() => {
            history.push("/");
            setLoading(false);
        });
        request.catch((resp) => {
            if (resp.response.status === 403){
                alert("Este usuário já é cadastrado No Linkr!")
            } else {
                alert("Preencha os campos corretamente!")
            }
            setLoading(false);
        })
    }

    return(
        <Container>
            <Banner />
            <Fields>
                <form onSubmit={SigningUp}>
                    <Input type="email" placeholder="e-mail" onChange={(e)=> setEmail(e.target.value)} value={email} disabled={loading ? true : false} />
                    <Input type="password" placeholder="password" onChange={(e)=> setPassword(e.target.value)} value={password} disabled={loading ? true : false}  />
                    <Input type="username" placeholder="username" onChange={(e)=> setUsername(e.target.value)} value={username} disabled={loading ? true : false}  />
                    <Input type="url" placeholder="picture url" onChange={(e)=> setUrl(e.target.value)} value={url} disabled={loading ? true : false}  />
                    <Button  disabled={loading ? true : false} >Sign Up</Button>
                </form>
                <Link to={"/"}><p>Switch back to log in</p></Link>
            </Fields>
        </Container>
    );
}

const Container = styled.div`
    height: 100vh;
    display: flex;

    @media (max-width: 600px) {
        width: 100%;
        flex-direction: column;
    }
`;

const Fields = styled.div`
    width: 35%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (max-width: 600px) {
        width: 100%;
        margin: 20px auto 0 auto;
    }

    form {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    p{
        font-size: 15px;
        font-family: "Lato", sans-serif;
        color: #fff;
        letter-spacing: 1px;
        text-decoration: underline;
        margin-top: 5px;
    }

    p:hover {
        color: rgba(250, 250, 250, 0.8)
    }

    @media (max-width: 600px) {
        p{
            margin-top: 13px;
        }
    }
`;

