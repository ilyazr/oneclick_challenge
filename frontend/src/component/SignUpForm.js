import {Box, Button} from "@mui/material";
import TextField from "@mui/material/TextField";
import {useState} from "react";
import {useAuth} from "../hook/useAuth";
import {useHistory} from "react-router-dom";


const SignUpForm = ({changeComponent}) => {
    const auth = useAuth();
    const history = useHistory();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const [isFirstNameValid, setFirstNameValid] = useState(false);
    const [isLastNameValid, setLastNameValid] = useState(false);
    const [isEmailValid, setEmailValid] = useState(false);
    const [isPasswordValid, setPasswordValid] = useState(false);
    const [isUsernameValid, setUsernameValid] = useState(false);

    const validateAllFields = () => {
        let result = true;
        if (/\d/.test(username)) {
            setUsernameValid(true);
            result = false;
        } else setUsernameValid(false);
        if (/\d/.test(firstName)) {
            setFirstNameValid(true);
            result = false;
        } else setFirstNameValid(false);
        if (/\d/.test(lastName)) {
            setLastNameValid(true);
            result = false;
        } else setLastNameValid(false)
        if (!(/^([^@\s]+)@([a-zA-Z]+)\.([a-zA-Z]+)$/.test(email))) {
            setEmailValid(true);
            result = false;
        } else setEmailValid(false);
        if (password.length < 6) {
            setPasswordValid(true);
            result = false;
        } else setPasswordValid(false);
        return result;
    }

    const signUpEvent = async () => {
        if (validateAllFields()) {
            const response = await auth.signUp({firstName, lastName, email, password, username});
            if (response.ok) {
                changeComponent();
            } else {
                alert("Registration failed");
            }
        }
    }

    const isSignUpBtnDisabled = () => {
        const checkIfFieldsIsEmpty = (...fields) => {
            for (const field of fields) {
                if (!field) return true;
            }
            return false;
        }
        return checkIfFieldsIsEmpty(firstName, lastName, email, password);
    }

    return (
        <>
            <div className={"auth-form"}>
                <Box className={"auth-text-field-spacing"}>
                    <TextField
                        value={username}
                        onChange={(v) => setUsername(v.target.value)}
                        error={isUsernameValid}
                        helperText={isUsernameValid? "This field can't contain digits" : null}
                        type={"text"}
                        className={"auth-text-field"}
                        id="username"
                        label={"Username"}
                        variant="outlined"
                        size={"small"}
                    />
                </Box>
                <Box className={"auth-text-field-spacing"}>
                    <TextField
                        value={firstName}
                        onChange={(v) => setFirstName(v.target.value)}
                        error={isFirstNameValid}
                        helperText={isFirstNameValid? "This field can't contain digits" : null}
                        type={"text"}
                        className={"auth-text-field"}
                        id="fname"
                        label={"First name"}
                        variant="outlined"
                        size={"small"}
                    />
                </Box>
                <Box className={"auth-text-field-spacing"}>
                    <TextField
                        value={lastName}
                        onChange={(v) => setLastName(v.target.value)}
                        error={isLastNameValid}
                        helperText={isLastNameValid? "This field can't contain digits" : null}
                        id="lname"
                        className={"auth-text-field"}
                        label={"Last name"}
                        variant="outlined"
                        size={"small"}
                    />
                </Box>
                <Box className={"auth-text-field-spacing"}>
                    <TextField
                        value={email}
                        onChange={(v) => setEmail(v.target.value)}
                        error={isEmailValid}
                        helperText={isEmailValid? "Incorrect value" : null}
                        id="email"
                        className={"auth-text-field"}
                        label={"Email"}
                        variant="outlined"
                        size={"small"}
                    />
                </Box>
                <Box className={"auth-text-field-spacing"}>
                    <TextField
                        value={password}
                        onChange={(v) => setPassword(v.target.value)}
                        error={isPasswordValid}
                        helperText={isPasswordValid? "Password must contain more than 6 characters" : null}
                        className={"auth-text-field"}
                        type={"password"}
                        id="password"
                        label="Password"
                        variant="outlined"
                        size={"small"}
                    />
                </Box>
                <Box className={"auth-text-field-spacing"}>
                    <Button
                        disabled={isSignUpBtnDisabled()}
                        variant="contained"
                        style={{padding: "8px 0"}}
                        onClick={async () => await signUpEvent()}
                    >
                        Sign Up
                    </Button>
                </Box>
            </div>
        </>
    );
}

export default SignUpForm;
