import { Box } from '@fower/react';

export default () => {
  return (
    <Box gap3>
      <Box as="select" appearanceNone>
        <option>red</option>
        <option>green</option>
      </Box>

      <select>
        <option>red</option>
        <option>green</option>
      </select>
    </Box>
  );
};
