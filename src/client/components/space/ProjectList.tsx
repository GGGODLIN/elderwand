import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { TreeItem, TreeView } from '@material-ui/lab';
import React from 'react';
import { useDispatch } from 'react-redux';
import ProjectVM from 'src/client/domain/project/ProjectVM';
import SpaceVM from 'src/client/domain/space/SpaceVM';
import AxiosFactory from 'src/client/helper/AxiosFactory';
import PaginationVM from 'src/client/models/PaginationVM';
import FetchSlice from 'src/client/slices/FetchSlice';
import SpaceSlice from 'src/client/slices/SpaceSlice';

interface ProjectListProp {
    projects: ProjectVM[];
    onClickCallback?: Function;
}

const ProjectList: React.FC<ProjectListProp> = (props) => {
    const dispatch = useDispatch();
    const items = Array.isArray(props.projects) ? props.projects : [];

    const elements = items.map((item: ProjectVM) => {
        const id = item.id;
        const name = `${item.code}-${item.name}`;

        const handleClick = () => {
            // console.log(item);
            dispatch(SpaceSlice.clearSelected());
            dispatch(SpaceSlice.selectProject(item));

            const url = `/api/spaces`;
            const params = {
                projectId: item.code,
            };

            new AxiosFactory()
                .useBearerToken()
                .useBefore(() => {
                    dispatch(FetchSlice.start());
                })
                .getInstance()
                .get<PaginationVM<SpaceVM>>(url, { params: params })
                .then((res) => {
                    dispatch(SpaceSlice.fetchSpaces(res.data));
                    if (props.onClickCallback) {
                        props.onClickCallback();
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    dispatch(FetchSlice.end());
                });
        };
        return (
            <TreeItem key={id} nodeId={id} label={name} onClick={handleClick} />
        );
    });

    return (
        <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
        >
            {elements}
        </TreeView>
    );
};

export default ProjectList;
