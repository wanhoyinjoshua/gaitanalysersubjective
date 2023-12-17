import React, { useCallback } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';


const Graph = () => {
    const elements = [
        { data: { id: 'one', label: 'Node 1' }, position: { x: 50, y: 100 } },
        { data: { id: 'two', label: 'Node 2' }, position: { x: 550, y: 100 } },
        { data: { id: 'three', label: 'Node 3' }, position: { x: 50, y: 50 } },
        { data: { id: 'four', label: 'Node 4 ' }, position: { x: 300, y: 50 } },
        { data: { id: 'five', label: 'Node 5' }, position: { x: 300, y: 150 } },
        { data: { id: 'six', label: 'Node 6' }, position: { x: 550, y: 150 } },
        { data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' } },
        { data: { source: 'four', target: 'two', label: 'Edge from Node1 to Node2' } },
        { data: { source: 'one', target: 'four', label: 'Edge from Node1 to Node2', "arrow": "tee" }, classes: 'custom-node',},
        { data: { source: 'four', target: 'one', label: 'Edge from Node1 to Node2' }, classes: 'custom-node'},
        { data: { source: 'three', target: 'one', label: 'Edge from Node1 to Node2' }, classes: 'custom-node'},
        { data: { source: 'three', target: 'four', label: 'Edge from Node1 to Node2' }, classes: 'custom-node'},
        { data: { source: 'five', target: 'one', label: 'Edge from Node1 to Node2' }, classes: 'custom-node'},
        { data: { source: 'five', target: 'two', label: 'Edge from Node1 to Node2' }, classes: 'custom-node'},
        { data: { source: 'six', target: 'two', label: 'Edge from Node1 to Node2' }, classes: 'custom-node'},
        
        
        
        
        
     ];
     const stylesheet=[
        {
            "selector": "node",
            "style": {
                'background-color': '#69c',
                'label': 'data(label)',
                'text-valign': 'center',
                'text-halign': 'center',
                'width': 'label',
                'height': 'label',
                'shape': 'rectangle',
                'padding': '10px', // Adjust padding as needed
                'border-width': '1px', // Optional: Add border
                'border-color': '#000',// Optional: Border color
              'label': 'data(label)'
            }
        },
        
        
        {
            selector: 'edge',
            style: {
              'width': 3,
              'line-color': '#ccc',
              'target-arrow-color': '#ccc',
              'target-arrow-shape': 'triangle',
              'curve-style': 'bezier' // Use 'bezier' for the curve style
            }
          },
          {
            selector: '.custom-node', // Use the ID or a class to target the specific edge
            style: {
              'width': 3,
              'line-color': 'red', // Set the color you want for this specific edge
              'target-arrow-color': 'red',
              'target-arrow-shape': 'triangle',
              'curve-style': 'bezier'
            }
          },
      ]
  return <CytoscapeComponent stylesheet={stylesheet}  elements={elements} className="w-full h-full"/>;

};

export default Graph;