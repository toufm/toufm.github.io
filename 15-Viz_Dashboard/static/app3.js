const file = "static/samples.json";
function buildCharts(samplechoice) {
    d3.json(file).then((data) => {
        var sample = data.samples.filter(a => a.id==samplechoice);
        var sampleotuids = sample[0].otu_ids;
        console.log(sampleotuids);

       
        // Got the data; defined the y ticks; put the otu_ids in descending order via reverse function
        var samplevalues = sample[0].sample_values;
        var yticks = sampleotuids.slice(0,10).reverse().map(item => `OTU ${item}`);
        var trace = [{
            type: 'bar',
            y: yticks,
            x: samplevalues.slice(0, 10).reverse(),
            orientation: 'h'
          }];
        Plotly.newPlot('bar', trace);



          //define bubble plot

        Plotly.newPlot('bar', trace);
        var trace1 = [{
            x: sampleotuids/*array of OTU IDs for the sample chosen*/,
            y: samplevalues/*array of sample values for the sample chosen*/,
            mode: 'markers',
            marker: {
              size: samplevalues,
              color: sampleotuids,
              colorscale: "Earth"
            }
          }];
          var layout = {
            title: 'Marker Size',
            showlegend: false,
            height: 600,
            width: 1000
          };
        Plotly.newPlot('bubble', trace1, layout);

        // define gauge plot
var trace3 = [
  {
    domain: { x: [0,9], y: [0,1]},
    value: parseFloat(wfreq),
    title: { text: "Belly Button Washing Frequency" },
    type: "indicator",
    mode: "gauge+number"
  }
];
var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
Plotly.newPlot('gauge', trace3, layout);
      
    });    
}

          



//Demographic Info Panel - take in metadata.
function meta(samplechoice) {

    var selector = d3.select("#sample-metadata");

    d3.json(file).then((data) => {
        var sample = data.metadata.filter(a => a.id==samplechoice);

        selector.html("");
        selector.append("h5").text("Id: " + sample[0].id);
        selector.append("h5").text("ethnicity: " + sample[0].ethnicity);
        selector.append("h5").text("Gender: " + sample[0].gender);
        selector.append("h5").text("Age: " + sample[0].age);
        selector.append("h5").text("Location: " + sample[0].location);
        selector.append("h5").text("Bbtype: " + sample[0].bbtype);
        selector.append("h5").text("Wfreq: " + sample[0].wfreq);
         
    });

  }
function optionChanged(samplechoice) {
    buildCharts(samplechoice);
    meta(samplechoice);
}
function init() {
    d3.json(file).then((data) => {
        var selector = d3.select("#selDataset");
        console.log(data.names);
        data.names.forEach(element => {
            selector.append("option").text(element).property("value", element);
        });
    })
    buildCharts(940);
    meta(940);
}
init();