import { FormEvent } from "react";
import { loginUser, registerUser } from "src/app/store/slices/userSlice";

export const auth = (
    e: FormEvent<HTMLFormElement>,
    name: string,
    email: string,
    password: string,
    isReg: boolean,
    dispatch: any
) => {
    try {
        e.preventDefault();
        if (isReg) {
            dispatch(
                registerUser({
                    name,
                    email,
                    password,
                })
            );
        } else {
            dispatch(
                loginUser({
                    name,
                    email,
                    password,
                })
            );
        }
    } catch (error) {
        console.log(error);
    }
};
