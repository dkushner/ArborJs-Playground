import { injectReducer } from '../../store/reducers';

export default (store) => ({
  path: 'workspace',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Workspace = require('./containers/WorkspaceContainer').default;

      const workspaceReducer = require('./modules/workspace').default;
      const toolboxReducer = require('./modules/toolbox').default;
      const scrubReducer = require('./modules/scrub').default;

      injectReducer(store, { key: 'workspace', reducer: workspaceReducer });
      injectReducer(store, { key: 'toolbox', reducer: toolboxReducer });
      injectReducer(store, { key: 'scrub', reducer: scrubReducer });

      cb(null, Workspace);
    }, 'workspace');
  }
});
