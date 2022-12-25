import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { OptionsModel } from "../models/OptionsModel";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push(`/game/${uuidv4()}`);
  }, [router]);

  const options = new OptionsModel(8);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
}
