import React from 'react';
import { Card, CardContent } from '@material-ui/core';
import { SpaceVM } from 'src/client/domain/space/SpaceVM';

interface SpaceSmallCardProp {
  space: SpaceVM;
  onSelectSmallCard?: Function;
}

const SpaceSmallCard: React.FC<SpaceSmallCardProp> = (props) => {
  const target = props.space;
  const id = target.id;
  const name = target.name;

  const handleDoubleClick = () => {
    if (!!props.onSelectSmallCard) {
      props.onSelectSmallCard(target);
    }
  };

  return (
    <Card
      key={id}
      className={"space-xs-card"}
      variant="outlined"
      // onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      <div className="card-header">
        <div className="header-name">{name}</div>
        {/* <div className="header-actions">{"actions"}</div> */}
      </div>
      <CardContent>
        {/* <div className="leaves">{elements}</div> */}
        {/* <img src={"http://placeimg.com/640/480/technics"} alt="" /> */}
        {/* <div>{"images"}</div> */}
        <div>{"space count"}</div>
        <div>{"device count"}</div>
      </CardContent>
      <div className="card-footer">
        <div className="footer-actions">{"actions"}</div>
      </div>
    </Card>
  );
};

// export default SpaceSmallCard;

interface SpaceCardListProp {
  spaces: SpaceVM[];
  space: SpaceVM;
  onSelectCard?: Function;
  onSelectSmallCard?: Function;
}

const SpaceCardStyleList: React.FC<SpaceCardListProp> = (props) => {
  const target = props.space;
  const spaces = props.spaces;

  if (!target) {
    return null;
  }

  if (!Array.isArray(target.leaves)) {
    return null;
  }

  const leaves = spaces
    .filter((item) => item.parent_id == target.id)
    .sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });

  const cards = leaves.map((item) => {
    if (!Array.isArray(item.leaves)) {
      return null;
    }

    const items = spaces.filter((space) => space.parent_id == item.id);
    const elements = items.map((item) => {
      return (
        <SpaceSmallCard
          key={item.id}
          space={item}
          onSelectSmallCard={props.onSelectSmallCard}
        />
      );
    });

    const id = item.id;
    const name = item.name;

    const handelSpaceCardSelect = () => {
      if (!!props.onSelectCard) {
        props.onSelectCard(item);
      }
    };

    return (
      <React.Fragment key={id}>
        <input name="space-cards-selected" id={id} type="radio" hidden={true} />
        <label htmlFor={id} onClick={handelSpaceCardSelect}>
          <Card className={"space-card"} variant="outlined">
            {/* <div id={item.id} /> */}
            <div className="card-header">
              <div className="header-name">{name}</div>
              <div className="header-actions">{"actions"}</div>
            </div>
            <CardContent>
              <div className="leaves">{elements}</div>

              <div className="preview">
                <img src={"http://placeimg.com/640/480/technics"} alt="" />
              </div>
            </CardContent>
          </Card>
        </label>
      </React.Fragment>
    );
  });

  return (
    <div className={"root-card"}>
      <div className="card-header">{`${target.name} - ${target.id}`}</div>
      <div className="card-list">{cards}</div>
    </div>
  );
};

export default SpaceCardStyleList;
