import * as React from "react";
import Head from "../../components/Head";
import GameCard from "../../components/GameCard";

interface IHomeProps {}

const Home: React.FunctionComponent<IHomeProps> = () => {
  return (
    <div>
      <Head />
      <GameCard />
    </div>
  );
};

export default Home;
