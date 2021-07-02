document.addEventListener('DOMContentLoaded', () => {

    req = new XMLHttpRequest();
    req.open("GET", '/graph/waterUsageData.json', true);
    req.send();
    req.onload = function () {
        json = JSON.parse(req.responseText);


        let data = json.data;

        //this first .map method creates a 3-d array with the key value pairs listed below.
        let myFirstDataSet = data.map((item) => {
            return [
                {
                    task: 'Bath',
                    usage: parseInt(item.bathConsumption)
                },
                {
                    task: 'Shower',
                    usage: parseInt(item.showerConsumption)
                },
                {
                    task: 'Dish Washer',
                    usage: parseInt(item.dishWasher)
                },
                {
                    task: 'Handwash Dishes',
                    usage: parseInt(item.washingDishes)
                },
                {
                    task: '1 Toilet Flush',
                    usage: parseInt(item.flushingToliet)
                }

            ]

        });
        console.log(myFirstDataSet);

        //the .flat method changes the 3-d array above to an array of objects
        let newData = myFirstDataSet.flat(3);
        console.log(newData);

        //now we can map the newData array into the object we need be able to work with the data using d3
        let myDataSet = newData.map((item) => {
                 
            return {
                task: item.task,
                usage: item.usage
            }
        })

        // Height and Width for the graph
        const w =890;
        const h = 750;



        //Margin object for the graph
        let margin = {
            top: 100, right: 0, bottom: 100, left: 110
        };

        //created constants for the innerWidth and innerHeight
        const innerWidth = w - margin.left - margin.right;
        const innerHeight = h - margin.top - margin.bottom;


        //min and max usage
        let usageMin = d3.min(myDataSet, d => d.usage);
        let usageMax = d3.max(myDataSet, d => d.usage);
        console.log('usagemin', usageMin);
        console.log('usagemax', usageMax);


        //selecting the body of the page for the element to display the svg element
        const svg = d3.select("#graphSection")
            .append("svg")
            .attr("width", w)
            .attr("height", h);


        //xScale for the task. Need to scale band because they are strings
        const xScale = d3.scaleBand()
            .domain(myDataSet.map(d => d.task))
            .range([31, innerWidth]);

        //creating the xAxis, on the bottom
        const xAxis = d3.axisBottom(xScale);
        const xAxisLabel = 'Tasks';

        //yScale for the usage. 
        const yScale = d3.scaleLinear()
            .domain([(usageMax + 2), 0])
            .range([0, innerHeight]);

        //creating the axis left for the yAxis
        const yAxis = d3.axisLeft(yScale);
        const yAxisLabel = 'Gallons';

        //appending the group element to the svg
        const g = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        //Creating the yAxisGroup that will call the y-axis
        const yAxisG = g.append('g')
            .call(yAxis)
            .attr('id', 'y-axis')
            .attr('class', 'axis')
            .style("font-weight", "bold")

        //Creating the xAxisGroup that will call the x-axis
        const xAxisG = g.append('g')
            .call(xAxis)
            .attr('transform', `translate(-30, ${innerHeight} )`)
            .attr('id', 'x-axis')
            .attr('class', 'axis')
            .style("font-weight", "bold")
           

        //Appending the rect elements to the page and creating the tooltips
        g.selectAll("rect")
            .data(myDataSet)
            .enter()
            .append('rect') 
            .attr('class', 'bar')
            .attr('x', d => xScale(d.task))
            .attr("y", d => yScale(d.usage))
            .attr("width", d => innerWidth / myDataSet.length)
            .attr('height', d => innerHeight - yScale(d.usage))
            .attr("fill", "rgb(28,47,124)")
            .append('title')
            .attr('id', 'tooltip')
            .text( (d) => d.usage + ' gallons')
           
        //Creates the label for the y-axis
        yAxisG.append('text')
            .attr('id', 'yAxisLabel')
            .attr('class', 'axislabel')
            .attr('transform', 'rotate (-90, 0, 60) translate(-160)')
            .text(yAxisLabel)
            .style("text-shadow", "-2px 0 #1c2f7ce7, 0 2px #1c2f7ce7, 2px 0 #1c2f7ce7, 0 -2px #1c2f7ce7")
            .style("fill", "#7cac46")
            .style("font-weight", "bold")
            .style("font-size", "25px")

        // Creates the label for the x-axis
        xAxisG.append('text')
            .attr('id', 'xAxisLabel')
            .attr('class', 'axislabel')
            .attr('y', 70)
            .attr('x', 402)
            .text(xAxisLabel)
            .style("text-shadow", "-2px 0 #1c2f7ce7, 0 2px #1c2f7ce7, 2px 0 #1c2f7ce7, 0 -2px #1c2f7ce7")
            .style("fill", "#7cac46")
            .style("font-weight", "bold")
            .style("font-size", "25px")

        //Appends a title for the graph
        g.append('text')
            .attr('x', 125)
            .attr('y', -35)
            .text('Average Water Usage in Gallons')
            .attr('id', 'title')
           .attr("font-family", "candara")
            .style("fill", "#7cac46")
            .style("font-weight", "bold")
            .style("font-size", "40px")
            .style("text-shadow", "-2px 0 #1c2f7ce7, 0 2px #1c2f7ce7, 2px 0 #1c2f7ce7, 0 -2px #1c2f7ce7")
           
    }
})