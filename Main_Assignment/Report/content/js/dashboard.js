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
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 99.41520467836257, "KoPercent": 0.5847953216374269};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.8575498575498576, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.225, 500, 1500, "contact/about_demo_hls_600k00000.ts-562"], "isController": false}, {"data": [0.98, 500, 1500, "cart/view-343"], "isController": false}, {"data": [0.925, 500, 1500, "contact/index.html-570"], "isController": false}, {"data": [0.94, 500, 1500, "cart/view-342"], "isController": false}, {"data": [0.92, 500, 1500, "delete items/deleteitem-348"], "isController": false}, {"data": [0.98, 500, 1500, "cart/view-341"], "isController": false}, {"data": [0.94, 500, 1500, "cart/view-340"], "isController": false}, {"data": [0.96, 500, 1500, "delete items/deleteitem-381"], "isController": false}, {"data": [0.85, 500, 1500, "contact/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-577"], "isController": false}, {"data": [0.875, 500, 1500, "contact/imgs/sony_vaio_5.jpg-569"], "isController": false}, {"data": [1.0, 500, 1500, "contact/css/latostyle.css-546"], "isController": false}, {"data": [0.5, 500, 1500, "contact/entries-559"], "isController": false}, {"data": [0.98, 500, 1500, "/addtocart-260"], "isController": false}, {"data": [0.975, 500, 1500, "contact/css/latofonts.css-572"], "isController": false}, {"data": [1.0, 500, 1500, "/login-98"], "isController": false}, {"data": [0.75, 500, 1500, "contact/imgs/HTC_M9.jpg-568"], "isController": false}, {"data": [1.0, 500, 1500, "contact/config.json-558"], "isController": false}, {"data": [0.975, 500, 1500, "contact/js/index.js-580"], "isController": false}, {"data": [0.66, 500, 1500, "/index.html-208"], "isController": false}, {"data": [0.825, 500, 1500, "contact/imgs/galaxy_s6.jpg-587"], "isController": false}, {"data": [0.96, 500, 1500, "delete items/view-406"], "isController": false}, {"data": [1.0, 500, 1500, "contact/imgs/front.jpg-556"], "isController": false}, {"data": [0.96, 500, 1500, "delete items/view-405"], "isController": false}, {"data": [1.0, 500, 1500, "cart/view-339"], "isController": false}, {"data": [0.98, 500, 1500, "delete items/view-404"], "isController": false}, {"data": [0.975, 500, 1500, "contact/node_modules/bootstrap/dist/css/bootstrap.min.css-543"], "isController": false}, {"data": [0.675, 500, 1500, "contact/imgs/Lumia_1520.jpg-564"], "isController": false}, {"data": [0.94, 500, 1500, "delete items/view-373"], "isController": false}, {"data": [0.98, 500, 1500, "delete items/view-372"], "isController": false}, {"data": [0.975, 500, 1500, "contact/config.json-585"], "isController": false}, {"data": [0.98, 500, 1500, "delete items/view-370"], "isController": false}, {"data": [1.0, 500, 1500, "contact/about_demo_hls_600k.m3u8-561"], "isController": false}, {"data": [1.0, 500, 1500, "contact/node_modules/tether/dist/js/tether.min.js-578"], "isController": false}, {"data": [0.95, 500, 1500, "contact/entries-586"], "isController": false}, {"data": [1.0, 500, 1500, "delete items/view-374"], "isController": false}, {"data": [0.96, 500, 1500, "/addtocart-314"], "isController": false}, {"data": [0.4, 500, 1500, "contact/index.html-542"], "isController": false}, {"data": [1.0, 500, 1500, "contact/node_modules/video.js/dist/video-js.min.css-544"], "isController": false}, {"data": [0.975, 500, 1500, "contact/nexus1.jpg-553"], "isController": false}, {"data": [0.625, 500, 1500, "contact/imgs/iphone_6.jpg-566"], "isController": false}, {"data": [0.48, 500, 1500, "/login-151"], "isController": false}, {"data": [1.0, 500, 1500, "contact/bm.png-582"], "isController": false}, {"data": [0.35, 500, 1500, "contact/imgs/Nexus_6.jpg-565"], "isController": false}, {"data": [0.0, 500, 1500, "Send Message Transaction Controller"], "isController": true}, {"data": [0.975, 500, 1500, "contact/node_modules/jquery/dist/jquery.min.js-547"], "isController": false}, {"data": [0.0, 500, 1500, "invalid login"], "isController": false}, {"data": [0.94, 500, 1500, "delete items/view-378"], "isController": false}, {"data": [0.975, 500, 1500, "contact/Samsung1.jpg-554"], "isController": false}, {"data": [0.925, 500, 1500, "contact/imgs/Lumia_1520.jpg-589"], "isController": false}, {"data": [0.375, 500, 1500, "contact/node_modules/video.js/dist/video.min.js-548"], "isController": false}, {"data": [0.975, 500, 1500, "contact/iphone1.jpg-555"], "isController": false}, {"data": [0.9, 500, 1500, "/addtocart-207"], "isController": false}, {"data": [1.0, 500, 1500, "contact/js/index.js-551"], "isController": false}, {"data": [0.95, 500, 1500, "contact/node_modules/jquery/dist/jquery.min.js-575"], "isController": false}, {"data": [0.925, 500, 1500, "contact/imgs/HTC_M9.jpg-592"], "isController": false}, {"data": [0.98, 500, 1500, "/addtocart-205"], "isController": false}, {"data": [0.94, 500, 1500, "delete items/viewcart-400"], "isController": false}, {"data": [0.9, 500, 1500, "contact/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-549"], "isController": false}, {"data": [0.0, 500, 1500, "Login to purchase flow Transaction Controller"], "isController": true}, {"data": [0.72, 500, 1500, "place order/deletecart-411"], "isController": false}, {"data": [0.575, 500, 1500, "contact/imgs/xperia_z5.jpg-567"], "isController": false}, {"data": [1.0, 500, 1500, "contact/node_modules/bootstrap/dist/js/bootstrap.min.js-579"], "isController": false}, {"data": [0.0, 500, 1500, "/signup-148"], "isController": false}, {"data": [0.925, 500, 1500, "contact/index.m3u8-560"], "isController": false}, {"data": [1.0, 500, 1500, "cart/viewcart-332"], "isController": false}, {"data": [0.85, 500, 1500, "contact/imgs/galaxy_s6.jpg-563"], "isController": false}, {"data": [0.9, 500, 1500, "contact/node_modules/video.js/dist/video-js.min.css-573"], "isController": false}, {"data": [0.95, 500, 1500, "contact/nexus1.jpg-583"], "isController": false}, {"data": [1.0, 500, 1500, "contact/bm.png-557"], "isController": false}, {"data": [0.925, 500, 1500, "contact/node_modules/tether/dist/js/tether.min.js-550"], "isController": false}, {"data": [1.0, 500, 1500, "contact/node_modules/bootstrap/dist/css/bootstrap.min.css-571"], "isController": false}, {"data": [0.975, 500, 1500, "contact/Samsung1.jpg-581"], "isController": false}, {"data": [1.0, 500, 1500, "contact/iphone1.jpg-584"], "isController": false}, {"data": [0.94, 500, 1500, "/addtocart-258"], "isController": false}, {"data": [1.0, 500, 1500, "contact/node_modules/bootstrap/dist/js/bootstrap.min.js-552"], "isController": false}, {"data": [0.975, 500, 1500, "contact/css/latostyle.css-574"], "isController": false}, {"data": [0.775, 500, 1500, "contact/imgs/Nexus_6.jpg-590"], "isController": false}, {"data": [0.96, 500, 1500, "/index.html-261"], "isController": false}, {"data": [0.775, 500, 1500, "contact/imgs/iphone_6.jpg-588"], "isController": false}, {"data": [1.0, 500, 1500, "contact/css/latofonts.css-545"], "isController": false}, {"data": [0.525, 500, 1500, "contact/node_modules/video.js/dist/video.min.js-576"], "isController": false}, {"data": [0.8, 500, 1500, "contact/imgs/xperia_z5.jpg-591"], "isController": false}, {"data": [1.0, 500, 1500, "/view-202"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 1710, 10, 0.5847953216374269, 474.904678362573, 56, 8545, 353.0, 816.9000000000001, 1370.4999999999982, 2989.079999999978, 28.188052222075697, 1146.222478400493, 12.455486109966373], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["contact/about_demo_hls_600k00000.ts-562", 20, 0, 0.0, 2791.8, 492, 8545, 2196.0, 6052.000000000002, 8425.349999999999, 8545.0, 2.18435998252512, 1158.6692213439273, 0.8788635867190913], "isController": false}, {"data": ["cart/view-343", 25, 0, 0.0, 371.16, 339, 655, 351.0, 396.6, 579.9999999999998, 655.0, 0.5195560912756141, 0.3762113774990648, 0.22832054792385384], "isController": false}, {"data": ["contact/index.html-570", 20, 0, 0.0, 274.95000000000005, 129, 1603, 162.0, 620.2000000000005, 1555.0999999999995, 1603.0, 1.470047776552738, 15.909032180264608, 0.6933916758544653], "isController": false}, {"data": ["cart/view-342", 25, 0, 0.0, 408.56, 339, 812, 353.0, 757.8000000000002, 806.9, 812.0, 0.5193833880417169, 0.40534221522208835, 0.2277374426081356], "isController": false}, {"data": ["delete items/deleteitem-348", 25, 0, 0.0, 437.96000000000004, 341, 906, 393.0, 652.2000000000005, 870.8999999999999, 906.0, 0.5184033177812338, 0.20930533955417313, 0.2495828473302229], "isController": false}, {"data": ["cart/view-341", 25, 0, 0.0, 374.1199999999999, 335, 511, 356.0, 471.40000000000003, 503.79999999999995, 511.0, 0.5235492450419886, 0.3882649381688342, 0.23007535182509267], "isController": false}, {"data": ["cart/view-340", 25, 0, 0.0, 422.67999999999995, 337, 895, 366.0, 729.8000000000002, 863.8, 895.0, 0.5240321126878655, 0.45144547707883537, 0.23028754952103464], "isController": false}, {"data": ["delete items/deleteitem-381", 25, 0, 0.0, 422.7599999999999, 340, 1020, 386.0, 550.2000000000004, 908.3999999999997, 1020.0, 0.5127574042169168, 0.2387326367523997, 0.24686464870990238], "isController": false}, {"data": ["contact/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-577", 20, 0, 0.0, 437.00000000000006, 164, 1549, 342.5, 952.200000000001, 1521.3499999999995, 1549.0, 1.4959982048021543, 141.42741895897225, 0.6661867005759593], "isController": false}, {"data": ["contact/imgs/sony_vaio_5.jpg-569", 20, 0, 0.0, 556.15, 171, 3219, 342.5, 1935.4000000000028, 3161.699999999999, 3219.0, 2.375579047392802, 210.63544883596626, 1.0045173120323079], "isController": false}, {"data": ["contact/css/latostyle.css-546", 20, 0, 0.0, 237.2, 121, 360, 240.0, 345.8, 359.3, 360.0, 10.121457489878543, 9.717686456224696, 4.1810317560728745], "isController": false}, {"data": ["contact/entries-559", 20, 0, 0.0, 876.3999999999999, 731, 1129, 864.0, 1012.5, 1123.25, 1129.0, 6.335128286347799, 9.782947616407982, 2.586019163763066], "isController": false}, {"data": ["/addtocart-260", 25, 0, 0.0, 404.71999999999997, 360, 705, 390.0, 424.6, 621.5999999999998, 705.0, 0.5245488879563576, 0.16955632999370543, 0.2791788515002098], "isController": false}, {"data": ["contact/css/latofonts.css-572", 20, 0, 0.0, 245.15, 121, 1357, 151.5, 344.3, 1306.3999999999992, 1357.0, 1.4719952896150732, 1.907125147199529, 0.6080605542062265], "isController": false}, {"data": ["/login-98", 5, 0, 0.0, 401.6, 373, 427, 397.0, 427.0, 427.0, 427.0, 2.486325211337643, 1.3499968920934857, 1.171777877921432], "isController": false}, {"data": ["contact/imgs/HTC_M9.jpg-568", 20, 0, 0.0, 777.2, 175, 5287, 355.0, 1916.1000000000004, 5119.199999999997, 5287.0, 2.2313957380341405, 211.93726988731453, 0.9326536873814572], "isController": false}, {"data": ["contact/config.json-558", 20, 0, 0.0, 227.9, 122, 482, 140.5, 343.5, 475.0999999999999, 482.0, 10.2880658436214, 5.470558449074074, 4.782343106995885], "isController": false}, {"data": ["contact/js/index.js-580", 20, 0, 0.0, 267.5, 122, 1425, 149.5, 469.8000000000003, 1377.9499999999994, 1425.0, 1.5109163707788773, 4.274314539737101, 0.5946282201405152], "isController": false}, {"data": ["/index.html-208", 25, 0, 0.0, 629.3599999999999, 459, 1494, 545.0, 1112.600000000001, 1465.8, 1494.0, 0.5271147845154761, 5.704246766150797, 0.26613119491650505], "isController": false}, {"data": ["contact/imgs/galaxy_s6.jpg-587", 20, 0, 0.0, 517.4, 207, 2128, 357.0, 1744.5000000000027, 2115.0499999999997, 2128.0, 1.522301720200944, 160.1940102184503, 0.6407344154361394], "isController": false}, {"data": ["delete items/view-406", 25, 0, 0.0, 391.32, 341, 758, 360.0, 520.8000000000005, 728.5999999999999, 758.0, 0.5130204592559151, 0.3770099179680286, 0.22544844400894706], "isController": false}, {"data": ["contact/imgs/front.jpg-556", 20, 0, 0.0, 267.04999999999995, 140, 451, 332.5, 351.20000000000005, 446.04999999999995, 451.0, 10.498687664041995, 256.0387959317585, 4.377870734908137], "isController": false}, {"data": ["delete items/view-405", 25, 0, 0.0, 423.7599999999999, 339, 1929, 350.0, 426.6000000000001, 1486.199999999999, 1929.0, 0.512578680827507, 0.3958068501014905, 0.22475373798002993], "isController": false}, {"data": ["cart/view-339", 25, 0, 0.0, 353.5199999999999, 334, 409, 347.0, 383.8, 404.5, 409.0, 0.5245929158972636, 0.4036496584900118, 0.2300216984744838], "isController": false}, {"data": ["delete items/view-404", 25, 0, 0.0, 381.55999999999995, 340, 923, 351.0, 424.60000000000014, 783.1999999999996, 923.0, 0.5072331446426035, 0.43124724191977604, 0.22290519051676913], "isController": false}, {"data": ["contact/node_modules/bootstrap/dist/css/bootstrap.min.css-543", 20, 0, 0.0, 315.04999999999995, 140, 545, 340.0, 451.2000000000001, 540.55, 545.0, 10.454783063251437, 290.8828982618923, 4.645435833768949], "isController": false}, {"data": ["contact/imgs/Lumia_1520.jpg-564", 20, 0, 0.0, 845.0999999999999, 199, 2567, 385.0, 2407.2000000000003, 2560.1, 2567.0, 1.585917056537943, 225.4015591547062, 0.6690587582269447], "isController": false}, {"data": ["delete items/view-373", 25, 0, 0.0, 387.08, 337, 658, 352.0, 599.8000000000002, 652.6, 658.0, 0.5186399186772608, 0.37872869686534033, 0.2279179330124681], "isController": false}, {"data": ["delete items/view-372", 25, 0, 0.0, 374.68000000000006, 340, 650, 353.0, 419.00000000000006, 586.0999999999999, 650.0, 0.5210830189465786, 0.4425338248014674, 0.22899156106050816], "isController": false}, {"data": ["contact/config.json-585", 20, 0, 0.0, 196.04999999999998, 121, 501, 130.5, 437.60000000000025, 498.34999999999997, 501.0, 1.5754233950374164, 0.8700214159117763, 0.732325718786924], "isController": false}, {"data": ["delete items/view-370", 25, 0, 0.0, 362.03999999999996, 322, 632, 339.0, 456.20000000000016, 592.3999999999999, 632.0, 0.5218661935079846, 0.24105733352468425, 0.24258623838847718], "isController": false}, {"data": ["contact/about_demo_hls_600k.m3u8-561", 20, 0, 0.0, 80.45, 56, 370, 64.0, 106.20000000000007, 356.99999999999983, 370.0, 8.120178643930167, 49.837199934023545, 3.449489951278928], "isController": false}, {"data": ["contact/node_modules/tether/dist/js/tether.min.js-578", 20, 0, 0.0, 208.45000000000002, 123, 441, 145.0, 391.5000000000001, 438.75, 441.0, 1.485773716662952, 15.840176017754995, 0.6282617376123616], "isController": false}, {"data": ["contact/entries-586", 20, 0, 0.0, 425.84999999999997, 355, 672, 413.5, 570.3000000000002, 667.4, 672.0, 1.5520720161415489, 2.4166246313828963, 0.5941525686791868], "isController": false}, {"data": ["delete items/view-374", 25, 0, 0.0, 360.24, 340, 409, 351.0, 401.20000000000005, 409.0, 409.0, 0.5181884133070785, 0.3961712353611773, 0.22721347419421703], "isController": false}, {"data": ["/addtocart-314", 25, 0, 0.0, 412.44, 368, 637, 397.0, 480.4000000000001, 596.4999999999999, 637.0, 0.5256186531547632, 0.1699021232365494, 0.27974820895443936], "isController": false}, {"data": ["contact/index.html-542", 20, 0, 0.0, 1232.9, 669, 1788, 1248.5, 1679.9000000000003, 1783.35, 1788.0, 11.185682326621924, 112.52698108920582, 5.276059144295302], "isController": false}, {"data": ["contact/node_modules/video.js/dist/video-js.min.css-544", 20, 0, 0.0, 266.5, 127, 461, 332.0, 358.40000000000003, 455.8999999999999, 461.0, 10.27221366204417, 125.34307588597842, 4.504124935798664], "isController": false}, {"data": ["contact/nexus1.jpg-553", 20, 0, 0.0, 260.59999999999997, 141, 863, 195.0, 353.7, 837.5499999999996, 863.0, 9.671179883945841, 322.6887391199226, 3.995028409090909], "isController": false}, {"data": ["contact/imgs/iphone_6.jpg-566", 20, 0, 0.0, 939.7500000000001, 242, 3604, 536.0, 2226.1000000000004, 3535.999999999999, 3604.0, 1.5186028853454823, 298.4811005125285, 0.6376945709946849], "isController": false}, {"data": ["/login-151", 25, 0, 0.0, 862.9600000000002, 685, 1684, 760.0, 1244.2000000000003, 1584.9999999999998, 1684.0, 0.514011966198573, 0.3139488712297222, 0.2434529332092851], "isController": false}, {"data": ["contact/bm.png-582", 20, 0, 0.0, 194.15, 123, 386, 139.0, 335.3, 383.49999999999994, 386.0, 1.4896469536719799, 6.23644188514822, 0.6095332749888276], "isController": false}, {"data": ["contact/imgs/Nexus_6.jpg-565", 20, 0, 0.0, 1538.1499999999999, 252, 4990, 1383.0, 3358.9000000000015, 4911.3499999999985, 4990.0, 1.7242865764290025, 390.89130461138893, 0.7223817786016036], "isController": false}, {"data": ["Send Message Transaction Controller", 20, 0, 0.0, 25849.250000000004, 19581, 34608, 24744.5, 31542.9, 34455.45, 34608.0, 0.5764020981036372, 1978.3661769950718, 12.430921811055391], "isController": true}, {"data": ["contact/node_modules/jquery/dist/jquery.min.js-547", 20, 0, 0.0, 287.0, 144, 504, 345.5, 376.3, 497.6499999999999, 504.0, 10.92896174863388, 383.53771772540983, 4.589310109289618], "isController": false}, {"data": ["invalid login", 5, 5, 100.0, 416.8, 345, 658, 358.0, 658.0, 658.0, 658.0, 2.3969319271332696, 1.4348821009108341, 1.12356184084372], "isController": false}, {"data": ["delete items/view-378", 25, 0, 0.0, 423.72, 335, 1127, 359.0, 719.4000000000003, 1029.1999999999998, 1127.0, 0.5133364817970884, 0.3853833532679, 0.2255873211022361], "isController": false}, {"data": ["contact/Samsung1.jpg-554", 20, 0, 0.0, 276.19999999999993, 135, 714, 181.5, 472.6, 701.9499999999998, 714.0, 9.657170449058425, 261.2849317962337, 4.008102969579912], "isController": false}, {"data": ["contact/imgs/Lumia_1520.jpg-589", 20, 0, 0.0, 458.1000000000001, 186, 2525, 329.0, 698.5000000000005, 2434.8499999999985, 2525.0, 1.4203536680633477, 201.87053920176123, 0.5992117037142248], "isController": false}, {"data": ["contact/node_modules/video.js/dist/video.min.js-548", 20, 0, 0.0, 1163.4, 673, 2336, 992.5, 2195.9, 2329.2, 2336.0, 7.933359777865926, 1364.3565921261404, 3.3391387346291155], "isController": false}, {"data": ["contact/iphone1.jpg-555", 20, 0, 0.0, 240.95000000000002, 138, 614, 159.5, 397.50000000000006, 603.3499999999999, 614.0, 9.178522257916477, 313.0539381597063, 3.800481872418541], "isController": false}, {"data": ["/addtocart-207", 25, 0, 0.0, 466.99999999999994, 364, 798, 394.0, 741.2, 783.3, 798.0, 0.5275040617812756, 0.1705115668453147, 0.28023653282130273], "isController": false}, {"data": ["contact/js/index.js-551", 20, 0, 0.0, 305.69999999999993, 126, 478, 334.5, 360.9, 472.1499999999999, 478.0, 10.660980810234541, 30.450946994936036, 4.195678971215352], "isController": false}, {"data": ["contact/node_modules/jquery/dist/jquery.min.js-575", 20, 0, 0.0, 274.95000000000005, 143, 666, 222.5, 518.6, 658.7499999999999, 666.0, 1.4443561782335523, 50.78809094478949, 0.6065167545316675], "isController": false}, {"data": ["contact/imgs/HTC_M9.jpg-592", 20, 0, 0.0, 356.2, 164, 730, 325.0, 669.2000000000002, 727.4, 730.0, 1.363605372605168, 129.5132141883139, 0.5699444330810663], "isController": false}, {"data": ["/addtocart-205", 25, 0, 0.0, 401.4, 374, 618, 387.0, 429.20000000000005, 562.7999999999998, 618.0, 0.5283848332417467, 0.1707962693388849, 0.2807044426596779], "isController": false}, {"data": ["delete items/viewcart-400", 25, 0, 0.0, 447.63999999999993, 372, 757, 410.0, 699.2, 746.5, 757.0, 0.5128836369604464, 0.3319719478294765, 0.24392024531224357], "isController": false}, {"data": ["contact/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-549", 20, 0, 0.0, 402.59999999999997, 157, 1517, 307.0, 823.1000000000005, 1483.4499999999994, 1517.0, 8.557980316645272, 675.4523862056054, 3.810975609756097], "isController": false}, {"data": ["Login to purchase flow Transaction Controller", 25, 0, 0.0, 11493.12, 10300, 13276, 11350.0, 12760.8, 13132.6, 13276.0, 0.41171239418991473, 14.500140625514641, 5.2240030641694934], "isController": true}, {"data": ["place order/deletecart-411", 25, 0, 0.0, 505.04, 348, 880, 522.0, 622.0000000000002, 816.9999999999999, 880.0, 0.5072434362699346, 0.16842067219900175, 0.23083539189627886], "isController": false}, {"data": ["contact/imgs/xperia_z5.jpg-567", 20, 0, 0.0, 1277.1, 191, 6036, 676.0, 3259.3000000000006, 5898.199999999998, 6036.0, 1.4692918013517484, 206.60768072289156, 0.6184226234205114], "isController": false}, {"data": ["contact/node_modules/bootstrap/dist/js/bootstrap.min.js-579", 20, 0, 0.0, 201.1, 129, 399, 155.0, 345.7, 396.34999999999997, 399.0, 1.5088645794039985, 22.89112599019238, 0.6468667483968313], "isController": false}, {"data": ["/signup-148", 5, 5, 100.0, 736.4, 355, 1675, 384.0, 1675.0, 1675.0, 1675.0, 1.3561160835367507, 0.7879776071331707, 0.6399172769189043], "isController": false}, {"data": ["contact/index.m3u8-560", 20, 0, 0.0, 389.70000000000005, 247, 1298, 306.0, 661.3000000000003, 1266.7499999999995, 1298.0, 6.995452955578874, 10.122570719657222, 2.8760602483385798], "isController": false}, {"data": ["cart/viewcart-332", 25, 0, 0.0, 403.8, 365, 468, 392.0, 457.40000000000003, 467.7, 468.0, 0.5246479612180227, 0.3749388457220205, 0.24951519249333695], "isController": false}, {"data": ["contact/imgs/galaxy_s6.jpg-563", 20, 0, 0.0, 433.3, 180, 1631, 266.5, 1398.300000000002, 1624.1499999999999, 1631.0, 2.2484541877459248, 236.6102796514896, 0.9463708544125914], "isController": false}, {"data": ["contact/node_modules/video.js/dist/video-js.min.css-573", 20, 0, 0.0, 447.1000000000001, 129, 1484, 259.5, 1457.0000000000005, 1483.6, 1484.0, 1.5276504735716467, 18.58638923101894, 0.6698389283531928], "isController": false}, {"data": ["contact/nexus1.jpg-583", 20, 0, 0.0, 328.45, 145, 1614, 242.0, 452.60000000000014, 1556.2999999999993, 1614.0, 1.522533495736906, 50.79671323081608, 0.6289371764616322], "isController": false}, {"data": ["contact/bm.png-557", 20, 0, 0.0, 212.4, 123, 342, 135.5, 338.0, 341.8, 342.0, 10.531858873091101, 44.09187401263823, 4.309422722485519], "isController": false}, {"data": ["contact/node_modules/tether/dist/js/tether.min.js-550", 20, 0, 0.0, 341.75, 125, 1597, 334.5, 498.60000000000036, 1542.8499999999992, 1597.0, 10.718113612004288, 122.41519711280814, 4.532171087888531], "isController": false}, {"data": ["contact/node_modules/bootstrap/dist/css/bootstrap.min.css-571", 20, 0, 0.0, 268.30000000000007, 137, 484, 237.5, 447.30000000000007, 482.29999999999995, 484.0, 1.5434480629726808, 42.926923160402836, 0.6858094420435252], "isController": false}, {"data": ["contact/Samsung1.jpg-581", 20, 0, 0.0, 291.55, 139, 1378, 171.5, 456.50000000000006, 1331.9999999999993, 1378.0, 1.5423768026528881, 41.72701617567672, 0.6401466221948021], "isController": false}, {"data": ["contact/iphone1.jpg-584", 20, 0, 0.0, 258.1499999999999, 143, 471, 236.5, 427.5000000000001, 469.04999999999995, 471.0, 1.5054572826496049, 51.342856134738426, 0.623353406097102], "isController": false}, {"data": ["/addtocart-258", 25, 0, 0.0, 428.52, 358, 867, 392.0, 565.0000000000002, 798.8999999999999, 867.0, 0.5277936115861253, 0.1706051615576245, 0.2809057796039437], "isController": false}, {"data": ["contact/node_modules/bootstrap/dist/js/bootstrap.min.js-552", 20, 0, 0.0, 270.55000000000007, 130, 468, 334.0, 362.90000000000003, 462.79999999999995, 468.0, 9.77039570102589, 148.51383121641425, 4.18867550073278], "isController": false}, {"data": ["contact/css/latostyle.css-574", 20, 0, 0.0, 236.19999999999996, 122, 636, 141.0, 423.2000000000001, 625.5499999999998, 636.0, 1.4536996656490768, 1.3920168038595726, 0.6005028892280855], "isController": false}, {"data": ["contact/imgs/Nexus_6.jpg-590", 20, 0, 0.0, 560.95, 233, 1448, 403.0, 1034.2000000000003, 1427.9999999999998, 1448.0, 1.4298991921069566, 324.13049840923713, 0.5990495638807464], "isController": false}, {"data": ["/index.html-261", 25, 0, 0.0, 280.32000000000005, 129, 1376, 208.0, 455.00000000000045, 1140.1999999999994, 1376.0, 0.5274039070081431, 4.775559971098266, 0.2667922107716974], "isController": false}, {"data": ["contact/imgs/iphone_6.jpg-588", 20, 0, 0.0, 576.45, 190, 1697, 410.0, 1066.4000000000003, 1665.9999999999995, 1697.0, 1.458470064901918, 286.6620063990374, 0.6124434842849851], "isController": false}, {"data": ["contact/css/latofonts.css-545", 20, 0, 0.0, 260.29999999999995, 120, 480, 321.0, 450.3, 478.54999999999995, 480.0, 9.438414346389807, 12.26763434992921, 3.8988762387918827], "isController": false}, {"data": ["contact/node_modules/video.js/dist/video.min.js-576", 20, 0, 0.0, 1214.7999999999997, 212, 5234, 898.0, 2308.6000000000004, 5088.049999999997, 5234.0, 1.3808340237503454, 259.5363175529895, 0.5811908830433582], "isController": false}, {"data": ["contact/imgs/xperia_z5.jpg-591", 20, 0, 0.0, 537.3000000000001, 227, 1719, 434.0, 1265.100000000001, 1698.7999999999997, 1719.0, 1.362862010221465, 191.64182282793865, 0.5736264906303237], "isController": false}, {"data": ["/view-202", 25, 0, 0.0, 354.7600000000001, 335, 402, 353.0, 371.4, 393.0, 402.0, 0.5286529921759358, 0.4024783913089448, 0.23335073482765914], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Test failed: text expected to contain /Auth_token/", 5, 50.0, 0.29239766081871343], "isController": false}, {"data": ["Test failed: text expected not to contain /This user already exist/", 5, 50.0, 0.29239766081871343], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 1710, 10, "Test failed: text expected to contain /Auth_token/", 5, "Test failed: text expected not to contain /This user already exist/", 5, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["invalid login", 5, 5, "Test failed: text expected to contain /Auth_token/", 5, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["/signup-148", 5, 5, "Test failed: text expected not to contain /This user already exist/", 5, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
