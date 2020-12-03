import * as React from "react";

export interface HomePageProps {
  title: string;
}

export const HomePage: React.FC<HomePageProps> = (props) => {
  const DOMAIN_NAME = "ElderWand.com";
  const name = "home";
  const classname = `${name} page`;

  return (
    <React.Fragment>
      <main>
        <div className={classname}>
          <div className="name">{DOMAIN_NAME}</div>
        </div>
      </main>
    </React.Fragment>
  );
};
