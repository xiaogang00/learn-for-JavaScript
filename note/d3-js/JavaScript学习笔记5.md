* 地图进阶

  * 值域的颜色

    颜色插值函数：

    ```
    var palegreen = d3.rgb(66,251,75);
    var darkgreen = d3.rgb(2,100,7);
    var color = d3.interpolate(a,b);

    //定义一个线性比例尺
    var linear = d3.scale.linear()
                   .domain([100,500])
                   .range([0,1]);
    color(linear(10));
    color(linear(250));
    color(linear(500));
    ```


    //进行地图的绘制
    d3.json("tourism.json" , function(error,valuedata){
      var value = [];
      for(var i = 0; i < valuedata.provinces.length ; i++){
        var name  = valuedata.provinces[i].name;
        var value = valuedata.provinces[i].value;
        values[name] = value;
      }
      var maxvalue = d3.max(valuedata.provinces,function(d){
        return d.value;
      });
      var minvalue = 0;
      var linear = d3.scale.linear()
                     .domain([minvalue , maxvalue])
                     .range([0,1]);
      var a = d3.rgb(0,255,255);
      var b = d3.rgb(0,0,255);
      var computeColor = d3.interpolate(a,b);
      provinces.style("fill" , function(d,i){
        var t = linear(value[d.properties.name]);
        var color = computeColor(t);
        return color.toString();
      });
    });
    
    //定义线性渐变
    var defs = svg.append("defs");
    var linearGradient = defs.append("linearGradient")
                             .attr("x1" , "0%")
                             .attr("y1" , "0%")
                             .attr("x2" , "100%")
                             .attr("y2" , "0%");
    var stop1 = linearGradient.append("stop")
                              .attr("offset" , "0%")
                              .style("stop-color" , a.toString());
    var stop2 = linearGradient.append("stop")
                              .attr("offset" , "100%")
                              .style("stop-color" , b.toString());


    //使用
    var colorRect = svg.append("rect")
                       .attr("x" , 20)
                       .attr("y" , 490)
                       .attr("width" , 140)
                       .attr("height" , 30)
                       .style("fill" , "url#"+linearGradient.attr("id") + ")");
    
    ​```

* 标线

  * 带有箭头的标线

    箭头的标注：

    ```
    <defs>
    <marker id = "arrow"
            markerUnits = "strokeWidth"
            markerWidth = "12"
            markerHeight = "12"
            viewBox = "0 0 12 12"
            refX = "6"
            refY = "6"
            orient = "auto" >
    <path d = "M2 , 2 L10 , 6 L2 , 10  L6 , 6 L2 ,2"
               style = "fill : #000000;" />
    </marker>
    </defs>
    ```

* 地图的拖动和缩放

  可以通过设置投影函数来实现

  绘制地图的时候有如下的代码：

  ```
  var projection = d3.geo.mercator()
                     .center([0,0])
                     .scale(260)
                     .translate([width/2 , height/2]);
  var path = d3.geo.path()
               .projection(projection);
  ```

* 力导向图

  * voronoi 图和Delaunay三角剖分

    有以下函数：

    ```
    d3.geom.voronoi()  //创建一个Voronoi图的运算器
    voronoi(data)  //返回一个多边形数组
    voronoi.x([x])   //设定或者获取x方向坐标的访问器
    voronoi.y([y])   //设定或者获取y方向坐标的访问器

    ```

  * 力导向的中国地图

    ```
    var force = d3.layout.force()
                  .size([width , height]);
    var projection = d3.geo.mercator()
                       .center([107,31])
                       .scale(850)
                       .translate([width/2 , height/2]);
    var path = d3.geo.path()
                 .projection(projection);
    var nodes = [];
    root.features.forEach(function(d , i ){
      var centroid = path.centroid(d);
      centroid.x = centroid[0];
      centroid.y = centroid[1];
      centroid.feature = d;
      nodes.push(centroid);
    });

    var links = voronoi.links(nodes);

    ```

    ​