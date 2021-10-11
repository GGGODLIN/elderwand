import React from 'react';
import { SpaceTemplateVM } from 'src/client/domain/device/DeviceVM';
import SpaceTemplateCard from './SpaceTemplateCard';

interface SpaceTemplateCardListProps {
    templates: SpaceTemplateVM[];
}

const SpaceTemplateCardList: React.FC<SpaceTemplateCardListProps> = (props) => {
    const filtered = !props.templates ? [] : props.templates;

    const cards = !filtered.length
        ? []
        : filtered.map((template) => {
              return (
                  <SpaceTemplateCard key={template.id} template={template} />
              );
          });

    return (
        <React.Fragment>
            <div className={'space-template-list'}>
                <div className="cards">{cards}</div>
            </div>
        </React.Fragment>
    );
};

export default SpaceTemplateCardList;
