# Fraction Painter

This is a little web project with Javascript and D3.js. Inspired by a TED video about mathemathics I created this, to visualize fractions in a very intuitive way.

Note: Should be more or less working now, but you may find some bugs. Feel free to report them, so I can fix them.

## The way it works

It is very easy. There are two circles and you can control the speed at which they are spinning via entering a fraction on the left-hand side. For example: 1/3 means that the upper circle is spinning one time, while the lower one spins 3 times. The red dots location is determined by the horizontal movement of the upper circle and the vertical movement of its lower companion. The trace which results from the movement of the red dot paints a picture that is individual for every fraction (keep in mind that some fractions can be reduced). This behaviour is long known in mathemathetics, it is called "Lissajous pattern". Note that the phase difference is currently set to [![Tex2Img_1483115074.png](https://s27.postimg.org/5g9m2913n/Tex2_Img_1483115074.png)](https://postimg.org/image/uz1yf9knj/)  but I will make that adjustable in the future, too.

## A screenshot to explain:

[![FractionPainter.png](https://s23.postimg.org/a3o77ynij/Fraction_Painter.png)](https://postimg.org/image/hweuzxthj/)
