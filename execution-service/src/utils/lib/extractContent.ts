function extractContent(output: string): string {
  const match = output.match(/\x1B\[\d+m(.*?)\x1B/);
  return match ? match[1] : output;
}
