---
title: 第1周 计算
date: 2020/04/12 20:46:25
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
## 读输入、字符串输出
```java scanner
import java.util.Scanner;
...
Scanner in = new Scanner(System.in);
// 输入Scan之后，按下键盘 Alt + “/” 键，Eclipse下自动补全。

System.out.println(in.nextLine());
// 让in这个对象做读入下一行的动作，结果交给System.out这个对象去打印一行。

// 字符串的 + 用来连接两个字符串形成更长的字符串。
System.out.println("Hello" + " world.");
System.out.println("Hello" + 2);
System.out.println("Hello" + 2 + 3);
System.out.println(2 + 3 + "Hello");
```

tips：
- `System.out.println` 会换行，`System.out.print` 则不会换行
- 出现警告：`Resource leak: 'in' is never closed`，可以在函数的最后加入
```java
in.close();//释放
```

## 变量
 - **形式**：<类型名称> <变量名称> = <初始值>
  `int price, amount; // 同时定义两个变量`
  `int price = 0; // 定义变量并赋值`
  `int price, amount = 100, age;`
 - **类型名称**：Java是一种**强类型语言**，所有变量在使用前必须定义或声明，所有变量必须具有确定的数据类型。数据类型表示在变量中可以存放什么样的数据，程序运行过程中也不能改变变量的类型。
 - **变量名称**：又称标识符，只能由字母、数字、下划线构成，数字不能出现在第一个位置。此外，Java的保留字也不能用作标识符。

 - Java的保留字列表

| abstract | do | implements | protected | throws |
|--|--|--|--|--|
| boolean | double | import | public | transient
| break | else | instanceof | return | true
| byte | extends | int | short | try | 
| case | false | interface | static | while  
| catch | final | long | strictfp | void
| char | finally | native | super |  volatile
| class | float | new | switch
| const* | for | null | synchronized
| continue | goto* | package | this
| default | if | private | throw

- 以下哪些标识符是符合规则的？
 - [x] currency
 - [x] lastName
 - [x] fireplace
 - [ ] _last_name
 - [x] xingmin
 - [ ] class
 - [ ] goto
 - [ ] 4ever
 - [ ] time-machine
 - [ ] Int 
 - [ ] $12 
 - [ ] 我是变量

## 常量 final
```java
final int AMOUNT = 100;
// final是一个修饰符，表示这个变量的值一旦初始化，就不能再修改了。
```
## 变量类型
### 整数 int
```java
int price = in.nextInt();
```
 - 如果用户输入的不是整数，则会报错 `java.util.InputMismatchException`。
 -	程序要求读入多个数字时，可以在一行输入，中间用空格分开，也可以多行输入。
 - 每次召唤`in.nextInt()`，它就等待用户输入一个整数。
 - 两个整数的运算结果只能是整数。
 - 在Java中，`10`和`10.0`是完全不同的数。
 
### 浮点数 double
- **浮点数运算有误差**：由于二进制的自身限制，浮点计算需要将十进制先转换为二进制，然后对二进制数进行计算，因此导致误差。

```java
System.out.println(1.2-1.1);
// 结果为 0.09999999999999987
```

 - 整数类型不能表达有小数部分的数；整数运算速度快，占内存小；日常中整数运算多。
 
## 赋值运算
### 强制类型转换
- 浮点数和整数放在一起运算时，Java会将整数转换成浮点数，然后进行浮点数运算。
- 强制性转换的优先级高于四则运算。
```java
double a = 1.0;
double b = 2.0;
int i = (int)a/b; //会报错
int i = (int)(a/b); //不会报错
```
### 运算符优先级
- 单目运算符`+` `-` 优先级最高
- 结合关系一般自左向右，单目`+` `-`和赋值`=`自右向左。
```java
result = a = b = 3 + c;
result = 2;
result = (result = result * 2) * 6 * (result = 3 + result);
```
### 复合赋值
- 5个算术运算符，`+ - * / %`，可以和赋值运算符 `=` 结合起来，形成复合赋值运算。注意，两个运算符中间不要有空格。
```java
total += (sum+100)/2;
total = total + (sum+100)/2;

total * = sum+12;
total = total*(sum+12);

total /= 12+6;
total = total / (12+6);
```
- 递增递减运算符 `++` `--`，给变量+1或-1
- 前缀后缀：
```java
a = 14;
t1 = a++; // t1先被赋值为 a 即14， a自加到 15
t2 = ++a; // a先自加到 15，t2被赋值为 a 即 15
```
	
# 编程题
## 题目1. 温度转换（5分）
- **题目内容**
	写一个将华氏温度转换成摄氏温度的程序，转换的公式是：
	
	`°F = (9/5)*°C + 32`
	
	其中C表示摄氏温度，F表示华氏温度。
	
	程序的输入是一个整数，表示华氏温度。输出对应的摄氏温度，也是一个整数。
	
	提示，为了把计算结果的浮点数转换成整数，需要使用下面的表达式：
	
	`(int)x;`
	
	其中x是要转换的那个浮点数。
	
	*注意：除了题目要求的输出，不能输出任何其他内容，比如输入时的提示，输出时的说明等等都不能。这道题目要求转换后的数字，程序就只能输出这个数字，除此之外任何内容都不能输出。*

- **输入格式**
一个整数。
- **输出格式**
一个整数。
- **输入样例**
100
- **输出样例**
37

### 解题代码

```java
import java.util.Scanner;

public class Main {

	public static void main(String[] args) {
		Scanner in = new Scanner(System.in);
		
		// 获得输入的整数
		int fahrenheit = in.nextInt();
		// 计算摄氏度
		double centigrade = (fahrenheit - 32) / (9 / 5.0);
		// 将浮点数转换为整数输出
		System.out.println((int)centigrade);
	}

}
```
