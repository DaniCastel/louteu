import { useState, useEffect } from "react";
import Image from "next/image";

import { Heading, Button, Box } from "@chakra-ui/react";
import dynamic from "next/dynamic";

import { io } from "socket.io-client";

import styles from "./planningpoker.module.scss";
// import CreateGame from "components/planningpoker/createGame";

const CreateGame = dynamic(
  () => import("components/planningpoker/createGame"),
  { ssr: false }
);

const socket = io("http://localhost:8000");

type IMessage = {
  message: string;
};

function PlanningPoker() {
  const [message, setMessage] = useState("");
  const [list, setList] = useState<IMessage[] | []>([]);

  const sendName = () => {
    socket.emit("event1", { message: message });
  };

  useEffect(() => {
    socket.on("event2", (data) => {
      console.log("on");
      setList([...list, data]);
    });
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        <Image src="/images/cards.png" alt="me" width="64" height="64" />
        <Heading as="h2" size="2xl">
          Planning poker
        </Heading>
      </h2>
      <div className={styles.card}>
        <CreateGame></CreateGame>
      </div>
    </div>
  );
}

export default PlanningPoker;
