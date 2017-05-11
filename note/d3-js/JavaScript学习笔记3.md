#### JavaScript学习笔记3

* 定量比例尺
  * ```
    var linear = d3.scale.linear()
                    .domain([0,500])   //定义域
                    .range([0,100]);   //值域
                   
    ```

  * 线性比例尺

    d3.scale.linear() 创建一个线性比例尺

    linear(x) 输入一个在定义域内的值x，并且返回值域内对应的值

    linear.invert(y) 输入一个在值域内的值，并且返回定义域内对应的值

  * 指数和对数比例尺

    ```
    var pow = d3.scale.pow().exponent(3) ;
    console.log(pow(2)); //输出8
    ```

  * 量子比例尺，定义域是连续的，但是值域是离散的

    ```
    var quantize = d3.scale.quantize()
                     .domain([0,10])
                     .range(["red" , "green" , "blue" , "yellow" , "black"]);
                     
    ```

  * ```
    var r = [45,35,25,15,5];
    var svg = d3.select("body")
                 .append("svg")
                 .attr("width",400)
                 .attr("height",400)
               
     svg.selectAll("circle")
         .data(r)
         .enter()
         .append("circle")
         .attr("cx" , function(d,i){ return 50 + i * 30;})
         .attr("cy" , 50)
         .attr("r" , function(d) { return d;})
         .attr("fill" , function(d){ return quantize(d);})
         
        
    ```

  * 分位比例尺d3.scale.quantile()，可以用quantile.quantiles查询分位比例尺的分段值

    量子比例尺的分段值只是和定义域的起始值和结束值有关，其中间有多少其他的数值都没有影响，分段值会取其算数平均值。

  * 阈值比例尺：

    ```
    var threshold = d3.scale.threshold()
                      .domain([10,20,30])
                      .range(["red" , "green" , "blue" , "black"]);
                     
                     
    ```

* 序数比例尺

  * d3.scale.ordinal() 构建一个序数比例尺

    ordinal(x) 输入一个定义域内的离散值，返回值域内的一个离散值

  * rangePoints()和rangeRoundPoints() 可以接收一个连续的区间并且自动计算出离散值

  * ```
    ordinal.rangePoints([0,100],5);
    console.log(ordinal.range() );
    //输出[27.77777,38.88888,50,61.11111,72.22222]
    在这里padding 是5，step等于11.11111
    ```

  * rangeRoundPoints([0,100],5)；可以将结果进行四舍五入

  * rangeBands区别于Points是在其中不同区间之间还有间隔，并且有三个参数

* 坐标轴

  * d3.svg.axis() 创建一个默认的新坐标轴

  * axis(selection)将此坐标轴应用到指定的选择集上，该选择集需要包含有<svg>或者<g>

  * axis.scale([scale]) 获取坐标轴的比例尺

  * axis.orient([orientation])

    设定或者获取坐标轴的方向，有四个值：top,bottom,left,right

  * axis.ticks([argument...])

    设定或者获取坐标轴的分隔数，这个函数会调用比例尺的ticks（）

  * axis.tickValues([values])

    设定或者获取坐标轴的指定刻度，例如参数为[1,2,3,4,5]

  * axis.tickSize([inner,outer])

    设定或者获取坐标轴的内外刻度的长度，默认值为6

* 绘制的方法

  ```
  var width = 600'
  var height = 600;
  var svg = d3.select("body").append("svg")
              .attr("width",width)
              .attr("height",height)
              
  var xScale = d3.scale.linear()
                 .domain([0,10])
                 .range([0,300]);
  var axis = d3.svg.axis()
               .scale(xScale)
               .orient("bottom")
               
               
  var gAxis = svg.append("g")
                 .attr("transform","translate(80,80)");
  gAxis.attr("class","axis");
  axis(gAxis);
  ```

* 刻度

  刻度文字的格式通过tickFormat()进行设置

  .tickFormat(d3.format("$0.1f"))；

* 散点图的制作

  * 首先需要定义圆心数组

  * 之后使用比例尺将他们放大

    ```
    var xScale = d3.scale.linear()
                   .domain([0,1.2 * d3.max(center,function(d){
                     return d[0];
                   })])
                   .range([0,xAxisWidth]);
                   
    ```

  * 具体的绘制过程：

    ```
    var padding = { top : 30 , right : 30 , bottom : 30 , left : 30 };
    var circle = svg.selectAll("circle")
                    .data(center)
                    .enter()
                    .append("circle")
                    .attr("fill","black")
                    .attr("cx",function(d){
                      return padding.left + xScale(d[0]);
                    })
                    .attr("cy",function(d){
                      return height - padding.bottom - yScale(d[1]);
                    })
                    .attr("r",5);
    ```

* 绘制——颜色

  * RGB色彩模式 ， HSL色彩模式

  * RGB：

    d3.rgb(r,g,b) 分别输出r,g,b值来创建颜色，范围都为[0,255]

    d3.rgb(color) 输入相应的字符串来创建颜色

    rgb.brighter([k]) 颜色变得更加明亮，各个颜色通道的值乘以  0.7^-k^

    rgb.darker([k]) 颜色变得更加暗淡

  * HSL 与RGB的使用是类似的。

  * 插值： 计算介于两个颜色之间的颜色

    d3.interpolateRgb() 来处理RGB颜色之间的插值运算

    d3.interpolateHsl() 处理颜色之间的插值运算

    d3.interpolate() 也会自动判断颜色的类型

* 线段生成器

  添加线段元素，可以使用append()，再设置属性:

  ```
  svg.append("line")
     .attr("x1" , 20)
     .attr("y1" , 20)
     .attr("x2" , 300)
     .attr("y2" , 100)
     
  ```

  * 另外可以直接声明线段元素：

    <line x1 = "20" , y1 = " 20" , x2 = "300" , y2 = "100" />

  * 使用路径添加的方法：

    <path d = "M20 , 20 L300,100" />

    在d3下的添加方式就是

    ```
    svg.append("path")
        .attr("d","M20,20L300,100");
    ```

  * 路径生成器的概念，在这里先以线段生成器进行说明：

    ```
    var lines = [[80,80],[200,100],[200,200],[100,200]];
    var linePath = d3.svg.line();
    svg.append("path")
       .attr("d",linePath(lines))  //使用了线段生成器
       .attr("stroke","black")
       .attr("stroke-width", "3px")
       .attr("fill" , "none")
    ```

  * 关于线段生成器的函数

    * d3.svg.line()   创建一个线段生成器

    * line(data)   使用线段生成器绘制data数据

    * line.x([x])  设置或者获取线段X坐标的访问器

    * line.y([y]) 设置或者获取线段y坐标的访问器

    * line.interpolate([interpolate])  设置或者获取线段的插值模式

    * line.tension([tension])  设置或者获取张力系数

    * line.defined([defined])  设置或者获取一个访问器，确认线段是否存在

      可以选择性地使用顶点数据

      ```
      var linePath = d3.svg.line()
                       .x(function(d) { return d; })
                       .y(function(d,i){
                         return i % 2 == 0 ? 40 : 120;
                       })
                       .defined(function(d){
                         return d < 200 ;
                       });
      ```

* 区域生成器

  与线段生成器类似，但是是为生成一个区域，需要一共六个参数

  ```
  var dataset = [80,120,130,70,60,90]
  var areaPath = d3.svg.area()
                   .x(function(d,i){
                     return 50 + i * 80;
                   })
                   .y0(function(d,i){
                     return height / 2;
                   })
                   .y1(function(d,i){
                     return height / 2 - d ;
                   })
  svg.append("path")
      .attr("d" , areaPath(dataset))
      .attr("stroke","black")
      .attr("stroke-width","3px")
      .attr("fill","yellow");
  ```

  y0是在水平方向绘图时候，区域的下限坐标，而y1是区域的上限坐标

  在区域生成器里面的插值函数interpolate() 也会使得两点之间的插值相应地发生变化

* 弧生成器

  弧生成器可以凭借起始角度，终止角度，内半径，外半径

  在其中有四个非常重要的访问器：

  1. 内半径访问器innerRadius()
  2. 外半径访问器outerRadius()
  3. 起始角度访问器startAngle()
  4. 终止角度访问器endAngle()

  startAngle和endAngle使用的都是弧度

  ```
  var dataset = { startAngle: 0 . endAngle : Math.PI * 0.75}
  var arcPath = d3.svg.arc()
                  .innerRadius(50)
                  .outerRadius(100);  //创建一个弧生成器
                  
   svg.append("path")   //路径是一个很好的工具，在这里使用弧生成器来生成路径
       .attr("d",arcPath(dataset))
       .attr("transform" , "translate(250,250")
       .attr("stroke","black")
       .attr("stroke-width","3px")
       .attr("fill","yellow")
  ```

* 如何绘制饼状图

  ```
  var arcPath = d3.svg.arc()
                  .innerRadius(0)
                  .outerRadius(100);
                  
  var color = d3.scale.category10();

  svg.selectAll("path")
      .data(dataset)
      .enter()
      .append("path")
      .attr("d",function(d){ return arcPath(d); })
      .attr("transform","translate(250,250)")
      .attr("stroke","black")
      .attr("stroke-width","2px")
      .attr("fill",function(d,i){ return color(i); })
      
  svg.selectAll("text")
     .data(dataset)
     .enter()
     .append("text")
     .attr("transform", function(d){
       return "translate(250,250)" + "translate(" + arcPath.centroid(d) + ")"
       //弧的中心位置
     })
     .attr("text-anchor","middle")
     .attr("fill","white")
     .attr("font-size","18px")
     .text(function(d){
       return Math.floor((d.endAngle - d.startAngle)* 180 / Math.PI)
            
     })
  ```

* 符号生成器

  * d3.svg.symbol() 创建一个符号生成器
  * symbol(datum[, index]) 返回指定数据datum的路径字符串
  * symbol.type([type])  设定或者获取符号的类型
  * symbol.size([size]) 设定或者获取符号的大小，单位是像素的平方
  * d3.svg.symbolTypes 支持的符号类型

* 弦生成器

* 对角线生成器

  * d3.svg.diagonal() 进行创建

  * 有两个访问器：source()  target()

  * 另外还有投影函数projection() ，用于将坐标进行投影

  * ```
    var dataset = { source:{x : 100 , y : 100 },
                    target:{x : 300 , y : 200}};
    svg.append("path")
       .attr("d" , diagonal(dataset))
       .attr("fill" , "none")
       .attr("stroke" , "black")
       .attr("stroke-width" , 3);
    ```

  * 使用投影函数进行：

    ```
    var diagonal = d3.svg.diagonal()
                     .projection(function(d)){
                          var x = d.x * 1.5 ; 
                          var y = d.y * 1.5 ;
                          return [x,y];
                          });
    ```

* 折线图的制作

  首先使用GDP数据为例进行分析

  ```
  var dataset = [
    {
      country : "china" , 
      gdp : [[2000,11920], [2001 , 13170]]
    },
    {
      country : "japan"
      gdp : [[2000,46310] , [2001, 41590]]
    }
  ];
  //dataset是一个数组，每一项就是一个对象，每个对象也有两个成员 country 和gdp
  //首先计算需要绘制的边框和最大的gdp
  var padding = { top : 50 , right: 50 , bottom : 50 ,left : 50}
  var gdpmax = 0;
  for( var i = 0 ; i < dataset.length ; i++){
         var currGdp = d3.max(dataset[i].gdp , function(d){
           return d[1];
         });
   if( currGdp > gdpmax)
          gdpmax = currGdp;
  }
  //由此来定义比例尺的定义域和值域
  var xScale = d3.scale.linear()
                 .domain([2000,2013])
                 .range([0 , width - padding.left - padding.right]);
  var yScale = d3.scale.linear()
                 .domain([0 , gdpmax * 1.1])
                 .range([height - padding.top - padding.bottom , 0]);

  var linePath = d3.svg.line()
                   .x(function(d){ return xScale(d[0]); })
                   .y(function(d){ return yScale(d[1]); });
  //为两条折线设置颜色
  var colors = [d3.svg(0,0,255) , d3.rgb(0,255,0)];
  svg.selectAll("path")
     .data(dataset)
     .enter()
     .append("path")
     .attr("transform" , "translate(" + padding.left + " , " + 
                          padding.top + " ) ")
     .attr("d" , function(d){
           return linePath(d.gdp);//使用线段生成器来计算路径
     })
     .attr("fill" , "none")
     .attr("stroke-width" , 3)
     .attr("stroke" , function(d,i){
       return colors[i];
     });
     
     var xAxis = d3.svg.axis()
                   .scale(xScale)
                   .ticks(5)
                   .tickFormat(d3.format("d"))
                   .orient("bottom");
     //添加一个<g>元素用于放x轴
     svg.append("g")
        .attr("class" , "axis")
        .attr("transform" , "translate(" + padding.left + " , " + 
                       (height - padding.bottom) + " ) ")
        .call(xAxis);
     svg.append("g")
        .attr("class" , "axis")
        .attr("transform" , "translate(" + padding.left + " , " + 
                        padding.top + " ) ")
        .call(yAxis);
  ```

* 动画——过渡效果

  * d3.transition([selection] , [name])

    创建一个过渡对象，参数是选择集，每一个选择集中都有transition方式

  * transition.delay([delay])

    设定延迟的时间，过渡经过一段时间之后才会开始

  * transition.duration([duration])

    设定过渡的持续时间，单位为毫秒

  * transition.ease(value[, arguments ])

    设置过渡样式，例如线性过渡等

  * 例如：

    ```
    svg.append("rect")
        .attr("fill" , "steelblue")
        .attr("x",10)
        .attr("y",10)
        .attr("width",100)
        .attr("height",30)
        .transition()
        .attr("width",300);
        
    var rect = svg.append("rect")
                  .attr("fill" , "steelblue")
                  .attr("x",10)
                  .attr("y",10)
                  .attr("width" , 100)
                  .attr("height" , 30);
     console.log(rect);
     var rectTran = rect.transition();
     console.log(rectTran);
    ```

  * 过渡的属性

    transition.attr(name , value)

    将属性name 过渡到目标值value

    transition.attrTween(name,tween)

    将属性name使用插值函数tween()进行过渡

    ```
    var rect = svg.append("rect")
                  .attr("fill" , "steelblue")
                  .attr("x" , 10)
                  .attr("y" , 10)
                  .attr("width" , 100)
                  .attr("height" , 30);
    var rectTran = rect.transition()
                       .duration(2000)
                       .attrTween("width" , function(d,i,a){
                         return function(t){
                           return Number(a) + t * 300;
                         }
                       });
    //文字也可以使用过渡的效果
    //首先需要声明文字
    var text = svg.append("text")
                  .attr("fill","white")
                  .attr("x",100)
                  .attr("y",10)
                  .attr("dy","1.2em")
                  .attr("text-anchor","end")
                  .text(100);
    var initx = text.attr("x");
    var initText = text.text();

    var textTran = text.transition()
                .duration(2000)
                .tween("text",function(){
                  return function(t){
                    d3.select(this)
                      .attr("x",Number(initx) + t * 300)
                      .text(Math.floor(Number(initText)+t*300))
                  }
                });

    ```

  * transition.remove()

    在过渡结束之后，删除被选择的元素，一般用在元素淡出的时候

    ```
    rect.transition()
        .attr("width",0)
        .remove();
    ```

  * 子元素

    在使用selection.transition()的时候，该过渡是对于选择集自身的元素来说的，选择集里面的子元素不受影响。

    如果需要选择子元素，那么就要使用如下方法：

    transition.select(selector) : 选择符合选择器的第一个子元素进行过渡

    transition.selectAll(selector) ：选择符合选择器的所有元素进行过渡

    transition.filter(selector) ：过滤器，与selection.filter()是类似的

    例如：

    ```
    g.transition()
     .select("#rect1")
     .attr("width",300);
    ```

  * each()和call()

    transition.each([type, ] listener)

    type表示的是事件的类型，有start,end,interrupt三个值

    listener是一个监听器函数

    ```
    g.transition()
       .duration(2000)
       .selectAll("rect")
       .each("start" , function(d,i){//在start的事件
         console.log("start");
       })
       .each("end" , function(d,i){
         console.log("end");
       })
       .attr("width",300);
       
    g.transition()
      .duration(2000)
      .selectAll("rect")
      .each("interrupt" , function(d,i){
        console.log("interrupt");
      })
      .attr("width",300);
    setTimeout(function(){
      g.transition()
        .selectAll("rect")
        .attr("width",10);
    } , 1000);
    ```

  * transition.call(function [ ,arguments… ])

    ```
    g.transition()
      .duration(2000)
      .call(xAxis);
    ```

  * 过渡样式

    给定一个插值函数function(t)，t的范围是[0,1]

* 定时器

  每一张图片称为一帧，FPS的意思就是每秒显示的帧数

  setInterval(code , millisec )

  以指定的周期来执行代码，直到clearInterval()被调用或者窗口被关闭

  setTimeout(code,millisec)

  经过指定的时间后执行代码

  d3.timer(function[, delay[, time]])

  相对指定的绝对时间Time延迟delay时长后，调用function

* 绘制散点（应用过渡）

  ```
  function drawCircle(){
    var circleUpdate = svg.selectAll("circle")
                          .data(center);
    var circleEnter = circleUpdate.enter();
    var circleExit = circleUpdate.exit();
    
    circleUpdate.transition()
                .duration(500)
                .attr("cx" , function(d){
                  return padding.left + xScale(d[0]);
                })
                .attr("cy" , function(d){
                  return height - padding.bottom - yScale(d[1]);
                });
    circleEnter.append("circle")
               .attr("fill","black")
               .attr("cx" , padding.left)
               .attr("cy" , height - padding.bottom)
               .attr("r" , 7)
               .transition()
               .duration(500)
               .attr("cx",function(d){
                 return padding.left + xScale(d[0]);
               })
               .attr("cy",function(d){
                 console.log(d[1] + " " + yScale(d[1]));
                 return height - padding.bottom - yScale(d[1]);
               })
               
    //exit部分的处理方法,在这里是慢慢变成白色，并且最后删除
    circleExit.transition()
              .duration(500)
              .attr("fill","white")
              .remove();
  }

  //X轴的生成器
  var xAxis = d3.svg.axis()
                .scale(xScale)
                .orient("bottom")
                .ticks(5);
                
  //绘制x轴
  svg.append("g")
     .attr("class","axis")
     .attr("transform" , "translate(" + padding.left + " , " + 
                            (height - padding.bottom) + " ) ")
  ```

* 简单的动画制作

  * 时钟：

    ```
    function getTimeString(){
      var time = new Date();
      var hours = time.getHours();
      var minutes = time.getMinutes();
      var seconds = time.getSeconds();
      
      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ？ "0" + seconds : seconds;
      
      return hours + ":" + minutes + ":" + seconds;
    }
    ```

* 交互式入门

  ```
  <p id = "mypara" > Click Here </p>
  <script>
       var para = document.getElementById("mypara");
       para.onclick = function(){
         this.innerHTML = "Thank you";
       }
  </script>

  在D3中的写法：
  d3.select("#mypara")
    .on("click",function(){
      d3.select(this).text("Thank you");
    });
  ```

* 鼠标

  ```
  var rect = svg.selectAll("rect")
                .data(dataset)
                .enter()
                .append("rect")
                .attr("fill","steelblue")
                .attr("x",function(d,i){
                  return padding.left + xScale(i);
                })
                .attr("y",function(d){
                  return height - padding.bottom - yScale;
                })
                .attr("width",xScale.rangeBand())
                .attr("height",function(d){
                  return yScale(d);
                })
                .on("mouseover",function(d,i){
                  d3.select(this)
                    .attr("fill","yellow");
                })
                .on("mouseout",function(d,i){
                  d3.select(this)
                    .transition()
                    .duration(500)
                    .attr("fill","steelblue");
                });
  ```

* 键盘事件：

  keydown 当用户按下任意键的时候触发

  keypress当用户按下字符键的时候触发

  keyup 当用户释放键的时候触发

* ```
  var character = { "A" , "S" , "D" , "F"};
  var rects = svg.selectAll("rect")
                 .data(characters)
                 .enter()
                 .append("rect")
                 ,attr("x" , function(d,i){
                   return 10 + i * 60;
                 })
                 .attr("y" , 150)
                 .attr("width",55)
                 .attr("height",55)
                 .attr("rx" , 5)
                 .attr("ry" , 5)
                 .attr("fill" , "black");
                 
   var texts = svg.selectAll("text")
                  .data(characters)
                  .enter()
                  .append("text")
                  .attr("x" , function(d,i){
                    return 10 + i * 60；
                  })
                  .attr("y" , 150)
                  .attr("dx",10)
                  .attr("dy",25)
                  .attr("fill" , "white")
                  .attr("font-size",24)
                  .text(function(d) {
                    return d;
                  });
                 
                 
  //添加监听事件
  d3.select("body")
     .on("keydown" , function(){
       rects.attr("fill" , function(d){
         if(d == String.fromCharCode(d3.event.keyCode)){
           return "yellow";
         }
         else{
           return "black";
         }
       });
     })
     .on("keyup",function(){
       rects.attr("fill" , "black");
     });
  ```

* 触屏：

  ```
  var circle = svg.append("circle")
                  .attr("cx" , 150)
                  .attr("cy" , 200)
                  .attr("r" , 50)
                  .attr("fill" , "blue")
                  .on("touchstart" , function(){
                    d3.select(this).attr("fill" , "yellow");
                  })
                  .on("touchmove" , function(){
                  var pos = d3.touches(this)[0];
                  d3.select(this)
                    .attr("cx" , pos[0])
                    .attr("cy" , pos[1]);
                  });
  ```

* 事件

  根据事件种类的不同，d3.event保存的对象名称和属性是不同的

  当事件对象是MouseEvent时，其成员变量

  screenX  , screenY（其参照点是显示器屏幕的左上角）

  clientX , clientY以浏览器内容区域的左上角为参照点

* 行为

  * 拖拽：d3.behavior.drag：

  ​       drag.on(type [ , listener ]) type是事件类型，被支持的类型有三种

  ​       dargstart,darg,dragend 分别表示拖拽开始，拖拽中，拖拽结束时

  ​      drag.origin([origin]) 设定拖拽的起点

        ```
  svg.selectAll("circle")
     .data(circles)
     .enter()
     .append("circle")
     .attr("cx" , function(d){return d.cx ; })
     .attr("cy" , function(d){return d.cy ; })
     .attr("r" , function(d){ return d.r; })
     .attr("fill" , "black")
     .call(drag);

     var drag = d3.behavior.drag()
                  .origin(function(d,i){
                    return { x: d.cx , y : d.cy }
                  })
                  .on("dragstart" , function(d){
                    console.log("拖拽开始");
                  })
                  .on("dragend" , function(d){
                    console.log("拖拽结束");
                  })
                  .on("drag" , function(d){
                    d3.select(this)
                      .attr("cx" , d.cx = d3.event.x)
                      .attr("cy" , d.cy = d3.event.y)
                  });
        ```

  ​

  * 缩放：d3.behavior.zoom

  ​       zoom(selection)应用此行为到选择集selection

  ​       zoom.translate([translate]) 设定当前的缩放平移向量

  ​       zoom.scale([scale])  设定初始的放大或者缩小量，默认为1

  ​       zoom.center([center])  设定缩放的中心，默认为鼠标当前的位置

  ​       zoom.on(type , listener) 设置事件类型和监听器

  ​