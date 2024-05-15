import React from "react";

export const SpinnerYinYang = () => {
  return (
    <div className="absolute left-0 top-0 h-screen flex items-center justify-center w-full flex-col gap-y-4">
      <h2 className="text-xl font-semibold">Espere un momento porfavor...</h2>
      <div className="yin_yang">
        <div className="yin"></div>
        <div className="yang"></div>
      </div>
    </div>
  );
};
