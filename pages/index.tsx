import { FC } from "react";
import Layout from "../components/layout/layout";

import utilStyles from "../styles/utils.module.scss";

export const Home: FC = () => {
  return (
    <Layout home>
      <section className={utilStyles.headingMd}>
      <p>You thought it was a test website, but it was me, <b>Dio</b>!</p>
      <p>
        Dio Brando is a fictional character appearing in JoJo's Bizarre
        Adventure, a Japanese manga series written and illustrated by Hirohiko
        Araki. He is the main antagonist of the series' first part, Phantom
        Blood, appearing in the debut chapter "Dio the Invader"
      </p>
      </section>
    </Layout>
  );
};

export default Home;
