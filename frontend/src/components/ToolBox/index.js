import { compose, withProps } from 'recompose';
import ToolBox from './ToolBox';
import _ from 'lodash';

const enhancer = compose(
  withProps(props => {
    const retval = {};
    const tool = _.find(props.tools, tool => tool.id === props.selectedTool);
    if (tool) {
      retval.settings = tool.settings;
    }
    return retval;
  }),
);

export default enhancer(ToolBox);
