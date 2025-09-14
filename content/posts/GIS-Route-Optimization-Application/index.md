+++
date = '2025-04-02T00:00:00-00:00'
draft = false
title = 'GIS Route Optimization Application'
+++

This is one of my second year course project. The name of this GIS software is **Delivery Duo**, which means a good helper of delivery drivers.

## Presentation Slides
[ECE297-OP2](/lihaozhe-website/portfolio/ECE297-OP2.pdf)

## Tech Stack

- C++
- GTK3
 
The program is developed on Debian 11 + Mate Desktop Environment

## Technical Features
- Support raw data, the app can process raw geographic data to create a dynamic map
- Supports multithreading to maximize utilization of machine resources for calculating shortest paths, multiple stops, and coordinate transformations.
- Utilized TomTom API to display real time traffic.
- **A* Algorithm** was implemented for finding the shortest path, while **Dijkstra Algorithm**, **Multi-Start Greedy Method** and **Simulated Annealing** was implemented to find the multi-stop route planning.

# User Manual (User Side Features)

## Introduction

**Delivery Duo** is a GIS software based on GTK3 and C++, aim to help delivery drivers have better navigation experience.

Delivery Duo supports users to import map data in `.bin` file by themselves, the map can directly load and display map data. So, if you can't find a specific map in the map list, you can import the data by yourself.


<br>


## Features

### 1. Main Interface

This is the main interface of Deliver Duo.

![1](1.png) <br>
**Figure 1: Functionalities of buttons**


<br>

### 2. Dark Mode

To toggle dark mode, click on “Toggle Dark Mode” button on the right panel to turn on, click again to turn off.
![2](2.png) <br>

**Figure 2: Dark Mode Appearance**


<br>

### 3. Live Traffic

Live traffic is available for many popular western cities, but is currently unavailable for many Asian cities.

Traffic jam will be shown as red solid lines on the map (Figure 4).

![3](3.png) <br>

**Figure 3: Traffic jam shown as red solid lines**

> Note: Our live traffic data is obtained from TomTom platform: https://www.tomtom.com. Real-time data may deviate from the actual situation, and the platform does not provide data for most Asian cities. We are not responsible for data errors.

<br>

### 4. Zoom in, Zoom out and Move

To move on Delivery Duo, simply hold mouse 1 and drag the canvas of on the left side, or click the arrow buttons on the right side.

To zoom in or zoom out, simply put the cursor on the canvas and scroll up and down, or click the `Zoom In` and `Zoom Out` button on the right side.

To reset zoom level, click on `Zoom Fit` on the right side.

> Note: Minor roads and POIs are hidden automatically in low zoom level, to see detailed street names and POI names, zoom in to high zoom level.

<br>

### 5. How to search an intersection?

If you wanna find an intersection by 2 street names, use the search boxes on the right of the map.

Enter the name of two streets into the search box, and press enter, the map will automatically zoom in to the intersection you searched.

<br>

The search box provide **autocomplete** feature. 

An example use is provided below:

![5](5.gif) <br>
**Figure 5.1: Search an intersection by 2 street names**


<br>

### 6. How to use the **Navigation** feature

To use navigation, you should set a start point and a destination on the map. There are 2 ways to select start point and destination point.

#### 1. Select by clicking on intersections on the map canvas

Zoom in and click on an intersection on the map to select a start point, and click on another intersection as the destination. The selected intersection will display a red dot on it (Figure 1). 


![6.11](6.11.png) <br>
**Figure 6.11: Red dot for selected point**

You can also search for an intersection of two streets by using the search box, once the intersection is found, it will be selected autometically (Figure 6.12). The way to use the search box was shown in [How to search an intersection](#5-how-to-search-an-intersection).

> It should be noted that the click and search-based methods of selecting intersections for path-finding can be mixed - that is, a user can click on one intersection to set it as the starting point and search for another (by entering the two street names that form it) to select it as the destination, and vice versa.

![6.12](6.12.png) <br>
**Figure 6.12: Red dot for selected point**

Once you select, a clear, fast route will be displayed (Figure 6.2).

![6.2](6.2.png) <br>
**Figure 6.2: Navigation route**

Now, click on the “Directions” button on the right side, the travel direction text will display (Figure 3).

![6.3](6.3.png) <br>
**Figure 6.3: Travel Direction Text Window**



> **Note:**
To cancel a selected point, just click the red dot again to deselect. 
To cancel a selected route, randomly select another intersection, this will automatically cancel the display of route.



Example use:

![6.4](6.4.gif) <br>
**Figure 6.4: Example Use of Navigation**

<br>


## About

Authors: Kia Salehzadeh, Magnolia Liu, Haozhe Li

<br>