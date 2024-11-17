import Lottie from "react-lottie";
import animationData from "../assets/lottie-json.json";

const animationDefaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
};

export const Logo1 = () => {
  return (
    <div className=" flex md:flex flex-col justify-center items-center duration-1000 transition-all w-full h-full max-w-[1200px]  max-h-[400px] overflow-hidden p-2  ">
      <div className="w-[150px] h-[165px] sm:w-[200px] sm:h-[200px]">
        <Lottie
          isClickToPauseDisabled={true}
          height={200}
          options={animationDefaultOptions}
        />
      </div>
      <div className="text-opacity-80 text-white flex flex-row  items-center mt-10 lg:text-4xl text-3xl transition-all duration-300 text-center ">
        <div className="gap-5  sm:flex sm:flex-row sm:gap-2 ">
          <h3 className="poppins-medium max-w-full ">
            Hi <span className="text-purple-500">!</span>
          </h3>
          Welcome to
          <span className="text-purple-500"> Lambton College </span>
          Chat App<span className="text-purple-500">.</span>
        </div>
      </div>
    </div>
  );
};
