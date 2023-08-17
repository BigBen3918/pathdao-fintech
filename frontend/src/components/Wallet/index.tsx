import React from "react";
import { Web3OnboardProvider, init } from "@web3-onboard/react";
import injectedModule from "@web3-onboard/injected-wallets";
import walletConnectModule from "@web3-onboard/walletconnect";
import coinbaseModule from "@web3-onboard/coinbase";
import trustModule from "@web3-onboard/trust";

const wcV2InitOptions = {
    /**
     * Project ID associated with [WalletConnect account](https://cloud.walletconnect.com)
     */
    projectId: "faf641330f6b3ce2811bb5eb411267df",
    /**
     * Chains required to be supported by all wallets connecting to your DApp
     */
    requiredChains: [1, 5, 56, 4002],
    /**
     * Defaults to `appMetadata.explore` that is supplied to the web3-onboard init
     * Strongly recommended to provide atleast one URL as it is required by some wallets (i.e. MetaMask)
     * To connect with WalletConnect
     */
    dappUrl: "http://MyAwesomeDapp.com",
};

const injected = injectedModule();
const walletConnect = walletConnectModule(wcV2InitOptions);
const coinbase = coinbaseModule({ darkMode: true });
const trust = trustModule();

const INFURA_KEY = "1886ff3d0a1143689424a8341cb75c66";

function WalletProvider({ children }: any) {
    const wallets: any = [injected, trust, coinbase, walletConnect];
    const chains: any = [
        {
            id: "0x1",
            token: "ETH",
            label: "Ethereum Mainnet",
            rpcUrl: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
        },
        {
            id: "0x5",
            token: "ETH",
            label: "Goerli",
            rpcUrl: `https://goerli.infura.io/v3/${INFURA_KEY}`,
        },
        {
            id: "0x38",
            token: "BNB",
            label: "Binance",
            rpcUrl: "https://bsc-dataseed.binance.org/",
        },
        {
            id: "0xfa2",
            token: "FTM",
            label: "Fantom TestNet",
            rpcUrl: "https://bsc-dataseed.binance.org/",
        },
    ];

    const appMetadata: any = {
        name: "Wallet Connect",
        description: "PathDao Wallet Connect Provider",
        recommendedInjectedWallets: [
            { name: "MetaMask", url: "https://metamask.io" },
            { name: "Coinbase", url: "https://wallet.coinbase.com/" },
        ],
    };

    const web3Onboard: any = init({
        wallets,
        chains,
        appMetadata,
    });

    return (
        <Web3OnboardProvider web3Onboard={web3Onboard}>
            {children}
        </Web3OnboardProvider>
    );
}

export default WalletProvider;
