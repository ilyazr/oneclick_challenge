import {Box, Button} from "@mui/material";
import TextField from "@mui/material/TextField";
import {useHistory} from "react-router-dom";
import {useState} from "react";
import {useAuthContext} from "../hook/useAuth";

const SignInForm = () => {
    const { login } = useAuthContext();
    const history = useHistory();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const signInEvent = async () => {
        try {
            const response = await login({username, password});
            history.push("/main");
        } catch (err) {
            alert("Authentication error!");
        }
    }

    return (
        <>
            <div className={"auth-form"}>
                <Box className={"auth-text-field-spacing"}>
                    <TextField
                        className={"auth-text-field"}
                        id="outlined-basic"
                        label={"Username"}
                        variant="outlined"
                        size={"small"}
                        value={username}
                        onChange={(v) => setUsername(v.target.value)}
                    />
                </Box>
                <Box className={"auth-text-field-spacing"}>
                    <TextField
                        className={"auth-text-field"}
                        type={"password"}
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                        size={"small"}
                        value={password}
                        onChange={(v) => setPassword(v.target.value)}
                    />
                </Box>
                <Box className={"auth-text-field-spacing"}>
                    <Button
                        variant="contained"
                        disabled={username === "" && password === ""}
                        onClick={async () => await signInEvent()}
                    >
                        Sign In
                    </Button>
                </Box>
            </div>
        </>
    );
}

export default SignInForm;
