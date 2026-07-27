+++
date = '2024-12-01T00:00:00-00:00'
draft = false
title = 'Streaming Media Bitrate Guide'
+++

# Recommanded Bit Rate

| Resolution & Bit Rate | **H.264 (AVC)** | **H.265 (HEVC)** | **AV1**    | **Netflix**                                                                                               | **YouTube**                                                                 |
| --------------------- | --------------- | ---------------- | ---------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| **1080p @30fps**      | 4–8 Mbps        | 2.5–5 Mbps       | 2–4 Mbps   | ~3–5 Mbps (HEVC)[1](https://arstech.net/video-encoding-bitrates-for-4k-and-1080p-with-h-264-and-h-265/)   | 10 Mbps (H.264)[2](https://support.google.com/youtube/answer/2853702?hl=en) |
| **1080p @60fps**      | 6–12 Mbps       | 4–8 Mbps         | 3.5–6 Mbps | ~4–8 Mbps (HEVC)[1](https://arstech.net/video-encoding-bitrates-for-4k-and-1080p-with-h-264-and-h-265/)   | 12 Mbps (H.264)[2](https://support.google.com/youtube/answer/2853702?hl=en) |
| **1440p @30fps**      | 8–12 Mbps       | 5–8 Mbps         | 4–6 Mbps   | —                                                                                                         | 15 Mbps (H.264)[2](https://support.google.com/youtube/answer/2853702?hl=en) |
| **1440p @60fps**      | 10–16 Mbps      | 6–10 Mbps        | 5–8 Mbps   | —                                                                                                         | 24 Mbps (H.264)[2](https://support.google.com/youtube/answer/2853702?hl=en) |
| **4K @30fps**         | 12–20 Mbps      | 8–15 Mbps        | 6–12 Mbps  | ~15–25 Mbps (HEVC)[1](https://arstech.net/video-encoding-bitrates-for-4k-and-1080p-with-h-264-and-h-265/) | 30 Mbps (H.264)[2](https://support.google.com/youtube/answer/2853702?hl=en) |
| **4K @60fps**         | 20–32 Mbps      | 12–20 Mbps       | 10–18 Mbps | ~15–25 Mbps (HEVC)[1](https://arstech.net/video-encoding-bitrates-for-4k-and-1080p-with-h-264-and-h-265/) | 35 Mbps (H.264)[2](https://support.google.com/youtube/answer/2853702?hl=en) |

## **Summary**

- **Netflix**：4K HDR typically uses HEVC with a bitrate of approximately **15–25 Mbps**, achieving about 40–50% savings compared to H.264. AV1 is gradually gaining adoption and offers even higher efficiency.[3](https://www.audioholics.com/hdtv-formats/netflix-av1).
- **YouTube**：Live streaming requires higher bitrates. For 4K@60fps H.264, a recommended bitrate is **35 Mbps**, while AV1 or HEVC can maintain quality at lower bitrates.[2](https://support.google.com/youtube/answer/2853702?hl=en).
- **AV1**：Approximately 30% more efficient than HEVC, but with higher encoding complexity and limited hardware support for real-time live streaming.

# FFmpeg Commands

## Convert Videos to HEVC or AV1

### For NVIDIA GeForce RTX 40 Series and 50 Series

Here's an example:

- bit rate: `3Mbps - 4Mbps`
- buffer size: `6Mb`, typically set to 1–2 times the target bitrate
- audio: just copy
- encoder: `hevc_nvenc` or `av1_nvenc`
- input file: `input.mp4`
- output file: `output.mp4`
- present: `-preset p4`; _NVIDIA graphics cards offer presets ranging from p1 (fastest) to p7 (highest quality). p4 strikes a balance, while p6 delivers better visuals but slightly slower encoding (though still quite fast for the 4060)._

```bash
ffmpeg -i input.mp4 -c:v hevc_nvenc -preset p4 -b:v 3000k -maxrate 4000k -bufsize 6000k -vtag hvc1 -c:a copy output.mp4
```

```bash
ffmpeg -i input.mp4 -c:v av1_nvenc -b:v 3000k -preset p4 -vtag hvc1 -c:a copy output.mkv
```

### For Apple Slicon Chip, HEVC, fixed bit rate

Here's an example:

- bit rate: `3Mbps - 4Mbps`
- buffer size: `6Mb`, typically set to 1–2 times the target bitrate
- audio: just copy
- encoder: `hevc_videotoolbox`
- input file: `input.mp4`
- output file: `output.mp4`

```bash
ffmpeg -i input.mp4 -c:v hevc_videotoolbox -b:v 3000k -maxrate 4000k -bufsize 6000k -vtag hvc1 -c:a copy output.mp4
```

## Fix Codec Tag

```bash
ffmpeg -i input.mp4 -c copy -vtag hvc1 output.mp4
```

## Extract Audio

```bash
ffmpeg -i input.mp4 -vn -c:a copy output.m4a
```
