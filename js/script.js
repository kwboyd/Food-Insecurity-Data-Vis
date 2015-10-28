$(document).ready(function(){
                loadData();
                buildMap();
                loadDataTable();
                $("#tophat-dropdown").click(function(){
                 $("#tophat ul").toggle();
                })
            })
  
           var householdTypes = [];
           var average = [];
           var couples = [];
           var female = [];
           var races = [];
           var male = [];
           var percentRace = [];
           var levels = [];
           var percentEducation = [];
           var years = [];
           var percentYear = [];
           var htmlTable = [];
           var state = [];
           var statePop = [];
           var insecurePercent = [];
           var insecurePop = [];
           var vinsecurePercent = [];
           var vinsecurePop = [];

            function loadData () {
                $.ajax({
                    url: 'data/charts.xml',
                    type: 'GET',
                    dataType: 'xml',
                    success: function(xml){
                        parseData(xml)
                    }
                });             
            };
           
           function parseData (xml) {
                $(xml).find("household").each(function(index){
                    householdTypes.push($(this).attr("name"));
                    average.push(parseFloat($(this).find("average").text()));
                    couples.push(parseFloat($(this).find("couple").text()));
                    male.push(parseFloat($(this).find("male").text()));
                    female.push(parseFloat($(this).find("female").text()));
                });
                $(xml).find("race").each(function(index){
                    races.push($(this).attr("name"));
                    percentRace.push(parseFloat($(this).find("percent").text()));
                });
                $(xml).find("level").each(function(index){
                    levels.push($(this).attr("name"));
                    percentEducation.push(parseFloat($(this).find("percent").text()));
                });
                $(xml).find("year").each(function(index){
                    years.push($(this).find("yearnumber").text());
                    percentYear.push(parseFloat($(this).find("percent").text()));
                });
                buildChart();
           };
            
        
            
    function buildChart() { 
        $('#family').highcharts({
                    chart: {
                        type: 'bar'
                    },
                    title: {
                        text: 'Percent of Households that are Food Insecure'
                    },
                    subtitle: {
                        text: 'Organized by Family Structure'
                    },
                    xAxis: {
                        categories: householdTypes
                    },
                    yAxis: {
                        title: {
                            text: 'Percent'
                        }
                    },
                    series: [{
                        name: 'Average',
                        data: average
                    }, {
                        name: 'Couples',
                        data: couples
                    }, {
                        name: 'Single Females',
                        data: female
                    }, {
                        name: 'Single Males',
                        data: male
                    }]
                });
         $('#race').highcharts({
                    chart: {
                        type: 'bar'
                    },
                    title: {
                        text: 'Percent of People who are Food Insecure'
                    },
                    subtitle: {
                        text: 'Organized by Race'
                    },
                    xAxis: {
                        categories: races
                    },
                    yAxis: {
                        title: {
                            text: 'Percent'
                        }
                    },
                    series: [{
                        data: percentRace
                    }],
                    legend: {
                        enabled: false
                    }
                });
        $('#education').highcharts({
                    chart: {
                        type: 'bar'
                    },
                    title: {
                        text: 'Percent of People who are Food Insecure'
                    },
                    subtitle: {
                        text: 'Organized by Highest Level of Education Completed'
                    },
                    xAxis: {
                        categories: levels
                    },
                    yAxis: {
                        title: {
                            text: 'Percent'
                        }
                    },
                    series: [{
                        data: percentEducation
                    }],
                    legend: {
                        enabled: false
                    }
                });
        $('#line-graph').highcharts({
                chart: {
                    type: 'line'
                },
                title: {
                    text: 'Percent of US Population that are Food Insecure'
                },
                subtitle: {
                    text: 'From 1995 to 2014'
                },
                xAxis: {
                    categories: years
                },
                yAxis: {
                    title: {
                        text: 'Percent'
                    }
                },
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: true
                        },
                        enableMouseTracking: false
                    }
                },
                series: [{
                    data: percentYear
                }],
                legend: {
                         enabled: false
                 }
            });
     };

            
            
    function buildMap() {

                $.getJSON('data/map.json', function (data) {
            
                    // Make codes uppercase to match the map data
                    $.each(data, function () {
                        this.code = this.code.toUpperCase();
                    });
            
                    // Instanciate the map
                    $('#map1').highcharts('Map', {
            
                        chart : {
                            borderWidth : 1
                        },
            
                        title : {
                            text : ''
                        },
               
                        legend: {
                            layout: 'horizontal',
                            borderWidth: 0,
                            floating: true,
                            verticalAlign: 'top',
                            y: -13
                        },
            
                        mapNavigation: {
                            enabled: true,
                            enableMouseWheelZoom: false,
                            buttonOptions: {
                                align: 'right'
                            }
                        },
            
                        colorAxis: {
                            min: 5,
                            max: 25,
                            stops: [
                                [0, '#FBEAA5'],
                                [0.25, '#FCDC51'],
                                [0.5, '#F7B935'],
                                [0.75, '#F18A26'],
                                [1, '#D16228']
                            ],
                            tickInterval: 5
                            
                        },
                        
            
                        series : [{
                            animation: {
                                duration: 1000
                            },
                            data : data,
                            mapData: Highcharts.maps['countries/us/us-all'],
                            joinBy: ['postal-code', 'code'],
                            dataLabels: {
                                enabled: true,
                                color: 'white',
                                format: '{point.code}'
                            },
                            name: 'Percent of Households',
                            states: {
                                hover: {
                                                color: '#D43D1A',
                                                borderColor: 'gray'
                                }
                            },
                            tooltip: {
                                pointFormat: '{point.code}: {point.value}'
                            }
                        }]
                    });
                });
           };
        
        function loadDataTable() {
            $.ajax({
                    url: 'data/datatable.xml',
                    type: 'GET',
                    dataType: 'xml',
                    success: function(xml){
                        parseDataTable(xml)
                    }
                });
        };
        
        function parseDataTable(xml) {
            $(xml).find("tablestate").each(function(index){
                htmlTable += "<tr><td>" + $(this).find("state").text() + "</td>"
                htmlTable += "<td>" + $(this).find("population").text() + "</td>"
                htmlTable += "<td>" + $(this).find("insecurepercent").text() + "</td>"
                htmlTable += "<td>" + $(this).find("insecurepop").text() + "</td>"
                htmlTable += "<td>" + $(this).find("vinsecurepercent").text() + "</td>"
                htmlTable += "<td>" + $(this).find("vinpop").text() + "</td>"
            })
            buildDataTable();
        };
        
        function buildDataTable() {
            $("#data-table-body").html(htmlTable);
            $('#data-table').DataTable();
        }

