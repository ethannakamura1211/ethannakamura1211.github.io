var METRIC = "World-View";
var YEAR = 2023;
let DOTS = document.getElementsByClassName("dot");
let MTX_IDX = ['World-View','Happiness-Score', 'GDP', 'Social-Support', 'Healthy-Life-Expectancy',
'Freedom', 'Trust', 'Generosity', 'Dystopia'];
let DESCRIPTIONS = ['This map view provides an initial overview of the average global happiness score for each country for the years 2015 - 2023', 
'The World Happiness Report combines various indicators, along with other factors, using statistical analysis to calculate the happiness score for each country. It recognizes that happiness is a multidimensional concept influenced by economic, social, and psychological factors.'+
'The following slides shows each metric used in calculating the score.',
'GDP per capita represents the economic output per person in a country. It reflects the standard of living and material well-being. A higher GDP per capita generally provides individuals with more resources and opportunities, which can contribute to overall happiness.',
'Social support measures the extent to which individuals have supportive relationships, social networks, and access to welfare systems. Strong social support systems contribute to social cohesion, a sense of belonging, and emotional well-being, thus positively impacting happiness.',
'Healthy life expectancy represents the average number of years a person can expect to live in good health. Longer and healthier lives contribute to higher levels of happiness by allowing individuals to engage in fulfilling activities and experience a higher quality of life.',
'Freedom measures the degree of political and civil liberties individuals have in a country. Countries with high levels of freedom provide individuals with the ability to make choices, express themselves, and participate in decision-making processes, fostering happiness.',
'Trust measures the absence of corruption and the level of trust individuals have in institutions and society. Countries with low corruption levels and high levels of trust create a sense of security, fairness, and predictability, which positively impacts happiness.',
'Generosity captures the willingness of individuals to donate money or time to charitable causes. Acts of generosity contribute to social connections, a sense of purpose, and the satisfaction of making a positive impact, thus enhancing happiness.',
'Dystopia represents an imaginary world that has the least happiness and is used as a benchmark for comparison. The dystopia score provides a reference point to measure how far each country is from the hypothetical least happy nation, enabling a relative comparison.',
];

let AN2023 = [
  [
    {
      note: {
        label: "Despite not having the highest GDP per capita, countries like Costa Rica consistently ranked high in happiness scores",
      },
      type: d3.annotationCalloutElbow,
      connector: { end: "dot" },
      x: 200,
      y: 215,
      dy: 15,
      dx: 570,
    }
  ],
   [
    {
      note: {
        label: "Luxembourg has the highest GDP score for the 4th consecutive year",
      },
      type: d3.annotationCalloutElbow,
      connector: { end: "dot" },
      x: 600,
      y: 5,
      dy: -5,
      dx: 250,
    }
  ], [
    {
      note: {
        label: "Scandinavian countries consistently rank high in terms of social support",
      },
      type: d3.annotationCalloutRect,
      subject: {
      width: 25,
      height: 25
    },
      x: 800,
      y: 2,
      dy: -5,
      dx: 30,
  }
  ],
 [
  {
    note: {
      label: "Four of the top 5 countries with highest life expectancy scores are in Asia",
    },
    type: d3.annotationCalloutCircle,
    subject: {
      radius: 20,         // circle radius
      radiusPadding: 10   // white space around circle befor connector
    },
    x: 600,
    y: 20,
    dy: 80,
    dx: 130,
  }
 ], [], [],
  [
    {
      note: {
        label: "Myanmar, Indonesia and Gambia have consistently ranked high in terms of generosity",
      },
      type: d3.annotationCalloutRect,
      subject: {
      width: 30,
      height: 30
    },
      x: 550,
      y: 15,
      dy: 65,
      dx: 100,
  },
  {
      note: {
        label: "The first Western Europe Region country to show up is United Kingdom at #8",
      },
      type: d3.annotationCalloutElbow,
      connector: { end: "dot" },
      x: 290,
      y: 90,
      dy: 240,
      dx: 200,
  }
  ],
  []
]

let AN = [
    [
        {
          note: {
            label: "The top countries are mostly in the Western Europe Region",
          },
          type: d3.annotationCalloutRect,
          subject: {
          width: 70,
          height: 70
        },
          x: 120,
          y: 22,
          dy: -20,
          dx: 120,
        }
    ],
    [
      
    ],
    [
        {
            note: {
              label: "Mauritius is one of two African countries with high social support scores",
            },
            type: d3.annotationCalloutElbow,
            connector: { end: "dot" },
            x: 320,
            y: 349,
            dy: 20,
            dx: 450,
        },
        {
            note: {
              label: "South Africa is the other country",
            },
            type: d3.annotationCalloutElbow,
            connector: { end: "dot" },
            x: 320,
            y: 466,
            dy: -20,
            dx: 310,
        }
    ],
    [
        
    ],
    [
        {
            note: {
              label: "Cambodia consistenly has one of the highest Freedom scores but it is usually not ranked highly overall",
            },
            type: d3.annotationCalloutElbow,
            connector: { end: "dot" },
            x: 580,
            y: 25,
            dy: 5,
            dx: 100,
        }
    ],
    [
        {
            note: {
              label: "Both Singapore and Rawanda consistenly score amongst the top countries with highest trust in government",
            },
            type: d3.annotationCalloutRect,
            subject: {
            width: 17,
            height: 17
          },
            x:340,
            y: 22,
            dy: 100,
            dx: 100,
        }
    ],
    [
      {
          note: {
            label: "None of the Western Europe Region countries are in the top 5 countries with highest generosity score",
          },
          type: d3.annotationCalloutCircle,
          subject: {
          radius: 25,         // circle radius
          radiusPadding: 5   // white space around circle befor connector
        },
          x: 280,
          y: 40,
          dy: 50,
          dx: 100,
      }
    ],
    [
        {
            note: {
              label: "Many countries with high Dystopia scores are also poorly ranked",
            },
            type: d3.annotationCalloutRect,
            subject: {
            width: 45,
            height: 45
          },
            x: 580,
            y: 22,
            dy: 80,
            dx: 200,
        }
    ]
]

function process(happinessdata, metric, year) {
  d3.select('.slidecontainer').style("opacity", 1);
    var colors = ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5",
    "#d9d9d9", "#bc80bd", "#ccebc5", "#ffed6f", "#8dd3c7", "#ffffb3", "#bebada", "#fb8072"];
    var margin = {top: 100, right: 150, bottom: 60, left: 150},
    width = 1200 - margin.left - margin.right,
    height = 650 - margin.top - margin.bottom;
    var m = metric + "-" + year;
    // var xdomain = 7.5;
    var xdomain =  d3.max(happinessdata, d => +d[metric+"-"+year]);
    if(year == 2022){
        // xdomain = 7500;
        xdomain =  d3.max(happinessdata, d => +d[metric+"-"+year] + 250);
    }
    var rankeddata = happinessdata.filter(function(d,i){
        return d["Rank-"+year] != "";
    });
    console.log(METRIC + YEAR + m);
    rankeddata.sort(function(a,b){
        try {
            return d3.descending(parseFloat(a[m].replace(/,/g,"")), parseFloat(b[m].replace(/,/g,"")));
          }
          catch(err) {
            return d3.descending(parseFloat(a[m]), parseFloat(b[m]));
          }
    });

    var top50 = rankeddata.filter(function(d,i){
        if (year == 2023) {
          return i < 49;
        }
        else {
        return i < 50;
        }
    });

    var y = d3.scaleBand().rangeRound([0,height]).domain(top50.map(function(d) { return d["Country"]; }))
    .paddingInner(0.15);
    var x = d3.scaleLinear()
    .domain([0, xdomain])
    .range([ 0, width]);
    
    var svg = d3.select("#chart").append("svg")
        .style("width", (width + margin.left + margin.right) + "px")
        .style("height", (height + margin.top + margin.bottom) + "px")
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x))
    .selectAll("text").attr("transform", "translate(-10,0)rotate(-45)").style("text-anchor", "end");
    svg.append("g").call(d3.axisLeft(y));

    var Tooltip = d3.select("#detail").append("div").style("opacity", 0)
    .attr("class", "tooltip").style("background-color", "white").style("border", "solid")
    .style("border-width", "2px").style("border-radius", "5px").style("padding", "5px");
    var mouseover = function(event,d) {
        Tooltip.style("opacity", 1);
        d3.select(this)
            .style("stroke", "black")
            .style("opacity", 1);
    };
    var mousemove = function(event,d) {
        Tooltip
          .html("<img id='flags' src='http://flags.fmcdn.net/data/flags/mini/"+d["code2"]+".png'><br/><b>Country:</b> "+d["Country"]+"<br/>"+
          "<b>Region:</b> "+d["Region"]+"<br/>"+ "<b>Year:</b> "+year+"<br/>"+
          "<b>Rank:</b> "+d["Rank-"+year]+"<br/>"+ 
          "<b>Happiness Score:</b> "+ Math.round(d["Happiness-Score-"+year] * 100) / 100+"<br/>"+
          "<b>GDP:</b> "+ Math.round(d["GDP-"+year] * 100) / 100+"<br/>"+
          "<b>Social Support Score:</b> "+ Math.round(d["Social-Support-"+year] * 100) / 100+"<br/>"+
          "<b>Healthy Life Expectancy Score:</b> "+ Math.round(d["Healthy-Life-Expectancy-"+year] * 100) / 100+"<br/>"+
          "<b>Freedom Score:</b> "+ Math.round(d["Freedom-"+year] * 100) / 100+"<br/>"+
          "<b>Trust Score:</b> "+Math.round(d["Trust-"+year] * 100) / 100 +"<br/>"+
          "<b>Generosity Score:</b> "+Math.round(d["Generosity-"+year] * 100) / 100 + "<br/>"+
          "<b>Dystopia Score:</b> "+Math.round(d["Dystopia-"+year] * 100) / 100)
          .style("left", (d3.pointer(event,this)[0]) + "px")
          .style("top", (d3.pointer(event,this)[1]) + "px")
    };
    var mouseleave = function(event,d) {
        Tooltip
          .style("opacity", 0)
        d3.select(this)
          .style("stroke", "none")
          .style("opacity", 1)
    };
    svg.selectAll("bars")
        .data(top50)
        .enter()
        .append("rect")
        .attr("x", x(0) )
        .attr("y", function(d) { return y(d["Country"]); })
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseout", mouseleave)
        .attr("width", 0)
        .attr("height", y.bandwidth() )
        .transition()
          .duration(1000)
          .delay((d,i) => { return i*30})
        .attr("width", function(d) { return x(d[m].replace(/,/g,"")); })
        
        .attr("fill", function(d){return colors[parseInt((d["Rank-"+year]-1)/10)];});
    

        svg.append("text").attr("x", 945).attr("y", 130).text("Happiness Rank").style("font-size", "12px").attr("alignment-baseline","bottom right")
        for (let i = 0; i < colors.length; i++) {
            var start = i*10 + 1
            var end = (i + 1) *10
            var yloc = 130 + (i+1)*15
            svg.append("rect").attr("x",950).attr("y",yloc).attr("height", 10).attr("width", 10).style("fill", colors[i])
            svg.append("text").attr("x", 970).attr("y", yloc+10).text(start + "-" + end).style("font-size", "10px").attr("alignment-baseline","bottom right")
        }
        var idx = MTX_IDX.indexOf(metric);
        if (YEAR == 2023)
        {
          
          const makeAnnotations = d3.annotation().annotations(AN2023[idx-1]);
          svg.append('g').call(makeAnnotations);
        }
        else if (YEAR == 2022) {
            const makeAnnotations = d3.annotation().annotations(AN[idx-1]);
            svg.append('g').call(makeAnnotations);
            
            if (idx == 1) {
              var an = [
                {
                    note: {
                        label: "The pandemic brought not only pain and suffering but also an increase in social support and benevolence attributing to high scores in 2022",
                      },
                      x: 660,
                      y: 487,
                      dy: -20,
                      dx: 100,
                }
            ]
            const makeAnnotations = d3.annotation().annotations(an);
            svg.append('g').call(makeAnnotations);
            }
        } else {
            var an = [
                {
                    note: {
                        label: "The scores' scale besides 2022 is 1000 times less",
                      },
                      x: 660,
                      y: 487,
                      dy: -20,
                      dx: 100,
                }
            ]
            const makeAnnotations = d3.annotation().annotations(an);
            svg.append('g').call(makeAnnotations);
        }
}

function process_map(happinessdata, metric, year) {
  console.log(metric)
  if (metric=='World-View') {
    d3.select('.slidecontainer').style("opacity", 0);
  }
  var margin = {top: 200, right: 150, bottom: 60, left: 150},
  width = 1200 - margin.left - margin.right,
  height = 650 - margin.top - margin.bottom;

  const path = d3.geoPath();
  const projection = d3.geoMercator()
    .scale(150)
    .center([0,20])
    .translate([width / 2, height / 2]);
  var m = metric + "-" + year;
  // var xdomain = 7.5;
  
  console.log(METRIC + YEAR + m);
  
  var svg = d3.select("#chart").append("svg")
  .style("width", (width + margin.left + margin.right) + "px")
  .style("height", (height + margin.top + margin.bottom) + "px")
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const data = new Map();
  const colorScale = d3.scaleLinear()
  .domain([7.65, 0])
  .range(["#ff7900","#0086ff"]);
  // ["#ff7900","#0086ff"]

  // NEW CODE
  var legendWidth = 200;
var legendHeight = 10;
var legendX = width - margin.right - legendWidth +60;
var legendY = height - margin.bottom + 100;

// Create a color scale for the legend
var legendColorScale = d3.scaleLinear()
  .domain([0, 7.65])
  .range(["#0086ff","#ff7900"]);

// Append a new SVG group for the legend
var legend = svg.append("g")
  .attr("class", "legend")
  .attr("transform", "translate(" + legendX + "," + legendY + ")");

// Create color gradient for the legend
var gradient = legend.append("defs")
  .append("linearGradient")
  .attr("id", "legend-gradient")
  .attr("x1", "0%")
  .attr("x2", "100%")
  .attr("y1", "0%")
  .attr("y2", "0%");

gradient.selectAll("stop")
  .data(legendColorScale.ticks().map((d, i, n) => ({ offset: `${100 * i / n.length}%`, color: legendColorScale(d) })))
  .enter()
  .append("stop")
  .attr("offset", d => d.offset)
  .attr("stop-color", d => d.color);

// Add color gradient rect to the legend
legend.append("rect")
  .attr("width", legendWidth)
  .attr("height", legendHeight)
  .style("fill", "url(#legend-gradient)");

// Add text labels for the legend
legend.selectAll("text")
  .data(legendColorScale.ticks())
  .enter()
  .append("text")
  .style("font-size",10)
  .attr("x", function(d, i) {
    return i * (legendWidth / (legendColorScale.ticks().length - 1));
  })
  .attr("y", legendHeight + 10)
  .style("text-anchor", function(d, i) {
    return i === 0 ? "start" : i === legendColorScale.ticks().length - 1 ? "end" : "middle";
  })
  .text(function(d) {
    return d;
  });

  legend.append("text")
  .attr("class", "legend-title")
  .attr("x", legendWidth / 2)
  .attr("y", -5)
  .style("text-anchor", "middle")
  .style("font-size",11)
  .text("Happiness Scale");
  //


  // Load external data and boot
  Promise.all([
    d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"),
    d3.csv("./data/data1.csv", function(d) {
        data.set(d.code, +d['Avg-Happiness-Score'])
    })]).then(function(loadData){
        let topo = loadData[0]
    
        const  Tooltip = d3.select("#detail").append("div").style("opacity", 0)
      .attr("class", "tooltip").style("background-color", "white").style("border", "solid")
      .style("border-width", "2px").style("border-radius", "5px").style("padding", "5px");
        var mouseOver = function(d) {
          Tooltip.style("opacity", 1);
        d3.selectAll(".Country")
          .transition()
          .duration(200)
          .style("opacity", .5)
        d3.select(this)
          .transition()
          .duration(200)
          .style("opacity", 1)
          .style("stroke", "black")
      }
      
      
      var mousemove = function(event,d) {
        Tooltip
          .html("<img id='flags' src='http://flags.fmcdn.net/data/flags/mini/"+countryISOMapping[d.id]+".png'><br/><b>Country:</b> "+d.properties.name+"<br/><b>Avg. Happiness Score: </b>"+Math.round(d.total * 100) / 100+"<br/>")
          .style("left", (d3.pointer(event,this)[0])+ "px")
          .style("top", (d3.pointer(event,this)[1]) + "px")
    };

      var mouseLeave = function(event, d) {
        Tooltip
          .style("opacity", 0)
        d3.selectAll(".Country")
          .transition()
          .duration(200)
          .style("opacity", .8)
        d3.select(this)
          .transition()
          .duration(200)
          .style("stroke", "transparent")
          
      }
    
      // Draw the map
      svg.append("g")
        .selectAll("path")
        .data(topo.features)
        .enter()
        .append("path")
          // draw each country
          .attr("d", d3.geoPath()
            .projection(projection)
          )
          // set the color of each country
          .attr("fill", function (d) {
            d.total = data.get(d.id) || 0;
            return colorScale(d.total);
          })
          .style("stroke", "transparent")
          .attr("class", function(d){ return "Country" } )
          .style("opacity", .8)
          .on("mouseover", mouseOver )
          .on("mousemove", mousemove)
          .on("mouseleave", mouseLeave );
    
    })
}

function currentSlide(metric) {
    if (metric=='World-View') {
      currentSlide_map(metric)
    }
    else {
    METRIC = metric;
    d3.selectAll(".menu").style("background-color", '#333333');
    let idx = MTX_IDX.indexOf(METRIC);
    console.log(idx)
    d3.selectAll("#Slide"+idx).style("background-color", 'red');
    d3.selectAll("#chart > *").remove();
    d3.selectAll("#chart-text > *").remove();
    d3.selectAll("#detail > *").remove();
    console.log("Index"+MTX_IDX.indexOf(metric));
    // d3.select("#chart-text").html(METRIC+'<br/>'+DESCRIPTIONS[MTX_IDX.indexOf(metric)]);
    d3.select("#chart-text").html(DESCRIPTIONS[MTX_IDX.indexOf(metric)]);
    d3.csv("./data/data1.csv").then(function(data){process(data, METRIC, YEAR)});
    }
}

function currentSlide_map(metric) {
  METRIC = metric;
  d3.selectAll(".menu").style("background-color", '#333333');
  let idx = MTX_IDX.indexOf(METRIC);
  console.log(idx);
  d3.selectAll("#Slide"+idx).style("background-color", 'red');
  d3.selectAll("#chart > *").remove();
  d3.selectAll("#chart-text > *").remove();
  d3.selectAll("#detail > *").remove();
  console.log("Index"+MTX_IDX.indexOf(metric));
  // d3.select("#chart-text").html(METRIC+'<br/>'+DESCRIPTIONS[MTX_IDX.indexOf(metric)]);
  d3.select("#chart-text").html(DESCRIPTIONS[MTX_IDX.indexOf(metric)]);
  d3.csv("./data/data1.csv").then(function(data){process_map(data, METRIC, YEAR)});
// d3.csv("https://raw.githubusercontent.com/maa-27/narrative-project/main/15-22-happiness-idx.csv").then(function(data){process(data, METRIC, YEAR)});
}

function nextSlide(){
    var idx = MTX_IDX.indexOf(METRIC);
    var newidx = idx+1;
    if (newidx >= MTX_IDX.length){
        newidx = 0;
    }
    currentSlide(MTX_IDX[newidx]);
}

function prevSlide(){
    var idx = MTX_IDX.indexOf(METRIC);
    var newidx = idx-1;
    if (newidx < 0){
        newidx = MTX_IDX.length-1;
    }
    currentSlide(MTX_IDX[newidx]);   
}

var slider = document.getElementById("myRange");
var rangetext = document.getElementById("range-text");

slider.oninput = function() {
    YEAR = this.value;
    rangetext.innerHTML = YEAR;
    currentSlide(METRIC);
}

currentSlide(METRIC, YEAR);