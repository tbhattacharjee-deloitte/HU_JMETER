/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 24.0, "series": [{"data": [[8500.0, 1.0], [2400.0, 1.0], [2500.0, 1.0], [2600.0, 1.0], [800.0, 1.0], [3600.0, 2.0], [4000.0, 1.0], [1100.0, 1.0], [1200.0, 1.0], [5100.0, 2.0], [1300.0, 2.0], [1400.0, 1.0], [1500.0, 1.0], [6100.0, 1.0], [400.0, 1.0], [1900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "contact/about_demo_hls_600k00000.ts-562", "isController": false}, {"data": [[300.0, 23.0], [600.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "cart/view-343", "isController": false}, {"data": [[600.0, 1.0], [300.0, 2.0], [100.0, 16.0], [1600.0, 1.0]], "isOverall": false, "label": "contact/index.html-570", "isController": false}, {"data": [[300.0, 21.0], [700.0, 2.0], [400.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "cart/view-342", "isController": false}, {"data": [[300.0, 14.0], [700.0, 1.0], [400.0, 7.0], [900.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "delete items/deleteitem-348", "isController": false}, {"data": [[300.0, 20.0], [400.0, 4.0], [500.0, 1.0]], "isOverall": false, "label": "cart/view-341", "isController": false}, {"data": [[300.0, 17.0], [600.0, 1.0], [700.0, 1.0], [400.0, 5.0], [800.0, 1.0]], "isOverall": false, "label": "cart/view-340", "isController": false}, {"data": [[300.0, 15.0], [600.0, 1.0], [400.0, 8.0], [1000.0, 1.0]], "isOverall": false, "label": "delete items/deleteitem-381", "isController": false}, {"data": [[300.0, 5.0], [1500.0, 1.0], [200.0, 6.0], [400.0, 3.0], [100.0, 1.0], [900.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "contact/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-577", "isController": false}, {"data": [[300.0, 6.0], [600.0, 1.0], [100.0, 7.0], [200.0, 1.0], [400.0, 3.0], [3200.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "contact/imgs/sony_vaio_5.jpg-569", "isController": false}, {"data": [[300.0, 10.0], [100.0, 10.0]], "isOverall": false, "label": "contact/css/latostyle.css-546", "isController": false}, {"data": [[1100.0, 1.0], [700.0, 5.0], [800.0, 8.0], [900.0, 5.0], [1000.0, 1.0]], "isOverall": false, "label": "contact/entries-559", "isController": false}, {"data": [[300.0, 16.0], [700.0, 1.0], [400.0, 8.0]], "isOverall": false, "label": "/addtocart-260", "isController": false}, {"data": [[300.0, 4.0], [1300.0, 1.0], [100.0, 15.0]], "isOverall": false, "label": "contact/css/latofonts.css-572", "isController": false}, {"data": [[300.0, 3.0], [400.0, 2.0]], "isOverall": false, "label": "/login-98", "isController": false}, {"data": [[300.0, 2.0], [600.0, 1.0], [1300.0, 1.0], [5200.0, 1.0], [100.0, 7.0], [200.0, 2.0], [400.0, 2.0], [1700.0, 1.0], [1900.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "contact/imgs/HTC_M9.jpg-568", "isController": false}, {"data": [[300.0, 8.0], [100.0, 11.0], [400.0, 1.0]], "isOverall": false, "label": "contact/config.json-558", "isController": false}, {"data": [[300.0, 5.0], [1400.0, 1.0], [100.0, 13.0], [400.0, 1.0]], "isOverall": false, "label": "contact/js/index.js-580", "isController": false}, {"data": [[600.0, 2.0], [700.0, 1.0], [1400.0, 2.0], [400.0, 8.0], [900.0, 1.0], [500.0, 11.0]], "isOverall": false, "label": "/index.html-208", "isController": false}, {"data": [[2100.0, 1.0], [300.0, 3.0], [600.0, 2.0], [200.0, 9.0], [400.0, 3.0], [1800.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "contact/imgs/galaxy_s6.jpg-587", "isController": false}, {"data": [[300.0, 20.0], [600.0, 1.0], [700.0, 1.0], [400.0, 3.0]], "isOverall": false, "label": "delete items/view-406", "isController": false}, {"data": [[300.0, 10.0], [100.0, 9.0], [400.0, 1.0]], "isOverall": false, "label": "contact/imgs/front.jpg-556", "isController": false}, {"data": [[300.0, 21.0], [400.0, 3.0], [1900.0, 1.0]], "isOverall": false, "label": "delete items/view-405", "isController": false}, {"data": [[300.0, 24.0], [400.0, 1.0]], "isOverall": false, "label": "cart/view-339", "isController": false}, {"data": [[300.0, 21.0], [400.0, 3.0], [900.0, 1.0]], "isOverall": false, "label": "delete items/view-404", "isController": false}, {"data": [[300.0, 11.0], [200.0, 2.0], [100.0, 4.0], [400.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "contact/node_modules/bootstrap/dist/css/bootstrap.min.css-543", "isController": false}, {"data": [[2200.0, 1.0], [300.0, 4.0], [2400.0, 1.0], [1200.0, 1.0], [2500.0, 1.0], [1500.0, 1.0], [200.0, 5.0], [800.0, 1.0], [400.0, 2.0], [100.0, 1.0], [1800.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "contact/imgs/Lumia_1520.jpg-564", "isController": false}, {"data": [[300.0, 21.0], [600.0, 2.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "delete items/view-373", "isController": false}, {"data": [[300.0, 21.0], [600.0, 1.0], [400.0, 3.0]], "isOverall": false, "label": "delete items/view-372", "isController": false}, {"data": [[300.0, 3.0], [100.0, 15.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "contact/config.json-585", "isController": false}, {"data": [[300.0, 22.0], [600.0, 1.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "delete items/view-370", "isController": false}, {"data": [[0.0, 18.0], [300.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "contact/about_demo_hls_600k.m3u8-561", "isController": false}, {"data": [[300.0, 5.0], [100.0, 14.0], [400.0, 1.0]], "isOverall": false, "label": "contact/node_modules/tether/dist/js/tether.min.js-578", "isController": false}, {"data": [[300.0, 8.0], [600.0, 1.0], [400.0, 10.0], [500.0, 1.0]], "isOverall": false, "label": "contact/entries-586", "isController": false}, {"data": [[300.0, 23.0], [400.0, 2.0]], "isOverall": false, "label": "delete items/view-374", "isController": false}, {"data": [[300.0, 15.0], [600.0, 1.0], [400.0, 8.0], [500.0, 1.0]], "isOverall": false, "label": "/addtocart-314", "isController": false}, {"data": [[1100.0, 1.0], [1200.0, 2.0], [600.0, 1.0], [1300.0, 3.0], [1400.0, 2.0], [1500.0, 2.0], [800.0, 2.0], [1600.0, 1.0], [1700.0, 1.0], [900.0, 1.0], [1000.0, 4.0]], "isOverall": false, "label": "contact/index.html-542", "isController": false}, {"data": [[300.0, 11.0], [100.0, 8.0], [400.0, 1.0]], "isOverall": false, "label": "contact/node_modules/video.js/dist/video-js.min.css-544", "isController": false}, {"data": [[300.0, 6.0], [100.0, 10.0], [800.0, 1.0], [200.0, 3.0]], "isOverall": false, "label": "contact/nexus1.jpg-553", "isController": false}, {"data": [[2200.0, 1.0], [700.0, 1.0], [200.0, 5.0], [800.0, 1.0], [3600.0, 1.0], [900.0, 1.0], [1100.0, 1.0], [1200.0, 1.0], [300.0, 1.0], [400.0, 3.0], [1800.0, 1.0], [500.0, 2.0], [2000.0, 1.0]], "isOverall": false, "label": "contact/imgs/iphone_6.jpg-566", "isController": false}, {"data": [[1100.0, 1.0], [600.0, 3.0], [1300.0, 1.0], [700.0, 13.0], [1600.0, 1.0], [800.0, 2.0], [900.0, 2.0], [1000.0, 2.0]], "isOverall": false, "label": "/login-151", "isController": false}, {"data": [[300.0, 6.0], [100.0, 14.0]], "isOverall": false, "label": "contact/bm.png-582", "isController": false}, {"data": [[2100.0, 1.0], [600.0, 2.0], [2500.0, 1.0], [2800.0, 1.0], [200.0, 2.0], [3400.0, 1.0], [900.0, 1.0], [1100.0, 1.0], [300.0, 1.0], [4900.0, 1.0], [1500.0, 2.0], [1600.0, 1.0], [400.0, 1.0], [2000.0, 2.0], [500.0, 2.0]], "isOverall": false, "label": "contact/imgs/Nexus_6.jpg-565", "isController": false}, {"data": [[34600.0, 1.0], [19500.0, 1.0], [22000.0, 1.0], [22500.0, 2.0], [23000.0, 1.0], [23500.0, 1.0], [23700.0, 1.0], [24400.0, 1.0], [24100.0, 1.0], [24800.0, 1.0], [24600.0, 1.0], [25200.0, 1.0], [26200.0, 1.0], [26300.0, 1.0], [27500.0, 1.0], [27800.0, 1.0], [31000.0, 1.0], [31500.0, 1.0], [31400.0, 1.0]], "isOverall": false, "label": "Send Message Transaction Controller", "isController": true}, {"data": [[300.0, 10.0], [100.0, 5.0], [200.0, 4.0], [500.0, 1.0]], "isOverall": false, "label": "contact/node_modules/jquery/dist/jquery.min.js-547", "isController": false}, {"data": [[300.0, 4.0], [600.0, 1.0]], "isOverall": false, "label": "invalid login", "isController": false}, {"data": [[1100.0, 1.0], [300.0, 19.0], [600.0, 1.0], [800.0, 1.0], [400.0, 3.0]], "isOverall": false, "label": "delete items/view-378", "isController": false}, {"data": [[300.0, 6.0], [700.0, 1.0], [100.0, 11.0], [400.0, 2.0]], "isOverall": false, "label": "contact/Samsung1.jpg-554", "isController": false}, {"data": [[300.0, 1.0], [2500.0, 1.0], [700.0, 1.0], [200.0, 9.0], [400.0, 7.0], [100.0, 1.0]], "isOverall": false, "label": "contact/imgs/Lumia_1520.jpg-589", "isController": false}, {"data": [[2100.0, 1.0], [2300.0, 1.0], [1100.0, 2.0], [2200.0, 1.0], [600.0, 1.0], [700.0, 3.0], [1500.0, 2.0], [800.0, 5.0], [900.0, 1.0], [1000.0, 3.0]], "isOverall": false, "label": "contact/node_modules/video.js/dist/video.min.js-548", "isController": false}, {"data": [[600.0, 1.0], [300.0, 5.0], [100.0, 13.0], [400.0, 1.0]], "isOverall": false, "label": "contact/iphone1.jpg-555", "isController": false}, {"data": [[300.0, 16.0], [600.0, 1.0], [700.0, 4.0], [400.0, 4.0]], "isOverall": false, "label": "/addtocart-207", "isController": false}, {"data": [[300.0, 15.0], [100.0, 4.0], [400.0, 1.0]], "isOverall": false, "label": "contact/js/index.js-551", "isController": false}, {"data": [[600.0, 1.0], [300.0, 2.0], [100.0, 9.0], [200.0, 5.0], [400.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "contact/node_modules/jquery/dist/jquery.min.js-575", "isController": false}, {"data": [[300.0, 6.0], [600.0, 1.0], [700.0, 1.0], [400.0, 3.0], [100.0, 4.0], [200.0, 4.0], [500.0, 1.0]], "isOverall": false, "label": "contact/imgs/HTC_M9.jpg-592", "isController": false}, {"data": [[300.0, 18.0], [600.0, 1.0], [400.0, 6.0]], "isOverall": false, "label": "/addtocart-205", "isController": false}, {"data": [[300.0, 12.0], [600.0, 1.0], [700.0, 2.0], [400.0, 10.0]], "isOverall": false, "label": "delete items/viewcart-400", "isController": false}, {"data": [[600.0, 1.0], [300.0, 2.0], [1500.0, 1.0], [800.0, 1.0], [200.0, 5.0], [400.0, 5.0], [100.0, 5.0]], "isOverall": false, "label": "contact/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-549", "isController": false}, {"data": [[10700.0, 2.0], [10300.0, 2.0], [10500.0, 1.0], [11200.0, 3.0], [11000.0, 2.0], [10800.0, 1.0], [10900.0, 1.0], [11400.0, 2.0], [11300.0, 1.0], [11500.0, 1.0], [11900.0, 2.0], [12200.0, 2.0], [12000.0, 1.0], [12100.0, 1.0], [12700.0, 2.0], [13200.0, 1.0]], "isOverall": false, "label": "Login to purchase flow Transaction Controller", "isController": true}, {"data": [[300.0, 4.0], [600.0, 1.0], [800.0, 1.0], [400.0, 7.0], [500.0, 12.0]], "isOverall": false, "label": "place order/deletecart-411", "isController": false}, {"data": [[300.0, 3.0], [3000.0, 2.0], [6000.0, 1.0], [100.0, 3.0], [400.0, 2.0], [1600.0, 1.0], [800.0, 3.0], [200.0, 1.0], [3200.0, 1.0], [1700.0, 1.0], [900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "contact/imgs/xperia_z5.jpg-567", "isController": false}, {"data": [[300.0, 5.0], [100.0, 15.0]], "isOverall": false, "label": "contact/node_modules/bootstrap/dist/js/bootstrap.min.js-579", "isController": false}, {"data": [[300.0, 3.0], [1600.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "/signup-148", "isController": false}, {"data": [[1200.0, 1.0], [300.0, 5.0], [600.0, 1.0], [400.0, 3.0], [200.0, 9.0], [500.0, 1.0]], "isOverall": false, "label": "contact/index.m3u8-560", "isController": false}, {"data": [[300.0, 14.0], [400.0, 11.0]], "isOverall": false, "label": "cart/viewcart-332", "isController": false}, {"data": [[300.0, 3.0], [1400.0, 1.0], [200.0, 7.0], [100.0, 4.0], [1600.0, 1.0], [400.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "contact/imgs/galaxy_s6.jpg-563", "isController": false}, {"data": [[300.0, 6.0], [1200.0, 2.0], [1400.0, 2.0], [100.0, 10.0]], "isOverall": false, "label": "contact/node_modules/video.js/dist/video-js.min.css-573", "isController": false}, {"data": [[300.0, 7.0], [100.0, 7.0], [200.0, 4.0], [400.0, 1.0], [1600.0, 1.0]], "isOverall": false, "label": "contact/nexus1.jpg-583", "isController": false}, {"data": [[300.0, 8.0], [100.0, 12.0]], "isOverall": false, "label": "contact/bm.png-557", "isController": false}, {"data": [[300.0, 11.0], [1500.0, 1.0], [100.0, 7.0], [500.0, 1.0]], "isOverall": false, "label": "contact/node_modules/tether/dist/js/tether.min.js-550", "isController": false}, {"data": [[300.0, 4.0], [100.0, 7.0], [400.0, 3.0], [200.0, 6.0]], "isOverall": false, "label": "contact/node_modules/bootstrap/dist/css/bootstrap.min.css-571", "isController": false}, {"data": [[300.0, 4.0], [1300.0, 1.0], [100.0, 11.0], [400.0, 2.0], [200.0, 2.0]], "isOverall": false, "label": "contact/Samsung1.jpg-581", "isController": false}, {"data": [[300.0, 5.0], [200.0, 4.0], [100.0, 9.0], [400.0, 2.0]], "isOverall": false, "label": "contact/iphone1.jpg-584", "isController": false}, {"data": [[300.0, 16.0], [600.0, 1.0], [400.0, 6.0], [800.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "/addtocart-258", "isController": false}, {"data": [[300.0, 11.0], [100.0, 8.0], [400.0, 1.0]], "isOverall": false, "label": "contact/node_modules/bootstrap/dist/js/bootstrap.min.js-552", "isController": false}, {"data": [[300.0, 6.0], [600.0, 1.0], [100.0, 12.0], [400.0, 1.0]], "isOverall": false, "label": "contact/css/latostyle.css-574", "isController": false}, {"data": [[300.0, 6.0], [600.0, 2.0], [700.0, 2.0], [1400.0, 1.0], [400.0, 2.0], [200.0, 3.0], [800.0, 1.0], [900.0, 1.0], [500.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "contact/imgs/Nexus_6.jpg-590", "isController": false}, {"data": [[300.0, 7.0], [1300.0, 1.0], [200.0, 4.0], [100.0, 12.0], [500.0, 1.0]], "isOverall": false, "label": "/index.html-261", "isController": false}, {"data": [[300.0, 3.0], [600.0, 1.0], [700.0, 2.0], [200.0, 4.0], [100.0, 1.0], [400.0, 4.0], [800.0, 2.0], [1600.0, 1.0], [900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "contact/imgs/iphone_6.jpg-588", "isController": false}, {"data": [[300.0, 8.0], [400.0, 3.0], [100.0, 9.0]], "isOverall": false, "label": "contact/css/latofonts.css-545", "isController": false}, {"data": [[2200.0, 1.0], [2300.0, 1.0], [200.0, 1.0], [800.0, 1.0], [900.0, 1.0], [1000.0, 1.0], [1100.0, 1.0], [300.0, 2.0], [1200.0, 1.0], [5200.0, 1.0], [400.0, 4.0], [1700.0, 2.0], [1900.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "contact/node_modules/video.js/dist/video.min.js-576", "isController": false}, {"data": [[600.0, 2.0], [300.0, 2.0], [1300.0, 1.0], [700.0, 1.0], [200.0, 7.0], [400.0, 4.0], [800.0, 1.0], [1700.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "contact/imgs/xperia_z5.jpg-591", "isController": false}, {"data": [[300.0, 24.0], [400.0, 1.0]], "isOverall": false, "label": "/view-202", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 34600.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 10.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 1380.0, "series": [{"data": [[0.0, 1380.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 250.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 70.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 10.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 1.0, "minX": 1.64999826E12, "maxY": 18.01153846153847, "series": [{"data": [[1.64999826E12, 18.01153846153847]], "isOverall": false, "label": "Send Message Thread Group", "isController": false}, {"data": [[1.64999826E12, 1.0]], "isOverall": false, "label": "Login/Signup Thread Group", "isController": false}, {"data": [[1.64999826E12, 5.538922155688622], [1.64999832E12, 2.2187500000000004]], "isOverall": false, "label": "Full Transaction Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.64999832E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 80.45, "minX": 1.0, "maxY": 34608.0, "series": [{"data": [[25.0, 1176.75], [26.0, 3660.909090909091], [27.0, 6152.0]], "isOverall": false, "label": "contact/about_demo_hls_600k00000.ts-562", "isController": false}, {"data": [[25.650000000000002, 2791.8]], "isOverall": false, "label": "contact/about_demo_hls_600k00000.ts-562-Aggregated", "isController": false}, {"data": [[8.0, 346.0], [10.0, 349.0], [11.0, 339.0], [12.0, 351.0], [3.0, 346.0], [15.0, 346.0], [4.0, 346.0], [5.0, 346.3333333333333], [24.0, 375.0], [6.0, 405.3333333333333], [25.0, 366.5], [26.0, 374.25], [27.0, 405.0]], "isOverall": false, "label": "cart/view-343", "isController": false}, {"data": [[13.72, 371.16]], "isOverall": false, "label": "cart/view-343-Aggregated", "isController": false}, {"data": [[19.0, 174.0], [22.0, 1603.0], [25.0, 138.0], [26.0, 156.54545454545453], [27.0, 397.0], [15.0, 395.0]], "isOverall": false, "label": "contact/index.html-570", "isController": false}, {"data": [[24.900000000000002, 274.95000000000005]], "isOverall": false, "label": "contact/index.html-570-Aggregated", "isController": false}, {"data": [[16.0, 383.0], [8.0, 366.0], [10.0, 344.0], [5.0, 347.0], [6.0, 464.25], [3.0, 733.0], [25.0, 487.75], [26.0, 358.75], [13.0, 348.0], [27.0, 371.0]], "isOverall": false, "label": "cart/view-342", "isController": false}, {"data": [[13.8, 408.56]], "isOverall": false, "label": "cart/view-342-Aggregated", "isController": false}, {"data": [[8.0, 369.0], [10.0, 373.5], [11.0, 346.0], [3.0, 457.0], [15.0, 389.0], [4.0, 409.0], [5.0, 414.5], [23.0, 351.0], [6.0, 414.83333333333337], [25.0, 579.6666666666666], [26.0, 516.75], [27.0, 416.0], [7.0, 341.0]], "isOverall": false, "label": "delete items/deleteitem-348", "isController": false}, {"data": [[13.720000000000004, 437.96000000000004]], "isOverall": false, "label": "delete items/deleteitem-348-Aggregated", "isController": false}, {"data": [[18.0, 349.0], [10.0, 347.0], [5.0, 388.0], [11.0, 351.0], [6.0, 347.0], [3.0, 410.0], [25.0, 378.6], [26.0, 396.0], [15.0, 356.0]], "isOverall": false, "label": "cart/view-341", "isController": false}, {"data": [[14.0, 374.1199999999999]], "isOverall": false, "label": "cart/view-341-Aggregated", "isController": false}, {"data": [[16.0, 345.0], [19.0, 689.0], [10.0, 349.5], [5.0, 366.4], [24.0, 366.0], [12.0, 392.0], [6.0, 514.0], [3.0, 408.0], [25.0, 362.25], [26.0, 397.0], [27.0, 791.0], [7.0, 349.0]], "isOverall": false, "label": "cart/view-340", "isController": false}, {"data": [[14.199999999999998, 422.67999999999995]], "isOverall": false, "label": "cart/view-340-Aggregated", "isController": false}, {"data": [[1.0, 408.0], [18.0, 400.0], [9.0, 412.0], [10.0, 378.0], [5.0, 388.8], [11.0, 385.0], [6.0, 383.6666666666667], [3.0, 378.5], [25.0, 535.5], [26.0, 514.8], [7.0, 371.5], [15.0, 346.0]], "isOverall": false, "label": "delete items/deleteitem-381", "isController": false}, {"data": [[12.28, 422.7599999999999]], "isOverall": false, "label": "delete items/deleteitem-381-Aggregated", "isController": false}, {"data": [[10.0, 558.0], [22.0, 322.5], [11.0, 341.0], [12.0, 506.0], [25.0, 415.1111111111111], [26.0, 492.3333333333333]], "isOverall": false, "label": "contact/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-577", "isController": false}, {"data": [[22.9, 437.00000000000006]], "isOverall": false, "label": "contact/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-577-Aggregated", "isController": false}, {"data": [[25.0, 391.0], [26.0, 579.8823529411766], [27.0, 437.0]], "isOverall": false, "label": "contact/imgs/sony_vaio_5.jpg-569", "isController": false}, {"data": [[26.049999999999997, 556.15]], "isOverall": false, "label": "contact/imgs/sony_vaio_5.jpg-569-Aggregated", "isController": false}, {"data": [[23.0, 244.0], [24.0, 198.66666666666666]], "isOverall": false, "label": "contact/css/latostyle.css-546", "isController": false}, {"data": [[23.15, 237.2]], "isOverall": false, "label": "contact/css/latostyle.css-546-Aggregated", "isController": false}, {"data": [[25.0, 883.0], [26.0, 751.0]], "isOverall": false, "label": "contact/entries-559", "isController": false}, {"data": [[25.05, 876.3999999999999]], "isOverall": false, "label": "contact/entries-559-Aggregated", "isController": false}, {"data": [[19.0, 406.0], [10.0, 388.5], [5.0, 424.125], [11.0, 379.0], [24.0, 378.0], [6.0, 400.0], [25.0, 394.5], [26.0, 411.0], [15.0, 385.0]], "isOverall": false, "label": "/addtocart-260", "isController": false}, {"data": [[14.760000000000007, 404.71999999999997]], "isOverall": false, "label": "/addtocart-260-Aggregated", "isController": false}, {"data": [[16.0, 150.0], [18.0, 345.0], [21.0, 155.0], [25.0, 155.25], [26.0, 164.625], [27.0, 463.0]], "isOverall": false, "label": "contact/css/latofonts.css-572", "isController": false}, {"data": [[24.9, 245.15]], "isOverall": false, "label": "contact/css/latofonts.css-572-Aggregated", "isController": false}, {"data": [[24.0, 401.6]], "isOverall": false, "label": "/login-98", "isController": false}, {"data": [[24.0, 401.6]], "isOverall": false, "label": "/login-98-Aggregated", "isController": false}, {"data": [[25.0, 199.0], [26.0, 811.1875], [27.0, 788.6666666666666]], "isOverall": false, "label": "contact/imgs/HTC_M9.jpg-568", "isController": false}, {"data": [[26.099999999999998, 777.2]], "isOverall": false, "label": "contact/imgs/HTC_M9.jpg-568-Aggregated", "isController": false}, {"data": [[25.0, 227.9]], "isOverall": false, "label": "contact/config.json-558", "isController": false}, {"data": [[25.0, 227.9]], "isOverall": false, "label": "contact/config.json-558-Aggregated", "isController": false}, {"data": [[20.0, 152.5], [10.0, 318.0], [11.0, 228.0], [25.0, 321.8888888888889], [26.0, 229.0]], "isOverall": false, "label": "contact/js/index.js-580", "isController": false}, {"data": [[22.65, 267.5]], "isOverall": false, "label": "contact/js/index.js-580-Aggregated", "isController": false}, {"data": [[10.0, 477.0], [11.0, 479.0], [13.0, 474.0], [18.0, 921.0], [5.0, 520.3333333333334], [22.0, 1494.0], [23.0, 486.0], [24.0, 554.0], [6.0, 512.4], [25.0, 871.6666666666667], [26.0, 611.25], [27.0, 511.0], [7.0, 577.5]], "isOverall": false, "label": "/index.html-208", "isController": false}, {"data": [[15.44, 629.3599999999999]], "isOverall": false, "label": "/index.html-208-Aggregated", "isController": false}, {"data": [[8.0, 622.0], [18.0, 260.0], [20.0, 1998.5], [10.0, 356.0], [23.0, 215.0], [24.0, 509.0], [12.0, 624.0], [25.0, 300.875], [26.0, 291.5], [15.0, 419.0]], "isOverall": false, "label": "contact/imgs/galaxy_s6.jpg-587", "isController": false}, {"data": [[20.600000000000005, 517.4]], "isOverall": false, "label": "contact/imgs/galaxy_s6.jpg-587-Aggregated", "isController": false}, {"data": [[8.0, 343.0], [2.0, 344.0], [10.0, 353.5], [3.0, 348.0], [14.0, 358.0], [15.0, 360.0], [1.0, 411.0], [5.0, 370.75], [6.0, 409.0], [25.0, 570.0], [26.0, 363.3333333333333], [27.0, 396.5], [7.0, 361.0]], "isOverall": false, "label": "delete items/view-406", "isController": false}, {"data": [[12.08, 391.32]], "isOverall": false, "label": "delete items/view-406-Aggregated", "isController": false}, {"data": [[25.0, 267.04999999999995]], "isOverall": false, "label": "contact/imgs/front.jpg-556", "isController": false}, {"data": [[25.0, 267.04999999999995]], "isOverall": false, "label": "contact/imgs/front.jpg-556-Aggregated", "isController": false}, {"data": [[2.0, 409.0], [1.0, 407.0], [10.0, 345.5], [5.0, 349.14285714285717], [6.0, 360.0], [3.0, 339.0], [25.0, 371.0], [26.0, 771.75], [27.0, 349.0], [7.0, 358.0], [15.0, 344.0]], "isOverall": false, "label": "delete items/view-405", "isController": false}, {"data": [[11.880000000000003, 423.7599999999999]], "isOverall": false, "label": "delete items/view-405-Aggregated", "isController": false}, {"data": [[20.0, 341.0], [10.0, 347.0], [5.0, 347.0], [24.0, 358.0], [12.0, 348.0], [6.0, 345.6666666666667], [3.0, 409.0], [25.0, 347.3333333333333], [26.0, 366.0], [7.0, 348.5], [15.0, 347.0]], "isOverall": false, "label": "cart/view-339", "isController": false}, {"data": [[14.239999999999998, 353.5199999999999]], "isOverall": false, "label": "cart/view-339-Aggregated", "isController": false}, {"data": [[2.0, 343.0], [10.0, 345.5], [12.0, 342.0], [3.0, 342.0], [15.0, 366.0], [4.0, 341.0], [1.0, 923.0], [5.0, 365.0], [24.0, 361.0], [6.0, 367.6], [25.0, 354.0], [26.0, 374.5], [27.0, 356.0], [7.0, 344.5]], "isOverall": false, "label": "delete items/view-404", "isController": false}, {"data": [[11.840000000000003, 381.55999999999995]], "isOverall": false, "label": "delete items/view-404-Aggregated", "isController": false}, {"data": [[23.0, 324.1666666666667], [24.0, 311.1428571428571]], "isOverall": false, "label": "contact/node_modules/bootstrap/dist/css/bootstrap.min.css-543", "isController": false}, {"data": [[23.7, 315.04999999999995]], "isOverall": false, "label": "contact/node_modules/bootstrap/dist/css/bootstrap.min.css-543-Aggregated", "isController": false}, {"data": [[21.0, 2211.0], [25.0, 2567.0], [26.0, 631.4285714285714], [27.0, 821.0]], "isOverall": false, "label": "contact/imgs/Lumia_1520.jpg-564", "isController": false}, {"data": [[25.9, 845.0999999999999]], "isOverall": false, "label": "contact/imgs/Lumia_1520.jpg-564-Aggregated", "isController": false}, {"data": [[8.0, 340.0], [2.0, 344.0], [10.0, 337.0], [11.0, 352.0], [3.0, 412.0], [13.0, 347.0], [5.0, 347.0], [21.0, 375.0], [23.0, 352.0], [6.0, 422.75], [25.0, 433.3333333333333], [26.0, 464.6666666666667], [27.0, 360.0], [7.0, 338.0]], "isOverall": false, "label": "delete items/view-373", "isController": false}, {"data": [[13.080000000000002, 387.08]], "isOverall": false, "label": "delete items/view-373-Aggregated", "isController": false}, {"data": [[2.0, 347.0], [11.0, 501.0], [12.0, 355.0], [3.0, 407.0], [4.0, 348.0], [19.0, 365.0], [20.0, 361.0], [5.0, 365.0], [6.0, 349.6], [25.0, 367.25], [26.0, 379.0], [27.0, 398.0], [7.0, 349.0]], "isOverall": false, "label": "delete items/view-372", "isController": false}, {"data": [[12.72, 374.68000000000006]], "isOverall": false, "label": "delete items/view-372-Aggregated", "isController": false}, {"data": [[17.0, 501.0], [20.0, 325.0], [10.0, 190.66666666666666], [24.0, 127.0], [25.0, 162.8], [26.0, 211.66666666666669], [15.0, 133.0]], "isOverall": false, "label": "contact/config.json-585", "isController": false}, {"data": [[21.7, 196.04999999999998]], "isOverall": false, "label": "contact/config.json-585-Aggregated", "isController": false}, {"data": [[8.0, 342.0], [2.0, 331.0], [10.0, 334.0], [11.0, 326.0], [3.0, 325.0], [4.0, 378.0], [18.0, 337.0], [20.0, 339.0], [5.0, 450.4], [6.0, 330.0], [25.0, 340.75], [26.0, 386.0], [27.0, 342.0]], "isOverall": false, "label": "delete items/view-370", "isController": false}, {"data": [[12.6, 362.03999999999996]], "isOverall": false, "label": "delete items/view-370-Aggregated", "isController": false}, {"data": [[25.0, 80.45]], "isOverall": false, "label": "contact/about_demo_hls_600k.m3u8-561", "isController": false}, {"data": [[25.0, 80.45]], "isOverall": false, "label": "contact/about_demo_hls_600k.m3u8-561-Aggregated", "isController": false}, {"data": [[10.0, 335.0], [21.0, 135.5], [11.0, 125.0], [12.0, 180.0], [25.0, 225.625], [26.0, 207.57142857142858]], "isOverall": false, "label": "contact/node_modules/tether/dist/js/tether.min.js-578", "isController": false}, {"data": [[22.85, 208.45000000000002]], "isOverall": false, "label": "contact/node_modules/tether/dist/js/tether.min.js-578-Aggregated", "isController": false}, {"data": [[9.0, 355.0], [19.0, 431.0], [10.0, 518.0], [24.0, 387.0], [25.0, 440.75], [26.0, 403.0], [14.0, 395.0], [15.0, 372.0]], "isOverall": false, "label": "contact/entries-586", "isController": false}, {"data": [[21.549999999999997, 425.84999999999997]], "isOverall": false, "label": "contact/entries-586-Aggregated", "isController": false}, {"data": [[2.0, 409.0], [9.0, 340.0], [10.0, 348.0], [11.0, 346.0], [3.0, 409.0], [14.0, 344.0], [20.0, 384.0], [5.0, 347.6], [24.0, 357.0], [6.0, 347.6666666666667], [25.0, 370.0], [26.0, 384.0], [27.0, 354.5], [7.0, 350.5]], "isOverall": false, "label": "delete items/view-374", "isController": false}, {"data": [[13.239999999999998, 360.24]], "isOverall": false, "label": "delete items/view-374-Aggregated", "isController": false}, {"data": [[8.0, 368.0], [4.0, 369.0], [18.0, 440.0], [10.0, 420.0], [5.0, 418.75], [11.0, 396.0], [24.0, 388.3333333333333], [6.0, 403.2], [25.0, 525.5], [26.0, 389.0], [27.0, 434.0], [15.0, 376.0]], "isOverall": false, "label": "/addtocart-314", "isController": false}, {"data": [[14.799999999999999, 412.44]], "isOverall": false, "label": "/addtocart-314-Aggregated", "isController": false}, {"data": [[22.0, 1232.9]], "isOverall": false, "label": "contact/index.html-542", "isController": false}, {"data": [[22.0, 1232.9]], "isOverall": false, "label": "contact/index.html-542-Aggregated", "isController": false}, {"data": [[23.0, 285.94117647058823], [24.0, 156.33333333333334]], "isOverall": false, "label": "contact/node_modules/video.js/dist/video-js.min.css-544", "isController": false}, {"data": [[23.15, 266.5]], "isOverall": false, "label": "contact/node_modules/video.js/dist/video-js.min.css-544-Aggregated", "isController": false}, {"data": [[24.0, 195.2222222222222], [25.0, 314.0909090909091]], "isOverall": false, "label": "contact/nexus1.jpg-553", "isController": false}, {"data": [[24.55, 260.59999999999997]], "isOverall": false, "label": "contact/nexus1.jpg-553-Aggregated", "isController": false}, {"data": [[19.0, 974.0], [25.0, 1302.5], [26.0, 971.3076923076922], [27.0, 647.25]], "isOverall": false, "label": "contact/imgs/iphone_6.jpg-566", "isController": false}, {"data": [[25.750000000000004, 939.7500000000001]], "isOverall": false, "label": "contact/imgs/iphone_6.jpg-566-Aggregated", "isController": false}, {"data": [[17.0, 1171.0], [10.0, 703.5], [5.0, 978.3333333333334], [22.0, 1684.0], [23.0, 736.0], [24.0, 907.5], [6.0, 798.75], [25.0, 854.0], [26.0, 807.0], [13.0, 706.0], [27.0, 716.0], [7.0, 709.5]], "isOverall": false, "label": "/login-151", "isController": false}, {"data": [[16.080000000000002, 862.9600000000002]], "isOverall": false, "label": "/login-151-Aggregated", "isController": false}, {"data": [[10.0, 323.0], [21.0, 136.0], [11.0, 222.5], [25.0, 193.9090909090909], [26.0, 177.5]], "isOverall": false, "label": "contact/bm.png-582", "isController": false}, {"data": [[22.65, 194.15]], "isOverall": false, "label": "contact/bm.png-582-Aggregated", "isController": false}, {"data": [[25.0, 2836.0], [26.0, 1383.1428571428573], [27.0, 1712.6]], "isOverall": false, "label": "contact/imgs/Nexus_6.jpg-565", "isController": false}, {"data": [[26.2, 1538.1499999999999]], "isOverall": false, "label": "contact/imgs/Nexus_6.jpg-565-Aggregated", "isController": false}, {"data": [[8.0, 31486.5], [10.0, 31033.0], [11.0, 27731.0], [14.0, 26327.0], [15.0, 26248.0], [16.0, 24958.5], [17.0, 24819.0], [18.0, 24154.0], [19.0, 24451.0], [20.0, 23722.0], [21.0, 23302.0], [22.0, 22529.0], [24.0, 22514.0], [25.0, 22043.0], [26.0, 19581.0], [7.0, 34608.0]], "isOverall": false, "label": "Send Message Transaction Controller", "isController": true}, {"data": [[16.45, 25849.250000000004]], "isOverall": false, "label": "Send Message Transaction Controller-Aggregated", "isController": true}, {"data": [[23.0, 301.94117647058823], [24.0, 202.33333333333334]], "isOverall": false, "label": "contact/node_modules/jquery/dist/jquery.min.js-547", "isController": false}, {"data": [[23.15, 287.0]], "isOverall": false, "label": "contact/node_modules/jquery/dist/jquery.min.js-547-Aggregated", "isController": false}, {"data": [[25.0, 416.8]], "isOverall": false, "label": "invalid login", "isController": false}, {"data": [[25.0, 416.8]], "isOverall": false, "label": "invalid login-Aggregated", "isController": false}, {"data": [[1.0, 1127.0], [17.0, 372.0], [19.0, 382.0], [10.0, 353.0], [5.0, 368.25], [11.0, 349.0], [6.0, 353.8], [3.0, 408.0], [25.0, 356.0], [26.0, 507.8], [7.0, 348.0]], "isOverall": false, "label": "delete items/view-378", "isController": false}, {"data": [[12.439999999999996, 423.72]], "isOverall": false, "label": "delete items/view-378-Aggregated", "isController": false}, {"data": [[24.0, 288.9375], [25.0, 225.25]], "isOverall": false, "label": "contact/Samsung1.jpg-554", "isController": false}, {"data": [[24.2, 276.19999999999993]], "isOverall": false, "label": "contact/Samsung1.jpg-554-Aggregated", "isController": false}, {"data": [[8.0, 338.0], [10.0, 722.0], [12.0, 268.0], [13.0, 2525.0], [15.0, 307.0], [18.0, 239.0], [19.0, 392.0], [20.0, 359.0], [21.0, 299.0], [24.0, 339.0], [6.0, 403.0], [25.0, 323.5], [26.0, 217.0]], "isOverall": false, "label": "contact/imgs/Lumia_1520.jpg-589", "isController": false}, {"data": [[17.55, 458.1000000000001]], "isOverall": false, "label": "contact/imgs/Lumia_1520.jpg-589-Aggregated", "isController": false}, {"data": [[23.0, 974.8823529411765], [24.0, 2231.6666666666665]], "isOverall": false, "label": "contact/node_modules/video.js/dist/video.min.js-548", "isController": false}, {"data": [[23.15, 1163.4]], "isOverall": false, "label": "contact/node_modules/video.js/dist/video.min.js-548-Aggregated", "isController": false}, {"data": [[25.0, 240.95000000000002]], "isOverall": false, "label": "contact/iphone1.jpg-555", "isController": false}, {"data": [[25.0, 240.95000000000002]], "isOverall": false, "label": "contact/iphone1.jpg-555-Aggregated", "isController": false}, {"data": [[8.0, 389.0], [20.0, 389.0], [10.0, 382.0], [5.0, 415.0], [11.0, 387.0], [23.0, 401.0], [6.0, 472.4], [25.0, 454.4], [26.0, 598.5], [27.0, 571.5], [7.0, 726.0], [15.0, 381.0]], "isOverall": false, "label": "/addtocart-207", "isController": false}, {"data": [[15.72, 466.99999999999994]], "isOverall": false, "label": "/addtocart-207-Aggregated", "isController": false}, {"data": [[24.0, 305.69999999999993]], "isOverall": false, "label": "contact/js/index.js-551", "isController": false}, {"data": [[24.0, 305.69999999999993]], "isOverall": false, "label": "contact/js/index.js-551-Aggregated", "isController": false}, {"data": [[19.0, 236.0], [25.0, 210.25], [26.0, 232.18181818181822], [13.0, 440.0], [27.0, 465.5], [15.0, 497.0]], "isOverall": false, "label": "contact/node_modules/jquery/dist/jquery.min.js-575", "isController": false}, {"data": [[24.35, 274.95000000000005]], "isOverall": false, "label": "contact/node_modules/jquery/dist/jquery.min.js-575-Aggregated", "isController": false}, {"data": [[8.0, 281.5], [10.0, 469.0], [11.0, 660.0], [14.0, 271.0], [15.0, 310.0], [16.0, 239.0], [17.0, 236.0], [18.0, 167.0], [19.0, 482.0], [20.0, 338.0], [21.0, 453.0], [22.0, 164.0], [24.0, 350.0], [25.0, 382.0], [26.0, 437.0], [7.0, 251.0]], "isOverall": false, "label": "contact/imgs/HTC_M9.jpg-592", "isController": false}, {"data": [[16.45, 356.2]], "isOverall": false, "label": "contact/imgs/HTC_M9.jpg-592-Aggregated", "isController": false}, {"data": [[8.0, 394.0], [10.0, 391.0], [5.0, 427.42857142857144], [21.0, 381.0], [11.0, 383.0], [23.0, 392.0], [24.0, 385.0], [6.0, 380.5], [25.0, 392.0], [26.0, 402.25], [15.0, 387.0]], "isOverall": false, "label": "/addtocart-205", "isController": false}, {"data": [[15.439999999999998, 401.4]], "isOverall": false, "label": "/addtocart-205-Aggregated", "isController": false}, {"data": [[8.0, 390.0], [10.0, 391.0], [11.0, 389.0], [3.0, 467.5], [15.0, 372.0], [1.0, 410.0], [17.0, 445.0], [5.0, 450.1428571428571], [6.0, 567.0], [25.0, 429.0], [26.0, 452.2], [27.0, 439.0], [7.0, 445.0]], "isOverall": false, "label": "delete items/viewcart-400", "isController": false}, {"data": [[12.159999999999998, 447.63999999999993]], "isOverall": false, "label": "delete items/viewcart-400-Aggregated", "isController": false}, {"data": [[24.0, 328.8235294117647], [25.0, 820.6666666666666]], "isOverall": false, "label": "contact/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-549", "isController": false}, {"data": [[24.15, 402.59999999999997]], "isOverall": false, "label": "contact/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-549-Aggregated", "isController": false}, {"data": [[2.0, 10704.0], [9.0, 11350.0], [11.0, 12112.0], [12.0, 11272.0], [3.0, 11247.0], [13.0, 12798.0], [4.0, 10510.0], [1.0, 12736.0], [5.0, 11914.0], [23.0, 11405.0], [6.0, 10953.125], [26.0, 11519.0], [27.0, 12387.0], [7.0, 11069.0]], "isOverall": false, "label": "Login to purchase flow Transaction Controller", "isController": true}, {"data": [[11.920000000000002, 11493.12]], "isOverall": false, "label": "Login to purchase flow Transaction Controller-Aggregated", "isController": true}, {"data": [[2.0, 363.0], [9.0, 413.0], [11.0, 523.0], [12.0, 429.0], [3.0, 437.0], [13.0, 546.0], [4.0, 392.0], [1.0, 374.0], [5.0, 512.0], [23.0, 523.0], [6.0, 514.25], [26.0, 509.0], [27.0, 630.0], [7.0, 462.0]], "isOverall": false, "label": "place order/deletecart-411", "isController": false}, {"data": [[11.920000000000002, 505.04]], "isOverall": false, "label": "place order/deletecart-411-Aggregated", "isController": false}, {"data": [[19.0, 3008.0], [25.0, 3148.25], [26.0, 650.3333333333334], [27.0, 609.5], [15.0, 918.0]], "isOverall": false, "label": "contact/imgs/xperia_z5.jpg-567", "isController": false}, {"data": [[25.0, 1277.1]], "isOverall": false, "label": "contact/imgs/xperia_z5.jpg-567-Aggregated", "isController": false}, {"data": [[20.0, 164.0], [10.0, 142.0], [11.0, 237.0], [25.0, 175.14285714285714], [26.0, 231.5]], "isOverall": false, "label": "contact/node_modules/bootstrap/dist/js/bootstrap.min.js-579", "isController": false}, {"data": [[22.75, 201.1]], "isOverall": false, "label": "contact/node_modules/bootstrap/dist/js/bootstrap.min.js-579-Aggregated", "isController": false}, {"data": [[22.0, 1675.0], [23.0, 501.75]], "isOverall": false, "label": "/signup-148", "isController": false}, {"data": [[22.8, 736.4]], "isOverall": false, "label": "/signup-148-Aggregated", "isController": false}, {"data": [[25.0, 389.70000000000005]], "isOverall": false, "label": "contact/index.m3u8-560", "isController": false}, {"data": [[25.0, 389.70000000000005]], "isOverall": false, "label": "contact/index.m3u8-560-Aggregated", "isController": false}, {"data": [[8.0, 392.0], [10.0, 385.0], [11.0, 377.0], [14.0, 419.0], [16.0, 467.0], [4.0, 468.0], [5.0, 400.0], [21.0, 389.0], [24.0, 405.0], [6.0, 398.8333333333333], [25.0, 393.0], [26.0, 417.3333333333333], [27.0, 395.0], [7.0, 381.0]], "isOverall": false, "label": "cart/viewcart-332", "isController": false}, {"data": [[14.640000000000002, 403.8]], "isOverall": false, "label": "cart/viewcart-332-Aggregated", "isController": false}, {"data": [[25.0, 316.75], [26.0, 477.0], [27.0, 244.0]], "isOverall": false, "label": "contact/imgs/galaxy_s6.jpg-563", "isController": false}, {"data": [[25.85, 433.3]], "isOverall": false, "label": "contact/imgs/galaxy_s6.jpg-563-Aggregated", "isController": false}, {"data": [[11.0, 336.0], [24.0, 157.0], [25.0, 549.5], [26.0, 353.6666666666667], [15.0, 1476.0]], "isOverall": false, "label": "contact/node_modules/video.js/dist/video-js.min.css-573", "isController": false}, {"data": [[23.45, 447.1000000000001]], "isOverall": false, "label": "contact/node_modules/video.js/dist/video-js.min.css-573-Aggregated", "isController": false}, {"data": [[19.0, 323.5], [10.0, 319.0], [21.0, 1614.0], [25.0, 220.66666666666666], [26.0, 351.5]], "isOverall": false, "label": "contact/nexus1.jpg-583", "isController": false}, {"data": [[22.05, 328.45]], "isOverall": false, "label": "contact/nexus1.jpg-583-Aggregated", "isController": false}, {"data": [[24.0, 265.3333333333333], [25.0, 203.05882352941174]], "isOverall": false, "label": "contact/bm.png-557", "isController": false}, {"data": [[24.85, 212.4]], "isOverall": false, "label": "contact/bm.png-557-Aggregated", "isController": false}, {"data": [[24.0, 271.8333333333333], [25.0, 971.0]], "isOverall": false, "label": "contact/node_modules/tether/dist/js/tether.min.js-550", "isController": false}, {"data": [[24.1, 341.75]], "isOverall": false, "label": "contact/node_modules/tether/dist/js/tether.min.js-550-Aggregated", "isController": false}, {"data": [[11.0, 391.0], [23.0, 155.0], [24.0, 251.0], [25.0, 227.24999999999997], [26.0, 304.0], [15.0, 232.0]], "isOverall": false, "label": "contact/node_modules/bootstrap/dist/css/bootstrap.min.css-571", "isController": false}, {"data": [[23.299999999999997, 268.30000000000007]], "isOverall": false, "label": "contact/node_modules/bootstrap/dist/css/bootstrap.min.css-571-Aggregated", "isController": false}, {"data": [[18.0, 150.0], [20.0, 210.0], [10.0, 302.0], [24.0, 145.0], [25.0, 233.49999999999997], [26.0, 235.66666666666666], [15.0, 1378.0]], "isOverall": false, "label": "contact/Samsung1.jpg-581", "isController": false}, {"data": [[21.75, 291.55]], "isOverall": false, "label": "contact/Samsung1.jpg-581-Aggregated", "isController": false}, {"data": [[19.0, 203.0], [10.0, 188.5], [11.0, 387.0], [25.0, 229.41666666666666], [26.0, 413.3333333333333]], "isOverall": false, "label": "contact/iphone1.jpg-584", "isController": false}, {"data": [[22.349999999999998, 258.1499999999999]], "isOverall": false, "label": "contact/iphone1.jpg-584-Aggregated", "isController": false}, {"data": [[16.0, 379.0], [20.0, 384.0], [10.0, 388.5], [5.0, 407.0], [23.0, 411.0], [24.0, 369.0], [12.0, 515.0], [6.0, 397.75], [25.0, 465.25], [26.0, 542.6666666666666], [27.0, 381.0], [7.0, 382.0]], "isOverall": false, "label": "/addtocart-258", "isController": false}, {"data": [[15.04, 428.52]], "isOverall": false, "label": "/addtocart-258-Aggregated", "isController": false}, {"data": [[24.0, 314.1333333333334], [25.0, 139.8]], "isOverall": false, "label": "contact/node_modules/bootstrap/dist/js/bootstrap.min.js-552", "isController": false}, {"data": [[24.25, 270.55000000000007]], "isOverall": false, "label": "contact/node_modules/bootstrap/dist/js/bootstrap.min.js-552-Aggregated", "isController": false}, {"data": [[16.0, 389.0], [20.0, 336.0], [25.0, 130.5], [26.0, 269.77777777777777], [27.0, 182.5], [15.0, 319.0]], "isOverall": false, "label": "contact/css/latostyle.css-574", "isController": false}, {"data": [[24.65, 236.19999999999996]], "isOverall": false, "label": "contact/css/latostyle.css-574-Aggregated", "isController": false}, {"data": [[16.0, 233.0], [17.0, 840.0], [9.0, 289.0], [19.0, 524.0], [10.0, 705.0], [21.0, 796.3333333333333], [22.0, 732.0], [23.0, 401.0], [24.0, 614.0], [6.0, 617.0], [25.0, 422.75], [13.0, 341.0]], "isOverall": false, "label": "contact/imgs/Nexus_6.jpg-590", "isController": false}, {"data": [[18.75, 560.95]], "isOverall": false, "label": "contact/imgs/Nexus_6.jpg-590-Aggregated", "isController": false}, {"data": [[9.0, 210.0], [19.0, 136.0], [10.0, 237.5], [5.0, 240.28571428571428], [24.0, 246.66666666666666], [6.0, 350.0], [25.0, 472.00000000000006], [26.0, 161.0], [27.0, 362.0], [15.0, 143.0]], "isOverall": false, "label": "/index.html-261", "isController": false}, {"data": [[14.680000000000001, 280.32000000000005]], "isOverall": false, "label": "/index.html-261-Aggregated", "isController": false}, {"data": [[17.0, 241.0], [19.0, 614.0], [20.0, 781.0], [10.0, 338.5], [22.0, 760.0], [11.0, 1077.0], [24.0, 703.6666666666666], [25.0, 429.16666666666663], [7.0, 816.0], [15.0, 315.0]], "isOverall": false, "label": "contact/imgs/iphone_6.jpg-588", "isController": false}, {"data": [[19.650000000000002, 576.45]], "isOverall": false, "label": "contact/imgs/iphone_6.jpg-588-Aggregated", "isController": false}, {"data": [[23.0, 225.35294117647058], [24.0, 458.3333333333333]], "isOverall": false, "label": "contact/css/latofonts.css-545", "isController": false}, {"data": [[23.15, 260.29999999999995]], "isOverall": false, "label": "contact/css/latofonts.css-545-Aggregated", "isController": false}, {"data": [[19.0, 464.0], [11.0, 989.0], [24.0, 5234.0], [12.0, 1146.0], [25.0, 944.25], [26.0, 1062.1], [27.0, 1032.5]], "isOverall": false, "label": "contact/node_modules/video.js/dist/video.min.js-576", "isController": false}, {"data": [[24.0, 1214.7999999999997]], "isOverall": false, "label": "contact/node_modules/video.js/dist/video.min.js-576-Aggregated", "isController": false}, {"data": [[8.0, 227.0], [17.0, 424.0], [18.0, 250.5], [20.0, 426.6666666666667], [10.0, 707.0], [11.0, 879.5], [23.0, 281.0], [24.0, 479.5], [26.0, 352.5], [7.0, 676.0], [15.0, 850.3333333333333]], "isOverall": false, "label": "contact/imgs/xperia_z5.jpg-591", "isController": false}, {"data": [[16.75, 537.3000000000001]], "isOverall": false, "label": "contact/imgs/xperia_z5.jpg-591-Aggregated", "isController": false}, {"data": [[10.0, 345.5], [5.0, 348.16666666666663], [23.0, 353.5], [24.0, 371.5], [12.0, 335.0], [6.0, 346.0], [25.0, 372.0], [26.0, 357.6666666666667], [27.0, 369.0], [7.0, 335.0], [15.0, 347.0]], "isOverall": false, "label": "/view-202", "isController": false}, {"data": [[15.799999999999997, 354.7600000000001]], "isOverall": false, "label": "/view-202-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 27.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 223.08333333333334, "minX": 1.64999826E12, "maxY": 1186410.2666666666, "series": [{"data": [[1.64999826E12, 1186410.2666666666], [1.64999832E12, 310.85]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.64999826E12, 12672.483333333334], [1.64999832E12, 223.08333333333334]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.64999832E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 80.45, "minX": 1.64999826E12, "maxY": 25849.250000000004, "series": [{"data": [[1.64999826E12, 2791.8]], "isOverall": false, "label": "contact/about_demo_hls_600k00000.ts-562", "isController": false}, {"data": [[1.64999826E12, 372.20833333333337], [1.64999832E12, 346.0]], "isOverall": false, "label": "cart/view-343", "isController": false}, {"data": [[1.64999826E12, 274.95000000000005]], "isOverall": false, "label": "contact/index.html-570", "isController": false}, {"data": [[1.64999826E12, 395.0416666666667], [1.64999832E12, 733.0]], "isOverall": false, "label": "cart/view-342", "isController": false}, {"data": [[1.64999826E12, 437.1666666666667], [1.64999832E12, 457.0]], "isOverall": false, "label": "delete items/deleteitem-348", "isController": false}, {"data": [[1.64999826E12, 372.6249999999999], [1.64999832E12, 410.0]], "isOverall": false, "label": "cart/view-341", "isController": false}, {"data": [[1.64999826E12, 422.67999999999995]], "isOverall": false, "label": "cart/view-340", "isController": false}, {"data": [[1.64999826E12, 426.6521739130434], [1.64999832E12, 378.0]], "isOverall": false, "label": "delete items/deleteitem-381", "isController": false}, {"data": [[1.64999826E12, 437.00000000000006]], "isOverall": false, "label": "contact/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-577", "isController": false}, {"data": [[1.64999826E12, 556.15]], "isOverall": false, "label": "contact/imgs/sony_vaio_5.jpg-569", "isController": false}, {"data": [[1.64999826E12, 237.2]], "isOverall": false, "label": "contact/css/latostyle.css-546", "isController": false}, {"data": [[1.64999826E12, 876.3999999999999]], "isOverall": false, "label": "contact/entries-559", "isController": false}, {"data": [[1.64999826E12, 404.71999999999997]], "isOverall": false, "label": "/addtocart-260", "isController": false}, {"data": [[1.64999826E12, 245.15]], "isOverall": false, "label": "contact/css/latofonts.css-572", "isController": false}, {"data": [[1.64999826E12, 401.6]], "isOverall": false, "label": "/login-98", "isController": false}, {"data": [[1.64999826E12, 777.2]], "isOverall": false, "label": "contact/imgs/HTC_M9.jpg-568", "isController": false}, {"data": [[1.64999826E12, 227.9]], "isOverall": false, "label": "contact/config.json-558", "isController": false}, {"data": [[1.64999826E12, 267.5]], "isOverall": false, "label": "contact/js/index.js-580", "isController": false}, {"data": [[1.64999826E12, 629.3599999999999]], "isOverall": false, "label": "/index.html-208", "isController": false}, {"data": [[1.64999826E12, 517.4]], "isOverall": false, "label": "contact/imgs/galaxy_s6.jpg-587", "isController": false}, {"data": [[1.64999826E12, 394.5454545454545], [1.64999832E12, 367.6666666666667]], "isOverall": false, "label": "delete items/view-406", "isController": false}, {"data": [[1.64999826E12, 267.04999999999995]], "isOverall": false, "label": "contact/imgs/front.jpg-556", "isController": false}, {"data": [[1.64999826E12, 429.04545454545445], [1.64999832E12, 385.0]], "isOverall": false, "label": "delete items/view-405", "isController": false}, {"data": [[1.64999826E12, 353.5199999999999]], "isOverall": false, "label": "cart/view-339", "isController": false}, {"data": [[1.64999826E12, 360.49999999999994], [1.64999832E12, 536.0]], "isOverall": false, "label": "delete items/view-404", "isController": false}, {"data": [[1.64999826E12, 315.04999999999995]], "isOverall": false, "label": "contact/node_modules/bootstrap/dist/css/bootstrap.min.css-543", "isController": false}, {"data": [[1.64999826E12, 845.0999999999999]], "isOverall": false, "label": "contact/imgs/Lumia_1520.jpg-564", "isController": false}, {"data": [[1.64999826E12, 388.875], [1.64999832E12, 344.0]], "isOverall": false, "label": "delete items/view-373", "isController": false}, {"data": [[1.64999826E12, 374.47826086956525], [1.64999832E12, 377.0]], "isOverall": false, "label": "delete items/view-372", "isController": false}, {"data": [[1.64999826E12, 196.04999999999998]], "isOverall": false, "label": "contact/config.json-585", "isController": false}, {"data": [[1.64999826E12, 365.0], [1.64999832E12, 328.0]], "isOverall": false, "label": "delete items/view-370", "isController": false}, {"data": [[1.64999826E12, 80.45]], "isOverall": false, "label": "contact/about_demo_hls_600k.m3u8-561", "isController": false}, {"data": [[1.64999826E12, 208.45000000000002]], "isOverall": false, "label": "contact/node_modules/tether/dist/js/tether.min.js-578", "isController": false}, {"data": [[1.64999826E12, 425.84999999999997]], "isOverall": false, "label": "contact/entries-586", "isController": false}, {"data": [[1.64999826E12, 358.2083333333333], [1.64999832E12, 409.0]], "isOverall": false, "label": "delete items/view-374", "isController": false}, {"data": [[1.64999826E12, 412.44]], "isOverall": false, "label": "/addtocart-314", "isController": false}, {"data": [[1.64999826E12, 1232.9]], "isOverall": false, "label": "contact/index.html-542", "isController": false}, {"data": [[1.64999826E12, 266.5]], "isOverall": false, "label": "contact/node_modules/video.js/dist/video-js.min.css-544", "isController": false}, {"data": [[1.64999826E12, 260.59999999999997]], "isOverall": false, "label": "contact/nexus1.jpg-553", "isController": false}, {"data": [[1.64999826E12, 939.7500000000001]], "isOverall": false, "label": "contact/imgs/iphone_6.jpg-566", "isController": false}, {"data": [[1.64999826E12, 862.9600000000002]], "isOverall": false, "label": "/login-151", "isController": false}, {"data": [[1.64999826E12, 194.15]], "isOverall": false, "label": "contact/bm.png-582", "isController": false}, {"data": [[1.64999826E12, 1538.1499999999999]], "isOverall": false, "label": "contact/imgs/Nexus_6.jpg-565", "isController": false}, {"data": [[1.64999826E12, 25849.250000000004]], "isOverall": false, "label": "Send Message Transaction Controller", "isController": true}, {"data": [[1.64999826E12, 287.0]], "isOverall": false, "label": "contact/node_modules/jquery/dist/jquery.min.js-547", "isController": false}, {"data": [[1.64999826E12, 416.8]], "isOverall": false, "label": "invalid login", "isController": false}, {"data": [[1.64999826E12, 393.8695652173913], [1.64999832E12, 767.0]], "isOverall": false, "label": "delete items/view-378", "isController": false}, {"data": [[1.64999826E12, 276.19999999999993]], "isOverall": false, "label": "contact/Samsung1.jpg-554", "isController": false}, {"data": [[1.64999826E12, 458.1000000000001]], "isOverall": false, "label": "contact/imgs/Lumia_1520.jpg-589", "isController": false}, {"data": [[1.64999826E12, 1163.4]], "isOverall": false, "label": "contact/node_modules/video.js/dist/video.min.js-548", "isController": false}, {"data": [[1.64999826E12, 240.95000000000002]], "isOverall": false, "label": "contact/iphone1.jpg-555", "isController": false}, {"data": [[1.64999826E12, 466.99999999999994]], "isOverall": false, "label": "/addtocart-207", "isController": false}, {"data": [[1.64999826E12, 305.69999999999993]], "isOverall": false, "label": "contact/js/index.js-551", "isController": false}, {"data": [[1.64999826E12, 274.95000000000005]], "isOverall": false, "label": "contact/node_modules/jquery/dist/jquery.min.js-575", "isController": false}, {"data": [[1.64999826E12, 356.2]], "isOverall": false, "label": "contact/imgs/HTC_M9.jpg-592", "isController": false}, {"data": [[1.64999826E12, 401.4]], "isOverall": false, "label": "/addtocart-205", "isController": false}, {"data": [[1.64999826E12, 447.5454545454545], [1.64999832E12, 448.3333333333333]], "isOverall": false, "label": "delete items/viewcart-400", "isController": false}, {"data": [[1.64999826E12, 402.59999999999997]], "isOverall": false, "label": "contact/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-549", "isController": false}, {"data": [[1.64999826E12, 11483.681818181818], [1.64999832E12, 11562.333333333334]], "isOverall": false, "label": "Login to purchase flow Transaction Controller", "isController": true}, {"data": [[1.64999826E12, 520.5454545454545], [1.64999832E12, 391.3333333333333]], "isOverall": false, "label": "place order/deletecart-411", "isController": false}, {"data": [[1.64999826E12, 1277.1]], "isOverall": false, "label": "contact/imgs/xperia_z5.jpg-567", "isController": false}, {"data": [[1.64999826E12, 201.1]], "isOverall": false, "label": "contact/node_modules/bootstrap/dist/js/bootstrap.min.js-579", "isController": false}, {"data": [[1.64999826E12, 736.4]], "isOverall": false, "label": "/signup-148", "isController": false}, {"data": [[1.64999826E12, 389.70000000000005]], "isOverall": false, "label": "contact/index.m3u8-560", "isController": false}, {"data": [[1.64999826E12, 403.8]], "isOverall": false, "label": "cart/viewcart-332", "isController": false}, {"data": [[1.64999826E12, 433.3]], "isOverall": false, "label": "contact/imgs/galaxy_s6.jpg-563", "isController": false}, {"data": [[1.64999826E12, 447.1000000000001]], "isOverall": false, "label": "contact/node_modules/video.js/dist/video-js.min.css-573", "isController": false}, {"data": [[1.64999826E12, 328.45]], "isOverall": false, "label": "contact/nexus1.jpg-583", "isController": false}, {"data": [[1.64999826E12, 212.4]], "isOverall": false, "label": "contact/bm.png-557", "isController": false}, {"data": [[1.64999826E12, 341.75]], "isOverall": false, "label": "contact/node_modules/tether/dist/js/tether.min.js-550", "isController": false}, {"data": [[1.64999826E12, 268.30000000000007]], "isOverall": false, "label": "contact/node_modules/bootstrap/dist/css/bootstrap.min.css-571", "isController": false}, {"data": [[1.64999826E12, 291.55]], "isOverall": false, "label": "contact/Samsung1.jpg-581", "isController": false}, {"data": [[1.64999826E12, 258.1499999999999]], "isOverall": false, "label": "contact/iphone1.jpg-584", "isController": false}, {"data": [[1.64999826E12, 428.52]], "isOverall": false, "label": "/addtocart-258", "isController": false}, {"data": [[1.64999826E12, 270.55000000000007]], "isOverall": false, "label": "contact/node_modules/bootstrap/dist/js/bootstrap.min.js-552", "isController": false}, {"data": [[1.64999826E12, 236.19999999999996]], "isOverall": false, "label": "contact/css/latostyle.css-574", "isController": false}, {"data": [[1.64999826E12, 560.95]], "isOverall": false, "label": "contact/imgs/Nexus_6.jpg-590", "isController": false}, {"data": [[1.64999826E12, 280.32000000000005]], "isOverall": false, "label": "/index.html-261", "isController": false}, {"data": [[1.64999826E12, 576.45]], "isOverall": false, "label": "contact/imgs/iphone_6.jpg-588", "isController": false}, {"data": [[1.64999826E12, 260.29999999999995]], "isOverall": false, "label": "contact/css/latofonts.css-545", "isController": false}, {"data": [[1.64999826E12, 1214.7999999999997]], "isOverall": false, "label": "contact/node_modules/video.js/dist/video.min.js-576", "isController": false}, {"data": [[1.64999826E12, 537.3000000000001]], "isOverall": false, "label": "contact/imgs/xperia_z5.jpg-591", "isController": false}, {"data": [[1.64999826E12, 354.7600000000001]], "isOverall": false, "label": "/view-202", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.64999832E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.64999826E12, "maxY": 1213.0499999999997, "series": [{"data": [[1.64999826E12, 93.2]], "isOverall": false, "label": "contact/about_demo_hls_600k00000.ts-562", "isController": false}, {"data": [[1.64999826E12, 371.99999999999994], [1.64999832E12, 346.0]], "isOverall": false, "label": "cart/view-343", "isController": false}, {"data": [[1.64999826E12, 172.35]], "isOverall": false, "label": "contact/index.html-570", "isController": false}, {"data": [[1.64999826E12, 394.8333333333333], [1.64999832E12, 733.0]], "isOverall": false, "label": "cart/view-342", "isController": false}, {"data": [[1.64999826E12, 437.12500000000006], [1.64999832E12, 457.0]], "isOverall": false, "label": "delete items/deleteitem-348", "isController": false}, {"data": [[1.64999826E12, 372.5], [1.64999832E12, 410.0]], "isOverall": false, "label": "cart/view-341", "isController": false}, {"data": [[1.64999826E12, 422.5999999999999]], "isOverall": false, "label": "cart/view-340", "isController": false}, {"data": [[1.64999826E12, 426.6086956521738], [1.64999832E12, 378.0]], "isOverall": false, "label": "delete items/deleteitem-381", "isController": false}, {"data": [[1.64999826E12, 236.10000000000002]], "isOverall": false, "label": "contact/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-577", "isController": false}, {"data": [[1.64999826E12, 306.1500000000001]], "isOverall": false, "label": "contact/imgs/sony_vaio_5.jpg-569", "isController": false}, {"data": [[1.64999826E12, 237.1]], "isOverall": false, "label": "contact/css/latostyle.css-546", "isController": false}, {"data": [[1.64999826E12, 875.9499999999999]], "isOverall": false, "label": "contact/entries-559", "isController": false}, {"data": [[1.64999826E12, 404.71999999999997]], "isOverall": false, "label": "/addtocart-260", "isController": false}, {"data": [[1.64999826E12, 245.05000000000007]], "isOverall": false, "label": "contact/css/latofonts.css-572", "isController": false}, {"data": [[1.64999826E12, 401.6]], "isOverall": false, "label": "/login-98", "isController": false}, {"data": [[1.64999826E12, 348.55]], "isOverall": false, "label": "contact/imgs/HTC_M9.jpg-568", "isController": false}, {"data": [[1.64999826E12, 227.85]], "isOverall": false, "label": "contact/config.json-558", "isController": false}, {"data": [[1.64999826E12, 259.79999999999995]], "isOverall": false, "label": "contact/js/index.js-580", "isController": false}, {"data": [[1.64999826E12, 603.64]], "isOverall": false, "label": "/index.html-208", "isController": false}, {"data": [[1.64999826E12, 223.04999999999998]], "isOverall": false, "label": "contact/imgs/galaxy_s6.jpg-587", "isController": false}, {"data": [[1.64999826E12, 394.36363636363626], [1.64999832E12, 367.3333333333333]], "isOverall": false, "label": "delete items/view-406", "isController": false}, {"data": [[1.64999826E12, 255.54999999999993]], "isOverall": false, "label": "contact/imgs/front.jpg-556", "isController": false}, {"data": [[1.64999826E12, 428.90909090909093], [1.64999832E12, 384.6666666666667]], "isOverall": false, "label": "delete items/view-405", "isController": false}, {"data": [[1.64999826E12, 353.44]], "isOverall": false, "label": "cart/view-339", "isController": false}, {"data": [[1.64999826E12, 360.49999999999994], [1.64999832E12, 535.6666666666666]], "isOverall": false, "label": "delete items/view-404", "isController": false}, {"data": [[1.64999826E12, 297.44999999999993]], "isOverall": false, "label": "contact/node_modules/bootstrap/dist/css/bootstrap.min.css-543", "isController": false}, {"data": [[1.64999826E12, 282.9]], "isOverall": false, "label": "contact/imgs/Lumia_1520.jpg-564", "isController": false}, {"data": [[1.64999826E12, 388.66666666666663], [1.64999832E12, 344.0]], "isOverall": false, "label": "delete items/view-373", "isController": false}, {"data": [[1.64999826E12, 374.304347826087], [1.64999832E12, 377.0]], "isOverall": false, "label": "delete items/view-372", "isController": false}, {"data": [[1.64999826E12, 195.9]], "isOverall": false, "label": "contact/config.json-585", "isController": false}, {"data": [[1.64999826E12, 365.0], [1.64999832E12, 328.0]], "isOverall": false, "label": "delete items/view-370", "isController": false}, {"data": [[1.64999826E12, 78.05]], "isOverall": false, "label": "contact/about_demo_hls_600k.m3u8-561", "isController": false}, {"data": [[1.64999826E12, 190.2]], "isOverall": false, "label": "contact/node_modules/tether/dist/js/tether.min.js-578", "isController": false}, {"data": [[1.64999826E12, 425.0]], "isOverall": false, "label": "contact/entries-586", "isController": false}, {"data": [[1.64999826E12, 358.2083333333333], [1.64999832E12, 408.0]], "isOverall": false, "label": "delete items/view-374", "isController": false}, {"data": [[1.64999826E12, 412.44]], "isOverall": false, "label": "/addtocart-314", "isController": false}, {"data": [[1.64999826E12, 1213.0499999999997]], "isOverall": false, "label": "contact/index.html-542", "isController": false}, {"data": [[1.64999826E12, 262.2]], "isOverall": false, "label": "contact/node_modules/video.js/dist/video-js.min.css-544", "isController": false}, {"data": [[1.64999826E12, 236.3]], "isOverall": false, "label": "contact/nexus1.jpg-553", "isController": false}, {"data": [[1.64999826E12, 335.44999999999993]], "isOverall": false, "label": "contact/imgs/iphone_6.jpg-566", "isController": false}, {"data": [[1.64999826E12, 862.6800000000001]], "isOverall": false, "label": "/login-151", "isController": false}, {"data": [[1.64999826E12, 190.20000000000002]], "isOverall": false, "label": "contact/bm.png-582", "isController": false}, {"data": [[1.64999826E12, 367.25]], "isOverall": false, "label": "contact/imgs/Nexus_6.jpg-565", "isController": false}, {"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "Send Message Transaction Controller", "isController": true}, {"data": [[1.64999826E12, 251.05]], "isOverall": false, "label": "contact/node_modules/jquery/dist/jquery.min.js-547", "isController": false}, {"data": [[1.64999826E12, 416.8]], "isOverall": false, "label": "invalid login", "isController": false}, {"data": [[1.64999826E12, 393.78260869565213], [1.64999832E12, 767.0]], "isOverall": false, "label": "delete items/view-378", "isController": false}, {"data": [[1.64999826E12, 251.70000000000002]], "isOverall": false, "label": "contact/Samsung1.jpg-554", "isController": false}, {"data": [[1.64999826E12, 193.25]], "isOverall": false, "label": "contact/imgs/Lumia_1520.jpg-589", "isController": false}, {"data": [[1.64999826E12, 690.7]], "isOverall": false, "label": "contact/node_modules/video.js/dist/video.min.js-548", "isController": false}, {"data": [[1.64999826E12, 220.45000000000005]], "isOverall": false, "label": "contact/iphone1.jpg-555", "isController": false}, {"data": [[1.64999826E12, 466.99999999999994]], "isOverall": false, "label": "/addtocart-207", "isController": false}, {"data": [[1.64999826E12, 303.6]], "isOverall": false, "label": "contact/js/index.js-551", "isController": false}, {"data": [[1.64999826E12, 202.20000000000002]], "isOverall": false, "label": "contact/node_modules/jquery/dist/jquery.min.js-575", "isController": false}, {"data": [[1.64999826E12, 211.65]], "isOverall": false, "label": "contact/imgs/HTC_M9.jpg-592", "isController": false}, {"data": [[1.64999826E12, 401.4]], "isOverall": false, "label": "/addtocart-205", "isController": false}, {"data": [[1.64999826E12, 447.45454545454544], [1.64999832E12, 448.3333333333333]], "isOverall": false, "label": "delete items/viewcart-400", "isController": false}, {"data": [[1.64999826E12, 298.59999999999997]], "isOverall": false, "label": "contact/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-549", "isController": false}, {"data": [[1.64999826E12, 0.0], [1.64999832E12, 0.0]], "isOverall": false, "label": "Login to purchase flow Transaction Controller", "isController": true}, {"data": [[1.64999826E12, 520.409090909091], [1.64999832E12, 391.3333333333333]], "isOverall": false, "label": "place order/deletecart-411", "isController": false}, {"data": [[1.64999826E12, 259.1]], "isOverall": false, "label": "contact/imgs/xperia_z5.jpg-567", "isController": false}, {"data": [[1.64999826E12, 189.0]], "isOverall": false, "label": "contact/node_modules/bootstrap/dist/js/bootstrap.min.js-579", "isController": false}, {"data": [[1.64999826E12, 736.4]], "isOverall": false, "label": "/signup-148", "isController": false}, {"data": [[1.64999826E12, 389.55]], "isOverall": false, "label": "contact/index.m3u8-560", "isController": false}, {"data": [[1.64999826E12, 403.56000000000006]], "isOverall": false, "label": "cart/viewcart-332", "isController": false}, {"data": [[1.64999826E12, 278.55]], "isOverall": false, "label": "contact/imgs/galaxy_s6.jpg-563", "isController": false}, {"data": [[1.64999826E12, 400.35]], "isOverall": false, "label": "contact/node_modules/video.js/dist/video-js.min.css-573", "isController": false}, {"data": [[1.64999826E12, 271.7]], "isOverall": false, "label": "contact/nexus1.jpg-583", "isController": false}, {"data": [[1.64999826E12, 210.9]], "isOverall": false, "label": "contact/bm.png-557", "isController": false}, {"data": [[1.64999826E12, 327.85]], "isOverall": false, "label": "contact/node_modules/tether/dist/js/tether.min.js-550", "isController": false}, {"data": [[1.64999826E12, 228.70000000000002]], "isOverall": false, "label": "contact/node_modules/bootstrap/dist/css/bootstrap.min.css-571", "isController": false}, {"data": [[1.64999826E12, 209.40000000000003]], "isOverall": false, "label": "contact/Samsung1.jpg-581", "isController": false}, {"data": [[1.64999826E12, 208.59999999999997]], "isOverall": false, "label": "contact/iphone1.jpg-584", "isController": false}, {"data": [[1.64999826E12, 428.52]], "isOverall": false, "label": "/addtocart-258", "isController": false}, {"data": [[1.64999826E12, 264.35]], "isOverall": false, "label": "contact/node_modules/bootstrap/dist/js/bootstrap.min.js-552", "isController": false}, {"data": [[1.64999826E12, 236.09999999999997]], "isOverall": false, "label": "contact/css/latostyle.css-574", "isController": false}, {"data": [[1.64999826E12, 208.0]], "isOverall": false, "label": "contact/imgs/Nexus_6.jpg-590", "isController": false}, {"data": [[1.64999826E12, 264.43999999999994]], "isOverall": false, "label": "/index.html-261", "isController": false}, {"data": [[1.64999826E12, 249.45]], "isOverall": false, "label": "contact/imgs/iphone_6.jpg-588", "isController": false}, {"data": [[1.64999826E12, 260.15000000000003]], "isOverall": false, "label": "contact/css/latofonts.css-545", "isController": false}, {"data": [[1.64999826E12, 346.54999999999995]], "isOverall": false, "label": "contact/node_modules/video.js/dist/video.min.js-576", "isController": false}, {"data": [[1.64999826E12, 246.25000000000003]], "isOverall": false, "label": "contact/imgs/xperia_z5.jpg-591", "isController": false}, {"data": [[1.64999826E12, 354.71999999999997]], "isOverall": false, "label": "/view-202", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.64999832E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.64999826E12, "maxY": 1450.9000000000003, "series": [{"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "contact/about_demo_hls_600k00000.ts-562", "isController": false}, {"data": [[1.64999826E12, 0.0], [1.64999832E12, 0.0]], "isOverall": false, "label": "cart/view-343", "isController": false}, {"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "contact/index.html-570", "isController": false}, {"data": [[1.64999826E12, 0.0], [1.64999832E12, 0.0]], "isOverall": false, "label": "cart/view-342", "isController": false}, {"data": [[1.64999826E12, 0.0], [1.64999832E12, 0.0]], "isOverall": false, "label": "delete items/deleteitem-348", "isController": false}, {"data": [[1.64999826E12, 0.0], [1.64999832E12, 0.0]], "isOverall": false, "label": "cart/view-341", "isController": false}, {"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "cart/view-340", "isController": false}, {"data": [[1.64999826E12, 0.0], [1.64999832E12, 0.0]], "isOverall": false, "label": "delete items/deleteitem-381", "isController": false}, {"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "contact/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-577", "isController": false}, {"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "contact/imgs/sony_vaio_5.jpg-569", "isController": false}, {"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "contact/css/latostyle.css-546", "isController": false}, {"data": [[1.64999826E12, 308.24999999999994]], "isOverall": false, "label": "contact/entries-559", "isController": false}, {"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "/addtocart-260", "isController": false}, {"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "contact/css/latofonts.css-572", "isController": false}, {"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "/login-98", "isController": false}, {"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "contact/imgs/HTC_M9.jpg-568", "isController": false}, {"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "contact/config.json-558", "isController": false}, {"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "contact/js/index.js-580", "isController": false}, {"data": [[1.64999826E12, 349.5599999999999]], "isOverall": false, "label": "/index.html-208", "isController": false}, {"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "contact/imgs/galaxy_s6.jpg-587", "isController": false}, {"data": [[1.64999826E12, 0.0], [1.64999832E12, 0.0]], "isOverall": false, "label": "delete items/view-406", "isController": false}, {"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "contact/imgs/front.jpg-556", "isController": false}, {"data": [[1.64999826E12, 0.0], [1.64999832E12, 0.0]], "isOverall": false, "label": "delete items/view-405", "isController": false}, {"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "cart/view-339", "isController": false}, {"data": [[1.64999826E12, 0.0], [1.64999832E12, 0.0]], "isOverall": false, "label": "delete items/view-404", "isController": false}, {"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "contact/node_modules/bootstrap/dist/css/bootstrap.min.css-543", "isController": false}, {"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "contact/imgs/Lumia_1520.jpg-564", "isController": false}, {"data": [[1.64999826E12, 0.0], [1.64999832E12, 0.0]], "isOverall": false, "label": "delete items/view-373", "isController": false}, {"data": [[1.64999826E12, 0.0], [1.64999832E12, 0.0]], "isOverall": false, "label": "delete items/view-372", "isController": false}, {"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "contact/config.json-585", "isController": false}, {"data": [[1.64999826E12, 0.0], [1.64999832E12, 0.0]], "isOverall": false, "label": "delete items/view-370", "isController": false}, {"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "contact/about_demo_hls_600k.m3u8-561", "isController": false}, {"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "contact/node_modules/tether/dist/js/tether.min.js-578", "isController": false}, {"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "contact/entries-586", "isController": false}, {"data": [[1.64999826E12, 0.0], [1.64999832E12, 0.0]], "isOverall": false, "label": "delete items/view-374", "isController": false}, {"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "/addtocart-314", "isController": false}, {"data": [[1.64999826E12, 849.5]], "isOverall": false, "label": "contact/index.html-542", "isController": false}, {"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "contact/node_modules/video.js/dist/video-js.min.css-544", "isController": false}, {"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "contact/nexus1.jpg-553", "isController": false}, {"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "contact/imgs/iphone_6.jpg-566", "isController": false}, {"data": [[1.64999826E12, 375.24000000000007]], "isOverall": false, "label": "/login-151", "isController": false}, {"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "contact/bm.png-582", "isController": false}, {"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "contact/imgs/Nexus_6.jpg-565", "isController": false}, {"data": [[1.64999826E12, 1450.9000000000003]], "isOverall": false, "label": "Send Message Transaction Controller", "isController": true}, {"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "contact/node_modules/jquery/dist/jquery.min.js-547", "isController": false}, {"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "invalid login", "isController": false}, {"data": [[1.64999826E12, 0.0], [1.64999832E12, 0.0]], "isOverall": false, "label": "delete items/view-378", "isController": false}, {"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "contact/Samsung1.jpg-554", "isController": false}, {"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "contact/imgs/Lumia_1520.jpg-589", "isController": false}, {"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "contact/node_modules/video.js/dist/video.min.js-548", "isController": false}, {"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "contact/iphone1.jpg-555", "isController": false}, {"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "/addtocart-207", "isController": false}, {"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "contact/js/index.js-551", "isController": false}, {"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "contact/node_modules/jquery/dist/jquery.min.js-575", "isController": false}, {"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "contact/imgs/HTC_M9.jpg-592", "isController": false}, {"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "/addtocart-205", "isController": false}, {"data": [[1.64999826E12, 0.0], [1.64999832E12, 0.0]], "isOverall": false, "label": "delete items/viewcart-400", "isController": false}, {"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "contact/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-549", "isController": false}, {"data": [[1.64999826E12, 735.409090909091], [1.64999832E12, 647.0]], "isOverall": false, "label": "Login to purchase flow Transaction Controller", "isController": true}, {"data": [[1.64999826E12, 0.0], [1.64999832E12, 0.0]], "isOverall": false, "label": "place order/deletecart-411", "isController": false}, {"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "contact/imgs/xperia_z5.jpg-567", "isController": false}, {"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "contact/node_modules/bootstrap/dist/js/bootstrap.min.js-579", "isController": false}, {"data": [[1.64999826E12, 246.6]], "isOverall": false, "label": "/signup-148", "isController": false}, {"data": [[1.64999826E12, 293.15000000000003]], "isOverall": false, "label": "contact/index.m3u8-560", "isController": false}, {"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "cart/viewcart-332", "isController": false}, {"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "contact/imgs/galaxy_s6.jpg-563", "isController": false}, {"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "contact/node_modules/video.js/dist/video-js.min.css-573", "isController": false}, {"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "contact/nexus1.jpg-583", "isController": false}, {"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "contact/bm.png-557", "isController": false}, {"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "contact/node_modules/tether/dist/js/tether.min.js-550", "isController": false}, {"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "contact/node_modules/bootstrap/dist/css/bootstrap.min.css-571", "isController": false}, {"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "contact/Samsung1.jpg-581", "isController": false}, {"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "contact/iphone1.jpg-584", "isController": false}, {"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "/addtocart-258", "isController": false}, {"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "contact/node_modules/bootstrap/dist/js/bootstrap.min.js-552", "isController": false}, {"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "contact/css/latostyle.css-574", "isController": false}, {"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "contact/imgs/Nexus_6.jpg-590", "isController": false}, {"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "/index.html-261", "isController": false}, {"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "contact/imgs/iphone_6.jpg-588", "isController": false}, {"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "contact/css/latofonts.css-545", "isController": false}, {"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "contact/node_modules/video.js/dist/video.min.js-576", "isController": false}, {"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "contact/imgs/xperia_z5.jpg-591", "isController": false}, {"data": [[1.64999826E12, 0.0]], "isOverall": false, "label": "/view-202", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.64999832E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 56.0, "minX": 1.64999826E12, "maxY": 8545.0, "series": [{"data": [[1.64999826E12, 8545.0], [1.64999832E12, 1127.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.64999826E12, 816.8], [1.64999832E12, 733.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.64999826E12, 3026.199999999998], [1.64999832E12, 1127.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.64999826E12, 1376.7999999999997], [1.64999832E12, 1025.0]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.64999826E12, 56.0], [1.64999832E12, 325.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.64999826E12, 353.0], [1.64999832E12, 407.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.64999832E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 196.0, "minX": 1.0, "maxY": 1092.5, "series": [{"data": [[33.0, 382.0], [32.0, 396.5], [2.0, 385.5], [34.0, 363.0], [36.0, 384.0], [41.0, 621.0], [42.0, 420.5], [49.0, 354.0], [48.0, 364.5], [3.0, 410.0], [50.0, 351.5], [53.0, 355.5], [66.0, 337.0], [65.0, 328.0], [4.0, 1092.5], [71.0, 335.0], [72.0, 339.0], [73.0, 231.0], [76.0, 196.0], [87.0, 327.5], [88.0, 249.0], [6.0, 409.0], [8.0, 407.0], [10.0, 429.5], [11.0, 413.0], [12.0, 360.5], [13.0, 365.5], [14.0, 374.5], [15.0, 342.0], [16.0, 372.0], [1.0, 648.5], [17.0, 368.0], [18.0, 351.5], [23.0, 383.0], [26.0, 353.0], [28.0, 377.0], [29.0, 590.0], [30.0, 351.5], [31.0, 379.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[66.0, 373.0], [71.0, 895.0], [41.0, 378.0], [87.0, 345.0], [88.0, 358.0], [29.0, 384.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 88.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 145.0, "minX": 1.0, "maxY": 1089.0, "series": [{"data": [[33.0, 359.0], [32.0, 371.5], [2.0, 385.5], [34.0, 345.5], [36.0, 343.5], [41.0, 600.5], [42.0, 371.5], [49.0, 192.0], [48.0, 259.0], [3.0, 410.0], [50.0, 171.0], [53.0, 332.5], [66.0, 334.0], [65.0, 182.0], [4.0, 1089.0], [71.0, 333.0], [72.0, 333.0], [73.0, 159.0], [76.0, 145.0], [87.0, 326.0], [88.0, 242.0], [6.0, 408.0], [8.0, 407.0], [10.0, 429.0], [11.0, 412.0], [12.0, 360.5], [13.0, 364.0], [14.0, 370.5], [15.0, 342.0], [16.0, 371.5], [1.0, 648.0], [17.0, 367.0], [18.0, 348.0], [23.0, 362.5], [26.0, 346.5], [28.0, 347.0], [29.0, 396.0], [30.0, 343.5], [31.0, 337.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[66.0, 373.0], [71.0, 895.0], [41.0, 378.0], [87.0, 345.0], [88.0, 358.0], [29.0, 384.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 88.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 0.43333333333333335, "minX": 1.64999826E12, "maxY": 28.066666666666666, "series": [{"data": [[1.64999826E12, 28.066666666666666], [1.64999832E12, 0.43333333333333335]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.64999832E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.48333333333333334, "minX": 1.64999826E12, "maxY": 28.016666666666666, "series": [{"data": [[1.64999826E12, 28.016666666666666], [1.64999832E12, 0.48333333333333334]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.64999832E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.64999826E12, "maxY": 0.4166666666666667, "series": [{"data": [[1.64999826E12, 0.4], [1.64999832E12, 0.016666666666666666]], "isOverall": false, "label": "delete items/deleteitem-348-success", "isController": false}, {"data": [[1.64999826E12, 0.3333333333333333]], "isOverall": false, "label": "contact/imgs/iphone_6.jpg-566-success", "isController": false}, {"data": [[1.64999826E12, 0.3333333333333333]], "isOverall": false, "label": "contact/imgs/xperia_z5.jpg-591-success", "isController": false}, {"data": [[1.64999826E12, 0.3333333333333333]], "isOverall": false, "label": "contact/imgs/Lumia_1520.jpg-589-success", "isController": false}, {"data": [[1.64999826E12, 0.3333333333333333]], "isOverall": false, "label": "contact/index.m3u8-560-success", "isController": false}, {"data": [[1.64999826E12, 0.4166666666666667]], "isOverall": false, "label": "/index.html-208-success", "isController": false}, {"data": [[1.64999826E12, 0.08333333333333333]], "isOverall": false, "label": "invalid login-failure", "isController": false}, {"data": [[1.64999826E12, 0.3333333333333333]], "isOverall": false, "label": "contact/about_demo_hls_600k00000.ts-562-success", "isController": false}, {"data": [[1.64999826E12, 0.08333333333333333]], "isOverall": false, "label": "/login-98-success", "isController": false}, {"data": [[1.64999826E12, 0.38333333333333336], [1.64999832E12, 0.03333333333333333]], "isOverall": false, "label": "delete items/view-372-success", "isController": false}, {"data": [[1.64999826E12, 0.4166666666666667]], "isOverall": false, "label": "/addtocart-205-success", "isController": false}, {"data": [[1.64999826E12, 0.4166666666666667]], "isOverall": false, "label": "cart/view-340-success", "isController": false}, {"data": [[1.64999826E12, 0.36666666666666664], [1.64999832E12, 0.05]], "isOverall": false, "label": "delete items/view-404-success", "isController": false}, {"data": [[1.64999826E12, 0.3333333333333333]], "isOverall": false, "label": "contact/node_modules/tether/dist/js/tether.min.js-550-success", "isController": false}, {"data": [[1.64999826E12, 0.3333333333333333]], "isOverall": false, "label": "contact/node_modules/tether/dist/js/tether.min.js-578-success", "isController": false}, {"data": [[1.64999826E12, 0.4], [1.64999832E12, 0.016666666666666666]], "isOverall": false, "label": "delete items/view-374-success", "isController": false}, {"data": [[1.64999826E12, 0.3333333333333333]], "isOverall": false, "label": "contact/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-549-success", "isController": false}, {"data": [[1.64999826E12, 0.36666666666666664], [1.64999832E12, 0.05]], "isOverall": false, "label": "delete items/view-406-success", "isController": false}, {"data": [[1.64999826E12, 0.3333333333333333]], "isOverall": false, "label": "contact/node_modules/video.js/dist/video-js.min.css-544-success", "isController": false}, {"data": [[1.64999826E12, 0.3333333333333333]], "isOverall": false, "label": "contact/css/latostyle.css-574-success", "isController": false}, {"data": [[1.64999826E12, 0.3333333333333333]], "isOverall": false, "label": "contact/css/latofonts.css-572-success", "isController": false}, {"data": [[1.64999826E12, 0.3333333333333333]], "isOverall": false, "label": "contact/js/index.js-551-success", "isController": false}, {"data": [[1.64999826E12, 0.3333333333333333]], "isOverall": false, "label": "contact/node_modules/video.js/dist/video-js.min.css-573-success", "isController": false}, {"data": [[1.64999826E12, 0.3333333333333333]], "isOverall": false, "label": "contact/imgs/xperia_z5.jpg-567-success", "isController": false}, {"data": [[1.64999826E12, 0.4], [1.64999832E12, 0.016666666666666666]], "isOverall": false, "label": "cart/view-342-success", "isController": false}, {"data": [[1.64999826E12, 0.4166666666666667]], "isOverall": false, "label": "/addtocart-207-success", "isController": false}, {"data": [[1.64999826E12, 0.3333333333333333]], "isOverall": false, "label": "contact/node_modules/bootstrap/dist/js/bootstrap.min.js-579-success", "isController": false}, {"data": [[1.64999826E12, 0.3333333333333333]], "isOverall": false, "label": "contact/index.html-542-success", "isController": false}, {"data": [[1.64999826E12, 0.36666666666666664], [1.64999832E12, 0.05]], "isOverall": false, "label": "place order/deletecart-411-success", "isController": false}, {"data": [[1.64999826E12, 0.3333333333333333]], "isOverall": false, "label": "contact/entries-559-success", "isController": false}, {"data": [[1.64999826E12, 0.08333333333333333]], "isOverall": false, "label": "/signup-148-failure", "isController": false}, {"data": [[1.64999826E12, 0.38333333333333336], [1.64999832E12, 0.03333333333333333]], "isOverall": false, "label": "delete items/view-370-success", "isController": false}, {"data": [[1.64999826E12, 0.3333333333333333]], "isOverall": false, "label": "contact/nexus1.jpg-553-success", "isController": false}, {"data": [[1.64999826E12, 0.4166666666666667]], "isOverall": false, "label": "/addtocart-260-success", "isController": false}, {"data": [[1.64999826E12, 0.3333333333333333]], "isOverall": false, "label": "contact/node_modules/video.js/dist/video.min.js-576-success", "isController": false}, {"data": [[1.64999826E12, 0.3333333333333333]], "isOverall": false, "label": "contact/js/index.js-580-success", "isController": false}, {"data": [[1.64999826E12, 0.4166666666666667]], "isOverall": false, "label": "/index.html-261-success", "isController": false}, {"data": [[1.64999826E12, 0.3333333333333333]], "isOverall": false, "label": "contact/about_demo_hls_600k.m3u8-561-success", "isController": false}, {"data": [[1.64999826E12, 0.3333333333333333]], "isOverall": false, "label": "contact/css/latofonts.css-545-success", "isController": false}, {"data": [[1.64999826E12, 0.3333333333333333]], "isOverall": false, "label": "contact/node_modules/video.js/dist/video.min.js-548-success", "isController": false}, {"data": [[1.64999826E12, 0.3333333333333333]], "isOverall": false, "label": "contact/node_modules/bootstrap/dist/css/bootstrap.min.css-543-success", "isController": false}, {"data": [[1.64999826E12, 0.4166666666666667]], "isOverall": false, "label": "/login-151-success", "isController": false}, {"data": [[1.64999826E12, 0.4166666666666667]], "isOverall": false, "label": "cart/viewcart-332-success", "isController": false}, {"data": [[1.64999826E12, 0.3333333333333333]], "isOverall": false, "label": "contact/node_modules/jquery/dist/jquery.min.js-547-success", "isController": false}, {"data": [[1.64999826E12, 0.4166666666666667]], "isOverall": false, "label": "cart/view-339-success", "isController": false}, {"data": [[1.64999826E12, 0.3333333333333333]], "isOverall": false, "label": "contact/imgs/galaxy_s6.jpg-563-success", "isController": false}, {"data": [[1.64999826E12, 0.36666666666666664], [1.64999832E12, 0.05]], "isOverall": false, "label": "Login to purchase flow Transaction Controller-success", "isController": true}, {"data": [[1.64999826E12, 0.3333333333333333]], "isOverall": false, "label": "contact/node_modules/bootstrap/dist/js/bootstrap.min.js-552-success", "isController": false}, {"data": [[1.64999826E12, 0.3333333333333333]], "isOverall": false, "label": "contact/imgs/front.jpg-556-success", "isController": false}, {"data": [[1.64999826E12, 0.3333333333333333]], "isOverall": false, "label": "contact/imgs/galaxy_s6.jpg-587-success", "isController": false}, {"data": [[1.64999826E12, 0.3333333333333333]], "isOverall": false, "label": "contact/imgs/Nexus_6.jpg-590-success", "isController": false}, {"data": [[1.64999826E12, 0.4], [1.64999832E12, 0.016666666666666666]], "isOverall": false, "label": "cart/view-341-success", "isController": false}, {"data": [[1.64999826E12, 0.3333333333333333]], "isOverall": false, "label": "contact/imgs/sony_vaio_5.jpg-569-success", "isController": false}, {"data": [[1.64999826E12, 0.4166666666666667]], "isOverall": false, "label": "/view-202-success", "isController": false}, {"data": [[1.64999826E12, 0.3333333333333333]], "isOverall": false, "label": "contact/index.html-570-success", "isController": false}, {"data": [[1.64999826E12, 0.3333333333333333]], "isOverall": false, "label": "contact/imgs/HTC_M9.jpg-592-success", "isController": false}, {"data": [[1.64999826E12, 0.4], [1.64999832E12, 0.016666666666666666]], "isOverall": false, "label": "delete items/view-373-success", "isController": false}, {"data": [[1.64999826E12, 0.3333333333333333]], "isOverall": false, "label": "contact/imgs/Lumia_1520.jpg-564-success", "isController": false}, {"data": [[1.64999826E12, 0.3333333333333333]], "isOverall": false, "label": "contact/config.json-585-success", "isController": false}, {"data": [[1.64999826E12, 0.3333333333333333]], "isOverall": false, "label": "contact/entries-586-success", "isController": false}, {"data": [[1.64999826E12, 0.3333333333333333]], "isOverall": false, "label": "contact/imgs/HTC_M9.jpg-568-success", "isController": false}, {"data": [[1.64999826E12, 0.3333333333333333]], "isOverall": false, "label": "contact/css/latostyle.css-546-success", "isController": false}, {"data": [[1.64999826E12, 0.3333333333333333]], "isOverall": false, "label": "contact/imgs/iphone_6.jpg-588-success", "isController": false}, {"data": [[1.64999826E12, 0.4], [1.64999832E12, 0.016666666666666666]], "isOverall": false, "label": "cart/view-343-success", "isController": false}, {"data": [[1.64999826E12, 0.38333333333333336], [1.64999832E12, 0.03333333333333333]], "isOverall": false, "label": "delete items/view-378-success", "isController": false}, {"data": [[1.64999826E12, 0.36666666666666664], [1.64999832E12, 0.05]], "isOverall": false, "label": "delete items/view-405-success", "isController": false}, {"data": [[1.64999826E12, 0.3333333333333333]], "isOverall": false, "label": "contact/config.json-558-success", "isController": false}, {"data": [[1.64999826E12, 0.3333333333333333]], "isOverall": false, "label": "contact/Samsung1.jpg-554-success", "isController": false}, {"data": [[1.64999826E12, 0.3333333333333333]], "isOverall": false, "label": "contact/bm.png-582-success", "isController": false}, {"data": [[1.64999826E12, 0.4166666666666667]], "isOverall": false, "label": "/addtocart-314-success", "isController": false}, {"data": [[1.64999826E12, 0.3333333333333333]], "isOverall": false, "label": "contact/bm.png-557-success", "isController": false}, {"data": [[1.64999826E12, 0.3333333333333333]], "isOverall": false, "label": "contact/imgs/Nexus_6.jpg-565-success", "isController": false}, {"data": [[1.64999826E12, 0.3333333333333333]], "isOverall": false, "label": "contact/nexus1.jpg-583-success", "isController": false}, {"data": [[1.64999826E12, 0.3333333333333333]], "isOverall": false, "label": "Send Message Transaction Controller-success", "isController": true}, {"data": [[1.64999826E12, 0.38333333333333336], [1.64999832E12, 0.03333333333333333]], "isOverall": false, "label": "delete items/deleteitem-381-success", "isController": false}, {"data": [[1.64999826E12, 0.3333333333333333]], "isOverall": false, "label": "contact/node_modules/jquery/dist/jquery.min.js-575-success", "isController": false}, {"data": [[1.64999826E12, 0.3333333333333333]], "isOverall": false, "label": "contact/node_modules/bootstrap/dist/css/bootstrap.min.css-571-success", "isController": false}, {"data": [[1.64999826E12, 0.3333333333333333]], "isOverall": false, "label": "contact/iphone1.jpg-555-success", "isController": false}, {"data": [[1.64999826E12, 0.3333333333333333]], "isOverall": false, "label": "contact/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-577-success", "isController": false}, {"data": [[1.64999826E12, 0.3333333333333333]], "isOverall": false, "label": "contact/iphone1.jpg-584-success", "isController": false}, {"data": [[1.64999826E12, 0.36666666666666664], [1.64999832E12, 0.05]], "isOverall": false, "label": "delete items/viewcart-400-success", "isController": false}, {"data": [[1.64999826E12, 0.3333333333333333]], "isOverall": false, "label": "contact/Samsung1.jpg-581-success", "isController": false}, {"data": [[1.64999826E12, 0.4166666666666667]], "isOverall": false, "label": "/addtocart-258-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.64999832E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 0.16666666666666666, "minX": 1.64999826E12, "maxY": 28.55, "series": [{"data": [[1.64999826E12, 28.55], [1.64999832E12, 0.5333333333333333]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.64999826E12, 0.16666666666666666]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.64999832E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}
