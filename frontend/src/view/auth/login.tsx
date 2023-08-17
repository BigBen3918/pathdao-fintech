import React from "react";
import { useNavigate } from "react-router-dom";
import Action from "../../service";
import { useDispatch } from "react-redux";
import { setAuth } from "../../redux/reducers/auth";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userData, setUserData] = React.useState<UserDataSchema>({
        email: "",
        pass: "",
    });

    const handleSubmit = async () => {
        try {
            if (userData.email.trim() === "") return;
            if (userData.pass.trim() === "") return;

            const result = await Action.Login({
                email: userData.email,
                password: userData.pass,
            });
            if (result) {
                dispatch(setAuth(result));
                navigate("/dashboard");
            }
        } catch (err: any) {
            console.log(err);
        }
    };

    return (
        <div className="bg-slate-900 flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="space-y-6">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-white"
                        >
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                type="email"
                                className="block bg-slate-800 w-full rounded-md border-0 py-2 px-2 text-white shadow-sm ring-1 ring-inset ring-slate-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none"
                                value={userData.email}
                                onChange={(e: any) =>
                                    setUserData({
                                        ...userData,
                                        email: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium leading-6 text-white"
                            >
                                Password
                            </label>
                            <div className="text-sm">
                                <a
                                    href="/#"
                                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                                >
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                type="password"
                                className="block bg-slate-800 w-full rounded-md border-0 py-2 px-2 text-white shadow-sm ring-1 ring-inset ring-slate-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none"
                                value={userData.pass}
                                onChange={(e: any) =>
                                    setUserData({
                                        ...userData,
                                        pass: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={handleSubmit}
                        >
                            Sign In
                        </button>
                    </div>
                </div>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member? Please register in{" "}
                    <a
                        href="/registry"
                        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                    >
                        here
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Login;
