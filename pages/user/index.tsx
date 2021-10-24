import withUser from "pages/withUser";

interface Props {
  user: {
    name: string;
    email: string;
    role: string;
    _id: string;
  };
  token: any;
}

function User({ user, token }: Props) {
  return <div>{JSON.stringify(user, token)}</div>;
}

export default withUser(User);
