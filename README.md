## Try it out!

https://l-sys-viz.netlify.app/

## What did I make?

I made a web app to visualize l-systems via turtle graphics. If you aren't familiar with l-systems, consider a mapping of characters to a string, take "0" -> "01" and "1" -> "0". Given a string, we apply this mapping wherever possible, then repeat using the new string. For example, if we start with "0", we apply "0" -> "01" to obtain "01", then apply "0" -> "01" followed by "1" -> "0" to obtain "010", and so on and so forth. For more detail, check out the wikipedia article: https://en.wikipedia.org/wiki/L-system.

To make specifying the l-system and turtle drawing procedure easier for the user, I  made a fairly simple declarative eDSL in JS. For instructions on how to use the DSL, click on the info icons next to the code form labels, but it should be easy to figure out based on the given examples.

## Why did I make this?

Heard about the use of l-systems to produce vegetation meshes while looking at some graphics research and thought it seemed pretty neat. Also, I hadn't really done anything involving WebGL up until this point, so I thought it would be a good learning experience.

## How did I make this?

React.js and three.js (for displaying 3D shit via WebGL).