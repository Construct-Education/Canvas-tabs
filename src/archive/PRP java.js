
  (function() { //method from: https://community.canvaslms.com/thread/22500-mobile-javascript-development
      // The following function will retrieve and load a JavaScript file - https://www.nczonline.net/blog/2009/07/28/the-best-way-to-load-external-javascript/
      function loadScript(url, callback) {
          var script = document.createElement("script");
          script.type = "text/javascript";
          if (script.readyState) { //IE
              script.onreadystatechange = function() {
                  if (script.readyState == "loaded" || script.readyState == "complete") {
                      script.onreadystatechange = null;
                      callback();
                  }
              };
          } else { //Others
              script.onload = function() {
                  callback();
              };
          }
          script.src = url;
          document.getElementsByTagName("head")[0].appendChild(script);
      }

      loadScript("https://combinatronics.com/Construct-Education/Public-Rights-Project/main/code/js/main.js", function() {});
  })();



const constructTabContainers = document.querySelectorAll('.construct-accordion--container-outer');

const initConstructTabs = () => {
    constructTabContainers.forEach(tabContainer => {
        const tabInnerContainers = tabContainer.querySelectorAll('.construct-accordion--container-inner');
        tabInnerContainers.forEach(tab => {
            tab.addEventListener('click', (e) => {
                if (e.target.tagName === 'H2') {
                    const tabState = e.target.parentElement.getAttribute('aria-expanded');

                    switch (tabState) {
                        case 'true':
                            e.target.parentElement.setAttribute('aria-expanded', 'false');
                            break;
                        default:
                            e.target.parentElement.setAttribute('aria-expanded', 'true')
                            return;
                    }

                }
            })
        });
    });
}

if (constructTabContainers) {
    initConstructTabs();
}

// Accordion Alternative Code

var accItem = document.getElementsByClassName('accordionItem');
var accHD = document.getElementsByClassName('accordionItemHeading');
for (i = 0; i < accHD.length; i++) {
    accHD[i].addEventListener('click', toggleItem, false);
}

function toggleItem() {
    var itemClass = this.parentNode.className;
    for (i = 0; i < accItem.length; i++) {
        accItem[i].className = 'accordionItem close';
    }
    if (itemClass == 'accordionItem close') {
        this.parentNode.className = 'accordionItem open';
    }
}