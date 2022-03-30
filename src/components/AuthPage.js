import { LockClosedIcon } from "@heroicons/react/solid";
import Head from "next/head";
import { useMoralis } from "react-moralis";
import { MESSAGES } from "../utils/constants";

const AuthPage = () => {
  const { authenticate, isAuthenticating } = useMoralis();

  const metamaskAuthentication = async () => {
    try {
      await authenticate({
        signingMessage: MESSAGES.METAMASK_AUTH_MESSAGE,
      });
    } catch (error) {
      console.log("===> Error", error);
    }
  };

  return (
    <>
      <Head>
        <title>Auth | NFT Minter</title>
      </Head>
      <div className="h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md h-2/3 w-full space-y-8 text-center">
          <img className="mx-auto h-12 w-auto" src="/nft.png" alt="Workflow" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-600">
            Mint your NFTs Now for FREE
          </h2>
          <button
            type="button"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={metamaskAuthentication}
            disabled={isAuthenticating}
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockClosedIcon
                className="h-5 w-5 text-gray-300 group-hover:text-gray-400"
                aria-hidden="true"
              />
            </span>
            Auth with Metamask
          </button>
        </div>
      </div>
    </>
  );
};
export default AuthPage;
