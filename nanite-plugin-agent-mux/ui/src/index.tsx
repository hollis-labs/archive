// The widget is exported under two names:
//   * `MuxActivityWidget` — the canonical JS identifier; use for direct imports.
//   * `"mux-activity-widget"` — ES2022 string-named export that matches the
//     kebab-case widget id from plugin.yaml. Nanite's plugin-loader does
//     `mod[widget.name]` for widget lookup, and the backend requires widget
//     ids to be lowercase-alphanumeric-plus-hyphens — so the only way to
//     satisfy both is a string-named re-export. See CW-20260423-0008.
import { MuxActivityWidget } from './components/MuxActivityWidget'
export { MuxActivityWidget }
export { MuxActivityWidget as "mux-activity-widget" }
