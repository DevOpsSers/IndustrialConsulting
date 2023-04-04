"use client";

import Script from "next/script";
import { useEffect } from "react";

export default function ReadingForm() {
  const handleUpload = () => {
    console.log("click");
    console.log(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
    // console.log(process.env.NEXT_PUBLIC_CLOUDINARY_PRESET)
    if (
      !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
      !process.env.NEXT_PUBLIC_CLOUDINARY_PRESET
    ) {
      console.error(
        `Please set the env const of the cloudinary to use the upload widget`
      );
      return false;
    }

    // @ts-ignore
    const imageWidget = cloudinary.createUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_PRESET,
        sources: ["local","camera"],
        styles: {
          palette: {
            window: "#708661",
            sourceBg: "#292222",
            windowBorder: "#c7a49f",
            tabIcon: "#573A1D",
            inactiveTabIcon: "#E8D5BB",
            menuIcons: "#615033",
            link: "#BCAA84",
            action: "#99E15B",
            inProgress: "#99cccc",
            complete: "#78b3b4",
            error: "#8F4F4F",
            textDark: "#82644E",
            textLight: "#D8CFCF"
          }
        },
        fonts: {
          default: null,
          "'Fira Sans', sans-serif": {
            url: "https://fonts.googleapis.com/css?family=Fira+Sans",
            active: true
        }
        }
      },
      (error:any, result: any) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
        }
      }
    );

    imageWidget.open();
  };

  return (
    <div className="bg-gradient-to-tl from-lime-100 to-green-200 w-screen h-screen">
      <Script
        src="https://upload-widget.cloudinary.com/global/all.js"
        type="text/javascript"
      ></Script>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
          <div className="rounded-lg bg-zinc-50	 p-8 shadow-lg lg:col-span-3 lg:p-12">
            <h2 className="text-2xl font-bold text-black pb-5 ">
              Add a new reading
            </h2>
            <form action="" className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="font-bold">Energy Quantity</label>
                  <input
                    className="w-full rounded-lg border-stone-500 p-3 text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="Reading"
                    type="number"
                    id="reading"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
                {/**add new stuff to keep the responsive desing of the page, just copy this div under or above but insideof the div */}
              </div>
              <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
                <a
                  //type="button"
                  className="inline-block w-full rounded-lg bg-green-800 px-5 py-3  text-white sm:w-auto drop-shadow-2xl cursor-pointer font-bold"
                  onClick={handleUpload}
                >
                  Add photo
                </a>
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                >
                  Add reading
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
