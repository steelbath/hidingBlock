function clicked() {
  browser.tabs
    .query({ currentWindow: true, active: true })
    .then((tab) => browser.tabs.sendMessage(tab[0].id, "clicked"));
}

browser.action.onClicked.addListener(clicked);

// var iconflip = true;
// var title = browser.action.getTitle().then(() => {
//   console.log("title:  " + title);
// });
// var icon =
//   iconflip == true
//     ? { path: "Images/16cross.png" }
//     : { path: "Images/16.png" };

// console.log(icon);

// browser.action.setIcon(icon);
// iconflip = !iconflip;
