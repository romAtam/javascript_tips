import React, { Fragment } from "react";
import image1 from "../../public/image1.webp";
import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import Head from "next/head";
const MeetupDetailsPage = (props) => {
  const { meetupData: data } = props;
  console.log(data);
  return (
    <Fragment>
      <Head>
        <title>{data.title}</title>
        <meta name="description" content={data.description} />
      </Head>
      <MeetupDetail
        image={data.image}
        title={data.title}
        address={data.address}
        description={data.description}
      />
    </Fragment>
  );
};
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://roman:SthofSTY4hCZnn4P@sandbox.8afmp.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();
  console.log(meetups);
  return {
    fallback: false,
    paths: meetups.map((id) => ({
      params: { meetupid: id._id.toString() },
    })),
  };
}
export async function getStaticProps(context) {
  const id = context.params.meetupid;
  const client = await MongoClient.connect(
    "mongodb+srv://roman:SthofSTY4hCZnn4P@sandbox.8afmp.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetup = await meetupsCollection.findOne({ _id: ObjectId(id) });
  return {
    props: {
      meetupData: {
        image: meetup.image,
        id,
        title: meetup.title,
        address: meetup.address,
        description: meetup.description,
      },
    },
  };
}

export default MeetupDetailsPage;
