* 文件导入

  可视化的数据一般都是保存在外部文件，存在服务器上

  AJAX是在后台与服务器进行数据交换的较好的方式，可以使得网页实现异步更新

  XMLHttpRequest是AJAX的基础

  ```
  d3.json()  //请求JSON文件
  d3.csv()  d3.tsv()  //请求CSV，TSV文件
  d3.xml()   //请求XML文件
  d3.html()  //请求HTML文件
  d3.text()  //请求TXT文本文件

  但是这些方法都是异步读取的，有可能在文件还没有读取完，应该注意到：
  d3.json("example.json" , function(error,data){
    funA(data);
  })
  ```

  * JSON是一种轻量级的数据交换语言，以文字为基础，且易于阅读

    JSON的格式：

    {

    ​    “name" : "中国”

    }

    以上是一个对象，对象中包含有名称和值

    ```
    d3.json("city.json" , function(error, data){
      if(error)
           return console.error(error);
      console.log(data);
    });
    ```

  * 大多数的浏览器都没有办法直接读取本地文件，需要将网页的HTML文件与JSON文件放在服务器下，使用服务器的调试方式来进行。

  * CSV 是以纯文本的格式来储存表格数据的，每一个单元格之间用逗号分隔的表格文件。

    在d3中有专门的函数来定义，d3.csv()

    ```
    d3.csv("table.csv" , function(error , csvdata){
      if(error){
        console.log(error);
      }
      console.log(csvdata);
    });
    ```

    csvdata在这里是一个数组，数组的每一个元素都是一个对象，且含有成员变量

    如何进行调用？ 

    除此之外还有TSV文件，他的读取方法和CSV文件是一致的。

    两者读取的原型都是d3.dsv()

    但是不同的编码方式，可能会导致出现数据读取的乱码

    所以需要在调用函数的时候设定编码

    ```
    //进行函数的重定义即可
    var csv = d3.dsv("," ,  "text/csv ; charset = gb2312");
    var tsv = d3.dsv(" " ,  "text/tab-separated-values ; charset = gb2312");
    ```

  * XML

    XML与HTML是类似的，主要是用来传输数据

    d3中有专门来读取XML文件的函数d3.xml()

    ```
    d3.xml("example.xml" , function(error , xmlDocument){
        if(error)
           return console.error(error);
        console.log(xmlDocument.getElementsByTagName("title")[0].innerHTML );
    });
    ```

  * TEXT

    d3.text()可以用来读取txt文件

    ```
    d3.text("nite.txt" , function(error , txtdata){
      if(error)
          return console.error(error);
      d3.select("body")
        .append("p")
        .text(txtdata);
    });
    ```

* 文件导出

  * 导出为SVG文件，有两种方法可以导出 SVG Crowbar   d3-downloadable

    SVG Crowbar 为谷歌浏览器提供了一种简答的读取SVG文件的方法

    d3-downloadable需要有JavaScript的支持

    需要下载d3-downloadable.js 和d3-downloadable.css

    但是d3-downloadable不支持外部链接的图形元素样式

  * 编辑矢量图： inkscape软件

* 布局（LayOut）

  布局的意义在于如何方便地计算出方便绘图的数据

  一般的顺序：

  1.确定初始数据

  2.转换数据

  3.绘制

* 饼状图

  d3.layout.pie() 创建一个饼状图布局

  pie(values[ , index])  转换数据，转换后的每一个对象都包含有起始角度和终止角度

  pie.value([accessor])  设定或者获取值访问器，即如何从接受的数据中提取初始值

  pie.sort([comparator])  设定或者获取比较器，用于排序

  如何进行数据转换：

  ```
  var pie = d3.layout.pie()
              .value(function(d){
                return d[1];
              });
  var piedata = pie(dataset);
  console.log(piedata);

  //转换完数据之后进行绘制
  var outerRadius = width / 3;
  var innerRadius = 0;
  var arc = d3.svg.arc()
                  .innerRadius(innerRadius)
                  .outerRadius(outerRadius);
  var color = d3.scale.category20();

  var arcs = svg.selectAll("g")
                .data(piedata)
                .enter()
                .append("g")
                .attr("transform" , "translate(" + (width/2 ) + " ," + (height/2) + ")");
                
                
  arcs.append("path")
      .attr("fill",function(d,i){
        return color(i);
      })
      .attr("d" , function(d){
        return arc(d) ; //arc是一个弧生成器，在这里就是调用这个生成器
      });
      
  //添加弧内的文字元素
  arcs.append("text")
      .attr("transform" , function(d){
        var x = arc.centroid(d)[0] * 1.4;
        var y = arc.centroid(d)[1] * 1.4;s
        return "translate(" + x + "," + y + ")";
      })
      .attr("text-anchor" , "middle")
      .text(function(d){
        var percent = Number(d.value) / d3.sum(dataset,function(d){
          return d[1];
        }) * 100;
        return percent.toFixed(1) + "%";
      });
  ```

* 力导向图

  在空间中配置节点，节点之间用线连接。节点和连线都被施加力的作用。

  d3.layout.force()

  创建一个力导向图布局

  force.size([size])  设定或者获取力导向图的作用范围

  * 节点相关

    force.nodes([nodes]) 设定或者获取力导向图布局的节点数组

    force.friction([friction]) 设定或者获取摩擦系数，默认为0.9

  * 连线相关

    force.links([links]) 设定或者获取导向图布局的连线数组

  * 如何绘制力导向图：

    ```
    \\确定初始数据
    var nodes = [{ name : "0"},
                 { name : "1"},
                 { name : "2"},
                 { name : "3"},
                 { name : "4"},
                 { name : "5"},
                 { name : "6"}] ;
    \\转换数据
    var force = d3.layout.force()
                  .nodes(nodes) //节点数组
                  .links(edges) //连线数组
                  .size([width , height])
                  .linkDistance(90) //设定连线的距离
                  .charge(-400) ; //设定节点的电荷数
    force.start() ; 
    console.log(nodes);
    console.log(edges);

    //绘制连线
    var color = d3.scale.category20();
    var lines = svg.selectAll(".forceLine")
                   .data(edges)
                   .enter()
                   .append("line")
                   .attr("class" , "forceLine");
     //绘制节点
    var circles = svg.selectAll(".forceCircle")
                     .data(nodes)
                     .enter()
                     .append("circle")
                     .attr("class","forceCircle")
                     .attr("r",20)
                     .style("fill" , function(d,i){
                       return color(i);
                     })
                     .call(force.drag);
                     
     //绘制文字
     var texts = svg.selectAll(".forceText")
                    .data(nodes)
                    .enter()
                    .append("text")
                    .attr("class" , "forceText")
                    .attr("x" , function(d){ return d.x})
                    .attr("y" , function(d){ return d.y})
                    .attr("dy" , ".3em")
                    .text(function(d){ return d.name; });
                    
     
    force.on("tick",function(){
      lines.attr("x1" , function(d){ return d.source.x ; });
      lines.attr("y1" , function(d){ return d.source.y ; });
      lines.attr("x2" , function(d){ return d.target.x ; });
      lines.attr("y2" , function(d){ return d.target.y ; });
      
      circles.attr("cx" , function(d){ return d.x ; });
      circles.attr("cy" , function(d){ return d.y ; });
      
      texts.attr("x" , function(d){ return d.x; });
      texts.attr("y" , function(d){ return d.y; }); 
    });                
      
    //力学图开始运动时
    force.on("start" , function(){
      console.log("运动开始")；
    })；
    force.on("end" , function(){
      console.log("运动结束")；
    })；

    //定义拖拽行为
    var drag = force.drag()
                    .on("dragstart" , function(d){
                      d.fixed = true;
                    })
                    .on("dragend" , function(d,i){
                      d3.select(this).style("fill",color(i)); 
                    })
                    .on("drag" ,function(d){
                      d3.select(this).style("fill" , "yellow");
                    });
                    
    ```

* 弦图

  弦图用于表示一组元素之间的联系，包括外部的节点和内部的弦

  节点的长度为该元素所在行的总和

  d3.layout.chord() 创建一个弦图布局

  chord.matrix([matrix])  设定或者获取矩阵，必须是方块矩阵，即行列数相等

  chord.padding([padding]) 设定或者获取元素节点之间的间距，默认为0

  chord.sortGroups([comparator]) 对节点进行排序，comparator是比较函数

  chord.sortSubgroups([compatator])

  对各节点的所在行的数据进行排序，comparator是比较函数

  chord.sortChords([comparator]) 对弦进行排序

  chord.chords()  返回弦数组

  chord.groups() 返回节点数组

  如何进行绘图？

  ```
  var chord = d3.latout.chord()
                .padding(0.03)
                .sortSubgroups(d3.ascending)
                .matrix("population");
  console.log(chord.groups());  //返回节点数组
  console.log(chord.chords());  //返回弦数组

  //弦图的<g>元素
  var gChord = svg.append("g")
                  .attr("transform", "translate(" + width/2 + "," +height / 2 + ")");
  var gOuter = gChord.append("g"); //节点的g元素
  var gInner = gChord.append("g"); //弦的g元素

  //创建一个弧生成器，并且设定内半径和外半径
  var color20 = d3.scale.category20()
  var innerRadius = width / 2 * 0.7;
  var outerRadius = innerRadius * 1.1;

  gOuter.selectAll(".outerPath")
        .data(chord.groups())
        .enter()
        .append("path")
        .attr("class" , "outerPath")
        .style("fill" , function(d){
          return color20(d.index);
        })
        .attr("d" , arcOuter);
        
  //为其添加文字
  gOuter.selectAll(".outerText")
        .data(chord.groups())
        .enter()
        .append("text")
        .each(function(d,i){
          d.angle = (d.startAngle + d.endAngle) / 2;
          d.name = continent[i];
        })
        .attr("class" , "outerText")
        .attr("dy" , ".35em")
        .attr("transform" , function(d){
          var result = "rotate(" + (d.angle * 180 / Math.PI) + ")";
          result += "translate(0," + -1.0 * (outerRadius + 10) + ")" ;
          if(d.angle > Math.PI * 3 / 4 && d.angle < Math.PI * 5 / 4)
          result += "rotate(180)" ;
          return result;
        })
        .text(function(d){
          return d.name;
        });
       //如果要在鼠标点到弦的时候，只有该弦的数值显示
       gOuter.selectAll(".outerPath")
             .on("mouseover" , fade(0.0))
             .on("mouseout",fade(1.0));
       //实现还需要一个控制透明度的函数
       function fade(opacity){
           return function(g,i){
             gInner.selectAll(".innerPath")
                   .filter( function(d){
                     return d.source.index != i && d.target.index !=i;
                   })
                   .transition() //过渡
                   .style("opacity" , opacity);
           }
       }
        
  ```

* 树状图：

  ```
  var tree = d3.layout.tree()
               .size([width , height - 200])
               .separation(function(a,b){
                 return (a.parent == b.parenr ? 1:2) ;
               });
   d3.json("city.json" , function(error,root){
      var nodes = tree.nodes(root);
      var links = tree.links(nodes);
   });
   //绘制
   var diagonal = d3.svg.diagonal()
                    .projection(function(d){
                      return [d.y , d.x];
                    });
    //添加树状图的连线
   var link = gTree.selectAll(".link")
                   .data(links)
                   .enter()
                   .append("path")
                   .attr("class" , "link")
                   .attr("d" , diagonal) 
                   //使用对角线生成器
                   
   var node = gTree.selectAll(".node")
                   .data(nodes)
                   .enter()
                   .append("g")
                   .attr("class" , "node")
                   .attr("transform" , function(d){
                     return "translate(" + d.y + "," +d.x + ")";
                   });
   node.append("circle")
       .attr("r" , 4.5);
   node.append("text")
       .attr("dx" , function(d) { return  d.children ? -8 : 8;})
       .attr("dy" , 3)
       .style("text-anchor" , function(d){
         return d.children ? "end" : "start";
       })
       .text(function(d) {return d.name ; }) ;
   
  ```

* 集群图

  ```
  var cluster = d3.layout.cluster()
                  .size([360 , width/2 - 100])
                  .separation(function(a,b){
                    return (a.parent == b.parent ? 1:2);
                  });

                  
  ```

* 捆图

  ```
  //仅仅是计算连线的路径
  var bundle = d3.layout.bundle() ;
  var cluster = d3.layout.cluster()
                  .size([360 , width/2 - 50])
                  .separation(function(a,b){
                    return (a.parent == b.parent ? 1:2);
                  });
  //替换成节点对象
  function map (nodes , links){
    var hash = [];
    for (var i = 0 ;i < nodes.length ; i++){
      hash[nodes[i].name] = nodes[i];
    }
    var resultLinks = [];
    for (var i = 0 ; i < links.length ; i++){
      resultLinks.push({  source: hash[links[i].source],
                          target: hash[links[i].target]
                   });
    }
    return resultLinks;
  }
  var oLinks = map(nodes , railway); //将连线两端换成节点
  var links = bundle(oLinks) //调用捆图格局
  //计算了一条条连线路径，根据节点数组生成一系列的曲线
  //绘制
  var line = d3.svg.line.radial()
               .interpolate("bundle")
               .tension(85)
               .radius(function(d){ return d.y ;})
               .angle(function(d){
                 return d.x / 180 * Math.PI;
               });
   gBundle = svg.append("g")
                .attr("transform" , 
                "translate("+(width/2) + ","+(height/2) +")");
   var color = d3.scale.category20();
   var link = gBundle.selectAll(".link")
                      .data(links)
                      .enter()
                      .append("path")
                      .attr("class" , "link")
                      .attr("d" , line);
            
  ```

* 打包图：

  是层级布局的一个拓展。可以用来表示包含和不包含的关系。也就是相当于集合的包含关系

  d3.layout.pack() 创建一个打包图布局

  pack.size([size]）设定布局的尺寸 [x,y] 分别表示宽和高

  pack.radius([radius])  设定或获取叶子节点的半径

  pack.padding([padding])  设定或者获取节点的间距

  pack.children([children])  子节点访问器

  pack.nodes(root)  根据root进行计算，获取节点数组

  pack.links(nodes)  根据nodes进行计算，获取连线数组

  ```
  d3.json("city.json" , function(error , root){
    var nodes = pack.nodes(root);
    var links = pack.links(nodes);
    
  });
  //进行绘制
  svg.selectAll("circle")
     .data(nodes)
     .enter()
     .append("circle")
     .attr("class" , function(d){
       return d.children ? "node" : "leafnode";
     })
     .attr("cx" , function(d){ return d.x;})
     .attr("cy" , function(d){ return d.y;})
     .attr("r" , function(d){ return d.r;});
     
     svg.selectAll("text")
        .data(nodes)
        .enter()
        .append("text")
        .style("fill-opacity" , function(d){
          return d.children ? 0 :1;
        })
        .attr("x" , function(d){ return d.x ; })
        .attr("y" , function(d){ return d.y ; })
        .attr("dy" , ".3em")
        .text(function(d){ return d.name; })；
  ```

* 分区图 partition 

  ```
  var partition =  d3.layout.partition()
                     .sort(null)
                     .size([800,500])
                     .value(function(d){ return 1 ;});
   //创建圆形的分区图
   var partition = d3.layout.partition()
                     .sort(null)
                     .size(2 * Math.PI ,radius * radius)
                     .value(function(d) {return 1;})
   var gArcs = svg.selectAll("g")
                  .data(nodes)
                  .enter()
                  .append("g")
   gArcs.append("path")
        .attr("display" , function(d){
          return d.depth == 0 ? null : "node";
        })
        .attr("d" , arc)
        .style("stroke" , "#fff")
        .style("fill" , function(d){
          return color((d.children? d : d.parent).name);
        });
  gArcs.append("text")
       .attr("class","nodeText")
       .attr("dy" , ".5em")
       .attr("transform" , function(d,i){
         if(i !== 0 ){
           var r = d.x + d.dx / 2;
           var angle = Math.PI /2;
           r += r < Math.PI ? (angle * -1) : angle;
           r *= 180 / Math.PI;
           return "translate(" + arc.centroid(d) + ")" + "rotate(" +r + ")";
           
         }
       })
  ```

* 堆栈图

  ```
  var stack = d3.layout.stack()
                .values(function(d) { return d.sales ; })
                .x(function(d) { return d.year; })
                .y(function(d) { return d.profit;})

  var data = stack(dataset);
  var padding = {left : 50 , right : 100 , top :30 , bottom : 30};
  var xRangeWidth = d3.scale.ordinal()
                      .domain(data[0].scale.map(function(d){
                        return d.year;
                      }))
                      .rangeBands([0,xRangeWidth] , 0.3);
  var maxProfit = d3.max(data[data.length-1].sales , function(d){
    return d.y0 + d.y;
  });

  var yRangeWidth = height - padding.top - padding.bottom;
  var yScale = d3.scale.linear()
                 .domain([0,maxProfit])
                 .range([0,yRangeWidth]);

  ```

* 矩阵树图

  d3.layout.treemap() 创建一个矩阵树图布局

  进行数据转换之后的节点数组输出结果如下所示：

  parent 父节点

  children 子节点

  depth 节点的深度

  value :节点的value值

  x, y , dx ,dy

  ```
  var groups = svg.selectAll("g")
                  .data(nodes.filter(function(d){
                    return !d.children;
                  }))
                  .enter()
                  .append("g");
  var rects = groups.append("rect")
                    .attr("class" , "nodeRect")
                    .attr("x" , function(d){return d.x ;})
                    .attr("y" , function(d){return d.y ;})
                    .attr("width" , function(d){ return d.dx})
                    .attr("height" , function(d){return d.dy})
                    .style("fill" , function(d,i){
                      return color(d.parent.name);
                    });
   var texts = groups.append("text")
                     .attr("class" , "nodeName")
                     .attr("x" , function(d) { return d.x;})
                     .attr("y" , function(d) { return d.y;})
                     .attr("dx" , "0.5em")
                     .attr("dy" , "1.5em")
                     .text(function(d){
                       return d.name + " " + d.gdp;
                     });
  ```

* 地图

  地图的数据，地图的数据 一般也保存为json的格式，其中常见的有两种：

  Geojson 和 TopoJSON

  * 获取数据

    全世界的地理信息都可以在Natural Earth上下载到

    在各个尺寸中有三个选项 

    “cultural"   ：文化性地理信息

    "physics" ：物理性地理信息

     "raster" ： 栅格网络

  * Geojson:

    GeoJSON的最外层是一个单独的对象，可以表示几何体，特征，特征集合

    可能包含很多的子对象，每一个GeoJSON对象都有一个type

    比如有type，坐标表示

  * TopoJSON中的每一个几何体都是通过将共享边整合后组成的

    用arcs数组来保存共同有的边。

* 基于GeoJSON的中国地图

  需要使用两个文件: 

  china.geojson：中国大陆及港澳台

  southchinasea.svg 表示南海诸岛的矩形

  svg文件可以使用d3.xml读取

  ```
  //定义地图的投影
  var projection = d3.geo.mercator()
                     .center([107,31])
                     .scale(600)
                     .translate([width/2 , height/2]);
  //定义地理路径生成器
  var path = d3.geo.path()
                   .projection(projection);

  var color = d3.scale.category20();
  d3.json("china.geojson" , function(error,root){
    if(error)
      return console.error(error);
      var groups = svg.append("g");
      groups.selectAll("path")
            .data(root.feature)
            .enter()
            .append("path")
            .attr("class" , "province")
            .style("fill" , function(d,i){
              return color(i);
            })
            .attr("d" , path);
  });
  var groups = svg.append("g");
  groups.selectAll("path")
        .data(root.features)
        .enter()
        .append("path");
  //绘制南海
  d3.xml("southchinasea.svg" , function(error,xmlDocument){
    svg.html(function(d){
      return d3.select(this).html() + 
         xmlDocument.getElementsByTagName("g")[0].outerHTML;
    });
    d3.select("#southchinasea")
      .attr("transform" , "translate(540,410)scale(0.5)")
      .attr("class" , "southchinasea");
  });

  ```

* 地理路径

  地理路径生成器

  能够通过geoJSON文件生成地图的路径值，将该路径赋值给SVG的<path>元素

* 投影

  d3.geo.projection(raw) 以点函数raw创建一个投影

  projection.center([location])  设定投影的中心，location是一个数组，形式为[经度，维度]

  projection.translate([point])  设置投影的平移属性

  projection.scale ([scale])  设置投影的缩放因子 默认为150

  projection.clipAngle(angle)    设定投影的裁剪角度，注意单位是度

  projection.clipExtent(extent)  设定一个矩形的裁剪框，其中extent的格式为

  [x0,y0] , [x1,y1]

  ```
  var projection  = d3.geo.equirectangular()
                      .center([116.38 , 39.93])
                      .scale(80)
                      .translate([width/2 , height/2]);
       
  var washington = projection([-77.04, 38.91])
  svg.append("circle")
     .attr("cx" , washington[0])
     .attr("cy" , washington[1])
     .attr("r" , 10)
     .style("fill" , "red");
    
  ```

* 球面数学

  d3.geo.area(feature) 返回几何体的立体角，单位为球面度

  d3.geo.centroid(feature)  返回几何体的中心，形式为[经度，维度]

  d3.geo.bounds(feature) 返回几何体的边界框

* 友好的交互

  * 提示框

    当用户的鼠标滑动到某图形元素的时候，出现提示框，并且显示描述性文字

    有一种简单的方法，即div + css

    ```
    .tooltip{
      position : absolute ; 
      width : 20 ; 
      height : auto;
    }
    element.on("mouseover" , function(d){
      tooltip.style("left" , (d3.event.pageX) + "px")
              .style("top" , (d3.event.pageY) + "px");
    })
    ```

  * 举例：一个饼状图的提示框

    ```
    var tooltip = d3.select("body")
                    .append("div")
                    .attr("class" , "tooltip")
                    .style("opacity" , 0.0);
    .tooltip{
     position : absolute;
     width : 120;
     height : auto;
     font-family : simsun;
     font-size: 14px;
     text-align : center;
     border-style : solid;
     border-width : 1px;
     background-color : white;
     border-radius : 5px;
    }
    //添加鼠标事件的监听器
    arcs.on("mouseover" , function(d){
      //鼠标移入的时候
      tooltip.html(d.data[0])
              .style("left" , (d3.event.pageX) + "px")
              .style("top", (d3.event.pageY + 20) + "px")
              .style("opacity" , 1.0);
    })
    .on("mousemove" , function(d){
      tooltip.style("left" , (d3.event.pageX) + "px")
             .style("top" , (d3.event.pageY + 20) + "px" );
    })
    .on("mouseout" , function(d){
       tooltip.style("opacity" , 0.0);
    })
    //tooltip.style("box-shadow" , "10px , 0px , 0px" + color(i));
    ```

* 坐标中的焦点

  随着鼠标在坐标系中滑动，显示出与鼠标的X值对应的折线图中的焦点，并且连接两条到坐标轴的虚线，以表明该点到坐标轴的距离

  ```
  //焦点的元素
  var focusCircle = svg.append("g")
         .attr("class" , "focusCircle")
         .style("display" , "none");
  foucusCircle.append("circle")
              .attr("r" , 4.5);
  focusCircle.append("text")
             .attr("dx" , 10)
             .attr("dy" , "1em");

  var focusLine = svg.append("g")
                     .attr("class" , "focusLine")
                     .attr("display" , "none");
  function mousemove(){
    var data = dataset[0];
    var mouseX = d3.mouse(this)[0] - padding.left;
    var mouseY = d3.mouse(this)[1] - padding.top;
    
    var x0 = xScale.invert(mouseX);
    var y0 = yScale.invert(mouseY);
    var bisect = d3.bisector(function(d){ return d[0]; }).left;
    var index = bisect(data,x0);
    
    
  }
  ```

* 元素组合

  * 饼状图的拖拽

    ```
    var arcs = svg.selectAll("g")
                  .data(piedata)
                  .enter()
                  .append("g")
                  .each(function(d){
                    d.dx = width / 2;
                    d.dy = height / 2;
                  })
                  .attr("transform" , "translate(" + (width/2) +"," 
                         + (height / 2) + ")");
    var drag = d3.behavior.drag()
                 .origin(null)
                 .on("darg" , dragmove);

    function dragmove(d){
      d.dx += d3.event.dx;
      d.dy += d3.event.dy;
      d3.select(this)
        .attr("transform" , "translate(" +d.dx+","+d.dy+")");
        
    }
    //让弧的选择集通过call调用drag行为
    arcs.call(drag);

    ```

  * 移入和移出

    需要我们定义重绘函数

    ```
    function redraw(){
      var arcsUpdate = svg.selectAll(".arcGroup")
              .data(piedata,function(d){ return d.data[0]; });
      var arcsEnter = arcsUpdate.enter();
      var arcsExit = arcsUpdate.exit();
      arcsUpdate.call(setAttributes);
      var newArcs = arcsEnter.append("g")
                    .attr("class" , "arcGroup");
      //enter部分的处理方法
      var newArcs = arcsEnter.append("g")
                        .attr("class" , "arcGroup");
      newArcs.append("path")
             .attr("class" , "arcPath");
      newArcs.append("text")
             .attr("class" , "company");
      newArcs.append("line")
             .attr("class" , "conLine1");
      newArcs.append("line")
             .attr("class" , "conLine2");
      //设定属性
      newArcs.call(setAttributes);
      arcsExit.remove();
      
    }
    ```

  * 合并

    ```
    function dragCircleEnd(d,i){
      var dis2 == (d.x - piecircle.cx) * (d.x - piecircle.cx)+
                  (d.y - piecircle.cy) * (d.y - piecircle.cy);
      if(dis2 < piecircle.r * piecircle.r){
        var vec = {x : d.x - piecircle.cx,y : d.y - piecircle.cy};
        var zerov = {x : 0.0,y : -1.0};
        var constheta = (vec.x * zerov.x + vec.y*zerov,y)/
                (norm(vec) * norm(zerov));
        var theta = Math.acos(costheta);
        theta = d.x < piecircle.cx ? 2 * Math.PI - theta :theta;
        var index;
        for (var j = 0 ;j < piedata.length;j++){
          if(theta >= piedata[j].startAngle &&
             theta <= piedata[j].endAngle){
               index = j;
               break;
             }
        }
        dataset[index][0] += "&" +d[0];
        dataset[index][1] += d[1];
        piedata = pie(dataset);
        d3.select(this).remove();
        redraw();
      }
    }
    ```

* 区域选择

* 思维导图的制作

  ```
  var tree = d3.layout.tree()
               .size([height , width]);
  var diagonal = d3.svg.diagonal()
                 .projection(function(d){
                   return [d.y , d.x];
                 });
   d3.json("learn.json" , function(error , root){
     root.x0 = height/2;
     root.y0 = 0;
     redraw(root);
   });
   
  ```

* ​

  ​

  ​

  ​