import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { TreeItem, TreeView } from '@material-ui/lab';
import React from 'react';
import { useDispatch } from 'react-redux';
import { ProjectPreviewVM } from 'src/client/domain/migration/MigraionPreviewVM';
import { groupBy } from 'src/client/utils/FunctionUtil';
import DataMigrationUtil from '../../domain/migration/DataMigrationUtil';
import AxiosFactory from '../../helper/AxiosFactory';
import DataMigrationSlice from '../../slices/DataMigrationSlice';
import FetchSlice from '../../slices/FetchSlice';
import ScrollUtil from '../../utils/ScrollUtil';

interface ProjectTreeViewProp {
    projects: ProjectPreviewVM[];
}

const ProjectTreeView: React.FC<ProjectTreeViewProp> = (props) => {
    const dispatch = useDispatch();

    const groups = groupBy('owner')(props.projects);

    const elements = Object.keys(groups).map((key: string) => {
        const projects: ProjectPreviewVM[] = groups[key];

        const subs = projects.map((project: ProjectPreviewVM) => {
            const handleClick = () => {
                const params = DataMigrationUtil.getConnectionParams();

                const url = `/api/migration/projects/${project.projectCode}`;

                new AxiosFactory()
                    .getInstance()
                    .get<ProjectPreviewVM>(url, { params: params })
                    .then((res) => {
                        dispatch(DataMigrationSlice.clearSelectedProject());
                        dispatch(DataMigrationSlice.selectProject(res.data));
                        ScrollUtil.GotoTop('main');
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                    .finally(() => {
                        dispatch(FetchSlice.end());
                    });
            };

            const label = `${project.projectCode} - ${project.displayName}`;

            return (
                <TreeItem
                    key={project.projectCode}
                    nodeId={project.projectCode}
                    label={label}
                    onClick={handleClick}
                />
            );
        });

        return (
            <TreeItem key={key} nodeId={key} label={key}>
                {subs}
            </TreeItem>
        );
    });

    return (
        <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            // expanded={expanded}
            // selected={selected}
            // onNodeToggle={handleToggle}
            // onNodeSelect={handleSelect}
        >
            {elements}
        </TreeView>
    );
};

export default ProjectTreeView;
