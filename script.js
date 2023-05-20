// document.getElementById("sac-ids").innerHTML = "Test";
// document.getElementById("result1").innerHTML = "Test";
// document.getElementById("result1").innerHTML = "yourTextHere";

chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.executeScript(tab.id, {
    code: `
      var divElement = document.getElementById('sap-ui-static');
      var result = divElement ? true : false;
      console.log(result);
  
      chrome.runtime.sendMessage({ elementExists: result });
    `,
  });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  document.getElementById("result1").innerHTML = "Test";
  if (request.elementExists !== undefined) {
    // Pass the result back to the extension's popup or options page
    chrome.extension
      .getViews({ type: "popup" })[0]
      .document.getElementById("result1").textContent = request.elementExists
      ? "Element exists"
      : "Element does not exist";
  }
});
