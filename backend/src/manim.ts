import { writeFileSync, mkdirSync, existsSync, copyFileSync } from 'fs';
import { spawnSync } from 'child_process';
import path from 'path';

export function renderManim(code: string, filename: string): void {
  const tempDir = path.join(__dirname, "..", "temp");
  const outputsDir = path.join(__dirname, "..", "outputs");

  if (!existsSync(tempDir)) mkdirSync(tempDir, { recursive: true });
  if (!existsSync(outputsDir)) mkdirSync(outputsDir, { recursive: true });

  const filePath = path.join(tempDir, "scene.py");
  writeFileSync(filePath, code);

  const result = spawnSync("manim", [filePath, "Scene", "-qm", "-o", "out.mp4"], {
    cwd: tempDir,
    encoding: "utf-8"
  });

  if (result.error || result.status !== 0) {
    throw new Error(result.stderr);
  }

  const generatedVideoPath = path.join(tempDir, "media", "videos", "scene", "720p30", "out.mp4");
  const finalOutputPath = path.join(outputsDir, filename);
  
  copyFileSync(generatedVideoPath, finalOutputPath);
}
