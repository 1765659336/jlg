import { JlgGrid, JlgDynamicModal, JlgTableFilter, JlgModalTemplate, JlgTabs, JlgTabPane } from './components';
import { makeInstaller } from '../lib/install';
import type { Plugin } from 'vue';

export const components = [JlgGrid, JlgTableFilter, JlgDynamicModal, JlgModalTemplate, JlgTabs, JlgTabPane] as Plugin[];

const install = makeInstaller(components);
export * from './components';
export * from '../lib/config';
export * from '../lib/core';

// Components tabs and tabs/pane
export * from './types/namespace';
export default install;
