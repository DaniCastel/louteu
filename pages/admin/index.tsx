import { CreateProduct } from "@/components/home/createProduct";
import { CreateBrand } from "@/components/home/createBrand";

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
  console.log(token);
  return (
    <div>
      <CreateProduct></CreateProduct>
      <CreateBrand token={token}></CreateBrand>
    </div>
  );
}

export default withAdmin(Admin);
