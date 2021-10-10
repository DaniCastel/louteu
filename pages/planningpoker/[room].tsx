function Room() {
  return <div>planning poker room</div>;
}
export default Room;

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
