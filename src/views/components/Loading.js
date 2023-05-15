import './Loading.css';
import React from "react";
import ReactLoading from "react-loading";
  
export default function Loading() {
  return (
    <div>
      <ReactLoading className="loading-container"
        type="spinningBubbles"
        color="#111827"
        height={100}
        width={50}
      />
    </div>
  );
}