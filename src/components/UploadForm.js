import Head from "next/head";
import { useMoralis, useMoralisFile, useRaribleLazyMint } from "react-moralis";
import { useState } from "react";
import { ERROR_MESSAGES } from "../utils/constants";
import Moralis from "moralis";
import Loader from "./Loader";

const UploadForm = () => {
  const { logout, isLoggingOut, user } = useMoralis();
  const { isUploading, saveFile } = useMoralisFile();

  const defaultParams = {
    chain: "rinkeby",
    userAddress: user.get("ethAddress"),
    tokenType: "ERC1155",
    supply: 1,
    royaltiesAmount: 10,
  };
  const { lazyMint, isLoading } = useRaribleLazyMint(defaultParams);

  const [formField, setFormField] = useState({
    nftName: "",
    description: "",
    nftFile: "",
  });

  const [errors, setErrors] = useState({
    nftName: "",
    description: "",
    nftFile: null,
  });

  const resetFormField = () => {
    setFormField({
      nftName: "",
      description: "",
      nftFile: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nftFile = e.target.files ? e.target.files[0] : null;

    if (nftFile) {
      setFormField((prevState) => ({ ...prevState, [name]: nftFile }));
    } else {
      setFormField((prevState) => ({ ...prevState, [name]: value }));
    }
    if (value === "") {
      setErrors((prevState) => ({
        ...prevState,
        [name]: ERROR_MESSAGES[name],
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        [name]: "",
      }));
    }
  };

  const isFormValidated = () => {
    let validated = true;
    const newErrors = {};
    Object.keys(formField).map((key) => {
      if (formField[key] === "") {
        newErrors[key] = ERROR_MESSAGES[key];
        validated = false;
      } else {
        newErrors[key] = "";
      }
    });
    setErrors(newErrors);
    return validated;
  };

  const uploadFile = async () => {
    await saveFile(formField.nftName, formField.nftFile, {
      saveIPFS: true,
      onError: (error) => {
        console.log("===> onError: ", error);
      },
      onSuccess: async (file) => {
        const metadata = {
          name: formField.nftName,
          description: formField.description,
          image: `/ipfs/${file._hash}`,
        };

        await saveFile(
          `metadata ${metadata.name}`,
          {
            base64: btoa(JSON.stringify(metadata)),
          },
          {
            saveIPFS: true,
            onError: (_error) => {
              console.log("---> _error : ", _error);
            },
            onSuccess: async (metadataFile) => {
              await Moralis.enableWeb3();
              await lazyMint({
                params: {
                  tokenUri: `/ipfs/${metadataFile._hash}`,
                },
                onError: (lazyMintError) => {
                  console.log(
                    "===> error while lazyMint: ",
                    lazyMintError.message
                  );
                },
                onSuccess: (res) => {
                  resetFormField();
                },
              });
            },
          }
        );
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValidated()) {
      uploadFile();
    } else {
      console.log("===> Please fill all the required details...");
    }
  };

  return (
    <>
      <Head>
        <title>NFT Minter</title>
      </Head>
      <div className="h-auto flex justify-end items-center">
        <button
          type="button"
          className="mt-6 mr-10 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => logout()}
          disabled={isLoggingOut}
        >
          Logout
        </button>
      </div>
      <div className="flex items-center justify-center overflow-y-hidden">
        <div className="w-2/3 max-w-screen mt-6">
          <form method="post" onSubmit={handleSubmit}>
            <div className="relative shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6 ">
                {(isUploading || isLoading) && (
                  <div className="absolute top-0 right-0 bottom-0 left-0  flex-full-center bg-black/70 z-40">
                    <Loader
                      type="oval"
                      className="w-40 text-center flex-full-center flex-column"
                    >
                      <p className="text-white">Uploading....</p>
                    </Loader>
                  </div>
                )}
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-2">
                    <label
                      htmlFor="nftName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      NFT Name <span className="text-red-700">*</span>
                    </label>
                    <div className="mt-1  rounded-md">
                      <input
                        type="text"
                        name="nftName"
                        id="nftName"
                        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300  shadow-sm"
                        placeholder="nft name"
                        value={formField.nftName}
                        onChange={handleChange}
                        autoComplete="off"
                      />
                      <small className="text-red-700">{errors.nftName}</small>
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description <span className="text-red-700">*</span>
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                      placeholder="The only NFT you need to have in your wallet"
                      value={formField.description}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                    <small className="text-red-700">{errors.description}</small>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Brief description of the NFT.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    NFT file <span className="text-red-700">*</span>
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      {formField.nftFile &&
                      typeof formField.nftFile === "object" ? (
                        <img
                          src={URL.createObjectURL(formField.nftFile)}
                          alt="nft file"
                          className="w-40  mb-5"
                        />
                      ) : (
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}

                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="nftFile"
                          className="relative cursor-pointer mx-auto bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span>Upload your NFT</span>
                          <input
                            id="nftFile"
                            name="nftFile"
                            type="file"
                            className="sr-only"
                            onChange={handleChange}
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF...</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  disabled={isUploading || isLoading}
                >
                  Lazy-Mint now!
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UploadForm;
