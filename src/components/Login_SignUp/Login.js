import axios from "axios";
import { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import UserContext from '../../contexts/UserContext';
import {Container, Fields } from "./Styles"
import Banner from "./Banner"
import Button from "./Button";
import Input from "./Input";

export default function Login() {

    const { setUserProfile } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    function SigningUp (e){
        e.preventDefault();

        const body = {email, password}

        const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/sign-in", body);
        setLoading(true);
        request.then((response) => {
            setUserProfile(response.data)
            history.push("/timeline");
            setLoading(false);
        });
        request.catch((resp) => {
            if (resp.response.status === 403){
                alert("Usuário ou senha incorretos!")
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
                    <Button  disabled={loading ? true : false} >Sign Up</Button>
                </form>
                <Link to={"/sign-up"}><p>First time? Create an account!</p></Link>
            </Fields>
        </Container>
    );
}