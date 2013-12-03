// ==UserScript==
// @name          Move Google Icons Back
// @description   Moves The Icons to other Google Services back to the main Page instead of the Menu
// @author        Chris Finney <cfinney@monetate.com>
// @version       0.1
// @namespace     http://mail.google.com
//
// @match       https://*.mail.google.com/*
//
// ==/UserScript==


(function(){
  ///////////////////////////////////////////////////////////////////////////
    var location = document.location;
    var body = document.body;
    var hostRegex = /mail\.google\.com/;

    var moveAndClone = function() {
        if (hostRegex.test(location.host)) {

          var isAlreadyAdded = function(parent, elem) {
              return Boolean(parent.compareDocumentPosition(elem) && window.Node.DOCUMENT_POSITION_CONTAINS);
          };

          var hideElement = function(cssQuery, elem) {
              var match = getElementByCSS(cssQuery, elem)[0];
              match.style.display = 'none';
          };

          var getElementByCSS = function(query, opt_elem) {
              return (opt_elem || document).querySelectorAll(query);
          };

          var elems = getElementByCSS('div[role=region] ul li');
          var relativeNode = document.getElementById('gb').parentNode;
          var fragment = document.createDocumentFragment();
          var container = document.getElementById('monetate_gmail_override');

          if (!container) {
              container = document.createElement('div');
              container.id = 'monetate_gmail_override';
              var style = 'width:40%; height:84px; margin-top:-10px; margin-left:30%;'+
                              'margin-right:30%; padding:0px; position:relative;'+
                              'white-space: no-wrap; bottom: -10px;';
              container.style.cssText = style;
              fragment.appendChild(container);
          }

          for (var i = 0, len = elems.length; i < 8; i++) {
              var elem = elems[i];
              var newElem = elem.cloneNode();
              hideElement('span:last-child', newElem);
              container.appendChild(newElem);
          }
          relativeNode.insertBefore(fragment);
      }
    };

  var test = function(){
    if((document.body && document.body.children && document.body.children.length > 14)){
        window.clearTimeout(timerId);
        moveAndClone();
    } else if(tries > maxTries) {
        window.clearTimeout(timerId);
    } else {
        tries++;
    }
  };
  // Wait until document.body is available
  var tries = 0, maxTries = 20;
  var timerId = window.setInterval(test,3000);
  //var timerId = window.setTimeout(moveAndClone, 12000);
})();
