* ccs代码主要是用来定义HTML元素的样式，如字体颜色，背景颜色等

* html代码主要是显示用什么

* html是一种标记的语言，主要指的是每一个元素都有其标记标签，比如<html>,<body>

  * 文档的声明：在html5中，主要是<!DOCTYPE  html>

  * 头部：<title> </title> 主要包括的是浏览器标签中的标题，以及在搜索引擎中显示的标题

    <meta> 它没有结束的标签，一般来说<meta>的主要有三部分：

    * http-equiv或者name，主要是用来指定信息的种类的

    * content主要是用来定义此种类的内容，可以包含text/html，HTML,CSS,JavaScript，D3等

    * charset主要还是可以用来指出在网页中进行显示所使用的字体信息

      例如：

      ```
      <meta name="viewport" content="initial-scale=1,maximum-scale=1"/>
      ```

  * link：只要是用来引用之后可能用到的外部资源的，比如css：

    <link rel = "stylesheet"  type = "text/css"  href = "style.css" />

  * style ： 主要是用于在文档中定义css的样式，如果数量很多，建议在外部的文件中定义，之后可以使用link等语句进行引用。

  * scrpit：用于定义客户端脚本，最常见的应该是Javascript脚本

* 属性：在标签的语言中，最主要的还是标签可以使用属性。 一般可以写成 name = " value " 的形式，一般来说在属性的名字处是不需要加引号的，但是在属性值上是需要的。

* 主体： 主体主要是由<body>标签来定义的，主要是用来表示文档的内容的，大多数的HTML元素标签被分为“块级元素”和”内联元素“

  * 块级元素在显示的时候会用新行来表示，

    * 常见的有h1,h2等用来指示不同大小标题的元素

    * p：用来指示段落结束的元素，在末尾会自动换行，p也是段落的指示

    * ul,ol,li等用来表示列表的元素。其中ul表示的是无序列表，ol表示的有序列表。其中li是在其中嵌套用来分开不同的列表元素的标签。

    * 当然还有table的表示，每一行在其中主要是用tr来定义，而每一列主要是用td来定义的。

      <table border = "1" > <tr> <td> 第一行第一列 </td>  </tr>  </table>

    * div：主要是用来定义文档中的分区或者节，内部可以包含任意的元素

  * 内联元素在显示的时候不用新行来表示：

    * a：超链接的标签，例如<a href = "https://     ">  数据可视化 </a  

    * img: 图片，通过src来指定图片URL的地址，alt设定当前图片无法加载的时候显示的文字：

      <img src = "dog.jpg"  alt = "Dog Image" />

    * span:主要是用来组合行内的元素，添加在行内的元素

* 注释：在其中添加注释的方法有: <!— — <p> This is a dog . — — >   

  在javascript中还可以使用// 或者是/*    */的方式来制定相应的注释

* 一个css选择器的设计与使用：

  .pstyle{

  ​       color: red ; 

  ​       background-color : yellow 

  ​      font-size : 22px;

  }

  使用: <p class = "pstyle">      数据可视化   </p>

  * css主要是由两个部分组成的，分别是”选择器的名称“和”属性名称-属性值“。其中需要注意空格的应用，在其中如果有空格，那么属性值上需要加引号：

    h1 { font-family : " sans serif"；}

  * 选择器：元素p可以使用选择器

    元素选择器： p{ color : blue ;}    h1,h2,p{color : blue }    类选择器: .important { color : red ;} 使用类选择器的时候，我们需要在声明中使用关键字class

    ID选择器：希望某个特定的元素具有某种形式的时候可以使用：

    `#index { font-weight : bold ;}  <p id = "index" > Index 1 </p>

    派生选择器：后代选择器 p span { color : red;}    子元素选择器p > span{color : red;}  相邻兄弟选择器: h1 + p { color : red;}

  * 属性名称与属性值：

    主要是在css中出现，它们包括的是：

    尺寸：width和height

    背景：background-color background-image background-position

    ​           background-repeat

    文本：color，line-height 行高  text-align：对齐元素中的文本

    字体： font-family：字体   font-size：字体尺寸 

    ​            font-style：字体风格    font-weight：字体粗细

    边框： padding：内边距   border：边框   margin：外边距

    定位： position：元素是静态的，相对的还是固定的

    ​            top：到上边界的距离     left：到左边界的距离

    ​            right：到右边界的距离    bottom：到下边界的距离

    ​           float：浮动    clear：清除浮动

    ​

    ​

    ​

    ​