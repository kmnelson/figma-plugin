# Circle data

JSON array of circle definitions for the fetch-github-data Figma plugin.

**Format:** each element is an object with:

- `x` (number) – center X in pixels
- `y` (number) – center Y in pixels  
- `r` (number) – radius in pixels (must be positive)

The plugin fetches `circles.json` from the **deploy** tag of this repo and draws one circle per row.
