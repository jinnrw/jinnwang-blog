---
title: Build a Text Highlighter in JavaScript
date: "2021-01-15"
tags: ["JavaScript"]
---
HTML supports `<mark>` tag to highlight parts of a text. For people like myself, able to highlight texts while reading web pages gives a more immersive experience. In this post, we will build a widget for users to highlight any selected texts on a web page. 

#### Use Selection & Range objects in Web APIs
In order to get the selected text nodes, first we need to use `window.getSelection()` method to get the `Selection` object. 
Then, retrieve the Range objects by using the `getRangeAt()` method of the Selection object. `Range` object represents a fragment of a document that can contain nodes and parts of text nodes.

Here's the example.
```js
let ranges = [];
sel = window.getSelection();
for(let i = 0; i < sel.rangeCount; i++) {
 ranges[i] = sel.getRangeAt(i);
}
// the return looks like this
Range {startContainer: text, startOffset: 24, endContainer: text, endOffset: 35, collapsed: false, …}
```
Note that `startContainer` is the text node being selected, more importantly, it returns the `startOffset` & `endOffset`, so that we know which part of text being selected. 

Lastly, use `Range.surroundContents()` method to wrap the selected text in a `mark` tag. 

#### A Full Example
```js
function setHighlight() {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const selectionNodeName = range.startContainer.parentNode.nodeName;
  const newParent = document.createElement('mark');

	// Prevent repetitive highlights
  if (!(selectionNodeName === "MARK")) {
    range.surroundContents(newParent);
  }

  // Clear selection
  window.getSelection().empty();
}
```

#### Live Demo 
<iframe width="100%" height="300" src="//jsfiddle.net/jinnwang/3nk9wocp/2/embedded/js,html,css,result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

