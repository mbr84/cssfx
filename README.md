#CSSfx
A treasure trove of CSS demos.
[Live Site](https://mbr84.github.io/cssfx/index.html "Live")

![main view](/public/images/front-page.png "Main page")
A static site showcasing just a few of the amazing things you can do with HTML5, CSS3, and - here and there - a little Javascript.
##Features and Implementation

###Bi-Directional Scrolling

Maybe the coolest - and definitely the flashiest - part of the CSSfx is it's bi-directional scrolling, activated by scrolling, pressing the arrows, or clicking the nav buttons at the top of the screen.

![scroll effect](/public/images/scroll.gif)

The main challenge here was the event listener. When you scroll with you fingers on a trackpad, the browser doesn't just render one event, but many hundreds. This is what allows you to swipe once or twice and travel the length of an entire page. Here, I wanted the scroll events to trigger a single change on the page. So when listening for a scroll, one has to throttle the event listener just enough to prevent the page from moving through multiple screens at once, but not so much that the site becomes unresponsive to a user who wants to move quickly through the site.
 ~~~~
 $('.left-scroll').css({ top: `calc(${top} ${operand} 100%)` });
 $('.right-scroll').css({ bottom: `calc(${bottom} ${operand} 100%)` });

 ...

 $(document).on('wheel', (e) => {
   if (Math.abs(e.originalEvent.deltaY) > 35) scroll(e);
 });
 ~~~~

The natural thing to do here is debounce the scroll events, and that I did; but it wasn't quite enough, as the neither a throttle nor a debouncer can distinguish between the lingering effects of a completed scroll and the first effects of a new one. What's more, setting the debouncer to wait until the very last effects of an aggressive track-pad scroll were finished made the feature very slow and the site clunky and unresponsive. To solve this, I noticed that scroll events lingering at the end of the chain of scroll events tend to have very low delta properties (the measure of the scroll's vertical displacement). Instead of sending every scroll event through the debouncer, I only sent those with a deltY property of greater than 35.

The final challenge for the scrolling had less to do with the scrolling feature itself, and more to do with the strain of the page itself. With so many moving parts, the browser was having difficult rendering the transitions between on screen and the next smoothly. To solve this, I stopped displaying the demos with they went out of view, and used a CSS3 property called "contain" to inform the browser that changes to the display ("paint") of any given section of the site would not effect changes to the display of the others. These two measures together fixed the jankiness of the screen transitions.

###Other Features

To read more code, visit the site. See something you like? the code will be to the right.
