import React, { useState } from 'react'
import { TailSpin } from 'react-loader-spinner';

export let loaderSetter = () => null;

function Loader() {
  const [loading, setLoading] = useState(false);
  loaderSetter = setLoading;

  return (
    <div>
      {
        loading &&
        <div className="z-[100] w-screen h-screen bg-gray-200 absolute top-0 left-0 flex justify-center items-center opacity-70">
          <TailSpin
            visible={loading}
            height="30"
            width="30"
            color="var(--luminous-green)"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      }
    </div>
  )
}

export default Loader;
