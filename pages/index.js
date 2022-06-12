import React, { Fragment } from "react";
import image1 from "../public/image2.jpeg";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import Head from "next/head";

const HomePage = (props) => {
  console.log(props.meetups);
  return (
    <Fragment>
      <Head>
        <title>javascript</title>
        <meta name="description" content="школа программирования Борисполь" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};
export async function getStaticProps(context) {
  const client = await MongoClient.connect(
    "mongodb+srv://roman:A5777qwerty@sandbox.8afmp.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = (await meetupsCollection.find().toArray()).map((item) => {
    return {
      title: item.title,
      description: item.description,
      address: item.address,
      image: item.image,
      id: item._id.toString(),
    };
  });
  client.close();
  return {
    revalidate: 1,
    props: {
      meetups: meetups,
    },
  };
}

export default HomePage;
