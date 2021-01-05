import React from 'react';

export interface AdminPageProps {
  title: string;
}

export const AdminPage: React.FC<AdminPageProps> = () => {
  const name = "admin";
  const classname = `${name} page`;

  return (
    <React.Fragment>
      <div className={classname}>
        <div className="name" >{"Admin Page"}</div>
      </div>
    </React.Fragment>
  );
};

export default AdminPage;
