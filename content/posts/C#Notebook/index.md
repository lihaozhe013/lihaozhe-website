+++
date = '2024-10-01T00:00:00-00:00'
draft = false
title = 'C# Notebook'
+++


## C# Traverse All Directories and Files

In your projects, you're bound to occasionally need to iterate over folders. Are you still using recursion? Even fancy LINQ recursion is too cumbersome. Microsoft anticipated this need and implemented it right within the framework.

Traversing a folder requires just one function, without even worrying about recursion. It's truly impressive.

```C#
var files = Directory.GetFiles(@"C:\", "*.*", SearchOption.AllDirectories); // Iterate over all files
var dirs = Directory.GetDirectories(@"C:\", "*", SearchOption.AllDirectories); // Iterate over all folders
```
Or

```C#
var files = Directory.EnumerateFiles(@"C:\", "*.*", SearchOption.AllDirectories); // Iterate over all files
var dirs = Directory.EnumerateDirectories(@"C:\", "*", SearchOption.AllDirectories); // Iterate over all folders
```
Or

```C#
var files = new DirectoryInfo(@"C:\").GetFiles("*.*", SearchOption.AllDirectories); // Iterate over all files and get a collection of FileInfo types
var dirs = new DirectoryInfo(@"C:\").GetDirectories("*", SearchOption.AllDirectories); // Iterate through all folders and get a collection of DirectoryInfo types

var files = new DirectoryInfo(@"C:\").EnumerateFiles("*.*", SearchOption.AllDirectories); // Iterate through all files and get a collection of FileInfo types
var dirs = new DirectoryInfo(@"C:\").EnumerateDirectories("*", SearchOption.AllDirectories); // Iterate through all folders and get a collection of DirectoryInfo types
```
The third parameter, SearchOption.AllDirectories, indicates a search in the current folder and all subdirectories. Pretty cool, right?

"*.*" can also be "*"; the wildcard character is the same. Wildcard characters * and ? are supported, just like in Windows Explorer.

If we add this line:
```C#
var list = files.Union(dirs).OrderBy(s=>s);
```
Wouldn't that allow recursive traversal of both files and folders in the current folder?


> Content reproduced from: [https://masuit.net/1878?t=0HNG06LSDVR5F](https://masuit.net/1878?t=0HNG06LSDVR5F)