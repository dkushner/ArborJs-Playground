import { injectReducer } from '../../store/reducers';

export default (store) => ({
  path: 'workspace',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Workspace = require('./containers/WorkspaceContainer').default;

      const workspaceReducer = require('./modules/workspace').default;
      const toolboxReducer = require('./modules/toolbox').default;

      injectReducer(store, { key: 'workspace', reducer: workspaceReducer });
      injectReducer(store, { key: 'toolbox', reducer: toolboxReducer });

      cb(null, Workspace);
    }, 'workspace');
  }
});
