function getData() {
    d3.csv('https://data.cityofchicago.org/api/views/85cm-7uqa/rows.csv?accessType=DOWNLOAD')
        .then(makeChart);
    }



function makeChart(data) {
    let zipCodes = data.map(function(d) {return d.Geography});
    let population = data.map(function(d) {return d["Population - Total"]});
    let myChart = document.getElementById('myChart').getContext('2d');
    zipCodes.splice(0,1);
    population.splice(0,1);
    let massPopChart = new Chart(myChart, {
        type:'bar', 
        data:{
            labels: zipCodes,
            datasets: [
                {
                    data: population,
                    backgroundColor: ['red', 'pink', 'orange', 'yellow', 'green', 'blue', 'purple'], 
                    borderWidth:1,
                    borderColor:'black'

                }
            ]
        },
        options:{}
    });
}