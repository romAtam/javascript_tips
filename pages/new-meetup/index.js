import React, { Fragment } from "react";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import Head from "next/head";
const NewMeetupPage = () => {
  const router = useRouter();
  function newMeetupHandler(newMeetup) {
    fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(newMeetup),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .then((data) => {
        router.push("/");
      });
  }
  return (
    <Fragment>
      <Head>
        <title>add tip</title>
        <meta name="description" content="школа программирования Борисполь" />
      </Head>
      <NewMeetupForm onAddMeetup={newMeetupHandler} />
    </Fragment>
  );
};

export default NewMeetupPage;
