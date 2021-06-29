import classNames from 'classnames';
import { HTMLAttributes } from 'react';

export interface UniTagProps extends HTMLAttributes<HTMLElement> {
  uni: string;
}

const UniTag: React.FC<UniTagProps> = (props) => (
  // Uni tag shows which university an item belongs to and is primarily used in filters and search results
  // Todo improve color contrast for certain unis
  <div
    className={classNames(`text-${props.uni.toLocaleLowerCase()} text-white rounded-full font-bold text-sm py-1 text-left`, props.className)}
  >
    <span className='uppercase'>{props.uni}</span>
  </div>
);

export default UniTag;
