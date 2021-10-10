import { useState, useEffect } from "react";
import { Input, Button } from "@chakra-ui/react";

import { io } from "socket.io-client";

const connectionOptions = {
  forceNew: true,
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ["websocket"],
};
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
    <div>
      <Input
        placeholder="Your message"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <Button colorScheme="blue" onClick={sendName}>
        Send message
      </Button>
      {list.map((p, key) => (
        <li key={key}>{p.message}</li>
      ))}
    </div>
  );
}

export default PlanningPoker;
