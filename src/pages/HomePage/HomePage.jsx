import React from "react";
import Form from "../../layouts/Form/Form";
import TableUser from "../../layouts/Table/TableUser";

const HomePage = () => {
  return (
    <div className="container space-y-6">
      <Form />
      <TableUser />
    </div>
  );
};

export default HomePage;
