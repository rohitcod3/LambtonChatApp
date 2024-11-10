import Lottie from "react-lottie";
import animationData from "../assets/lottie-json.json";

const animationDefaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
};

export const Logo1 = () => {
  return (
    <div className="flex-1 md:bg-[#1c1d25] md:flex flex-col justify-center items-center hidden duration-1000 transition-all ">
      <Lottie
        isClickToPauseDisabled={true}
        height={200}
        options={animationDefaultOptions}
      />
      <div className="text-opacity-80 text-white flex flex-row gap-5 items-center mt-10 lg:text-4xl text-3xl transition-all duration-300 text-center">
        <h3 className="poppins-medium">
          Hi <span className="text-purple-500">!</span>
        </h3>
        Welcome to<span className="text-purple-500">Lambton College </span>Chat
        App<span className="text-purple-500">.</span>
      </div>
    </div>
  );
};
