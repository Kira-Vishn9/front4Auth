import styles from './style.module.css'
import {Box, TextField, Button} from "../../muiLibrary";
import * as Links from 'react-router-dom'
import {SubmitHandler, useForm} from "react-hook-form";
import React from "react";
import {authContext} from "../../context/authContext.ts";
import {handleLogIn} from "../../service";

type Inputs ={
    mail: string,
    password: string,
};
const SignIn = () => {
    const { register, handleSubmit} = useForm<Inputs>();
    const { setAuth } = React.useContext(authContext)
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
      const req = await handleLogIn(data);
      if(req === 200) {
          setAuth(true)
      }
    }

    return(
        <div className={styles.wrap}>
            <h2>
                Sign In
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
                <TextField id="standard-basic" label="Password" variant="standard" {...register("password")} />
                <span className={styles.strSign}>
                    <pre>
                        If you haven't account_
                        <Links.Link to="/signup">
                              Sign Up
                        </Links.Link>
                    </pre>
                </span>
                    <Button type="submit" variant="outlined" color='primary'>
                        Enter
                    </Button>
            </Box>
        </div>
    )
}

export default SignIn;