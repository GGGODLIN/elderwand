import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import {
    DeviceProtocolTypes,
    DeviceProtocolTypeTags,
    DeviceTypeCategories,
    DeviceTypeCategoryTags,
} from 'src/client/domain/device/DeviceMaintainItemTypes';
import { DeviceTemplateVM } from 'src/client/domain/device/DeviceVMs';
import DeviceTemplateCard from './DeviceTemplateCard';

interface DeviceTemplateCardListProps {
    templates: DeviceTemplateVM[];
}

const DeviceTemplateCardList: React.FC<DeviceTemplateCardListProps> = (
    props
) => {
    const [category_filter, setCategoryFilter] = useState(
        DeviceTypeCategories.All
    );

    const categories = [...DeviceTypeCategoryTags];

    const category_elements = categories.map((category, idx) => {
        const handleChange = (e) => {
            e.preventDefault();
            setCategoryFilter(category);
        };

        const color = category_filter == category ? 'default' : 'primary';

        return (
            <Button key={category} color={color} onClick={handleChange}>
                {category}
            </Button>
        );
    });

    const [protocol_filter, setProtocolFilter] = useState(
        DeviceProtocolTypes.All
    );

    const protocols = [...DeviceProtocolTypeTags];

    const protocol_elements = protocols.map((protocol, idx) => {
        const handleChange = (e) => {
            e.preventDefault();
            setProtocolFilter(protocol);
        };

        const color = protocol_filter == protocol ? 'default' : 'primary';

        return (
            <Button key={protocol} color={color} onClick={handleChange}>
                {protocol}
            </Button>
        );
    });

    let templates = props.templates.slice().sort((left, right) => {
        const a = left.type.categoryId;
        const b = right.type.categoryId;

        if (!a || a > b) {
            return 1;
        }

        if (!b || a < b) {
            return -1;
        }

        return 0;
    });

    if (category_filter != 'All') {
        templates = templates.filter(
            (template) => template.type.categoryId == category_filter
        );
    }

    if (protocol_filter != 'All') {
        templates = templates.filter((template) => {
            return template.protocols
                .map((protocol) => protocol.typeId)
                .includes(protocol_filter);
        });
    }

    const cards = !templates.length
        ? []
        : templates.map((template) => {
              return (
                  <DeviceTemplateCard key={template.id} template={template} />
              );
          });

    return (
        <React.Fragment>
            <div className={'device-category-filter'}>{category_elements}</div>
            <div className="dotted" />
            <div className={'device-protocol-filter'}>{protocol_elements}</div>
            <div className="dotted" />
            <div className={'device-template-list'}>
                <div className="cards">{cards}</div>
            </div>
        </React.Fragment>
    );
};

export default DeviceTemplateCardList;
