import ForceGraph3D, { GraphData, NodeObject } from 'react-force-graph-3d';
import SpaceVM from 'src/client/domain/space/SpaceVM';
import { useEffect, useState } from 'react';

interface Space3DTopologyGraphProp {
    spaces: SpaceVM[];
}

const Space3DTopologyGraph: React.FC<Space3DTopologyGraphProp> = (props) => {
    const [data, setDate] = useState(null);
    const [layout, setLayout] = useState({ width: 800, height: 600 });

    useEffect(() => {
        const target = document.querySelector('.list-content') as HTMLElement;
        const width = target.clientWidth - 30 || 800;
        const height = target.clientHeight - 0 || 600;

        setLayout({ width, height });
    }, []);

    useEffect(() => {
        const spaces = props.spaces.map((space) => {
            return { id: space.id };
        });

        const links = props.spaces
            .map((space) => {
                const source = space.id;
                const target = space.projectId;
                return {
                    source,
                    target,
                };
            })
            .filter((item) => item.target != '');

        let data = {
            nodes: spaces,
            links: links,
        };

        setDate(data);
    }, [props.spaces]);

    return (
        <div>
            {data && (
                <ForceGraph3D
                    graphData={data}
                    width={layout.width}
                    height={layout.height}
                />
            )}
        </div>
    );
};

export default Space3DTopologyGraph;
