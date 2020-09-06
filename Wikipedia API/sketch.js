let searchUrl = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=";
let contentUrl = "https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=";
let wiki = "https://en.wikipedia.org/wiki/";
let userInput;
let chartTitle;

function setup() {
    noCanvas();
    startSearch();
}

function startSearch() {
    userInput = select("#userinput");
    userInput.changed(startSearch);
    goWiki(userInput.value());
}

function goWiki(term) {
    let url = searchUrl + term;
    loadJSON(url, gotSearch, "jsonp");    
}

function gotSearch(data) {
    console.log(data);
    chartTitle = data[1][0];
    let title = contentUrl + data[1][0];
    title = title.replace(/\s+/g, "_");
    let titleUrl = wiki + data[1][0].replace(/\s+/g, "_");
    document.querySelector('a').setAttribute("href", titleUrl);
    document.getElementById("url").innerText = titleUrl;
    console.log("Querying: "  + title);
    let url = contentUrl + title;
    loadJSON(url, gotContent, "jsonp");
}


function gotContent(data) {
    let page = data.query.pages;
    let pageId = Object.keys(data.query.pages)[0];
    let content = page[pageId].revisions[0]['*'].toLowerCase();
    console.log(content);
    let wordRegex = /\b[a-zA-Z0-9!:/.]{4,}/g;
    let words = content.match(wordRegex);
    let wordMap = {};
    for (i=0;i<words.length;i++) {
        if (!wordMap[words[i]]) {
            wordMap[words[i]] = 1;
        }
        else {
            wordMap[words[i]] = wordMap[words[i]]+1;
        }
    }
    dataChart(sortData(wordMap));
}

function sortData(data) {
    let largeArr = [];
    for (i=0; i < 7; i++) {
        let largest = [Object.keys(data)[1], data[Object.keys(data)[1]]];
        Object.keys(data).map(function (key) { 
            if (data[key] > largest[1])
                largest = [key, data[key]];
            });
        delete data[largest[0]];
        largeArr.push(largest);
        }
    return largeArr;
}

function dataChart(dataArr) {
    
    console.log(chartTitle);
    let words = [];
    let counts = [];
    for (i=0; i<dataArr.length;i++) {
        words.push(dataArr[i][0]);
        counts.push(dataArr[i][1]);
        
    }
    var ctx = document.getElementById("myChart").getContext("2d");
    var myChart = new Chart(ctx, {
        type:'bar',
        data:{
            labels: words,
            datasets: [
                {
                    data: counts,
                    backgroundColor: ['#ff0000',
                        '#ffa500',
                        '#ffff00',
                        '#008000',
                        '#0000ff',
                        '#4b0082',
                        '#ee82ee'],
                    borderWidth:1,
                    borderColor:'black'

                }
            ]
        },
        options:{
            title:{
                display:true,
                text:chartTitle,
                fontSize: 25
            },
            legend:{
                display:false
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        callback: function(value) {if (value % 1 === 0) {return value;}}
                    }
                }]
            }
        }
    });
    
}