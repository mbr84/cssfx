#CSSfx
A treasure trove of CSS demos.
[Live Site](https://mbr84.github.io/cssfx/index.html "Live")

![main view](/public/images/front-page.png "Main page")
A static site showcasing just a few of the amazing things you can do with HTML5, CSS3, and - here and there - a little Javascript.
##Features and Implementation

###Bi-Directional Scrolling

Maybe the coolest - and definitely the flashiest - part of the CSSfx is it's bi-directional scrolling, activated by scrolling, pressing the arrows, or clicking the nav buttons at the top of the screen. 

V2.0 is now up and running - written with RxJS, what was a hairy, complicated and difficult to read web of interdependent events and callbacks, is now a remarkably simple, readable, even elegant piece of reactive programming. [Check out the code here](https://github.com/mbr84/cssfx/blob/master/public/rxjsScroll.js).

![scroll effect](/public/images/scroll.gif)

There were two big obstacles to implementing this nifty effect: the event listener, and browser performance.

####Scroll Events

When you scroll with you fingers on a trackpad, the browser doesn't just render one event, but many hundreds. This is what allows you to swipe once or twice and travel the length of an entire page. Here, I wanted the scroll events to trigger a single change on the page. So when listening for a scroll, one has to throttle the event listener just enough to prevent the page from moving through multiple screens at once, but not so much that the site becomes unresponsive to a user who wants to move quickly through the site.

 ~~~~
 $('.left-scroll').css({ top: `calc(${top} ${operand} 100%)` });
 $('.right-scroll').css({ bottom: `calc(${bottom} ${operand} 100%)` });

 ...

wheels.map(wheel => wheel.deltaY)
        .filter(dY => Math.abs(dY) > 75)
        .throttleTime(700)
 ~~~~

The natural thing to do here is throttle or debounce the scroll events, and that I did; but it wasn't quite enough, as the neither a throttle nor a debouncer can distinguish between the lingering effects of a completed scroll and the first effects of a new one. What's more, setting the debouncer to wait until the very last effects of an aggressive track-pad scroll were finished made the feature very slow and the site clunky and unresponsive. To solve this, I noticed that scroll events lingering at the end of the chain of scroll events tend to have very low delta properties (the measure of the scroll's vertical displacement). Instead of sending every scroll event through the debouncer, I only sent those with a deltY property of greater than 75.

####Optimizing CSS

CSSfx is a heavy load on the browser. There are some pretty large images up and down the site, and a whole lot of transitions. To keep the screen transitions running smoothly, it's necessary to know a little bit about something called the **Critical Rendering Path**.

The thing to know here, without delving to deeply, is that the browser renders a pages on the web in a certain order. Some elements effect the geometric relations between elements on the page; others effect color; others still effect neither of these: they occur in the final "Composite" step, after everything else has already been calculated.

`transform` is a composite property. We can put a transition on `transform` without having to recalculate the layout or color ('Paint') of the page, because the element is just being repositioned absolutely with respect to itself and its original position. A flex property like `justify-content` on the other hand, affects the layout of the page. If we put a transition on it, or more plausibly on something like `top` or `bottom`, the browser will first recalculate that property, and then recalculate every property in the 'Paint' step, and finally recalculate every property in the 'Composite' step. All these recalculations have a severe impact on browser performance, and it's reflected in the transitions' suboptimal and unpredictable frame-rates, or more colloquially, their jankiness.

On a site like CSSfx, with a ~1500 line stylesheet, recalculating the entire layout, paint, and composition of the site whenever we scroll isn't just a bad plan, it's one that would cripple performance. Thus, all the scroll effects are accomplished with transforms, and the left and right scroll panes each have a `will-change: transfrom;` property set, to ensure the transform transitions are performed without even triggering recalculations on other properties in the same (composite) tier of the critical rendering path as transform.

Check out [CSStriggers](https://csstriggers.com/) for a great glossary of CSS properties and their place in the Critical Rendering Path.

###Other Features

To read more code, visit the site. See something you like? the code will be to the right.
