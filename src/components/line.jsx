import React, { useRef, useState, useEffect } from 'react';
import { select, line, axisBottom, axisRight, curveCardinal, scaleLinear } from 'd3';
import './line.css';


function Line(){

  const [data, setData] = useState([21, 5, 14, 33, 4, 50, 22, 14, 43, 32]);
  const svgRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);

    const xScale = scaleLinear().domain([0, data.length-1]).range([0, 300]);
    const yScale = scaleLinear().domain([0, 75]).range([150, 0])
    const xAxis = axisBottom(xScale).ticks(data.length).tickFormat(index => index+1);
    const yAxis = axisRight(yScale);

    svg.select(".x-axis").style("transform", "translateY(150px)").call(xAxis);
    svg.select(".y-axis").style("transform", "translateX(300px)").call(yAxis);

    // Generates d attr of path element
    const myLine = line()
      .x((value, index) => xScale(index))
      .y(yScale)
      .curve(curveCardinal);

    svg.selectAll(".line")
        .data([data])
        .join("path")
        .attr("class", "line")
        .attr("d", value => myLine(value))
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 3);

  }, [data]);

  return(
    <React.Fragment>
      <svg ref={svgRef}>
        <g className="x-axis"/>
        <g className="y-axis"/>
      </svg>
      <br/>
      <button onClick={() => setData(data.map(value => value+2))}>
        Update data
      </button>
    </React.Fragment>
  );
}

export default Line;