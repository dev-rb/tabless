import { shell } from 'electron';
import { exposeInMainWorld } from './exposeInMainWorld';

function openUrl(url: string) {
    shell.openExternal(url);
}

// Export for types in contracts.d.ts
export const openUrlTool = { openUrl } as const;

exposeInMainWorld('openUrl', openUrlTool);
