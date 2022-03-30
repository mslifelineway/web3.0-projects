import { BallTriangle, Oval } from "react-loader-spinner";

const Loader = ({ type, color, width, height, children, className }) => {
  const props = {
    color: color || "#ff5e00",
    height: height || 80,
    width: width || 80,
  };

  return (() => {
    switch (type) {
      case "oval":
        return (
          <div className={`loader ${className}`}>
            <Oval {...props} />
            {children && <div className="loader__contents">{children}</div>}
          </div>
        );
      default:
        return (
          <div
            className={`loader loader full__screen flex-full-center ${className}`}
          >
            <BallTriangle {...props} />
            {children && <div className="loader__contents">{children}</div>}
          </div>
        ); //full screen loader
    }
  })();
};

export default Loader;
