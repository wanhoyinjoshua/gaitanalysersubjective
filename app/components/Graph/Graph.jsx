import React, { useCallback,useEffect ,useState} from 'react';
import CytoscapeComponent from 'react-cytoscapejs';


const Graph = (props) => {
    const [data,setData]=useState()
    const [element,setElement]=useState()

    useEffect(()=>{

        console.log("shiadhisodfjsoidji")
        console.log(props)
        setData(calGraphdata(props.data))
        var realdata=calGraphdata(props.data)
        setElement([
            { data: { id: 'one', label: 'Strength #' }, position: { x: 50, y: 100 },classes: `${realdata["true_str_impairment_count"]>0?"active":"strike"}`},
            { data: { id: 'two', label: 'Deviation' }, position: { x: 550, y: 100 } },
            { data: { id: 'three', label: 'Sensation #' }, position: { x: 50, y: 50 },classes: `${realdata["true_sensation_impairment_count"]>0?"active":"strike"}` },
            { data: { id: 'four', label: 'Coordination #' }, position: { x: 300, y: 50 },classes: `${realdata["true_coor_impairment_count"]>0?"active":"strike"}` },
            { data: { id: 'five', label: 'ROM #' }, position: { x: 300, y: 150 },classes: `${realdata["true_rom_impairment_count"]>0?"active":"strike"}`  },
            { data: { id: 'six', label: 'Compensation' }, position: { x: 550, y: 150 },classes: `${realdata["true_comp_impairment_count"]>0?"active":"strike"}`  },
            { data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' },classes: `${realdata["true_str_impairment_count"]>0?"active_arr":"strike_arr"}` },
            { data: { source: 'four', target: 'two', label: 'Edge from Node1 to Node2' },classes: `${realdata["true_coor_impairment_count"]>0?"active_arr":"strike_arr"}`  },
            { data: { source: 'one', target: 'four', label: 'Edge from Node1 to Node2', "arrow": "tee" }, classes: `${realdata["true_str_impairment_count"]>0?"active_arr":"strike_arr"}`},
            { data: { source: 'four', target: 'one', label: 'Edge from Node1 to Node2' }, classes: `${realdata["true_coor_impairment_count"]>0?"active_arr":"strike_arr"}` },
            { data: { source: 'three', target: 'one', label: 'Edge from Node1 to Node2' }, classes: `${realdata["true_sensation_impairment_count"]>0?"active_arr":"strike_arr"}`},
            { data: { source: 'three', target: 'four', label: 'Edge from Node1 to Node2' }, classes: `${realdata["true_sensation_impairment_count"]>0?"active_arr":"strike_arr"}`},
            { data: { source: 'five', target: 'one', label: 'Edge from Node1 to Node2' },classes: `${realdata["true_rom_impairment_count"]>0?"active_arr":"strike_arr"}`},
            { data: { source: 'five', target: 'two', label: 'Edge from Node1 to Node2' }, classes: `${realdata["true_rom_impairment_count"]>0?"active_arr":"strike_arr"}`},
            { data: { source: 'six', target: 'two', label: 'Edge from Node1 to Node2' }, classes: `${realdata["true_comp_impairment_count"]>0?"active_arr":"strike_arr"}`},
            
            
            
            
            
         ])

        

    },[])
    function returnTrueimpairmentcount(list){
        return list.filter((e) =>e.status&&e.status==true).length

    }
    function calGraphdata(list){

    
        var str_impairments=list.filter((e) => {
          // Check if the property 'class' exists in the object before using it
          return  (e.class&&(e["class"].includes("eccentric_str") || e["class"].includes("concentric_str")));
        });
        var coor_impairments=list.filter((e) =>e.class&&e.class.includes("coor"))
        var sensation_impairments=list.filter((e) =>e.class&&e.class.includes("sensation"))
        var rom_impairments=list.filter((e) =>e.class&&e.class.includes("rom"))
        var compensation_impairments=list.filter((e) =>e.class&&e.class.includes("compensation"))
        const true_str_impairment_count=returnTrueimpairmentcount(str_impairments)
        const true_coor_impairment_count=returnTrueimpairmentcount(coor_impairments)
        const true_sensation_impairment_count=returnTrueimpairmentcount(sensation_impairments)
        const true_rom_impairment_count=returnTrueimpairmentcount(rom_impairments)
        const true_comp_impairment_count=returnTrueimpairmentcount(compensation_impairments)
        //if  count ==0 ,then strike through and its associated arrows= red and decrease opapcity 
        // if >0 , stay active , and width = number.
    
        return {
          "true_str_impairment_count":true_str_impairment_count,
          "true_coor_impairment_count":true_coor_impairment_count,
          "true_sensation_impairment_count":true_sensation_impairment_count,
          "true_rom_impairment_count":true_rom_impairment_count,
          "true_comp_impairment_count":true_comp_impairment_count
        }
    
        
    
    
      }

    const elements = [
        { data: { id: 'one', label: 'Strength #' }, position: { x: 50, y: 100 },classes: `${props&&props.data["true_str_impairment_count"]>0?"active":"strike"}`},
        { data: { id: 'two', label: 'Deviation' }, position: { x: 550, y: 100 } },
        { data: { id: 'three', label: 'Sensation #' }, position: { x: 50, y: 50 } },
        { data: { id: 'four', label: 'Coordination #' }, position: { x: 300, y: 50 } },
        { data: { id: 'five', label: 'ROM #' }, position: { x: 300, y: 150 } },
        { data: { id: 'six', label: 'Compensation' }, position: { x: 550, y: 150 } },
        { data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' } },
        { data: { source: 'four', target: 'two', label: 'Edge from Node1 to Node2' } },
        { data: { source: 'one', target: 'four', label: 'Edge from Node1 to Node2', "arrow": "tee" }, classes: 'custom-node'},
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
              'opacity':0.5,
              'line-color': 'orange',
              'target-arrow-color': 'orange',
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
          {
            selector: '.active_arr', // Use the ID or a class to target the specific edge
            style: {
                'width': 3,
                'opacity':1,
                'line-color': 'green',
                'target-arrow-color': 'green',
                'target-arrow-shape': 'triangle',
                'curve-style': 'bezier' // Use 'bezier' for the curve style
              }
          },
          {
            selector: '.strike', // Use the ID or a class to target the specific edge
            "style": {
                'background-color': 'red',
                'label': 'data(label)',
                'text-valign': 'center',
                'text-halign': 'center',
                "text-decoration": "line-through",
                "opacity":0.2,
                'width': 'label',
                'height': 'label',
                'shape': 'rectangle',
                'padding': '10px', // Adjust padding as needed
                'border-width': '1px', // Optional: Add border
                'border-color': '#000',// Optional: Border color
              'label': 'data(label)'
            }
          }
          , {
            selector: '.strike_arr',
            style: {
                'width': 3,
                'opacity':0.2,
                'line-color': 'red',
                'target-arrow-color': 'red',
                'target-arrow-shape': 'triangle',
                'curve-style': 'bezier' // Use 'bezier' for the curve style
              }
          },
      ]

      const layout={
        name: 'preset',
        padding: 10
      }
      if(element){return <CytoscapeComponent layout={layout} stylesheet={stylesheet}  elements={element} className="w-full h-full"

      zoomingEnabled={false}
      userZoomingEnabled={false}
      panningEnabled={false}
      
      
      />;


      }
      else[
        <div>loading</div>
      ]
  
};

export default Graph;