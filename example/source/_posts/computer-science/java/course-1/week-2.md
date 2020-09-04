---
title: 第2周 判断
date: 2020/04/13 19:12:45
categories:
- [计算机科学, Java, 零基础学Java语言-浙江大学-翁恺]
tags:
---

:::note info
以下为个人学习笔记和习题整理
课程：零基础学Java语言-浙江大学-翁恺 @ 中国大学MOOC 
https://www.icourse163.org/course/ZJU-1001541001
:::

# 课堂笔记
## 关系运算
- 六个关系运算符：

运算符 | 意义
|--|--|
== | 相等
!=|不相等
>|大于
>=|大于或等于
<	| 小于
<=|小于或等于

- 关系运算结果为 `true` 或 `false`
 - 优先级
	- 所有关系运算符的优先级比算术运算低，但比赋值运算高
	- 判断是否相等的 == 和 != 优先级比其他的低
	- 连续的关系运算是从左到右进行的
- 判断两个浮点数是否相等的方法
```java
	Math.abs(f1-f2)<0.0000001
```
- 下列表达式中错误的有？
 - [ ] 5 > 3 == 6 > 4
 - [x] 6 > 5 > 4
 - [ ] a == b == true
 - [x] a == b == 6
 - [x] a ==  b > false
 - [x] (a == b) > false
 `true 和 false 不能比较大小`

## 判断语句 if else
```java
if(x < 0) 
{
	...
}
else if(x == 0) 
{
	...
}
else
{
	...
}
```

## 多路分支 switch case

```java
switch (type)
{
    case 1:
    case 2:
        ...
        break;
    default:
        System.out.println(...);
        break;
}
```
- 计算switch后面的控制表达式以后，程序会跳到相应的case，但是如果这个case内部没有break，那么在执行完语句后，就会顺序执行到下面的case，直到遇到break或者switch结束。
	
# 小测验

1. 写出以下代码段的执行结果： {.quiz .essay}
	```java
	int num=34, max=30;
	if ( num >= max*2 )
	    System.out.println("zhang");
	    System.out.println("huang");
	System.out.println("zhu");
	```

	> huang
	> zhu

2. 写出以下代码段的执行结果： {.quiz .essay}
	```java
	int limit = 100;
	int num1 = 15;
	int num2 = 40;
	if ( limit <= limit)
	{
	    if ( num1 == num2 )
	        System.out.println("lemon");
	    System.out.println("lime");
	}
	System.out.println("grape");
	```

	> lime
	> grape

# 编程题
## 题目1. 时间换算（5分）
 - **题目内容**
	UTC是世界协调时，BJT是北京时间，UTC时间相当于BJT减去8。现在，你的程序要读入一个整数，表示BJT的时和分。整数的个位和十位表示分，百位和千位表示小时。如果小时小于10，则没有千位部分；如果小时是0，则没有百位部分；如果分小于10分，需要保留十位上的0。如1124表示11点24分，而905表示9点5分，36表示0点36分，7表示0点7分。
	
	有效的输入范围是0到2359，即你的程序不可能从测试服务器读到0到2359以外的输入数据。
	
	你的程序要输出这个时间对应的UTC时间，输出的格式和输入的相同，即输出一个整数，表示UTC的时和分。整数的个位和十位表示分，百位和千位表示小时。如果小时小于10，则没有千位部分；如果小时是0，则没有百位部分；如果分小于10分，需要保留十位上的0。
	
	*提醒：要小心跨日的换算。*

- **输入格式**
一个整数，表示BJT的时和分。整数的个位和十位表示分，百位和千位表示小时。如果小时小于10，则没有千位部分；如果小时是0，则没有百位部分；如果小时不是0而且分小于10分，需要保留十位上的0。
- **输出格式**
一个整数，表示UTC的时和分。整数的个位和十位表示分，百位和千位表示小时。如果小时小于10，则没有千位部分；如果小时是0，则没有百位部分；如果小时不是0而且分小于10分，需要保留十位上的0。
- **输入样例**
933
- **输出样例**
133

### 解题代码

```java
import java.util.Scanner;

public class Main {

	public static void main(String[] args) {
		Scanner in = new Scanner(System.in);
		
		int bjt = in.nextInt();
		
		int utc = bjt - 800;
		if(utc < 0)
		{
			utc += 2400; // 时为负数，则进行隔日计算
		}
		
		System.out.println(utc);
	}

}
```

## 题目2. 信号报告（5分）
- **题目内容**
	无线电台的RS制信号报告是由三两个部分组成的：
	
	R(Readability) 信号可辨度即清晰度.
	
	S(Strength)    信号强度即大小.
	
	其中R位于报告第一位，共分5级，用1—5数字表示.
	
	> 1---Unreadable
	> 
	> 2---Barely readable, occasional words distinguishable
	> 
	> 3---Readable with considerable difficulty
	> 
	> 4---Readable with practically no difficulty
	> 
	> 5---Perfectly readable
	
	报告第二位是S，共分九个级别，用1—9中的一位数字表示
	
	> 1---Faint signals, barely perceptible
	> 
	> 2---Very weak signals
	> 
	> 3---Weak signals
	> 
	> 4---Fair signals
	> 
	> 5---Fairly good signals
	> 
	> 6---Good signals
	> 
	> 7---Moderately strong signals
	> 
	> 8---Strong signals
	> 
	> 9---Extremely strong signals
	
	现在，你的程序要读入一个信号报告的数字，然后输出对应的含义。如读到59，则输出：	
	`	Extremely strong signals, perfectly readable.	`
- **输入格式**
一个整数，信号报告。整数的十位部分表示可辨度，个位部分表示强度。输入的整数范围是[11,59]内有效的数字，这个范围外的数字不可能出现在测试数据中。

- **输出格式**
一句话，表示这个信号报告的意义。按照题目中的文字，先输出表示强度的文字，跟上逗号和空格，然后是表示可辨度的文字，跟上句号。注意可辨度的句子的第一个字母是小写的。注意这里的标点符号都是英文的。

- **输入样例**
33
- **输出样例**
Weak signals, readable with considerable difficulty.

### 解题代码

```java
import java.util.Scanner;

public class Main {

	public static void main(String[] args) {
		Scanner in = new Scanner(System.in);
		
		int rs = in.nextInt();		
		int readability = rs / 10;
		int strength = rs % 10;
		
		switch(strength)
		{
			case 1:
				System.out.print("Faint signals, barely perceptible");
			break;
			case 2:
				System.out.print("Very weak signals");
			break;
			case 3:
				System.out.print("Weak signals");
			break;
			case 4:
				System.out.print("Fair signals");
			break;
			case 5:
				System.out.print("Fairly good signals");
			break;
			case 6:
				System.out.print("Good signals");
			break;
			case 7:
				System.out.print("Moderately strong signals");
			break;
			case 8:
				System.out.print("Strong signals");
			break;
			case 9:
				System.out.print("Extremely strong signals");
			break;
		}
		
		switch(readability)
		{
			case 1:
				System.out.print(", unreadable.");
			break;
			case 2:
				System.out.print(", barely readable, occasional words distinguishable.");
			break;
			case 3:
				System.out.print(", readable with considerable difficulty.");
			break;
			case 4:
				System.out.print(", readable with practically no difficulty.");
			break;
			case 5:
				System.out.print(", perfectly readable.");
			break;
		}
	}

}
```
