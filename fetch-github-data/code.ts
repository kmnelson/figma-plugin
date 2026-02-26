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
    if (msg.type === "draw-circles" && msg.circles && Array.isArray(msg.circles)) {
      const nodes: SceneNode[] = [];
      for (const row of msg.circles) {
        const { x, y, r } = row;
        if (typeof r !== "number" || r <= 0) continue;
        const diameter = 2 * r;
        const ellipse = figma.createEllipse();
        ellipse.resize(diameter, diameter);
        ellipse.x = x - r;
        ellipse.y = y - r;
        ellipse.fills = [{ type: "SOLID", color: { r: 0.2, g: 0.5, b: 0.9 } }];
        figma.currentPage.appendChild(ellipse);
        nodes.push(ellipse);
      }
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
    if (msg.type === "draw-circles" && msg.circles && Array.isArray(msg.circles)) {
      const nodes: SceneNode[] = [];
      for (const row of msg.circles) {
        const { x, y, r } = row;
        if (typeof r !== "number" || r <= 0) continue;
        const diameter = 2 * r;
        const ellipse = figma.createEllipse();
        ellipse.resize(diameter, diameter);
        ellipse.x = x - r;
        ellipse.y = y - r;
        ellipse.fills = [{ type: "SOLID", color: { r: 0.2, g: 0.5, b: 0.9 } }];
        figma.currentPage.appendChild(ellipse);
        nodes.push(ellipse);
      }
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
