export class ParseNodes {
  static async execute(nodes: any[], connectedEdges: any[]) {
    const groupedEdges = connectedEdges.reduce(
      (acc, edge) => {
        if (!acc[edge.source]) {
          acc[edge.source] = [];
        }
        const targetNode = nodes.find((node) => node.id === edge.target);
        if (targetNode) {
          acc[edge.source].push(targetNode);
        }
        return acc;
      },

      {} as { [key: string]: Node[] },
    );

    const parsedNodes = nodes.map((node) => {
      const { id } = node;
      const children = groupedEdges[id] || [];

      return {
        id,
        children,
      };
    });

    return parsedNodes;
  }
}
