import React from "react";

// The components
import AppNavBar from "./AppNavBar";
import Banner from "./TestBanner";

// import Watching from "./Watching";
import Recommendations from "./Recommendations";
import Movies from "./Movies";
import SubscribeLayout from "./SubscribeLayout";
import Footer from "./Footer";

function Home() {
  return (
    <div>
      <AppNavBar />
      <Banner />
      {/* <Watching /> */}
      <Recommendations />
      <Movies />
      <SubscribeLayout />
      <Footer />
    </div>
  );
}

export default Home;