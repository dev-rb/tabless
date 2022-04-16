/* eslint-disable @typescript-eslint/consistent-type-imports */

interface Exposed {
  readonly nodeCrypto: Readonly<typeof import('./src/nodeCrypto').nodeCrypto>;
  readonly versions: Readonly<typeof import('./src/versions').versions>;
  readonly openUrl: Readonly<typeof import('./src/openUrl').openUrlTool>;
  readonly openFile: Readonly<typeof import('./src/openFile').getFileOnSystem>;
  readonly openWindow: Readonly<typeof import('./src/openWindow').openExternalWindow>;
  readonly windowControls: Readonly<typeof import('./src/windowControls').windowControls>;
}


// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Window extends Exposed { }
