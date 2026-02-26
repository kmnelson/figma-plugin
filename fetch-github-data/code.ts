// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// The UI (ui.html) fetches circle data from GitHub and sends it here to draw.

interface CircleRow {
  x: number;
  y: number;
  r: number;
}

if (figma.editorType === "figma") {
  figma.showUI(__html__, { width: 320, height: 200 });

  figma.ui.onmessage = (msg: { type: string; circles?: CircleRow[] }) => {
    console.log("[plugin] Message received:", msg.type, "circles?", !!msg.circles, "isArray?", msg.circles && Array.isArray(msg.circles), "length?", msg.circles && msg.circles.length);
    if (msg.type === "draw-circles" && msg.circles && Array.isArray(msg.circles)) {
      if (msg.circles.length > 0) {
        console.log("[plugin] First circle row:", msg.circles[0], "x type:", typeof msg.circles[0].x, "y type:", typeof msg.circles[0].y, "r type:", typeof msg.circles[0].r);
      }
      const nodes: SceneNode[] = [];
      for (let i = 0; i < msg.circles.length; i++) {
        const row = msg.circles[i];
        const { x, y, r } = row;
        if (typeof r !== "number" || r <= 0) {
          console.log("[plugin] Skip row " + i + ": r=" + r + " (type " + typeof r + ")");
          continue;
        }
        const diameter = 2 * r;
        const ellipse = figma.createEllipse();
        ellipse.resize(diameter, diameter);
        ellipse.x = x - r;
        ellipse.y = y - r;
        ellipse.fills = [{ type: "SOLID", color: { r: 0.2, g: 0.5, b: 0.9 } }];
        figma.currentPage.appendChild(ellipse);
        nodes.push(ellipse);
      }
      console.log("[plugin] Drew", nodes.length, "circles");
      if (nodes.length > 0) {
        figma.currentPage.selection = nodes;
        figma.viewport.scrollAndZoomIntoView(nodes);
      }
      figma.notify(`Drew ${nodes.length} circle(s).`);
    }
    if (msg.type === "cancel") {
      figma.closePlugin();
    }
  };
}

if (figma.editorType === "figjam") {
  figma.showUI(__html__, { width: 320, height: 200 });

  figma.ui.onmessage = (msg: { type: string; circles?: CircleRow[] }) => {
    console.log("[plugin] Message received:", msg.type, "circles?", !!msg.circles, "isArray?", msg.circles && Array.isArray(msg.circles), "length?", msg.circles && msg.circles.length);
    if (msg.type === "draw-circles" && msg.circles && Array.isArray(msg.circles)) {
      if (msg.circles.length > 0) {
        console.log("[plugin] First circle row:", msg.circles[0], "x type:", typeof msg.circles[0].x, "y type:", typeof msg.circles[0].y, "r type:", typeof msg.circles[0].r);
      }
      const nodes: SceneNode[] = [];
      for (let i = 0; i < msg.circles.length; i++) {
        const row = msg.circles[i];
        const { x, y, r } = row;
        if (typeof r !== "number" || r <= 0) {
          console.log("[plugin] Skip row " + i + ": r=" + r + " (type " + typeof r + ")");
          continue;
        }
        const diameter = 2 * r;
        const ellipse = figma.createEllipse();
        ellipse.resize(diameter, diameter);
        ellipse.x = x - r;
        ellipse.y = y - r;
        ellipse.fills = [{ type: "SOLID", color: { r: 0.2, g: 0.5, b: 0.9 } }];
        figma.currentPage.appendChild(ellipse);
        nodes.push(ellipse);
      }
      console.log("[plugin] Drew", nodes.length, "circles");
      if (nodes.length > 0) {
        figma.currentPage.selection = nodes;
        figma.viewport.scrollAndZoomIntoView(nodes);
      }
      figma.notify(`Drew ${nodes.length} circle(s).`);
    }
    if (msg.type === "cancel") {
      figma.closePlugin();
    }
  };
}
