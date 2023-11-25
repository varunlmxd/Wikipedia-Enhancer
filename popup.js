// popup.js



document.addEventListener("DOMContentLoaded", function () {
    const fontColorPicker = document.getElementById("fontColorPicker");
    const colorPicker = document.getElementById("colorPicker");
    const applyButton = document.getElementById("applyButton");
    const addButton = document.getElementById("addButton");
    const subButton = document.getElementById("subButton");
    const resetButton = document.getElementById("resetButton");
    // Load the current background color from storage and set the color picker value

    document.getElementById("fontApplyButton").addEventListener("click", function () {
      const fontColor = fontColorPicker.value;
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {
          action: "changeFontColor",
          fontColor: fontColor
        });
      });
    });

    document.getElementById("applyFont").addEventListener("click", function () {
      const fontFamily = document.getElementById("fonts").value;
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {
          action: "changeFontFamily",
          fontFamily: fontFamily
        });
      });
    });
  
    addButton.addEventListener("click", function () {
      // Send a message to content.js to change the background color
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const activeTab = tabs[0];
        chrome.tabs.executeScript(
          activeTab.id,
          {
            code: 'window.getComputedStyle(document.body).fontSize;'
          },
          function(result) {
            let fontSize = parseInt(result[0]) + 1;
            chrome.tabs.sendMessage(activeTab.id, {
              action: "changeFontSize",
              fontSize: fontSize
            });
          }
        );
      });
    });

    subButton.addEventListener("click", function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const activeTab = tabs[0];
        chrome.tabs.executeScript(
          activeTab.id,
          {
            code: 'window.getComputedStyle(document.body).fontSize;'
          },
          function(result) {
            let fontSize = parseInt(result[0]);
            if(fontSize > 4 ){
            fontSize -= 1;
            chrome.tabs.sendMessage(activeTab.id, {
              action: "changeFontSize",
              fontSize: fontSize
            });
            }
            console.log("f: ",fontSize);
            
          }
        );
      });
    });

    applyButton.addEventListener("click", function () {
      const backgroundColor = colorPicker.value;
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {
          action: "changeColor",
          backgroundColor: backgroundColor,
        });
      });
    });

    resetButton.addEventListener("click", function () {
      colorPicker.value = "#ffffff";
      // Send a message to content.js to change the background color
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {
          action: "reset",
        });
      });
    });

    chrome.storage.sync.get({ backgroundColor: "#ffffff", fontSize: 16,fontFamily:"Arial", fontColor:"#000000"  }, function (result) {
      colorPicker.value = result.backgroundColor;
      fontColorPicker.value = result.fontColor;
      console.log("f: ",result.fontSize);
      const body = document.querySelectorAll("body:not(.popup-body),p:not(.popup-body), h1:not(.popup-body),h2:not(.popup-body),h3:not(.popup-body),h4:not(.popup-body),h5:not(.popup-body),h6:not(.popup-body),ul:not(.popup-body), button:not(.popup-body), form:not(.popup-body), span:not(.popup-body), ::after:not(.popup-body), figcaption:not(.popup-body), figure:not(.popup-body), table:not(.popup-body), input:not(.popup-body), img:not(.popup-body), div:not(.popup-body), [main]:not(.popup-body), a:not(.popup-body)");
    body.forEach(element => {
      element.style.fontSize = result.fontSize + 'px';
      element.style.fontFamily = result.fontFamily;
    })
    const elements = document.querySelectorAll(" p:not(.popup-body), h1:not(.popup-body), h2:not(.popup-body), h3:not(.popup-body), h4:not(.popup-body), h5:not(.popup-body), h6:not(.popup-body), ul:not(.popup-body), button:not(.popup-body), form:not(.popup-body), span:not(.popup-body), figcaption:not(.popup-body), input:not(.popup-body)");
    elements.forEach(element => {
      element.style.color = result.fontColor;
    });
    });

  });
  