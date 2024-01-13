import React from "react";
import Countdown from "react-countdown";

function Home(props) {
  const { startCountdown, SetStartCountdown } = props;


  const handleCountdownComplete = () => {

    setTimeout(() => {
      
      SetStartCountdown(false);
    }, 3000); 

  return (<span>Key Expired</span>);
  };




  return (
    <div className="flex flex-col items-center mt-5 mb-5">
      <h1 className="border border-red-300 p-2 mt-10">
        The Leaky Bucket Graphic View
      </h1>

      {startCountdown && (
        <Countdown className="fixed" date={Date.now() + 2400000 }  onComplete={handleCountdownComplete}>
        </Countdown>
      )
      }
    </div>
  );
}

export default Home;
