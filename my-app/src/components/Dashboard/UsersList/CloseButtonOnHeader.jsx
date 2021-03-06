import React from 'react';

// eslint-disable-next-line react/prop-types
export const CloseButtonOnHeader = ({ func }) => {
  return (
    <svg
      width="85"
      height="55"
      viewBox="0 0 85 55"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        clipPath="url(#clip0)"
        onClick={() => func()}
        className="close-button-form"
      >
        <g filter="url(#filter0_i)">
          <rect
            x="62.3804"
            y="-49"
            width="124.857"
            height="186.203"
            transform="rotate(30 62.3804 -49)"
            fill="#3C8291"
          />
        </g>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M48.6112 22.3149C48.2533 21.9569 47.6729 21.9569 47.3149 22.3149C46.9569 22.6729 46.9569 23.2533 47.3149 23.6112L52.9887 29.285L47.6 34.6737C47.2421 35.0317 47.2421 35.6121 47.6 35.97C47.958 36.328 48.5384 36.328 48.8964 35.97L54.285 30.5814L59.6737 35.97C60.0317 36.328 60.6121 36.328 60.97 35.97C61.328 35.6121 61.328 35.0317 60.97 34.6737L55.5814 29.285L61.2552 23.6112C61.6132 23.2533 61.6132 22.6729 61.2552 22.3149C60.8972 21.9569 60.3168 21.9569 59.9589 22.3149L54.285 27.9887L48.6112 22.3149Z"
          fill="#F2F2F2"
        />
      </g>
      <defs>
        <filter
          id="filter0_i"
          x="-30.7212"
          y="-49"
          width="201.231"
          height="227.685"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
          />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
        </filter>
        <clipPath id="clip0">
          <rect
            width="85"
            height="59"
            fill="white"
            transform="translate(0 -2)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
