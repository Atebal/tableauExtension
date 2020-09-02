'use strict';

let tableData=new Array();
let tempArray=new Array();
let maxLen=0;
var dataTosend;

(function () {
  $(document).ready(function () {
    // Initialises Tableau Data Extension
    tableau.extensions.initializeAsync().then(function () {
      // Once we initialize we call teh drawChartJS function.
      drawChartJS();
    }, function () { console.log('Error while Initializing: ' + err.toString()); });
  });
  // This javascript function gets data from our worksheet and draws the Doughnut.
  function drawChartJS() {
    debugger;
    // Gets all the worksheets in a Tableau Dashboard
    const worksheets = tableau.extensions.dashboardContent.dashboard.worksheets;
    // Finds a worksheet called worksheetData
    var worksheet = worksheets.find(function (sheet) {
      return sheet.name === "worksheetData";
    });

/* Atebal work start from here*/


var worksheet4 = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "worksheetData");
 worksheet4.getUnderlyingTablesAsync().then(logicalTables => {
   debugger;
     worksheet4.getUnderlyingTableDataAsync(logicalTables[0].id).then(dataTable => {
       debugger;
       // process the dataTable...
     });
 });


     debugger;
     var worksheetsArray
    worksheets.forEach(function (worksheet) {
       worksheetsArray=[worksheet.name];
    });

    let ColumnNames=new Array();
    
    //tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === worksheetsArray[0]).getUnderlyingDataAsync()
    tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === worksheetsArray[0]).getUnderlyingTablesAsync()
    .then(dataTable => {
       let field = dataTable.columns.forEach(function(column_name,index)
      {
     
               var colnames=new Object()
              {
                colnames.columnname=column_name.fieldName,
                colnames.index=index
               };

               ColumnNames.push(colnames);
          })

   
var totallevels=0;

for (let data of dataTable.data) {

  if(totallevels>parseInt(data[2].value))
      totallevels=totallevels;
   else 
      totallevels=parseInt(data[2].value);
      var targetBox="";
      var sourceBox="";
            var tr=new Object()
            {
              
              tr.artifact_name=data[0].value,
              tr.id=data[1].value,
              tr.level=parseInt(data[2].value),
              tr.source_column_name=data[3].value,
              tr.source_schema=data[4].value,
              tr.source_table_name=data[5].value,
              tr.target_column_name=data[6].value,
              tr. target_schema=data[7].value,
              tr.target_table_name=data[8].value
              
            };
    
            tempArray.push(tr);
          }


tempArray.sort(function(a, b){
  return a.level-b.level
})

debugger;
for(var j=0;j<tempArray.length-1;j++)
{

    var tr=new Object()
    {
      
        tr.artifact_name=tempArray[j].artifact_name,
        tr.id=tempArray[j].id,
        tr.level=parseInt(tempArray[j].level),
        tr.source_column_name=tempArray[j].source_column_name,
        tr.source_schema=tempArray[j].source_schema,
        tr.source_table_name=tempArray[j].source_table_name,
        tr.target_column_name=tempArray[j].target_column_name,
        tr.target_schema=tempArray[j].target_schema,
        tr.target_table_name=tempArray[j].target_table_name
        tr.source_artifact=tempArray[j].source_schema+"#"+tempArray[j].source_table_name+"#"+tempArray[j].source_column_name,
        tr.target_artifact="",
        tr.label=tempArray[j].artifact_name
       
         
    };
    tableData.push(tr);
}


for(var j=0;j<tableData.length-1;j++)
{
for(var k=1;k<tableData.length;k++)
{
    if((parseInt(tableData[j].level)+1) == parseInt(tableData[k].level)
    && 
   (tableData[j].source_column_name==tableData[k].target_column_name) )
   {
       
    tableData[j].target_artifact=tableData[k].source_artifact;
    }
   
}
}




  /*  for (var i=0; i<tableData.length; i++) {
    for (var j=1; j<tableData.length; j++) {
    if ( (parseInt(tableData[i].level) + 1 == tableData[j].level) &&
    (tableData[i].source_column_name == tableData[j].target_column_name) ) {
        tableData[i].target_artifact.push(tableData[j].source_artifact);
        }}}
    */
   

tableData.sort(function(a, b){
    return a.level-b.level
  })
//var josndata2=JSON.stringify(tableData);



var tempLength=0;
for(var i=0;i<=totallevels;i++)
{
 tempLength=tableData.filter(x=>x.level==i).length;
if(tempLength>maxLen)
{
  maxLen=tempLength
}
else
{
  maxLen=maxLen;
}
}
 dataTosend={"MaxLength":maxLen,"tableData":tableData};

 //var jsonddata=JSON.stringify(dataTosend);
              
    });

/*END single node */

    // Call a function on the worksheet Object to get the Summary Data.
    worksheet.getSummaryDataAsync().then(function (sumdata) {
      // Create an empty arrays for our labels and data set.
      var labels = [];
      var data = [];
      // We get our summary data:
      debugger;
      var worksheetData = sumdata.data;
      // We loop through our summary data and hard cold which columns goes into Label
      // and which column goes into the values.
      for (var i = 0; i < worksheetData.length; i++) {
        labels.push(worksheetData[i][0].formattedValue);
        data.push(worksheetData[i][1].value);
      }
      // Draw teh chart as before.
      var ctx = $("#myChart");


//Draw chart by Atebal
debugger;
let graphData=tableData;

    /*Atebal work ends here */

    function init(graphData, maxLen) {
        debugger;
      var graph = new joint.dia.Graph;

      let max_level = graphData[0].level;
      for (let i = 0; i < graphData.length; i++) {
          if (graphData[i].level > max_level) {
              max_level = graphData[i].level;
          }
      }

      new joint.dia.Paper({
          el: $('#paper-parent-restriction'),
          width: '100%',
          height: maxLen * 200,
          model: graph,
          frozen: true,
          model: graph
      });

      for (let k = 0; k <= max_level; k++) {
          window['level' + `${k}`] = 0;
      }

      let posY, posX, levelPosX = 120, boxArray = [];

      for (let i = 0; i < graphData.length; i++) {
          if (graphData[i].level == 0) {
              posX = max_level * 320 - levelPosX;
              if (level0 == 0) {
                  posY = 50;
              } else {
                  if (graphData[i - 1].level == graphData[i].level) {
                      posY = posY + Math.floor(Math.random() * (160 - 140 + 1) + 180);
                  } else {
                      posY = 50;
                  }
              }
              level0++;
          } else {
              debugger;
              if (graphData[i - 1].level == graphData[i].level) {
                  posY = posY + Math.floor(Math.random() * (160 - 140 + 1) + 180);
              } else {
                  posY = 50;
              }
              posX = (max_level * 320) - (graphData[i].level * 320);
          }
          /**
           * create main block 
          */
          window[graphData[i].source_artifact] = new joint.shapes.basic.TextBlock({
              position: { x: posX, y: posY },
              size: {
                  width: 200,
                  height: 120
              },

              attrs: { rect: { fill: 'transparent' } },
              content: "<table><tr><th>" + graphData[i].source_artifact + "</th></tr><tr><td>" + graphData[i].source_schema + "</td></tr><tr><td>" + graphData[i].source_table_name + "</td></tr><tr><td>" + graphData[i].source_column_name + "</td></tr></table>"

          });
          boxArray.push(window[graphData[i].source_artifact]);
          //window[graphData[i].artifact_name].addTo(graph);
      }
      graph.addCells(boxArray);

      /**
       * start linking element code
      */
      for (let j = 0; j < graphData.length; j++) {
          if (graphData[j].source_artifact != "" && graphData[j].target_artifact != "") {
              window['link' + `${j}`] = new joint.shapes.standard.Link();
              window['link' + `${j}`].source(window[graphData[j].source_artifact]);
              window['link' + `${j}`].target(window[graphData[j].target_artifact]);
              window['link' + `${j}`].router('manhattan');
              window['link' + `${j}`].connector('jumpover');
              window['link' + `${j}`].attr({
                  line: {
                      stroke: '#222222',
                      strokeWidth: 1,
                      targetMarker: {
                          type: 'path',
                          fill: 'gray',
                          stroke: 'none',
                      }
                  }
              });
              window['link' + `${j}`].labels([{
                  markup: [{
                      tagName: 'rect',
                      selector: 'labelBody'
                  }, {
                      tagName: 'text',
                      selector: 'labelText'
                  }],
                  attrs: {
                      labelText: {
                          text: graphData[j].target_table_name,
                          fill: '#7c68fc',
                          fontFamily: 'sans-serif',
                          textAnchor: 'middle',
                          textVerticalAnchor: 'middle'
                      },
                      labelBody: {
                          ref: 'labelText',
                          refX: 0,
                          refY: 0,
                          refWidth: '100%',
                          refHeight: '100%',
                          stroke: '#7c68fc',
                          fill: 'white',
                          strokeWidth: 2,
                          rx: 5,
                          ry: 5,
                      }

                  },
                  size: {
                      width: 50, height: 30
                  },
                  position: {
                      distance: 0.5,
                      args: {
                          keepGradient: true,
                          ensureLegibility: true,
                      }
                  }
              }]);
              window['link' + `${j}`].addTo(graph);
          }
      }
     
  }

  init(graphData, maxLen);

/*---End chart by Atebal-----*/



      /*var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: labels, // This now comes from Tableau
          datasets: [{
            backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
            data: data // This now comes from Tableau
          }]
        }
      }); */
    });
  }
})();
