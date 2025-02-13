import React, { useState } from 'react';
import authService from '../Appwrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input, Logo } from './index';
import { login } from '../store/authSlice';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

function Signup() {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    const create = async (data) => {

        setError('');
        console.log('Account creation button clicked successfully');
        console.log('Data is:', data);

        try {
            const userData = await authService.CreateAccount(data);
            console.log('userData:', userData);

            if (userData) {
                const useData = await authService.getCurrentUser();
                if (useData) dispatch(login(useData));
                // dispatch(login(userData));
                navigate('/');
            }
            else {
                console.log("user data not found");

            }
        } catch (error) {
            console.log('Error generated in the program');
            setError(error.message);
        }
    };


    return (
        <div className="flex items-center justify-center">
            <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">
                    Sign up to create account
                </h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(create)}>
                    <div className="space-y-5">
                        <Input
                            label="Full Name:"
                            placeholder="Enter your full Name"
                            {...register('name', {
                                required: true,
                            })}
                        />
                        <Input
                            label="Email:"
                            placeholder="Enter Your Email"
                            type="email"
                            {...register('email', {
                                required: true,
                                validate: {
                                    matchPattern: (value) =>
                                       /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/igm.test(value) || "Invalid Email"
                                },
                            })}
                        />
                        <Input
                            label="Password:"
                            type="password"
                            placeholder="Enter Password"
                            {...register('password', {
                                required: true,
                            })}
                        />
                        <Button type="submit" className="w-full">
                            Create Account
                        </Button>

                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
