import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import {
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
    const default_filter = DeviceTypeCategories.Gateway;
    // const default_filter = DeviceTypeCategory.Actuator;

    const [filter, setFilter] = useState(default_filter);

    const categories = [...DeviceTypeCategoryTags];

    const elements = categories.map((category, idx) => {
        const handleChange = (e) => {
            e.preventDefault();
            setFilter(category);
        };

        const color = filter == category ? 'default' : 'primary';

        return (
            <Button key={category} color={color} onClick={handleChange}>
                {category}
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

    let filtered =
        filter == 'All'
            ? templates
            : templates.filter(
                  (template) => template.type.categoryId == filter
              );

    const cards = !filtered.length
        ? []
        : filtered.map((template) => {
              return (
                  <DeviceTemplateCard key={template.id} template={template} />
              );
          });

    return (
        <React.Fragment>
            <div className={'device-category-filter'}>{elements}</div>
            <div className={'device-template-list'}>
                <div className="cards">{cards}</div>
            </div>
        </React.Fragment>
    );
};

export default DeviceTemplateCardList;
