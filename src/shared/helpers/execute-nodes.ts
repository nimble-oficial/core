type ProcessNode = (node: any) => void;

export const executeNodes = (nodes, edges, processNode: ProcessNode): void => {
  const visited = new Map();

  // Depth First Search (DFS) Algorithm
  // See https://en.wikipedia.org/wiki/Depth-first_search
  const depthFirstSearch = (node) => {
    if (visited.get(node.id)) {
      return;
    }

    visited.set(node.id, true);

    const nodeEdges = edges.filter((edge) => edge.source === node.id);

    processNode(node);

    for (const edge of nodeEdges) {
      const targetNode = nodes.find((node) => node.id === edge.target);
      depthFirstSearch(targetNode);
    }
  };

  // When user creates a new command, under the hood a builder with ONE node will be created.
  // The created node will be the first node in the array of nodes.
  // So we can start the DFS from the first node.
  depthFirstSearch(nodes[0]);
};
