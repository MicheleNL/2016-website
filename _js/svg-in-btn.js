/* Add arrrow svg to buttons for inline usage
------------------------------------------------*/
var svgString   = "<svg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='126' height='28' viewBox='0 0 126 28' version='1.1'><title>button_arrow_blue</title><desc>Created with Sketch.</desc><g stroke='none' stroke-width='1' fill-rule='evenodd'><g transform='translate(-1181.000000, -2910.000000)'><g transform='translate(1181.000000, 2910.000000)'><polyline points='122.7 10.9 122.7 11.1 111.7 0 108.8 2.8 117.4 11.9 0 11.9 0 15.8 117.4 15.8 109 25 111.7 27.7 125.4 13.9'/></g></g></g></svg>";
var parser      = new DOMParser();
var doc         = parser.parseFromString(svgString, "image/svg+xml");
var svg         = doc.firstChild;
var elements    = document.querySelectorAll('[role=button], .next-link, .back-to-top');

for (var i = 0; i < elements.length; i++) {
    elements[i].appendChild(svg.cloneNode(true));
}