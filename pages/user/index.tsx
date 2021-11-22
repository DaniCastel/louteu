import withUser from "../withUser";

const User = ({ user }) => <>{JSON.stringify(user)}</>;

export default withUser(User);
