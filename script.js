var string1, string2, sphere1, sphere2, theBond1, theBond2, thePoint, layer2, label1, label2, svg, zoomed, transform;

var springLength = 100;
var speed = 1000;
var fraction1 = 1;
var fraction2 = 1;
var traceColor = '#FF8000';
var play = true;

//constants
var pos1 = 300;
var pos2 = 250;

//d3 zoom
var old_k = 1;
var zoomFactor = .19;

//timing
var start;
var offset = 0;
var stoppedAt = 0;

//viewport
var height = 0;
var width = $(window).width();

$( document ).ready(function() {
  start = (new Date()).getTime(); //start time on page load

  var switchery = new Switchery(document.getElementById('trace'), { size: 'small' });

  $("#time").bootstrapSlider();
  speed= $('#time').val()*200;
  $("#time").on("slide", function(slideEvt) {
	speed = (99-slideEvt.value)*200;
});

    //get fraction from input
    fraction1= parseFloat($('#fraction1').val());
    fraction2= parseFloat($('#fraction2').val());

    $('#fraction1').on('input',function(e){
      fraction1= parseFloat($('#fraction1').val());
      traceColor = '#'+Math.floor(Math.random()*16777215).toString(16);
      label1.attr('fill', traceColor).text(fraction1);
      label2.attr('fill', traceColor).text(fraction2);
     });

     $('#fraction2').on('input',function(e){
       fraction2= parseFloat($('#fraction2').val());
       traceColor = '#'+Math.floor(Math.random()*16777215).toString(16);
       label1.attr('fill', traceColor).text(fraction1);
       label2.attr('fill', traceColor).text(fraction2);
      });



$('#stop').click(function() {
  clearInterval(animation);
  stoppedAt = (new Date()).getTime();
  play=false;
});

$('#play').click(function() {
  offset = (new Date()).getTime()-stoppedAt+offset;
  animation = setInterval(controller, 10);
  play=true;
});



    svg = d3.select("body")
            .append("svg")
            .attr("width", '100%')
            .attr("height", '100%')
            .call(d3.zoom().on("zoom", function () {
              var delta = d3.event.transform.k - old_k;
              d3.event.transform.k = old_k + zoomFactor*delta;
              $('#scale').css('width', Math.abs(old_k + zoomFactor*delta)*112);
              svg.attr("transform", d3.event.transform);
              old_k = d3.event.transform.k;
            }))
        .append("g");

            var viewport = svg.append('g')
            height = $(window).height();
            var layer1 = viewport.append('g');
            layer2 = viewport.append('g');
            var layer0 = layer2.append('g');

            sphere1 = layer2.append("circle")
                         .attr("cx", pos1)
                         .attr("cy", pos1)
                         .attr("r", 10)
                         .attr('fill', '#0000ff');

           string1 = layer1.append("line")
                       .attr("x1", pos1)
                       .attr("y1", pos1)
                       .attr("x2", 609.5)
                       .attr("y2", 310)
                       .attr("stroke-width", 4)
                       .attr("stroke", "black");

            var circle1 = layer0.append("circle")
                         .attr("cx", pos1)
                         .attr("cy", pos1)
                         .attr("r", springLength)
                         .attr('fill', 'none')
                         .attr("stroke-width", 4)
                         .attr("stroke", "black");

           var middlePoint1 = layer0.append("circle")
                        .attr("cx", pos1)
                        .attr("cy", pos1)
                        .attr("r", 10)
                        .attr('fill', '#0000ff');

            sphere2 = layer2.append("circle")
                         .attr("cx", pos1+pos2)
                         .attr("cy", pos1+pos2)
                         .attr("r", 10)
                         .attr('fill', '#fd9f00');

            string2 = layer1.append("line")
                        .attr("x1", pos1+pos2)
                        .attr("y1", pos1+pos2)
                        .attr("x2", 609.5)
                        .attr("y2", 310)
                        .attr("stroke-width", 4)
                        .attr("stroke", "black");

          var circle1 = layer0.append("circle")
                       .attr("cx", pos1+pos2)
                       .attr("cy", pos1+pos2)
                       .attr("r", springLength)
                       .attr('fill', 'none')
                       .attr("stroke-width", 4)
                       .attr("stroke", "black");

         var middlePoint1 = layer0.append("circle")
                      .attr("cx", pos1+pos2)
                      .attr("cy", pos1+pos2)
                      .attr("r", 10)
                      .attr('fill', '#fd9f00');

          theBond1 = layer1.append("line")
                      .attr("x1", pos1+pos2)
                      .attr("y1", pos1+pos2)
                      .attr("x2", 609.5)
                      .attr("y2", 310)
                      .attr("stroke-width", 2)
                      .attr("stroke", "gray");

          theBond2 = layer1.append("line")
                      .attr("x1", pos1+pos2)
                      .attr("y1", pos1+pos2)
                      .attr("x2", 609.5)
                      .attr("y2", 310)
                      .attr("stroke-width", 2)
                      .attr("stroke", "gray");

          thePoint = layer2.append("circle")
                       .attr("cx", pos1+pos2)
                       .attr("cy", pos1+pos2)
                       .attr("r", 10)
                       .attr('fill', '#ff0000');

          label1 = layer2.append('text')
                      .attr("x", 850)
                      .attr("y", 372)
                      .attr('fill', traceColor)
                      .attr("text-anchor", "left")
                      .style("font-size", "200px")
                      .style("text-decoration", "underline")
                      .text(fraction1);

        label2 = layer2.append('text')
                    .attr("x", 850)
                    .attr("y", 575)
                    .attr("text-anchor", "left")
                    .attr('fill', traceColor)
                    .style("font-size", "200px")
                    .style("text-decoration", "overline")
                    .text(fraction2);

    animation = setInterval(controller, 10);  //start controller
});

function controller(){
  currentTime = (new Date()).getTime()-offset;


  sphere1.attr('cx', Math.sin((start-currentTime)/speed*fraction1)*springLength+pos1);
  sphere1.attr('cy', -Math.cos((start-currentTime)/speed*fraction1)*springLength+pos1);
  string1.attr('x2', Math.sin((start-currentTime)/speed*fraction1)*springLength+pos1);
  string1.attr('y2', -Math.cos((start-currentTime)/speed*fraction1)*springLength+pos1);

  sphere2.attr('cx', Math.sin((start-currentTime)/speed*fraction2)*springLength+pos1+pos2);
  sphere2.attr('cy', -Math.cos((start-currentTime)/speed*fraction2)*springLength+pos1+pos2);
  string2.attr('x2', Math.sin((start-currentTime)/speed*fraction2)*springLength+pos1+pos2);
  string2.attr('y2', -Math.cos((start-currentTime)/speed*fraction2)*springLength+pos1+pos2);

  thePoint.attr('cx', Math.sin((start-currentTime)/speed*fraction2)*springLength+pos1+pos2);
  thePoint.attr('cy', -Math.cos((start-currentTime)/speed*fraction1)*springLength+pos1);

  theBond1.attr('x1', Math.sin((start-currentTime)/speed*fraction2)*springLength+pos1+pos2);
  theBond1.attr('y1', -Math.cos((start-currentTime)/speed*fraction1)*springLength+pos1);
  theBond1.attr('x2', Math.sin((start-currentTime)/speed*fraction1)*springLength+pos1);
  theBond1.attr('y2', -Math.cos((start-currentTime)/speed*fraction1)*springLength+pos1);

  theBond2.attr('x1', Math.sin((start-currentTime)/speed*fraction2)*springLength+pos1+pos2);
  theBond2.attr('y1', -Math.cos((start-currentTime)/speed*fraction1)*springLength+pos1);
  theBond2.attr('x2', Math.sin((start-currentTime)/speed*fraction2)*springLength+pos1+pos2);
  theBond2.attr('y2', -Math.cos((start-currentTime)/speed*fraction2)*springLength+pos1+pos2);

  if($('#trace').is(":checked")){

  layer2.append('circle')
    .attr("cx", Math.sin((start-currentTime)/speed*fraction2)*springLength+pos1+pos2)
    .attr("cy", -Math.cos((start-currentTime)/speed*fraction1)*springLength+pos1)
    .attr("r", 1)
    .attr('fill', traceColor);

//add a second point to better handle precision problems
  layer2.append('circle')
    .attr("cx", Math.sin((start-currentTime)/speed*fraction2)*springLength+pos1+pos2)
    .attr("cy", -Math.cos((start-currentTime)/speed*fraction1)*springLength+pos1)
    .attr("r", 1)
    .attr('fill', traceColor);
  }
}

function update() {
    svg.remove();
    $('svg').remove();
    svg = d3.select("body")
            .append("svg")
            .attr("width", '100%')
            .attr("height", '100%')
            .call(d3.zoom().on("zoom", function () {
              var delta = d3.event.transform.k - old_k;
              d3.event.transform.k = old_k + zoomFactor*delta;
              zoomed = Math.abs(old_k + zoomFactor*delta)*112;
              transform = d3.event.transform;
              $('#scale').css('width', zoomed);
              svg.attr("transform", transform);
              old_k = d3.event.transform.k;
            }))
        .append("g");

        $('#scale').css('width', zoomed);
        svg.attr("transform", transform);

            var viewport = svg.append('g')
            height = $(window).height();
            var layer1 = viewport.append('g');
            layer2 = viewport.append('g');
            var layer0 = layer2.append('g');

            sphere1 = layer2.append("circle")
                         .attr("cx", pos1)
                         .attr("cy", pos1)
                         .attr("r", 10)
                         .attr('fill', '#0000ff');

           string1 = layer1.append("line")
                       .attr("x1", pos1)
                       .attr("y1", pos1)
                       .attr("x2", 609.5)
                       .attr("y2", 310)
                       .attr("stroke-width", 4)
                       .attr("stroke", "black");

            var circle1 = layer0.append("circle")
                         .attr("cx", pos1)
                         .attr("cy", pos1)
                         .attr("r", springLength)
                         .attr('fill', 'none')
                         .attr("stroke-width", 4)
                         .attr("stroke", "black");

           var middlePoint1 = layer0.append("circle")
                        .attr("cx", pos1)
                        .attr("cy", pos1)
                        .attr("r", 10)
                        .attr('fill', '#0000ff');

            sphere2 = layer2.append("circle")
                         .attr("cx", pos1+pos2)
                         .attr("cy", pos1+pos2)
                         .attr("r", 10)
                         .attr('fill', '#fd9f00');

            string2 = layer1.append("line")
                        .attr("x1", pos1+pos2)
                        .attr("y1", pos1+pos2)
                        .attr("x2", 609.5)
                        .attr("y2", 310)
                        .attr("stroke-width", 4)
                        .attr("stroke", "black");

          var circle1 = layer0.append("circle")
                       .attr("cx", pos1+pos2)
                       .attr("cy", pos1+pos2)
                       .attr("r", springLength)
                       .attr('fill', 'none')
                       .attr("stroke-width", 4)
                       .attr("stroke", "black");

         var middlePoint1 = layer0.append("circle")
                      .attr("cx", pos1+pos2)
                      .attr("cy", pos1+pos2)
                      .attr("r", 10)
                      .attr('fill', '#fd9f00');

          theBond1 = layer1.append("line")
                      .attr("x1", pos1+pos2)
                      .attr("y1", pos1+pos2)
                      .attr("x2", 609.5)
                      .attr("y2", 310)
                      .attr("stroke-width", 2)
                      .attr("stroke", "gray");

          theBond2 = layer1.append("line")
                      .attr("x1", pos1+pos2)
                      .attr("y1", pos1+pos2)
                      .attr("x2", 609.5)
                      .attr("y2", 310)
                      .attr("stroke-width", 2)
                      .attr("stroke", "gray");

          thePoint = layer2.append("circle")
                       .attr("cx", 609.5)
                       .attr("cy", 310)
                       .attr("r", 10)
                       .attr('fill', '#ff0000');

          label1 = layer2.append('text')
                      .attr("x", 850)
                      .attr("y", 372)
                      .attr('fill', traceColor)
                      .attr("text-anchor", "left")
                      .style("font-size", "200px")
                      .style("text-decoration", "underline")
                      .text(fraction1);

        label2 = layer2.append('text')
                    .attr("x", 850)
                    .attr("y", 575)
                    .attr("text-anchor", "left")
                    .attr('fill', traceColor)
                    .style("font-size", "200px")
                    .style("text-decoration", "overline")
                    .text(fraction2);


    // reset to old state
    if(play==false){
      offset = (new Date()).getTime()-stoppedAt+offset;
      stoppedAt = (new Date()).getTime();
    }
    currentTime = (new Date()).getTime()-offset;


    sphere1.attr('cx', Math.sin((start-currentTime)/speed*fraction1)*springLength+pos1);
    sphere1.attr('cy', -Math.cos((start-currentTime)/speed*fraction1)*springLength+pos1);
    string1.attr('x2', Math.sin((start-currentTime)/speed*fraction1)*springLength+pos1);
    string1.attr('y2', -Math.cos((start-currentTime)/speed*fraction1)*springLength+pos1);

    sphere2.attr('cx', Math.sin((start-currentTime)/speed*fraction2)*springLength+pos1+pos2);
    sphere2.attr('cy', -Math.cos((start-currentTime)/speed*fraction2)*springLength+pos1+pos2);
    string2.attr('x2', Math.sin((start-currentTime)/speed*fraction2)*springLength+pos1+pos2);
    string2.attr('y2', -Math.cos((start-currentTime)/speed*fraction2)*springLength+pos1+pos2);

    thePoint.attr('cx', Math.sin((start-currentTime)/speed*fraction2)*springLength+pos1+pos2);
    thePoint.attr('cy', -Math.cos((start-currentTime)/speed*fraction1)*springLength+pos1);

    theBond1.attr('x1', Math.sin((start-currentTime)/speed*fraction2)*springLength+pos1+pos2);
    theBond1.attr('y1', -Math.cos((start-currentTime)/speed*fraction1)*springLength+pos1);
    theBond1.attr('x2', Math.sin((start-currentTime)/speed*fraction1)*springLength+pos1);
    theBond1.attr('y2', -Math.cos((start-currentTime)/speed*fraction1)*springLength+pos1);

    theBond2.attr('x1', Math.sin((start-currentTime)/speed*fraction2)*springLength+pos1+pos2);
    theBond2.attr('y1', -Math.cos((start-currentTime)/speed*fraction1)*springLength+pos1);
    theBond2.attr('x2', Math.sin((start-currentTime)/speed*fraction2)*springLength+pos1+pos2);
    theBond2.attr('y2', -Math.cos((start-currentTime)/speed*fraction2)*springLength+pos1+pos2);
}
