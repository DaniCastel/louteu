import withAdmin from "pages/withAdmin";

interface Props {
  user: {
    name: string;
    email: string;
    role: string;
    _id: string;
  };
  token: any;
}

function Admin({ user, token }: Props) {
  return <div>{JSON.stringify(user, token)}</div>;
}

export default withAdmin(Admin);
