//document.getElementById("result").innerHTML = "Popup Start";

let elementExist = "initial";

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  document.getElementById("result").innerHTML = "Background Message";
  if (request.elementExists !== undefined) {
    elementExist = request.elementExists
      ? "Element exists"
      : "Element does not exist";
  }
});

chrome.action.onClicked.addListener(function (tab) {
  chrome.tabs.executeScript(tab.id, {
    code: `
    var divElement = document.getElementById('sap-ui-static');
    var result = divElement ? true : false;
    console.log(result);

    chrome.runtime.sendMessage({ elementExists: result });
  `,
  });
});

// // Send a message to background.js to initiate the element existence check
//chrome.runtime.sendMessage({ elementExists: true });
//document.getElementById("result").innerHTML = "Popup End";
