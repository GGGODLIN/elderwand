import * as React from "react";

export interface AdminPageProps {
  title: string;
}

export const AdminPage: React.FC<AdminPageProps> = (props) => {
  const name = "admin";
  const classname = `${name} page`;

  return (
    <React.Fragment>
      <main>
        <div className={classname}>
          <div className="name">{name}</div>
        </div>
      </main>
    </React.Fragment>
  );
};
