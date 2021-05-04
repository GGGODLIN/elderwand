import Layout from "src/client/containers/layout/Layout";
import React, { useEffect, useState } from "react";
import { Button, Card, CardContent } from "@material-ui/core";
import { NextPage, NextPageContext } from "next";
import Graph from "react-graph-vis";
// import { SpacePage } from "src/client/containers/Space/SpacePage";

import vis from "react-graph-vis";

export interface SpaceIndexProps {
  title: string;
}

interface VisOptions {
  autoResize: boolean;
  height: string;
  width: string;
  locale: "en";
  // locales: locales,
  clickToUse: string;
  // configure: {...},    // defined in the configure module.
  // edges: {...},        // defined in the edges module.
  // nodes: {...},        // defined in the nodes module.
  // groups: {...},       // defined in the groups module.
  // layout: {...},       // defined in the layout module.
  // interaction: {...},  // defined in the interaction module.
  // manipulation: {...}, // defined in the manipulation module.
  // physics: {...},      // defined in the physics module.
}

export const SpaceCopyIndex: NextPage<SpaceIndexProps> = (props) => {
  //   const graph = React.useRef(null);

  const [graph, setGraph] = useState({ nodes: [], edges: [] });
  // const [options, setOptions] = useState(options);

  const events = {
    select: function (event) {
      var { nodes, edges } = event;
    },
  };

  // const json = r5qE;
  const json = MjnQ;
  useEffect(() => {
    const nodes = json.nodes.map((item) => {
      return {
        id: item.id,
        label: item.name,
      };
    });

    const edges = json.links.map((item) => {
      return {
        from: item.source,
        to: item.target,
      };
    });

    setGraph({
      nodes: nodes,
      edges: edges,
    });
  }, [MjnQ]);

  return (
    <React.Fragment>
      <Layout {...props}>
        {/* <SpacePage {...props} /> */}
        <div>
          <Graph
            graph={graph}
            options={options}
            events={events}
            getNetwork={(network) => {
              //  if you want access to vis.js network api you can set the state in a parent component using this property
            }}
          />
          <div id="network">empty</div>
          {/* <Graph
            id="graph-id" // id is mandatory
            data={data}
            config={config}
            onClickNode={handleClickNode}
            onClickLink={handleClickLink}
            ref={graph}
          />
          <Button onClick={handleClick}>RESET</Button> */}
        </div>
      </Layout>
    </React.Fragment>
  );
};

SpaceCopyIndex.getInitialProps = async (ctx: NextPageContext) => {
  return {
    title: "Space",
  };
};

export default SpaceCopyIndex;

interface CustomNodeProps {
  id: string;
  name: string;
}

const CustomNode: React.FC<CustomNodeProps> = (props) => {
  return (
    <div>
      <Card>
        <CardContent>{props.name}</CardContent>
      </Card>
    </div>
  );
};

const options = {
  autoResize: false,
  layout: {
    hierarchical: false,
    improvedLayout: true,
  },
  edges: {
    color: "#000000",
    smooth: false,
    // smooth: {
    //   forceDirection: "none",
    // },
  },
  width: "1320px",
  height: "640px",
  physics: {
    // enabled: false,
    stabilization: false,
    maxVelocity: 50,
    minVelocity: 0.75,
    solver: "forceAtlas2Based",
    forceAtlas2Based: {
      //   centralGravity: 0,
      //   springLength: 0,
      //   springConstant: 0.15,
      //   damping: 1,
      //   avoidOverlap: 1,
    },
    timestep: 1,
  },
  interaction: {
    dragNodes: true,
    dragView: true,
    hideEdgesOnDrag: false,
    hideEdgesOnZoom: false,
    hideNodesOnDrag: false,
    hover: false,
    hoverConnectedEdges: true,
    keyboard: {
      enabled: false,
      speed: { x: 10, y: 10, zoom: 0.02 },
      bindToWindow: true,
    },
    multiselect: false,
    navigationButtons: false,
    selectable: true,
    selectConnectedEdges: true,
    tooltipDelay: 300,
    zoomSpeed: 1,
    zoomView: true,
  },
};

const MjnQ = {
  nodes: [
    {
      id: "root",
      name: "root",
    },
    {
      id: "b784ddc8-c7c6-431d-9630-5b3efe7d32d6",
      name: "餐厅",
    },
    {
      id: "5156750c-92e5-432d-9b34-737d25dd0330",
      name: "厕所",
    },
    {
      id: "ec48ebae-cb04-4b27-9e8a-9ea7b9a24e98",
      name: "餐厅",
    },
    {
      id: "97bf1a47-60e9-4058-be48-c498e0a587c5",
      name: "1208室D1户型",
    },
    {
      id: "25399e7b-3a2a-4308-8916-5703f54fb11a",
      name: "楼上厕所",
    },
    {
      id: "424123ad-12ad-4166-b142-4342b9a4ee9a",
      name: "客厅",
    },
    {
      id: "671b799f-d605-4e63-806a-c8529d386f15",
      name: "203户型",
    },
    {
      id: "67029b9a-e48d-480b-81c1-61cb617dec31",
      name: "卧室",
    },
    {
      id: "e2df84a0-e11f-4d13-adbf-e51f85125b81",
      name: "卧室2",
    },
    {
      id: "0bc72908-7834-4343-bab9-10d241780795",
      name: "餐厅",
    },
    {
      id: "74a346dd-4954-4151-a07c-bc20f6958046",
      name: "5层",
    },
    {
      id: "6a142889-ec6a-4bd8-a0ef-52e1fdd351bb",
      name: "客厅",
    },
    {
      id: "6516264f-b425-4b4a-94ce-9eb840b8181c",
      name: "客厅",
    },
    {
      id: "a5c29a6c-e14c-469a-b267-63566fb5d451",
      name: "大厅",
    },
    {
      id: "1d28cbaa-a8a5-4f64-b87a-8be01d421736",
      name: "衣帽间",
    },
    {
      id: "00c0d511-a184-4fb0-8eb4-cbf2e37e3e0d",
      name: "厕所",
    },
    {
      id: "6976a9cd-e22e-40d7-90d0-8bd893ead77b",
      name: "卧室",
    },
    {
      id: "8819ca12-5136-4a24-973c-a5dda7edfabe",
      name: "楼下卧室",
    },
    {
      id: "ffef8bce-82d1-4e54-a92d-685614069e13",
      name: "703室J户型",
    },
    {
      id: "b27e7be0-f003-4351-a58b-6796c5e92ef5",
      name: "1007室B户型",
    },
    {
      id: "115a381c-4764-4f23-b47d-98f131b9b64a",
      name: "厕所",
    },
    {
      id: "ed230c98-181c-46b3-b3a6-40541ff0f5bf",
      name: "楼上厕所",
    },
    {
      id: "27d2c03e-d26c-4af3-8575-04f90a1c05dd",
      name: "走廊",
    },
    {
      id: "50cafaab-1c96-479c-85b3-98450e66f3dd",
      name: "大厅",
    },
    {
      id: "7fb6f680-19c5-4874-b5c9-ce22ebaf3671",
      name: "407室B户型",
    },
    {
      id: "08666896-c2fa-47a0-8acb-15414852f8a7",
      name: "厕所",
    },
    {
      id: "68498ecd-3a8b-4b60-a11c-3884dea19ab9",
      name: "客厅",
    },
    {
      id: "b082a77a-4ee7-4cd9-a6cc-0e2c850b0fd7",
      name: "卧室",
    },
    {
      id: "10c06957-93d8-4082-832d-cdf3b6e4d84f",
      name: "客厅",
    },
    {
      id: "ef08e8ff-1496-494d-b7d9-5f13fc0282ad",
      name: "餐厅",
    },
    {
      id: "badc59ea-7d39-4529-af22-7b2383140da5",
      name: "衣帽间",
    },
    {
      id: "e86f1a9f-5296-405e-9b6c-15887b4482d4",
      name: "客厅",
    },
    {
      id: "85a5ab1f-c139-429b-a65b-68dadfaf46f1",
      name: "509室A2户型",
    },
    {
      id: "4176b265-8c09-4ee2-8851-7550ad2ca41a",
      name: "808室AI户型.",
    },
    {
      id: "9750fe20-1b45-4bc2-a27a-74cb44ebd84a",
      name: "厕所",
    },
    {
      id: "261aaf72-ba2a-4dae-bd11-fa75646312ea",
      name: "大厅",
    },
    {
      id: "3690c89e-6895-42dd-859b-7a6f2e7ce1a6",
      name: "1407室D4户型",
    },
    {
      id: "c2b6aff4-a282-41cf-9046-408a515840ac",
      name: "客厅",
    },
    {
      id: "222f5e1d-982b-47d6-ae5c-5bc96edcef94",
      name: "客厅",
    },
    {
      id: "9bf2f899-49bf-410f-8e7a-b20bc3e1bcee",
      name: "餐厅",
    },
    {
      id: "5a5d0ef5-a7d3-47af-aae0-034c84b21a35",
      name: "卧室",
    },
    {
      id: "1afe6458-ef13-488f-b486-13ac473bb391",
      name: "衣帽间",
    },
    {
      id: "35be6408-34eb-4170-852b-55df42c1a7b4",
      name: "餐厅",
    },
    {
      id: "61d63d38-214b-420c-b6c7-9b863038779a",
      name: "1409室D4户型",
    },
    {
      id: "b26ae1a4-208c-45e3-a44f-55208f228879",
      name: "餐厅",
    },
    {
      id: "93f4c5b3-511f-4e46-ba3b-259450c4644b",
      name: "卧室",
    },
    {
      id: "d4f160ff-93c8-4efa-ab6e-a890779031d7",
      name: "餐厅",
    },
    {
      id: "296480b7-8e7a-470a-b0eb-303b03dfe516",
      name: "餐厅",
    },
    {
      id: "9b393947-e968-4d88-94ce-6765f1035124",
      name: "1206室D1户型",
    },
    {
      id: "5d412cb9-f602-426d-afde-a0ffdb42f958",
      name: "1307室D4户型",
    },
    {
      id: "60a283ba-0125-4205-8b37-31032ac8afca",
      name: "11层",
    },
    {
      id: "0d390fe8-605c-43fd-a559-f27b1a99f730",
      name: "书房",
    },
    {
      id: "d403aeba-0bbe-4922-a007-268f1bf8ba30",
      name: "楼下厕所",
    },
    {
      id: "ecd05be5-f89c-42e1-b5e0-f9d4897e4058",
      name: "楼下卧室",
    },
    {
      id: "926649d1-72e2-4192-b5a1-9f941ecfeae9",
      name: "大厅",
    },
    {
      id: "156438f3-8765-409b-9ea1-6bea3da01c32",
      name: "楼梯",
    },
    {
      id: "8bd90bef-745d-4e8a-beea-1b6ea4d1dd4a",
      name: "环保大厦",
    },
    {
      id: "d70e36a5-47ba-4e3b-a28f-339bb1716e42",
      name: "705室C户型",
    },
    {
      id: "08590185-f1c7-4610-afed-1798794e3bc6",
      name: "1209室D2户型",
    },
    {
      id: "f29b9b87-bc88-4e06-b5e1-b3affc4af551",
      name: "客厅",
    },
    {
      id: "223d7f52-3c99-416d-8bc2-dc6e413c336e",
      name: "906室B户型.",
    },
    {
      id: "77b6f145-8691-4f8f-b5eb-bbba728a0ddc",
      name: "卧室",
    },
    {
      id: "2a89bb10-2594-442e-85b5-40845d080c68",
      name: "608室A1户型",
    },
    {
      id: "ae941fa0-3f49-4a10-84c9-3de6c8f55ff7",
      name: "大厅",
    },
    {
      id: "c6ef4411-8cb1-437d-82e3-2927b5c72d2f",
      name: "厕所",
    },
    {
      id: "e8f26a41-beea-4da2-a777-d64f8978c568",
      name: "楼下厕所",
    },
    {
      id: "3597c2d9-8783-425d-89d9-4bc51972608b",
      name: "厕所1",
    },
    {
      id: "4eb7bb85-6837-469d-af77-092ee2565e0f",
      name: "301户型",
    },
    {
      id: "e6f7cef4-0d4e-4747-ad1d-71b3c9658ce2",
      name: "1305室C户型",
    },
    {
      id: "9b83fd35-2c64-48ab-9840-c244b5287ece",
      name: "走廊",
    },
    {
      id: "fe7c26a2-9074-44c5-b090-368a819c303e",
      name: "卧室",
    },
    {
      id: "253719e9-7782-462d-bdc1-bd9467a7a699",
      name: "餐厅",
    },
    {
      id: "363ea6db-c9a7-4dfa-8a80-f296c8eaad32",
      name: "餐厅",
    },
    {
      id: "fff144d4-7771-43d2-9c8b-3d63baa84d9e",
      name: "客厅",
    },
    {
      id: "1ee9a841-500b-4405-a899-3dfe8820d66b",
      name: "405室C户型",
    },
    {
      id: "44f2b7fb-4a21-4daa-a18e-50e905eb735e",
      name: "408室A1户型",
    },
    {
      id: "273019d4-5106-4e85-9111-ab49d0d3ca29",
      name: "客厅",
    },
    {
      id: "5227f5b6-eaf2-4796-b12e-9e083bc8f5fe",
      name: "908室AI户型.",
    },
    {
      id: "570dcc10-b9ae-4aa4-aefb-63cd3ce0f821",
      name: "卧室",
    },
    {
      id: "c22dc394-6f36-4740-a74e-72f1dbbab100",
      name: "308户型",
    },
    {
      id: "4ff01a3b-c200-4c64-bf5a-2d68addca02c",
      name: "楼下厕所",
    },
    {
      id: "b8fa171e-0a05-4eab-9100-37ef0c525eda",
      name: "餐厅",
    },
    {
      id: "3d78a211-309d-46cb-b8e1-9a6659d6adce",
      name: "楼下走廊",
    },
    {
      id: "3629c398-0d83-4c0c-97c6-29e94e6042a7",
      name: "库房/储藏室",
    },
    {
      id: "55f40488-96ee-426e-bd1f-1f10464c1697",
      name: "楼下厕所",
    },
    {
      id: "08ec9f60-ba0d-43f5-b0df-dd68d65311f2",
      name: "餐厅",
    },
    {
      id: "658a8333-c019-4780-b7bd-225ce14b091c",
      name: "餐厅",
    },
    {
      id: "e75ebd60-19fd-4724-87fb-825759510d6b",
      name: "卧室",
    },
    {
      id: "193b3b43-a980-4af4-8dad-33ea2145a287",
      name: "卧室",
    },
    {
      id: "0f6c0854-8710-4799-90b5-dda1d956929d",
      name: "卧室",
    },
    {
      id: "846f2a2f-432c-4525-ad3d-b0b46fb9f0b0",
      name: "客厅",
    },
    {
      id: "96968a72-de39-4e61-a288-1ab9c8d8ab3f",
      name: "走廊",
    },
    {
      id: "cd0d3690-0b60-4a7a-80c2-55497e9a3797",
      name: "楼下卧室",
    },
    {
      id: "c67675db-869b-4258-9819-49321242ea6e",
      name: "1101室C1户型",
    },
    {
      id: "565f7bf4-d4f0-42d3-a7b0-0d29e769ca99",
      name: "卧室",
    },
    {
      id: "a13a46a4-06b5-4100-bf55-b7e1c890ba7c",
      name: "708室AI户型",
    },
    {
      id: "dd2d95ef-cbdf-4ff2-8c1c-f0dd0d5ef126",
      name: "餐厅",
    },
    {
      id: "3567f66c-3f08-4593-b089-9fea147e108a",
      name: "803室C1户型",
    },
    {
      id: "597c87c2-15a6-4944-a8c5-b59b50bc208d",
      name: "卧室",
    },
    {
      id: "90e4b383-6d6a-4347-8053-a0af408b10b1",
      name: "餐厅",
    },
    {
      id: "c16733cb-ff2f-4fb1-8ef2-b6e3a5fa5caf",
      name: "厕所",
    },
    {
      id: "f8dfdf92-5339-40cd-86b9-4733fa97ad6c",
      name: "客厅",
    },
    {
      id: "1481febb-b8db-431c-9f6d-533c00ad9897",
      name: "楼下厕所",
    },
    {
      id: "7979974b-81e4-4dc8-aabe-78b40933aba1",
      name: "厕所",
    },
    {
      id: "3dbfa0a8-44c0-4d45-865a-670bd4bcb769",
      name: "客厅",
    },
    {
      id: "3a7a97c6-1c2e-4b72-820f-7b48158cd994",
      name: "书房",
    },
    {
      id: "5d088f5b-3633-4962-82e0-97bb805a6e04",
      name: "楼上卧室",
    },
    {
      id: "0663a7d2-b18a-4d9c-88d5-227c80568a9d",
      name: "餐厅",
    },
    {
      id: "27f6f554-5a51-4b79-9811-89645e35dfcd",
      name: "1406室D3户型",
    },
    {
      id: "43236681-dba8-4ff0-9e22-339be5888816",
      name: "303户型",
    },
    {
      id: "a5a5a9a8-a915-46e3-888b-c69602f8c5a8",
      name: "卧室",
    },
    {
      id: "3967940e-f0da-460d-af48-acbfbe1f7343",
      name: "餐厅",
    },
    {
      id: "f1079f0e-36e9-42a6-8d3a-1d31716fb71b",
      name: "厕所",
    },
    {
      id: "652e556e-c572-4497-b819-0f26c09a1995",
      name: "餐厅",
    },
    {
      id: "c7c9fab9-f918-47e7-a085-8cafffafc2ba",
      name: "309户型",
    },
    {
      id: "15adecfa-bcbb-4853-8740-ed1258a4c4c0",
      name: "餐厅",
    },
    {
      id: "d11ddb9a-45ca-4f54-877b-a4c4894f1e60",
      name: "楼上厕所",
    },
    {
      id: "233f14e9-655a-4842-a05c-37b5d82e8c24",
      name: "209户型",
    },
    {
      id: "89fc1193-1a2a-4b5f-82fb-0aba58cd4850",
      name: "1106室D1户型",
    },
    {
      id: "700fd58d-45b0-4aa4-9fae-d819bc1ce69b",
      name: "706室B户型",
    },
    {
      id: "f1881856-ae8e-41cd-b63b-73e77adadeb2",
      name: "餐厅",
    },
    {
      id: "bd598fb6-1d4f-4532-9d56-d718b55a0829",
      name: "卧室1",
    },
    {
      id: "bf7b2d17-4cec-4828-8389-e68230169e39",
      name: "餐厅",
    },
    {
      id: "115bb65b-0c77-4439-bdbd-782858429064",
      name: "卧室",
    },
    {
      id: "003d8d1c-568a-4d2d-a145-e30eca2682dd",
      name: "餐厅",
    },
    {
      id: "cf62b163-a54f-48ac-b080-7b1fa9b34de0",
      name: "601室K户型",
    },
    {
      id: "46537d85-a3c2-4144-acc8-703cc966d18d",
      name: "走廊",
    },
    {
      id: "48b9b0ca-85c8-442d-8919-07927ec1bbe4",
      name: "楼上卧室",
    },
    {
      id: "b8dacd71-6e07-4e71-9543-b50f55e4017c",
      name: "1108室D1户型",
    },
    {
      id: "93baba60-44b3-42c7-b6f2-f8f2d63fdfa1",
      name: "楼下厕所",
    },
    {
      id: "422bf665-9624-495b-8917-b1371c5bb2af",
      name: "201户型",
    },
    {
      id: "e38fafbb-cd14-4922-a56f-f0b5bd8b9559",
      name: "1005室C户型",
    },
    {
      id: "ee7033d5-3a47-469a-91ff-a290fe784597",
      name: "厨房",
    },
    {
      id: "5a26469a-b349-4aa0-95ca-62d84320d75d",
      name: "楼上卧室",
    },
    {
      id: "58b7b1dd-3490-4cb4-b049-60eea748443f",
      name: "餐厅",
    },
    {
      id: "f5c387d6-8868-4bf7-b583-470fb0ad19d1",
      name: "客厅",
    },
    {
      id: "deecab90-6db4-4955-8c65-b244efd4e9b2",
      name: "走廊",
    },
    {
      id: "6c269387-99dd-438c-a63b-6455f0a312c4",
      name: "306户型",
    },
    {
      id: "b18afafe-c8e4-44a2-bbef-d75302bcd446",
      name: "卧室",
    },
    {
      id: "a7f3d118-1ab4-458f-96b6-c427641d482f",
      name: "餐厅",
    },
    {
      id: "3f146e97-de72-4d96-9f59-b106fb0ce6a7",
      name: "楼上厕所",
    },
    {
      id: "20f34107-96d7-4edd-959e-5e0d45ba3b8d",
      name: "厨房",
    },
    {
      id: "f87cb9a5-d6fb-4de0-8fd7-b26750ea79bf",
      name: "卧室",
    },
    {
      id: "f13c3d35-509e-4327-b7f4-a42e9edaee94",
      name: "206户型",
    },
    {
      id: "30facb9f-42aa-4387-a7ec-2c58c66ff27e",
      name: "卫生间",
    },
    {
      id: "d9c08eae-efe5-45aa-bddc-aa9709b1da71",
      name: "卧室",
    },
    {
      id: "fef9a2d3-bb88-48cd-8a7a-d8a05cf997bb",
      name: "客厅",
    },
    {
      id: "f11116d9-f050-46e8-9556-f7af34ecd7a3",
      name: "餐厅",
    },
    {
      id: "e33bca72-a484-4783-919f-624afb39bcff",
      name: "客厅",
    },
    {
      id: "b12d3f6f-93d7-42a8-b50c-aef65f6edde9",
      name: "灯带",
    },
    {
      id: "9dea62a7-3620-49a6-8af1-15afc1070800",
      name: "卧室",
    },
    {
      id: "02c88ec1-c56a-41f9-a87c-f31babcedf5c",
      name: "楼上卧室",
    },
    {
      id: "18459548-d916-47c6-b949-2c8a9a33deb5",
      name: "走廊",
    },
    {
      id: "6123d87c-89e8-46ae-aae9-1876a524fc77",
      name: "厨房",
    },
    {
      id: "5364d84e-47ab-4b13-b1ad-3fa29a7c9119",
      name: "1006室B户型",
    },
    {
      id: "9c9210a1-219d-4c28-b1cd-9fc3b60c83fa",
      name: "卧室",
    },
    {
      id: "54350d03-b23e-4937-8c3d-5e5988abee44",
      name: "客厅",
    },
    {
      id: "d39bf20f-dab8-4977-a76d-c87fc808b190",
      name: "卧室",
    },
    {
      id: "8d033129-ae99-4d89-9913-f3c1dbf34843",
      name: "餐厅",
    },
    {
      id: "d955bb2b-b2b3-4e0b-b02c-4e90fc731aa7",
      name: "餐厅",
    },
    {
      id: "994274d5-ff72-4f7e-b7e9-80f22b7a99d3",
      name: "餐厅",
    },
    {
      id: "c5747044-7c49-4882-827b-273aacb830fb",
      name: "卫生间",
    },
    {
      id: "b6b30202-a721-45a7-a68c-89e35ae65c6d",
      name: "卧室",
    },
    {
      id: "cefdef59-9a86-4a7b-add0-001c8632cd01",
      name: "卧室",
    },
    {
      id: "269d45c0-e66c-42c3-bf47-10d26797a8b3",
      name: "楼下厕所",
    },
    {
      id: "66ee6c1a-c04c-4842-a831-54499f910ab3",
      name: "厕所",
    },
    {
      id: "b11df099-9f72-4b4d-bc1b-19e23e95f115",
      name: "7层",
    },
    {
      id: "7b0d8b5f-67a2-49f3-afbd-719ffbfd23a8",
      name: "餐厅",
    },
    {
      id: "a3c2c87f-e027-4396-9e6e-bc5edef2d9fd",
      name: "大厅",
    },
    {
      id: "8ba590a5-d651-46bd-95b2-9c4646f51a66",
      name: "走廊",
    },
    {
      id: "7f7539a1-496e-45f7-b319-e78b485bce31",
      name: "1102室C户型.",
    },
    {
      id: "1625923f-90f7-40cc-88e3-bbf437082381",
      name: "1402室C户型",
    },
    {
      id: "c562979d-23c2-4f06-bc16-e168f097f5fe",
      name: "厕所",
    },
    {
      id: "b18c1b17-57bc-4211-9724-dafacf41ad37",
      name: "卧室",
    },
    {
      id: "c8f5b3bf-a38c-40af-b66c-02f6c14ee209",
      name: "餐厅",
    },
    {
      id: "e3eb7729-6649-465e-bf30-10750975aa08",
      name: "楼下卧室",
    },
    {
      id: "b82d8d0a-38e5-48a9-9838-9aaae9875f5b",
      name: "餐厅",
    },
    {
      id: "df105e55-f93e-4365-b43e-e82a1ebbb3a2",
      name: "客厅",
    },
    {
      id: "cbdbe83c-0a00-43bf-a7ad-bff4bd85d2d3",
      name: "厕所",
    },
    {
      id: "ab02474c-5007-450c-b3c5-49285a443b7f",
      name: "1009室A2户型",
    },
    {
      id: "1503809e-42fc-47d5-ab9a-e3d3831ffc57",
      name: "楼上卧室",
    },
    {
      id: "86758c98-bdd1-4bd2-9b70-58ced2efc513",
      name: "客厅",
    },
    {
      id: "7c857010-a287-4068-bd4f-ec31648db5be",
      name: "卫生间",
    },
    {
      id: "3a56b0dc-f829-407b-98d5-ba45fb464c24",
      name: "楼下厕所",
    },
    {
      id: "ced6aa37-b2eb-4373-89eb-2fee7c4c2157",
      name: "楼上卧室2",
    },
    {
      id: "fe967b58-a3c1-437a-81b9-948ad59938eb",
      name: "卧室",
    },
    {
      id: "466c872c-2cb5-416a-bddf-4aeda1447f18",
      name: "浴室",
    },
    {
      id: "3869bdf4-ade9-4d7f-b9a6-c501fd0da620",
      name: "205户型",
    },
    {
      id: "ba325ad0-5c56-4e38-afd0-8325b56875d0",
      name: "客厅",
    },
    {
      id: "4ea3692f-3290-4f3f-8e43-04d53f08b0b3",
      name: "卧室",
    },
    {
      id: "3f44797d-d7f3-495b-afc0-1f74e8c370f1",
      name: "走廊",
    },
    {
      id: "1bc67759-28a7-4a7b-be71-7edc702b7153",
      name: "楼下卧室",
    },
    {
      id: "4b05aad9-3d3e-46cd-bcbc-af4eaef4563a",
      name: "大厅",
    },
    {
      id: "29e125d4-bbdc-451c-88e3-b62a32d8515d",
      name: "403室J户型",
    },
    {
      id: "91b92e5c-16ff-40ed-9245-aa8eb797acd1",
      name: "8层",
    },
    {
      id: "d6baadd1-2086-40b5-9d6d-31feb9f44df7",
      name: "厕所",
    },
    {
      id: "7eb4b18d-9261-4e9d-9d05-a649ad9a6371",
      name: "厕所",
    },
    {
      id: "27008cff-01cf-4b92-b1c2-30256e7924bc",
      name: "餐厅",
    },
    {
      id: "473ee566-94c5-4e9b-b836-066325fe5162",
      name: "卧室",
    },
    {
      id: "b84f1a1d-3cdb-4e21-957e-dcf7db7e3875",
      name: "餐厅",
    },
    {
      id: "cc7afd17-5924-4a92-b392-f3ec702ca0e5",
      name: "书房",
    },
    {
      id: "28cec7e5-d3e7-44e7-839f-04ff8490437c",
      name: "卧室",
    },
    {
      id: "74296f05-4ed3-42a2-8ca0-2eeac34a6e7d",
      name: "厨房",
    },
    {
      id: "def926ac-2cbf-486c-b8f3-5ec362225c27",
      name: "楼上卧室",
    },
    {
      id: "01da86ab-06a0-4b30-a53a-2e6170690f15",
      name: "阳台/露台",
    },
    {
      id: "dec65496-ff8f-4120-a2a6-44c84b4c04f0",
      name: "809室A2户型",
    },
    {
      id: "4ecc0c40-b5a4-4b40-82a0-8768fff33726",
      name: "客厅",
    },
    {
      id: "84aaa49a-1c42-428c-9449-860ad3de75a2",
      name: "客厅",
    },
    {
      id: "af1a315e-9045-480e-a712-f7c5aee8023e",
      name: "走廊",
    },
    {
      id: "fac63a22-d0ab-43d2-9e54-9b032f06f673",
      name: "客厅",
    },
    {
      id: "5a6fabe2-dda7-4524-a20f-f44e452ad607",
      name: "客厅",
    },
    {
      id: "c8037afa-ba2f-4630-bd14-ee31ae8e275a",
      name: "大厅",
    },
    {
      id: "aeceb453-bb54-457b-8516-73eec25139dd",
      name: "卧室",
    },
    {
      id: "0f8b05bd-eeb0-464e-9a92-9434c90e28f7",
      name: "1309室D4户型",
    },
    {
      id: "ada0ceb3-68cc-4b29-89e7-1ed876ecca1a",
      name: "餐厅",
    },
    {
      id: "2305baa4-0b27-4779-9716-92b3e44ec5c5",
      name: "卧室",
    },
    {
      id: "b65106f6-ecb0-4b23-877d-09287719727b",
      name: "客厅",
    },
    {
      id: "988f5148-c8bd-4fd1-9c2d-97f6c717e3dd",
      name: "609室A2户型",
    },
    {
      id: "430f26aa-04aa-4c55-b9dd-c8dfa7f22f06",
      name: "客厅",
    },
    {
      id: "4070465e-c132-413a-9ad6-95d28048ec5b",
      name: "走廊",
    },
    {
      id: "41c36986-5525-46d1-8d0d-6703253b1505",
      name: "202户型",
    },
    {
      id: "0bb3ea8f-5e2d-4ed6-b648-475c260293cf",
      name: "805室C户型",
    },
    {
      id: "bf940e9b-875b-4fc4-a88d-ebc5bca051f8",
      name: "走廊",
    },
    {
      id: "54697bbe-f962-4255-85e7-f9563b823a08",
      name: "卧室",
    },
    {
      id: "c8b9d4fb-b8d9-40ef-947a-88d3c53d3799",
      name: "客厅",
    },
    {
      id: "45650fca-78b9-4ab1-a876-742ec8897e29",
      name: "607室B户型",
    },
    {
      id: "8e1a2dc9-0638-4cc4-93ee-2768433b552a",
      name: "餐厅",
    },
    {
      id: "5a19d7c9-d513-42f2-baa8-7bd4db7092b1",
      name: "客厅",
    },
    {
      id: "2bb70eb3-26c2-46f1-b3da-4c52d4e87e58",
      name: "卧室",
    },
    {
      id: "6c0a91be-71c5-4311-b60b-f249e70258bd",
      name: "大厅",
    },
    {
      id: "7084ef55-c145-4d5b-89e8-f3b6c53ee281",
      name: "厨房",
    },
    {
      id: "e315756c-4a81-4c0a-bbaa-a087919c2326",
      name: "厕所",
    },
    {
      id: "971cfa85-3291-47ce-8036-f0f34e548d2d",
      name: "餐厅",
    },
    {
      id: "558fe29e-0d03-4614-b3e7-94c78bb14641",
      name: "走廊",
    },
    {
      id: "729ed299-18a0-448c-86b7-524beedbbcab",
      name: "走廊",
    },
    {
      id: "052b5817-b1fb-44a0-bbb4-e0e3c64b8473",
      name: "厨房",
    },
    {
      id: "c0856099-c385-444b-866e-77e18625e9a6",
      name: "厕所",
    },
    {
      id: "e6a383a3-625d-4257-be8a-66fdd4afb06f",
      name: "餐厅",
    },
    {
      id: "38348f91-4888-4644-b3f0-b79e6697cbd1",
      name: "楼下厕所",
    },
    {
      id: "4ec54efe-a9bb-43be-a4ca-86604dd97e2d",
      name: "大厅",
    },
    {
      id: "2c520769-62f5-4450-afab-ba5a2c0f5343",
      name: "客厅",
    },
    {
      id: "6a6264ce-1473-47c8-9880-cf6f79527e0b",
      name: "楼下卧室",
    },
    {
      id: "2200f0d4-19fd-4429-808f-6e56ee9f935f",
      name: "卫生间",
    },
    {
      id: "e5660912-531a-4270-925a-30e37442400e",
      name: "餐厅",
    },
    {
      id: "62d244e1-2f31-48fa-a5a1-42482f35cf62",
      name: "501室K户型",
    },
    {
      id: "ff3d9763-712a-4286-85ff-7cd3b29b08a8",
      name: "707室B户型",
    },
    {
      id: "fea1e332-387e-4a8b-97c2-023e17b21db0",
      name: "508室A1户型",
    },
    {
      id: "84a30d8f-8365-49df-9a3d-3ca62d6982f8",
      name: "客厅",
    },
    {
      id: "ca04a399-c85d-4e51-a632-733f081114d3",
      name: "餐厅",
    },
    {
      id: "46d47f04-6f88-44da-abaa-3cad41b657f7",
      name: "卧室",
    },
    {
      id: "146a90fe-eaab-4938-8261-65999bff3bab",
      name: "楼下卧室",
    },
    {
      id: "5e8759df-579a-493e-88bb-9bd485c08113",
      name: "主卧",
    },
    {
      id: "22b7648a-0071-44d1-98d2-cc5909c0582e",
      name: "客厅",
    },
    {
      id: "b5b77bcd-69d5-491d-b508-fce796db0750",
      name: "卫生间",
    },
    {
      id: "69ab5e7f-ad73-4be2-ab80-c229c32396ce",
      name: "406室B户型",
    },
    {
      id: "82eecd80-6d3a-4494-ba90-4c7e4e5863ed",
      name: "卧室",
    },
    {
      id: "df143b9f-5096-47c8-b6a1-41440297339f",
      name: "餐厅",
    },
    {
      id: "3561f8df-f603-494d-a12c-e731f4db62de",
      name: "餐厅",
    },
    {
      id: "32de4ef8-8562-4b28-8861-ff61d563432d",
      name: "客厅",
    },
    {
      id: "1800050b-7e73-4a33-94b0-509457274acc",
      name: "厕所",
    },
    {
      id: "a69aa485-a5d6-41ae-ba77-c765fb75488c",
      name: "餐厅",
    },
    {
      id: "f39aaecd-98da-4799-b424-5db2575ad4a5",
      name: "客厅",
    },
    {
      id: "dbcea84f-a833-4ef9-810e-16171062263a",
      name: "走廊",
    },
    {
      id: "9621d84e-a95e-4cb8-94c7-b925f8bb1848",
      name: "餐厅",
    },
    {
      id: "04e438c8-f4a7-43d3-ad13-ecd21ee5a50c",
      name: "厕所",
    },
    {
      id: "aca851d2-dfd0-44cf-94f2-baae339d6625",
      name: "楼下卧室",
    },
    {
      id: "1a3fad3c-5a71-4a9f-9295-c0ff524bf7dc",
      name: "楼下厕所",
    },
    {
      id: "30e8ab47-ecff-4288-83dd-c8a014eac7f9",
      name: "1107室D2户型",
    },
    {
      id: "e785d87b-acb0-40f9-aa40-0e031f4172cb",
      name: "2层",
    },
    {
      id: "d15c48c9-b424-45a8-8e69-82fc0656f19c",
      name: "807室B户型",
    },
    {
      id: "3dbb1bef-2246-4af8-84ef-efa0c1b11418",
      name: "14层",
    },
    {
      id: "28a19aaf-6827-4392-bd10-53f44f3e7a2a",
      name: "卧室",
    },
    {
      id: "3a749af4-5cab-4ced-a81e-f2f803f44ccd",
      name: "卧室",
    },
    {
      id: "3ff424a6-2ca4-489d-8a50-1db2d56c6140",
      name: "客厅",
    },
    {
      id: "8acf9317-a9c0-47ea-b51b-4008fbe799fc",
      name: "卧室",
    },
    {
      id: "978b873a-dde0-48f9-b61a-dd1a9d5874f4",
      name: "楼梯",
    },
    {
      id: "900bcfe8-bd93-4a28-98c8-9d1ba4f3c212",
      name: "1207室D2户型",
    },
    {
      id: "4fd568bb-e40c-4ca7-a28b-0c3255335a85",
      name: "卧室",
    },
    {
      id: "46de7ddd-24f8-4310-b7a9-49dfb7c1ff24",
      name: "餐厅",
    },
    {
      id: "11e260f0-4731-4f1e-8249-8421dd1b1753",
      name: "1405室C户型",
    },
    {
      id: "e843e522-9dc5-41fe-af71-728ed6eb9766",
      name: "客厅",
    },
    {
      id: "b4a02321-74f1-4abf-af5d-f61aa0e5189e",
      name: "楼上厕所",
    },
    {
      id: "c8e0a474-d4fd-42c2-9165-05d118e9dbfb",
      name: "客厅",
    },
    {
      id: "ba1285c3-aab2-4f24-b5d5-2056d869f90b",
      name: "厨房",
    },
    {
      id: "1ac65f63-11f4-4819-b0aa-8bc0c521c499",
      name: "楼上卧室",
    },
    {
      id: "1d0d2e18-3ca1-4d5f-b794-ffa3098542f3",
      name: "走廊",
    },
    {
      id: "ca23ddc5-1d14-4e0d-9685-0812c279bbff",
      name: "厕所",
    },
    {
      id: "107bb2d6-dd0a-46a8-a609-653e61235c25",
      name: "楼下卧室",
    },
    {
      id: "3d9ec17e-f934-47ab-8093-d081996c9394",
      name: "楼上浴室",
    },
    {
      id: "3945038a-1906-4e37-aa95-afb26265d69d",
      name: "806室B户型",
    },
    {
      id: "f8a50d63-6510-4de5-8ea1-67325b2d690b",
      name: "1203室C1户型",
    },
    {
      id: "6cc9fdbd-c552-4f4c-8eb6-efc482a78273",
      name: "餐厅",
    },
    {
      id: "adf61866-ac2f-4b21-8680-62bc35043649",
      name: "厕所",
    },
    {
      id: "ad7dce3f-6073-41e7-b0d3-06a8337f0cce",
      name: "厕所2",
    },
    {
      id: "5c8bf011-4219-4467-87c2-4b8ab3b79205",
      name: "大厅",
    },
    {
      id: "0f5a1099-561f-4f05-a314-4f61f6549ce2",
      name: "楼梯",
    },
    {
      id: "6f66dd8f-7e27-4701-9aff-81143fc0bbc7",
      name: "1008室A1户型",
    },
    {
      id: "5b5bfdb6-041c-4861-93ad-534ab3ea244e",
      name: "1109室D2户型",
    },
    {
      id: "55b3c3e6-ce2c-4fcf-a57b-271a5516a30a",
      name: "13层",
    },
    {
      id: "2ad9e9a4-7376-4fb5-a10c-7d6996987d07",
      name: "卧室",
    },
    {
      id: "fb4c933b-c305-4dde-b5c3-3e962b9d7c6d",
      name: "厕所",
    },
    {
      id: "b5eceb9a-dae9-4850-a495-f94910f68253",
      name: "走廊",
    },
    {
      id: "bd62caa1-6812-4190-b629-d8596cc14d47",
      name: "卫生间",
    },
    {
      id: "1915c35e-a4d6-49eb-a4d7-bb515c7ce488",
      name: "401室K户型",
    },
    {
      id: "789c97dd-bd9e-4daa-8082-7157534fe89b",
      name: "餐厅",
    },
    {
      id: "d21ff40e-5b4d-4442-9f78-45f27dc1540d",
      name: "楼下卧室",
    },
    {
      id: "05de07bf-ac72-47f6-835d-6059b8f848f2",
      name: "楼上卧室",
    },
    {
      id: "75bbc3e2-fb98-4ab8-a174-2029990ee8a3",
      name: "卧室",
    },
    {
      id: "bbc15c05-37b0-4440-87cf-b90c1466fbc9",
      name: "客厅",
    },
    {
      id: "93862478-8896-42fa-81b2-0861156b71ca",
      name: "客厅",
    },
    {
      id: "b69b31eb-4a0a-4c79-97dc-fea32da5e74e",
      name: "卧室",
    },
    {
      id: "bb978422-3bc5-47c6-95bf-10a06c8ea18a",
      name: "卧室",
    },
    {
      id: "38aa31d1-5075-44bb-88df-8a8e2671ceaa",
      name: "客厅",
    },
    {
      id: "85d51851-872c-4fe6-89d0-b9e6bdf4c539",
      name: "厕所",
    },
    {
      id: "d89ef35f-2ab0-4f2d-b7dc-b43650a72b5e",
      name: "卫生间",
    },
    {
      id: "20d2866d-be3d-49c3-8acc-ecf276b503bc",
      name: "603室J户型",
    },
    {
      id: "e602eccd-1ee8-447b-b786-417b49319311",
      name: "卧室",
    },
    {
      id: "bb7afcee-9fb2-4485-81d4-d5daacaac41b",
      name: "走廊",
    },
    {
      id: "aa70c5a7-a3f7-4c33-911b-d4b4dad8f37d",
      name: "走廊",
    },
    {
      id: "34d218f3-d9e2-4171-a2f2-0b1782e7b974",
      name: "701室K户型",
    },
    {
      id: "cf4c4264-597e-4646-9091-99a7cf02fdca",
      name: "909室A2户型",
    },
    {
      id: "58e8594d-fd11-4dc9-b1c0-37c969bec0c8",
      name: "餐厅",
    },
    {
      id: "d6d933c3-5b40-4556-a1b6-3549e23c16e4",
      name: "客厅",
    },
    {
      id: "679e40dd-ee37-4e48-80f6-b000a1345a4f",
      name: "厕所",
    },
    {
      id: "4c4d8a60-05da-4cf6-bd6c-8bdaba25912e",
      name: "楼上卧室",
    },
    {
      id: "0bbad5bd-22a9-4e7e-a6cb-afcbd54643c2",
      name: "楼上走廊",
    },
    {
      id: "c82e7fdc-5b8b-4c87-ac19-c31bb5380544",
      name: "走廊",
    },
    {
      id: "c005dad0-7a55-4100-9ab6-16a51b7a553a",
      name: "次卧",
    },
    {
      id: "5f5f94e3-adbe-472d-8034-ae5bc2b725d9",
      name: "餐厅",
    },
    {
      id: "42f673c7-4bf2-45a9-9c1c-24ab526fefa8",
      name: "709室A2户型",
    },
    {
      id: "783c207c-1693-4c5d-b233-7f8317a1cbd8",
      name: "客厅",
    },
    {
      id: "70b28152-b734-46b8-9a3e-c6bb4f9ef7b9",
      name: "楼上卧室1",
    },
    {
      id: "fad6766a-c581-4c9a-9106-87d2dcc10bf0",
      name: "505室C户型",
    },
    {
      id: "6cc8bd33-363c-4df2-ab8f-f0fd271efe84",
      name: "907室B户型",
    },
    {
      id: "feb13c36-7d2d-4f7e-84a3-8a7be4337571",
      name: "厕所",
    },
    {
      id: "825acf63-759f-47ac-9380-2a3d5ccf4a0d",
      name: "大厅",
    },
    {
      id: "40f070e1-9395-4bbe-9f0f-d7544c4dabd8",
      name: "3层",
    },
    {
      id: "c69907f0-2308-49b6-a98c-ddb391a01e88",
      name: "6层",
    },
    {
      id: "069fb3dd-3a93-400c-8a7e-e9b30324faf7",
      name: "1103室C1户型",
    },
    {
      id: "0e3a368b-8d51-418d-9e64-67256b6f382f",
      name: "楼下厕所",
    },
    {
      id: "d7adb40d-d5b0-4e33-b666-42abdba8b71e",
      name: "卧室",
    },
    {
      id: "4ce300e6-b18c-4bd5-bf8f-facfc690cb3e",
      name: "208户型",
    },
    {
      id: "62cab3cc-2d83-4391-bb4b-8ec899e7f4bf",
      name: "卧室",
    },
    {
      id: "72092619-0abd-49a6-a2c7-2f77afc067bf",
      name: "903室C1户型",
    },
    {
      id: "06135d76-5fcd-4a21-849a-b6fc2bf6cb2e",
      name: "307户型",
    },
    {
      id: "44d7c151-7058-410d-bab6-57715223e278",
      name: "客厅",
    },
    {
      id: "c6b7c058-91b9-4a19-94ca-5e784803b57f",
      name: "305户型",
    },
    {
      id: "f74c1d2f-98f8-4ae7-93be-6b51aafdd01b",
      name: "12层",
    },
    {
      id: "4df62362-6131-4412-9679-ee22e7217c27",
      name: "厕所",
    },
    {
      id: "29571d5f-260a-4fa6-86c2-e70b95d22e7e",
      name: "餐厅",
    },
    {
      id: "af235e9d-47f1-4484-ad7f-87e363bc7599",
      name: "厨房",
    },
    {
      id: "9533918c-451c-4be7-a04f-0c75f67dc4ab",
      name: "餐厅",
    },
    {
      id: "9807b73d-a0cc-4d2f-abea-e1f0957a55db",
      name: "餐厅",
    },
    {
      id: "83bcc930-b610-4518-95c2-6402d22d943d",
      name: "卧室",
    },
    {
      id: "ff6026ea-9bd9-4b85-b3f3-8aaea37e4d1b",
      name: "卧室1",
    },
    {
      id: "74300cf3-4beb-4c6a-9c64-4f535ddd4cec",
      name: "楼上卧室",
    },
    {
      id: "93db3866-35b3-4cb4-b8e5-a4b20fffe64d",
      name: "503室J户型",
    },
    {
      id: "bb8c6da8-ba27-48c9-9187-b5d0fbee33a4",
      name: "卧室",
    },
    {
      id: "76ad3801-ccb4-4f03-963e-41d4553f7279",
      name: "卧室",
    },
    {
      id: "382f6450-fb9c-49d6-b610-14d8085232ca",
      name: "楼下卧室",
    },
    {
      id: "f91ac8ad-adf9-4dd9-b469-184161b769a9",
      name: "409室A2户型",
    },
    {
      id: "7cd071e9-4fa6-4ee1-b2cc-dbdc73ac451b",
      name: "卧室",
    },
    {
      id: "6ecb65c6-c56f-42f3-9a9b-7ec239ae4f75",
      name: "卫生间",
    },
    {
      id: "7e97457f-abe8-433e-a861-b7b326add468",
      name: "大厅",
    },
    {
      id: "6659d696-26ea-4083-88e0-ec7b16b8d29f",
      name: "楼下卧室",
    },
    {
      id: "9274e57e-d307-4b1a-9211-4709ca9daacf",
      name: "1303室C1户型",
    },
    {
      id: "16d050eb-1cd3-4f28-b5f0-195ce371ecb9",
      name: "书房",
    },
    {
      id: "644d6c71-acb9-41d8-9a56-22cc02c3bf5f",
      name: "客厅",
    },
    {
      id: "69053dbc-4fb3-4dbe-9aac-458b97133564",
      name: "卧室",
    },
    {
      id: "1bcdb6a8-39f0-4949-ab47-683b7c0bbd49",
      name: "大厅",
    },
    {
      id: "e186a74d-32a5-48cc-98de-cc811af2378e",
      name: "1201室C1户型",
    },
    {
      id: "5d3fb912-9551-4c5c-ba65-13d654c4e1a3",
      name: "客厅",
    },
    {
      id: "3608d175-6827-4584-af1e-c56662566cc5",
      name: "餐厅",
    },
    {
      id: "ce7d1a50-ffb5-4527-8188-bf722d15faa3",
      name: "餐厅",
    },
    {
      id: "2e3f1a9f-db67-49a7-871e-25df8bd43a7d",
      name: "客厅",
    },
    {
      id: "75a04ac2-9a37-41b6-beca-6258dcb7c5ed",
      name: "客厅",
    },
    {
      id: "43df946e-bba8-4f68-aa82-8b89f28f82fe",
      name: "楼梯",
    },
    {
      id: "fbc47646-af05-4415-a3bb-10a16f81fcef",
      name: "楼上厕所",
    },
    {
      id: "036e4b45-d99a-4425-80cf-0e3e7f56faa2",
      name: "卧室",
    },
    {
      id: "3c430036-2141-41c8-9a77-747240aa0349",
      name: "605室C户型",
    },
    {
      id: "21eca142-1270-4c9a-9c50-3902366b621d",
      name: "302户型",
    },
    {
      id: "d39e637b-d650-49af-93b6-646405c424dd",
      name: "卧室",
    },
    {
      id: "48a6c3eb-81f8-4eed-ba54-e8be3dd5e0c6",
      name: "客厅",
    },
    {
      id: "e9aed26d-012f-4c46-9c41-618a923fc265",
      name: "楼上卧室",
    },
    {
      id: "606131fe-7d6e-4537-a907-3b057534d709",
      name: "卧室",
    },
    {
      id: "6072bf4c-1778-4180-87bc-2e39ffddc2e0",
      name: "衣帽间",
    },
    {
      id: "2f7156ed-4f8c-418b-b3c2-e7f5c8d0fde0",
      name: "客厅",
    },
    {
      id: "e7f36771-0962-4329-bc5e-54296e87f355",
      name: "餐厅",
    },
    {
      id: "aa7401d0-e538-41f1-b46e-9c51b8bae98c",
      name: "楼上卧室",
    },
    {
      id: "33077ae9-6d8b-4d60-b46a-98628c17e26f",
      name: "1408室D3户型",
    },
    {
      id: "aa858e68-7493-4038-a0ee-523622a33f41",
      name: "客厅",
    },
    {
      id: "e4b87372-15a6-404d-b4b6-049f21257687",
      name: "1205室C户型",
    },
    {
      id: "f30ec2a3-c1d0-474a-820e-61005d334a94",
      name: "走廊",
    },
    {
      id: "8b0d77d9-eef2-4321-a676-dac3f60c495c",
      name: "606室B户型",
    },
    {
      id: "54e5161b-ad09-4a91-bdfa-09f0540a8d3c",
      name: "餐厅",
    },
    {
      id: "c41d4023-209c-4a57-8a2c-a37e5edaa055",
      name: "客厅",
    },
    {
      id: "db53e193-29bf-4f1b-b1d3-d9cdbec0a7e1",
      name: "卧室",
    },
    {
      id: "0053bb27-c918-4e89-bf97-d992d780b33a",
      name: "507室B户型",
    },
    {
      id: "bd0d6b05-fa7e-449d-8200-7119787c4d5d",
      name: "1003室C1户型",
    },
    {
      id: "5ad443d3-d07a-42a0-9f41-9594c278cb3c",
      name: "大厅",
    },
    {
      id: "879e61eb-0fca-49d6-a084-c75d917d99dd",
      name: "1202室C户型.",
    },
    {
      id: "36b7488c-95f0-49b7-8733-b14a211e022f",
      name: "卧室",
    },
    {
      id: "20a30670-2964-481c-a6a6-36e1479420dd",
      name: "走廊",
    },
    {
      id: "a33d847e-2cde-4690-8094-175fe364711b",
      name: "9层",
    },
    {
      id: "bbd6dcf9-7e6d-49fa-be5e-3fe4e1789e3b",
      name: "餐厅",
    },
    {
      id: "bac86be8-9c9a-4c8c-9d75-06de8b312343",
      name: "厕所",
    },
    {
      id: "43099aeb-1682-4d8a-a870-a4d6c9ccde1e",
      name: "楼上卧室",
    },
    {
      id: "96f44db0-aba8-47cb-8bb8-fe5963ea92f4",
      name: "卧室",
    },
    {
      id: "bcaee1fe-bcc7-4e12-a4bf-e9624ab79031",
      name: "客厅",
    },
    {
      id: "3f1694b8-d8f1-4395-b460-e11746a88909",
      name: "楼下厕所",
    },
    {
      id: "4fe6a571-4dec-4c79-812d-e423d876d2c0",
      name: "卧室",
    },
    {
      id: "cf0b4596-6024-4cda-a577-a39d47802743",
      name: "厕所",
    },
    {
      id: "0b086db4-f029-45e0-bfad-3b1107f690a1",
      name: "浴室",
    },
    {
      id: "73005cbb-617e-4b62-8134-4f41eaec440a",
      name: "餐厅",
    },
    {
      id: "ca276e4d-0b98-460f-946a-873cf5685203",
      name: "卧室",
    },
    {
      id: "ae8bb97a-e2be-49b3-b7c2-7513860760d8",
      name: "客厅",
    },
    {
      id: "86dd457f-1af0-4396-aad6-c82d22b2fc8e",
      name: "客厅",
    },
    {
      id: "046bfd5a-7157-4022-a28f-76acd582c2ce",
      name: "厨房",
    },
    {
      id: "c4b4d52c-fb7c-4d56-8230-14c897f3ca52",
      name: "厨房",
    },
    {
      id: "da835927-c5cd-4ab3-88af-2bfcace8c940",
      name: "楼下卧室",
    },
    {
      id: "03890ffd-3a6d-4204-a6b2-1274ec7d4b58",
      name: "楼下卧室",
    },
    {
      id: "d024a624-7eff-459d-9dfb-47e46e82c083",
      name: "楼下厕所",
    },
    {
      id: "efc0869c-d917-4d2c-90fa-b6861d0cb0ec",
      name: "卧室2",
    },
    {
      id: "057e6ddd-1721-4173-a0db-6b1879f77dd8",
      name: "客厅",
    },
    {
      id: "89bf7b7e-71a2-4792-a3d0-371d783ee1a5",
      name: "客厅",
    },
    {
      id: "2e536b53-fe76-424b-ac99-460efb22cc51",
      name: "卧室",
    },
    {
      id: "6d0fd896-8a19-471d-9aba-bec0d784299a",
      name: "大厅",
    },
    {
      id: "ebb570c1-b65a-4ce2-9000-306b11e79d10",
      name: "1301室C1户型",
    },
    {
      id: "5a3faaa3-6a7d-41fb-b2f7-9bc0161d8da7",
      name: "卧室",
    },
    {
      id: "63fce2ea-7185-481c-bd4a-29b911c9c774",
      name: "餐厅",
    },
    {
      id: "6cbae283-1d2d-4f09-9112-339602357742",
      name: "楼下厕所",
    },
    {
      id: "b816af6c-f052-4d2d-a0a2-09c61d9e519e",
      name: "客厅",
    },
    {
      id: "c44cfe4b-1e23-485b-a8ab-fe96d3d034e8",
      name: "楼下卧室",
    },
    {
      id: "39a500b3-649e-48ef-85d3-91b7a0334eae",
      name: "楼梯",
    },
    {
      id: "941e2050-26a5-471a-9561-04e81172d11c",
      name: "客厅",
    },
    {
      id: "4b2b59e0-da86-401a-80ba-a23e9d082247",
      name: "厕所",
    },
    {
      id: "b2f1c1c3-f007-46c0-beb6-b54dca5b54c8",
      name: "走廊",
    },
    {
      id: "b5f72ab5-5319-477e-aa21-963703326ad6",
      name: "卧室",
    },
    {
      id: "e6c305d9-bb50-40cc-be1b-f88b8995d444",
      name: "1308室D3户型",
    },
    {
      id: "a9120798-d8e2-453d-bef7-7add8757f48a",
      name: "506室B户型",
    },
    {
      id: "ac06a8df-fcea-4720-bf76-678fba415d28",
      name: "卧室2",
    },
    {
      id: "36593159-6b15-4c17-a6d4-c1180d2712f4",
      name: "客厅",
    },
    {
      id: "fc5d63ad-c7c2-4722-a308-f1363edddf3c",
      name: "主卧室",
    },
    {
      id: "82458ce3-dcd4-4df7-9ea8-8c4e069156b4",
      name: "卧室",
    },
    {
      id: "2e64b6e8-96d6-4878-ac34-cd7b5d76f0bc",
      name: "其它",
    },
    {
      id: "bcb14ce3-0b4d-4583-bbe9-a4909d218626",
      name: "楼上厕所",
    },
    {
      id: "98492c7c-8f9b-42fe-9c82-6619b1414a49",
      name: "楼下厕所",
    },
    {
      id: "90265b32-bebf-4a2c-9e15-75a1233ff4bf",
      name: "大厅",
    },
    {
      id: "25677514-ccc0-4360-b0f7-0db56843146e",
      name: "客厅",
    },
    {
      id: "977b5a1f-1427-4a14-b915-0179f6fabe40",
      name: "客厅",
    },
    {
      id: "ce75c925-0bf3-475a-b9b2-de38cdf49ae0",
      name: "浴室",
    },
    {
      id: "ce5ab339-91db-48b2-9013-96d683172956",
      name: "卫生间",
    },
    {
      id: "c79ec12e-8587-4e21-9aa5-2607923cc9e1",
      name: "卧室",
    },
    {
      id: "d11cc847-4584-45f7-9429-3216442dd4d3",
      name: "卧室",
    },
    {
      id: "77a2b170-92b4-460a-8f43-40318c123da2",
      name: "餐厅",
    },
    {
      id: "694088dd-3598-4d0a-b626-404ce2468ab8",
      name: "走廊",
    },
    {
      id: "7e14339f-44df-4851-8a2f-4c7c50cde27e",
      name: "餐厅",
    },
    {
      id: "3ea59de1-58f3-4642-892d-389e3eea6015",
      name: "餐厅",
    },
    {
      id: "40ca114d-679f-47c4-b6a4-49d3f01c8928",
      name: "楼梯",
    },
    {
      id: "ef697a65-0eb1-4290-b928-7ffe9d67f067",
      name: "厕所",
    },
    {
      id: "ccec0465-0835-45ae-99a3-0c0b734e28bf",
      name: "4层",
    },
    {
      id: "6dacdc11-32b1-4b35-88cf-38845e705fcf",
      name: "厕所",
    },
    {
      id: "24358274-eb81-4fc7-acbf-230444eaf144",
      name: "客厅",
    },
    {
      id: "7a05ab67-7b8b-4ba7-8689-f87259728d5f",
      name: "卧室",
    },
    {
      id: "1a3c7901-20b6-43af-aa45-13882251d4c7",
      name: "1105室C户型",
    },
    {
      id: "96635de8-71b4-49f2-ae52-93960d65d160",
      name: "卧室",
    },
    {
      id: "79e3225d-9421-4200-94fe-b2d1770d9937",
      name: "厨房",
    },
    {
      id: "f75233a1-eeef-4a50-93b2-0d17d0f26c78",
      name: "楼下厕所",
    },
    {
      id: "127db000-065c-447a-bb44-e47564defee8",
      name: "1306室D3户型",
    },
    {
      id: "d640b25c-2d88-4d4a-80ab-4cb6c682fcad",
      name: "楼梯",
    },
    {
      id: "31326089-ca15-4ca6-8e1d-32cef929b4ac",
      name: "楼下卧室",
    },
    {
      id: "736f0444-361f-4415-97dd-4f48f3c6c262",
      name: "207户型",
    },
    {
      id: "cd8685bb-7b35-4d71-9837-b096fa94e5a9",
      name: "10层",
    },
    {
      id: "2c164fed-c78a-4be9-9b63-d647fe64ed01",
      name: "客厅",
    },
    {
      id: "a7d3edc8-a5e9-452c-b727-98357e5716e1",
      name: "卧室",
    },
    {
      id: "87adecd3-1dbd-451c-9c74-515044e9cc29",
      name: "走廊",
    },
    {
      id: "2b3dda7e-4b18-4bdb-8829-639e4f2f2bda",
      name: "1401室C1户型",
    },
    {
      id: "48b2b731-7ab9-4658-9f41-33692cf8d35c",
      name: "厕所1",
    },
    {
      id: "452fa741-7a02-4980-a290-62fc691a840f",
      name: "1403室C1户型",
    },
    {
      id: "7d5c937b-9ba3-4e66-9c9c-fe6fc600ecb9",
      name: "905室C户型",
    },
    {
      id: "5e1edf4e-a85f-4d5b-83a4-5efaac67a3f7",
      name: "其它",
    },
    {
      id: "9119c637-517a-40c5-8d7a-663c0ceb6d8a",
      name: "大厅",
    },
  ],
  links: [
    {
      source: "b784ddc8-c7c6-431d-9630-5b3efe7d32d6",
      target: "4176b265-8c09-4ee2-8851-7550ad2ca41a",
    },
    {
      source: "5156750c-92e5-432d-9b34-737d25dd0330",
      target: "e38fafbb-cd14-4922-a56f-f0b5bd8b9559",
    },
    {
      source: "ec48ebae-cb04-4b27-9e8a-9ea7b9a24e98",
      target: "cf62b163-a54f-48ac-b080-7b1fa9b34de0",
    },
    {
      source: "97bf1a47-60e9-4058-be48-c498e0a587c5",
      target: "f74c1d2f-98f8-4ae7-93be-6b51aafdd01b",
    },
    {
      source: "25399e7b-3a2a-4308-8916-5703f54fb11a",
      target: "c6b7c058-91b9-4a19-94ca-5e784803b57f",
    },
    {
      source: "424123ad-12ad-4166-b142-4342b9a4ee9a",
      target: "e6c305d9-bb50-40cc-be1b-f88b8995d444",
    },
    {
      source: "671b799f-d605-4e63-806a-c8529d386f15",
      target: "e785d87b-acb0-40f9-aa40-0e031f4172cb",
    },
    {
      source: "67029b9a-e48d-480b-81c1-61cb617dec31",
      target: "1ee9a841-500b-4405-a899-3dfe8820d66b",
    },
    {
      source: "e2df84a0-e11f-4d13-adbf-e51f85125b81",
      target: "0f8b05bd-eeb0-464e-9a92-9434c90e28f7",
    },
    {
      source: "0bc72908-7834-4343-bab9-10d241780795",
      target: "5227f5b6-eaf2-4796-b12e-9e083bc8f5fe",
    },
    {
      source: "74a346dd-4954-4151-a07c-bc20f6958046",
      target: "8bd90bef-745d-4e8a-beea-1b6ea4d1dd4a",
    },
    {
      source: "6a142889-ec6a-4bd8-a0ef-52e1fdd351bb",
      target: "1915c35e-a4d6-49eb-a4d7-bb515c7ce488",
    },
    {
      source: "6516264f-b425-4b4a-94ce-9eb840b8181c",
      target: "5227f5b6-eaf2-4796-b12e-9e083bc8f5fe",
    },
    {
      source: "a5c29a6c-e14c-469a-b267-63566fb5d451",
      target: "c22dc394-6f36-4740-a74e-72f1dbbab100",
    },
    {
      source: "1d28cbaa-a8a5-4f64-b87a-8be01d421736",
      target: "08590185-f1c7-4610-afed-1798794e3bc6",
    },
    {
      source: "00c0d511-a184-4fb0-8eb4-cbf2e37e3e0d",
      target: "069fb3dd-3a93-400c-8a7e-e9b30324faf7",
    },
    {
      source: "6976a9cd-e22e-40d7-90d0-8bd893ead77b",
      target: "b8dacd71-6e07-4e71-9543-b50f55e4017c",
    },
    {
      source: "8819ca12-5136-4a24-973c-a5dda7edfabe",
      target: "736f0444-361f-4415-97dd-4f48f3c6c262",
    },
    {
      source: "ffef8bce-82d1-4e54-a92d-685614069e13",
      target: "b11df099-9f72-4b4d-bc1b-19e23e95f115",
    },
    {
      source: "b27e7be0-f003-4351-a58b-6796c5e92ef5",
      target: "cd8685bb-7b35-4d71-9837-b096fa94e5a9",
    },
    {
      source: "115a381c-4764-4f23-b47d-98f131b9b64a",
      target: "5364d84e-47ab-4b13-b1ad-3fa29a7c9119",
    },
    {
      source: "ed230c98-181c-46b3-b3a6-40541ff0f5bf",
      target: "f13c3d35-509e-4327-b7f4-a42e9edaee94",
    },
    {
      source: "27d2c03e-d26c-4af3-8575-04f90a1c05dd",
      target: "bd0d6b05-fa7e-449d-8200-7119787c4d5d",
    },
    {
      source: "50cafaab-1c96-479c-85b3-98450e66f3dd",
      target: "06135d76-5fcd-4a21-849a-b6fc2bf6cb2e",
    },
    {
      source: "7fb6f680-19c5-4874-b5c9-ce22ebaf3671",
      target: "ccec0465-0835-45ae-99a3-0c0b734e28bf",
    },
    {
      source: "08666896-c2fa-47a0-8acb-15414852f8a7",
      target: "9274e57e-d307-4b1a-9211-4709ca9daacf",
    },
    {
      source: "68498ecd-3a8b-4b60-a11c-3884dea19ab9",
      target: "1a3c7901-20b6-43af-aa45-13882251d4c7",
    },
    {
      source: "b082a77a-4ee7-4cd9-a6cc-0e2c850b0fd7",
      target: "72092619-0abd-49a6-a2c7-2f77afc067bf",
    },
    {
      source: "10c06957-93d8-4082-832d-cdf3b6e4d84f",
      target: "97bf1a47-60e9-4058-be48-c498e0a587c5",
    },
    {
      source: "ef08e8ff-1496-494d-b7d9-5f13fc0282ad",
      target: "6cc8bd33-363c-4df2-ab8f-f0fd271efe84",
    },
    {
      source: "badc59ea-7d39-4529-af22-7b2383140da5",
      target: "5b5bfdb6-041c-4861-93ad-534ab3ea244e",
    },
    {
      source: "e86f1a9f-5296-405e-9b6c-15887b4482d4",
      target: "f8a50d63-6510-4de5-8ea1-67325b2d690b",
    },
    {
      source: "85a5ab1f-c139-429b-a65b-68dadfaf46f1",
      target: "74a346dd-4954-4151-a07c-bc20f6958046",
    },
    {
      source: "4176b265-8c09-4ee2-8851-7550ad2ca41a",
      target: "91b92e5c-16ff-40ed-9245-aa8eb797acd1",
    },
    {
      source: "9750fe20-1b45-4bc2-a27a-74cb44ebd84a",
      target: "3c430036-2141-41c8-9a77-747240aa0349",
    },
    {
      source: "261aaf72-ba2a-4dae-bd11-fa75646312ea",
      target: "21eca142-1270-4c9a-9c50-3902366b621d",
    },
    {
      source: "3690c89e-6895-42dd-859b-7a6f2e7ce1a6",
      target: "3dbb1bef-2246-4af8-84ef-efa0c1b11418",
    },
    {
      source: "c2b6aff4-a282-41cf-9046-408a515840ac",
      target: "61d63d38-214b-420c-b6c7-9b863038779a",
    },
    {
      source: "222f5e1d-982b-47d6-ae5c-5bc96edcef94",
      target: "fea1e332-387e-4a8b-97c2-023e17b21db0",
    },
    {
      source: "9bf2f899-49bf-410f-8e7a-b20bc3e1bcee",
      target: "69ab5e7f-ad73-4be2-ab80-c229c32396ce",
    },
    {
      source: "5a5d0ef5-a7d3-47af-aae0-034c84b21a35",
      target: "29e125d4-bbdc-451c-88e3-b62a32d8515d",
    },
    {
      source: "1afe6458-ef13-488f-b486-13ac473bb391",
      target: "61d63d38-214b-420c-b6c7-9b863038779a",
    },
    {
      source: "35be6408-34eb-4170-852b-55df42c1a7b4",
      target: "3945038a-1906-4e37-aa95-afb26265d69d",
    },
    {
      source: "61d63d38-214b-420c-b6c7-9b863038779a",
      target: "3dbb1bef-2246-4af8-84ef-efa0c1b11418",
    },
    {
      source: "b26ae1a4-208c-45e3-a44f-55208f228879",
      target: "6f66dd8f-7e27-4701-9aff-81143fc0bbc7",
    },
    {
      source: "93f4c5b3-511f-4e46-ba3b-259450c4644b",
      target: "7d5c937b-9ba3-4e66-9c9c-fe6fc600ecb9",
    },
    {
      source: "d4f160ff-93c8-4efa-ab6e-a890779031d7",
      target: "e6c305d9-bb50-40cc-be1b-f88b8995d444",
    },
    {
      source: "296480b7-8e7a-470a-b0eb-303b03dfe516",
      target: "72092619-0abd-49a6-a2c7-2f77afc067bf",
    },
    {
      source: "9b393947-e968-4d88-94ce-6765f1035124",
      target: "f74c1d2f-98f8-4ae7-93be-6b51aafdd01b",
    },
    {
      source: "5d412cb9-f602-426d-afde-a0ffdb42f958",
      target: "55b3c3e6-ce2c-4fcf-a57b-271a5516a30a",
    },
    {
      source: "60a283ba-0125-4205-8b37-31032ac8afca",
      target: "8bd90bef-745d-4e8a-beea-1b6ea4d1dd4a",
    },
    {
      source: "0d390fe8-605c-43fd-a559-f27b1a99f730",
      target: "1ee9a841-500b-4405-a899-3dfe8820d66b",
    },
    {
      source: "d403aeba-0bbe-4922-a007-268f1bf8ba30",
      target: "671b799f-d605-4e63-806a-c8529d386f15",
    },
    {
      source: "ecd05be5-f89c-42e1-b5e0-f9d4897e4058",
      target: "3869bdf4-ade9-4d7f-b9a6-c501fd0da620",
    },
    {
      source: "926649d1-72e2-4192-b5a1-9f941ecfeae9",
      target: "4eb7bb85-6837-469d-af77-092ee2565e0f",
    },
    {
      source: "156438f3-8765-409b-9ea1-6bea3da01c32",
      target: "c7c9fab9-f918-47e7-a085-8cafffafc2ba",
    },
    {
      source: "8bd90bef-745d-4e8a-beea-1b6ea4d1dd4a",
      target: "root",
    },
    {
      source: "d70e36a5-47ba-4e3b-a28f-339bb1716e42",
      target: "b11df099-9f72-4b4d-bc1b-19e23e95f115",
    },
    {
      source: "08590185-f1c7-4610-afed-1798794e3bc6",
      target: "f74c1d2f-98f8-4ae7-93be-6b51aafdd01b",
    },
    {
      source: "f29b9b87-bc88-4e06-b5e1-b3affc4af551",
      target: "62d244e1-2f31-48fa-a5a1-42482f35cf62",
    },
    {
      source: "223d7f52-3c99-416d-8bc2-dc6e413c336e",
      target: "a33d847e-2cde-4690-8094-175fe364711b",
    },
    {
      source: "77b6f145-8691-4f8f-b5eb-bbba728a0ddc",
      target: "45650fca-78b9-4ab1-a876-742ec8897e29",
    },
    {
      source: "2a89bb10-2594-442e-85b5-40845d080c68",
      target: "c69907f0-2308-49b6-a98c-ddb391a01e88",
    },
    {
      source: "ae941fa0-3f49-4a10-84c9-3de6c8f55ff7",
      target: "c6b7c058-91b9-4a19-94ca-5e784803b57f",
    },
    {
      source: "c6ef4411-8cb1-437d-82e3-2927b5c72d2f",
      target: "69ab5e7f-ad73-4be2-ab80-c229c32396ce",
    },
    {
      source: "e8f26a41-beea-4da2-a777-d64f8978c568",
      target: "06135d76-5fcd-4a21-849a-b6fc2bf6cb2e",
    },
    {
      source: "3597c2d9-8783-425d-89d9-4bc51972608b",
      target: "30e8ab47-ecff-4288-83dd-c8a014eac7f9",
    },
    {
      source: "4eb7bb85-6837-469d-af77-092ee2565e0f",
      target: "40f070e1-9395-4bbe-9f0f-d7544c4dabd8",
    },
    {
      source: "e6f7cef4-0d4e-4747-ad1d-71b3c9658ce2",
      target: "55b3c3e6-ce2c-4fcf-a57b-271a5516a30a",
    },
    {
      source: "9b83fd35-2c64-48ab-9840-c244b5287ece",
      target: "fad6766a-c581-4c9a-9106-87d2dcc10bf0",
    },
    {
      source: "fe7c26a2-9074-44c5-b090-368a819c303e",
      target: "fad6766a-c581-4c9a-9106-87d2dcc10bf0",
    },
    {
      source: "253719e9-7782-462d-bdc1-bd9467a7a699",
      target: "d15c48c9-b424-45a8-8e69-82fc0656f19c",
    },
    {
      source: "363ea6db-c9a7-4dfa-8a80-f296c8eaad32",
      target: "93db3866-35b3-4cb4-b8e5-a4b20fffe64d",
    },
    {
      source: "fff144d4-7771-43d2-9c8b-3d63baa84d9e",
      target: "422bf665-9624-495b-8917-b1371c5bb2af",
    },
    {
      source: "1ee9a841-500b-4405-a899-3dfe8820d66b",
      target: "ccec0465-0835-45ae-99a3-0c0b734e28bf",
    },
    {
      source: "44f2b7fb-4a21-4daa-a18e-50e905eb735e",
      target: "ccec0465-0835-45ae-99a3-0c0b734e28bf",
    },
    {
      source: "273019d4-5106-4e85-9111-ab49d0d3ca29",
      target: "29e125d4-bbdc-451c-88e3-b62a32d8515d",
    },
    {
      source: "5227f5b6-eaf2-4796-b12e-9e083bc8f5fe",
      target: "a33d847e-2cde-4690-8094-175fe364711b",
    },
    {
      source: "570dcc10-b9ae-4aa4-aefb-63cd3ce0f821",
      target: "988f5148-c8bd-4fd1-9c2d-97f6c717e3dd",
    },
    {
      source: "c22dc394-6f36-4740-a74e-72f1dbbab100",
      target: "40f070e1-9395-4bbe-9f0f-d7544c4dabd8",
    },
    {
      source: "4ff01a3b-c200-4c64-bf5a-2d68addca02c",
      target: "c22dc394-6f36-4740-a74e-72f1dbbab100",
    },
    {
      source: "b8fa171e-0a05-4eab-9100-37ef0c525eda",
      target: "988f5148-c8bd-4fd1-9c2d-97f6c717e3dd",
    },
    {
      source: "3d78a211-309d-46cb-b8e1-9a6659d6adce",
      target: "4eb7bb85-6837-469d-af77-092ee2565e0f",
    },
    {
      source: "3629c398-0d83-4c0c-97c6-29e94e6042a7",
      target: "21eca142-1270-4c9a-9c50-3902366b621d",
    },
    {
      source: "55f40488-96ee-426e-bd1f-1f10464c1697",
      target: "43236681-dba8-4ff0-9e22-339be5888816",
    },
    {
      source: "08ec9f60-ba0d-43f5-b0df-dd68d65311f2",
      target: "f8a50d63-6510-4de5-8ea1-67325b2d690b",
    },
    {
      source: "658a8333-c019-4780-b7bd-225ce14b091c",
      target: "9274e57e-d307-4b1a-9211-4709ca9daacf",
    },
    {
      source: "e75ebd60-19fd-4724-87fb-825759510d6b",
      target: "6f66dd8f-7e27-4701-9aff-81143fc0bbc7",
    },
    {
      source: "193b3b43-a980-4af4-8dad-33ea2145a287",
      target: "8b0d77d9-eef2-4321-a676-dac3f60c495c",
    },
    {
      source: "0f6c0854-8710-4799-90b5-dda1d956929d",
      target: "41c36986-5525-46d1-8d0d-6703253b1505",
    },
    {
      source: "846f2a2f-432c-4525-ad3d-b0b46fb9f0b0",
      target: "4176b265-8c09-4ee2-8851-7550ad2ca41a",
    },
    {
      source: "96968a72-de39-4e61-a288-1ab9c8d8ab3f",
      target: "2b3dda7e-4b18-4bdb-8829-639e4f2f2bda",
    },
    {
      source: "cd0d3690-0b60-4a7a-80c2-55497e9a3797",
      target: "43236681-dba8-4ff0-9e22-339be5888816",
    },
    {
      source: "c67675db-869b-4258-9819-49321242ea6e",
      target: "60a283ba-0125-4205-8b37-31032ac8afca",
    },
    {
      source: "565f7bf4-d4f0-42d3-a7b0-0d29e769ca99",
      target: "e6c305d9-bb50-40cc-be1b-f88b8995d444",
    },
    {
      source: "a13a46a4-06b5-4100-bf55-b7e1c890ba7c",
      target: "b11df099-9f72-4b4d-bc1b-19e23e95f115",
    },
    {
      source: "dd2d95ef-cbdf-4ff2-8c1c-f0dd0d5ef126",
      target: "2a89bb10-2594-442e-85b5-40845d080c68",
    },
    {
      source: "3567f66c-3f08-4593-b089-9fea147e108a",
      target: "91b92e5c-16ff-40ed-9245-aa8eb797acd1",
    },
    {
      source: "597c87c2-15a6-4944-a8c5-b59b50bc208d",
      target: "d70e36a5-47ba-4e3b-a28f-339bb1716e42",
    },
    {
      source: "90e4b383-6d6a-4347-8053-a0af408b10b1",
      target: "1ee9a841-500b-4405-a899-3dfe8820d66b",
    },
    {
      source: "c16733cb-ff2f-4fb1-8ef2-b6e3a5fa5caf",
      target: "0bb3ea8f-5e2d-4ed6-b648-475c260293cf",
    },
    {
      source: "f8dfdf92-5339-40cd-86b9-4733fa97ad6c",
      target: "ffef8bce-82d1-4e54-a92d-685614069e13",
    },
    {
      source: "1481febb-b8db-431c-9f6d-533c00ad9897",
      target: "422bf665-9624-495b-8917-b1371c5bb2af",
    },
    {
      source: "7979974b-81e4-4dc8-aabe-78b40933aba1",
      target: "223d7f52-3c99-416d-8bc2-dc6e413c336e",
    },
    {
      source: "3dbfa0a8-44c0-4d45-865a-670bd4bcb769",
      target: "a13a46a4-06b5-4100-bf55-b7e1c890ba7c",
    },
    {
      source: "3a7a97c6-1c2e-4b72-820f-7b48158cd994",
      target: "e4b87372-15a6-404d-b4b6-049f21257687",
    },
    {
      source: "5d088f5b-3633-4962-82e0-97bb805a6e04",
      target: "422bf665-9624-495b-8917-b1371c5bb2af",
    },
    {
      source: "0663a7d2-b18a-4d9c-88d5-227c80568a9d",
      target: "e6f7cef4-0d4e-4747-ad1d-71b3c9658ce2",
    },
    {
      source: "27f6f554-5a51-4b79-9811-89645e35dfcd",
      target: "3dbb1bef-2246-4af8-84ef-efa0c1b11418",
    },
    {
      source: "43236681-dba8-4ff0-9e22-339be5888816",
      target: "40f070e1-9395-4bbe-9f0f-d7544c4dabd8",
    },
    {
      source: "a5a5a9a8-a915-46e3-888b-c69602f8c5a8",
      target: "44f2b7fb-4a21-4daa-a18e-50e905eb735e",
    },
    {
      source: "3967940e-f0da-460d-af48-acbfbe1f7343",
      target: "11e260f0-4731-4f1e-8249-8421dd1b1753",
    },
    {
      source: "f1079f0e-36e9-42a6-8d3a-1d31716fb71b",
      target: "11e260f0-4731-4f1e-8249-8421dd1b1753",
    },
    {
      source: "652e556e-c572-4497-b819-0f26c09a1995",
      target: "8b0d77d9-eef2-4321-a676-dac3f60c495c",
    },
    {
      source: "c7c9fab9-f918-47e7-a085-8cafffafc2ba",
      target: "40f070e1-9395-4bbe-9f0f-d7544c4dabd8",
    },
    {
      source: "15adecfa-bcbb-4853-8740-ed1258a4c4c0",
      target: "bd0d6b05-fa7e-449d-8200-7119787c4d5d",
    },
    {
      source: "d11ddb9a-45ca-4f54-877b-a4c4894f1e60",
      target: "6c269387-99dd-438c-a63b-6455f0a312c4",
    },
    {
      source: "233f14e9-655a-4842-a05c-37b5d82e8c24",
      target: "e785d87b-acb0-40f9-aa40-0e031f4172cb",
    },
    {
      source: "89fc1193-1a2a-4b5f-82fb-0aba58cd4850",
      target: "60a283ba-0125-4205-8b37-31032ac8afca",
    },
    {
      source: "700fd58d-45b0-4aa4-9fae-d819bc1ce69b",
      target: "b11df099-9f72-4b4d-bc1b-19e23e95f115",
    },
    {
      source: "f1881856-ae8e-41cd-b63b-73e77adadeb2",
      target: "45650fca-78b9-4ab1-a876-742ec8897e29",
    },
    {
      source: "bd598fb6-1d4f-4532-9d56-d718b55a0829",
      target: "5d412cb9-f602-426d-afde-a0ffdb42f958",
    },
    {
      source: "bf7b2d17-4cec-4828-8389-e68230169e39",
      target: "0053bb27-c918-4e89-bf97-d992d780b33a",
    },
    {
      source: "115bb65b-0c77-4439-bdbd-782858429064",
      target: "21eca142-1270-4c9a-9c50-3902366b621d",
    },
    {
      source: "003d8d1c-568a-4d2d-a145-e30eca2682dd",
      target: "5b5bfdb6-041c-4861-93ad-534ab3ea244e",
    },
    {
      source: "cf62b163-a54f-48ac-b080-7b1fa9b34de0",
      target: "c69907f0-2308-49b6-a98c-ddb391a01e88",
    },
    {
      source: "46537d85-a3c2-4144-acc8-703cc966d18d",
      target: "3869bdf4-ade9-4d7f-b9a6-c501fd0da620",
    },
    {
      source: "48b9b0ca-85c8-442d-8919-07927ec1bbe4",
      target: "c7c9fab9-f918-47e7-a085-8cafffafc2ba",
    },
    {
      source: "b8dacd71-6e07-4e71-9543-b50f55e4017c",
      target: "60a283ba-0125-4205-8b37-31032ac8afca",
    },
    {
      source: "93baba60-44b3-42c7-b6f2-f8f2d63fdfa1",
      target: "06135d76-5fcd-4a21-849a-b6fc2bf6cb2e",
    },
    {
      source: "422bf665-9624-495b-8917-b1371c5bb2af",
      target: "e785d87b-acb0-40f9-aa40-0e031f4172cb",
    },
    {
      source: "e38fafbb-cd14-4922-a56f-f0b5bd8b9559",
      target: "cd8685bb-7b35-4d71-9837-b096fa94e5a9",
    },
    {
      source: "ee7033d5-3a47-469a-91ff-a290fe784597",
      target: "671b799f-d605-4e63-806a-c8529d386f15",
    },
    {
      source: "5a26469a-b349-4aa0-95ca-62d84320d75d",
      target: "4ce300e6-b18c-4bd5-bf8f-facfc690cb3e",
    },
    {
      source: "58b7b1dd-3490-4cb4-b049-60eea748443f",
      target: "d70e36a5-47ba-4e3b-a28f-339bb1716e42",
    },
    {
      source: "f5c387d6-8868-4bf7-b583-470fb0ad19d1",
      target: "33077ae9-6d8b-4d60-b46a-98628c17e26f",
    },
    {
      source: "deecab90-6db4-4955-8c65-b244efd4e9b2",
      target: "21eca142-1270-4c9a-9c50-3902366b621d",
    },
    {
      source: "6c269387-99dd-438c-a63b-6455f0a312c4",
      target: "40f070e1-9395-4bbe-9f0f-d7544c4dabd8",
    },
    {
      source: "b18afafe-c8e4-44a2-bbef-d75302bcd446",
      target: "1625923f-90f7-40cc-88e3-bbf437082381",
    },
    {
      source: "a7f3d118-1ab4-458f-96b6-c427641d482f",
      target: "e4b87372-15a6-404d-b4b6-049f21257687",
    },
    {
      source: "3f146e97-de72-4d96-9f59-b106fb0ce6a7",
      target: "422bf665-9624-495b-8917-b1371c5bb2af",
    },
    {
      source: "20f34107-96d7-4edd-959e-5e0d45ba3b8d",
      target: "4eb7bb85-6837-469d-af77-092ee2565e0f",
    },
    {
      source: "f87cb9a5-d6fb-4de0-8fd7-b26750ea79bf",
      target: "41c36986-5525-46d1-8d0d-6703253b1505",
    },
    {
      source: "f13c3d35-509e-4327-b7f4-a42e9edaee94",
      target: "e785d87b-acb0-40f9-aa40-0e031f4172cb",
    },
    {
      source: "30facb9f-42aa-4387-a7ec-2c58c66ff27e",
      target: "1915c35e-a4d6-49eb-a4d7-bb515c7ce488",
    },
    {
      source: "d9c08eae-efe5-45aa-bddc-aa9709b1da71",
      target: "85a5ab1f-c139-429b-a65b-68dadfaf46f1",
    },
    {
      source: "fef9a2d3-bb88-48cd-8a7a-d8a05cf997bb",
      target: "cf62b163-a54f-48ac-b080-7b1fa9b34de0",
    },
    {
      source: "f11116d9-f050-46e8-9556-f7af34ecd7a3",
      target: "b8dacd71-6e07-4e71-9543-b50f55e4017c",
    },
    {
      source: "e33bca72-a484-4783-919f-624afb39bcff",
      target: "5b5bfdb6-041c-4861-93ad-534ab3ea244e",
    },
    {
      source: "b12d3f6f-93d7-42a8-b50c-aef65f6edde9",
      target: "29e125d4-bbdc-451c-88e3-b62a32d8515d",
    },
    {
      source: "9dea62a7-3620-49a6-8af1-15afc1070800",
      target: "a13a46a4-06b5-4100-bf55-b7e1c890ba7c",
    },
    {
      source: "02c88ec1-c56a-41f9-a87c-f31babcedf5c",
      target: "c6b7c058-91b9-4a19-94ca-5e784803b57f",
    },
    {
      source: "18459548-d916-47c6-b949-2c8a9a33deb5",
      target: "671b799f-d605-4e63-806a-c8529d386f15",
    },
    {
      source: "6123d87c-89e8-46ae-aae9-1876a524fc77",
      target: "736f0444-361f-4415-97dd-4f48f3c6c262",
    },
    {
      source: "5364d84e-47ab-4b13-b1ad-3fa29a7c9119",
      target: "cd8685bb-7b35-4d71-9837-b096fa94e5a9",
    },
    {
      source: "9c9210a1-219d-4c28-b1cd-9fc3b60c83fa",
      target: "7fb6f680-19c5-4874-b5c9-ce22ebaf3671",
    },
    {
      source: "54350d03-b23e-4937-8c3d-5e5988abee44",
      target: "5364d84e-47ab-4b13-b1ad-3fa29a7c9119",
    },
    {
      source: "d39bf20f-dab8-4977-a76d-c87fc808b190",
      target: "e38fafbb-cd14-4922-a56f-f0b5bd8b9559",
    },
    {
      source: "8d033129-ae99-4d89-9913-f3c1dbf34843",
      target: "cf4c4264-597e-4646-9091-99a7cf02fdca",
    },
    {
      source: "d955bb2b-b2b3-4e0b-b02c-4e90fc731aa7",
      target: "ff3d9763-712a-4286-85ff-7cd3b29b08a8",
    },
    {
      source: "994274d5-ff72-4f7e-b7e9-80f22b7a99d3",
      target: "20d2866d-be3d-49c3-8acc-ecf276b503bc",
    },
    {
      source: "c5747044-7c49-4882-827b-273aacb830fb",
      target: "900bcfe8-bd93-4a28-98c8-9d1ba4f3c212",
    },
    {
      source: "b6b30202-a721-45a7-a68c-89e35ae65c6d",
      target: "1915c35e-a4d6-49eb-a4d7-bb515c7ce488",
    },
    {
      source: "cefdef59-9a86-4a7b-add0-001c8632cd01",
      target: "42f673c7-4bf2-45a9-9c1c-24ab526fefa8",
    },
    {
      source: "269d45c0-e66c-42c3-bf47-10d26797a8b3",
      target: "4ce300e6-b18c-4bd5-bf8f-facfc690cb3e",
    },
    {
      source: "66ee6c1a-c04c-4842-a831-54499f910ab3",
      target: "21eca142-1270-4c9a-9c50-3902366b621d",
    },
    {
      source: "b11df099-9f72-4b4d-bc1b-19e23e95f115",
      target: "8bd90bef-745d-4e8a-beea-1b6ea4d1dd4a",
    },
    {
      source: "7b0d8b5f-67a2-49f3-afbd-719ffbfd23a8",
      target: "f91ac8ad-adf9-4dd9-b469-184161b769a9",
    },
    {
      source: "a3c2c87f-e027-4396-9e6e-bc5edef2d9fd",
      target: "c7c9fab9-f918-47e7-a085-8cafffafc2ba",
    },
    {
      source: "8ba590a5-d651-46bd-95b2-9c4646f51a66",
      target: "c67675db-869b-4258-9819-49321242ea6e",
    },
    {
      source: "7f7539a1-496e-45f7-b319-e78b485bce31",
      target: "60a283ba-0125-4205-8b37-31032ac8afca",
    },
    {
      source: "1625923f-90f7-40cc-88e3-bbf437082381",
      target: "3dbb1bef-2246-4af8-84ef-efa0c1b11418",
    },
    {
      source: "c562979d-23c2-4f06-bc16-e168f097f5fe",
      target: "97bf1a47-60e9-4058-be48-c498e0a587c5",
    },
    {
      source: "b18c1b17-57bc-4211-9724-dafacf41ad37",
      target: "ff3d9763-712a-4286-85ff-7cd3b29b08a8",
    },
    {
      source: "c8f5b3bf-a38c-40af-b66c-02f6c14ee209",
      target: "e38fafbb-cd14-4922-a56f-f0b5bd8b9559",
    },
    {
      source: "e3eb7729-6649-465e-bf30-10750975aa08",
      target: "c7c9fab9-f918-47e7-a085-8cafffafc2ba",
    },
    {
      source: "b82d8d0a-38e5-48a9-9838-9aaae9875f5b",
      target: "44f2b7fb-4a21-4daa-a18e-50e905eb735e",
    },
    {
      source: "df105e55-f93e-4365-b43e-e82a1ebbb3a2",
      target: "452fa741-7a02-4980-a290-62fc691a840f",
    },
    {
      source: "cbdbe83c-0a00-43bf-a7ad-bff4bd85d2d3",
      target: "ff3d9763-712a-4286-85ff-7cd3b29b08a8",
    },
    {
      source: "ab02474c-5007-450c-b3c5-49285a443b7f",
      target: "cd8685bb-7b35-4d71-9837-b096fa94e5a9",
    },
    {
      source: "1503809e-42fc-47d5-ab9a-e3d3831ffc57",
      target: "671b799f-d605-4e63-806a-c8529d386f15",
    },
    {
      source: "86758c98-bdd1-4bd2-9b70-58ced2efc513",
      target: "0053bb27-c918-4e89-bf97-d992d780b33a",
    },
    {
      source: "7c857010-a287-4068-bd4f-ec31648db5be",
      target: "e6c305d9-bb50-40cc-be1b-f88b8995d444",
    },
    {
      source: "3a56b0dc-f829-407b-98d5-ba45fb464c24",
      target: "736f0444-361f-4415-97dd-4f48f3c6c262",
    },
    {
      source: "ced6aa37-b2eb-4373-89eb-2fee7c4c2157",
      target: "43236681-dba8-4ff0-9e22-339be5888816",
    },
    {
      source: "fe967b58-a3c1-437a-81b9-948ad59938eb",
      target: "c67675db-869b-4258-9819-49321242ea6e",
    },
    {
      source: "466c872c-2cb5-416a-bddf-4aeda1447f18",
      target: "3690c89e-6895-42dd-859b-7a6f2e7ce1a6",
    },
    {
      source: "3869bdf4-ade9-4d7f-b9a6-c501fd0da620",
      target: "e785d87b-acb0-40f9-aa40-0e031f4172cb",
    },
    {
      source: "ba325ad0-5c56-4e38-afd0-8325b56875d0",
      target: "0f8b05bd-eeb0-464e-9a92-9434c90e28f7",
    },
    {
      source: "4ea3692f-3290-4f3f-8e43-04d53f08b0b3",
      target: "dec65496-ff8f-4120-a2a6-44c84b4c04f0",
    },
    {
      source: "3f44797d-d7f3-495b-afc0-1f74e8c370f1",
      target: "7d5c937b-9ba3-4e66-9c9c-fe6fc600ecb9",
    },
    {
      source: "1bc67759-28a7-4a7b-be71-7edc702b7153",
      target: "422bf665-9624-495b-8917-b1371c5bb2af",
    },
    {
      source: "4b05aad9-3d3e-46cd-bcbc-af4eaef4563a",
      target: "233f14e9-655a-4842-a05c-37b5d82e8c24",
    },
    {
      source: "29e125d4-bbdc-451c-88e3-b62a32d8515d",
      target: "ccec0465-0835-45ae-99a3-0c0b734e28bf",
    },
    {
      source: "91b92e5c-16ff-40ed-9245-aa8eb797acd1",
      target: "8bd90bef-745d-4e8a-beea-1b6ea4d1dd4a",
    },
    {
      source: "d6baadd1-2086-40b5-9d6d-31feb9f44df7",
      target: "0053bb27-c918-4e89-bf97-d992d780b33a",
    },
    {
      source: "7eb4b18d-9261-4e9d-9d05-a649ad9a6371",
      target: "72092619-0abd-49a6-a2c7-2f77afc067bf",
    },
    {
      source: "27008cff-01cf-4b92-b1c2-30256e7924bc",
      target: "b27e7be0-f003-4351-a58b-6796c5e92ef5",
    },
    {
      source: "473ee566-94c5-4e9b-b836-066325fe5162",
      target: "0053bb27-c918-4e89-bf97-d992d780b33a",
    },
    {
      source: "b84f1a1d-3cdb-4e21-957e-dcf7db7e3875",
      target: "34d218f3-d9e2-4171-a2f2-0b1782e7b974",
    },
    {
      source: "cc7afd17-5924-4a92-b392-f3ec702ca0e5",
      target: "b8dacd71-6e07-4e71-9543-b50f55e4017c",
    },
    {
      source: "28cec7e5-d3e7-44e7-839f-04ff8490437c",
      target: "93db3866-35b3-4cb4-b8e5-a4b20fffe64d",
    },
    {
      source: "74296f05-4ed3-42a2-8ca0-2eeac34a6e7d",
      target: "422bf665-9624-495b-8917-b1371c5bb2af",
    },
    {
      source: "def926ac-2cbf-486c-b8f3-5ec362225c27",
      target: "422bf665-9624-495b-8917-b1371c5bb2af",
    },
    {
      source: "01da86ab-06a0-4b30-a53a-2e6170690f15",
      target: "41c36986-5525-46d1-8d0d-6703253b1505",
    },
    {
      source: "dec65496-ff8f-4120-a2a6-44c84b4c04f0",
      target: "91b92e5c-16ff-40ed-9245-aa8eb797acd1",
    },
    {
      source: "4ecc0c40-b5a4-4b40-82a0-8768fff33726",
      target: "f91ac8ad-adf9-4dd9-b469-184161b769a9",
    },
    {
      source: "84aaa49a-1c42-428c-9449-860ad3de75a2",
      target: "ab02474c-5007-450c-b3c5-49285a443b7f",
    },
    {
      source: "af1a315e-9045-480e-a712-f7c5aee8023e",
      target: "d70e36a5-47ba-4e3b-a28f-339bb1716e42",
    },
    {
      source: "fac63a22-d0ab-43d2-9e54-9b032f06f673",
      target: "69ab5e7f-ad73-4be2-ab80-c229c32396ce",
    },
    {
      source: "5a6fabe2-dda7-4524-a20f-f44e452ad607",
      target: "988f5148-c8bd-4fd1-9c2d-97f6c717e3dd",
    },
    {
      source: "c8037afa-ba2f-4630-bd14-ee31ae8e275a",
      target: "233f14e9-655a-4842-a05c-37b5d82e8c24",
    },
    {
      source: "aeceb453-bb54-457b-8516-73eec25139dd",
      target: "ebb570c1-b65a-4ce2-9000-306b11e79d10",
    },
    {
      source: "0f8b05bd-eeb0-464e-9a92-9434c90e28f7",
      target: "55b3c3e6-ce2c-4fcf-a57b-271a5516a30a",
    },
    {
      source: "ada0ceb3-68cc-4b29-89e7-1ed876ecca1a",
      target: "0f8b05bd-eeb0-464e-9a92-9434c90e28f7",
    },
    {
      source: "2305baa4-0b27-4779-9716-92b3e44ec5c5",
      target: "6cc8bd33-363c-4df2-ab8f-f0fd271efe84",
    },
    {
      source: "b65106f6-ecb0-4b23-877d-09287719727b",
      target: "ff3d9763-712a-4286-85ff-7cd3b29b08a8",
    },
    {
      source: "988f5148-c8bd-4fd1-9c2d-97f6c717e3dd",
      target: "c69907f0-2308-49b6-a98c-ddb391a01e88",
    },
    {
      source: "430f26aa-04aa-4c55-b9dd-c8dfa7f22f06",
      target: "3c430036-2141-41c8-9a77-747240aa0349",
    },
    {
      source: "4070465e-c132-413a-9ad6-95d28048ec5b",
      target: "9b393947-e968-4d88-94ce-6765f1035124",
    },
    {
      source: "41c36986-5525-46d1-8d0d-6703253b1505",
      target: "e785d87b-acb0-40f9-aa40-0e031f4172cb",
    },
    {
      source: "0bb3ea8f-5e2d-4ed6-b648-475c260293cf",
      target: "91b92e5c-16ff-40ed-9245-aa8eb797acd1",
    },
    {
      source: "bf940e9b-875b-4fc4-a88d-ebc5bca051f8",
      target: "1ee9a841-500b-4405-a899-3dfe8820d66b",
    },
    {
      source: "54697bbe-f962-4255-85e7-f9563b823a08",
      target: "a9120798-d8e2-453d-bef7-7add8757f48a",
    },
    {
      source: "c8b9d4fb-b8d9-40ef-947a-88d3c53d3799",
      target: "b27e7be0-f003-4351-a58b-6796c5e92ef5",
    },
    {
      source: "45650fca-78b9-4ab1-a876-742ec8897e29",
      target: "c69907f0-2308-49b6-a98c-ddb391a01e88",
    },
    {
      source: "8e1a2dc9-0638-4cc4-93ee-2768433b552a",
      target: "223d7f52-3c99-416d-8bc2-dc6e413c336e",
    },
    {
      source: "5a19d7c9-d513-42f2-baa8-7bd4db7092b1",
      target: "cf4c4264-597e-4646-9091-99a7cf02fdca",
    },
    {
      source: "2bb70eb3-26c2-46f1-b3da-4c52d4e87e58",
      target: "41c36986-5525-46d1-8d0d-6703253b1505",
    },
    {
      source: "6c0a91be-71c5-4311-b60b-f249e70258bd",
      target: "f13c3d35-509e-4327-b7f4-a42e9edaee94",
    },
    {
      source: "7084ef55-c145-4d5b-89e8-f3b6c53ee281",
      target: "c6b7c058-91b9-4a19-94ca-5e784803b57f",
    },
    {
      source: "e315756c-4a81-4c0a-bbaa-a087919c2326",
      target: "e6f7cef4-0d4e-4747-ad1d-71b3c9658ce2",
    },
    {
      source: "971cfa85-3291-47ce-8036-f0f34e548d2d",
      target: "a13a46a4-06b5-4100-bf55-b7e1c890ba7c",
    },
    {
      source: "558fe29e-0d03-4614-b3e7-94c78bb14641",
      target: "3567f66c-3f08-4593-b089-9fea147e108a",
    },
    {
      source: "729ed299-18a0-448c-86b7-524beedbbcab",
      target: "89fc1193-1a2a-4b5f-82fb-0aba58cd4850",
    },
    {
      source: "052b5817-b1fb-44a0-bbb4-e0e3c64b8473",
      target: "06135d76-5fcd-4a21-849a-b6fc2bf6cb2e",
    },
    {
      source: "c0856099-c385-444b-866e-77e18625e9a6",
      target: "b27e7be0-f003-4351-a58b-6796c5e92ef5",
    },
    {
      source: "e6a383a3-625d-4257-be8a-66fdd4afb06f",
      target: "08590185-f1c7-4610-afed-1798794e3bc6",
    },
    {
      source: "38348f91-4888-4644-b3f0-b79e6697cbd1",
      target: "f13c3d35-509e-4327-b7f4-a42e9edaee94",
    },
    {
      source: "4ec54efe-a9bb-43be-a4ca-86604dd97e2d",
      target: "41c36986-5525-46d1-8d0d-6703253b1505",
    },
    {
      source: "2c520769-62f5-4450-afab-ba5a2c0f5343",
      target: "d70e36a5-47ba-4e3b-a28f-339bb1716e42",
    },
    {
      source: "6a6264ce-1473-47c8-9880-cf6f79527e0b",
      target: "6c269387-99dd-438c-a63b-6455f0a312c4",
    },
    {
      source: "2200f0d4-19fd-4429-808f-6e56ee9f935f",
      target: "5d412cb9-f602-426d-afde-a0ffdb42f958",
    },
    {
      source: "e5660912-531a-4270-925a-30e37442400e",
      target: "7fb6f680-19c5-4874-b5c9-ce22ebaf3671",
    },
    {
      source: "62d244e1-2f31-48fa-a5a1-42482f35cf62",
      target: "74a346dd-4954-4151-a07c-bc20f6958046",
    },
    {
      source: "ff3d9763-712a-4286-85ff-7cd3b29b08a8",
      target: "b11df099-9f72-4b4d-bc1b-19e23e95f115",
    },
    {
      source: "fea1e332-387e-4a8b-97c2-023e17b21db0",
      target: "74a346dd-4954-4151-a07c-bc20f6958046",
    },
    {
      source: "84a30d8f-8365-49df-9a3d-3ca62d6982f8",
      target: "3567f66c-3f08-4593-b089-9fea147e108a",
    },
    {
      source: "ca04a399-c85d-4e51-a632-733f081114d3",
      target: "dec65496-ff8f-4120-a2a6-44c84b4c04f0",
    },
    {
      source: "46d47f04-6f88-44da-abaa-3cad41b657f7",
      target: "62d244e1-2f31-48fa-a5a1-42482f35cf62",
    },
    {
      source: "146a90fe-eaab-4938-8261-65999bff3bab",
      target: "c22dc394-6f36-4740-a74e-72f1dbbab100",
    },
    {
      source: "5e8759df-579a-493e-88bb-9bd485c08113",
      target: "9b393947-e968-4d88-94ce-6765f1035124",
    },
    {
      source: "22b7648a-0071-44d1-98d2-cc5909c0582e",
      target: "0bb3ea8f-5e2d-4ed6-b648-475c260293cf",
    },
    {
      source: "b5b77bcd-69d5-491d-b508-fce796db0750",
      target: "33077ae9-6d8b-4d60-b46a-98628c17e26f",
    },
    {
      source: "69ab5e7f-ad73-4be2-ab80-c229c32396ce",
      target: "ccec0465-0835-45ae-99a3-0c0b734e28bf",
    },
    {
      source: "82eecd80-6d3a-4494-ba90-4c7e4e5863ed",
      target: "30e8ab47-ecff-4288-83dd-c8a014eac7f9",
    },
    {
      source: "df143b9f-5096-47c8-b6a1-41440297339f",
      target: "ffef8bce-82d1-4e54-a92d-685614069e13",
    },
    {
      source: "3561f8df-f603-494d-a12c-e731f4db62de",
      target: "33077ae9-6d8b-4d60-b46a-98628c17e26f",
    },
    {
      source: "32de4ef8-8562-4b28-8861-ff61d563432d",
      target: "b8dacd71-6e07-4e71-9543-b50f55e4017c",
    },
    {
      source: "1800050b-7e73-4a33-94b0-509457274acc",
      target: "f8a50d63-6510-4de5-8ea1-67325b2d690b",
    },
    {
      source: "a69aa485-a5d6-41ae-ba77-c765fb75488c",
      target: "ab02474c-5007-450c-b3c5-49285a443b7f",
    },
    {
      source: "f39aaecd-98da-4799-b424-5db2575ad4a5",
      target: "2a89bb10-2594-442e-85b5-40845d080c68",
    },
    {
      source: "dbcea84f-a833-4ef9-810e-16171062263a",
      target: "e38fafbb-cd14-4922-a56f-f0b5bd8b9559",
    },
    {
      source: "9621d84e-a95e-4cb8-94c7-b925f8bb1848",
      target: "97bf1a47-60e9-4058-be48-c498e0a587c5",
    },
    {
      source: "04e438c8-f4a7-43d3-ad13-ecd21ee5a50c",
      target: "bd0d6b05-fa7e-449d-8200-7119787c4d5d",
    },
    {
      source: "aca851d2-dfd0-44cf-94f2-baae339d6625",
      target: "4ce300e6-b18c-4bd5-bf8f-facfc690cb3e",
    },
    {
      source: "1a3fad3c-5a71-4a9f-9295-c0ff524bf7dc",
      target: "c6b7c058-91b9-4a19-94ca-5e784803b57f",
    },
    {
      source: "30e8ab47-ecff-4288-83dd-c8a014eac7f9",
      target: "60a283ba-0125-4205-8b37-31032ac8afca",
    },
    {
      source: "e785d87b-acb0-40f9-aa40-0e031f4172cb",
      target: "8bd90bef-745d-4e8a-beea-1b6ea4d1dd4a",
    },
    {
      source: "d15c48c9-b424-45a8-8e69-82fc0656f19c",
      target: "91b92e5c-16ff-40ed-9245-aa8eb797acd1",
    },
    {
      source: "3dbb1bef-2246-4af8-84ef-efa0c1b11418",
      target: "8bd90bef-745d-4e8a-beea-1b6ea4d1dd4a",
    },
    {
      source: "28a19aaf-6827-4392-bd10-53f44f3e7a2a",
      target: "33077ae9-6d8b-4d60-b46a-98628c17e26f",
    },
    {
      source: "3a749af4-5cab-4ced-a81e-f2f803f44ccd",
      target: "2b3dda7e-4b18-4bdb-8829-639e4f2f2bda",
    },
    {
      source: "3ff424a6-2ca4-489d-8a50-1db2d56c6140",
      target: "e6f7cef4-0d4e-4747-ad1d-71b3c9658ce2",
    },
    {
      source: "8acf9317-a9c0-47ea-b51b-4008fbe799fc",
      target: "cf62b163-a54f-48ac-b080-7b1fa9b34de0",
    },
    {
      source: "978b873a-dde0-48f9-b61a-dd1a9d5874f4",
      target: "c22dc394-6f36-4740-a74e-72f1dbbab100",
    },
    {
      source: "900bcfe8-bd93-4a28-98c8-9d1ba4f3c212",
      target: "f74c1d2f-98f8-4ae7-93be-6b51aafdd01b",
    },
    {
      source: "4fd568bb-e40c-4ca7-a28b-0c3255335a85",
      target: "d15c48c9-b424-45a8-8e69-82fc0656f19c",
    },
    {
      source: "46de7ddd-24f8-4310-b7a9-49dfb7c1ff24",
      target: "7d5c937b-9ba3-4e66-9c9c-fe6fc600ecb9",
    },
    {
      source: "11e260f0-4731-4f1e-8249-8421dd1b1753",
      target: "3dbb1bef-2246-4af8-84ef-efa0c1b11418",
    },
    {
      source: "e843e522-9dc5-41fe-af71-728ed6eb9766",
      target: "9274e57e-d307-4b1a-9211-4709ca9daacf",
    },
    {
      source: "b4a02321-74f1-4abf-af5d-f61aa0e5189e",
      target: "736f0444-361f-4415-97dd-4f48f3c6c262",
    },
    {
      source: "c8e0a474-d4fd-42c2-9165-05d118e9dbfb",
      target: "e38fafbb-cd14-4922-a56f-f0b5bd8b9559",
    },
    {
      source: "ba1285c3-aab2-4f24-b5d5-2056d869f90b",
      target: "43236681-dba8-4ff0-9e22-339be5888816",
    },
    {
      source: "1ac65f63-11f4-4819-b0aa-8bc0c521c499",
      target: "c22dc394-6f36-4740-a74e-72f1dbbab100",
    },
    {
      source: "1d0d2e18-3ca1-4d5f-b794-ffa3098542f3",
      target: "0bb3ea8f-5e2d-4ed6-b648-475c260293cf",
    },
    {
      source: "ca23ddc5-1d14-4e0d-9685-0812c279bbff",
      target: "d70e36a5-47ba-4e3b-a28f-339bb1716e42",
    },
    {
      source: "107bb2d6-dd0a-46a8-a609-653e61235c25",
      target: "671b799f-d605-4e63-806a-c8529d386f15",
    },
    {
      source: "3d9ec17e-f934-47ab-8093-d081996c9394",
      target: "6c269387-99dd-438c-a63b-6455f0a312c4",
    },
    {
      source: "3945038a-1906-4e37-aa95-afb26265d69d",
      target: "91b92e5c-16ff-40ed-9245-aa8eb797acd1",
    },
    {
      source: "f8a50d63-6510-4de5-8ea1-67325b2d690b",
      target: "f74c1d2f-98f8-4ae7-93be-6b51aafdd01b",
    },
    {
      source: "6cc9fdbd-c552-4f4c-8eb6-efc482a78273",
      target: "29e125d4-bbdc-451c-88e3-b62a32d8515d",
    },
    {
      source: "adf61866-ac2f-4b21-8680-62bc35043649",
      target: "3945038a-1906-4e37-aa95-afb26265d69d",
    },
    {
      source: "ad7dce3f-6073-41e7-b0d3-06a8337f0cce",
      target: "5b5bfdb6-041c-4861-93ad-534ab3ea244e",
    },
    {
      source: "5c8bf011-4219-4467-87c2-4b8ab3b79205",
      target: "4ce300e6-b18c-4bd5-bf8f-facfc690cb3e",
    },
    {
      source: "0f5a1099-561f-4f05-a314-4f61f6549ce2",
      target: "4eb7bb85-6837-469d-af77-092ee2565e0f",
    },
    {
      source: "6f66dd8f-7e27-4701-9aff-81143fc0bbc7",
      target: "cd8685bb-7b35-4d71-9837-b096fa94e5a9",
    },
    {
      source: "5b5bfdb6-041c-4861-93ad-534ab3ea244e",
      target: "60a283ba-0125-4205-8b37-31032ac8afca",
    },
    {
      source: "55b3c3e6-ce2c-4fcf-a57b-271a5516a30a",
      target: "8bd90bef-745d-4e8a-beea-1b6ea4d1dd4a",
    },
    {
      source: "2ad9e9a4-7376-4fb5-a10c-7d6996987d07",
      target: "3945038a-1906-4e37-aa95-afb26265d69d",
    },
    {
      source: "fb4c933b-c305-4dde-b5c3-3e962b9d7c6d",
      target: "452fa741-7a02-4980-a290-62fc691a840f",
    },
    {
      source: "b5eceb9a-dae9-4850-a495-f94910f68253",
      target: "3c430036-2141-41c8-9a77-747240aa0349",
    },
    {
      source: "bd62caa1-6812-4190-b629-d8596cc14d47",
      target: "cf62b163-a54f-48ac-b080-7b1fa9b34de0",
    },
    {
      source: "1915c35e-a4d6-49eb-a4d7-bb515c7ce488",
      target: "ccec0465-0835-45ae-99a3-0c0b734e28bf",
    },
    {
      source: "789c97dd-bd9e-4daa-8082-7157534fe89b",
      target: "fad6766a-c581-4c9a-9106-87d2dcc10bf0",
    },
    {
      source: "d21ff40e-5b4d-4442-9f78-45f27dc1540d",
      target: "f13c3d35-509e-4327-b7f4-a42e9edaee94",
    },
    {
      source: "05de07bf-ac72-47f6-835d-6059b8f848f2",
      target: "f13c3d35-509e-4327-b7f4-a42e9edaee94",
    },
    {
      source: "75bbc3e2-fb98-4ab8-a174-2029990ee8a3",
      target: "e4b87372-15a6-404d-b4b6-049f21257687",
    },
    {
      source: "bbc15c05-37b0-4440-87cf-b90c1466fbc9",
      target: "1ee9a841-500b-4405-a899-3dfe8820d66b",
    },
    {
      source: "93862478-8896-42fa-81b2-0861156b71ca",
      target: "223d7f52-3c99-416d-8bc2-dc6e413c336e",
    },
    {
      source: "b69b31eb-4a0a-4c79-97dc-fea32da5e74e",
      target: "b27e7be0-f003-4351-a58b-6796c5e92ef5",
    },
    {
      source: "bb978422-3bc5-47c6-95bf-10a06c8ea18a",
      target: "20d2866d-be3d-49c3-8acc-ecf276b503bc",
    },
    {
      source: "38aa31d1-5075-44bb-88df-8a8e2671ceaa",
      target: "42f673c7-4bf2-45a9-9c1c-24ab526fefa8",
    },
    {
      source: "85d51851-872c-4fe6-89d0-b9e6bdf4c539",
      target: "3567f66c-3f08-4593-b089-9fea147e108a",
    },
    {
      source: "d89ef35f-2ab0-4f2d-b7dc-b43650a72b5e",
      target: "27f6f554-5a51-4b79-9811-89645e35dfcd",
    },
    {
      source: "20d2866d-be3d-49c3-8acc-ecf276b503bc",
      target: "c69907f0-2308-49b6-a98c-ddb391a01e88",
    },
    {
      source: "e602eccd-1ee8-447b-b786-417b49319311",
      target: "5227f5b6-eaf2-4796-b12e-9e083bc8f5fe",
    },
    {
      source: "bb7afcee-9fb2-4485-81d4-d5daacaac41b",
      target: "e186a74d-32a5-48cc-98de-cc811af2378e",
    },
    {
      source: "aa70c5a7-a3f7-4c33-911b-d4b4dad8f37d",
      target: "879e61eb-0fca-49d6-a084-c75d917d99dd",
    },
    {
      source: "34d218f3-d9e2-4171-a2f2-0b1782e7b974",
      target: "b11df099-9f72-4b4d-bc1b-19e23e95f115",
    },
    {
      source: "cf4c4264-597e-4646-9091-99a7cf02fdca",
      target: "a33d847e-2cde-4690-8094-175fe364711b",
    },
    {
      source: "58e8594d-fd11-4dc9-b1c0-37c969bec0c8",
      target: "42f673c7-4bf2-45a9-9c1c-24ab526fefa8",
    },
    {
      source: "d6d933c3-5b40-4556-a1b6-3549e23c16e4",
      target: "a9120798-d8e2-453d-bef7-7add8757f48a",
    },
    {
      source: "679e40dd-ee37-4e48-80f6-b000a1345a4f",
      target: "fad6766a-c581-4c9a-9106-87d2dcc10bf0",
    },
    {
      source: "4c4d8a60-05da-4cf6-bd6c-8bdaba25912e",
      target: "422bf665-9624-495b-8917-b1371c5bb2af",
    },
    {
      source: "0bbad5bd-22a9-4e7e-a6cb-afcbd54643c2",
      target: "4eb7bb85-6837-469d-af77-092ee2565e0f",
    },
    {
      source: "c82e7fdc-5b8b-4c87-ac19-c31bb5380544",
      target: "7fb6f680-19c5-4874-b5c9-ce22ebaf3671",
    },
    {
      source: "c005dad0-7a55-4100-9ab6-16a51b7a553a",
      target: "97bf1a47-60e9-4058-be48-c498e0a587c5",
    },
    {
      source: "5f5f94e3-adbe-472d-8034-ae5bc2b725d9",
      target: "1a3c7901-20b6-43af-aa45-13882251d4c7",
    },
    {
      source: "42f673c7-4bf2-45a9-9c1c-24ab526fefa8",
      target: "b11df099-9f72-4b4d-bc1b-19e23e95f115",
    },
    {
      source: "783c207c-1693-4c5d-b233-7f8317a1cbd8",
      target: "3945038a-1906-4e37-aa95-afb26265d69d",
    },
    {
      source: "70b28152-b734-46b8-9a3e-c6bb4f9ef7b9",
      target: "43236681-dba8-4ff0-9e22-339be5888816",
    },
    {
      source: "fad6766a-c581-4c9a-9106-87d2dcc10bf0",
      target: "74a346dd-4954-4151-a07c-bc20f6958046",
    },
    {
      source: "6cc8bd33-363c-4df2-ab8f-f0fd271efe84",
      target: "a33d847e-2cde-4690-8094-175fe364711b",
    },
    {
      source: "feb13c36-7d2d-4f7e-84a3-8a7be4337571",
      target: "1a3c7901-20b6-43af-aa45-13882251d4c7",
    },
    {
      source: "825acf63-759f-47ac-9380-2a3d5ccf4a0d",
      target: "671b799f-d605-4e63-806a-c8529d386f15",
    },
    {
      source: "40f070e1-9395-4bbe-9f0f-d7544c4dabd8",
      target: "8bd90bef-745d-4e8a-beea-1b6ea4d1dd4a",
    },
    {
      source: "c69907f0-2308-49b6-a98c-ddb391a01e88",
      target: "8bd90bef-745d-4e8a-beea-1b6ea4d1dd4a",
    },
    {
      source: "069fb3dd-3a93-400c-8a7e-e9b30324faf7",
      target: "60a283ba-0125-4205-8b37-31032ac8afca",
    },
    {
      source: "0e3a368b-8d51-418d-9e64-67256b6f382f",
      target: "4eb7bb85-6837-469d-af77-092ee2565e0f",
    },
    {
      source: "d7adb40d-d5b0-4e33-b666-42abdba8b71e",
      target: "41c36986-5525-46d1-8d0d-6703253b1505",
    },
    {
      source: "4ce300e6-b18c-4bd5-bf8f-facfc690cb3e",
      target: "e785d87b-acb0-40f9-aa40-0e031f4172cb",
    },
    {
      source: "62cab3cc-2d83-4391-bb4b-8ec899e7f4bf",
      target: "4176b265-8c09-4ee2-8851-7550ad2ca41a",
    },
    {
      source: "72092619-0abd-49a6-a2c7-2f77afc067bf",
      target: "a33d847e-2cde-4690-8094-175fe364711b",
    },
    {
      source: "06135d76-5fcd-4a21-849a-b6fc2bf6cb2e",
      target: "40f070e1-9395-4bbe-9f0f-d7544c4dabd8",
    },
    {
      source: "44d7c151-7058-410d-bab6-57715223e278",
      target: "8b0d77d9-eef2-4321-a676-dac3f60c495c",
    },
    {
      source: "c6b7c058-91b9-4a19-94ca-5e784803b57f",
      target: "40f070e1-9395-4bbe-9f0f-d7544c4dabd8",
    },
    {
      source: "f74c1d2f-98f8-4ae7-93be-6b51aafdd01b",
      target: "8bd90bef-745d-4e8a-beea-1b6ea4d1dd4a",
    },
    {
      source: "4df62362-6131-4412-9679-ee22e7217c27",
      target: "6cc8bd33-363c-4df2-ab8f-f0fd271efe84",
    },
    {
      source: "29571d5f-260a-4fa6-86c2-e70b95d22e7e",
      target: "85a5ab1f-c139-429b-a65b-68dadfaf46f1",
    },
    {
      source: "af235e9d-47f1-4484-ad7f-87e363bc7599",
      target: "6c269387-99dd-438c-a63b-6455f0a312c4",
    },
    {
      source: "9533918c-451c-4be7-a04f-0c75f67dc4ab",
      target: "1915c35e-a4d6-49eb-a4d7-bb515c7ce488",
    },
    {
      source: "9807b73d-a0cc-4d2f-abea-e1f0957a55db",
      target: "61d63d38-214b-420c-b6c7-9b863038779a",
    },
    {
      source: "83bcc930-b610-4518-95c2-6402d22d943d",
      target: "cf4c4264-597e-4646-9091-99a7cf02fdca",
    },
    {
      source: "ff6026ea-9bd9-4b85-b3f3-8aaea37e4d1b",
      target: "900bcfe8-bd93-4a28-98c8-9d1ba4f3c212",
    },
    {
      source: "74300cf3-4beb-4c6a-9c64-4f535ddd4cec",
      target: "06135d76-5fcd-4a21-849a-b6fc2bf6cb2e",
    },
    {
      source: "93db3866-35b3-4cb4-b8e5-a4b20fffe64d",
      target: "74a346dd-4954-4151-a07c-bc20f6958046",
    },
    {
      source: "bb8c6da8-ba27-48c9-9187-b5d0fbee33a4",
      target: "3c430036-2141-41c8-9a77-747240aa0349",
    },
    {
      source: "76ad3801-ccb4-4f03-963e-41d4553f7279",
      target: "34d218f3-d9e2-4171-a2f2-0b1782e7b974",
    },
    {
      source: "382f6450-fb9c-49d6-b610-14d8085232ca",
      target: "f13c3d35-509e-4327-b7f4-a42e9edaee94",
    },
    {
      source: "f91ac8ad-adf9-4dd9-b469-184161b769a9",
      target: "ccec0465-0835-45ae-99a3-0c0b734e28bf",
    },
    {
      source: "7cd071e9-4fa6-4ee1-b2cc-dbdc73ac451b",
      target: "ab02474c-5007-450c-b3c5-49285a443b7f",
    },
    {
      source: "6ecb65c6-c56f-42f3-9a9b-7ec239ae4f75",
      target: "62d244e1-2f31-48fa-a5a1-42482f35cf62",
    },
    {
      source: "7e97457f-abe8-433e-a861-b7b326add468",
      target: "3869bdf4-ade9-4d7f-b9a6-c501fd0da620",
    },
    {
      source: "6659d696-26ea-4083-88e0-ec7b16b8d29f",
      target: "6c269387-99dd-438c-a63b-6455f0a312c4",
    },
    {
      source: "9274e57e-d307-4b1a-9211-4709ca9daacf",
      target: "55b3c3e6-ce2c-4fcf-a57b-271a5516a30a",
    },
    {
      source: "16d050eb-1cd3-4f28-b5f0-195ce371ecb9",
      target: "97bf1a47-60e9-4058-be48-c498e0a587c5",
    },
    {
      source: "644d6c71-acb9-41d8-9a56-22cc02c3bf5f",
      target: "fad6766a-c581-4c9a-9106-87d2dcc10bf0",
    },
    {
      source: "69053dbc-4fb3-4dbe-9aac-458b97133564",
      target: "69ab5e7f-ad73-4be2-ab80-c229c32396ce",
    },
    {
      source: "1bcdb6a8-39f0-4949-ab47-683b7c0bbd49",
      target: "43236681-dba8-4ff0-9e22-339be5888816",
    },
    {
      source: "e186a74d-32a5-48cc-98de-cc811af2378e",
      target: "f74c1d2f-98f8-4ae7-93be-6b51aafdd01b",
    },
    {
      source: "5d3fb912-9551-4c5c-ba65-13d654c4e1a3",
      target: "7fb6f680-19c5-4874-b5c9-ce22ebaf3671",
    },
    {
      source: "3608d175-6827-4584-af1e-c56662566cc5",
      target: "a9120798-d8e2-453d-bef7-7add8757f48a",
    },
    {
      source: "ce7d1a50-ffb5-4527-8188-bf722d15faa3",
      target: "fea1e332-387e-4a8b-97c2-023e17b21db0",
    },
    {
      source: "2e3f1a9f-db67-49a7-871e-25df8bd43a7d",
      target: "93db3866-35b3-4cb4-b8e5-a4b20fffe64d",
    },
    {
      source: "75a04ac2-9a37-41b6-beca-6258dcb7c5ed",
      target: "20d2866d-be3d-49c3-8acc-ecf276b503bc",
    },
    {
      source: "43df946e-bba8-4f68-aa82-8b89f28f82fe",
      target: "43236681-dba8-4ff0-9e22-339be5888816",
    },
    {
      source: "fbc47646-af05-4415-a3bb-10a16f81fcef",
      target: "06135d76-5fcd-4a21-849a-b6fc2bf6cb2e",
    },
    {
      source: "036e4b45-d99a-4425-80cf-0e3e7f56faa2",
      target: "7f7539a1-496e-45f7-b319-e78b485bce31",
    },
    {
      source: "3c430036-2141-41c8-9a77-747240aa0349",
      target: "c69907f0-2308-49b6-a98c-ddb391a01e88",
    },
    {
      source: "21eca142-1270-4c9a-9c50-3902366b621d",
      target: "40f070e1-9395-4bbe-9f0f-d7544c4dabd8",
    },
    {
      source: "d39e637b-d650-49af-93b6-646405c424dd",
      target: "127db000-065c-447a-bb44-e47564defee8",
    },
    {
      source: "48a6c3eb-81f8-4eed-ba54-e8be3dd5e0c6",
      target: "11e260f0-4731-4f1e-8249-8421dd1b1753",
    },
    {
      source: "e9aed26d-012f-4c46-9c41-618a923fc265",
      target: "233f14e9-655a-4842-a05c-37b5d82e8c24",
    },
    {
      source: "606131fe-7d6e-4537-a907-3b057534d709",
      target: "879e61eb-0fca-49d6-a084-c75d917d99dd",
    },
    {
      source: "6072bf4c-1778-4180-87bc-2e39ffddc2e0",
      target: "0f8b05bd-eeb0-464e-9a92-9434c90e28f7",
    },
    {
      source: "2f7156ed-4f8c-418b-b3c2-e7f5c8d0fde0",
      target: "85a5ab1f-c139-429b-a65b-68dadfaf46f1",
    },
    {
      source: "e7f36771-0962-4329-bc5e-54296e87f355",
      target: "0bb3ea8f-5e2d-4ed6-b648-475c260293cf",
    },
    {
      source: "aa7401d0-e538-41f1-b46e-9c51b8bae98c",
      target: "736f0444-361f-4415-97dd-4f48f3c6c262",
    },
    {
      source: "33077ae9-6d8b-4d60-b46a-98628c17e26f",
      target: "3dbb1bef-2246-4af8-84ef-efa0c1b11418",
    },
    {
      source: "aa858e68-7493-4038-a0ee-523622a33f41",
      target: "7d5c937b-9ba3-4e66-9c9c-fe6fc600ecb9",
    },
    {
      source: "e4b87372-15a6-404d-b4b6-049f21257687",
      target: "f74c1d2f-98f8-4ae7-93be-6b51aafdd01b",
    },
    {
      source: "f30ec2a3-c1d0-474a-820e-61005d334a94",
      target: "7f7539a1-496e-45f7-b319-e78b485bce31",
    },
    {
      source: "8b0d77d9-eef2-4321-a676-dac3f60c495c",
      target: "c69907f0-2308-49b6-a98c-ddb391a01e88",
    },
    {
      source: "54e5161b-ad09-4a91-bdfa-09f0540a8d3c",
      target: "700fd58d-45b0-4aa4-9fae-d819bc1ce69b",
    },
    {
      source: "c41d4023-209c-4a57-8a2c-a37e5edaa055",
      target: "34d218f3-d9e2-4171-a2f2-0b1782e7b974",
    },
    {
      source: "db53e193-29bf-4f1b-b1d3-d9cdbec0a7e1",
      target: "e186a74d-32a5-48cc-98de-cc811af2378e",
    },
    {
      source: "0053bb27-c918-4e89-bf97-d992d780b33a",
      target: "74a346dd-4954-4151-a07c-bc20f6958046",
    },
    {
      source: "bd0d6b05-fa7e-449d-8200-7119787c4d5d",
      target: "cd8685bb-7b35-4d71-9837-b096fa94e5a9",
    },
    {
      source: "5ad443d3-d07a-42a0-9f41-9594c278cb3c",
      target: "6c269387-99dd-438c-a63b-6455f0a312c4",
    },
    {
      source: "879e61eb-0fca-49d6-a084-c75d917d99dd",
      target: "f74c1d2f-98f8-4ae7-93be-6b51aafdd01b",
    },
    {
      source: "36b7488c-95f0-49b7-8733-b14a211e022f",
      target: "27f6f554-5a51-4b79-9811-89645e35dfcd",
    },
    {
      source: "20a30670-2964-481c-a6a6-36e1479420dd",
      target: "1625923f-90f7-40cc-88e3-bbf437082381",
    },
    {
      source: "a33d847e-2cde-4690-8094-175fe364711b",
      target: "8bd90bef-745d-4e8a-beea-1b6ea4d1dd4a",
    },
    {
      source: "bbd6dcf9-7e6d-49fa-be5e-3fe4e1789e3b",
      target: "452fa741-7a02-4980-a290-62fc691a840f",
    },
    {
      source: "bac86be8-9c9a-4c8c-9d75-06de8b312343",
      target: "700fd58d-45b0-4aa4-9fae-d819bc1ce69b",
    },
    {
      source: "43099aeb-1682-4d8a-a870-a4d6c9ccde1e",
      target: "4eb7bb85-6837-469d-af77-092ee2565e0f",
    },
    {
      source: "96f44db0-aba8-47cb-8bb8-fe5963ea92f4",
      target: "700fd58d-45b0-4aa4-9fae-d819bc1ce69b",
    },
    {
      source: "bcaee1fe-bcc7-4e12-a4bf-e9624ab79031",
      target: "069fb3dd-3a93-400c-8a7e-e9b30324faf7",
    },
    {
      source: "3f1694b8-d8f1-4395-b460-e11746a88909",
      target: "233f14e9-655a-4842-a05c-37b5d82e8c24",
    },
    {
      source: "4fe6a571-4dec-4c79-812d-e423d876d2c0",
      target: "21eca142-1270-4c9a-9c50-3902366b621d",
    },
    {
      source: "cf0b4596-6024-4cda-a577-a39d47802743",
      target: "21eca142-1270-4c9a-9c50-3902366b621d",
    },
    {
      source: "0b086db4-f029-45e0-bfad-3b1107f690a1",
      target: "27f6f554-5a51-4b79-9811-89645e35dfcd",
    },
    {
      source: "73005cbb-617e-4b62-8134-4f41eaec440a",
      target: "5364d84e-47ab-4b13-b1ad-3fa29a7c9119",
    },
    {
      source: "ca276e4d-0b98-460f-946a-873cf5685203",
      target: "5364d84e-47ab-4b13-b1ad-3fa29a7c9119",
    },
    {
      source: "ae8bb97a-e2be-49b3-b7c2-7513860760d8",
      target: "45650fca-78b9-4ab1-a876-742ec8897e29",
    },
    {
      source: "86dd457f-1af0-4396-aad6-c82d22b2fc8e",
      target: "72092619-0abd-49a6-a2c7-2f77afc067bf",
    },
    {
      source: "046bfd5a-7157-4022-a28f-76acd582c2ce",
      target: "3869bdf4-ade9-4d7f-b9a6-c501fd0da620",
    },
    {
      source: "c4b4d52c-fb7c-4d56-8230-14c897f3ca52",
      target: "f13c3d35-509e-4327-b7f4-a42e9edaee94",
    },
    {
      source: "da835927-c5cd-4ab3-88af-2bfcace8c940",
      target: "4eb7bb85-6837-469d-af77-092ee2565e0f",
    },
    {
      source: "03890ffd-3a6d-4204-a6b2-1274ec7d4b58",
      target: "c6b7c058-91b9-4a19-94ca-5e784803b57f",
    },
    {
      source: "d024a624-7eff-459d-9dfb-47e46e82c083",
      target: "3869bdf4-ade9-4d7f-b9a6-c501fd0da620",
    },
    {
      source: "efc0869c-d917-4d2c-90fa-b6861d0cb0ec",
      target: "08590185-f1c7-4610-afed-1798794e3bc6",
    },
    {
      source: "057e6ddd-1721-4173-a0db-6b1879f77dd8",
      target: "6f66dd8f-7e27-4701-9aff-81143fc0bbc7",
    },
    {
      source: "89bf7b7e-71a2-4792-a3d0-371d783ee1a5",
      target: "d15c48c9-b424-45a8-8e69-82fc0656f19c",
    },
    {
      source: "2e536b53-fe76-424b-ac99-460efb22cc51",
      target: "0bb3ea8f-5e2d-4ed6-b648-475c260293cf",
    },
    {
      source: "6d0fd896-8a19-471d-9aba-bec0d784299a",
      target: "4ce300e6-b18c-4bd5-bf8f-facfc690cb3e",
    },
    {
      source: "ebb570c1-b65a-4ce2-9000-306b11e79d10",
      target: "55b3c3e6-ce2c-4fcf-a57b-271a5516a30a",
    },
    {
      source: "5a3faaa3-6a7d-41fb-b2f7-9bc0161d8da7",
      target: "3690c89e-6895-42dd-859b-7a6f2e7ce1a6",
    },
    {
      source: "63fce2ea-7185-481c-bd4a-29b911c9c774",
      target: "62d244e1-2f31-48fa-a5a1-42482f35cf62",
    },
    {
      source: "6cbae283-1d2d-4f09-9112-339602357742",
      target: "736f0444-361f-4415-97dd-4f48f3c6c262",
    },
    {
      source: "b816af6c-f052-4d2d-a0a2-09c61d9e519e",
      target: "422bf665-9624-495b-8917-b1371c5bb2af",
    },
    {
      source: "c44cfe4b-1e23-485b-a8ab-fe96d3d034e8",
      target: "06135d76-5fcd-4a21-849a-b6fc2bf6cb2e",
    },
    {
      source: "39a500b3-649e-48ef-85d3-91b7a0334eae",
      target: "233f14e9-655a-4842-a05c-37b5d82e8c24",
    },
    {
      source: "941e2050-26a5-471a-9561-04e81172d11c",
      target: "6cc8bd33-363c-4df2-ab8f-f0fd271efe84",
    },
    {
      source: "4b2b59e0-da86-401a-80ba-a23e9d082247",
      target: "7d5c937b-9ba3-4e66-9c9c-fe6fc600ecb9",
    },
    {
      source: "b2f1c1c3-f007-46c0-beb6-b54dca5b54c8",
      target: "72092619-0abd-49a6-a2c7-2f77afc067bf",
    },
    {
      source: "b5f72ab5-5319-477e-aa21-963703326ad6",
      target: "bd0d6b05-fa7e-449d-8200-7119787c4d5d",
    },
    {
      source: "e6c305d9-bb50-40cc-be1b-f88b8995d444",
      target: "55b3c3e6-ce2c-4fcf-a57b-271a5516a30a",
    },
    {
      source: "a9120798-d8e2-453d-bef7-7add8757f48a",
      target: "74a346dd-4954-4151-a07c-bc20f6958046",
    },
    {
      source: "ac06a8df-fcea-4720-bf76-678fba415d28",
      target: "61d63d38-214b-420c-b6c7-9b863038779a",
    },
    {
      source: "36593159-6b15-4c17-a6d4-c1180d2712f4",
      target: "dec65496-ff8f-4120-a2a6-44c84b4c04f0",
    },
    {
      source: "fc5d63ad-c7c2-4722-a308-f1363edddf3c",
      target: "89fc1193-1a2a-4b5f-82fb-0aba58cd4850",
    },
    {
      source: "82458ce3-dcd4-4df7-9ea8-8c4e069156b4",
      target: "ffef8bce-82d1-4e54-a92d-685614069e13",
    },
    {
      source: "2e64b6e8-96d6-4878-ac34-cd7b5d76f0bc",
      target: "ffef8bce-82d1-4e54-a92d-685614069e13",
    },
    {
      source: "bcb14ce3-0b4d-4583-bbe9-a4909d218626",
      target: "671b799f-d605-4e63-806a-c8529d386f15",
    },
    {
      source: "98492c7c-8f9b-42fe-9c82-6619b1414a49",
      target: "6c269387-99dd-438c-a63b-6455f0a312c4",
    },
    {
      source: "90265b32-bebf-4a2c-9e15-75a1233ff4bf",
      target: "41c36986-5525-46d1-8d0d-6703253b1505",
    },
    {
      source: "25677514-ccc0-4360-b0f7-0db56843146e",
      target: "44f2b7fb-4a21-4daa-a18e-50e905eb735e",
    },
    {
      source: "977b5a1f-1427-4a14-b915-0179f6fabe40",
      target: "08590185-f1c7-4610-afed-1798794e3bc6",
    },
    {
      source: "ce75c925-0bf3-475a-b9b2-de38cdf49ae0",
      target: "127db000-065c-447a-bb44-e47564defee8",
    },
    {
      source: "ce5ab339-91db-48b2-9013-96d683172956",
      target: "127db000-065c-447a-bb44-e47564defee8",
    },
    {
      source: "c79ec12e-8587-4e21-9aa5-2607923cc9e1",
      target: "223d7f52-3c99-416d-8bc2-dc6e413c336e",
    },
    {
      source: "d11cc847-4584-45f7-9429-3216442dd4d3",
      target: "2a89bb10-2594-442e-85b5-40845d080c68",
    },
    {
      source: "77a2b170-92b4-460a-8f43-40318c123da2",
      target: "3c430036-2141-41c8-9a77-747240aa0349",
    },
    {
      source: "694088dd-3598-4d0a-b626-404ce2468ab8",
      target: "41c36986-5525-46d1-8d0d-6703253b1505",
    },
    {
      source: "7e14339f-44df-4851-8a2f-4c7c50cde27e",
      target: "3567f66c-3f08-4593-b089-9fea147e108a",
    },
    {
      source: "3ea59de1-58f3-4642-892d-389e3eea6015",
      target: "069fb3dd-3a93-400c-8a7e-e9b30324faf7",
    },
    {
      source: "40ca114d-679f-47c4-b6a4-49d3f01c8928",
      target: "3869bdf4-ade9-4d7f-b9a6-c501fd0da620",
    },
    {
      source: "ef697a65-0eb1-4290-b928-7ffe9d67f067",
      target: "41c36986-5525-46d1-8d0d-6703253b1505",
    },
    {
      source: "ccec0465-0835-45ae-99a3-0c0b734e28bf",
      target: "8bd90bef-745d-4e8a-beea-1b6ea4d1dd4a",
    },
    {
      source: "6dacdc11-32b1-4b35-88cf-38845e705fcf",
      target: "d15c48c9-b424-45a8-8e69-82fc0656f19c",
    },
    {
      source: "24358274-eb81-4fc7-acbf-230444eaf144",
      target: "700fd58d-45b0-4aa4-9fae-d819bc1ce69b",
    },
    {
      source: "7a05ab67-7b8b-4ba7-8689-f87259728d5f",
      target: "3567f66c-3f08-4593-b089-9fea147e108a",
    },
    {
      source: "1a3c7901-20b6-43af-aa45-13882251d4c7",
      target: "60a283ba-0125-4205-8b37-31032ac8afca",
    },
    {
      source: "96635de8-71b4-49f2-ae52-93960d65d160",
      target: "fea1e332-387e-4a8b-97c2-023e17b21db0",
    },
    {
      source: "79e3225d-9421-4200-94fe-b2d1770d9937",
      target: "21eca142-1270-4c9a-9c50-3902366b621d",
    },
    {
      source: "f75233a1-eeef-4a50-93b2-0d17d0f26c78",
      target: "c7c9fab9-f918-47e7-a085-8cafffafc2ba",
    },
    {
      source: "127db000-065c-447a-bb44-e47564defee8",
      target: "55b3c3e6-ce2c-4fcf-a57b-271a5516a30a",
    },
    {
      source: "d640b25c-2d88-4d4a-80ab-4cb6c682fcad",
      target: "4ce300e6-b18c-4bd5-bf8f-facfc690cb3e",
    },
    {
      source: "31326089-ca15-4ca6-8e1d-32cef929b4ac",
      target: "233f14e9-655a-4842-a05c-37b5d82e8c24",
    },
    {
      source: "736f0444-361f-4415-97dd-4f48f3c6c262",
      target: "e785d87b-acb0-40f9-aa40-0e031f4172cb",
    },
    {
      source: "cd8685bb-7b35-4d71-9837-b096fa94e5a9",
      target: "8bd90bef-745d-4e8a-beea-1b6ea4d1dd4a",
    },
    {
      source: "2c164fed-c78a-4be9-9b63-d647fe64ed01",
      target: "bd0d6b05-fa7e-449d-8200-7119787c4d5d",
    },
    {
      source: "a7d3edc8-a5e9-452c-b727-98357e5716e1",
      target: "f91ac8ad-adf9-4dd9-b469-184161b769a9",
    },
    {
      source: "87adecd3-1dbd-451c-9c74-515044e9cc29",
      target: "ebb570c1-b65a-4ce2-9000-306b11e79d10",
    },
    {
      source: "2b3dda7e-4b18-4bdb-8829-639e4f2f2bda",
      target: "3dbb1bef-2246-4af8-84ef-efa0c1b11418",
    },
    {
      source: "48b2b731-7ab9-4658-9f41-33692cf8d35c",
      target: "b8dacd71-6e07-4e71-9543-b50f55e4017c",
    },
    {
      source: "452fa741-7a02-4980-a290-62fc691a840f",
      target: "3dbb1bef-2246-4af8-84ef-efa0c1b11418",
    },
    {
      source: "7d5c937b-9ba3-4e66-9c9c-fe6fc600ecb9",
      target: "a33d847e-2cde-4690-8094-175fe364711b",
    },
    {
      source: "5e1edf4e-a85f-4d5b-83a4-5efaac67a3f7",
      target: "93db3866-35b3-4cb4-b8e5-a4b20fffe64d",
    },
    {
      source: "9119c637-517a-40c5-8d7a-663c0ceb6d8a",
      target: "736f0444-361f-4415-97dd-4f48f3c6c262",
    },
  ],
};

const r5qE = {
  nodes: [
    {
      id: "root",
      name: "root",
    },
    {
      id: "12a9dee3-d9d7-4340-8f16-87016d884899",
      name: "11号楼",
    },
    {
      id: "bd70e5e4-8dac-425b-8530-348e6804f48c",
      name: "2层",
    },
    {
      id: "38e6589a-4b37-4cdb-af61-4b76481bd456",
      name: "卧室",
    },
    {
      id: "c9616ea7-74c0-4426-954c-0af3b300a4bd",
      name: "厨房",
    },
    {
      id: "bc4b9902-92bf-4013-8eca-2f0827610b1e",
      name: "博彦测试12",
    },
    {
      id: "8729c35a-690e-4877-92c2-7984309c1d18",
      name: "卧室",
    },
    {
      id: "e099705d-7737-443a-b186-9c65a88fa195",
      name: "Beta KNX户.copy",
    },
    {
      id: "980ee58e-85b1-44cd-ba63-e8ddc855c180",
      name: "卧室",
    },
    {
      id: "27be3021-a744-4b34-b889-44ab6937006d",
      name: "厨房",
    },
    {
      id: "15b68fae-47c1-4429-b5c9-a782d98e3f77",
      name: "厨房",
    },
    {
      id: "d5bd63e5-9501-4f4a-9f4c-1eaa3c1ad0f9",
      name: "博彦测试14",
    },
    {
      id: "c75fb1ba-3556-494a-ae2a-8675dfbcb1d5",
      name: "客厅",
    },
    {
      id: "2d01677d-6e49-4b8a-8361-b97103daaa3f",
      name: "书房",
    },
    {
      id: "279c20ad-9964-47b0-a0d8-7e0e95936330",
      name: "博彦测试3",
    },
    {
      id: "b9fb0c12-c570-49b8-89f0-1f2e0fbb8be7",
      name: "卧室",
    },
    {
      id: "f981bc82-825c-472d-ade2-f37b2107c97a",
      name: "客厅",
    },
    {
      id: "ffe9ad5e-7da8-401c-8cc7-57b9b6832a86",
      name: "厨房",
    },
    {
      id: "39448588-cac6-402c-adcf-86586cce6879",
      name: "卧室",
    },
    {
      id: "62da5217-9243-4c02-ab98-cdc605381644",
      name: "卧室",
    },
    {
      id: "3fd46747-cee7-4d24-b7d8-a6138fb1f283",
      name: "餐厅",
    },
    {
      id: "691d7afc-e7b5-4fc2-b298-1ed540f80a88",
      name: "卧室",
    },
    {
      id: "2edb2151-d0c2-48d8-8420-dab606797d4e",
      name: "客厅",
    },
    {
      id: "ddb8a3ba-2d52-44d3-910c-290868c19407",
      name: "2单元",
    },
    {
      id: "f36062cc-f340-4fb9-a48a-dbafb07f7ba2",
      name: "金茂測試Alpha户",
    },
    {
      id: "a8955ba4-0726-4431-9469-efb81c4f55cc",
      name: "卧室",
    },
    {
      id: "b9921d23-1ef6-4c5e-b7a9-2fe7df2d9ffa",
      name: "卧室",
    },
    {
      id: "1c13c0ab-eb5f-41aa-b965-1ead41e90f3e",
      name: "博彦测试7",
    },
    {
      id: "decd62a0-d433-42cf-a8b9-63b889ba5963",
      name: "博彦测试9",
    },
    {
      id: "27070379-fb86-4c20-bc81-24c1ef09b543",
      name: "客厅",
    },
    {
      id: "79579367-e031-4409-a552-62f7e049aada",
      name: "客厅",
    },
    {
      id: "400f1d72-386b-4511-a3c3-aa5bf64c5d00",
      name: "厨房",
    },
    {
      id: "7ca9fe3b-3233-486e-829e-b38d8f6070f4",
      name: "餐厅",
    },
    {
      id: "e714bf60-3099-4acd-ae6b-4b1a49f96ff5",
      name: "客厅",
    },
    {
      id: "3dfc8886-b0fa-4f21-a0a9-93cc4cc410bd",
      name: "博彦测试4",
    },
    {
      id: "1759fb02-19cc-4507-ad70-dfeeab6360bd",
      name: "卧室",
    },
    {
      id: "3de85323-9f57-4bb6-8ca2-c4c7f457e418",
      name: "厨房",
    },
    {
      id: "3b7257ff-09e9-405f-ba01-c83ed417c6b7",
      name: "餐厅",
    },
    {
      id: "b871634f-fd15-4e82-bab1-1b48384f4086",
      name: "厨房",
    },
    {
      id: "b1d2b84d-5421-4d2b-b304-f3523155d5bf",
      name: "卧室",
    },
    {
      id: "0e8facf5-e302-4cdc-afc0-3874b1435a5b",
      name: "餐厅",
    },
    {
      id: "e9f17835-c89a-46da-b258-a786d0f5983b",
      name: "卧室",
    },
    {
      id: "5b8f06d6-c8a8-411c-948d-49d74d3529e5",
      name: "X85地块",
    },
    {
      id: "00127c60-2e0b-400b-9054-9a2dcbbf6351",
      name: "餐厅",
    },
    {
      id: "aff3b86e-0d52-49db-a3c5-fa067cb489a0",
      name: "客厅",
    },
    {
      id: "5de92b73-ff2e-40ac-8647-5cb81b63faa5",
      name: "客厅",
    },
    {
      id: "41a90684-abd5-4680-922c-170e0203f195",
      name: "厨房",
    },
    {
      id: "65571e5a-d572-40ac-8365-4937ec67ea62",
      name: "博彦测试6",
    },
    {
      id: "8538d6f7-c944-4035-8d68-8821bec4dfa5",
      name: "客厅",
    },
    {
      id: "374bc337-0861-4208-afa7-85a6fda0c4dc",
      name: "客厅",
    },
    {
      id: "93a11e4a-94c6-4644-b21c-28abfe11ead9",
      name: "卧室",
    },
    {
      id: "86da3e1b-4048-4046-9236-0e3961cfeea7",
      name: "Alpha KNX户",
    },
    {
      id: "3634d821-2f5a-45ef-b6f2-a96cf847b2a3",
      name: "1号楼",
    },
    {
      id: "7d1a5f4a-bbad-4ceb-b5d8-e53f700d8e83",
      name: "客厅",
    },
    {
      id: "4cd2f152-0f9c-475e-8584-801b5042066d",
      name: "厨房",
    },
    {
      id: "8ff96937-0ff1-461a-99e8-56423f83b056",
      name: "博彦测试15",
    },
    {
      id: "2afa271a-85b1-4a20-8fea-865e0b89444e",
      name: "博彦测试16.edgar.local",
    },
    {
      id: "d9455523-612f-4e3b-99e6-ac2f47657fd7",
      name: "餐厅",
    },
    {
      id: "b441163d-d600-4e57-950a-337009b19055",
      name: "餐厅",
    },
    {
      id: "966a1b3e-ae13-440a-8883-ffaa18e4adce",
      name: "博彦测试8",
    },
    {
      id: "b2eaf30d-8690-4364-964e-e66c26508294",
      name: "卧室",
    },
    {
      id: "f2700434-ab6b-4984-8858-554352780f79",
      name: "餐厅",
    },
    {
      id: "934af00c-c59e-45b4-9967-d315251e14c7",
      name: "客厅",
    },
    {
      id: "188941e4-b5e8-4e14-970e-bf0bb3d594b8",
      name: "客厅",
    },
    {
      id: "a133b9ae-97d2-40b5-9a0e-30f5b783969e",
      name: "厨房",
    },
    {
      id: "1bdbe399-b112-48ce-908e-4a9edeb78246",
      name: "客厅",
    },
    {
      id: "7334819a-1f39-4d92-9510-dad990cd34c7",
      name: "客厅",
    },
    {
      id: "1dfd2458-fb6b-4be0-bfce-804ba41eb548",
      name: "餐厅",
    },
    {
      id: "cbf83f9a-4290-49e9-a90c-9bcf21492dda",
      name: "客厅",
    },
    {
      id: "15b06dac-bd6f-4218-a560-7c53a51c2205",
      name: "卧室",
    },
    {
      id: "4c20bea8-557a-4b99-96e2-4e7d6d48a8d6",
      name: "餐厅",
    },
    {
      id: "ffe89f4f-243b-4c75-9085-becf098f4aba",
      name: "餐厅",
    },
    {
      id: "cdb8dcdb-f0d3-46d0-a230-fc6cc959ac5f",
      name: "金茂一期验收",
    },
    {
      id: "e4dcadc1-f6a5-464b-8c19-d6a0714e267d",
      name: "客厅",
    },
    {
      id: "3a063b31-cb65-4f07-bb21-722b4860786e",
      name: "博彦测试10",
    },
    {
      id: "ab91109b-c467-4614-ae22-15af741a622c",
      name: "餐厅",
    },
    {
      id: "31e5ad3e-906f-4cbb-a6b5-4c2f3b70ac11",
      name: "厨房",
    },
    {
      id: "80057bc3-9b8d-4798-9c32-7789604593b6",
      name: "Beta KNX户",
    },
    {
      id: "062ed0c0-3c1a-4635-b6a1-f083c02af290",
      name: "卧室",
    },
    {
      id: "1d228ee9-8d99-432a-a4ac-13387c7343f0",
      name: "客厅",
    },
    {
      id: "b5747fc6-a9d0-41ff-b6bb-b97eef6c8c1e",
      name: "餐厅",
    },
    {
      id: "d4cf01be-0af9-4ee0-a421-15418921e430",
      name: "博彦测试16",
    },
    {
      id: "9594caaf-5f9e-49e7-9fb0-064d4794faa9",
      name: "厨房",
    },
    {
      id: "27b06814-ac42-4776-b978-9a37def42096",
      name: "餐厅",
    },
    {
      id: "d0bf5f17-919b-41c0-9c23-022e1e58ce1a",
      name: "户(公寓)",
    },
    {
      id: "8ac02aa5-9b2c-486c-a2af-95000cee2fa4",
      name: "1层",
    },
    {
      id: "878cb2a8-3fe9-4eeb-aa84-8518a3921343",
      name: "博彦测试5",
    },
    {
      id: "de3bd18d-3db9-4f45-91cf-e75710a50bf3",
      name: "客厅",
    },
    {
      id: "be3d719e-d104-4150-b6e4-869f54beed97",
      name: "厨房",
    },
    {
      id: "22968658-520d-424b-bc37-9632b6cb0fbc",
      name: "卧室",
    },
    {
      id: "cd98d2b3-2263-4af8-86ea-224ff4cc7710",
      name: "厨房",
    },
  ],
  links: [
    {
      source: "12a9dee3-d9d7-4340-8f16-87016d884899",
      target: "root",
    },
    {
      source: "bd70e5e4-8dac-425b-8530-348e6804f48c",
      target: "ddb8a3ba-2d52-44d3-910c-290868c19407",
    },
    {
      source: "38e6589a-4b37-4cdb-af61-4b76481bd456",
      target: "3dfc8886-b0fa-4f21-a0a9-93cc4cc410bd",
    },
    {
      source: "c9616ea7-74c0-4426-954c-0af3b300a4bd",
      target: "3dfc8886-b0fa-4f21-a0a9-93cc4cc410bd",
    },
    {
      source: "bc4b9902-92bf-4013-8eca-2f0827610b1e",
      target: "bd70e5e4-8dac-425b-8530-348e6804f48c",
    },
    {
      source: "8729c35a-690e-4877-92c2-7984309c1d18",
      target: "d4cf01be-0af9-4ee0-a421-15418921e430",
    },
    {
      source: "e099705d-7737-443a-b186-9c65a88fa195",
      target: "bd70e5e4-8dac-425b-8530-348e6804f48c",
    },
    {
      source: "980ee58e-85b1-44cd-ba63-e8ddc855c180",
      target: "279c20ad-9964-47b0-a0d8-7e0e95936330",
    },
    {
      source: "27be3021-a744-4b34-b889-44ab6937006d",
      target: "878cb2a8-3fe9-4eeb-aa84-8518a3921343",
    },
    {
      source: "15b68fae-47c1-4429-b5c9-a782d98e3f77",
      target: "65571e5a-d572-40ac-8365-4937ec67ea62",
    },
    {
      source: "d5bd63e5-9501-4f4a-9f4c-1eaa3c1ad0f9",
      target: "bd70e5e4-8dac-425b-8530-348e6804f48c",
    },
    {
      source: "c75fb1ba-3556-494a-ae2a-8675dfbcb1d5",
      target: "2afa271a-85b1-4a20-8fea-865e0b89444e",
    },
    {
      source: "2d01677d-6e49-4b8a-8361-b97103daaa3f",
      target: "f36062cc-f340-4fb9-a48a-dbafb07f7ba2",
    },
    {
      source: "279c20ad-9964-47b0-a0d8-7e0e95936330",
      target: "bd70e5e4-8dac-425b-8530-348e6804f48c",
    },
    {
      source: "b9fb0c12-c570-49b8-89f0-1f2e0fbb8be7",
      target: "65571e5a-d572-40ac-8365-4937ec67ea62",
    },
    {
      source: "f981bc82-825c-472d-ade2-f37b2107c97a",
      target: "e099705d-7737-443a-b186-9c65a88fa195",
    },
    {
      source: "ffe9ad5e-7da8-401c-8cc7-57b9b6832a86",
      target: "279c20ad-9964-47b0-a0d8-7e0e95936330",
    },
    {
      source: "39448588-cac6-402c-adcf-86586cce6879",
      target: "cdb8dcdb-f0d3-46d0-a230-fc6cc959ac5f",
    },
    {
      source: "62da5217-9243-4c02-ab98-cdc605381644",
      target: "3a063b31-cb65-4f07-bb21-722b4860786e",
    },
    {
      source: "3fd46747-cee7-4d24-b7d8-a6138fb1f283",
      target: "d4cf01be-0af9-4ee0-a421-15418921e430",
    },
    {
      source: "691d7afc-e7b5-4fc2-b298-1ed540f80a88",
      target: "8ff96937-0ff1-461a-99e8-56423f83b056",
    },
    {
      source: "2edb2151-d0c2-48d8-8420-dab606797d4e",
      target: "d4cf01be-0af9-4ee0-a421-15418921e430",
    },
    {
      source: "ddb8a3ba-2d52-44d3-910c-290868c19407",
      target: "12a9dee3-d9d7-4340-8f16-87016d884899",
    },
    {
      source: "f36062cc-f340-4fb9-a48a-dbafb07f7ba2",
      target: "bd70e5e4-8dac-425b-8530-348e6804f48c",
    },
    {
      source: "a8955ba4-0726-4431-9469-efb81c4f55cc",
      target: "d5bd63e5-9501-4f4a-9f4c-1eaa3c1ad0f9",
    },
    {
      source: "b9921d23-1ef6-4c5e-b7a9-2fe7df2d9ffa",
      target: "e099705d-7737-443a-b186-9c65a88fa195",
    },
    {
      source: "1c13c0ab-eb5f-41aa-b965-1ead41e90f3e",
      target: "bd70e5e4-8dac-425b-8530-348e6804f48c",
    },
    {
      source: "decd62a0-d433-42cf-a8b9-63b889ba5963",
      target: "bd70e5e4-8dac-425b-8530-348e6804f48c",
    },
    {
      source: "27070379-fb86-4c20-bc81-24c1ef09b543",
      target: "d4cf01be-0af9-4ee0-a421-15418921e430",
    },
    {
      source: "79579367-e031-4409-a552-62f7e049aada",
      target: "8ff96937-0ff1-461a-99e8-56423f83b056",
    },
    {
      source: "400f1d72-386b-4511-a3c3-aa5bf64c5d00",
      target: "2afa271a-85b1-4a20-8fea-865e0b89444e",
    },
    {
      source: "7ca9fe3b-3233-486e-829e-b38d8f6070f4",
      target: "2afa271a-85b1-4a20-8fea-865e0b89444e",
    },
    {
      source: "e714bf60-3099-4acd-ae6b-4b1a49f96ff5",
      target: "f36062cc-f340-4fb9-a48a-dbafb07f7ba2",
    },
    {
      source: "3dfc8886-b0fa-4f21-a0a9-93cc4cc410bd",
      target: "bd70e5e4-8dac-425b-8530-348e6804f48c",
    },
    {
      source: "1759fb02-19cc-4507-ad70-dfeeab6360bd",
      target: "1c13c0ab-eb5f-41aa-b965-1ead41e90f3e",
    },
    {
      source: "3de85323-9f57-4bb6-8ca2-c4c7f457e418",
      target: "966a1b3e-ae13-440a-8883-ffaa18e4adce",
    },
    {
      source: "3b7257ff-09e9-405f-ba01-c83ed417c6b7",
      target: "966a1b3e-ae13-440a-8883-ffaa18e4adce",
    },
    {
      source: "b871634f-fd15-4e82-bab1-1b48384f4086",
      target: "3a063b31-cb65-4f07-bb21-722b4860786e",
    },
    {
      source: "b1d2b84d-5421-4d2b-b304-f3523155d5bf",
      target: "bc4b9902-92bf-4013-8eca-2f0827610b1e",
    },
    {
      source: "0e8facf5-e302-4cdc-afc0-3874b1435a5b",
      target: "bc4b9902-92bf-4013-8eca-2f0827610b1e",
    },
    {
      source: "e9f17835-c89a-46da-b258-a786d0f5983b",
      target: "878cb2a8-3fe9-4eeb-aa84-8518a3921343",
    },
    {
      source: "5b8f06d6-c8a8-411c-948d-49d74d3529e5",
      target: "root",
    },
    {
      source: "00127c60-2e0b-400b-9054-9a2dcbbf6351",
      target: "65571e5a-d572-40ac-8365-4937ec67ea62",
    },
    {
      source: "aff3b86e-0d52-49db-a3c5-fa067cb489a0",
      target: "80057bc3-9b8d-4798-9c32-7789604593b6",
    },
    {
      source: "5de92b73-ff2e-40ac-8647-5cb81b63faa5",
      target: "86da3e1b-4048-4046-9236-0e3961cfeea7",
    },
    {
      source: "41a90684-abd5-4680-922c-170e0203f195",
      target: "cdb8dcdb-f0d3-46d0-a230-fc6cc959ac5f",
    },
    {
      source: "65571e5a-d572-40ac-8365-4937ec67ea62",
      target: "bd70e5e4-8dac-425b-8530-348e6804f48c",
    },
    {
      source: "8538d6f7-c944-4035-8d68-8821bec4dfa5",
      target: "1c13c0ab-eb5f-41aa-b965-1ead41e90f3e",
    },
    {
      source: "374bc337-0861-4208-afa7-85a6fda0c4dc",
      target: "966a1b3e-ae13-440a-8883-ffaa18e4adce",
    },
    {
      source: "93a11e4a-94c6-4644-b21c-28abfe11ead9",
      target: "2afa271a-85b1-4a20-8fea-865e0b89444e",
    },
    {
      source: "86da3e1b-4048-4046-9236-0e3961cfeea7",
      target: "bd70e5e4-8dac-425b-8530-348e6804f48c",
    },
    {
      source: "3634d821-2f5a-45ef-b6f2-a96cf847b2a3",
      target: "5b8f06d6-c8a8-411c-948d-49d74d3529e5",
    },
    {
      source: "7d1a5f4a-bbad-4ceb-b5d8-e53f700d8e83",
      target: "3dfc8886-b0fa-4f21-a0a9-93cc4cc410bd",
    },
    {
      source: "4cd2f152-0f9c-475e-8584-801b5042066d",
      target: "bc4b9902-92bf-4013-8eca-2f0827610b1e",
    },
    {
      source: "8ff96937-0ff1-461a-99e8-56423f83b056",
      target: "bd70e5e4-8dac-425b-8530-348e6804f48c",
    },
    {
      source: "2afa271a-85b1-4a20-8fea-865e0b89444e",
      target: "bd70e5e4-8dac-425b-8530-348e6804f48c",
    },
    {
      source: "d9455523-612f-4e3b-99e6-ac2f47657fd7",
      target: "878cb2a8-3fe9-4eeb-aa84-8518a3921343",
    },
    {
      source: "b441163d-d600-4e57-950a-337009b19055",
      target: "cdb8dcdb-f0d3-46d0-a230-fc6cc959ac5f",
    },
    {
      source: "966a1b3e-ae13-440a-8883-ffaa18e4adce",
      target: "bd70e5e4-8dac-425b-8530-348e6804f48c",
    },
    {
      source: "b2eaf30d-8690-4364-964e-e66c26508294",
      target: "966a1b3e-ae13-440a-8883-ffaa18e4adce",
    },
    {
      source: "f2700434-ab6b-4984-8858-554352780f79",
      target: "3a063b31-cb65-4f07-bb21-722b4860786e",
    },
    {
      source: "934af00c-c59e-45b4-9967-d315251e14c7",
      target: "bc4b9902-92bf-4013-8eca-2f0827610b1e",
    },
    {
      source: "188941e4-b5e8-4e14-970e-bf0bb3d594b8",
      target: "279c20ad-9964-47b0-a0d8-7e0e95936330",
    },
    {
      source: "a133b9ae-97d2-40b5-9a0e-30f5b783969e",
      target: "1c13c0ab-eb5f-41aa-b965-1ead41e90f3e",
    },
    {
      source: "1bdbe399-b112-48ce-908e-4a9edeb78246",
      target: "3a063b31-cb65-4f07-bb21-722b4860786e",
    },
    {
      source: "7334819a-1f39-4d92-9510-dad990cd34c7",
      target: "d5bd63e5-9501-4f4a-9f4c-1eaa3c1ad0f9",
    },
    {
      source: "1dfd2458-fb6b-4be0-bfce-804ba41eb548",
      target: "d4cf01be-0af9-4ee0-a421-15418921e430",
    },
    {
      source: "cbf83f9a-4290-49e9-a90c-9bcf21492dda",
      target: "d0bf5f17-919b-41c0-9c23-022e1e58ce1a",
    },
    {
      source: "15b06dac-bd6f-4218-a560-7c53a51c2205",
      target: "80057bc3-9b8d-4798-9c32-7789604593b6",
    },
    {
      source: "4c20bea8-557a-4b99-96e2-4e7d6d48a8d6",
      target: "279c20ad-9964-47b0-a0d8-7e0e95936330",
    },
    {
      source: "ffe89f4f-243b-4c75-9085-becf098f4aba",
      target: "3dfc8886-b0fa-4f21-a0a9-93cc4cc410bd",
    },
    {
      source: "cdb8dcdb-f0d3-46d0-a230-fc6cc959ac5f",
      target: "bd70e5e4-8dac-425b-8530-348e6804f48c",
    },
    {
      source: "e4dcadc1-f6a5-464b-8c19-d6a0714e267d",
      target: "cdb8dcdb-f0d3-46d0-a230-fc6cc959ac5f",
    },
    {
      source: "3a063b31-cb65-4f07-bb21-722b4860786e",
      target: "bd70e5e4-8dac-425b-8530-348e6804f48c",
    },
    {
      source: "ab91109b-c467-4614-ae22-15af741a622c",
      target: "d5bd63e5-9501-4f4a-9f4c-1eaa3c1ad0f9",
    },
    {
      source: "31e5ad3e-906f-4cbb-a6b5-4c2f3b70ac11",
      target: "d4cf01be-0af9-4ee0-a421-15418921e430",
    },
    {
      source: "80057bc3-9b8d-4798-9c32-7789604593b6",
      target: "bd70e5e4-8dac-425b-8530-348e6804f48c",
    },
    {
      source: "062ed0c0-3c1a-4635-b6a1-f083c02af290",
      target: "86da3e1b-4048-4046-9236-0e3961cfeea7",
    },
    {
      source: "1d228ee9-8d99-432a-a4ac-13387c7343f0",
      target: "878cb2a8-3fe9-4eeb-aa84-8518a3921343",
    },
    {
      source: "b5747fc6-a9d0-41ff-b6bb-b97eef6c8c1e",
      target: "1c13c0ab-eb5f-41aa-b965-1ead41e90f3e",
    },
    {
      source: "d4cf01be-0af9-4ee0-a421-15418921e430",
      target: "bd70e5e4-8dac-425b-8530-348e6804f48c",
    },
    {
      source: "9594caaf-5f9e-49e7-9fb0-064d4794faa9",
      target: "8ff96937-0ff1-461a-99e8-56423f83b056",
    },
    {
      source: "27b06814-ac42-4776-b978-9a37def42096",
      target: "8ff96937-0ff1-461a-99e8-56423f83b056",
    },
    {
      source: "d0bf5f17-919b-41c0-9c23-022e1e58ce1a",
      target: "bd70e5e4-8dac-425b-8530-348e6804f48c",
    },
    {
      source: "8ac02aa5-9b2c-486c-a2af-95000cee2fa4",
      target: "3634d821-2f5a-45ef-b6f2-a96cf847b2a3",
    },
    {
      source: "878cb2a8-3fe9-4eeb-aa84-8518a3921343",
      target: "bd70e5e4-8dac-425b-8530-348e6804f48c",
    },
    {
      source: "de3bd18d-3db9-4f45-91cf-e75710a50bf3",
      target: "65571e5a-d572-40ac-8365-4937ec67ea62",
    },
    {
      source: "be3d719e-d104-4150-b6e4-869f54beed97",
      target: "d5bd63e5-9501-4f4a-9f4c-1eaa3c1ad0f9",
    },
    {
      source: "22968658-520d-424b-bc37-9632b6cb0fbc",
      target: "d4cf01be-0af9-4ee0-a421-15418921e430",
    },
    {
      source: "cd98d2b3-2263-4af8-86ea-224ff4cc7710",
      target: "d4cf01be-0af9-4ee0-a421-15418921e430",
    },
  ],
};
