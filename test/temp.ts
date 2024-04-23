import { hierarchyConfig } from '../lib';
import { HierarchyConfig } from '../lib/types';

const config: HierarchyConfig = hierarchyConfig.getConfig();
console.log(config);