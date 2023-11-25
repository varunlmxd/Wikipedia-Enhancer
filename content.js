// content.js

// Function to apply the background color
function applyBackgroundColor(color) {
  document.body.style.backgroundColor = color;
  const style = `background-color: ${color} !important;`;
  const style1 = `background: ${color} !important;`;
  function applyStyle(element) {
    element.style = `${style};`;
  }
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const newElements = node.querySelectorAll(" ul, button:not(.popup-body), form, span, ::after, figcaption, figure, table, input:not(.popup-body), img, div, [main], a");
            newElements.forEach(applyStyle);
          }
        });
      }
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });

  const Elements = document.querySelectorAll(" ul, button:not(.popup-body), form, span, ::after, figcaption, figure, table, input:not(.popup-body), img, div, [main], a");
  Elements.forEach(p => {
    p.style.setProperty("background-color", color, "important");
    // p.style.backgroundColor = color;
  });
  }

  
  function applyFontSize(size) {
    const style = `font-size: ${size}px !important;`;
    const body = document.querySelectorAll("body,p, h1,h2,h3,h4,h5,h6,ul, button:not(.popup-body), form, span, ::after, figcaption, figure, table, input:not(.popup-body), img, div, [main], a");
    body.forEach(element => {
      element.style.fontSize = size + 'px';
    })
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const newElements = node.querySelectorAll("body,p, h1,h2,h3,h4,h5,h6,ul, button:not(.popup-body), form, span, ::after, figcaption, figure, table, input:not(.popup-body), img, div, [main], a");
              newElements.forEach(applyFontSize);
            }
          });
        }
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
    console.log("done")
  }

  function applyFontFamily(fontFamily) {
    const elements = document.querySelectorAll("body, p, h1, h2, h3, h4, h5, h6, ul, button:not(.popup-body), form, span, ::after, figcaption, figure, table, input:not(.popup-body), img, div, [main], a");
    elements.forEach(element => {
      element.style.fontFamily = fontFamily;
    });
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const newElements = node.querySelectorAll("body, p, h1, h2, h3, h4, h5, h6, ul, button:not(.popup-body), form, span, ::after, figcaption, figure, table, input:not(.popup-body), [main], a");
              newElements.forEach(applyFontFamily);
            }
          });
        }
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
 
  async function applyFontColor(fontColor) {
    console.log("lol")
    const elements = document.querySelectorAll("body, p, h1, h2, h3, h4, h5, h6, ul, button:not(.popup-body), form, span, ::after, figcaption, figure, table, input:not(.popup-body), img, div, [main],ul");
    console.log("lol")
    elements.forEach(element => {
      element.style.setProperty("color", fontColor, "important");
    });
    console.log("laugh")
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const newElements = node.querySelectorAll("body, p, h1, h2, h3, h4, h5, h6, ul, button:not(.popup-body), form, span, ::after, figcaption, figure, table, input:not(.popup-body), img, div, [main],ul");
              newElements.forEach(applyFontColor);
            }
          });
        }
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // Load user preferences from storage and apply
  chrome.storage.sync.get({ backgroundColor: "#ffffff",fontSize:16,fontFamily:"Arial" ,fontColor:"#000000"}, function (result) {
    applyBackgroundColor(result.backgroundColor);
    const body = document.querySelectorAll("body:not(.popup-body),p:not(.popup-body), h1,h2,h3,h4,h5,h6,ul, button:not(.popup-body), form, span, ::after, figcaption, figure, table, input:not(.popup-body), img, div, [main], a");
    body.forEach(element => {
      element.style.fontSize = result.fontSize + 'px';
      element.style.fontFamily = result.fontFamily;
    })
    const elements = document.querySelectorAll("body, p, h1, h2, h3, h4, h5, h6, ul, button:not(.popup-body), form, span, ::after, figcaption, figure, table, input:not(.popup-body), img, div, [main],ul");
    elements.forEach(element => {
      element.style.setProperty("color", result.fontColor, "important");
    });
  });
  

  // Listen for changes in the popup and update the background color accordingly
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "changeColor") {
      const backgroundColor = request.backgroundColor;
      applyBackgroundColor(backgroundColor);
      // Save the new color to storage
      chrome.storage.sync.set({ backgroundColor });
    }
    if (request.action === "changeFontSize") {
      const fontSize = request.fontSize;
      applyFontSize(request.fontSize);
      console.log(fontSize);
      // Save the new color to storage
      chrome.storage.sync.set({ fontSize });
    }
    if (request.action === "changeFontFamily") {
      const fontFamily = request.fontFamily;
      applyFontFamily(request.fontFamily);
      console.log(fontFamily);
      // Save the new color to storage
      chrome.storage.sync.set({ fontFamily });
    }
    if (request.action === "changeFontColor") {
      const fontColor = request.fontColor;
      applyFontColor(fontColor);
      console.log(fontColor);
      // Save the new color to storage
      chrome.storage.sync.set({ fontColor });
    }
    if (request.action === "reset") {
      const fontSize = 16 ;
      const backgroundColor = "#ffffff";
      const fontFamily = "Arial";
      const fontColor ="#000000";
      console.log("hello")
      applyBackgroundColor(backgroundColor);
      applyFontSize(fontSize);
      applyFontFamily(fontFamily);
      applyFontColor(fontColor)
      // Save the new color to storage
      chrome.storage.sync.set({ backgroundColor });
      chrome.storage.sync.set({ fontSize });
      chrome.storage.sync.set({ fontFamily });
      chrome.storage.sync.set({ fontColor });
    }
  });
  