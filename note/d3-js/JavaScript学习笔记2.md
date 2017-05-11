##### javascript学习笔记2

* 综合运用：总的来说，html用来描述内容是什么，而css主要是用来描述如何进行表现

* id的样式设计：

  *  \#siderbar{

    width : 25%; 使用百分比表示的是区域块的宽度和高度

    height:100%;

    float : left; 表示的是向左浮动

    clear:left;  表示清除浮动

    border:1px solid  gray; 定义区域块的边框，依次为宽度，样式，颜色

    border-radius:5px;

    }

* javascript

  * 在html中如何使用javascript：

    <script type="text/javascript">

    <script src = "http://d3js.org/d3.v3.min.js "  charset="utf-8" >

    src属性指向的是外部链接的文件

  * JavaScript中的数据类型：

    * boolean： 包括false和true，能转化成false的主要是：0，NaN，undefined，null，空字符串

    ​       其他的均转化成true

    * undefined，null（两者之间较为相似，但是null表示的是一个空对象，其实是不存在的，但是undefined是一个对象，只是类型还没有确定而已）

      null的变量使用typeof检测的话结果会是object

      var o = null ;  console.log(typeof o) //object  

      null在基础上表示的还是一个对象，但是对象被清除，与指针中是类似的。

    * number:最大值为Number.MAX_VALUE,最小值为Number.MIN_VALUE

    * string: 字符串可以用单引号或者是双引号来表示

    * object：是拥有属性和方法的数据类型，属性是与对象相关的值，方法是在对象上执行的动作。

      如何创建： var person = new Object（）；

      可以为其添加属性和方法： person.name = " Xiaogang Xu"  person.age = 20  

      person.growUp = function() {

         this.age += 1

      }

  * 对于在javascript中的对象如何进行定义：

    function Person (name,age){

    this.name =name;

    this.age = age;

    this.growUp = function () {

    ​    this.age +=1 ;

    ​       }

    }

    var Xiaogang = new Person("Xiaogang" , 18);

    调用对象的属性:

    *  console.log(Xiaogang.name)    ; //小圆点   
    *  console.log(Xiaogang["name"]);  //方括号 使用方括号调用函数:Xiaogang["growUp"]（）

  * 数组： 在JavaScript中的数组其实是一个对象。数组项其实就是数组的属性，可以通过1，2....等来进行类似对象属性的调用。

    数组长度的获取：console.log(city.length)

    push:在末尾添加项， pop：将末尾项删除并且返回  shift：将第一项删除并且返回 unshift：从最前面推入项。

* DOM

  * DOM指的是文档对象模型，是针对结构化文档的一个接口。它允许程序和脚本动态地访问和修改文档。其中针对HTML模型的称为是HTML.DOM。D3js的许多函数都是以DOM为原型的。

  * DOC是用树状结构来描述HTML文档的，称为节点树。html的元素都是树上的一个节点。DOM对整个html进行了描述，可以通过DOM直接获得文档中任意html的元素：

    document.getElementById("myid"); //返回Id为myid的元素

    document.getElementByTagName("p")//返回的是所有标签为p的元素

  * 在html DOM中常用的属性如下：

    * innerHTML：元素标签内部的文本，包括HTML标签
    * innerText： 元素标签内部的文本，但是不包括HTML标签
    * outerHTML：包括元素标签自身在内的文本，也包括内部的HTML标签
    * outerText:包括元素标签自身在内的文本，但是不包括HTML标签
    * nodeName：节点的名称
    * parentNode：父节点
    * childNodes：子节点
    * nextSibling：下一个同胞节点
    * previousSibling：上一个同胞节点
    * style：元素的样式

  * 添加和删除节点：

    * 添加：appendChild（）方法，在元素的末尾添加子节点。但是需要满html组织框架下的结构。比如可以在body下添加一个para，但是para下却没有办法添加一个body

    * 删除：

      <body id = "mybody" >

         <p id  = "mypara" > Apple </p>

         <p> Banana </p>

         <script>

      ​        var para = document.getElementById("mypara");

      ​        var body = document.getElementById("mybody");

        </script>

      </body>

  * 事件：DOM通过事件与用户进行交互。

* SVG

  * SVG指的是可缩放的矢量图形，是用于描述二维矢量图形的一种图形格式。可以使用xml来定义图形，D3很适合在SVG中绘制图形

  * 位图（Bitmap）由像素进行定义   矢量图（Vector Graphics）不是以像素定义的，是通过线段和区县来进行定义的。

  * 图形元素的使用：

    <svg width = "300"   height = "300"  version="1.1" 

    ​        xmlns = "https://www.w3.org/2000/svg">

    </svg>

    width 和height 主要是用来表示绘制区域的长和宽的、version则主要是表示SVG的版本号。xmlns主要的是命名空间， SVG中预先已经定义七种形状元素：矩形<rect>  圆形<circle> 椭圆<ellipse> 

    线段<line>   折线<polyline>   多边形<polygon>  路径<path>

  * 矩形的参数：x，y，width，height，rx，ry  

    <rect x = "20"  y = "20"   width = "200"   height = "100"

    style = "fill:steelblue ; stroke :bule ; stroke-width :4 ; opacity:0.5"/>

  * 圆形和椭圆型：

    圆形的参数有三个： cx，cy，r

    椭圆的参数有4个：cx，cy，rx，ry

  * 线段：线段的参数主要是起点和终点的坐标：

    x1：起点的x坐标，  y1：起点的y坐标

    x2 , y2

  * 折线和多边形主要是通过point来进定义

  * 路径 主要是使用<path>的标签，给出一个坐标点，在坐标点前面添加一个英文字母，表示是如何运动到此坐标点的，英文字母的功能分类：

    * M = moveto ： 将画笔移动到指定的坐标

    * L = lineto 画直线到指定坐标  H = horizontal lineto 画水平直线到指定的坐标

      V = vertical lineto 画垂直直线到指定坐标

    * C = curveto  S = shorthand/smooth curveto  Q = quadratic Bezier curveto  

      T = Shorthand/smooth quadratic Bezier curveto

    * A = elliptical arc ：画椭圆曲线到指定的坐标

    * Z = closepath：绘制一条直线连接终点和起点，用来封闭图形

  * SVG文字：

    * 使用<text>标签来绘制文字，主要包括的参数有：

      * x:   文字位置的x坐标
      * y：文字位置的y坐标
      * dx：相对于当前位置在x方向上的平移距离，正数向右
      * dy：相对于当前位置在y方向上的平移距离，正数向下
      * textLength是文字的显示长度
      * rotate：旋转角度

    * 示例代码：

      <text x = "200" y = "150"  dx = "-5"  dy = "5"  textLength = "90" >

      ​       I love <tspan fill = "red" > D3 </tspan>

      </text>

  * SVG也支持用CSS选择器给元素定义样式。

    .linestyle{

        stroke : red;
        stroke-wdith : 2;
    }

    <line class = ".linestyle"  x1 = "10" y1 = "10" x2 = "100" y2 = "100" />

    ####也可以直接使用在元素中写样式
    {
        fill： 填充色，改变文字<text>的颜色也可以使用这个
        stroke: 轮廓线的颜色
        stroke-width:轮廓线的宽度
        stroke-linecap:线头端点的样式，包括圆角或者直角等
        opacity：透明度，0.0 为完全透明，1.0为完全不透明
        font-family：字体
        font-size:字体大小
        font-weight:字体的粗细 
        font-style:字体的样式，斜体等
        text-decoration:上画线，或者下画线等
    }

  * 标记<marker>能够依附在<path> <line> <polyline> <polygon>等元素上

    <marker>写在<defs>和</defs>之间，用于定义可以重复利用的图形元素

    最典型的应用就是给线段添加箭头

    viewBox:坐标系的区域

    refX,refY:在viewBox内的基准点，绘制时此点在直线端点上

    markerUnits:标记大小的基准，有两个值：strokeWidth：线宽  userSpaceOnUse：线前端的大小

    markerWidth,markerHeight:标识的大小

    orient:绘制方向，可以设定为auto

    id：标识的ID号

    在使用的时候：

    <line x = ""   y = ""   x2 = ""  y2 = "" 

      stroke = "red"   stroke-wdith = "2"

      marker-end = "url(#arrow)" />

    marker的ID被设置为arrow，并且需要通过#arrow进行调用

    url可以说是函数的调用形式，而#arrow主要的就是输入的参数

  * 滤镜：

    滤镜的标签为<filter> 也是在<defs>中定义的

  * 渐变：

    线性渐变<linearGradient> 放射性渐变<radialGradient>

* 使用D3库的时候会因为不同的浏览器产生不同的效果，可以将网页文件html全部都放到Web服务器上进行测试

* d3对象的使用中主要还包括select的选择集赋值：

  ```var p = d3.select(&quot;body&quot;)
  var p = d3.select("body")
            .selectAll("p")
            .text("Hello world");
  p.style("color","red");
  p.style("font-size","72px");
  ```

* 绘制矢量图

  * <body>中的<svg>标签

    ```
    var width = 400;
    var height = 400;
    var sbg = d3.select("body")
                .append("svg")
                .attr("width",width)
                .attr("height",height)
               
    ```

* 进行调试

  常见的调试方式有两种：

  * 输出到控制台console.log

    在控制台窗口中输出变量error的内容：

    ```
    console.log(error)
    ```

  * 弹出窗口提示错误

    主要使用函数alert( ）:

    ```
    alert(error)
    ```

* 选择元素

  选择元素的函数有两个：select和selectAll

  select：返回匹配选择器的第一个元素

  selectAll：返回匹配选择器的所有元素

  使用getElementById选择的元素要用select

  使用getElementsByClassName的元素要使用selectAll

* 选择集

  选择集是d3.select和d3.selectAll返回的对象

  * 查看状态的函数

    ```
    selection.empty() //选择集是否为空
    selection.node() //返回选择集的第一个非空元素
    selection.size()//返回选择集中的元素个数

    示例代码：
    <p> Paragraph1 </p>
    <p> Paragraph2 </p>
    <p> Paragraph3 </p>
    <script>
        var paragraphs = d3.selectAll("p");
        console.log(paragraphs.emoty());
        console.log(paragraphs.node());
        console.log(paragraphs.size());
    </script>

    ```

  * 设定和获取属性：

    例如需要给<p> This is a paragraph </p>设定一个ID，那么可以用以下的语句来实现

    1. <p id = "para" > This is a paragraph </p>
    2. d3.select("p").attr("id","para");

    selection.attr(name[,value]); 设置或者获取选择集的属性

    selection.classed(name[,value]); 设定或者获取选择集的CSS类 ,name 是一个类名，value是一个布尔值，布尔值表示该类是否开启

    selection.style(name[,value[,priority]]) 设定或者获取选择集的样式。其中name是样式名，value是样式的值

    selection.property(name[,value]) 设定或者获取选择集的属性，name是属性名，value是属性值

    例如获取输入文本的属性值：

    <input id = "fname"  type="text"  name="fullname" />

    d3.select("#fname").property("value")

    selection.text([value]) 设定或者获取选择集的文本内容

    console.log(d3.select("p").text() ); //注意只是输出文本，没有其他的例如<span>等标签

    selection.html([value]) 设定或者获取选择集内部html的内容

    可以将<p>元素设定时候的所有Html语言全部输出

* 添加，插入和删除：

  * selection.append(name)

    在选择集的末尾添加一个元素

  * selection.insert(name[,before])

    在选择集中的指定元素之前插入一个元素，before是CSS选择器名称

  * selection.remove(   ）

    删除选择集中的元素

* 数据绑定

  * selection.datum（[value])

    选择集中的每一个元素都绑定相通的数据value

  * selection.data([value[,key]])

    选择集中的每一个元素分别绑定values的每一项，key是一个键函数

* datum()的工作过程

  * 对于选择集中的每一个元素，都为其增加一个/_data_的属性

  * 在这个函数中value不一定要是number，也可以是其他的类型

  * 其源码：

    ```
    d3_selectionPrototype.datum = function(value){
      return arguments.length
            ? this.property("__data__" , value)
            : this.property("__data__");
    }
    ```

  * 例如可以绑定字符串，并且用绑定的字符串去替换

    ```
    <body>
        <p>Fire </p>
        <p>Water</p>
        <p>Wind </p>
        <script>
        var p = d3.select("body").selectAll("p")
        p.datum("Thunder")
          .text(function(d,i)){
            return d + " " + i;
          };
        <.script>
    </body>
    在这里d 指代的就是之前的datum也就是绑定的字符串
    ```

  * 在被绑定数据的选择集之后添加元素，新元素就会继承该数据

* data（）的工作过程

  * 能够将数组各项分贝绑定到选择集的各个元素之上，并且能够指定绑定的规则

  * 使用data()绑定数据的代码如下：

    ```
    var dataset = [3, 6 , 9];

    //选择body中的p元素
    var p = d3.select("body").selectAll("p");

    //绑定数据到数据集
    var update = p.data(dataset);

    //输出绑定的结果
    console.log(update);
    ```

  * update：数组长度 = 元素数量   enter：数组长度 > 元素数量

    exit：数组长度 < 元素数量

  * data（）函数中返回的是一个对象，对象中包含的是update的部分。另外还有因为存在数组长度与元素之间关系的enter()函数：返回enter部分的元素，一个是exit()返回exit部分

* 绑定的顺序：

  * data()在一般的情况下是按照索引号顺序进行绑定的。如果需要自己指定顺序，那么就需要使用一个键函数（key function） 

  * ```
    <body> 
        <p></p>
        <p></p>
        <p></p>
        <script>
          var person = [{id:3 , name: "张三"},
                        {id:6 , name: "李四"}，
                        {id：9 ，name: "王五"}]
                        
          var p = d3.select("body").selectAll("p");
          p.data(person)
             .text(function(d){
                return d.id + " : " + d.name;
             });
          </script>
    </body>
    ```

* 选择集的处理

  * enter（）的处理方法

    ```
    var update = p.data(dataset); //获取update部分
    var enter = update.enter;
    update.text(function(d)(return d;)); //update部分的就是可以直接更新需要修改的内容
    enter.append("p")
             .text(function(d){ return d;}); //enter 部分的处理方法是添加元素后再进行修改
    ```

  * exit（）的处理方法

    remove可以删除元素

    ```
    var update = p.data(dataset);
    var exit = update.exit();
    update.text(function(d){return d;});
    exit.remove();   //exit部分的处理方法是删除

    ```

  * 处理模板：

    依据每一个部分的处理规则，可以设计出模板，从而就不需要理会数组长度和元素数量之间的关系

    ```
    var update = p.data(dataset);
    var enter = update.enter();
    var exit = update.exit();
    update.text(function(d){return d;});
    enter.append("p")
          .text(function(d){return d ; } );
    exit.remove();
    ```

  * 过滤器：

    ```
    selction.filter(function(d,i){
      if(d > 20)
          return true;
      else 
          return false;
    })
    ```

  * 选择集的顺序，sort（），sort（）是一个无名函数，可以被称为比较器

    selection.sort(function(a,b){

    ​         return b-a;

    }

    如此可以使得选择集递减排序

  * echo()的应用

    echo允许对选择集的各个元素分别进行处理

    ```
    var persons = [{ id: 1001 , name: "zhangsan"},
                   { id: 1002 , name: "Lisi"}];
    var p = d3.select("body").selectAll("p");
    p.data(persons)
       .each(function(d,i){
         d.age =20;
       })
       .text(function (d,i)){
         return d.id + " " + d.name + " " + d.age;
       }); //each()为每一项都添加了一个age属性
    ```

  * call（）允许将选择集自身作为参数，传递给某一函数

    ```
    d3.selectAll("div").call(myfun)；
    funtion myfun(selection){
      selection.attr("name","value");
    }
    myfun(d3.selectAll("div"));

    ```

* 数组的处理

  * 排序：比较函数的规则：

    function(a,b)  

    如果要a 位于b之前，则返回值小于0

    如果要a位于b之后，则返回值大于0

    如果a与b相等，那么返回值等于0

    * d3.ascending(a,b)

      number.sort(d3.ascengding);

    * d3.descending(a,b)

      number.sort(d3.descending);

  * 求值：求取数组的最大值，最小值等

    d3.function(array [ , accessor])；

    进行处理的就是function这个函数

* 操作数组

  d3.shuffle(array[ , lo[,hi]]) :随机排列数组

  d3.merge(arrays) ：合并两个数组

  d3.paris(array) : 返回邻接的数组对

  d3.range([start, ]stop[, step]) :返回等差数列

  将其组合使用可以获得许多的计算方法

  d3.sum(d3.zip(a,b) , function(d){ return d[0]*d[1];  } );

* 映射（Map）

  * 映射在这里指的是一种数据结构类型，是由一系列的键（key）和值（value）所组成的。每一个key对应一个Value。

  * d3.,map()能够构建映射：

    * ```
      d3.map([object] [,key])
      map.has(key) //如果指定的key存在，则返回true,否则返回false
      map.get(key) //如果指定的key存在，那么返回该key的value，否则就返回underfined
      map.set(key,value) //对指定的key设定value，如果该key存在，那么就覆盖旧value，如果该key不存在，那么就添加一个新的key以及其value
      map.remove(key) //如果指定的key存在，那么就将其与value一起删除，并且返回true，如果不存在，那么就返回false
      map.keys() //以数组的形式返回该map的所有key
      map.values() //以数组形式返回该map的所有value
      map.entries() //以数组的形式返回该map的所有key和value
      map.forEach(function) //分别对该映射中的每一项都调用function函数，function 函数传入两个参数，key和value，分别代表每一项的key和value
      ```

    * 使用实例：

      ```
      var map = d3.map(dataset , function(d){ return d.id ; });
      map.has(1001);
      map.get(1001);

      ```

* 集合（set）

  * d3.set([array])  使用数组来构建集合，如果数组中有重复的元素，那么就添加其中一项
  * set.has(value) 如果集合中有指定元素，那么就返回true
  * set.add(value) 如果该集合中没有指定的元素，那么就将其添加到集合中，并且需要返回该元素
  * set.remove(value) 如果集合中有指定的元素，那么就将删除并且返回true

* 嵌套(Nest)

  * 嵌套结构可以使用键（key），主要是多个键可以一层套一层，使得分类的结果能够越来越具体

  * ```
    var nest = d3.nest()
                  .key(function(d) { return d.year; })
                  .key(function(d) { return d.hometown ; })
                  .entries(person); //指定将应用嵌套结构的数组为persons 
    ```

  * nest.entries(array) //指定数组array将被用于构建嵌套结构

  * nest.sortKeys(comparator)  //按照键对嵌套结构进行排序，接在nest.key()后使用

  * nest.rollup(function) //对每一组节点调用指定的函数function，该函数含有一个参数values，是当前叶子节点的数组。

  * nest.map(array[,mapType])  以映射的形式输出数组

* 柱状图的绘制

  * 矩形与文字：

    ```
    var rect = svg.selectAll("rect")
               .data(dataset)
               .enter()
               .append("rect")
               .attr("fill" , "steelblue")
               .attr("x" , function(d,i){
                 return padding.left + i * rectstep;
               })
               .attr("y" , function(d){
                 return height - padding.bottom - d;
               })
               .attr("width", rectWidth)
               .attr("height" , function(d){
                 return d;
               });
    ```

  * 矩阵添加文字

    ```
    var text = svg.selectAll("text")
                  .data(dataset)
                  .enter()
                  .append("text")
                  .attr("fill" , "white")
                  .attr("font-size" , "14px")
                  .attr("text-anchor" , "middle")
                  ,attr("x" , function(d,i){
                    return padding.left + i * rectStep;
                  })
                  .attr("y",function(d){
                    return height - padding.bottom - d;
                  })
                  .attr("dx" , rectWidth/2)
                  .attr("dy","lem")
                  //在这里的dx,dy都是相对于(x,y)的平移大小
                  //文字的第一个字符是位于起始位置的右方
                  //文字的最后一个字符靠近起始位置
    ```

* 更新数据

  * 数据可能必须要能够随数据进行更新，能够在数据改变的时候自动添加或者删除矩形

    ```
    function draw(){
      var updateRect = svg.selectAll("rect")
                           .data(dataset);
      var enterRect = updateRect.enter();
      var exitRect = updateRect.exit();
      
      var updateText = svg.selectAll("text")
                            .data(dataset);
      var enterText = updateText.enter();
      var exitText = updateText.exit();
    }


    updateRect.attr("fill","steelblue")
              .attr("x",function(d,i){
                return padding.left + i * rectStep;
              })
              .attr("y" , function(d){
                return height - padding.bottom - d; 
              })
              .attr("width",rectWidth)
              .attr("height",function(d){
                return d;
              })
              
    enterRect.append("rect")
             .attr("fill" , "steelblue")
             .attr("x" , function(d,i){
                return padding.left + i * rectStep;
             })
             ,attr("y" , function(d){
               return height - padding.bottom - d;
             })
             .attr("width" , rectWidth)
             .attr("height",function(d){
               return d;
             })

    exitRect.remove();
    ```

    ​