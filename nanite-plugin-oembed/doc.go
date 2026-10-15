// oEmbed is a subprocess plugin for Nanite. It subscribes to message.sent
// events, scans message bodies for supported provider URLs (YouTube,
// Spotify, Vimeo, SoundCloud, Flickr, plus user-configured extras),
// fetches the provider's oEmbed metadata, and emits an oembed-card
// envelope for the UI layer.
//
// Runtime: the host spawns this binary as a subprocess and speaks
// JSON-RPC over stdio. User-configured provider extensions are passed
// through InitParams.Config["oembed_extra_providers"] as a YAML list.
package main
