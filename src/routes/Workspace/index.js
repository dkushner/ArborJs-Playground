import { injectReducer } from '../../store/reducers';

export default (store) => ({
  path: 'workspace',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Workspace = require('./containers/WorkspaceContainer').default;

      const workspaceReducer = require('./modules/workspace').default;
      const stageReducer = require('./modules/stage').default;
      const consoleReducer = require('./modules/console').default;

      injectReducer(store, { key: 'workspace', reducer: workspaceReducer });
      injectReducer(store, { key: 'stage', reducer: stageReducer });
      injectReducer(store, { key: 'console', reducer: consoleReducer });

      cb(null, Workspace);
    }, 'workspace');
  }
});
