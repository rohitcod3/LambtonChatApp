import React from "react";

export const Test = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="mockup-code w-[500px] ">
        <pre data-prefix="$">
          <code>npm i LambtonChatApp</code>
        </pre>
        <pre data-prefix=">" className="text-warning">
          <code>installing...</code>
        </pre>
        <pre data-prefix=">" className="text-success">
          <code>Done!</code>
        </pre>
      </div>
    </div>
  );
};
