import styles from "../SignIn/style.module.css";
import {Box, Button, TextField} from "../../muiLibrary";
import * as Links from 'react-router-dom'
import { useForm, SubmitHandler } from "react-hook-form";
import { handleRegistration } from "../../service";
import React from "react";
import { authContext } from "../../context/authContext.ts";

type Inputs ={
    mail: string,
    password: string,
};
const SignUp = () => {
    const { register, handleSubmit } = useForm<Inputs>();
    const { setAuth } = React.useContext(authContext)
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
       await handleRegistration(data);
       setAuth(true);
    }

    return(
            <div className={styles.wrap}>
                <h2>
                    Sign Up
                </h2>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch', mt: 3, display: 'flex' },
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <TextField id="standard-basic" label="Email" variant="standard" {...register("mail", { required: true, pattern: /^\S+@\S+$/i })} />
                    <TextField id="standard-basic" label="Password" variant="standard" {...register("password",{required: true, pattern: /\w+/})} />
                    <span className={styles.strSign}>
                        <pre>
                            If you have account_
                            <Links.Link to="/signin">
                                 Sign In
                            </Links.Link>
                        </pre>
                    </span>
                    <Button
                        type="submit"
                        variant="outlined" color='primary'>
                        Enter
                    </Button>
                </Box>
        </div>
    )
}

export default SignUp