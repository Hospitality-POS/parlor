import React from "react";
import "./NubaLoader.css";
function NubaLoader() {
  return (
    <div className="loader">
      <svg height="0" width="0" viewBox="0 0 100 100" className="absolute">
        <defs xmlns="http://www.w3.org/2000/svg">
          <linearGradient
            gradientUnits="userSpaceOnUse"
            y2="2"
            x2="0"
            y1="62"
            x1="0"
            id="b"
          >
            <stop stopColor="#000"></stop>
            <stop stopColor="#914F1E" offset="1.5"></stop>
          </linearGradient>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            y2="0"
            x2="0"
            y1="64"
            x1="0"
            id="c"
          >
            <stop stopColor="#000"></stop>
            <stop stopColor="#914F1E" offset="1"></stop>
            <animateTransform
              repeatCount="indefinite"
              keySplines=".42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1"
              keyTimes="0; 0.125; 0.25; 0.375; 0.5; 0.625; 0.75; 0.875; 1"
              dur="8s"
              values="0 32 32;270 32 32;270 32 32;540 32 32;540 32 32;810 32 32;810 32 32;1080 32 32;1080 32 32"
              type="rotate"
              attributeName="gradientTransform"
            ></animateTransform>
          </linearGradient>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            y2="2"
            x2="0"
            y1="62"
            x1="0"
            id="d"
          >
            <stop stopColor="#914F1E"></stop>
            <stop stopColor="#000" offset="1.5"></stop>
          </linearGradient>
        </defs>
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 100 100"
        width="100"
        height="100"
        className="inline-block"
      >
        <path
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="8"
          stroke="url(#b)"
          d="M 20,80 L 20,20 L 80,80 L 80,20"
          className="dash"
          pathLength="360"
        ></path>
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        style={{
          "--rotation-duration": "0ms",
          "--rotation-direction": "normal",
        }}
        viewBox="0 0 100 100"
        width="100"
        height="100"
        className="inline-block"
      >
        <path
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="12"
          stroke="url(#d)"
          d="M 20,20 L 20,60 A 20,20 0 0 0 60,60 L 60,20"
          className="dash"
          pathLength="360"
        ></path>
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 100 100"
        width="100"
        height="100"
        className="inline-block"
      >
        <path
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="11"
          stroke="url(#c)"
          d="M 20,20 L 20,80 L 60,80 A 20,20 0 0 0 60,50 L 20,50 L 60,50 A 20,20 0 0 0 60,20 L 20,20"
          className="spin"
          pathLength="90"
        ></path>
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        style={{
          "--rotation-duration": "0ms",
          "--rotation-direction": "normal",
        }}
        viewBox="0 0 100 100"
        width="100"
        height="100"
        className="inline-block"
      >
        <path
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="12"
          stroke="url(#d)"
          d="M 20,80 L 50,20 L 80,80 M 35,60 L 65,60"
          className="dash"
          pathLength="360"
        ></path>
      </svg>
    </div>
  );
}

export default NubaLoader;
