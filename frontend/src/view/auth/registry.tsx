import React from "react";
import { useConnectWallet } from "@web3-onboard/react";
import { ethers } from "ethers";
import Action from "../../service";

function Registry() {
    const [{ wallet, connecting }, connect] = useConnectWallet();
    const [account, setAccount] = React.useState<AccountSchema | null>(null);
    const [ethersProvider, setProvider] =
        React.useState<ethers.providers.Web3Provider | null>();
    const [userData, setUserData] = React.useState<UserDataSchema>({
        email: "",
        pass: "",
    });

    React.useEffect(() => {
        if (wallet?.provider) {
            const { name, avatar } = wallet?.accounts[0].ens ?? {};

            setAccount({
                address: wallet.accounts[0].address,
                balance: wallet.accounts[0].balance,
                ens: { name, avatar: avatar?.url },
            });

            setProvider(
                new ethers.providers.Web3Provider(wallet.provider, "any")
            );
        } else {
            setAccount(null);
        }
    }, [wallet]);

    const handleSubmit = async () => {
        try {
            if (userData.email.trim() === "") return;
            if (userData.pass.trim() === "") return;
            if (!account) return;

            const signer: any = ethersProvider?.getSigner();
            const signature = await signer.signMessage(
                String(process.env.REACT_APP_SIGNMSG)
            );

            const result = await Action.Registry({
                email: userData.email,
                password: userData.pass,
                signature: signature,
            });
            if (result) window.alert("Registry Success!");
        } catch (err: any) {
            console.log(err);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                    Sign up to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="space-y-6">
                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium leading-6 text-white"
                            >
                                Address
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                type="button"
                                name="password"
                                className="block bg-slate-800 w-full rounded-md border-0 py-2 px-2 text-white shadow-sm ring-1 ring-inset ring-slate-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none cursor-pointer text-left"
                                value={account?.address}
                                disabled={connecting}
                                onClick={() => connect()}
                            />
                        </div>
                    </div>

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
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={handleSubmit}
                        >
                            Sign Up
                        </button>
                    </div>
                </div>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Already has account? Login in{" "}
                    <a
                        href="/login"
                        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                    >
                        here
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Registry;
