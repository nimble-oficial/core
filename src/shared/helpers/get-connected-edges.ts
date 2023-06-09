/* eslint-disable @typescript-eslint/ban-ts-comment */

// @ts-ignore
export const getConnectedEdges = (nodes: Node[], edges: Edge[]): Edge[] => {
  // @ts-ignore
  const nodeIds = nodes.map((node) => node.id);

  return edges.filter(
    (edge) => nodeIds.includes(edge.source) || nodeIds.includes(edge.target),
  );
};
