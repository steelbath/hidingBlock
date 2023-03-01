browser.runtime.onMessage.addListener((request) => {
  if (document.querySelector(".blockExtenstionContainer")) {
    document.querySelector(".blockExtenstionContainer").remove();
  } else {
    /* insert css resource  */
    var link = document.createElement("link");
    link.href = browser.runtime.getURL("blackboxStyle.css");
    link.rel = "stylesheet";
    document.getElementsByTagName("head")[0].appendChild(link);

    var box = document.createElement("div");
    box.className = "blockExtenstionContainer";
    box.innerHTML =
      '<div class="grabElement dragNW"></div><div class="grabElement dragN"></div>    <div class="grabElement dragNE"></div>    <div class="grabElement dragW"></div> \
       <div class="grabElement dragE"></div>    <div class="grabElement dragSW"></div>    <div class="grabElement dragS"></div>    <div class="grabElement dragSE"></div>';
    document.body.appendChild(box);

    function receiveClick(e) {
      if (this == e.target) {
        this.addEventListener("mousemove", drag);
        let tElement = this;
        this.xpos = this.offsetLeft;
        this.ypos = this.offsetTop;
        document.addEventListener("mouseup", () =>
          tElement.removeEventListener("mousemove", drag)
        );
      }
    }

    function drag(e) {
      this.style.left = this.xpos + e.movementX + "px";
      this.xpos += e.movementX;
      this.style.top = this.ypos + e.movementY + "px";
      this.ypos += e.movementY;
    }

    function handleResizer(e) {
      e.preventDefault();
      let dir = this.className.split(" ")[1];
      let parent = this.parentElement;
      let xsize,
        ysize,
        left,
        top = false;
      let xpos = parent.offsetLeft;
      let ypos = parent.offsetTop;
      switch (dir) {
        case "dragNW":
          xsize = ysize = left = top = true;
          break;
        case "dragNE":
          xsize = ysize = top = true;
          break;
        case "dragSW":
          xsize = ysize = left = true;
          break;
        case "dragSE":
          xsize = ysize = true;
          break;
        case "dragN":
          ysize = top = true;
          break;
        case "dragW":
          xsize = left = true;
          break;
        case "dragE":
          xsize = true;
          break;
        case "dragS":
          ysize = true;
          break;
      }

      function resize(e) {
        e.preventDefault();
        let signx, signy;
        let res;
        if (left) signx = -1;
        else signx = 1;
        res = parent.offsetWidth + e.movementX * signx;

        if (res >= 20) {
          if (left) parent.style.left = parent.offsetLeft + e.movementX + "px";
          if (xsize) parent.style.width = res + "px";
        }

        if (top) signy = -1;
        else signy = 1;
        res = parent.offsetHeight + e.movementY * signy;
        if (res >= 20) {
          if (top) parent.style.top = parent.offsetTop + e.movementY + "px";
          if (ysize) parent.style.height = res + "px";
        }
      }

      document.addEventListener("mousemove", resize);
      document.addEventListener("mouseup", () =>
        document.removeEventListener("mousemove", resize)
      );
    }

    box.addEventListener("mousedown", receiveClick);
    document.querySelectorAll(".grabElement").forEach(function (el) {
      el.addEventListener("mousedown", handleResizer);
    });
  }
});
