/*
============================================================
LottieAnimation Component (Front-end Guide & Back-end Follow Through)
============================================================

Front-end Guide:
- This file implements the Lottie animation for the Hero section.
- Uses the @lottiefiles/dotlottie-react package for rendering.
- To update the animation, change the src URL or props in the DotLottieReact component.
- To change layout or styling, edit the JSX in the LottieAnimation component.

Back-end Follow Through:
- If dynamic animation sources are needed, replace the src with a prop or API call.
- For user-personalized animations, connect to user or marketing APIs.
- Ensure any new data fields from the back-end are mapped to the UI components here.

Integration Notes:
- The LottieAnimation can be reused or extended for other animated sections.
- For additional integration, see README or API documentation.
*/
'use client';

import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const LottieAnimation = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-[400px] h-[400px] bg-white rounded-full flex items-center justify-center shadow-xl">
        <div className="w-[350px] h-[350px]">
          <DotLottieReact
            src="https://lottie.host/ecd645dc-c675-409c-8675-eb0026024169/l7ES55KDyj.lottie"
            loop
            autoplay
          />
        </div>
      </div>
    </div>
  );
};

export default LottieAnimation; 