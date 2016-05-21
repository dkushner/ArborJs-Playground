import { injectReducer } from '../../store/reducers';

export default (store) => ({
  path: 'workspace',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Workspace = require('./containers/WorkspaceContainer').default;
      const reducer = require('./modules/workspace').default;

      injectReducer(store, { key: 'workspace', reducer });

      cb(null, Workspace);
    }, 'workspace');
  }
});
