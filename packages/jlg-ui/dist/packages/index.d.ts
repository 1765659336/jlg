import { default as JlgFlexCell } from './flex-cell';
import { default as JlgFlexLayout } from './flex-layout';
import { default as JlgCollapseItem } from './collapse-item';
import { default as JlgCollapse } from './collapse';
import { default as JlgGridCell } from './grid-cell';
import { default as JlgGridLayout } from './grid-layout';
import { default as JlgMenu } from './menu';
import { App } from 'vue';

export * from './component';
export { JlgMenu, JlgGridLayout, JlgGridCell, JlgCollapse, JlgCollapseItem, JlgFlexLayout, JlgFlexCell };
declare const _default: {
    install: (app: App<Element>) => void;
};
export default _default;
