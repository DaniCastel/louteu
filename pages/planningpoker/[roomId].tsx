import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GetStaticProps } from "next";

import { io } from "socket.io-client";

const socket = io("http://localhost:8000");

export default function Room() {
  const router = useRouter();
  const { roomId } = router.query;

  useEffect(() => {
    socket.emit("join", { room: roomId });

    //cleanup on component unmount
    return function cleanup() {
      socket.emit("disconnect");
      //shut down connnection instance
      socket.off();
    };
  }, []);

  return <div>planning poker room</div>;
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   const paths = getAllPostIds();
//   return {
//     paths,
//     fallback: false,
//   };
// };

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const postData = await getPostData(params.id as string);
//   return {
//     props: {
//       postData,
//     },
//   };
// };
